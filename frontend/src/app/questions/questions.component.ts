import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/theory/core/componentWithSession";
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent extends ComponentWithSession {
  
  protected session: any;
  
  onInitTasks() {
    throw new Error("Method not implemented.");
  }

  constructor(protected router: Router, protected sessionService: SessionService) {
    super(sessionService, router)
  }

}
