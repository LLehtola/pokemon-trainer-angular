import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Renders the signup.
 * User's name gets stored in localstorage and authService updates its observable user.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get name(): AbstractControl {
    return this.user.get('name');
  }

  signupUser() {
    if (!this.name.invalid) {
      this.authService.storeUserInLocalStorage(this.name.value);
    }
  }
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
