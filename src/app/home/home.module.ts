import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { SignInCompoment } from './signin/signin.component';
import { VMessageModule } from "../shared/components/vmessage/vmessage.module";
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
    declarations: [
        SignInCompoment,
        SignUpComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ]
})
export class HomeModule {

}