import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  verifyLoading: boolean = false;
  verifyUserLoading: boolean = false;
  showVerifyPanel: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ){
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      let uid = params.uid;
      let userDoc = this.authService.getUserData(uid);
      
      this.verifyUserLoading = true;
      userDoc.subscribe((user) =>{
        this.verifyUserLoading = false;
        if(user.length > 0){
          this.showVerifyPanel = true;
        }else{
          this.showVerifyPanel = false;
        }
        this.changeDetector.detectChanges();
      }, error => {
        this.verifyUserLoading = false;
        this.changeDetector.detectChanges();
      })
    });
  }

  sendEmailVerification(){
    this.verifyLoading = true;
    let emailObserver = this.authService.SendVerificationMail();
      emailObserver.then(() =>{
        this.verifyLoading = false;
      });
  }
}
