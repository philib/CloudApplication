import {Injectable} from '@angular/core';

declare var _AuthService_Endpoint: any
declare var _TenantService_Endpoint: any

@Injectable()
export class BaseUrl {
    private baseUrlTenant = _TenantService_Endpoint;
    private baseUrlAuth = _AuthService_Endpoint;

    constructor() {
        console.log("_AuthService_Endpoint", _AuthService_Endpoint)
        console.log("_TenantService_Endpoint", _TenantService_Endpoint)

        if (_TenantService_Endpoint === 'undefined') {
            this.baseUrlTenant = "http://localhost:8082/";
        }
        if (_AuthService_Endpoint === 'undefined') {
            this.baseUrlAuth = "http://localhost:8081/"
        }
    }

    getBaseUrl() {
        return this.baseUrlTenant;
    }

    getTenantsUrl() {
        return this.baseUrlTenant + "tenants/"
    }

    getTenantsRegisterUrl() {
        return this.baseUrlAuth + "register/"
    }

    getTenantsLoginUrl() {
        return this.baseUrlAuth + "login/"
    }

    getTenantConfigurationUrl(tenantId, tenantToken) {
        return this.baseUrlTenant + "tenants/" + tenantId + "/" + "configuration" + "?token=" + tenantToken;

    }


}
