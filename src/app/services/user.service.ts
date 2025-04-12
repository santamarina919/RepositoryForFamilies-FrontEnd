import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpStatusCode} from '@angular/common/http';
import {BASE_URL} from '../../utils/server.consts';
import {SignUpComponent} from '../pages/sign-up/sign-up.component';
import {Router} from '@angular/router';
import {LogInForm} from '../types/LogInForm';
import {saveSelfId} from '../../utils/fetchSelfId';


@Injectable({providedIn : 'root'})
export class UserService {
  static SIGNUP_ENDPOINT = '/auth/api/signup'

  static LOGIN_ENDPOINT = '/auth/api/login'


  private router = inject(Router)

  constructor(private http: HttpClient) {
  }

  async signUpRequest(formData :any){

    this.http.post(
      BASE_URL + UserService.SIGNUP_ENDPOINT,
      JSON.stringify(formData),
      {
        headers : {
          'Content-Type' : 'application/json'
        },
        withCredentials : true,
        observe : 'response'
      }
    )
      .subscribe(something => {
        if(something.status == HttpStatusCode.Ok){
          this.router.navigate(['login'])
        }
      })
  }

  async loginRequest(formData :LogInForm){
    this.http.post(
      BASE_URL + UserService.LOGIN_ENDPOINT,
      JSON.stringify(formData),
      {
        headers : {
          'Content-Type' : 'application/json'
        },
        withCredentials : true,
        observe : 'response'
      }
    )
      .subscribe(response => {
        if(response.status == HttpStatusCode.Ok){
          saveSelfId(formData.email as string)
          this.router.navigate(['groups'])
        }
      })
  }

}
