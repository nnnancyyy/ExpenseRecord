import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from '../models/ToDoItem';
import { ToDoServiceMock } from '../services/to-do.service.mock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  item: ToDoItem;
  form: FormGroup;
  deleteShow: boolean = false;
  constructor(private toDoService: ToDoServiceMock, private todosSrviceMock: ToDoServiceMock, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.item = {
      id: 'new',
      createTime: new Date().toISOString(),
      description: '',
      done: false
    };
    this.form = this.fb.group({
      description: this.fb.control('', [Validators.required]),
      done: this.fb.control(''),
      favorite: this.fb.control('')
    });
    this.form.valueChanges.subscribe(() => {
      this.item.description = this.form.get('description')?.value ?? '';
      this.item.done = this.form.get('done')?.value ?? false;
    });
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('itemId');
    if (id && id !== 'new') {
      this.loadData(id);
    } else {
      this.patchFormWithItem(this.item);
    }
  }

  isNewItem(): boolean {
    return this.item.id === 'new';
  }

  save(): void {
    if (!this.isNewItem()) {
      this.toDoService.updateOne(this.item.id, this.item);
    } else {
      this.toDoService.createOne(this.item);
    }
  }


  delete(): void {
    const ok = confirm(`Delete this item?`);
    if (ok) {
      if (!this.isNewItem()) {
        this.toDoService.deleteOne(this.item.id).subscribe(() => {
          this.navToList();
        });
      } else {
        this.navToList();
      }
    }
  }

  toggleItemDone(item: ToDoItem): void {
    const oldValue = item.done;
    item.done = !item.done;
    console.log(item)
    this.toDoService.updateOne(item.id, item)//.subscribe();
  }

  async navToList(): Promise<boolean> {
    return this.router.navigate(['items'], {
      relativeTo: this.route.parent
    });
  }

  private loadData(id: string): void {
    this.toDoService.getOne(id);//.subscribe(res => { this.item = res });
  }

  private patchFormWithItem(item: ToDoItem): void {
    this.form.patchValue({
      description: item.description,
      done: item.done
    });
  }
}