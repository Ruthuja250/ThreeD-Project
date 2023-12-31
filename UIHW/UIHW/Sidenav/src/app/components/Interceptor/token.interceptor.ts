import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthServiceService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.auth.getToken();
    if(myToken){
      request=request.clone({
        setHeaders:{Authorization:`Bearer${myToken}`}
      })

    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            alert("token is expired,please login again")
            this.router.navigate(['login'])
          }
        }
        console.log(err);
        // return err;
        return throwError(()=>(err))
      })
    )
    };
  }