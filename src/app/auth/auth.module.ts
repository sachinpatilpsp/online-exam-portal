import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * Auth routes for sign-in, sign-up page
 * default route is sign-up
 */
const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  // { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
]

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AuthModule { }
