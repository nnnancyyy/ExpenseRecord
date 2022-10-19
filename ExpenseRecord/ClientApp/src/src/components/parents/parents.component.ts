import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'parents-component',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentsComponent implements OnInit {
  public logs: Array<string> = [];

  public title1 = "this is parent input for child 1111111111111";
  public title2 = "this is parent input for child 2222222222222";

  constructor() {
  }

  ngOnInit() {

  }

  public testItem(data: any): void {
    this.logs.push(data);
  }
}
