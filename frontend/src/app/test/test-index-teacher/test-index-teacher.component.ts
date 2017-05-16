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

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.testService.getLessonsTitle().subscribe(
      lessons => this.lessons = lessons,
      error => this.router.navigate(["/server-error", error])
    )
  }

}
