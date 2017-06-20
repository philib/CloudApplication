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
            console.log(bot)
            this.renderer.setElementStyle(this.chatContent.nativeElement, 'background-color', bot.configuration.color)
            this.botData = bot;
            this.chat.push({
                msg: "Hello my name is "+ this.botData.name +", how can i help you?",
                from: "bot",
                color: bot.configuration.color
            })
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
                color: this.botData.color
            };

            this.chat.push(botMsg);

            this.bot.evaluateMessage(this.chatMessage, (response) => {
                botMsg.msg = response;
            });
            this.chatMessage = "";
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();//300ms animation speed
        }, 100)
    }

    eventHandler(keycode) {
        if (keycode == 13 && this.chatMessage.length > 0) {
            this.sendMessage();
        }
    }

}
