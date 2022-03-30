//#region Imports
import { UniquePipe   } from './../unique.pipe';
import { SortCarsPipe } from './../sort-cars.pipe';
import { CalculatorComponent } from './../calculator/calculator.component';
import { Routes    } from '@angular/router';
import { routing   } from './../app-routing.module';
import { AppModule } from './../app.module';
import { Component, OnInit, Pipe } from '@angular/core';
import { Http, HttpModule        } from '@angular/http';
import { NgModule } from '@angular/core';   
//#endregion



@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent                 // מחלקת תצוגת הרכב 
{
  carModelList    : any []  ; 
  ModelUnitList   : any []  ; 
  OrderList       : any []  ; 
  UnavilableUnits : any []  ; 
  userCarHistory  : string []  ;
  startDate       : Date ; 
  


  constructor(private http : Http )  // בבנאי מתבצעת קריאה למידע ממסד הנתונים והשמת המידע במערכים
  { 
    this.http.get("http://localhost:51601/api/carmodel").subscribe  (t => this.carModelList  = t.json());   
    this.http.get("http://localhost:51601/api/modelunits").subscribe(t => this.ModelUnitList = t.json());
    this.http.get("http://localhost:51601/api/orders").subscribe    (t => this.OrderList     = t.json());  

  if(sessionStorage.getItem('user'))                      // במידה וקיים משתמש מחובר מתבצעת בדיקה האם קיים
  {                                                      // רישום במחשב של רכבים שבהם המשתמש התעניין בם בעבר
    var user= JSON.parse(sessionStorage.getItem('user')); 
    if(localStorage.getItem(user.UserID.toString()))  // במידה וכן מתבצע משיכה של הרישום והשמתו במשתנה
    { 
      this.userCarHistory =JSON.parse(localStorage.getItem(user.UserID));
    }
  }
  }   
 
  userSelectModel( selectedCar : any ) // פונקציה שמבצעת משיכה של דגם רכב והשמתו ברישום המערכת לצורך בדיקות נוספות
  {  
    
    sessionStorage.setItem('selectedCar', selectedCar); // seassionStorage השמת הדגם הנבחר ב
                                                       // לצורך העברת המידע לרכיב החישוב
    if (sessionStorage.getItem('user'))               // במידה והמשתמש מחובר
    { 
      var user= JSON.parse(sessionStorage.getItem('user'));  
       
      if(localStorage.getItem(user.UserID.toString()))  // מתבצעת בדיקה האם קיים העדפות ללקוח בזכרון המערכת
      {  
         let carArray =[];
         carArray = JSON.parse(localStorage.getItem(user.UserID));  // מתבצעת שליפת מערך הבחירות של המשתמש
         var exists :boolean = false  ; 
         for (var i = 0; i < carArray.length; i++) 
         {  
          if(carArray[i]===selectedCar)                   // אם הדגם כבר קיים במערך הבחירות לא מתבצע רישום
          { 
             exists =true 
          }
         } 
          if(exists==false)                         // במידה והרכב לא קיים במערך הבחירות של המשתמש
          { 
          carArray.push(selectedCar) ;             // מתבצע רישום של הרכב במערך 
          localStorage.setItem(user.UserID,JSON.stringify(carArray)); // והשמת המערך בזכרון הרישום
          } 
      } 
      else                                      // ובמידה ולא קיים למשתמש רישום במערכת יצירת רישום חדש 
      {                                        //
        let carArray =[];
        carArray.push(selectedCar) ;
        localStorage.setItem(user.UserID,JSON.stringify(carArray)); 
        
      }
    } 
    window.location.href = '/calculator';  // לאחר סדר הפעולות הפניה לרכיב החישוב עם הדגם הנבחר

  } 
   
  checkDate()  // פונקציה לבדיקה אילו יחידות דגמי רכב פנויות בתאריך מבוקש 
  {           // בודקת אם תאריך תחילת ההשכרה של הרכב קטן מתאריך ההחזרה ברשימת ההזמנות
    if(this.startDate){
    for (var i = 0; i < this.OrderList.length; i++)  
    { 
      let dif:number = new Date(this.startDate.toString()).getTime()- new Date( this.OrderList[i].ReturnDate.toString()).getTime() ;
      var day = Math.round(dif/(1000*3600*24)); 
        
      if(day<0) 
      {  
        for (var j = 0; j < this.ModelUnitList.length; j++)  
        { 
          if (this.OrderList[i].PlateNumber === this.ModelUnitList[j].PlateNumber) 
          {
            for (var z = 0; z < this.carModelList.length; z++)  
            { 
              if(this.carModelList[z].Manufactor===this.ModelUnitList[j].Manufactor) 
              { 
                this.carModelList.splice(z,1) ; // במידה וקיים רכב שלא יהיה זמין בתאריך ההתחלה של ההשכרה
              }                                // מתבצעת השמטה של אותו דגם
            }
          }
        } 
      }
      
    }
  } 
  else 
  { 
    window.location.reload();
  }
 }
}
