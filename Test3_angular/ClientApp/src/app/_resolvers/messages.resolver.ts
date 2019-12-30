import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_alert';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    pageNumber ="1";
    pageSize = "5";
    messageContainer = "Outbox";
    constructor(private userService: UserService, private router: Router,
        private alertify: AlertService, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService
            .getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
            .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data due to ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
