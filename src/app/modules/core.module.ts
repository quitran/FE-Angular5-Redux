import { NgModule } from '@angular/core';
import * as fromAngularForms from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import core containers
import { NotFoundComponent } from '../containers/not-found/NotFoundComponent';

// import core components
import { ShowErrorsComponent } from '../components/show-errors.component';
import { LayoutComponent } from '../components/layout.component';

// import core directives
import { InputPatternValidatorDirective } from '../shared/directives/input-pattern-validator.directive';
import { PassWordPatternValidatorDirective } from '../shared/directives/password-validator.directive';

// import another modules
import { CustomMaterialModule } from '../modules/material.module';

import { BaseService } from "../services/BaseService";
import { ApiHelpers } from "../utils/ApiHelpers";
import { GlobalApp } from "../utils/GlobalApps";

const CORE_COMPONENTS = [
    ShowErrorsComponent,
    LayoutComponent,
    NotFoundComponent,
    InputPatternValidatorDirective,
    PassWordPatternValidatorDirective
];

@NgModule({
    declarations: CORE_COMPONENTS,
    imports: [
        CommonModule,
        RouterModule,
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        CustomMaterialModule
    ],
    exports: CORE_COMPONENTS
})
export class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [
                BaseService,
                GlobalApp,
                ApiHelpers
            ]
        };
    }
}
