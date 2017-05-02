import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  private error;

  ngOnInit() {
    this.route.params.subscribe(
      params => this.error = params.error,
      error => this.error = error
    )
  }

}
