# 跑步提醒设置指南 - Server酱微信通知

## 📱 Server酱简介

Server酱是一个简单易用的微信通知服务，可以让你通过微信接收各种通知消息。

## 🚀 快速设置

### 1. 注册Server酱账号

1. 访问 [Server酱官网](https://sct.ftqq.com/)
2. 点击"GitHub登录"
3. 授权GitHub账号登录
4. 登录成功后，你会看到你的SendKey

### 2. 获取SendKey

1. 登录Server酱后，在首页可以看到你的SendKey
2. SendKey格式类似：`SCT1234567890abcdef`
3. **重要**：复制并保存这个SendKey

### 3. 配置GitHub Secrets

在你的GitHub仓库中配置以下secret：

1. 进入GitHub仓库
2. 点击 `Settings` > `Secrets and variables` > `Actions`
3. 点击 `New repository secret`
4. 添加以下secret：

```
名称: SERVERCHAN_SENDKEY
值: 你的SendKey（如：SCT1234567890abcdef）
```

### 4. 启用工作流

1. 进入GitHub仓库的 `Actions` 页面
2. 找到"每日跑步检查"工作流
3. 点击"Enable workflow"

## 📱 消息效果

### 有跑步记录时
```
标题: 🏃‍♂️ 跑步记录提醒 - 今日已完成跑步

内容:
🎉 太棒了！今日已完成跑步

你今天已经完成了 1 次跑步活动：
• 晨跑: 5.2km, 用时 0:25:30

继续保持这个好习惯！💪
```

### 无跑步记录时
```
标题: 🏃‍♂️ 跑步提醒 - 今日还未跑步

内容:
今天还没有跑步记录哦！

是时候出去跑一跑了，让身体和心灵都得到锻炼！

记住：每一次跑步都是对自己的投资！💪

加油！你可以的！🚀
```

## 🔧 高级配置

### 自定义通知时间

编辑 `.github/workflows/daily-running-check-serverchan.yml` 文件：

```yaml
schedule:
  - cron: '0 12 * * *'  # UTC时间12:00 = 北京时间20:00
```

常用时间设置：
- `0 8 * * *`: 每天北京时间16:00
- `0 12 * * *`: 每天北京时间20:00
- `0 16 * * *`: 每天北京时间00:00（第二天）
- `0 0 * * 1`: 每周一北京时间8:00

### 自定义消息内容

编辑 `check_daily_running_serverchan.py` 文件中的消息模板：

```python
# 有跑步记录时的消息
title = "🏃‍♂️ 跑步记录提醒 - 今日已完成跑步"
content = f"""🎉 太棒了！今日已完成跑步

你今天已经完成了 {records_count} 次跑步活动："""

# 无跑步记录时的消息
title = "🏃‍♂️ 跑步提醒 - 今日还未跑步"
content = """今天还没有跑步记录哦！

是时候出去跑一跑了，让身体和心灵都得到锻炼！

记住：每一次跑步都是对自己的投资！💪

加油！你可以的！🚀"""
```

## 🧪 测试配置

### 手动测试

1. 进入GitHub Actions页面
2. 找到"每日跑步检查 - Server酱微信通知"工作流
3. 点击"Run workflow"按钮
4. 查看运行日志确认是否成功

### 本地测试

你也可以在本地测试Server酱通知：

```python
import requests

sendkey = "你的SendKey"
url = f"https://sctapi.ftqq.com/{sendkey}.send"
data = {
    "title": "测试标题",
    "desp": "测试内容"
}
response = requests.post(url, data=data)
print(response.json())
```

## ⚠️ 注意事项

### 1. SendKey安全
- 不要将SendKey提交到代码仓库
- 只在GitHub Secrets中配置
- 定期更换SendKey

### 2. 频率限制
- Server酱免费版有发送频率限制
- 建议不要设置过于频繁的检查
- 避免在短时间内发送大量消息

### 3. 网络问题
- 如果通知发送失败，检查网络连接
- 确认Server酱服务是否正常
- 查看GitHub Actions日志排查问题

## 🔍 故障排除

### 1. 通知发送失败
- 检查SendKey是否正确
- 确认GitHub Secrets配置
- 查看GitHub Actions运行日志

### 2. 消息格式问题
- 检查消息内容是否包含特殊字符
- 确认标题和内容长度限制
- 测试简化版消息

### 3. 工作流不运行
- 检查cron表达式格式
- 确认工作流是否已启用
- 查看Actions权限设置

## 📋 完整配置示例

假设你的SendKey是 `SCT1234567890abcdef`，完整配置如下：

```
GitHub仓库: your-username/running_page
Secrets配置:
├── SMTP_SERVER: smtp.163.com
├── SMTP_PORT: 465
├── SENDER_EMAIL: your-email@163.com
├── SENDER_PASSWORD: your-password
├── RECIPIENT_EMAIL: your-email@163.com
└── SERVERCHAN_SENDKEY: SCT1234567890abcdef
```

## 🎯 优势

- ✅ **简单易用**：只需一个SendKey即可
- ✅ **免费使用**：个人使用完全免费
- ✅ **稳定可靠**：基于GitHub，稳定性好
- ✅ **即时通知**：消息实时推送
- ✅ **支持富文本**：支持emoji和格式化文本

现在你可以享受Server酱的微信通知服务了！🏃‍♂️📱
