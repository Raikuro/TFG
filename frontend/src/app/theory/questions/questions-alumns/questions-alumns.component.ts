import { Component } from '@angular/core';
import { Session } from "app/core/session/session";
import { Question } from "app/theory/core/question";
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { QuestionsService } from "app/theory/questions/core/questions.service";

@Component({
  selector: 'app-questions-alumns',
  templateUrl: './questions-alumns.component.html',
  styleUrls: ['./questions-alumns.component.css']
})
export class QuestionsAlumnsComponent extends ComponentWithSession {

  protected session: Session
  private questions: Question[]
  private searchText: string
  private newQuestion;
  private lessonId;
  private sectionId;
  
  onInitTasks() {
    this.searchText = "";
    this.route.params.subscribe(
      params => {
        this.lessonId = params.lessonId;
        this.sectionId = params.sectionId;
        this.questionsService.getQuestions(this.lessonId, this.sectionId).subscribe(
          questions => {
            this.questions = questions;
          },
          error => {this.router.navigate(['/server-error', error])}
        )
      },
      error => {this.router.navigate(['/server-error', error])}
    )
  }

  constructor(router: Router,
              sessionService: SessionService,
              private questionsService: QuestionsService,
              private route: ActivatedRoute) {
    super(sessionService, router)
  }

  getQuestions(){
    if(this.searchText === ""){
      return this.questions
    }
    else{
      if(this.questions){
        return this.questions.filter((filtrado) => {
          return filtrado.content.includes(this.searchText)
        })
      }
    }
  }

  openForm(){
    this.newQuestion = {}
  }

  closeForm(){
    this.newQuestion = undefined
  }

  sendForm(){
    let question = new Question(this.newQuestion.title, this.session.username, this.newQuestion.content, undefined)
    this.questionsService.prepareData(question);
    this.router.navigate(['/questions/confirmation',{lessonId: this.lessonId, sectionId: this.sectionId}])
  }

  doSome(){
    console.log("ASD")
  }

}