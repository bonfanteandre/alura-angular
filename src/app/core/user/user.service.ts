import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { Subject, BehaviorSubject } from "rxjs";
import { User } from "./user";
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject: Subject<User> = new BehaviorSubject<User>(null);
    private username: string;

    constructor(private tokenService: TokenService) {
        if (this.tokenService.hasToken()) {
            this.decodeAndNotify();
        }
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    getUsername() {
        return this.username;
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.username = user.name;
        this.userSubject.next(user);
    }

}