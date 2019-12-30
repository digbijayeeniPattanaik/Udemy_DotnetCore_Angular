import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/Message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_alert';
import { tap } from 'rxjs/operators';
@Component({
    selector: 'app-member-messages',
    templateUrl: './member-messages.component.html',
    styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
    @Input() recipientId: number;
    messages: Message[];
    newMessages: any = {};
    constructor(private userService: UserService, private authService: AuthService, private alertify: AlertService) { }

    ngOnInit() {
        this.loadMessage();
    }

    loadMessage() {
        const currentUserId = +this.authService.decodedToken.nameid;
        this.userService.getMessageThread(currentUserId, this.recipientId)
            .pipe(
                tap(messages => {
                    for (let i = 0; i < messages.length; i++) {
                        if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
                            this.userService.markMessageAsRead(currentUserId, +messages[i].id);
                        }
                    }
                }) 
            )
            .subscribe(messages =>
            {
                console.log(messages);
                this.messages = messages
            },
                error => {
            this.alertify.alert(error);
        })
    }

    sendMessage() {
        this.newMessages.recipientId = this.recipientId;
        this.userService.sendMessages(this.authService.decodedToken.nameid, this.newMessages).subscribe((message: Message) => {
            this.messages.unshift(message)
            this.newMessages.content = '';
        }, error => {
            this.alertify.error(error)
        })
    }

}
