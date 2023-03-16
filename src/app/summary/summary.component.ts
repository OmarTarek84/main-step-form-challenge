import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Addon, Plan, Step } from '../models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Output()
  changeStep = new EventEmitter<Step>();

  @Input()
  selectPlanForm!: FormGroup;

  @Input()
  addOnsForm!: FormGroup;

  @Input()
  steps!: Step[];

  @Input()
  selectedStep!: Step;

  @Input()
  addons!: Addon[];

  @Input()
  plans!: Plan[]

  constructor() { }

  ngOnInit(): void {
  }

  get planValue(): string {
    return this.selectPlanForm.controls['plan'].value;
  }

  get durationValue(): 'yearly' | 'monthly' {
    return this.selectPlanForm.controls['duration'].value;
  }

  get addonsControls() {
    return this.addOnsForm.controls['addons'] as FormArray;
  }

  get pricePlan(): number {
    const plan: Plan = this.plans.find(p => p.value === this.planValue)!;
    return this.durationValue === 'monthly' ? plan.pricePerMonth!: plan.pricePerYear!;
  }

  getAddonPrice(addonValue: string): number {
    const addon = this.addons.find(a => a.value === addonValue)!;
    return this.durationValue === 'monthly'? addon.pricesAddedPerMonth: addon.pricesAddedPerYear;
  }

  addOnName(addonValue: string) {
    return (this.addons.find(a => a.value === addonValue))?.title;
  }

  get totalPrice(): number {
    let sum: number = this.pricePlan;

    this.addonsControls.controls.forEach(ctrl => sum += this.getAddonPrice(ctrl.value));

    return sum;
  }

  goToDurationStep() {
    const step = this.steps.find(s => s.number == 2);
    this.changeStep.emit(step);
  }

}
