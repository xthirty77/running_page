#!/usr/bin/env python3
"""
检查今日是否有新增跑步记录的脚本 - 支持Server酱微信通知和邮件通知
用于GitHub Actions工作流
"""

import os
import sys
from datetime import datetime, date
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# 添加项目路径到sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
sys.path.append(os.path.join(current_dir, "run_page"))

from run_page.config import SQL_FILE  # noqa: E402
from run_page.generator.db import init_db, Activity  # noqa: E402


def check_today_running_records():
    """
    检查今日是否有新增的跑步记录
    返回: (has_records, records_count, records_list)
    """
    try:
        # 初始化数据库连接
        session = init_db(SQL_FILE)

        # 获取今日日期范围
        today = date.today()
        start_of_day = datetime.combine(today, datetime.min.time())
        end_of_day = datetime.combine(today, datetime.max.time())

        print(f"检查日期范围: {start_of_day} 到 {end_of_day}")

        # 查询今日的跑步记录
        records = (
            session.query(Activity)
            .filter(
                Activity.start_date_local >= start_of_day.strftime("%Y-%m-%d %H:%M:%S"),
                Activity.start_date_local <= end_of_day.strftime("%Y-%m-%d %H:%M:%S"),
            )
            .all()
        )

        records_count = len(records)
        has_records = records_count > 0

        records_list = []
        for record in records:
            records_list.append(
                {
                    "name": record.name,
                    "distance": record.distance,
                    "moving_time": str(record.moving_time),
                    "start_date_local": record.start_date_local,
                    "type": record.type,
                }
            )

        session.close()

        print(f"今日跑步记录数量: {records_count}")
        if has_records:
            print("今日已有跑步记录:")
            for record in records_list:
                print(
                    f"- {record['name']}: {record['distance']}km, {record['moving_time']}"
                )

        return has_records, records_count, records_list

    except Exception as e:
        print(f"检查跑步记录时出错: {str(e)}")
        return False, 0, []


def send_serverchan_notification(has_records, records_count, records_list):
    """
    发送Server酱微信通知
    """
    sendkey = os.getenv("SERVERCHAN_SENDKEY", "sctp12437t5fqjhea2ghfcubq5gkfusy")

    if not sendkey:
        print("Server酱SendKey配置不完整，跳过微信通知")
        return False

    try:
        if has_records:
            # 有跑步记录
            title = "🏃‍♂️ 跑步记录提醒 - 今日已完成跑步"
            content = f"""🎉 太棒了！今日已完成跑步

你今天已经完成了 {records_count} 次跑步活动："""

            for record in records_list:
                content += f"\n• {record['name']}: {record['distance']}km, 用时 {record['moving_time']}"

            content += "\n\n继续保持这个好习惯！💪"
        else:
            # 无跑步记录
            title = "🏃‍♂️ 跑步提醒 - 今日还未跑步"
            content = """今天还没有跑步记录哦！

是时候出去跑一跑了，让身体和心灵都得到锻炼！

记住：每一次跑步都是对自己的投资！💪

加油！你可以的！🚀"""

        # 构建请求数据
        data = {"title": title, "desp": content}

        # 发送请求到Server酱
        url = f"https://sctapi.ftqq.com/{sendkey}.send"
        response = requests.post(url, data=data, timeout=10)

        if response.status_code == 200:
            result = response.json()
            if result.get("code") == 0:
                print("Server酱微信通知发送成功！")
                return True
            else:
                print(f"Server酱通知发送失败: {result.get('message', '未知错误')}")
                return False
        else:
            print(f"Server酱通知发送失败: HTTP {response.status_code}")
            return False

    except Exception as e:
        print(f"发送Server酱通知时出错: {str(e)}")
        return False


def send_email_notification(has_records, records_count, records_list):
    """
    发送邮件通知
    """
    # 从环境变量获取邮件配置
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", "465"))
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")
    recipient_email = os.getenv("RECIPIENT_EMAIL")

    if not all([sender_email, sender_password, recipient_email]):
        print("邮件配置不完整，跳过邮件发送")
        return False

    try:
        # 创建邮件内容
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg["Subject"] = "🏃‍♂️ 跑步提醒 - " + (
            "今日已完成跑步" if has_records else "今日还未跑步"
        )

        # 邮件正文
        if has_records:
            body = f"""
            <h2>🎉 太棒了！今日已完成跑步</h2>
            <p>你今天已经完成了 {records_count} 次跑步活动：</p>
            <ul>
            """
            for record in records_list:
                body += f"<li><strong>{record['name']}</strong> - {record['distance']}km, 用时 {record['moving_time']}</li>"
            body += """
            </ul>
            <p>继续保持这个好习惯！💪</p>
            """
        else:
            body = """
            <h2>🏃‍♂️ 跑步提醒</h2>
            <p>今天还没有跑步记录哦！</p>
            <p>是时候出去跑一跑了，让身体和心灵都得到锻炼！</p>
            <p>记住：每一次跑步都是对自己的投资！💪</p>
            <p>加油！你可以的！🚀</p>
            """

        msg.attach(MIMEText(body, "html", "utf-8"))

        # 发送邮件
        if smtp_port == 465:
            # 使用SSL连接（465端口）
            server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        else:
            # 使用TLS连接（587端口）
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()

        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()

        print("邮件发送成功！")
        return True

    except Exception as e:
        print(f"发送邮件时出错: {str(e)}")
        return False


def main():
    """
    主函数
    """
    print("开始检查今日跑步记录...")

    # 检查今日跑步记录
    has_records, records_count, records_list = check_today_running_records()

    # 发送通知
    serverchan_sent = send_serverchan_notification(
        has_records, records_count, records_list
    )
    email_sent = send_email_notification(has_records, records_count, records_list)

    # 输出结果
    if has_records:
        print(f"✅ 今日已完成 {records_count} 次跑步")
    else:
        print("❌ 今日还未跑步")

    if serverchan_sent:
        print("📱 Server酱微信通知已发送")
    else:
        print("⚠️ Server酱微信通知发送失败")

    if email_sent:
        print("📧 邮件通知已发送")
    else:
        print("⚠️ 邮件通知发送失败")

    # 设置退出码
    if not has_records:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
