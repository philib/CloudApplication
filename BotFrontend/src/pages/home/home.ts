import {Component, Renderer} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Bot} from "../../providers/bot";
import {ViewChild} from "@angular/core";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('chatContent') chatContent;
    private chatbotName = "" //TODO get this from env variable from heroku so we can display different names on header
    public chat = [];
    public chatMessage = "";

    @ViewChild('content') content;
    constructor(public bot: Bot, public navCtrl: NavController, public renderer: Renderer) {
    }

    ionViewDidLoad(){
        this.bot.watchBot().subscribe(bot =>{
            console.log(bot)
            this.renderer.setElementStyle(this.chatContent.nativeElement, 'background-color', bot.configuration.color)
            this.chatbotName = bot.name;
        })
    }

    sendMessage() {

        if (this.chatMessage.length > 0) {
            this.chat.push({
                msg: this.chatMessage,
                from: "user"
            });
            this.scrollToBottom();

            let botMsg = {
                msg: null,
                from: "bot"
            };

            this.chat.push(botMsg);

            this.bot.evaluateMessage(this.chatMessage, (response) => {
                botMsg.msg = response;
            });
            this.chatMessage = "";
            this.scrollToBottom();
        }
    }

    scrollToBottom(){
        setTimeout(()=>{
            this.content.scrollToBottom();//300ms animation speed
        },100)
    }

    eventHandler(keycode){
        if(keycode == 13 && this.chatMessage.length > 0){
            this.sendMessage();
        }
    }

}
