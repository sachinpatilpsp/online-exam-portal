import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user';


@Injectable({ providedIn: 'root' })
export class SessionService {

    public setSession(user: IUser) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getSession(): IUser {
        return JSON.parse(sessionStorage.getItem('user'));
    }
}