#!/usr/bin/env bash
source ./env

if [ "${1}" = "authService" ]; then
    echo deploying AuthService
	cd MicroServices/AuthService
	eb setenv JWT_SECRET=$JWT_SECRET DB_ENDPOINT=$DB_ENDPOINT PORT=$AuthService_PORT
fi

if [ "${1}" = "botService" ]; then
    echo deploying BotService
	cd MicroServices/BotService
	eb setenv AWS_LEX_ACCESS=$AWS_LEX_ACCESS AWS_LEX_SECRET=$AWS_LEX_SECRET DB_ENDPOINT=$DB_ENDPOINT JWT_SECRET=$JWT_SECRET PORT=$BotService_PORT
fi

if [ "${1}" = "tenantService" ]; then
    echo deploying TenantService
	cd MicroServices/TenantServicee
	eb setenv DB_ENDPOINT=$DB_ENDPOINT JWT_SECRET=$JWT_SECRET PORT=$TenantService_PORT
fi

if [ "${1}" = "botFrontend" ]; then
    echo deploying BotFrontend
	cd BotFrontend
	eb setenv NODE_ENV=prod
fi

if [ "${1}" = "tenantFrontend" ]; then
    echo deploying TenantFrontend
	cd TenantFrontend
	eb setenv NODE_ENV=prod
fi
