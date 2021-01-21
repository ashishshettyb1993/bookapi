import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './Book/book.component';
import { SecondComponent } from './Book/Second.component';

const routes: Routes = [
  { path: '', component: BookComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'app-book', component: BookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
