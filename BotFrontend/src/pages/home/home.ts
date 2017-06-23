import {Component, Renderer, ViewChild} from "@angular/core";
import {Bot} from "../../providers/bot";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('chatContent') chatContent;
    public botData;
    public chat = [];
    public chatMessage = "";
    @ViewChild('content') content;

    constructor(public bot: Bot, public renderer: Renderer) {
    }

    ionViewDidLoad() {
        this.bot.watchBot().subscribe(bot => {
            console.log("Bot", bot)

            let color = "#32db64"
            if (bot.configuration && bot.configuration.color) {
                color = bot.configuration.color
            }
            console.log("color", color)
            this.renderer.setElementStyle(this.chatContent.nativeElement, 'background-color', color)

            this.botData = bot
            if (bot.name) {

                this.chat.push({
                    msg: "Hello my name is " + bot.name + ", how can i help you?",
                    from: "bot",
                    color: color
                })
            }
            setTimeout(() => {
                this.style();
            }, 10)

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
                from: "bot",
                color: this.botData.color || "#32db64"
            };

            this.chat.push(botMsg);

            this.bot.evaluateMessage(this.chatMessage, (response) => {
                botMsg.msg = response;
            });
            this.chatMessage = "";
            this.scrollToBottom();

            setTimeout(() => {
                this.style();
            }, 10)
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();//300ms animation speed
        }, 100)
    }

    style() {
        let col = "#32db64"
        if(this.botData.configuration && this.botData.configuration.color){
            col =this.botData.configuration.color
        }
        var chatlist = document.getElementsByClassName('bot')

        for (var i = 0; i < chatlist.length; ++i) {
            var item = chatlist[i];
            item.setAttribute('style', "background-color:" + col || 'green')
            console.log("item", item)
        }
    }

    eventHandler(keycode) {
        if (keycode == 13 && this.chatMessage.length > 0) {
            this.sendMessage();
        }
    }

}
