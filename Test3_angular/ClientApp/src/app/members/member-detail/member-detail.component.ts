import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_alert';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';
import { AuthService } from '../../_services/auth.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
    user: User;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
    constructor(private userService: UserService, private alertify: AlertService, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['user'];
        })
        this.route.queryParams.subscribe(params => {
            const selectedTab = params['tab'];
            this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
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

    selectTab(tabId: number) {
        ////Passed 3 from the html because the tabset is having an array of tabs and messages comes on 4rth position.We also added memberTabs to the html tag.
        this.memberTabs.tabs[tabId].active = true;
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
