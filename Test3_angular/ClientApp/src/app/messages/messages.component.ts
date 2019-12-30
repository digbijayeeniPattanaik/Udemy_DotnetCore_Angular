import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/pagination';

import { Message } from '../_models/Message';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_alert';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    messages: Message[];
    pagination: Pagination;
    messageContainer = 'Unread';
    constructor(private route: ActivatedRoute, private userService: UserService,
        private authService: AuthService, private alertify: AlertService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.messages = data['messages'].results;
            this.pagination = data['messages'].pagination;
        })
       
    };

    loadMessages() {
        this.userService.getMessages(this.authService.decodedToken.nameid, String(this.pagination.currentPage),
            String(this.pagination.itemsPerPage), this.messageContainer)
            .subscribe((res: PaginatedResult<Message[]>) => {
                this.messages = res.results;
                this.pagination = res.pagination
            }, error => {
                this.alertify.error(error);
            });
    }

    pageChanges(event: any) {
        this.pagination.currentPage = event.page;
        this.loadMessages();
    }

    deleteMessage(messageid: number) {
        console.log("Message id is " + messageid);
        this.alertify.onAlert('Are you sure you want to delete the message?')
        this.userService.deleteMessage(this.authService.decodedToken.nameid, messageid).subscribe(() => {
            this.messages.splice(this.messages.findIndex(a => a.id == messageid), 1);
            this.alertify.success("Message deleted successfully");
        }, error => this.alertify.error(error))
    }

}
