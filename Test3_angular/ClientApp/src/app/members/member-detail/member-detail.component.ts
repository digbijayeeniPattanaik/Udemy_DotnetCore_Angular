import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_alert';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
    user: User;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private userService: UserService, private alertify: AlertService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['user'];
        })

        //this.loadUser();
        console.log(this.user);

        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: false
            }
        ];
        this.galleryImages = this.getImages();
        
    }

    getImages() {
        const imageUrls = [];
        for (let i = 0; i < this.user.photos.length; i++) {
            imageUrls.push({
                small: this.user.photos[i].url,
                medium: this.user.photos[i].url,
                big: this.user.photos[i].url,
                description: this.user.photos[i].description
            });
        }
        return imageUrls;
    }

    loadUser() {
        this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
            (user: User) => {
                this.user = user;
                
                console.log(user);
            },
            error => { this.alertify.error(error) });
    }

}