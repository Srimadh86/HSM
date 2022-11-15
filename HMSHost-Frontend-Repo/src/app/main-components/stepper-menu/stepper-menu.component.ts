import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-menu',
  templateUrl: './stepper-menu.component.html',
  styleUrls: ['./stepper-menu.component.scss']
})
export class StepperMenuComponent implements OnInit {
  panelOpenState = true;
  isOpened = true
  constructor() { }

  ngOnInit(): void {
  }

}
