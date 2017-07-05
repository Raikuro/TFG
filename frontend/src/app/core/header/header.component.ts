import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { QuestionsService } from "app/core/questionService/questions.service";

//import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends ComponentWithSession {
  
  onInitTasks() {
    this.questionService.getUnrespondedQuestions().subscribe(
      questions => this.unrespondedQuestionsLength = questions.length
    )
  }


  private isAlumn;
  @Input('unrespondedQuestionsLength') private unrespondedQuestionsLength;

  constructor(sessionService: SessionService, router: Router, private questionService: QuestionsService) {
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

  goToQuestions(){
    this.router.navigate(['/questions/unresponded'])
  }

  goToTest(){
    this.router.navigate(['/test'])
  }

  goToIndex(){
    this.router.navigate(['/theory'])
  }

}
