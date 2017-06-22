import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ViewChild} from "@angular/core/src/metadata/di";
import {BaseUrl} from "../../providers/baseUrl";
import {Http} from "@angular/http";
declare let Huebee: any;
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
    @ViewChild("picker") picker;
    isOnEdit = true;

    constructor(public http: Http, public baseUrl: BaseUrl, public navCtrl: NavController, public navParams: NavParams) {
        if (!this.navParams.data.tenant.configuration.hasOwnProperty('botName')) {
            this.navParams.data.tenant.configuration.botName = ""
        }
        console.log(this.navParams.data.tenant.name)
        console.log(this.navParams.data.tenant.configuration.botName)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ConfigurationPage');
        var hueb = new Huebee(this.picker.nativeElement, {
            // options
            setBGColor: true,
            saturations: 2,
        });

        hueb.on('change', (color, hue, sat, lum) => {
            console.log('color changed to: ' + color)
            console.log(this.navParams)
            this.navParams.data.tenant.configuration.color = color;
        })
    }

    changeEditState() {
        this.isOnEdit = this.isOnEdit ? false : true;


    }

    discardChanges() {
        this.changeEditState()

    }

    saveChanges() {
        let url = this.baseUrl.getTenantConfigurationUrl(this.navParams.data.tenant._id, this.navParams.data.token);

        this.http.put(url, this.navParams.data.tenant.configuration).map(res => res.json())
            .subscribe(data => {
                    this.changeEditState()
                },
                error => {
                });
    }
}
