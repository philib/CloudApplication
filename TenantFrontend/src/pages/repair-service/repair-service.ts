import {Component} from "@angular/core";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {AddRepairServicePage} from "../add-repair-service/add-repair-service";
import {RepairServiceDetailPage} from "../repair-service-detail/repair-service-detail";

/*
 Generated class for the RepairService page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-repair-service',
    templateUrl: 'repair-service.html'
})
export class RepairServicePage {
    openings = [];


    daysInWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'];

    constructor(public navCtrl: NavController,public navParams: NavParams, public modalCtrl: ModalController) {

        console.log(this.navParams.data.tenant.configuration.repairService)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RepairServicePage');
    }

    addRepairService() {
        for (let i = 0; i < this.daysInWeek.length; i++) {
            this.openings[i] = {
                day: this.daysInWeek[i],
                from: "08:00",
                until: "18:00",
                isOpen: false
            }
        }

        let repairService = {
            name: "",
            address: "",
            openings: this.openings
        }


        let modal = this.modalCtrl.create(AddRepairServicePage, {
            tenant: this.navParams.data.tenant,
            token: this.navParams.data.token,
            item: repairService
        });
        modal.present();
    }

    goToDetailView(repairService) {

        this.navCtrl.push(RepairServiceDetailPage, {
            tenant: this.navParams.data.tenant,
            token: this.navParams.data.token,
            item: repairService
        });

    }

}
