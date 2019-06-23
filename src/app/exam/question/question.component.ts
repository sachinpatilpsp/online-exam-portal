import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQuestionAnswer } from 'src/app/models/question-answer';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Question component to show question card with options and Next and finish button
 */
@Component({
    selector: 'app-question',
    template: `
    <div class="card" *ngIf="question">
        <div class="card-header">
           {{getQuestionNumber()}}) {{question.question}}
        </div>
        <div class="card-body" style="min-height:400px" >
            <div class="form-check" *ngFor="let option of question.options;let i=index">
                <input class="form-check-input" type="radio" 
                name="option" 
                id="option"
                [value]="option"                
                [checked]="option.selected"
                (change)="onSelectionChange(i, option)">
                <label class="form-check-label" for="option">
                    {{option.name}}
                </label>
            </div>      
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-md-8"></div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-primary" (click)="showNexQuestion()"
                    [disabled]="(totalQuestions-1) == selectedQuestionIndex">Next</button>
                </div>
                <div class="col-md-2">
                    <a type="button" class="btn btn-danger"
                        (click)="finishExam()">Finish
                    </a>
                </div>
            </div>
        </div>
    </div>
  `,
    styles: []
})
export class QuestionComponent implements OnInit {

    @Input('question') question: IQuestionAnswer;
    @Input('selectedQuestionIndex') selectedQuestionIndex: Number;
    @Input('totalQuestions') totalQuestions: Number;
    @Output('questionIndexChanged') questionIndexChanged: EventEmitter<Number> = new EventEmitter<Number>();
    @Output('examFinishEvent') examFinishEvent = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    /**
     * On click of next button this method will execute and will 
     * emit event to other components with question index.
     */
    showNexQuestion() {
        let emitValue = this.selectedQuestionIndex.valueOf() + 1;
        if ((this.totalQuestions.valueOf() - 1) != this.selectedQuestionIndex)
            this.questionIndexChanged.emit(emitValue);
    }

    /**
     * Method will return question Number index
     */
    getQuestionNumber() {
        return (this.selectedQuestionIndex.valueOf() + 1);
    }

    /**
     * 
     * @param index number
     * On any option selection updating all options to unselected and set only one 
     * option as selected based on index.
     */
    onSelectionChange(index) {
        this.question.options.map(op => op.selected = false);
        this.question.options[index].selected = true;
    }

    /**
     * On click of Finish a confirmation will get asked to user and if they enters
     * Yes in input box then examFinishEvent will emited.
     */
    finishExam() {
        let option = prompt('Wants to Finish Exam?', 'Yes');
        if (option == 'Yes')
            this.examFinishEvent.emit();
    }
}
