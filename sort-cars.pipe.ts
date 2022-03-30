import { Pipe, PipeTransform } from '@angular/core';

@Pipe({                                      // צינור סינון לרשימת הרכבים
  name: 'sortCars'
})
export class SortCarsPipe implements PipeTransform {

  transform(carList: any[] , input: any)  
    { 
      if(input) 
      { 
        return carList.filter((eachItem) => {
          return eachItem['Manufactor'].toLowerCase().includes(input.toLowerCase()) || // סינון יצרן
                 eachItem['ModelName'].toLowerCase().includes(input.toLowerCase())  || // סינון מודל
                 eachItem['Gear'].toLowerCase().includes(input.toLowerCase())       || // סינון גיר
                 eachItem['Year'].toString().includes(input.toString())                // סינון שנה
          })
      }
      else 
      { 
        return carList ;
      }
  }
}
