import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { StatisticsService } from "app/statistics/core/statistics.service";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { TestQuestion } from "app/core/model/testQuestion";
import { TestOption } from "app/core/model/testOption";
import { Location } from '@angular/common';
import { GOOD, WRONG, ALMOSTGOOD, UNRESPONDED } from 'app/core/utils/const'

@Component({
  selector: 'app-recreate-exam',
  templateUrl: './recreate-exam.component.html',
  styleUrls: ['./recreate-exam.component.css']
})
export class RecreateExamComponent extends ComponentWithSession {

  private exam;
  private correctedAnswers: TestOption[];
  private mark;
  private GOOD = GOOD;
  private WRONG = WRONG;
  private ALMOSTGOOD = ALMOSTGOOD;
  private UNRESPONDED = UNRESPONDED; 

  onInitTasks() {
    let data = this.statisticsService.getExamData()
    if(data){
      this.exam = data.exam;
      this.mark = data.mark;
    }
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
              private statisticsService: StatisticsService,
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
