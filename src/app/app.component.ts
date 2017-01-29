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
  <div class="container">
   <router-outlet></router-outlet>
   </div>
   `
})
export class AppComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
  }
}
