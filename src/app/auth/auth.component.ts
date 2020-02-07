import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import valMsg from './validationMessages.json';
import { PasswordValidator  } from "../shared/validators/password.validator";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isCardFlipped: boolean;
  signupObj: any;
  formSignup: FormGroup;
  signinObj: any;
  formSignin: FormGroup;
  signupLoading: boolean;
  signinLoading: boolean;
  grades: Array<string>;
  specializations: Array<string>;
  classes: Array<string>;
  errFirebase: string;

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router
  ){ 
    this.isCardFlipped = false;
    this.signinObj = {
      email: "",
      password: ""
    };
    this.signupObj = {
      fullName: "",
      grade: "",
      specialization: "",
      class: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.signupLoading = false;
    this.signinLoading = false;

    this.grades = ["X", "XI", "XII"];
    this.specializations = ["IPB", "MIPA", "IPS"];
    this.classes = ["1", "2", "3", "4", "5"];
  }

  ngOnInit() {
    this.initForm();
    this.initValMessage();
  }

  initForm(){
    this.formSignup = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ])),
      grade: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      class: ['', [Validators.required]],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z][a-zA-Z0-9]{6,}$")
      ])),
      confirmPassword: ['', [Validators.required]],
    }, {validator: PasswordValidator})

    this.formSignin = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])),
      password: ['', [Validators.required]]
    })
  }

  initValMessage(){
    for(let key in valMsg){
      this[key] = valMsg[key]
    }
  }

  toggleCard(){
    if(this.isCardFlipped) this.isCardFlipped = false;
    else this.isCardFlipped = true;
  }

  public signUp(form){
    if(form.valid){
      this.signupLoading = true;
      let observer = this.authService.SignUp(this.signupObj.email, this.signupObj.password);
      observer.then((res) => {
        console.log("res signup", res);
        
        this.authService.setUserData(res.user, this.signupObj);
        let emailObserver = this.authService.SendVerificationMail();
        emailObserver.then(() =>{
          this.signupLoading = false;
          this.cleaningObj(this.signupObj);
          this.router.navigate(['verify-email-address/'+res.user.uid]);
        });
      }, error => {
        console.log("error signup", error);
        this.signupLoading = false;
      })
    }
  }

  public signIn(form){
    if(form.valid){
      this.signinLoading = true;
      let observer = this.authService.SignIn(this.signinObj.email, this.signinObj.password);
      observer.then((res) => {
        console.log("res signin", res);
        this.signinLoading = false;
        this.router.navigate(['home/dashboard']);
      }, error => {
        console.log("error signup", error);
        this.errFirebase = error.message;
        this.signinLoading = false;
      })
    }
  }

  cleaningObj(obj){
    for(let key in obj){
      this.signupObj[key] = null;
    }
  }

  onClose(data){
    this[data] = null;
  }
}
