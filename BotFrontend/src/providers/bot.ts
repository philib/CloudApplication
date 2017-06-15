import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import config from 'config'

declare let window:any;

@Injectable()
export class Bot {

    private BOT_ENDPOINT = config.get('BotService_Endpoint') || "http://localhost:8083/"
    private TENANT_ENDPOINT = process.env.TENANT_ENDPOINT || "http://localhost:8082/"

    public tenantID;

    constructor(public http: Http) {
        console.log("BOT_ENDPOINT", this.BOT_ENDPOINT);
        console.log("TENANT_ENDPOINT", this.TENANT_ENDPOINT);
        this.tenantID = window.location.pathname.substr(1) || 'audi';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.get(this.TENANT_ENDPOINT + 'tenants?name=' + this.tenantID, headers).map(res => res.json()).subscribe(data => {
            this.tenantID = data._id
            console.log(this.tenantID, data, data._id)
        });
    }

    evaluateMessage(msg, callback) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        msg = msg.toLowerCase()
        this.http.get(this.BOT_ENDPOINT + this.tenantID + '/conversation?msg=' + msg, headers)
            .map(res => res.json()).subscribe(data => {

                if (data.intent === "No_Intent") {
                    callback("sorry, can you repeat that please")
                }

                if (data.intent === "Intent_News") {
                    callback(this.transformNews(data))
                } else if (data.intent === "Intent_CarRetailer") {
                    callback(this.transformCarRetailer(data))
                } else if (data.intent === "Intent_CarWorkshop") {
                    callback(this.transformCarWorkshop(data))
                } else if (data.intent === "Intent_CarTypes") {
                    callback(this.transformCarTypes(data))
                }
            })
    }

    transformNews(data) {
        let m = "here are the news<br>"
        data.data.map(x => m += "<br><b>" + x.title + "</b><br>" + x.description + "<br>")
        return m
    }

    transformCarRetailer(data) {
        let m = "You can aquire our cars here:<br><br>"
        data.data.map(x => m += "<b>" + x.name + "</b><br>" + x.address + "<br>")
        return m
    }

    transformCarWorkshop(data) {
        let m = "You can find our workshops here:<br>"
        data.data.map(x => m += "<br><b>" + x.name + "</b><br>" + x.address + "<br>")
        return m
    }

    transformCarTypes(data) {
        let m = "following cars are currently available:<br>"
        data.data.map(x => m += "<br><b>" + x.name + "</b><br>" + x.description + "<br>")
        return m
    }
}
