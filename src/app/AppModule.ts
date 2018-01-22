import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './reducers/core.reducer';
import { CustomRouterStateSerializer } from './utils/Utils';

// import settings
import { AppSettings } from './shared/enums/AppSettings';

// import new module
import { AppRoutingModule } from './AppRoutingModule';
import {
    CoreModule,
    AuthModule,
    HomeModule
} from './modules/index';

// import app component
import { AppPageComponent } from './containers/app/app.page';
import {TokenInterceptor} from "./TokenInterceptor";
import {BaseService} from "./services/BaseService";
import {ApiHelpers} from "./utils/ApiHelpers";
import {UserStore} from "./store/UserStore";

@NgModule({
    declarations: [
        AppPageComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule,
        AppSettings.ENVIRONMENT === 'dev' ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),

        AppRoutingModule,
        CoreModule.forRoot(),
        AuthModule.forRoot(),
        HomeModule.forRoot()
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomRouterStateSerializer
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        BaseService,
        ApiHelpers,
        UserStore
    ],
    bootstrap: [AppPageComponent]
})

export class AppModule { }
