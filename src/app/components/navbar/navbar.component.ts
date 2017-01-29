import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'top-nav-bar',
    styleUrls: ['navbar.css'],
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    users: User[];
    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .map(term => term === '' ? []
                : this.users.filter(v => new RegExp(term, 'gi').test(v.name)).slice(0, 10));

    formatter = (x: { text: string }) => x.text;
    constructor(private af: AngularFire, private userService: UserService) {
        this.userService.getAll().subscribe(
            data => this.users = data
        );
    }

    ngOnInit() {
        this.af.auth.subscribe(
            // a => console.log(a)
        )
    }
    logout() {
        this.af.auth.logout();

    }
    userOnSelect() {

    }
}
