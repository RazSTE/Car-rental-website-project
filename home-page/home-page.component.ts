import { Http } from '@angular/http';
import { FormsModule }                 from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';   
import { BrowserModule } from '@angular/platform-browser'; 
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] 
})
export class HomePageComponent  
{
contact: boolean  ; 
Branch : any[]    ;  
lat    : number   ; 
lng    : number   ; 

 
constructor(private http : Http )  // רכיב עמוד הבית , משתמש בגוגל מפות 
{                                 // גוגל דורשת רישום  האתר והמשתמש ע"מ שהמפות יהיו מוזנות באופן דינאמי
  this.contact=false ;           // עקב כך , ומיכוון שלא הייתה דרישה ספציפית לכך , הרכיב הושאר ברמה בסיסית
  this.http.get("http://localhost:51601/api/branch").subscribe(t => this.Branch = t.json());    
  this.lat = 32.0639502 ; // במידה ואין רישום לגוגל
  this.lng = 34.787519  ;// אין אפשרות לזין באופן דינאמי ערכי מיקום , רק דרך רישום בבנאי באופן לא מקצועי
}                       // מקווה שתחוס עלי במקרה הזה

 
Contact()  // פונקציה לכפתור צור קשר
{         // לא הוגדר , מה צור קשר אמור לעשות , לכן הושאר ברמת כתובת ומיקום
 this.contact = !this.contact ; 
}
}
