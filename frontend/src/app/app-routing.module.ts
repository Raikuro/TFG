import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from 'app/login/login.component';
import { TheoryComponent }      from 'app/theory/theory.component';
import { TheoryEditorComponent } from 'app/theory/theory-editor/theory-editor.component'
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { ConfirmChangesComponent } from 'app/theory/confirm-changes/confirm-changes.component';
import { ServerErrorComponent } from 'app/core/server-error/server-error.component' 
import { QuestionsComponent } from "app/theory/questions/questions.component";
import { QuestionConfirmationComponent } from "app/theory/questions/question-confirmation/question-confirmation.component";
import { RespondQuestionComponent } from './theory/questions/respond-question/respond-question.component';
import { UnrespondedQuestionListComponent,} from './theory/questions/unresponded-question-list/unresponded-question-list.component';
import { TestComponent } from "app/test/test.component";
import { QuestionListComponent } from "app/test/question-list/question-list.component";
import { QuestionEditorComponent } from "app/test/question-editor/question-editor.component";
import { TestQuestionConfirmationComponent } from "app/test/test-question-confirmation/test-question-confirmation.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'theory', component: TheoryComponent },
  { path: 'theory/editor', component: TheoryEditorComponent},
  { path: 'theory/change-confirmation', component: ConfirmChangesComponent},
  { path: 'questions', component: QuestionsComponent},
  { path: 'questions/confirmation', component: QuestionConfirmationComponent},
  { path: 'questions/respond', component: RespondQuestionComponent},
  { path: 'questions/unresponded', component: UnrespondedQuestionListComponent },
  { path: 'test', component: TestComponent },
  { path: 'test/:id/questions', component: QuestionListComponent },
  { path: 'test/questions/edit', component: QuestionEditorComponent },
  { path: 'test/questions/add', component: QuestionEditorComponent },
  { path: 'test/questions/confirmation', component: TestQuestionConfirmationComponent},
  { path: 'server-error/:error', component: ServerErrorComponent},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}