import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_alert';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: User;
    @Input() valuesFromHome: any;
    @Output() cancelRegister = new EventEmitter();
    registerForm: FormGroup;
    bsConfig: Partial<BsDatepickerConfig>;

    constructor(private authService: AuthService, private alertify: AlertService, private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        //this.registerForm = new FormGroup({
        //    username: new FormControl('', Validators.required),
        //    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        //    confirmPassword: new FormControl('', Validators.required)
        //}, this.passwordMatchValidator);

        this.bsConfig = {
            containerClass : 'theme-red'
        }
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.fb.group(
            {
                gender: ['male'],
                username: ['', Validators.required],
                knownAs: ['', Validators.required],
                dateOfBirth: [null, Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: this.passwordMatchValidator
            }
        );
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
    }

    register() {

        if (this.registerForm.valid) {
            this.user = Object.assign({}, this.registerForm.value);
            this.authService.register(this.user).subscribe(() => {
                this.alertify.success("Registration Successful");
            }, error => {
                    this.alertify.error(error);
            },
                () => {
                    this.authService.login(this.user).subscribe(() => {
                        this.router.navigate(['/members']);
                    })
                })
        }
        ////this.authService.register(this.model).subscribe(() => {
        ////    this.alertify.success("Registration successful");
        ////    console.log("Registration successful")
        ////}, error => {
        ////    this.alertify.error(error);
        ////    console.log(error)
        ////});
        //console.log(this.registerForm.value);
    }

    cancel() {
        this.cancelRegister.emit(false);
        console.log('cancelled');
    }
}
