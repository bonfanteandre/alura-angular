import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor(private httpClient: HttpClient) { }

    checkUserNameTaken(userName: string) {
        return this.httpClient.get(API + '/user/exists/' + userName);
    }
    
    signUp(newUser: NewUser) {
        return this.httpClient.post(API + '/user/signup', newUser);
    }

}