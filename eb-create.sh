#!/usr/bin/env bash
source ./env

if [ "${1}" = "authService" ]; then
	cd MicroServices/AuthService
	npm install
	eb create AuthService-dev setenv JWT_SECRET=$JWT_SECRET DB_ENDPOINT=$DB_ENDPOINT PORT=$AuthService_PORT
fi

if [ "${1}" = "botService" ]; then
	cd MicroServices/BotService
	npm install 
	eb create BotService-dev setenv AWS_LEX_ACCESS=$AWS_LEX_ACCESS AWS_LEX_SECRET=$AWS_LEX_SECRET DB_ENDPOINT=$DB_ENDPOINT JWT_SECRET=$JWT_SECRET PORT=$BotService_PORT
fi

if [ "${1}" = "tenantService" ]; then
	cd MicroServices/TenantServicee
	npm install 
	eb create TenantService-dev
fi

if [ "${1}" = "BotFrontend" ]; then
	cd BotFrontend
	npm install 
	eb create BotFrontend-dev setenv NODE_ENV=prod
fi

if [ "${1}" = "TenantFrontend" ]; then
	cd TenantFrontend
	npm install 
	eb create TenantFrontend-dev setenv NODE_ENV=prod
fi
