import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  @Output() closeDrawer = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
