# 跑步提醒设置指南

## 功能说明

这个GitHub Actions工作流会每天检查你的跑步数据库，如果没有发现今日的跑步记录，就会发送邮件提醒你去跑步。

## 设置步骤

### 1. 配置GitHub Secrets

在你的GitHub仓库中，进入 `Settings` > `Secrets and variables` > `Actions`，添加以下secrets：

#### 邮件服务器配置

- `SMTP_SERVER`: 你的邮件服务器地址（如：smtp.gmail.com）
- `SMTP_PORT`: 邮件服务器端口（如：587）
- `SENDER_EMAIL`: 发送邮件的邮箱地址
- `SENDER_PASSWORD`: 发送邮件的邮箱密码或应用密码
- `RECIPIENT_EMAIL`: 接收提醒的邮箱地址

#### Gmail设置示例

如果你使用Gmail：

1. 启用两步验证
2. 生成应用密码：`Google账户` > `安全性` > `两步验证` > `应用密码`
3. 设置secrets：
   - `SMTP_SERVER`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SENDER_EMAIL`: `your-email@gmail.com`
   - `SENDER_PASSWORD`: `你的应用密码`
   - `RECIPIENT_EMAIL`: `your-email@gmail.com`

### 2. 工作流时间设置

当前设置为每天北京时间晚上8点检查。如需修改，编辑 `.github/workflows/daily-running-check.yml` 文件中的cron表达式：

```yaml
schedule:
  - cron: '0 12 * * *' # UTC时间12:00 = 北京时间20:00
```

Cron表达式格式：`分 时 日 月 星期`

- `0 12 * * *`: 每天UTC 12:00（北京时间20:00）
- `0 8 * * *`: 每天UTC 8:00（北京时间16:00）
- `0 0 * * 1`: 每周一UTC 0:00（北京时间周一8:00）

### 3. 手动触发

你也可以手动触发工作流：

1. 进入GitHub仓库的 `Actions` 页面
2. 选择 `每日跑步检查` 工作流
3. 点击 `Run workflow` 按钮

## 工作原理

1. **检查时间**: 每天指定时间自动运行
2. **数据库查询**: 检查今日是否有新的跑步记录
3. **邮件通知**:
   - 如果有跑步记录：发送鼓励邮件
   - 如果没有跑步记录：发送提醒邮件

## 文件说明

- `check_daily_running.py`: 检查跑步记录的Python脚本
- `.github/workflows/daily-running-check.yml`: GitHub Actions工作流配置
- `RUNNING_REMINDER_SETUP.md`: 本设置指南

## 故障排除

### 邮件发送失败

1. 检查SMTP服务器配置是否正确
2. 确认邮箱密码或应用密码是否正确
3. 检查网络连接

### 数据库连接失败

1. 确认数据库文件路径正确
2. 检查数据库文件是否存在
3. 确认数据库权限设置

### 工作流不运行

1. 检查cron表达式格式
2. 确认仓库有Actions权限
3. 查看Actions日志排查问题

## 自定义设置

### 修改检查逻辑

编辑 `check_daily_running.py` 文件中的 `check_today_running_records()` 函数。

### 修改邮件内容

编辑 `check_daily_running.py` 文件中的 `send_email_notification()` 函数。

### 添加更多通知方式

可以在工作流中添加其他通知方式，如：

- Slack通知
- 微信通知
- 钉钉通知

## 注意事项

1. 确保数据库文件在仓库中或可以通过其他方式访问
2. 邮件密码建议使用应用密码，不要使用主密码
3. 定期检查工作流运行状态
4. 可以根据需要调整检查频率和提醒内容
