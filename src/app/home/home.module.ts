import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { SignInCompoment } from './signin/signin.component';
import { VMessageModule } from "../shared/components/vmessage/vmessage.module";

@NgModule({
    declarations: [
        SignInCompoment
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule
    ]
})
export class HomeModule {

}