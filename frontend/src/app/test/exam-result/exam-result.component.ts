import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { TestService } from "app/test/core/test.service";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestQuestion } from "app/core/model/testQuestion";
import { TestOption } from "app/core/model/testOption";
import { Location } from '@angular/common';
import { GOOD, WRONG, ALMOSTGOOD, UNRESPONDED } from 'app/core/utils/const'

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent extends ComponentWithSession {
  
  private exam;
  private correctedAnswers: TestOption[];
  private mark;
  private GOOD = GOOD;
  private WRONG = WRONG;
  private ALMOSTGOOD = ALMOSTGOOD;
  private UNRESPONDED = UNRESPONDED; 

  onInitTasks() {
    let data = this.testService.getCorrectedData()
    //let data = JSON.parse('{"mark":0,"exam":{"user":"asd","examQuestions":[{"examResponses":[{"selected":false,"testOption":{"id":35,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":36,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":15,"wordingText":"enunciado 15","wordingImage":null,"testOptions":[{"id":35,"answer":"respuesta3T","isCorrect":true},{"id":36,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":17,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":18,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":6,"wordingText":"enunciado 6","wordingImage":null,"testOptions":[{"id":17,"answer":"respuesta3T","isCorrect":true},{"id":18,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":21,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":22,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":8,"wordingText":"enunciado 8","wordingImage":null,"testOptions":[{"id":21,"answer":"respuesta3T","isCorrect":true},{"id":22,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":15,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":16,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":5,"wordingText":"enunciado 5","wordingImage":null,"testOptions":[{"id":15,"answer":"respuesta3T","isCorrect":true},{"id":16,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":9,"answer":"respuesta1T","isCorrect":true}},{"selected":false,"testOption":{"id":10,"answer":"respuesta2T","isCorrect":true}},{"selected":false,"testOption":{"id":11,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":12,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":3,"wordingText":"enunciado 3","wordingImage":null,"testOptions":[{"id":9,"answer":"respuesta1T","isCorrect":true},{"id":10,"answer":"respuesta2T","isCorrect":true},{"id":11,"answer":"respuesta3T","isCorrect":true},{"id":12,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":27,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":28,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":11,"wordingText":"enunciado 11","wordingImage":null,"testOptions":[{"id":27,"answer":"respuesta3T","isCorrect":true},{"id":28,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":31,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":32,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":13,"wordingText":"enunciado 13","wordingImage":null,"testOptions":[{"id":31,"answer":"respuesta3T","isCorrect":true},{"id":32,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":33,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":34,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":14,"wordingText":"enunciado 14","wordingImage":null,"testOptions":[{"id":33,"answer":"respuesta3T","isCorrect":true},{"id":34,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":23,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":24,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":9,"wordingText":"enunciado 9","wordingImage":null,"testOptions":[{"id":23,"answer":"respuesta3T","isCorrect":true},{"id":24,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":19,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":20,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":7,"wordingText":"enunciado 7","wordingImage":null,"testOptions":[{"id":19,"answer":"respuesta3T","isCorrect":true},{"id":20,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":13,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":14,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":4,"wordingText":"enunciado 4","wordingImage":null,"testOptions":[{"id":13,"answer":"respuesta3T","isCorrect":true},{"id":14,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":1,"answer":"respuesta1T","isCorrect":true}},{"selected":false,"testOption":{"id":2,"answer":"respuesta2F","isCorrect":false}},{"selected":false,"testOption":{"id":3,"answer":"respuesta3F","isCorrect":false}},{"selected":false,"testOption":{"id":4,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":1,"wordingText":"enunciado 1","wordingImage":null,"testOptions":[{"id":1,"answer":"respuesta1T","isCorrect":true},{"id":2,"answer":"respuesta2F","isCorrect":false},{"id":3,"answer":"respuesta3F","isCorrect":false},{"id":4,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":5,"answer":"respuesta1T","isCorrect":true}},{"selected":false,"testOption":{"id":6,"answer":"respuesta2T","isCorrect":true}},{"selected":false,"testOption":{"id":7,"answer":"respuesta3F","isCorrect":false}},{"selected":false,"testOption":{"id":8,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":2,"wordingText":"enunciado 2","wordingImage":null,"testOptions":[{"id":5,"answer":"respuesta1T","isCorrect":true},{"id":6,"answer":"respuesta2T","isCorrect":true},{"id":7,"answer":"respuesta3F","isCorrect":false},{"id":8,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":29,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":30,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":12,"wordingText":"enunciado 12","wordingImage":null,"testOptions":[{"id":29,"answer":"respuesta3T","isCorrect":true},{"id":30,"answer":"respuesta4F","isCorrect":false}]}},{"examResponses":[{"selected":false,"testOption":{"id":25,"answer":"respuesta3T","isCorrect":true}},{"selected":false,"testOption":{"id":26,"answer":"respuesta4F","isCorrect":false}}],"question":{"id":10,"wordingText":"enunciado 10","wordingImage":null,"testOptions":[{"id":25,"answer":"respuesta3T","isCorrect":true},{"id":26,"answer":"respuesta4F","isCorrect":false}]}}]}}')
    if(data){
      this.exam = data.exam;
      this.mark = data.mark;
      // this.exam.examQuestions.forEach((examQuestion) => {
      //   let alumVsTeacherResponses = examQuestion.examResponses.map((response) => { return [response.selected, response.testOption.isCorrect] })
      //   //examQuestion.isRight = this._isRight(examQuestion.testOptions, examQuestion.correctedAnswers)
      //   this._checkAccuracy(alumVsTeacherResponses)
      // });
    }
    else{
      this.back()
    }
    //else{ this.goToErrorPage("error") }
  }

  checkAccuracy(examQuestion){
    if(examQuestion){
      let alumVsTeacherResponses = examQuestion.examResponses.map((response) => { return [response.selected, response.testOption.isCorrect] })
      return this._checkAccuracy(alumVsTeacherResponses)
    }
  }

  _checkAccuracy(alumnVsTeacher){
    let responded = 0;
    let nOfCorrects = alumnVsTeacher
      .map((tupla) => {
        if (responded === 0 && tupla[0]) {
          responded++
        } 
        return tupla[0] === tupla[1]
      })
      .reduce((last, actual) => {return last + actual})
    if(responded !== 0){
      if(nOfCorrects === 0) { return WRONG }
      else { return nOfCorrects === alumnVsTeacher.length ? GOOD : ALMOSTGOOD }
    }
    return UNRESPONDED
  }

  getSymbol(corrected){
    /*return chosen.isCorrect === corrected.isCorrect ? 'V' : 'F'*/
    return corrected.isCorrect
  }

  _isRight(chosenAnswers, correctedAnswers){
    let fails=0;
    /*chosenAnswers.forEach((answer,i)=> {
      if(answer.isCorrect !== correctedAnswers[i].isCorrect){
        fails++;
      }
    })*/
    let acum = 0;
    chosenAnswers.forEach((answer,i)=> {
      if(answer.isCorrect !== correctedAnswers[i].isCorrect){
        fails++;
      }
      acum += answer.isCorrect;
    })
    if (acum === 0) { return UNRESPONDED }
    if (fails === 0) { return GOOD }
    if (fails === chosenAnswers.length) { return WRONG }
    return ALMOSTGOOD;
  }

  goToIndex(){
    this.router.navigate(['/theory'])
  }

  constructor(sessionService: SessionService,
              router: Router,
              private testService: TestService,
              private location: Location) {
    super(sessionService, router);
  }

  back(){
    this.location.back();
  }

  isQuestionAnswered(question){
    return question.testOptions.reduce((previous, current) => {
      return typeof(previous) === 'object' ? previous.isCorrect + current.isCorrect :
        previous + current.isCorrect
    })
  }

  goToQuestion(index){
    window.location.hash = 'q'+index;
  }

}
