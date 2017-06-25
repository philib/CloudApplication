import {Injectable} from '@angular/core';

declare var _AuthService_Endpoint: any
declare var _TenantService_Endpoint: any

@Injectable()
export class BaseUrl {
    private baseUrlTenant = _TenantService_Endpoint;
    private baseUrlAuth = _AuthService_Endpoint;

    constructor() {
        if (!_TenantService_Endpoint) {
            this.baseUrlTenant = "http://localhost:8082/";
        }
        if (!_AuthService_Endpoint) {
            this.baseUrlAuth = "http://localhost:8081/"
        }
        console.log("_AuthService_Endpoint", this.baseUrlAuth)
        console.log("_TenantService_Endpoint", this.baseUrlTenant)
        this.baseUrlTenant = this.baseUrlTenant.replace(/\s/g, '')
        this.baseUrlAuth = this.baseUrlAuth.replace(/\s/g, '')
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
        console.log("getTenantsLoginUrl",this.baseUrlAuth + "login/")
        return this.baseUrlAuth + "login/"
    }

    getTenantConfigurationUrl(tenantId, tenantToken) {
        return this.baseUrlTenant + "tenants/" + tenantId + "/" + "configuration" + "?token=" + tenantToken;

    }


}
