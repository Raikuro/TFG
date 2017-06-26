import { Component, OnInit } from '@angular/core';
import { TheoryService } from "app/theory/core/theory.service";
import { SessionService } from "app/core/session/session.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Session } from "app/core/session/session";
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { Location } from '@angular/common';
import { ADD, EDIT, DELETE } from "app/core/utils/const";

@Component({
  selector: 'app-confirm-changes',
  templateUrl: './confirm-changes.component.html',
  styleUrls: ['./confirm-changes.component.css']
})

export class ConfirmChangesComponent extends ComponentWithSession {

  private data;

  constructor(private theoryService:TheoryService,
              sessionService: SessionService,
              router: Router,
              private location: Location) {
                super(sessionService, router)
              }

  getMode(){
    if(this.data){
      if(this.data.mode === ADD){
        return 'AÑADIR';
      }
      if(this.data.mode === EDIT){
        return 'EDITAR';
      }
      if(this.data.mode === DELETE){
        return 'BORRAR';
      }
    }
  }

  onInitTasks(){
    this.data = this.theoryService.preparedData;
    if(this.data === undefined){
      this.goBack();
    } 
  }

  goBack() {
    this.location.back();
  }

  sendData(){
    this.theoryService.sendData(this.data).subscribe(
      () => {
        this.theoryService.deleteTheoryCache().then(() => {
          this.router.navigate(['/theory']);
        })
      },
      error => this.goToErrorPage(error)
    );
  }

}
