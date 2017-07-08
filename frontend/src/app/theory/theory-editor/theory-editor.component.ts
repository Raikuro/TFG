import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Session } from 'app/core/session/session'
import { SessionService } from "app/core/session/session.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TheoryService } from "app/theory/core/theory.service";
import { Theory } from "app/core/model/theory";
import { Section } from "app/core/model/section";
import { Location } from '@angular/common';
import { ComponentWithSession } from "app/core/component/componentWithSession";
import { EDIT, ADD } from "app/core/utils/const";
import { Keyword } from "app/core/model/keyword";

@Component({
  selector: 'app-theory-editor',
  templateUrl: './theory-editor.component.html',
  styleUrls: ['./theory-editor.component.css']
})
export class TheoryEditorComponent extends ComponentWithSession {

  @ViewChild('imageInput') imageInput;
  private lessons;
  private mode;
  private lesson;
  private section;
  private ready;
  private imagePreview;
  private words;
  
  constructor(private theoryService:TheoryService,
              sessionService: SessionService,
              router: Router,
              private route: ActivatedRoute,
              private location: Location
    ) {super(sessionService, router)}
  
  goToConfirmation(){
    this.theoryService.prepareData(this.mode, this.lesson, this.section);
    this.router.navigate(['/theory/change-confirmation']);
  }

  doSome(a){
    console.log(this.section, this.isReadyToSend());
  }

  isReadyToSend(){
    let aux = false
    if(this.section){
      if(this.section.title){
        if(this.section.title.length > 0){
          if(this.section.contentText){
            aux = this.section.contentText.length > 0
          }
          if(this.section.contentImage){
            aux = true
          }
          return aux
        }
      }
    }
  }

  changeKeywords(keys){
    let words = keys.trim().split(',').filter((word) => {
      return word != ''
    })
    this.section.keywords = words.map((word) => {
      return new Keyword(word)
    })
  }
  
  onInitTasks(){
    this.ready = false;
    if(this.session.isAlumn){
      this.location.back();
    }
    else{
      let index = this.theoryService.index;
      if((<Observable<Theory>>index).subscribe){
        (<Observable<Theory>>index).subscribe(
          index => {
            this.lessons = index.lessons;
            this.onInitTaskNext()
          },
          error => console.log(error)
        )
      }
      // else{
      //   this.lessons = (<Theory>index).lessons;
      //   this.onInitTaskNext()
      // }
    }
  }

  onInitTaskNext(){
    let data = this.theoryService.preparedData
    /*if(data){
      this.mode = data.mode
      this.lesson = data.lesson
      this.section = data.section
      console.log("AAA", this.lesson)
    }
    else{*/
      this.route.params.subscribe(
        params => {
          this.lesson = this.lessons[params.lessonId-1];
          if(data){
            this.mode = data.mode
            //this.lesson = data.lesson
            this.section = data.section
            this.words = this.section.keywords.map((keyword) => {
              return keyword.word
            })
            this.theoryService.deletePreparedData();
            //console.log("AAA", this.lesson)
          }
          else{
            let sectionId = params.sectionId;
            if(this.lesson){
              if(sectionId){
                this.mode = EDIT;
                let section = this.theoryService.getSection(this.lesson.id, sectionId)
                if((<Observable<Section>>section).subscribe){
                  (<Observable<Section>>section).subscribe(
                    section => {
                      this.section = section;
                      this.words = this.section.keywords.map((keyword) => {
                        return keyword.word
                      })
                    },
                    error => console.log(error)
                  )
                }
                // else{
                //   this.section = (<Section>section);
                //   this.words = this.section.keywords.map((keyword) => {
                //     return keyword.word
                //   })
                // }
              }
              else{
                this.mode = ADD;
                this.section = {};
              }
            }
            else{
              this.lesson = this.lessons[0];
            }
          }
        },
        error => console.log(error)
      )
    //}
  }

  handleFileSelect(evt){
    let files = evt.target.files;
    let file = files[0];
    if (files && file) {
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    if(this.section){
      this.section.contentImage = btoa(binaryString);
      console.log(this.section.contentImage)
    }
  }

  removeImage(){
    this.imageInput.nativeElement.value = ''
    this.section.contentImage = undefined
  }
}
