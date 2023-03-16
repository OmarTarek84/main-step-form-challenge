import { FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan, Step } from '../models';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.scss']
})
export class SelectPlanComponent implements OnInit {

  @Input()
  steps!: Step[];

  @Output()
  changeStep = new EventEmitter<Step>();

  form = this.fb.group({
    plan: 'arcade',
    duration: 'monthly'
  });

  isYearly: boolean = false;

  plans: Plan[] = [
    { value: 'arcade', title: 'Arcade', pricePerMonth: 9, pricePerYear: 90 },
    { value: 'advanced', title: 'Advanced', pricePerMonth: 12, pricePerYear: 120 },
    { value: 'pro', title: 'Pro', pricePerMonth: 15, pricePerYear: 150 },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get planControlValue() {
    return this.form.controls['plan'].value;
  }

  get durationControlValue() {
    return this.form.controls['duration'].value;
  }

  changePlan(planValue: string) {
    this.form.patchValue({plan: planValue});
  }

  durationChanged(e: any) {
    this.isYearly = !this.isYearly;
    if (this.isYearly) this.form.patchValue({duration: 'yearly'})
    else this.form.patchValue({duration: 'monthly'});
  }

  goToStep1() {
    const step = this.steps.find(s => s.number === 1);
    this.changeStep.emit(step);
  }

  goToStep3() {
    const step = this.steps.find(s => s.number === 3);
    this.changeStep.emit(step);
  }

}
