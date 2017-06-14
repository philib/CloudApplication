import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

declare let window:any;

@Injectable()
export class Bot {

    private API_ENDPOINT = "http://localhost:8083/"

    public tenantID;

    constructor(public http: Http) {
        this.tenantID = window.location.pathname.substr(1) || '5915f8cd0dd894258039e48f';
        console.log(this.tenantID)
    }

    evaluateMessage(msg, callback) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        msg = msg.toLowerCase()
        this.http.get(this.API_ENDPOINT + this.tenantID + '/conversation?msg=' + msg, headers)
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
