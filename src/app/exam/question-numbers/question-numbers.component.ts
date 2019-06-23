import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 */
@Component({
    selector: 'app-question-numbers',
    templateUrl: './question-number.html',
    styles: []
})
export class QuestionNumbersComponent implements OnInit {

    @Input("totalQuestions") totalQuestions: Number;
    @Input('selectedQuestionIndex') selectedQuestionIndex: Number = 0;
    @Output('questionIndexChanged') questionIndexChangeEvent: EventEmitter<Number> = new EventEmitter<Number>();
    @Output('examFinishEvent') examFinishEvent = new EventEmitter();


    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    /**
     * 
     * @param index 
     */
    questionIndexChanged(index: Number) {
        this.selectedQuestionIndex = index;
        this.questionIndexChangeEvent.emit(index);
    }

    /**
     * 
     * @param n 
     */
    arrayOne(n: Number): Number[] {
        return Array(n.valueOf());
    }

    /**
     * 
     */
    previousQuestion() {
        this.selectedQuestionIndex = this.selectedQuestionIndex.valueOf() - 1;
        this.questionIndexChangeEvent.emit(this.selectedQuestionIndex);
    }

    /**
     * 
     */
    nextQuestion() {
        this.selectedQuestionIndex = this.selectedQuestionIndex.valueOf() + 1;
        this.questionIndexChangeEvent.emit(this.selectedQuestionIndex);
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
