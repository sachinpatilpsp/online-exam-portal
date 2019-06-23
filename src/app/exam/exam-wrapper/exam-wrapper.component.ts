import { Component, OnInit } from '@angular/core';
import { IQuestionAnswer } from 'src/app/models/question-answer';
import { ExamService } from '../exam.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { QASessionService } from 'src/app/core/services/qa.session.service';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Exam wrapper for to consolidate question number and question panel in single unit.
 */
@Component({
  selector: 'app-exam-wrapper',
  template: `
  <div class="container-fluid">
    <div class="login-form">
      <div class="main-div" style="max-width: 100%;margin:0px auto !important;">
        <form id="Login" class="text-left">
        <!-- <span class="text-info"> Welcome, Pravin </span> -->
          <div class="row">
            <div class="col-lg-4 col-md-4" style="border: 1px solid #eee;padding: 20px;">
                <app-question-numbers [totalQuestions]="questions.length"
                (questionIndexChanged)="updateQuestion($event)"
                [selectedQuestionIndex]="questionIndex"
                (examFinishEvent)="finishExam()"></app-question-numbers>     
              </div>
              <div class="col-lg-8 col-md-8"> 
                <app-question [question]="question" [selectedQuestionIndex]="questionIndex"
                [totalQuestions]="questions.length"                
                (questionIndexChanged)="updateQuestion($event)"
                (examFinishEvent)="finishExam()"
                ></app-question>
              </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class ExamWrapperComponent implements OnInit {

  public question: IQuestionAnswer = null;
  public questions: IQuestionAnswer[] = [];
  private subscription: Subscription;
  public questionIndex: Number = 0;

  /**
   * 
   * @param examService ExamService
   * @param router Router
   * @param qasession QASessionService
   */
  constructor(
    private examService: ExamService,
    private router: Router,
    private qasession: QASessionService
  ) { }

  ngOnInit() {
    this.getQAs();
  }

  /**
   * Calling API for question and answer
   */
  getQAs() {
    this.subscription = this.examService.getQAs().subscribe(qas => {
      this.questions = qas;
      this.question = qas[0];
    }, error => console.log(error));
  }

  /**
   * 
   * @param index number
   * Method for update question on UI on click of Next button
   */
  updateQuestion(index: number) {
    this.questionIndex = index;
    this.question = this.questions[index];
  }

  /**
   * On Click of Finish button of question panel or question numbers panel event will get
   * emitted and here the response on that event.
   */
  finishExam() {
    this.qasession.setSession(this.questions);
    this.router.navigate(['exam/result']);
  }

  /**
   * Clearing observables
   */
  ngOnDestroy() {
    if (this.subscription != null && this.subscription != undefined)
      this.subscription.unsubscribe();
  }
}
