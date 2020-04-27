import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetector } from "src/app/core/platform-detector/platform-detector.service";

@Component({
    selector: 'ap-signin',
    templateUrl: './signin.component.html'
})
export class SignInCompoment implements OnInit {

    loginForm: FormGroup;

    @ViewChild('userNameInput')
    usernameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private platformDetector: PlatformDetector) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(username, password)
            .subscribe(
                () => this.router.navigate(['user', username]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    if (this.platformDetector.isPlatformBrowser()) {
                        this.usernameInput.nativeElement.focus();
                    }
                }
            );
    }

}