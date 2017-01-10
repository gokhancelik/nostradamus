import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
           alert(params['id']);
        });
    }
}