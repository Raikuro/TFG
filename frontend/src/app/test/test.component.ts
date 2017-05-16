import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent extends ComponentWithSession {
  
  onInitTasks() {
    
  }

  constructor(
    sessionService: SessionService,
    router: Router) {
    super(sessionService, router)
  }

}
