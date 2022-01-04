import {ToastModule} from 'ng-uikit-pro-standard';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {ViewsModule} from './views/views.module';
import {SharedModule} from './shared/shared.module';
import { MDBBootstrapModulesPro, MDBSpinningPreloader, ToastService} from 'ng-uikit-pro-standard';

import {AgmCoreModule} from '@agm/core';
import {ErrorModule} from './views/errors/error.module';

// main layout
import {NavigationModule} from './main-layout/navigation/navigation.module';
import { AppCommons } from './app.commons';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntersepterBasicAuthService } from './services/configuration/http-intersepter-basic-auth.service';
import { DatePipe } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        MDBBootstrapModulesPro.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        NavigationModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        ViewsModule,
        ErrorModule,
        ToastModule.forRoot(),
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'your key here'
        })
    ],
    providers: [
      MDBSpinningPreloader, ToastService, AppCommons, DatePipe, BnNgIdleService,
      { provide: HTTP_INTERCEPTORS, useClass: HttpIntersepterBasicAuthService, multi: true },
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    export class AppModule { }