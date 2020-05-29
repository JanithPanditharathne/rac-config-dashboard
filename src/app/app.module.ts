import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppMainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';

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
