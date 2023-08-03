import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  _http:any;
  userpayload: any;

  constructor(private http: HttpClient,private router:Router) {

    this._http=http;

   }

  baseServerUrl= 'https://localhost:7250/';

  headers = { headers: new Headers({'Content-Type': 'application/json'})}




  registerUser(user:any){

    return this.http.post(this.baseServerUrl + 'api/Users/CreateUser',user,{

      responseType:'text',

    });
 
  }
  login(loginObj:any){
    return this.http.post(this.baseServerUrl + 'api/Login/LoginUser',loginObj,{
      responseType:'text',
    });   
}

storeToken(tokenvalue: string){
  localStorage.setItem('token',tokenvalue)
}
getToken()
{
  return localStorage.getItem('token')
}
isLoggedIn():boolean{
  return !!localStorage.getItem('token')
}
// decodedToken(): any {
//   const token = this.getToken();
//   if (token) {
//     const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//     return tokenPayload;
//   }
//   return null;
// }
decodedToken(){
  const jwthelper=new JwtHelperService();
  const token=this.getToken()!;
  console.log(jwthelper.decodeToken(token))
  return jwthelper.decodeToken(token)
}
getfullnameFromToken(){
  if(this.userpayload)
  return this.userpayload.name;

}
getRoleFromToken(){
  if(this.userpayload)
  return this.userpayload.role;
}


// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

  // constructor(private http: HttpClient, private router: Router) { }

}  