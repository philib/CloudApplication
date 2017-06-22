#!/usr/bin/env bash
source ./env

if [ "${1}" = "authService" ]; then
    echo deploying AuthService
	cd MicroServices/AuthService
	npm install
	eb setenv JWT_SECRET=$JWT_SECRET DB_ENDPOINT=$DB_ENDPOINT PORT=$AuthService_PORT
	eb deploy
fi

if [ "${1}" = "botService" ]; then
    echo deploying BotService
	cd MicroServices/BotService
	npm install
	eb setenv AWS_LEX_ACCESS=$AWS_LEX_ACCESS AWS_LEX_SECRET=$AWS_LEX_SECRET DB_ENDPOINT=$DB_ENDPOINT JWT_SECRET=$JWT_SECRET PORT=$BotService_PORT
	eb deploy
fi

if [ "${1}" = "tenantService" ]; then
    echo deploying TenantService
	cd MicroServices/TenantServicee
	npm install
	eb setenv DB_ENDPOINT=$DB_ENDPOINT JWT_SECRET=$JWT_SECRET PORT=$TenantService_PORT
	eb deploy
fi

if [ "${1}" = "BotFrontend" ]; then
    echo deploying BotFrontend
	cd BotFrontend
	npm install
	npm run build
	eb setenv NODE_ENV=prod
	eb deploy
fi

if [ "${1}" = "TenantFrontend" ]; then
    echo deploying TenantFrontend
	cd TenantFrontend
	npm install
	eb setenv NODE_ENV=prod
	eb deploy
fi
