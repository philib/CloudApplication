#!/usr/bin/env bash

region=eu-central-1

echo creating BotFrontend in region $region
cd BotFrontend
eb init --platform node.js --region $region

echo creating TenantFrontend in region $region
cd ../TenantFrontend
eb init --platform node.js --region $region

echo creating BotService in region $region
cd ../MicroServices/BotService
eb init --platform node.js --region $region

echo creating TenantService in region $region
cd ../TenantServicee
eb init --platform node.js --region $region

echo ceating AuthService in region $region
cd ../AuthService
eb init --platform node.js --region $region