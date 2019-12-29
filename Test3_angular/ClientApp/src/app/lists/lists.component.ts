import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_alert';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    users: User[];
    pagination: Pagination;
    likesParam: string;
    constructor(private authService: AuthService, private alertify: AlertService, private userService: UserService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.users = data['users'].result;
            this.pagination = data['users'].pagination
        });
        this.likesParam = 'Likers'
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        console.log(this.pagination.currentPage);
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
            .subscribe((res: PaginatedResult<User[]>) => {
            this.users = res.results;
            this.pagination = res.pagination;
        }, error => {
            this.alertify.error(error);
        });
    }

}
