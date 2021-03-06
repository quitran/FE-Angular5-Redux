import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAngularForms from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import { HomeRoutingModule } from './HomeRoutingModule';
import { AuthService } from '../services/AuthService';

import { HomeComponent } from '../containers/home/HomePageComponent';

const COMPONENTS = [
    HomeComponent
];

@NgModule({
    exports: COMPONENTS,
    imports: [
        CommonModule,
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        HomeRoutingModule
    ],
    declarations: COMPONENTS
})
export class HomeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HomeModule,
            providers: [
                AuthService
            ]
        };
    }
}
