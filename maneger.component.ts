import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maneger',
  templateUrl: './maneger.component.html',
  styleUrls: ['./maneger.component.css']
})
export class ManegerComponent implements OnInit { // רכיב מנהל ראשי , אינו מכיל לוגיקה
                                                 //HTML מכיל הפניה לרכיבי המנהל ברכיב ה 
  constructor() { }

  ngOnInit() {
  }

}
