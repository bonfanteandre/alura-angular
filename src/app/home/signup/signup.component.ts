import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.vaildator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDetector } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    selector: 'ap-signup',
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;

    @ViewChild('emailInput')
    emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetector: PlatformDetector
    ) { }   

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', 
                [
                    Validators.required, 
                    Validators.email
                ]
            ],
            fullName: ['', 
                [
                    Validators.required, 
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['', 
                [
                    Validators.required, 
                    lowerCaseValidator,
                    Validators.minLength(2), 
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', 
                [
                    Validators.required, 
                    Validators.minLength(8)
                ]
            ]
        });
        this.giveEmailInputFocus();
    }

    signUp() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
            .signUp(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }

    private giveEmailInputFocus() {
        if (this.platformDetector.isPlatformBrowser()) {
            this.emailInput.nativeElement.focus();
        }
    }
}