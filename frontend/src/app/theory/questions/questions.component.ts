import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";
import { Question } from "app/theory/core/question";
import { Location } from '@angular/common';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent extends ComponentWithSession {
  
  protected session: Session
  private questions: Question[]
  private searchText: string
  private newQuestion;
  private lessonId;
  private sectionId;
  private alert;
  
  onInitTasks() {
    window.location.hash = '';
    this.searchText = "";
    this.route.params.subscribe(
      params => {
        this.lessonId = params.lessonId;
        this.sectionId = params.sectionId;
        this.questionsService.getQuestions(this.lessonId, this.sectionId).subscribe(
          questions => {
            this.questions = questions;
          },
          error => this.goToErrorPage(error)
        )
      },
      error => this.goToErrorPage(error)
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
    let aux = new Promise((resolve, reject) => {
     this.newQuestion = {}
     window.location.hash = '';
     resolve() 
    })
    aux.then(() => setTimeout(() => { window.location.hash = 'newForm'; }, 1))
  }

  closeForm(){
    this.newQuestion = undefined
  }

  sendForm(){
    let question = new Question(this.newQuestion.title, this.session.username, this.newQuestion.content, this.newQuestion.response, undefined)
    this.questionsService.prepareData(question);
    this.router.navigate(['/questions/confirmation',{lessonId: this.lessonId, sectionId: this.sectionId}])
  }

  deleteQuestion(question){
    this.questionsService.deleteQuestion(question).subscribe(
      () => {this.router.navigate(['/theory'])},
      (error) => this.goToErrorPage(error)
    )
  }

  goToQuestions(){
    this.router.navigate(['/questions/unresponded']);
  }

  isReadyToSend(){
    if(this.newQuestion){
      if(this.newQuestion.title && this.newQuestion.content){
        let titleAndContentNotEmpty = this.newQuestion.title.length !== 0 && this.newQuestion.title.trim() &&
          this.newQuestion.content.length !== 0 && this.newQuestion.content.trim()
        if(this.session.isAlumn){
          return titleAndContentNotEmpty
        }
        else{
          if(this.newQuestion.response){
            return titleAndContentNotEmpty && this.newQuestion.response.length !== 0 &&
              this.newQuestion.response.trim()
          }
        }
      }
    }
    return false;
  }

}
