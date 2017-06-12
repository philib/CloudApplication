import {Component} from "@angular/core";
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {BaseUrl} from "../../providers/baseUrl";
import {TabsPage} from "../tabs/tabs";
/*
 Generated class for the Register page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private companyName;
  private password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public baseUrl: BaseUrl, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    console.log("Calling REST : " + this.baseUrl.getTenantsRegisterUrl())
    let newRegistration = {
      "name": this.companyName,
      "password": this.password
    };
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.http.post(this.baseUrl.getTenantsRegisterUrl(), newRegistration).map(res => res.json())

        .subscribe(data => {
              loader.dismissAll();
              this.login()

            },
            error => {
              loader.dismissAll();
              let alert = this.alertCtrl.create({
                title: 'Dear ' + newRegistration.name,
                subTitle: 'Something went wrong.',
                buttons: ['Dismiss']
              });
              alert.present();
            });

  }


  login() {
    let loader = this.loadingCtrl.create({
      content: "Registering... please wait...",
    });
    loader.present();
    console.log("Calling REST : " + this.baseUrl.getTenantsLoginUrl())
    let loginData = {
      "name": this.companyName,
      "password": this.password
    };
    this.http.post(this.baseUrl.getTenantsLoginUrl(), loginData).map(res => res.json())
        .subscribe(data => {
              loader.dismissAll();
              console.log(data)
              this.navCtrl.push(TabsPage, data)
            },
            error => {
              loader.dismissAll();
              let alert = this.alertCtrl.create({
                title: 'Dear ' + loginData.name,
                subTitle: 'Something went wrong.',
                buttons: ['Dismiss']
              });
              alert.present();
            });
  }


}
