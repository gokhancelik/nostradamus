import { AngularFire } from 'angularfire2';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'top-nav-bar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    constructor(private af: AngularFire) { }

    ngOnInit() {
        this.af.auth.subscribe(
            a => console.log(a)
        )
    }
    logout() {
        this.af.auth.logout();

    }
}
