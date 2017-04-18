import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SessionService } from '../core/session/session.service'

//import { THEMES } from '../conf'

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent implements OnInit {

  id;
  isAlumn;
  isTeacher;

  constructor(private sessionService: SessionService, private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.sessionService.checkIsAlumn(this.id).then( (res) =>{
        this.isAlumn = res;
      })
    });
  }

}
