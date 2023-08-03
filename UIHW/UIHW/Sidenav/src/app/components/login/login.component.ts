import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
 

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private userStore: UserStoreService,
    private auth: AuthServiceService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      EmailID: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      Role: ['Buyer', [Validators.required]] // Assuming there is a default role
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
      .subscribe(
        (res) => {
          console.log('LOGIN RESPONSE', res);
          console.log('LOGIN FORM', this.loginForm.value);
          interface MyResponse {
            message: string;
            // other properties if any
          }
          
          function isMyResponse(obj: any): obj is MyResponse {
            return 'message' in obj;
          }
          
          // Usage example:
          if (isMyResponse(res)) {
            this.toastr.success(res.message, 'Authenticated Successfully');
          }
          
          if (isMyResponse(res)) {
            this.toastr.success((res as any).message, 'Authenticated Successfully');
          }

          this.loginForm.reset();

          // Store the JWT token
          
         // this.auth.storeToken(res.token);

          // Decode token to extract user information
          const tokenPayload = this.auth.decodedToken();
          if (tokenPayload) {
            this.userStore.setFulNameForStore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);
          }

          // Navigate to the dashboard
          this.route.navigate(['dashboard']);
        },
        (err) => {
          // Handle login errors
          alert(err?.error?.message || 'An error occurred during login.');
        }
      );
    } else {
      // Display required field validation errors
      this.validateAllFormFields(this.loginForm);
      alert('Your form is invalid');
    }
  }
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
  get EmailID(): FormControl {

    return this.loginForm.get('userEmail') as FormControl;

  }
  get Password(): FormControl {

    return this.loginForm.get('userPassword') as FormControl;

  }
  
}
