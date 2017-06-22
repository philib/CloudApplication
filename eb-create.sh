#!/usr/bin/env bash

if [ "${1}" = "authService" ]; then
	cd MicroServices/AuthService
	npm install
	eb create AuthService-dev
fi

if [ "${1}" = "botService" ]; then
	cd MicroServices/BotService
	npm install
	eb create BotService-dev´
fi

if [ "${1}" = "tenantService" ]; then
	cd MicroServices/TenantServicee
	npm install
	eb setenv
	eb create TenantService-dev
fi

if [ "${1}" = "BotFrontend" ]; then
	cd BotFrontend
	npm install 
	eb create BotFrontend-dev
	
fi

if [ "${1}" = "TenantFrontend" ]; then
	cd TenantFrontend
	npm install 
	eb create TenantFrontend-dev
fi
