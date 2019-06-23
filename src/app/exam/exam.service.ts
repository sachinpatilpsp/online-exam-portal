import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestionAnswer } from '../models/question-answer';
import { BaseUrlProvider } from '../core/providers/base.url.provider';
import { Observable } from 'rxjs';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Exam service to fetch question and answers
 */
@Injectable()
export class ExamService {

    /**
     * 
     * @param api HttpClient
     * @param baseUrl BaseUrlProvider
     */
    constructor(private api: HttpClient, private baseUrl: BaseUrlProvider) {
    }

    /**
     * Method for to fetch question and answer
     */
    getQAs(): Observable<IQuestionAnswer[]> {
        return this.api.get<IQuestionAnswer[]>(`${this.baseUrl.getBaseUrl()}qa.json`);
    }

}