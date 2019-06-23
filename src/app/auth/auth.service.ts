import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ICollege } from '../models/college';
import { BaseUrlProvider } from '../core/providers/base.url.provider';



@Injectable()
export class AuthService {

    constructor(private api: HttpClient, private baseUrl: BaseUrlProvider) { }

    getColleges() {
        return this.api.get<ICollege[]>(`${this.baseUrl.getBaseUrl()}colleges.json`);
    }
}