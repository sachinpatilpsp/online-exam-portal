import { Injectable } from '@angular/core';
import { IQuestionAnswer } from 'src/app/models/question-answer';


@Injectable({ providedIn: 'root' })
export class QASessionService {

    public setSession(user: IQuestionAnswer[]) {
        sessionStorage.setItem('qas', JSON.stringify(user));
    }

    getSession(): IQuestionAnswer[] {
        return JSON.parse(sessionStorage.getItem('qas'));
    }
}