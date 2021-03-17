import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

/**
 * Renders the top navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  public isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = authService.isLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
