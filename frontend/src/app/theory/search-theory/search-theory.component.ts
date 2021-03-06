import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TheoryService } from "app/theory/core/theory.service";
import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { ComponentWithSession } from "app//core/session/componentWithSession";
import { Section } from "app/theory/core/section";

@Component({
  selector: 'app-search-theory',
  templateUrl: './search-theory.component.html',
  styleUrls: ['./search-theory.component.css']
})
export class SearchTheoryComponent implements OnChanges {

  private lessons;
  private sections;
  private lesson;
  private section;
  @Input('searchQuery') private searchQuery;
  @Output() onKeywordClick = new EventEmitter<String>();
  @Output() onSectionClick = new EventEmitter<String>();
  @Output() onLessonChange = new EventEmitter<String>();

  constructor(private router: Router,
              private theoryService: TheoryService) {}

  ngOnChanges(changes: any) {
    this.theoryService.search(changes.searchQuery.currentValue).subscribe(
      (result) => { 
        this.assignLessons(result)
       },
      (error) => { this.router.navigate(['/server-error', error]) }
    )
  }
  
  assignLessons(index){
    console.log("1", index.lessons.length)
    if(index.lessons.length > 0){
      this.lessons = index.lessons;
      this.lesson = this.lessons[0];
      this.onLessonChange.emit(JSON.stringify(this.lesson))
      this.sections = this.lesson.sections
    }
    else{
      this.lessons = []
      this.sections = []
    }
  }

  selectSection(section){
    this.section = section;
    this.onSectionClick.emit(JSON.stringify(section))
  }

  onLessonSeletorChange(lesson){
    this.lesson = lesson;
    this.onLessonChange.emit(JSON.stringify(this.lesson))
    this.sections = this.lesson.sections;
  }

  doSome(){
    console.log(this.theoryService.getSection(this.lesson.id,this.section.id))
  }
}
