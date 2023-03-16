import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Step } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  @Input()
  steps!: Step[];

  @Output()
  changeStep = new EventEmitter<Step>();

  @Output()
  emitFormValid = new EventEmitter<boolean>();

  formChangesSubscription!: Subscription;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formChangesSubscription = this.form.valueChanges.subscribe(() => this.emitFormValid.emit(this.form.valid));
  }

  get name() {
    return this.form.controls['name'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get phone() {
    return this.form.controls['phone'];
  }

  goToStep2() {
    const step = this.steps.find(s => s.number === 2);
    this.changeStep.emit(step);
  }

  ngOnDestroy(): void {
    this.formChangesSubscription.unsubscribe();
  }

}
