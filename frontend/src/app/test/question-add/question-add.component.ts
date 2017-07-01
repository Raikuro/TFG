import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TestService } from "app/test/core/test.service";
import { TestOption } from "app/theory/core/testOption";
import { TestQuestion } from "app/theory/core/testQuestion";
import { ADD } from "app/core/utils/const";
import { TheoryService } from "app/theory/core/theory.service";

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent extends ComponentWithSession {
  
  private lessons;
  private lesson;
  private question: TestQuestion;
  private mode;
  private questionId;

  onInitTasks() {
    this.theoryService.getLessonsTitle().subscribe(
      theory => {
        this.lessons = theory.lessons;
        this.lesson = this.lessons[0];
      },
      error => this.router.navigate(["/server-error", error])
    )
    this.question = new TestQuestion(undefined, "", undefined, [new TestOption("", false)]);
    //this.addOption();
  }

  constructor(sessionService: SessionService,
              router: Router,
              private testService: TestService,
              private theoryService: TheoryService) {
    super(sessionService, router);
  }

  private addOption(){
    if(this.question){
      if(this.question.testOptions){
        window.location.hash = '';
        this.question.testOptions.push(new TestOption("", false))
        setTimeout(() => { window.location.hash = 'addOptionButton'; }, 1)
      }
    }
  }

  private allOptionsAreDifferent(){
    if(this.question.testOptions.length > 1){
      let aux2 = this.question.testOptions.map((option, i, arr) => {
        let aux =  (arr.filter((optionAux) => {
          return optionAux.answer === option.answer
        }).length <= 1)
        return aux;
      })
      let aux3 = aux2.reduce((last, actual) => {return last && actual})
      return aux3
    }
    return true
  }

  private deleteOption(selectedOption){
    if(this.question){
      if(this.question.testOptions){
        this.question.testOptions = this.question.testOptions.filter((option) => {
          return option.answer !== selectedOption.answer || option.isCorrect !== selectedOption.isCorrect
        })
      }
    }
  }

  private allOptionsFilled(){
    if(this.question){
      if(this.question.testOptions){
        if(this.allOptionsAreDifferent()){
          return this.question.testOptions.every(option => {
            return option.answer !== "" && option.answer !== undefined 
          })
        }
      }
    }
  }

  private isReadyToSend(){
    let noFreeOptions = this.allOptionsFilled();
    let thereIsWording = this._thereIsWording();
    if(this.question){
      if(this.allOptionsAreDifferent()){
        if(this.question.testOptions){
          let atleastOneCorrect = this.question.testOptions.filter(option => {
            return option.isCorrect;
          })
          let atleastOneIncorrect = this.question.testOptions.filter(option => {
            return !option.isCorrect;
          })
          return atleastOneIncorrect.length > 0 && noFreeOptions &&
            atleastOneCorrect.length > 0 && thereIsWording;
        }
      }
    }
  }

  private changeBool(option){
    option.isCorrect = !option.isCorrect
  }

  private _thereIsWording(){
   if(this.question){
     if(this.question.wordingImage){
       return true
     }
     if(this.question.wordingText){
       return this.question.wordingText.length > 0 && this.question.wordingText.trim()
     }
   }
  }

  private goToConfirmation(){
    this.testService.confirmationData = {lessonId: this.lesson.id, question: this.question, mode: ADD}
    this.router.navigate(['/test/questions/confirmation'])
  }

  private doSome(){
    console.log(JSON.stringify(this.question))
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
      this.question.wordingImage = btoa(binaryString);
    }
  }

}
