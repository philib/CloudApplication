import { Component } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseUrl} from "../../providers/baseUrl";
import {Http} from "@angular/http";
import {NewDetailPage} from "../new-detail/new-detail";

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController,
              public baseUrl: BaseUrl, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
    console.log(this.navParams.data.tenant.configuration.news)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  addNew(){

    console.log("add car Click")
    let prompt = this.alertCtrl.create({
      title: 'New',
      message: "Enter a title and some description",
      inputs: [
        {
          name: 'title',
          placeholder: 'title'
        }, {
          name: 'description',
          placeholder: 'description',
          type : 'textarea'
        },
        {
          name: 'date',
          placeholder: 'date',
          type : 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: newMsg => {
            let msg = "Adding message : "+newMsg.name + " ...";
            this.navParams.data.tenant.configuration.news.push(newMsg)
            this.putNewConfiguration(msg)


          }
        }
      ]
    });
    prompt.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.reloadConfiguration()

    // set val to the value of the searchbar
    let val = ev.target.value;


    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.navParams.data.tenant.configuration.news  = this.navParams.data.tenant.configuration.news.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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
  openNavDetailsPage(item) {
    this.navCtrl.push(NewDetailPage, { item: item, "tenantConfig" : this.navParams.data });
  }
}
