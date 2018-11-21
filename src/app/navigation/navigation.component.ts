import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  title = 'E-Kart';
  userLoggedIn = false;
  constructor(
    private router: Router
  ) {
    console.log(this.userLoggedIn);
  }

  ngOnInit() {}

  ngDoCheck(): void {
    const status =  window.sessionStorage.getItem('loggedIn');
    if(status == 'true') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    console.log(this.userLoggedIn);
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
