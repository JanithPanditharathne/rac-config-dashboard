import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMainModule } from './main/main.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/**
 * Application module.
 * @class AppModule
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [BrowserModule, AppMainModule, AppRoutingModule]
})
export class AppModule {
}
