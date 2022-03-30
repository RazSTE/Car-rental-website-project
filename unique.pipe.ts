import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({                                            // צינור לסינון כפילויות ברשימת הרכבים 
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(value: any , option :any): any{ 
    if(option==='1') 
    {
    if(value!== undefined && value!== null){     // מסנן לפי שנת רכב 
        return _.uniqBy(value, 'Year');
    } 
  } 
  else if(option==='2')
  { 
    if(value!== undefined && value!== null){    // סינון לפי יצרן רכב
      return _.uniqBy(value, 'Manufactor');
  } 
  }
    return value;
}

}
