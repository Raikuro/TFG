import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { QuestionsService } from "app/theory/questions/core/questions.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-respond-question',
  templateUrl: './respond-question.component.html',
  styleUrls: ['./respond-question.component.css']
})
export class RespondQuestionComponent extends ComponentWithSession {
  
  @ViewChild('imageInput') imageInput;
  private question;

  onInitTasks() {
    if(!this.session.isAlumn){
      this.question = this.questionsService.getPreparedData();
      if(this.question === undefined){
        this.location.back();
      }
    }
  }

  constructor(router: Router,
              sessionService: SessionService,
              private questionsService: QuestionsService,
              private location: Location) {
                super(sessionService, router)
              }

  isReadyToSend(){
    return this.question ? this.question.responseText || this.question.responseImage : false
  }

  goToQuestionConfirmation(){
    this.questionsService.prepareData(this.question)
    this.router.navigate(['/questions/confirmation']);
  }

  handleFileSelect(evt){
    let files = evt.target.files;
    let file = files[0];
    if (files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    if(this.question){
      this.question.responseImage = btoa(binaryString);
    }
  }

  removeImage(){
    this.imageInput.nativeElement.value = ''
    this.question.responseImage = undefined
  }

}
