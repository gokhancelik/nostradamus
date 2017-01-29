import { TypeaheadMatch } from 'ng2-bootstrap/ng2-bootstrap';
import { Router } from '@angular/router';
import { CategoryService } from './../shared/services/category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from './../shared/models/category.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'category-list',
    templateUrl: 'category.list.component.html'
})
export class CategoryListComponent implements OnInit {
    categories: Category[];
    searching = false;
    searchFailed = false;

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .map(term => term === '' ? []
                : this.categories.filter(v => new RegExp(term, 'gi').test(v.text)).slice(0, 10));

    formatter = (x: { text: string }) => x.text;
    @Input() source: Observable<Category[]>;
    constructor(private categoryService: CategoryService, private router: Router) {
        this.categoryService.search().take(1).subscribe(
            data => this.categories = data
        );
    }

    ngOnInit() { }
    categoryOnSelect($event: TypeaheadMatch) {
        this.router.navigate(['/category/' + $event.item.id]);
    }
}