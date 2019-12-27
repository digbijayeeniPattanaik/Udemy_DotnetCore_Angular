import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
    registerMode = false;
    values: any;

    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.getValues();
    }

    registerToggle() {
        this.registerMode = !this.registerMode;
    }

    getValues() {
        this.http.get("https://localhost:44341/api/values").subscribe(response => { this.values = response; }), error => {
            console.log(error)
        };
    }

    cancelRegisterMode(registerMode: boolean) {
        this.registerMode = registerMode;
    }
}
