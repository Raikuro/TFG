import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { QuestionsService } from "app/core/questionService/questions.service";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";
import { Question } from "app/core/model/question";
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent extends ComponentWithSession {
  
  @ViewChild('imageInputQ') imageInputQ;
  @ViewChild('imageInputR') imageInputR;
  protected session: Session
  private questions: Question[]
  private searchText: string
  private newQuestion;
  private lessonId;
  private sectionId;
  private alerts;
  
  onInitTasks() {
    this.alerts = [];
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
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    super(sessionService, router)
  }

  getQuestions(){
    if(this.searchText === ""){
      return this.questions
    }
    else{
      if(this.questions){
        return this.questions.filter((filtered) => {
          return filtered.contentText.includes(this.searchText)
        })
      }
    }
  }

  doSome(question){
    console.log(question)
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

  isResponded(question){
    return question.responseImage || question.responseText
  }

  sendForm(){
    console.log(this.newQuestion)
    let question = new Question(this.newQuestion.title, this.session.username, this.newQuestion.contentText, this.newQuestion.contentImage, this.newQuestion.responseText, this.newQuestion.responseImage, undefined)
    this.questionsService.prepareData(question);
    this.router.navigate(['/questions/confirmation',{lessonId: this.lessonId, sectionId: this.sectionId}])
  }

  addAlert(questionTitle){
    let alert = {
      msg: 'La duda "'+ questionTitle +'" va a ser reportada. Confirme',
      closable: true,
      type: 'danger',
      questionTitle: questionTitle
    };
    this.alerts.push(alert)
    console.log(alert)
  }

  closeAlert(alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  sendConfirmationForDelete(questionTitle){
    this.addAlert(questionTitle)
  }

  deleteQuestion(questionTitle){
    this.questionsService.deleteQuestion(questionTitle, this.sectionId).subscribe(
      () => { location.reload() },
      (error) => this.goToErrorPage(error)
    )
  }

  goToQuestions(){
    this.router.navigate(['/questions/unresponded']);
  }

  isReadyToSend(){
    if(this.newQuestion){
      if(this.newQuestion.title){
        let titleNotEmpty = this.newQuestion.title.length !== 0 && this.newQuestion.title.trim();
        let contentTextNotEmpty = false;
        let responseTextNotEmpty = false;
        let readyForAlumn = false;
        if(this.newQuestion.contentText){
          contentTextNotEmpty = this.newQuestion.contentText.length !== 0 && this.newQuestion.contentText.trim()
        }
        readyForAlumn = titleNotEmpty && (contentTextNotEmpty || this.newQuestion.contentImage)
        if(this.session.isAlumn){
          return readyForAlumn
        }
        else{
          if(this.newQuestion.responseText){
            responseTextNotEmpty = this.newQuestion.responseText.length !== 0 && this.newQuestion.responseText.trim()
          }
          return readyForAlumn && (responseTextNotEmpty || this.newQuestion.responseImage)
        }
      }
    }
    return false;
  }

  handleFileSelectQ(evt){
    let files = evt.target.files;
    let file = files[0];
    if (files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoadedQ.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoadedQ(readerEvt) {
    let binaryString = readerEvt.target.result;
    if(this.newQuestion){
      this.newQuestion.contentImage = btoa(binaryString);
    }
  }

  handleFileSelectR(evt){
    let files = evt.target.files;
    let file = files[0];
    if (files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoadedR.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoadedR(readerEvt) {
    let binaryString = readerEvt.target.result;
    if(this.newQuestion){
      this.newQuestion.responseImage = btoa(binaryString);
    }
  }

  removeImageQ(){
    this.imageInputQ.nativeElement.value = ''
    this.newQuestion.contentImage = undefined
  }

  removeImageR(){
    this.imageInputR.nativeElement.value = ''
    this.newQuestion.responseImage = undefined
  }

}
