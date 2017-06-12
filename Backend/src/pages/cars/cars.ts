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
  selector: 'page-cars',
  templateUrl: 'cars.html'
})
export class CarsPage {

  constructor(public navParams: NavParams, public http: Http, public alertCtrl: AlertController,
              public baseUrl: BaseUrl, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarsPage');
  }

  addCar() {
    console.log("add car Click")
    let prompt = this.alertCtrl.create({
      title: 'New Car',
      message: "Enter a name for this new Car and some Description",
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }, {
          name: 'description',
          placeholder: 'description'
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
          handler: newCar => {
            let msg = "Adding " + newCar.name + " ...";
            this.navParams.data.tenant.configuration.cars.push(newCar)
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
      this.navParams.data.tenant.configuration.cars  = this.navParams.data.tenant.configuration.cars.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  presentActionSheet(car) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete ' + car.name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log("car: ")
            console.log(car)
            this.navParams.data.tenant.configuration.cars =this.navParams.data.tenant.configuration.cars.filter(function(el) {
              return el._id !== car._id;
            });

            this.putNewConfiguration('Deleting Car : '+car.name)
            console.log('Destructive clicked removing car...');

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
