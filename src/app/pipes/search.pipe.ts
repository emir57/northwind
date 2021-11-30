import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], searchString:string): Product[] {
    searchString = searchString?searchString.toLocaleLowerCase():"";

    return searchString?
      value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(searchString)!==-1):
      value;
  }

}
