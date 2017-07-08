import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { QuestionsService } from "app/core/questionService/questions.service";
import { THEORY, QUESTIONS, STATISTICS, TEST } from "app/core/utils/const";

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
  @Input('active') private active;
  @Input('unrespondedQuestionsLength') private unrespondedQuestionsLength;

  isTheoryActive(){
    return this.active === THEORY
  }

  isQuestionsActive(){
    return this.active === QUESTIONS
  }

  isStatisticsActive(){
    return this.active === STATISTICS  
  }

  isTestActive(){
    return this.active === TEST
  }

  constructor(sessionService: SessionService, router: Router, private questionService: QuestionsService) {
    super(sessionService, router)
  }

  logout(){
    this.sessionService.logout().then(
      () => {},
      error => console.log(error)
    );
    this.router.navigate(['/login']);
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

  goToStatistics(){
    this.router.navigate(['/statistics'])
  }

}
