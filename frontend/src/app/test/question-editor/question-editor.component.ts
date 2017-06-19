import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TestService } from "app/test/core/test.service";
import { TestOption } from "app/theory/core/testOption";
import { TestQuestion } from "app/theory/core/testQuestion";
import { EDIT, ADD } from "app/core/utils/const";
import { TheoryService } from "app/theory/core/theory.service";

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent extends ComponentWithSession {
  
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
    this.question = this.testService.getData();
    if(this.question){
      this.mode = EDIT;
    }
    else{
      this.router.navigate(['/test/questions/add/'])
      this.mode = ADD;
      this.question = new TestQuestion(undefined, "", []);
      this.addOption();
    }
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
        console.log(this.question.testOptions)
        this.question.testOptions.push(new TestOption("", false))
        console.log(this.question.testOptions)
        
      }
    }
  }

  private deleteOption(selectedOption){
    console.log(selectedOption, "--->", this.question.testOptions)
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
        return this.question.testOptions.every(option => {
          return option.answer !== "" && option.answer !== undefined 
        })
      }
    }
  }

  private isReadyToSend(){
    let noFreeOptions = this.allOptionsFilled();
    let thereIsWording = this._thereIsWording();
    if(this.question){
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

  private changeBool(option){
    option.isCorrect = !option.isCorrect
  }

  private _thereIsWording(){
   if(this.question){
     if(this.question.wording){
       return this.question.wording !== undefined || this.question.wording !== "";
     }
   }
  }

  private goToConfirmation(){
    this.testService.saveData({lessonId: this.lesson.id, question: this.question, mode: this.mode})
    this.router.navigate(['/test/questions/confirmation'])
  }

  private doSome(){
    console.log(JSON.stringify(this.question))
  }

  private getAction(){
    if(this.mode === ADD){
      return 'AÑADIR';
    }
    if(this.mode === EDIT){
      return 'EDITAR';
    }
  }

}
