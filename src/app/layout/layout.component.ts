import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'nostradamus-layout',
    template: `
     <div>
        <top-nav-bar></top-nav-bar>
     </div>
     <main>
     <router-outlet></router-outlet>
     </main>
    `
})
export class FeatureComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}