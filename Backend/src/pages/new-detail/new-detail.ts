import {Component} from "@angular/core";
import {ActionSheetController, LoadingController, NavController, NavParams} from "ionic-angular";
import {Http} from "@angular/http";
import {BaseUrl} from "../../providers/baseUrl";

/*
 Generated class for the NewDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-detail',
  templateUrl: 'new-detail.html'
})

export class NewDetailPage {
  private item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public baseUrl: BaseUrl, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {

    this.item = navParams.data.item;
    console.log(navParams.data.tenantConfig)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDetailPage');
  }

  deleteMsg(msg) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete ' + msg.title,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log("car: ")
            console.log(msg)
            this.navParams.data.tenantConfig.tenant.configuration.news = this.navParams.data.tenantConfig.tenant.configuration.news.filter(function (el) {
              return el._id !== msg._id;
            });
            console.log('Destructive clicked removing car...');
            this.putNewConfiguration('Delete new: ' + msg.title)
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  putNewConfiguration(msg) {
    let loader = this.loadingCtrl.create({
      content: msg,
    });


    let url = this.baseUrl.getTenantConfigurationUrl(this.navParams.data.tenantConfig.tenant._id, this.navParams.data.tenantConfig.token);

    this.http.put(url, this.navParams.data.tenantConfig.tenant.configuration).map(res => res.json())

        .subscribe(data => {
              loader.dismissAll();
              console.log('data from add car:')
              console.log(data)
              this.navCtrl.pop();

            },
            error => {
              loader.dismissAll();
            });
  }
}
