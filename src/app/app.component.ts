/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
   <router-outlet></router-outlet>
   `
})
export class AppComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
  }
}
