import { Observable } from 'rxjs/Observable';
import { Category } from './../shared/models/category.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'category-list',
    template: `  <ul class="list-group">
        <li class="list-group-item" *ngFor="let cat of source | async">{{cat.text}} <span class="badge badge-default">{{cat.predictionsCount}}</span></li>
      </ul>`
})
export class CategoryListComponent implements OnInit {
    @Input() source: Observable<Category[]>;
    constructor() { }

    ngOnInit() { }
}