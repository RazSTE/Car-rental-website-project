//#region Imports 
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';  
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';  
//#endregion

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent    // מחלקת היסטוריית הזמנות 
 {                                       // Seasson.storage מקבלת סיכום של ההזמנה ב
 
  user      :any  ;                    // משתמש
  orderList :any[];                   // רשימת ההזמנות 

  constructor(private http : Http)  // בבנאי מבוצע השמה למשתנים
  {  
    this.user = JSON.parse(sessionStorage.getItem('user')); // השמת פרטי המשתמש 
    this.http.get("http://localhost:51601/api/orders").subscribe(t => this.orderList = t.json());// קבלת רשימת ההזמנות
  }
}
