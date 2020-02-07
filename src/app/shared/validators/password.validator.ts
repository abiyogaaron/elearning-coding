import {AbstractControl, FormGroup} from '@angular/forms';

export function PasswordValidator(fg: FormGroup){
  let valid = true;
  if(fg.controls['password'].value != fg.controls['confirmPassword'].value){
    if(!fg.controls['confirmPassword'].errors) valid = false;
  }
  
  if(valid) return null;
  return {areEqual: true};
}