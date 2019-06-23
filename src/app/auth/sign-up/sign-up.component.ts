import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ICollege } from 'src/app/models/college';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SessionService } from 'src/app/core/services/session.service';
import { IUser } from 'src/app/models/user';
import { onSubmitFormGroup } from 'src/app/core/utils/on-submit-form';
import { Router } from '@angular/router';

/**
 * Sign-up component to register user for examination
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit, AfterContentInit, OnDestroy {

  public colleges: ICollege[] = [];
  private subscriptions: Subscription[] = [];
  public signUpForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/[2-9]{1}\d{8}/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      college: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      stream: ['', [Validators.required]]
    })
  }

  get name(): AbstractControl {
    return this.signUpForm.get('name');
  }

  get contactNumber(): AbstractControl {
    return this.signUpForm.get('contactNumber');
  }

  get email(): AbstractControl {
    return this.signUpForm.get('email');
  }

  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }

  get gender(): AbstractControl {
    return this.signUpForm.get('gender');
  }

  get college(): AbstractControl {
    return this.signUpForm.get('college');
  }

  get qualification(): AbstractControl {
    return this.signUpForm.get('qualification');
  }

  get stream(): AbstractControl {
    return this.signUpForm.get('stream');
  }

  /**
   * A callback method that is invoked immediately after Angular has 
   * completed initialization of all of the directive's content. 
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit() {
    this.getColleges();
  }

  getColleges() {
    let sub = this.authService.getColleges().subscribe(colleges => this.colleges = colleges,
      error => console.log(error));
    this.subscriptions.push(sub);
  }


  /**
   * 
   * @param signUpForm : FormGroup
   * If all the required field are filled with valid data then user information
   * storing in session for next page.
   */
  signUp(signUpForm: FormGroup) {
    if (signUpForm.invalid) {
      onSubmitFormGroup(signUpForm);
      return;
    }
    let user: IUser = signUpForm.value;
    user.password = null;
    this.sessionService.setSession(user);
    this.router.navigate(['exam/instructions']);
  }


  /**
   * unsubscribing api call observable to free memory
   */
  ngOnDestroy() {
    if (this.subscriptions != null && this.subscriptions.length > 0)
      this.subscriptions.map(s => s.unsubscribe());
  }

}
