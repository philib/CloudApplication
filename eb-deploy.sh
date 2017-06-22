#!/usr/bin/env bash

if [ "${1}" = "authService" ]; then
    echo deploying AuthService
	cd MicroServices/AuthService
	npm install
	eb deploy
fi

if [ "${1}" = "botService" ]; then
    echo deploying BotService
	cd MicroServices/BotService
	npm install
	eb deploy
fi

if [ "${1}" = "tenantService" ]; then
    echo deploying TenantService
	cd MicroServices/TenantServicee
	npm install
	eb deploy
fi

if [ "${1}" = "BotFrontend" ]; then
    echo deploying BotFrontend
	cd BotFrontend
	npm install
	eb deploy
fi

if [ "${1}" = "TenantFrontend" ]; then
    echo deploying TenantFrontend
	cd TenantFrontend
	npm install
	eb deploy
fi
