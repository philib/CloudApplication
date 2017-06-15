@echo off

SET appName_Bot=cloud-chat-bot
SET appName_Tenant=cloud-tenant

IF %~1==bot (
echo pushing bot to %appName_Bot%
heroku git:remote -a %appName_Bot%
git subtree push --prefix BotFrontend heroku master
)

IF %~1==tenant (
echo pushing tenant to %appName_Tenant%
heroku git:remote -a %appName_Tenant%
git subtree push --prefix TenantFrontend heroku master
)