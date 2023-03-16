import { FormArray, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Addon, Step } from '../models';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {

  @Input()
  duration: string | null | undefined = 'monthly';

  form = this.fb.group({
    addons: this.fb.array([])
  });

  addons: Addon[] = [
    { title: 'Online Service', subtitle: 'Access to multiplayer games', pricesAddedPerMonth: 1, pricesAddedPerYear: 10, value: 'onlineservice' },
    { title: 'Larger Storage', subtitle: 'Extra 1TB of could save', pricesAddedPerMonth: 2, pricesAddedPerYear: 10, value: 'largestorage' },
    { title: 'Customizable Profile', subtitle: 'Custom theme on your profile', pricesAddedPerMonth: 2, pricesAddedPerYear: 20, value: 'customizableprofile' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get addonsControl() {
    return this.form.controls['addons'] as FormArray;
  }

  isAddonChecked(addonValue: any) {
    return this.addonsControl.value.indexOf(addonValue) >= 0;
  }

  getAddonPrice(addonValue: string) {
    const addon = this.addons.find(a => a.value === addonValue)!;
    return this.duration === 'monthly'? addon.pricesAddedPerMonth: addon.pricesAddedPerYear;
  }

  fieldsChange(event: any, addonValue: string) {

    const checked = event.currentTarget.checked;

    const addonvalInd = this.addonsControl.value.indexOf(addonValue);

    if (checked && addonvalInd < 0) {
      this.addonsControl.push(this.fb.control(addonValue));
    } else if (!checked && addonvalInd >= 0)  {
      this.addonsControl.removeAt(addonvalInd);
    }
  }

}
