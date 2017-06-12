import {Component} from "@angular/core";
import {ActionSheetController, LoadingController, NavParams, ViewController} from "ionic-angular";
import {BaseUrl} from "../../providers/baseUrl";
import {Http} from "@angular/http";

/*
 Generated class for the RepairServiceDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-repair-service-detail',
    templateUrl: 'repair-service-detail.html'
})
export class RepairServiceDetailPage {
    repairStore;

    constructor(public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http, public viewCtrl: ViewController,
                public actionSheetCtrl: ActionSheetController, public baseUrl: BaseUrl) {
        this.repairStore = this.navParams.data.item
        console.log(this.navParams.data.tenant.configuration.repairService)
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad RepairServiceDetailPage');
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

    deleteReseller() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Delete ' + this.repairStore.name,
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        console.log("Reseller: ")
                        console.log(this.repairStore)

                        let repair = this.repairStore
                        this.navParams.data.tenant.configuration.repairService =
                            this.navParams.data.tenant.configuration.repairService.filter(function (el) {
                                return el._id !== repair._id;
                            });

                        this.putNewConfiguration('Deleting Repair Service : ' + this.repairStore.name)
                        console.log('Destructive clicked removing car...');
                        this.dismiss()

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


        let url = this.baseUrl.getTenantConfigurationUrl(this.navParams.data.tenant._id, this.navParams.data.token);

        this.http.put(url, this.navParams.data.tenant.configuration).map(res => res.json())

            .subscribe(data => {
                    loader.dismissAll();
                    console.log('data from add car:')
                    console.log(data)
                    this.reloadConfiguration()

                },
                error => {
                    loader.dismissAll();
                });
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
