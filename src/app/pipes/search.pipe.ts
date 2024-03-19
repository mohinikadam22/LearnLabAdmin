import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(category: any[], searchInput: string): any[] {
    if (!searchInput) {
      return [];
    }
    searchInput = searchInput.toLowerCase();
    return category.filter(
      x => typeof x === 'string' && x.toLowerCase().includes(searchInput)
    );
  }
  

}
