import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { TheoryComponent }      from './theory/theory.component';
import { TheoryEditorComponent } from './theory/theory-editor/theory-editor.component'
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { ConfirmChangesComponent } from "app/theory/confirm-changes/confirm-changes.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'theory', component: TheoryComponent },
  { path: 'theory-editor', component: TheoryEditorComponent},
  { path: 'theory-change-confirmation', component: ConfirmChangesComponent},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}