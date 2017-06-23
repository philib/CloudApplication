#!/usr/bin/env bash

if [ "${1}" = "authService" ]; then
    echo deploying AuthService
	cd MicroServices/AuthService
	npm install
	eb deploy AuthService-dev
fi

if [ "${1}" = "botService" ]; then
    echo deploying BotService
	cd MicroServices/BotService
	npm install
	eb deploy BotService-dev
fi

if [ "${1}" = "tenantService" ]; then
    echo deploying TenantService
	cd MicroServices/TenantServicee
	npm install
	eb deploy TenantService-dev
fi

if [ "${1}" = "botFrontend" ]; then
    echo deploying BotFrontend
	cd BotFrontend
	npm install
	eb deploy BotFrontend-dev
fi

if [ "${1}" = "tenantFrontend" ]; then
    echo deploying TenantFrontend
	cd TenantFrontend
	npm install
	eb deploy TenantFrontend-dev
fi
