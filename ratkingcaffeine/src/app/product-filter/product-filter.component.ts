import { Component ,Input, Output, EventEmitter} from '@angular/core';
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
@Input() filters: Filter[] = [];//takes data from parent component.
@Output() filtersChange = new EventEmitter<Filter[]>();

  toggleFilter(filter: any) 
  {
    filter.expanded = !filter.expanded;
  }
  filterhasChange() {
     this.filtersChange.emit([...this.filters]);
  }
  toggleSelected(filter: any, option: string,  event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const checked = inputElement.checked;
      filter.selected[option] = checked;
      this.filterhasChange();
  }
  clearFilters() {
    this.filters.forEach(filter => {
      filter.expanded = false;
      filter.options.forEach(option => {
        filter.selected[option] = false;
      });
    });
    this.filterhasChange();
  }
}
