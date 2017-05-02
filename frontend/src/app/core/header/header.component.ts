import { Component, OnInit } from '@angular/core';
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  logout(){
    this.sessionService.logout().then(
      () => this.router.navigate(['/login']),
      error => console.log(error)
    );
  }

  goToTheory(){
    this.router.navigate(['/theory'])
  }

  ngOnInit() {
  }

}
