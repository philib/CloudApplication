import {Component} from "@angular/core";
import {LoadingController, NavController, NavParams} from "ionic-angular";
import {ConfigurationPage} from "../configuration/configuration";
import {CarsPage} from "../cars/cars";
import {NewsPage} from "../news/news";
import {RepairServicePage} from "../repair-service/repair-service";
import {ResellerPage} from "../reseller/reseller";
import {BaseUrl} from "../../providers/baseUrl";
import {Http} from "@angular/http";
import {BillPage} from "../bill/bill";

/*
 Generated class for the Tabs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tenantSessionData;
  tab1Root = ConfigurationPage;
  tab2Root = CarsPage;
  tab3Root = NewsPage;
  tab4Root = RepairServicePage;
  tab5Root = ResellerPage;
  tab6Root = BillPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public baseUrl: BaseUrl, public http: Http) {
    console.log("-----Tabs----")
    console.log(this.navParams.data)
    this.tenantSessionData = this.navParams.data;
    this.reloadConfiguration()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  reloadConfiguration() {
    this.http.get(this.baseUrl.getTenantConfigurationUrl(this.navParams.data.tenant._id, this.navParams.data.token)).map(res => res.json())

        .subscribe(data => {
              console.log('data from add car:')
              console.log(data)
              this.navParams.data.tenant.configuration = data

            },
            error => {
              console.log("could not get all cars")
            });
  }




}
