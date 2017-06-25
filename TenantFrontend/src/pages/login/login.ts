import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {animate, Component, keyframes, state, style, transition, trigger} from "@angular/core";
import {RegisterPage} from "../register/register";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {BaseUrl} from "../../providers/baseUrl";
import {TabsPage} from "../tabs/tabs";
import {Storage} from '@ionic/storage'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    animations: [

        //For the logo
        trigger('flyInBottomSlow', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                style({transform: 'translate3d(0,2000px,0'}),
                animate('2000ms ease-in-out')
            ])
        ]),

        //For the background detail
        trigger('flyInBottomFast', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                style({transform: 'translate3d(0,2000px,0)'}),
                animate('1000ms ease-in-out')
            ])
        ]),

        //For the login form
        trigger('bounceInBottom', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                animate('2000ms 200ms ease-in', keyframes([
                    style({transform: 'translate3d(0,2000px,0)', offset: 0}),
                    style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
                    style({transform: 'translate3d(0,0,0)', offset: 1})
                ]))
            ])
        ]),

        //For login button
        trigger('fadeIn', [
            state('in', style({
                opacity: 1
            })),
            transition('void => *', [
                style({opacity: 0}),
                animate('1000ms 2000ms ease-in')
            ])
        ])
    ]
})
export class LoginPage {

    private companyName;
    private password;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                public baseUrl: BaseUrl, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private storage: Storage) {
        this.storage.get('tenant').then(value => {
            if(value){
                this.http.get(this.baseUrl.getTenantConfigurationUrl(value.tenant._id,value.token)).map(res => res.json()).subscribe(data => {
                    value.configuration=data;
                    this.navCtrl.push(TabsPage, value)
                })
            }
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login() {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        console.log("Calling REST : " + this.baseUrl.getTenantsLoginUrl())
        let loginData = {
            "name": this.companyName,
            "password": this.password
        };
        this.http.post(this.baseUrl.getTenantsLoginUrl(), loginData).map(res => res.json())
            .subscribe(data => {
                    loader.dismissAll();
                    console.log(data)
                this.storage.set("tenant", data)
                    this.navCtrl.push(TabsPage, data)},
                error => {
                    loader.dismissAll();
                    let alert = this.alertCtrl.create({
                        title: 'Dear ' + loginData.name,
                        subTitle: 'Something went wrong.',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                });
    }

    register() {
        console.log("go to RegisterPage:")
        this.navCtrl.push(RegisterPage)
    }

}
