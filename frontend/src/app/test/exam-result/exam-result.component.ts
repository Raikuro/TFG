import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/session/componentWithSession";
import { TestService } from "app/test/test.service";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestQuestion } from "app/theory/core/testQuestion";
import { TestOption } from "app/theory/core/testOption";

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent extends ComponentWithSession {
  
  private exam;
  private correctedAnswers: TestOption[];
  private mark;

  onInitTasks() {
    let data = this.testService.getCorrectedData()
    //let data = JSON.parse('{"mark":9.375,"origin":[{"id":5,"wording":"enunciado 5","testOptions":[{"answer":"respuesta3T","isCorrect":true},{"answer":"respuesta4F","isCorrect":false}]},{"id":11,"wording":"enunciado 11","testOptions":[{"answer":"respuesta3T","isCorrect":true},{"answer":"respuesta4F","isCorrect":false}]},{"id":12,"wording":"enunciado 12","testOptions":[{"answer":"respuesta3T","isCorrect":true},{"answer":"respuesta4F","isCorrect":false}]},{"id":2,"wording":"enunciado 2","testOptions":[{"answer":"respuesta1T","isCorrect":true},{"answer":"respuesta2T","isCorrect":false},{"answer":"respuesta3F","isCorrect":false},{"answer":"respuesta4F","isCorrect":false}]},{"id":1,"wording":"enunciado 1","testOptions":[{"answer":"respuesta1T","isCorrect":true},{"answer":"respuesta2F","isCorrect":false},{"answer":"respuesta3F","isCorrect":false},{"answer":"respuesta4F","isCorrect":false}]}],"solutions":[[{"answer":"respuesta3T","isCorrect":true},{"answer":"respuesta4F","isCorrect":false}],[{"answer":"respuesta3T","isCorrect":true},{"answer":"respuesta4F","isCorrect":false}],[{"answer":"respuesta3T","isCorrect":true},{"answer":"respuesta4F","isCorrect":false}],[{"answer":"respuesta1T","isCorrect":true},{"answer":"respuesta2T","isCorrect":true},{"answer":"respuesta3F","isCorrect":false},{"answer":"respuesta4F","isCorrect":false}],[{"answer":"respuesta1T","isCorrect":true},{"answer":"respuesta2F","isCorrect":false},{"answer":"respuesta3F","isCorrect":false},{"answer":"respuesta4F","isCorrect":false}]]}');
    if(data !== undefined){
      this.exam = data.origin;
      this.mark = data.mark;
      this.exam.forEach((question, i) => {
        question.correctedAnswers = data.solutions[i];
        question.isRight = this._isRight(question.testOptions, question.correctedAnswers)
      });
      console.log(this.exam)
    }
    //else{ this.goToErrorPage("error") }
  }

  getSymbol(chosen, corrected){
    return chosen.isCorrect === corrected.isCorrect ? 'V' : 'F'
  }

  _isRight(chosenAnswers, correctedAnswers){
    let fails=0;
    console.log(chosenAnswers, correctedAnswers)
    chosenAnswers.forEach((answer,i)=> {
      if(answer.isCorrect !== correctedAnswers[i].isCorrect){
        fails++;
      }
    })
    if (fails === 0) { return true }
    if (fails === chosenAnswers.length) { return false }
    return null;
  }

  goToIndex(){
    this.router.navigate(['/theory'])
  }

  constructor(sessionService: SessionService,
              router: Router,
              private testService: TestService) {
    super(sessionService, router);
  }

}
