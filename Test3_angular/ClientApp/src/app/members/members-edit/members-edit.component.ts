import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_alert';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-members-edit',
    templateUrl: './members-edit.component.html',
    styleUrls: ['./members-edit.component.css']
})
export class MembersEditComponent implements OnInit {
    @ViewChild('editForm', { static: false }) editForm: NgForm
    @HostListener('window.beforerunload', ['$event'])
    unloadNotification($event: any) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    }
    user: User;
    photoUrl: string;
    constructor(private route: ActivatedRoute, private alertify: AlertService, private userService: UserService, private authService: AuthService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['user'];
        });

        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    updateUser() {
        this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
            this.alertify.success("Profile updated")
            this.editForm.reset(this.user);
        }, error => {
            this.alertify.error(error);
        });
    }

    updateMainPhoto(photoUrl: string) {
        this.user.photoUrl = photoUrl;
    }

}
