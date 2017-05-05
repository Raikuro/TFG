import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "app/core/session/session.service";
import { TheoryService } from "app/theory/core/theory.service";
import { Observable } from "rxjs/Observable";
import { Theory } from "app/theory/core/theory";
import { ComponentWithSession } from "app/theory/core/componentWithSession";
import { Section } from "app/theory/core/section";

@Component({
  selector: 'app-search-theory',
  templateUrl: './search-theory.component.html',
  styleUrls: ['./search-theory.component.css']
})
export class SearchTheoryComponent implements OnChanges {

  private sections;
  private section;
  @Input('searchQuery') private searchQuery;
  @Output() onKeywordClick = new EventEmitter<String>();

  constructor(private router: Router,
              private theoryService: TheoryService) {}

  ngOnChanges(changes: any) {
    this.theoryService.search(changes.searchQuery.currentValue).subscribe(
      (result) => { this.sections = result },
      (error) => { this.router.navigate(['/server-error', error]) }
    )
  }

  selectSection(section){
    this.section = section;
  }
}
