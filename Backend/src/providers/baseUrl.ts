import {Injectable} from '@angular/core';

@Injectable()
export class BaseUrl {
  private baseUrlTenant = "http://localhost:8082/";
  private baseUrlAuth = "http://localhost:8081/";

  constructor() {

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
