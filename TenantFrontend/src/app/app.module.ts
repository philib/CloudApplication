import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {LoginPage} from '../pages/login/login'
import {RegisterPage} from '../pages/register/register'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BaseUrl} from "../providers/baseUrl"
import {TabsPage} from "../pages/tabs/tabs";
import {ConfigurationPage} from "../pages/configuration/configuration";
import {CarsPage} from "../pages/cars/cars";
import {ResellerPage} from "../pages/reseller/reseller";
import {RepairServicePage} from "../pages/repair-service/repair-service";
import {NewsPage} from "../pages/news/news";
import {NewDetailPage} from "../pages/new-detail/new-detail";
import {AddRepairServicePage} from "../pages/add-repair-service/add-repair-service";
import {RepairServiceDetailPage} from "../pages/repair-service-detail/repair-service-detail";
import {AddResellerPage} from "../pages/add-reseller/add-reseller";
import {ResellerDetailPage} from "../pages/reseller-detail/reseller-detail";

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        RegisterPage,
        ConfigurationPage,
        TabsPage,
        CarsPage,
        ResellerPage,
        RepairServicePage,
        NewsPage,
        NewDetailPage,
        AddRepairServicePage,
        RepairServiceDetailPage,
        AddResellerPage,
        ResellerDetailPage

    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        RegisterPage,
        ConfigurationPage,
        TabsPage,
        CarsPage,
        ResellerPage,
        RepairServicePage,
        NewsPage,
        NewDetailPage,
        AddRepairServicePage,
        RepairServiceDetailPage,
        AddResellerPage,
        ResellerDetailPage


    ],
    providers: [
        StatusBar,
        SplashScreen,
        BaseUrl,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
