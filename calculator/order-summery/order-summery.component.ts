import { Http                } from '@angular/http';
import { Component, OnInit   } from '@angular/core'; 
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe            } from '@angular/common';  

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.css']
})
export class OrderSummeryComponent  // רכיב סיכום הזמנה מקבל את פרטי ההזמנה שבוצעה ומציג סיכום
 {
  Order  : any ; 
  Branch : any ; 

  constructor(private http : Http)  
  {  
    this.http.get("http://localhost:51601/api/branch").subscribe(t => this.Branch = t.json());   

    this.Order= JSON.parse(sessionStorage.getItem('order'));
  }

  

}
