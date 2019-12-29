import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_alert';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
    @Input() user: User
    constructor(private authService: AuthService, private userService: UserService, private alertify: AlertService) { }

    ngOnInit() {
    }

    sendLike(id: number) {
        console.log(id);
        this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
            this.alertify.success("You have liked: " + this.user.knownAs);
        }, error => {
            this.alertify.error(error);
        })
    }

}
