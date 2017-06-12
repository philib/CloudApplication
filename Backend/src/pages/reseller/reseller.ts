import {Component} from "@angular/core";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {AddResellerPage} from "../add-reseller/add-reseller";
import {ResellerDetailPage} from "../reseller-detail/reseller-detail";

/*
 Generated class for the Reseller page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-reseller',
  templateUrl: 'reseller.html'
})
export class ResellerPage {

  constructor(public navCtrl: NavController,public navParams: NavParams, public modalCtrl: ModalController) {

    console.log(this.navParams.data.tenant.configuration.repairService)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResellerPage');
  }

  openings = [];


  daysInWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];


  addReseller() {
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


    let modal = this.modalCtrl.create(AddResellerPage, {
      tenant: this.navParams.data.tenant,
      token: this.navParams.data.token,
      item: repairService
    });
    modal.present();
  }

  goToDetailView(repairService) {
    console.log("Reseller: ")
    console.log(repairService)
    this.navCtrl.push(ResellerDetailPage, {
      tenant: this.navParams.data.tenant,
      token: this.navParams.data.token,
      item: repairService
    });
  }
}
