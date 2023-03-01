import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
  
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
   }
}

// https://stackblitz.com/edit/angular-filter-list-of-items-a4pxff?file=src%2Fapp%2Ffilter.pipe.ts,src%2Fapp%2Fapp.component.html