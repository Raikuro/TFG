import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TheoryService } from "app/theory/core/theory.service";
import { TestService } from "app/test/core/test.service";
import { DELETE, PAGESIZE } from "app/core/utils/const";
import { TestOption } from "app/core/model/testOption";
import { TestQuestion } from "app/core/model/testQuestion";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";

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
        let aux = this.testService.data ? this.testService.data.lessonId : 1
        this.lesson = this.lessons[aux-1];
      },
      error => this.router.navigate(["/server-error", error])
    )
  }

  private lessons;
  private lesson;
  private shownQuestions;
  private page;
  private PAGESIZE = PAGESIZE;

  constructor(private theoryService: TheoryService, router: Router, private testService: TestService, sessionService: SessionService) {
    super(sessionService, router);
  }

  onLessonSelectorChange(lesson){
    this.lesson = lesson;
    this.showQuestions()
  }

  showQuestions(){
    if(!this.lesson.question){
      this.testService.getQuestions(this.lesson.id).subscribe(
            questions => {
              this.lesson.questions = questions.map(question => {
                question.testOptions = question.testOptions.map(option => {
                  return new TestOption(option.answer, option.isCorrect)
                })
                let aux = new TestQuestion(question.id, question.wordingText, question.wordingImage, question.testOptions)
                return aux;
              });
              this.page = 1;
              this.shownQuestions = this.lesson.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE);
            },
            error => console.log("cc", error)
          )
    }
    else{
      this.page = 1;
      this.shownQuestions = this.lesson.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE);
    }

  }

  changeShownQuestions(){
    if(this.lesson)
      this.shownQuestions = this.lesson.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE)
  }

  getSymbol(option){
    return option.isCorrect;
  }

  editQuestion(question){
    this.testService.data = {
      'question': question,
      'lessonId': this.lesson.id
    }
    this.router.navigate(['/test/questions/edit'])
  }

  addQuestion(){
    this.testService.data = {
      'lessonId': this.lesson.id
    }
    this.router.navigate(['/test/questions/add/'])
  }

  deleteQuestion(question){
    this.testService.confirmationData = {lessonId: this.lesson.id, question: question, mode: DELETE}
    this.router.navigate(['/test/questions/confirmation'])
  }

}
