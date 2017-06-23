import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

declare let window: any;
declare const _BotService_Endpoint: any
declare const _TenantService_Endpoint: any

@Injectable()
export class Bot {

    private BOT_ENDPOINT;
    private TENANT_ENDPOINT;

    public tenantID;
    public tenant;

    private bot;
    private botObserver;

    constructor(public http: Http) {

        this.bot = Observable.create(observer => {
            this.botObserver = observer;
        }).share();

        this.BOT_ENDPOINT = _BotService_Endpoint
        this.TENANT_ENDPOINT = _TenantService_Endpoint

        if (_BotService_Endpoint === 'undefined') this.BOT_ENDPOINT = "http://localhost:5000/";
        if (_TenantService_Endpoint === 'undefined') this.TENANT_ENDPOINT = "http://localhost:8082/"

        this.tenantID = window.location.pathname.substr(1) || 'audi';
        if (this.tenantID.substr(this.tenantID.length - 1) == '/') {
            this.tenantID = this.tenantID.substr(0, this.tenantID.length - 1)
        }
        let headers = new Headers({'Content-Type': 'application/json'});
        this.http.get(this.TENANT_ENDPOINT + 'tenants?name=' + this.tenantID, headers).map(res => res.json()).subscribe(data => {
            this.tenantID = data._id
            this.tenant = data;
            this.botObserver.next(data);
        });
    }


    watchBot() {
        return this.bot;
    }

    evaluateMessage(msg, callback) {
        let headers = new Headers({'Content-Type': 'application/json'});
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
            } else if (data.intent === "Intent_Help") {
                callback(this.transformCarHelp(data))
            }

        })
    }

    transformNews(data) {
        let l = data.data.length
        if (l == 0) {
            let m = "There is no news available<br>"
            return m
        } else {
            let m = "here are the news<br>"
            data.data.map(x => m += "<br><b>" + x.title + "</b><br>" + x.description + "<br>")
            return m
        }

    }

    transformCarRetailer(data) {
        let l = data.data.length
        if (l == 0) {
            let m = "There is no retailer available<br>"
            return m
        } else {
            let m = "You can aquire our cars here:<br><br>"
            data.data.map(x => m += "<b>" + x.name + "</b><br>" + x.address + "<br>")
            return m
        }
    }

    transformCarWorkshop(data) {
        let l = data.data.length
        if (l == 0) {
            let m = "There is no workshops available<br>"
            return m
        } else {
            let m = "You can find our workshops here:<br>"
            data.data.map(x => m += "<br><b>" + x.name + "</b><br>" + x.address + "<br>")
            return m
        }
    }

    transformCarTypes(data) {
        let l = data.data.length
        if (l == 0) {
            let m = "There is no cars available<br>"
            return m
        } else {
            let m = "following cars are currently available:<br>"
            data.data.map(x => m += "<br><b>" + x.name + "</b><br>" + x.description + "<br>")
            return m
        }
    }

    transformCarHelp(data) {
        let name = data.data === "" || typeof data.data === 'undefined' ? "ChaBot" : data.data
        let m = "----- Help -----<br>I am " + name + "!" +
            "<br>I can give you information about:<br>" +
            "<ul>" +
            "<li>Cars</li>" +
            "<li>News</li>" +
            "<li>Reseller</li>" +
            "<li>Workshops</li>" +
            "</ul>" +
            "If you want to know just write something like \"give me some news\" or \"which cars do you have?\"."
            + "<br>" +
            "I Hope I can help you!<br>"
        return m

    }
}
