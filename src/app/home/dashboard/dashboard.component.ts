import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/services/user";
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  private index: number = 0;
  user: User;
  editorOptions = {
    theme: 'vs-dark', 
    language: 'javascript',
    quickSuggestions: true,
    tabCompletion: "on"
  };
  code: string = "//write your code below here";

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService
  ){}

  ngOnInit(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.user = userData;
  }

  onInit(editor){
    editor.onKeyDown((event)=>{
      const {keyCode, ctrlKey, metaKey} = event;
      if(ctrlKey && keyCode === 52){
        event.preventDefault();
        this.showToast('top-right', 'danger', "Copy-Paste is permitted in here, trust in yourself !");
      }
    });
  }

  showToast(position, status, message){
    this.index += 1;
    this.toastrService.show(status || 'Success', `${message}`, { position, status });
  }
}
