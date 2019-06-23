import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionNumbersComponent } from './question-numbers/question-numbers.component';
import { QuestionComponent } from './question/question.component';
import { ExaminationComponent } from './examination.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ExamWrapperComponent } from './exam-wrapper/exam-wrapper.component';
import { ExamService } from './exam.service';
import { InstructionsComponent } from './instructions/instructions.component';
import { InstructionService } from './instructions.service';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';

/**
 * routes for instructions, start and result pages
 */
const routes: Routes = [
  { path: '', redirectTo: 'instructions', pathMatch: 'full' },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'start', component: ExaminationComponent },
  { path: 'result', component: ResultComponent }
]

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 */
@NgModule({
  bootstrap: [ExaminationComponent],
  declarations: [ExaminationComponent, ExamWrapperComponent, QuestionNumbersComponent, QuestionComponent, InstructionsComponent, ResultComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [ExamService, InstructionService]
})
export class ExaminationModule { }
