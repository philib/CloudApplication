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

  constructor(public navParams: NavParams, public http: Http, public alertCtrl: AlertController,
              public baseUrl: BaseUrl, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
  }
  pay(){
    

  }

}
