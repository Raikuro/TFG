import { Component, OnInit } from '@angular/core';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute } from "@angular/router/";
import { TestService } from "app/test/core/test.service";
import { TestQuestion } from "app/theory/core/testQuestion";
import { TestOption } from "app/theory/core/testOption";
import { DELETE } from "app/core/utils/const";

const PAGESIZE = 2;

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent extends ComponentWithSession {
  
  private questions: TestQuestion[];
  private shownQuestions: TestQuestion[];
  private menu: Number[]
  private page = 1;
  private questionId;
  private lessonId;
  private pagesize;

  onInitTasks() {
    this.route.params.subscribe(
      params => {
        this.lessonId = params.id 
        this.testService.getQuestions(params.id).subscribe(
          questions => {
            this.questions = questions.map(question => {
              question.testOptions = question.testOptions.map(option => {
                return new TestOption(option.answer, option.isCorrect)
              })
              let aux = new TestQuestion(question.id, question.wording, question.testOptions)
              return aux;
            });
            console.log(this.questions)
            this.page = 1;
            this.shownQuestions = this.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE);
            console.log(this.shownQuestions)
          },
          error => console.log("cc", error)
        )
      },
      error => console.log("bbbb", error));
  }

  changeShownQuestions(){
    this.shownQuestions = this.questions.slice((this.page-1)*PAGESIZE, this.page*PAGESIZE)
  }

  constructor(private route: ActivatedRoute, private testService: TestService, sessionService: SessionService, router: Router) {
    super(sessionService, router)
  }

  getSymbol(option){
    return option.isCorrect ? 'T' : 'F';
  }

  editQuestion(question){
    this.testService.data = question
    this.router.navigate(['/test/questions/edit'])
  }

  addQuestion(){
    this.router.navigate(['/test/questions/add/'])
  }

  deleteQuestion(question){
    this.testService.confirmationData = {lessonId: this.lessonId, question: question, mode: DELETE}
    this.router.navigate(['/test/questions/confirmation'])
  }

}
