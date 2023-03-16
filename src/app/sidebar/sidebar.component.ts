import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from '../models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input()
  steps!: Step[]

  @Input()
  personalInfoFormValid!: boolean;

  @Input()
  selectedStep!: Step;

  @Output()
  changeStep = new EventEmitter<Step>();

  constructor() { }

  ngOnInit(): void {
  }

  ChangeStep(step: Step) {
    if (step.number === 1 || (step.number > 1 && this.personalInfoFormValid))
      this.changeStep.emit(step);
  }

}
