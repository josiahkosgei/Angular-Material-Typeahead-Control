import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleteExampleComponent } from './chips-autocomplete-example.component';

describe('ChipsAutocompleteExampleComponent', () => {
  let component: ChipsAutocompleteExampleComponent;
  let fixture: ComponentFixture<ChipsAutocompleteExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleteExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsAutocompleteExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
