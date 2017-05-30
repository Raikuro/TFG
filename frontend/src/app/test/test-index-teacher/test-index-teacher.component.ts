import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TheoryService } from "app/theory/core/theory.service";

@Component({
  selector: 'app-test-index-teacher',
  templateUrl: './test-index-teacher.component.html',
  styleUrls: ['./test-index-teacher.component.css']
})
export class TestIndexTeacherComponent implements OnInit {

  private lessons;
  private lesson;

  constructor(private theoryService: TheoryService, private router: Router) { }

  ngOnInit() {
    this.theoryService.getLessonsTitle().subscribe(
      theory => {
        this.lessons = theory.lessons;
        this.lesson = this.lessons[0];
      },
      error => this.router.navigate(["/server-error", error])
    )
  }

  onLessonSelectorChange(lesson){
    this.lesson = lesson;
  }

  showQuestions(){
    this.router.navigate(['/test/' + this.lesson.id + '/questions']);
  }

}
