import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], searchString:string): Product[] {
    searchString = searchString?searchString.toLowerCase():"";

    return searchString?
      value.filter((p:Product)=>p.productName.toLowerCase().indexOf(searchString)!==-1):
      value;
  }

}
