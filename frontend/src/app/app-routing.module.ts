import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { TheoryComponent }      from './theory/theory.component';
import { TheoryEditorComponent} from './theory/theory-editor/theory-editor.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'theory/:id', component: TheoryComponent },
  { path: 'theory-editor', component: TheoryEditorComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}