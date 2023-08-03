import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  repeatPass: string = 'none';
  invalidrpwd: boolean = false;
  route: any;
  displayMsg: string;
  isAccountCreated: boolean;
  constructor(private authservice: AuthServiceService, private router : Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
registerForm = new FormGroup({
    username: new FormControl('', [

      Validators.required,

      Validators.minLength(2),

      Validators.pattern('[a-zA-Z].*')

    ]),

    userEmail: new FormControl('', [Validators.required, Validators.email]),

    userPassword: new FormControl('', [

      Validators.required,

      Validators.minLength(6),

      Validators.maxLength(15)

    ]),

    rpwd: new FormControl('', [

      Validators.required,

      Validators.minLength(6),

      Validators.maxLength(15)

    ]),

    city: new FormControl('', [Validators.required]),

    gender: new FormControl('', [Validators.required]),

    phonenumber: new FormControl('', [

      Validators.required,

      Validators.pattern("[0-9]*"),

      Validators.minLength(10),

      Validators.maxLength(10)

    ])

  });




  registerSubmitted() {

    if (this.userPassword.value === this.ConfirmPassword.value) {

      console.log(this.registerForm.value);

      this.repeatPass = 'none'

      this.authservice.registerUser({

        username: this.registerForm.value.username,

        userEmail: this.registerForm.value.userEmail,

        userPassword: this.registerForm.value.userPassword,

        city: this.registerForm.value.city,

        gender: this.registerForm.value.gender,

        phonenumber: this.registerForm.value.phonenumber,
        

      }).subscribe(

        (res) => {

          if (res == 'Success'){

            this.displayMsg ="Account Created Successfully ! ";

            this.router.navigate(['/login'])

            this.isAccountCreated = true;


          }

         else if(res == 'AlreadyExists'){

          this.displayMsg ="Account Already Exists.Try Another Email. ! ";

          this.isAccountCreated = false;

         }

        else{

          this.displayMsg ="Something went Wrong. ";

          this.isAccountCreated = false;

        }

        console.log(res);

         

        });
        

    } else {

      this.repeatPass = 'inline';

    }

  }

 




  get username(): FormControl {

    return this.registerForm.get('username') as FormControl;

  }




  get userEmail(): FormControl {

    return this.registerForm.get('userEmail') as FormControl;

  }




  get userPassword(): FormControl {

    return this.registerForm.get('userPassword') as FormControl;

  }




  get ConfirmPassword(): FormControl {

    return this.registerForm.get('rpwd') as FormControl;

  }




  get city(): FormControl {

    return this.registerForm.get('city') as FormControl;

  }




  get gender(): FormControl {

    return this.registerForm.get('gender') as FormControl;

  }




  get phonenumber(): FormControl {

    return this.registerForm.get('phonenumber') as FormControl;

  }

}




