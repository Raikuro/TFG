import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TheoryService } from "app/theory/core/theory.service";
import { TestService } from "app/test/core/test.service";
import { DELETE } from "app/core/utils/const";
import { TestOption } from "app/theory/core/testOption";
import { TestQuestion } from "app/theory/core/testQuestion";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";

const PAGESIZE = 5;

@Component({
  selector: 'app-test-index-teacher',
  templateUrl: './test-index-teacher.component.html',
  styleUrls: ['./test-index-teacher.component.css']
})
export class TestIndexTeacherComponent extends ComponentWithSession {
  protected onInitTasks() {
    this.page = 1;
              
    this.theoryService.getLessonsTitle().subscribe(
      theory => {
        this.lessons = theory.lessons;
        this.lesson = this.lessons[0];
      },
      error => this.router.navigate(["/server-error", error])
    )
  }

  private lessons;
  private lesson;
  private shownQuestions;
  //private questions;
  //private page = 1;
  private page;
  private PAGESIZE = PAGESIZE;

  constructor(private theoryService: TheoryService, router: Router, private testService: TestService, sessionService: SessionService) {
    super(sessionService, router);
  }

  /*ngOnInit() {
    this.page = 1;
              
    this.theoryService.getLessonsTitle().subscribe(
      theory => {
        this.lessons = theory.lessons;
        this.lesson = this.lessons[0];
      },
      error => this.router.navigate(["/server-error", error])
    )
  }*/

  onLessonSelectorChange(lesson){
    this.lesson = lesson;
  }

  showQuestions(){
    //this.router.navigate(['/test/' + this.lesson.id + '/questions']);
    if(!this.lesson.question){
      this.testService.getQuestions(this.lesson.id).subscribe(
            questions => {
              this.lesson.questions = questions.map(question => {
                question.testOptions = question.testOptions.map(option => {
                  return new TestOption(option.answer, option.isCorrect)
                })
                let aux = new TestQuestion(question.id, question.wording, question.testOptions)
                return aux;
              });
              //console.log(this.questions)
              this.page = 1;
              this.shownQuestions = this.lesson.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE);
              console.log(this.shownQuestions)
            },
            error => console.log("cc", error)
          )
    }
    else{
      this.page = 1;
      this.shownQuestions = this.lesson.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE);
    }

  }

//---------------------------------------------------

  changeShownQuestions(){
    if(this.lesson)
      this.shownQuestions = this.lesson.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE)
  }

  /*constructor(private route: ActivatedRoute, private testService: TestService, sessionService: SessionService, router: Router) {
    super(sessionService, router)
  }*/

  getSymbol(option){
    return option.isCorrect ? 'T' : 'F';
  }

  editQuestion(question){
    this.testService.saveData(question)
    this.router.navigate(['/test/questions/edit'])
  }

  addQuestion(){
    this.router.navigate(['/test/questions/add/'])
  }

  deleteQuestion(question){
    this.testService.saveData({lessonId: this.lesson.id, question: question, mode: DELETE})
    this.router.navigate(['/test/questions/confirmation'])
  }



}
