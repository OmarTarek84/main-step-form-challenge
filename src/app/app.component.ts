import { FormGroup, FormArray } from '@angular/forms';
import { SelectPlanComponent } from './select-plan/select-plan.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Step } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('submitFormBtn') submitFormBtn!: ElementRef<HTMLButtonElement>;

  formSubmitted = false;

  personalInfoFormValid: boolean = false;


  steps: Step[] = [
    { number: 1, title: "Your Info" },
    { number: 2, title: "Select Plan" },
    { number: 3, title: "Add-Ons" },
    { number: 4, title: "Summary" },
  ];

  selectedStep: Step = this.steps[0];


  stepChanged(step: Step) {
    this.selectedStep = step;
    this.formSubmitted = false;
  }

  goToPreviousStep() {
    const curStep = this.selectedStep.number;
    this.selectedStep = this.steps.find(s => s.number === curStep - 1)!;
    this.formSubmitted = false;
  }

  goToNextStep() {
    const curStep = this.selectedStep.number;
    this.selectedStep = this.steps.find(s => s.number === curStep + 1)!;
    this.formSubmitted = false;
  }

  ChangeFormValid(isValid: boolean) {
    this.personalInfoFormValid = isValid;
  };

  submitForm(personalInfoForm: FormGroup, selectPlanForm: FormGroup, addonsForm: FormGroup) {
    console.log({
      personalInfo: personalInfoForm.value,
      plan: selectPlanForm.value,
      addons: (addonsForm.get('addons') as FormArray).value
    });
    this.formSubmitted = true;
    personalInfoForm.reset();
    personalInfoForm.updateValueAndValidity();
  }

}
