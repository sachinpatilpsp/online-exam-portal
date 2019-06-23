import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

/**
 * Setting Lazy loading to routes and default route is sign-up page
 */
const routes: Routes = [
  { path: '', redirectTo: '/auth/sign-up', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'exam', loadChildren: './exam/examination.module#ExaminationModule' }
]

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Route module for application execution.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
