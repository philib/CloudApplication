import {Component} from "@angular/core";
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {BaseUrl} from "../../providers/baseUrl";
import {Http} from "@angular/http";

/*
 Generated class for the AddRepairService page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-add-repair-service',
    templateUrl: 'add-repair-service.html'
})
export class AddRepairServicePage {
    openings = [];
    companyName;
    address;


    constructor(public viewCtrl: ViewController, public navParams: NavParams, public http: Http,
                public baseUrl: BaseUrl, public loadingCtrl: LoadingController) {
        console.log(this.navParams.data.tenant)
        console.log(this.navParams.data.item)

        this.openings = this.navParams.data.item.openings
        this.companyName = this.navParams.data.item.companyName
        this.address = this.navParams.data.item.address
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddRepairServicePage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    addNewRepairService() {
        let openingsFinal = []
        for (let entry of this.openings) {
            if (entry.isOpen) {
                openingsFinal.push({
                    day : entry.day,
                    from: entry.from,
                    until: entry.until,
                })
            }
        }
        let repairService = {
            name: this.companyName,
            address: this.address,
            openings: openingsFinal
        }

        this.navParams.data.tenant.configuration.repairService.push(repairService)
        this.putNewConfiguration("adding new repair service")
        this.dismiss()


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
