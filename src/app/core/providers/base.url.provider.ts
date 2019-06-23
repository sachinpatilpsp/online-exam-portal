import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseUrlProvider {
    public apiBaseUrl = "http://localhost:4200/assets/api/";
    //public apiBaseUrl = 'http://localhost:8080/exam-system-angular7/assets/api/';

    getBaseUrl(): string {
        return this.apiBaseUrl;
    }
}