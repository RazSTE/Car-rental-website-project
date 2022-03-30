import { FormsModule                 } from '@angular/forms';
import { Component, OnInit ,NgModule } from '@angular/core';
import { Http                        } from '@angular/http';  
import { Pipe, PipeTransform         } from '@angular/core';
import { DatePipe                    } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent   // רכיב ביצוע ההזמנה , מבצע חישוב של עלות ההשכרה
{                                 // מבצע בדיקה של זמינות הרכבים 
  //#region Declerations         // במידה והמשתמש רשום , ויש רכב פנוי מבוצעת הזמנה
  carModelList :any[]  ;
  CarModelID   :any    ; 
  isSelected   :boolean; 
  CurrentModel :any    ; 
  ErrorMassege :string ;  
  startDate    :Date   ; 
  returnDate   :Date   ; 
  tempDate     :string ;   
  rentPrice    :number ;  
  User         :any    ; 
  ModelUnitList:any[]  ; 
  unitID       :number ; 
  massege      :any    ; 
  Today        :Date   ; 
  allowRent    :boolean ;
//#endregion

  constructor(private http : Http )  //בבנאי מתבצעת שליפה של הרכב הנבחר שהועבר מרכיב תצוגת הרכבים 
  {  
    if(sessionStorage.getItem('selectedCar'))
    { 
     this.CarModelID = sessionStorage.getItem('selectedCar'); 
     this.CarDitales(this.CarModelID);                    // ומועבר לפונקציה שמביאה את פרטי דגם הרכב
    }                                                    // בבנאי גם מתבצע שליפה ממסד הנתונים והשמה למערכים
    this.http.get("http://localhost:51601/api/carmodel"  ).subscribe(t => this.carModelList  = t.json());  
    this.http.get("http://localhost:51601/api/modelunits").subscribe(t => this.ModelUnitList = t.json());  
    this.Today = new Date(); 
    this.allowRent = false ;
  }

  
  CarDitales(carModel:any) // פונקציה שמיבאת דגם רכב נבחר ע"פ מספר הרכב שנבחר בתצוגת הרכב
  {   
    this.http.get("http://localhost:51601/api/carmodel/"+carModel) 
    .subscribe(t => this.CurrentModel = t.json()
     ); 
    this.isSelected   = true ;                      //  מתבצע של איתחול למשתני הפונקציה בכל פעם שנבחר דגם
    this.ErrorMassege = null ; 
    this.startDate    = null ; 
    this.returnDate   = null ; 
    this.rentPrice    = null ; 
    this.unitID       = null ;  
    sessionStorage.removeItem('selectedCar') ; 
  }
  
  //#region  Rent Function
  Rent()                                                     //  פונקציית ההשכרה
  {  
    this.ErrorMassege=''; 

   if (sessionStorage.getItem('user'))                     // מתבצעת בדיקה האם המשתמש מחובר למערכת
   {     
     for (var i = 0; i < this.ModelUnitList.length; i++)  // מתבצעת בדיקה מול רשימת יחידות הרכב
     {                                                   // במידה ונמצא יחידה פנויה מהרכב המבוקש 
       if  (    this.ModelUnitList[i].Manufactor  == this.CurrentModel.Manufactor  
             && this.ModelUnitList[i].ModelName   == this.CurrentModel.ModelName  
             && this.ModelUnitList[i].IsAvileable == "Yes" 
             && this.ModelUnitList[i].OnRipair    == "No" 
            ) 
        { 
            this.unitID = this.ModelUnitList[i].ModelID ; // היחידה מושמת בתוך משתנה לצורך המשך הפעולה
      
         if(this.unitID >0 && this.rentPrice>0)      // במידה וקיימת יחידה פנויה , ובמידה והתאריכים תקינים
         { 
            this.User = JSON.parse(sessionStorage.getItem('user'));   // מבוצע השמה למשתנה מסוג משתמש
        
            this.http.put("http://localhost:51601/api/modelunits/"+this.unitID,  // יחידת הרכב מתעדכנת 
            {  
              'ModelID'        : this.unitID                      ,  
              "Manufactor"     : this.ModelUnitList[i].Manufactor , 
              "ModelName"      : this.ModelUnitList[i].ModelName  ,
              'IsAvileable'    : "No"                             ,
              'OnRipair'       : this.ModelUnitList[i].OnRipair   ,
              'Mileage'        : this.ModelUnitList[i].Mileage    ,
              'PlateNumber'    : this.ModelUnitList[i].PlateNumber, 
              "Branch"         : this.ModelUnitList[i].Branch     , 
              "Photo"          : this.ModelUnitList[i].Photo 
            }).subscribe(t => this.massege = t.json());   
     
            this.http.post("http://localhost:51601/api/orders",      // מתבצעה רישום במסד הנתונים של ההזמנה
             {  
              "UserID"         : this.User.UserID  , 
              "StartDate"      : this.startDate    , 
              "ReturnDate"     : this.returnDate   , 
              'PlateNumber'    : this.ModelUnitList[i].PlateNumber, 
              "Manufactor"     : this.ModelUnitList[i].Manufactor , 
              "ModelName"      : this.ModelUnitList[i].ModelName   
             }) 
             .subscribe( t =>this.massege=t.json());  
     
              sessionStorage.setItem( 'order',                     // seassionStorage מתבצעת השמה של פרטי ההזמנה ב
              JSON.stringify({ 
              'startDate'  :this.startDate , 
              'returnDate' :this.returnDate, 
              'price'      :this.rentPrice , 
              'manufactor' :this.ModelUnitList[i].Manufactor  , 
              'modelName'  :this.ModelUnitList[i].ModelName   ,
              'plateNumber': this.ModelUnitList[i].PlateNumber, 
              'Branch'     : this.ModelUnitList[i].Branch 
              }));
         
              window.location.href = '/ordersummery';                   // הפניה לסיכום ההזמנה
          }
          else if (this.rentPrice < 0  || this.rentPrice===null )  // במידה והתאריכים לא תקינים
          { 
          this.ErrorMassege="invalidDate" ;
          } 
        }   
      }
        if(this.unitID == null)                      // אם לא נמצא דגם פנוי
        {
        this.ErrorMassege="NoAvileableUnit" ; 
        }
    } 
     else 
     { 
      this.ErrorMassege = "NotRegister";           // במידה והמשתמש לא רשום
     }
  
  } 
   //#endregion 
    
   //#region Get Price Function
  price()                                  // פונקציה לחישוב התאריכים והמחיר 
  {    
    this.allowRent = false ;
    this.rentPrice= null   ; 
    this.ErrorMassege=""   ;  

    let dif:number = new Date( this.returnDate.toString()).getTime() - new Date(this.startDate.toString()).getTime();
    var day = Math.round(dif/(1000*3600*24));  
     
    let difrent:number = new Date( this.startDate.toString()).getTime() - new Date(this.Today.toString()).getTime();
    var currentday = Math.round(difrent/(1000*3600*24)); 

     if(currentday>=0)                    // מתבצעת בדיקה שתאריך ההזמנה לא קטן מתאריך הנוכחי 
    {
    if(day > 0  )                         // מתבצעת בדיקה שמספר הימים תקין 
    {
      this.rentPrice = (day)*this.CurrentModel.PricePerDay ;    
      this.allowRent = true ;

    }
    else                            // הודאת שגיאה במידה והתאריכים לא תקינים
    { 
      this.ErrorMassege="invalidDate" 
      this.resetDates();
    }  
  } 
  else                          // הודאת שגיאה במידה ותאריך ההתחלה קטן מתאריך הנוכחי
  { 
    this.ErrorMassege="smallStartDate"
    this.resetDates();
  }
  }  
  resetDates()             // איפוס התאריכים במידה ויש שגיאה
  {
    this.startDate  = null ; 
    this.returnDate = null ;
  } 
 
  //#endregion
}
