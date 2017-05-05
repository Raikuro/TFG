import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TheoryService } from "app/theory/core/theory.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { Section } from "app/theory/core/section";
import { SessionService } from "app/core/session/session.service";
import { Session } from "app/core/session/session";
import { ComponentWithSession } from "app/theory/core/componentWithSession";

@Component({
  selector: 'app-index-theory',
  templateUrl: './index-theory.component.html',
  styleUrls: ['./index-theory.component.css']
})
export class IndexTheoryComponent implements OnInit {

  private lessons;
  private sections;
  private lesson;
  private section;
  @Output() onKeywordClick = new EventEmitter<String>();

  constructor(private router: Router,
              private theoryService: TheoryService) {}

  ngOnInit(){
    let index = this.theoryService.index;
    if((<Observable<Theory>> index).subscribe){
      (<Observable<Theory>> index).subscribe(
        index => {
          this.lessons = index.lessons;
          this.lesson = this.lessons[0];
          this.sections = this.lesson.sections;
          this.theoryService.index = index
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      )
    }
    else{
      this.lessons = (<Theory> index).lessons;
      this.lesson = this.lessons[0];
      this.sections = this.lesson.sections;
    }
  }

  selectSection(section){
    this.section = section;
    let response = this.theoryService.getSection(this.lesson.id, this.section.id)
    if((<Observable<Section>>response).subscribe){
      (<Observable<Section>>response).subscribe(
        section => {
          this.section.content = section.content;
          this.section.keywords = section.keywords;
          this.theoryService.updateSectionsCache(section, this.lesson.id, this.section.id)
        },
        error => {
          this.router.navigate(['/server-error', error]);
        }
      )
    }
    else{
      this.section.content = response.content;
      this.section.keywords = response.keywords;
    }
  }

  onLessonSeletorChange(lesson){
    this.lesson = lesson;
    this.sections = this.lesson.sections;
  }
}
