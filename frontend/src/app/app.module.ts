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
import { TheoryService } from "app/theory/core/theory.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmChangesComponent } from './theory/confirm-changes/confirm-changes.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { SearchTheoryComponent } from './theory/search-theory/search-theory.component';
import { IndexTheoryComponent } from './theory/index-theory/index-theory.component';
import { QuestionsComponent } from './theory/questions/questions.component';
import { QuestionsService } from './theory/questions/core/questions.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuestionConfirmationComponent } from './theory/questions/question-confirmation/question-confirmation.component';
import { RespondQuestionComponent } from './theory/questions/respond-question/respond-question.component';
import { UnrespondedQuestionListComponent } from './theory/questions/unresponded-question-list/unresponded-question-list.component';
import { TestComponent } from './test/test.component';
import { TestIndexAlumnComponent } from './test/test-index-alumn/test-index-alumn.component';
import { TestIndexTeacherComponent } from './test/test-index-teacher/test-index-teacher.component';
import { TestService } from "app/test/core/test.service";
import { QuestionListComponent } from './test/question-list/question-list.component';
import { QuestionEditorComponent } from './test/question-editor/question-editor.component';
import { TestQuestionConfirmationComponent } from './test/test-question-confirmation/test-question-confirmation.component';
import { ExamComponent } from './test/exam/exam.component';
import { ExamConfirmationComponent } from './test/exam-confirmation/exam-confirmation.component';
import { ExamResultComponent } from './test/exam-result/exam-result.component';
import { UserNotLoggedComponent } from './user-not-logged/user-not-logged.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    TheoryComponent,
    TheoryEditorComponent,
    PageNotFoundComponent,
    ConfirmChangesComponent,
    ServerErrorComponent,
    SearchTheoryComponent,
    IndexTheoryComponent,
    QuestionsComponent,
    QuestionConfirmationComponent,
    RespondQuestionComponent,
    UnrespondedQuestionListComponent,
    TestComponent,
    TestIndexAlumnComponent,
    TestIndexTeacherComponent,
    QuestionListComponent,
    QuestionEditorComponent,
    TestQuestionConfirmationComponent,
    ExamComponent,
    ExamConfirmationComponent,
    ExamResultComponent,
    UserNotLoggedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    AppRoutingModule,
    CookieModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [SessionService, TheoryService, QuestionsService, TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
