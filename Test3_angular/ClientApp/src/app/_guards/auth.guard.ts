import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_alert';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private alertify: AlertService) { } 

    canActivate(): boolean {
        if (this.authService.loggedIn) {
            return true;
        }

        console.log("You shall not Pass !!!!!");
        this.alertify.error("You shall not Pass !!!!!");
        this.router.navigate['/home'];
        return false;
    }

}
