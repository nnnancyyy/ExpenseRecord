import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToDoItemComponent } from './todo-item/to-do-item.component';
import { ToDoListComponent } from './todo-list/to-do-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'items'
      },
      {
        path: 'items',
        component: ToDoListComponent
      },
      {
        path: 'item/:itemId',
        component: ToDoItemComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ToDoRoutingModule {

}
