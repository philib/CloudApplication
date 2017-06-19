import {Component} from "@angular/core";
import {ActionSheetController, AlertController, LoadingController, NavParams} from "ionic-angular";
import {BaseUrl} from "../../providers/baseUrl";
import {Http} from "@angular/http";

/*
 Generated class for the Cars page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-bill',
    templateUrl: 'bill.html'
})
export class BillPage {

    private Intent_News = 0
    private No_Intent = 0
    private Intent_CarRetailer = 0
    private Intent_CarWorkshop = 0
    private Intent_CarTypes = 0

    constructor(public navParams: NavParams, public http: Http, public alertCtrl: AlertController,
                public baseUrl: BaseUrl, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillPage')
        this.parseStatistics()
    }

    parseStatistics() {
        this.Intent_News = 0
        this.No_Intent = 0
        this.Intent_CarRetailer = 0
        this.Intent_CarWorkshop = 0
        this.Intent_CarTypes = 0
        this.navParams.data.tenant.configuration.chatHistory.map(x => {
            let intent = JSON.parse(x.botOutput).intent
            if (intent === 'No_Intent') this.No_Intent += 1
            else if (intent === 'Intent_News') this.Intent_News += 1
            else if (intent === 'Intent_CarRetailer') this.Intent_CarRetailer += 1
            else if (intent === 'Intent_CarWorkshop') this.Intent_CarWorkshop += 1
            else if (intent === 'Intent_CarTypes') this.Intent_CarTypes += 1
            else if (intent === 'Intent_News') this.Intent_News += 1
        })
    }

    pay() {


    }

}
