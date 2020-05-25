import { Component } from '@angular/core'
import { AuthenticationService } from '../authentication.service'
import {TokenPayload} from '../token-payload'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/')
      },
      err => {
        console.error(err)
      }
    )
  }
}