import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AppComponent } from './app.component';

import { AppMainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';

import { initializer } from '../app-init';

/**
 * Application module.
 * @class AppModule
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  imports: [BrowserModule, AppMainModule, AppRoutingModule, TypeaheadModule.forRoot(), KeycloakAngularModule]
})
export class AppModule {
}
