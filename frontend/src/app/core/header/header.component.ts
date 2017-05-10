import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { ComponentWithSession } from "app/core/session/componentWithSession";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends ComponentWithSession {
  onInitTasks() {}

  private isAlumn;

  constructor(sessionService: SessionService, router: Router) {
    super(sessionService, router)
  }

  logout(){
    this.sessionService.logout().then(
      () => this.router.navigate(['/login']),
      error => console.log(error)
    );
  }
  
  goToTheory(){
    this.router.navigate(['/theory'])
  }

}
