import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

/*
 Generated class for the Configuration page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  isOnEdit = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(!this.navParams.data.tenant.hasOwnProperty('botName')){
      this.navParams.data.tenant.batName = "";
    }
    if(!this.navParams.data.tenant.hasOwnProperty('botName')){
      this.navParams.data.tenant.batName = "";
    }
    console.log(this.navParams.data.tenant.name)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  changeEditState() {
    this.isOnEdit = this.isOnEdit ? false : true;


  }

  discardChanges() {
    this.changeEditState()

  }

  saveChanges() {
    this.changeEditState()

  }

}
