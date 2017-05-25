import { Component, OnInit } from '@angular/core';
import { TestService } from "app/test/test.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-test-index-teacher',
  templateUrl: './test-index-teacher.component.html',
  styleUrls: ['./test-index-teacher.component.css']
})
export class TestIndexTeacherComponent implements OnInit {

  private lessons;
  private lesson;

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.testService.getLessonsTitle().subscribe(
      theory => {
        this.lessons = theory.lessons;
        this.lesson = this.lessons[0];
      },
      error => this.router.navigate(["/server-error", error])
    )
  }

  onLessonSeletorChange(lesson){
    this.lesson = lesson;
  }

  showQuestions(){
    this.router.navigate(['/test/' + this.lesson.id + '/questions']);
  }

}
