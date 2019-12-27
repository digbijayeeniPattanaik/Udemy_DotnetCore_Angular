import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { AlertService } from '../../_alert';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
    users: User[];
    pagination: Pagination;
    user: User = JSON.parse(localStorage.getItem("user"));
    genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
    userParams: any = {};
    constructor(private userService: UserService, private alertify: AlertService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.users = data['users'].results;
            this.pagination = data['users'].pagination;
        });
        ////this.loadUsers();

        this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.userParams.orderBy = "lastActive";
    }

    resetFilter() {
        this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.userParams.orderBy = "lastActive";
        this.loadUsers();
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        console.log(this.pagination.currentPage);
        this.loadUsers();
    }


    ////loadUsers() {
    ////    this.userService.getUsers().subscribe((users: User[]) => {
    ////        this.users = users;
    ////    }, error => {
    ////            this.alertify.error(error);
    ////    });
    ////}

    loadUsers() {
        this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<User[]>) => {
            this.users = res.results;
            this.pagination = res.pagination;
        }, error => {
            this.alertify.error(error);
        });
    }
}
