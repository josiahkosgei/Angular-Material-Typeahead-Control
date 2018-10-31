import { COMMA, ENTER, TAB, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocompleteTrigger } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as _ from "lodash";
@Component({
  selector: 'app-chips-autocomplete-example',
  templateUrl: './chips-autocomplete-example.component.html',
  styleUrls: ['./chips-autocomplete-example.component.scss']
})
export class ChipsAutocompleteExampleComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  public model: any;
  separatorKeysCodes = [ENTER, COMMA, TAB, RIGHT_ARROW];

  fruitCtrl = new FormControl();
  filteredFruits: Observable<any[]>;
  filteredFruit: string;
  queryStringParts: String[];

  fruits = [];

  allFruits = [
    'Orange',
    'Strawberry',
    'Lime',
    'Apple',
    'Avocado',
    'Orange 1',
    'Strawberry 1',
    'Lime 1',
    'Apple 1',
    'Avocado 1',
    'Lemon',
  ];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  constructor() {
    this.fruits = [];
    this.queryStringParts = [];
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(null),
      map((searchTerm: string) => {
        let filteredResultArray = [];
        this.queryStringParts = [];
        if (!!searchTerm && searchTerm.length > 2) {
          filteredResultArray = this.filter(searchTerm);
          const filteredResult = filteredResultArray[0] ? filteredResultArray[0].toLowerCase() : "";
          if (filteredResult) {
            this.queryStringParts[0] = filteredResultArray[0].substring(0, searchTerm.length);
            this.queryStringParts[1] = filteredResultArray[0].substr(searchTerm.length, filteredResultArray[0].length);
          }
        }

        this.filteredFruit = filteredResultArray[0];
        return filteredResultArray;
      }));
  }
  clear() {
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim() && this.filteredFruit) {
      this.fruits.push({ name: this.filteredFruit });
    }
    // Reset the input value
    if (input) {
      this.fruitCtrl.setValue("");
      this.queryStringParts = [];
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.fruitCtrl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }
  }

  filter(name: string) {
    const availableFruits = this.getAvailableFruits(this.allFruits, this.fruits);
    const matchedFruit = availableFruits.filter(fruit => fruit.toLowerCase().indexOf(name.toLowerCase()) === 0).slice(0, 1);
    return matchedFruit;
  }
  getAvailableFruits(allFruits: string [], listedFruits: string []) {
    return _.differenceWith(allFruits, listedFruits, _.isEqual);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push({ name: event.option.viewValue });
    this.fruitInput.nativeElement.value = '';
  }
}