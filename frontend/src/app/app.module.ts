import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { TheoryComponent } from './theory/theory.component';
import { TheoryEditorComponent } from './theory/theory-editor/theory-editor.component';
import { SessionService} from './core/session/session.service';
import { Session } from './core/session/session';
import { TheoryService } from "app/theory/theory.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    TheoryComponent,
    TheoryEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [SessionService, TheoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
