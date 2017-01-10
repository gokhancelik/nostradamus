import { ComponentsModule } from './components/components.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { CountDownComponent } from './components/countdown.component';
import { SharedModule } from './shared/shared.module';
import { PredictionModule } from './prediction/prediction.module';
import { AuthService } from './security/auth.service';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { ButtonsModule } from 'ng2-bootstrap/buttons';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthService
];
const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDoo9s6n0_yoXwcf9YMJWaLXPBxpKidC7I',
  authDomain: 'nostradamus-14484.firebaseapp.com',
  databaseURL: 'https://nostradamus-14484.firebaseio.com',
  storageBucket: 'nostradamus-14484.appspot.com',
  messagingSenderId: '861252700538'
};
type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG, myFirebaseAuthConfig),
    NgbModule.forRoot(),
    LoginModule,
    ProfileModule,
    HomeModule,
    ComponentsModule,
    ButtonsModule.forRoot(),
    PredictionModule,
    SharedModule,
    CategoryModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})

export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
