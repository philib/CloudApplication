import {Injectable} from '@angular/core';

declare var _AuthService_Endpoint: any
declare var _TenantService_Endpoint: any

@Injectable()
export class BaseUrl {
  private baseUrlTenant =  _TenantService_Endpoint ? JSON.stringify(_TenantService_Endpoint) :"http://localhost:8082/";
  private baseUrlAuth = _AuthService_Endpoint ? JSON.stringify(_AuthService_Endpoint) : "http://localhost:8081/";

  constructor() {
    console.log("_AuthService_Endpoint", _AuthService_Endpoint)
    console.log("_TenantService_Endpoint", _TenantService_Endpoint)
  }

  getBaseUrl() {
    return this.baseUrlTenant;
  }

  getTenantsUrl(){
    return this.baseUrlTenant + "tenants/"
  }

  getTenantsRegisterUrl(){
    return this.baseUrlAuth  + "register/"
  }

  getTenantsLoginUrl(){
    return this.baseUrlAuth+ "login/"
  }

  getTenantConfigurationUrl(tenantId , tenantToken){
    return this.baseUrlTenant+ "tenants/"+tenantId+ "/"+ "configuration" + "?token="+tenantToken;

  }


}
