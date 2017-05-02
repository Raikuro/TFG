import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from 'app/login/login.component';
import { TheoryComponent }      from 'app/theory/theory.component';
import { TheoryEditorComponent } from 'app/theory/theory-editor/theory-editor.component'
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { ConfirmChangesComponent } from 'app/theory/confirm-changes/confirm-changes.component';
import { ServerErrorComponent } from 'app/core/server-error/server-error.component' 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'theory', component: TheoryComponent },
  { path: 'theory/editor', component: TheoryEditorComponent},
  { path: 'theory/change-confirmation', component: ConfirmChangesComponent},
  { path: 'server-error/:error', component: ServerErrorComponent},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}