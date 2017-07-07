import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from 'app/login/login.component';
import { TheoryComponent }      from 'app/theory/theory/theory.component';
import { TheoryEditorComponent } from 'app/theory/theory-editor/theory-editor.component'
import { ConfirmChangesComponent } from 'app/theory/confirm-changes/confirm-changes.component';
import { ServerErrorComponent } from 'app/core/server-error/server-error.component' 
import { QuestionsComponent } from "app/questions/questions/questions.component";
import { QuestionConfirmationComponent } from "app/questions/question-confirmation/question-confirmation.component";
import { RespondQuestionComponent } from 'app/questions/respond-question/respond-question.component';
import { UnrespondedQuestionListComponent,} from 'app/questions/unresponded-question-list/unresponded-question-list.component';
import { TestComponent } from "app/test/test/test.component";
import { QuestionEditorComponent } from "app/test/question-editor/question-editor.component";
import { QuestionAddComponent } from "app/test/question-add/question-add.component";
import { TestQuestionConfirmationComponent } from "app/test/test-question-confirmation/test-question-confirmation.component";
import { ExamComponent } from "app/test/exam/exam.component";
import { ExamConfirmationComponent } from "app/test/exam-confirmation/exam-confirmation.component";
import { ExamResultComponent } from "app/test/exam-result/exam-result.component";
import { UserNotLoggedComponent } from "app/core/user-not-logged/user-not-logged.component";
import { PageNotFoundComponent } from "app/core/page-not-found/page-not-found.component";
import { StatisticsComponent } from "app/statistics/statistics.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'theory', component: TheoryComponent },
  { path: 'theory/editor', component: TheoryEditorComponent},
  { path: 'theory/change-confirmation', component: ConfirmChangesComponent},
  { path: 'theory/:init', component: TheoryComponent },
  //{ path: 'theory/editor', component: TheoryEditorComponent},
  { path: 'questions', component: QuestionsComponent},
  { path: 'questions/confirmation', component: QuestionConfirmationComponent},
  { path: 'questions/respond', component: RespondQuestionComponent},
  { path: 'questions/unresponded', component: UnrespondedQuestionListComponent },
  { path: 'statistics', component:  StatisticsComponent},
  { path: 'test', component: TestComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'exam/confirmation', component: ExamConfirmationComponent },
  { path: 'exam/result', component: ExamResultComponent },
  //{ path: 'test/:id/questions', component: QuestionListComponent },
  { path: 'test/questions/edit', component: QuestionEditorComponent },
  { path: 'test/questions/add', component: QuestionAddComponent },
  { path: 'test/questions/confirmation', component: TestQuestionConfirmationComponent},
  { path: 'server-error/:error/:url', component: ServerErrorComponent},
  { path: 'user-not-logged', component: UserNotLoggedComponent},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}