import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseUrlProvider } from '../core/providers/base.url.provider';
import { IInstruction } from '../models/instruction';
import { Observable } from 'rxjs';

/**
* @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * A Instruction service to fetch instructions
 */
@Injectable()
export class InstructionService {

    /**
     * 
     * @param api HttpClient
     * @param baseUrl BaseUrlProvider
     */
    constructor(private api: HttpClient, private baseUrl: BaseUrlProvider) {
    }

    /**
     * Method for instructions API call
     */    
    getInstructions(): Observable<IInstruction[]> {
        return this.api.get<IInstruction[]>(`${this.baseUrl.getBaseUrl()}instructions.json`);
    }

}