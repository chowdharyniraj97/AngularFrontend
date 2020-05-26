import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { TokenPayload } from './token-payload'
import { UserDetails } from './user-details'
import { TokenResponse } from './token-response'
import { Posts } from './posts'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string
  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token

  }

  private getToken(): string {
    if (!this.token)
      this.token = localStorage.getItem('usertoken')

    return this.token
  }

  public addnewpost(post){
     post.email=this.getUserDetails()['identity'].email
    const base = this.http.post('http://0.0.0.0:5000/post/new', post)
    return base

  }
  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      // console.log("hello")
      // console.log(payload)
      // console.log(JSON.parse(payload)['identity'].email)
      return JSON.parse(payload)

    }
    else {
      return null
    }


  }
  public getPosts() {
    return this.http.get<Posts>('http://0.0.0.0:5000');
  }


  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp >
        Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {

    const base = this.http.post('http://0.0.0.0:5000/register', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data

      })
    )
    return request


  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post('http://0.0.0.0:5000/login', user)
    // console.log(base)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data

      })
    )
    return request

  }

  public getPostById(id){
    return this.http.get<any>('http://0.0.0.0:5000/post/'+id);
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
