import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { IUser } from 'src/app/models/user';
import { IQuestionAnswer } from 'src/app/models/question-answer';
import { QASessionService } from 'src/app/core/services/qa.session.service';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * ResultComponent to show result of exam with student information
 */
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  public user: IUser;
  public questions: IQuestionAnswer[] = [];
  public correctAnswers: number = 0;
  public wrongAnswers: number = 0;

  constructor(
    private sessionService: SessionService,
    private qasession: QASessionService
  ) { }

  /**
   * After immediate invocation of constructor 
   * we are getting user info and questions from session service
   * and nulifying sessions for new account
   */
  ngOnInit() {
    this.user = this.sessionService.getSession();
    this.questions = this.qasession.getSession();
    this.sessionService.setSession(null);
    this.qasession.setSession(null);
    this.calculateQuestions(this.questions);
  }


  /**
   * 
   * @param questions
   * Calculating correct and wrong answers count to show as result
   */
  calculateQuestions(questions) {
    questions.map(question => {
      this.correctAnswers += this.isCorrectAnser(question) ? 1 : 0;
      this.wrongAnswers += !this.isCorrectAnser(question) ? 1 : 0;
    })
  }

  /**
   * 
   * @param question 
   * Looping to through options of question and checking selected option 
   * is correct answer or not
   */
  isCorrectAnser(question) {
    return question.options.some(option => {
      if (option.selected)
        return option.name == question.answer;
      return false;
    })
  }


  /**
   * 
   * @param user : IUser
   * Extracting all the keys of JSON and returning as String[]
   */
  getKeys(user: IUser) {
    return Object.keys(user);
  }

}
