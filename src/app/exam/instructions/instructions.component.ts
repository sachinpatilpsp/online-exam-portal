import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { InstructionService } from '../instructions.service';
import { IInstruction } from 'src/app/models/instruction';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Instruction component for to show instruction to candidate before procedding to exam.
 */
@Component({
    selector: 'app-instructions',
    template: `
  <div class="container">
  <div class="login-form">
      <div class="main-div" style="max-width: 80%;">
          <div class="panel">
              <h1 *ngIf="user"><small>"Welcome to Exam Portal 2019"</small><br>
              
               {{user.name}}
               </h1>
              <hr>
          </div>
          <form id="Login" class="text-left">
              <div class="row">
                  <div class="col-md-12">
                      <h5>Instructions for the candidate :</h5>
                      <ul>
                          <li *ngFor="let in of instructions; let i = index">
                              {{i + 1}}) {{in.instruction}}
                          </li>                          
                      </ul>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <button type="button" class="btn btn-primary"
                      (click)="startExam()">
                          <a class="text-white"> Start Exam</a>
                      </button>
                  </div>
              </div>
          </form>
      </div>
  </div>
</div>
  `,
    styles: []
})
export class InstructionsComponent implements OnInit {

    public user: IUser;
    public instructions: IInstruction[] = [];

    /**
     * 
     * @param router Router
     * @param sessionService SessionSevice
     * @param instructionService InstructionService
     */
    constructor(
        private router: Router,
        private sessionService: SessionService,
        private instructionService: InstructionService
    ) {
        this.user = this.sessionService.getSession();
    }


    ngOnInit() {
        this.getInstructions();
    }

    /**
     * Fetching instruction to display on screen
     */
    getInstructions() {
        this.instructionService.getInstructions()
            .subscribe(ins => this.instructions = ins, error => console.log(error));
    }

    /**
     * Navigating to exam panel
     */
    startExam() {
        this.router.navigate(['exam/start']);
    }

}
