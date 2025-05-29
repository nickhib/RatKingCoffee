import { Component } from '@angular/core';
import { FormBuilder, FormsModule,FormGroup, FormControl, NonNullableFormBuilder, CheckboxRequiredValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Filter {
  label: string;
  options: string[];
  expanded: boolean;
  selected: {
    [optionName: string]: boolean;
  };
}
@Component({
  selector: 'app-product-filter',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  filters: Filter [] = [
    {
      label: 'Product Type',
      options: ['Coffee Bag', 'Coffee Rounds', 'Ready to Drink','Bundle','Bags','Other'],
      expanded: false,
      selected: {} 
    },
    {
      label: 'Roast Style',
      options: ['Dark Roast', 'Medium Roast', 'Light Roast'],
      expanded: false,
      selected: {} 
    },
    {
      label: 'Texture',
      options: ['Ground', 'Whole Bean', 'Rounds','On-the-go','Ready to Drink'],
      expanded: false,
      selected: {} 
    },

  ];
  toggleFilter(filter: any) 
  {
    filter.expanded = !filter.expanded;
  }
  toggleSelected(filter: any, option: string,  event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const checked = inputElement.checked;
      filter.selected[option] = checked;
  }
  clearFilters() {
    this.filters.forEach(filter => {
      filter.expanded = false;
      filter.options.forEach(option => {
        filter.selected[option] = false;
      });
    });
  }
}
