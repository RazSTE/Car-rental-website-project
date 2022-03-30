import { Component, OnInit , NgModule      } from '@angular/core'  ; 
import { Pipe, PipeTransform               } from '@angular/core'  ;
import { DatePipe, getLocaleDateTimeFormat } from '@angular/common'; 
import { FormsModule                       } from '@angular/forms' ;
import { Http                              } from '@angular/http'  ;
 

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent  
{
 //#region Variables Declerations
carModelList  : any[]; 
ModelUnitList : any[]; 
orderList     : any[];  
Today         : any  ;  
massege       : any  ;
Error         : boolean; 
orderDisplay  : string ='' ; 
CarModel      : string ; 
FullPrice     : number ; 
LateDays      : number ; 
lateFee       : number ;  
OrderID       : number ; 
OrderPosition : number ;
UnitID        : number ; 
UnitPosition  : number ; 
PlateNumber   : number ;  
//#endregion


  constructor(private http :Http) // השמה של רשימות מסד הנתונים במערכים
{
  this.http.get("http://localhost:51601/api/carmodel"  ).subscribe(t => this.carModelList  = t.json());  
  this.http.get("http://localhost:51601/api/modelunits").subscribe(t => this.ModelUnitList = t.json()); 
  this.http.get("http://localhost:51601/api/orders"    ).subscribe(t => this.orderList     = t.json()); 
  this.Today = new Date(); // הצבת ערך של היום הנוכחי , ע"מ לבדוק יום החזרה
}

//#region CheckPlate Function 
checkPlate()  // פונקציה לבדיקה האם קיימת לוחית רישוי שהרכב עדין לא הוחזר , ושהלוחית קיימת במאגר
{ 
  this.Error= false ; 
  for (let i = 0; i < this.ModelUnitList.length; i++)  // לולאה שעוברת על כל יחידות הרכב
  { 
    if(this.ModelUnitList[i].PlateNumber=== Number(this.PlateNumber)) // במידה ונמצאת יחידת הרכב שלוחית הזיהוי תואמת
    { 
    var ValidPlate = true ;
    } 
  } 
  if( ValidPlate === true )
  {
   
  for (var i = 0; i < this.ModelUnitList.length; i++) // לולאה לחיפוש יחידת הרכב שאינו פנוי
  { 
    if(this.ModelUnitList[i].PlateNumber=== Number(this.PlateNumber) && this.ModelUnitList[i].IsAvileable==='No') 
    { 
      for (var j = 0; j < this.orderList.length;j++ )
      {
        if(this.orderList[j].PlateNumber === Number(this.PlateNumber)) // במידה ונמצאת יחידה
        { 
          for (var z = 0; z < this.carModelList.length; z++ ) // לולאה לחיפוש הדגם הנבחר לצורך השמת פרטי הדגם והמחיר
          { 
           if(this.carModelList[z].Manufactor=== this.ModelUnitList[i].Manufactor && this.carModelList[z].ModelName=== this.ModelUnitList[i].ModelName) 
           {
            var dif = new Date( this.Today.toString()).getTime() - new Date(this.orderList[j].ReturnDate.toString()).getTime();
            var day = Math.round(dif/(1000*3600*24));  
            
            if(day>0) // חישוב עלות השכרה במידה וקיים איחור 
            {  
            this.LateDays = (day)* Number(this.carModelList[z].PriceForLateDay); 
            var dif2 = new Date( this.Today.toString()).getTime() - new Date(this.orderList[j].StartDate.toString()).getTime();
            var daysCount = Math.round((dif2-dif)/(1000*3600*24)); 
            } 
            else   // חישוב עלות השכרה במידה ולא קיים איחור
            { 
              this.LateDays=0 ; 
              var dif2 = new Date( this.Today.toString()).getTime() - new Date(this.orderList[j].StartDate.toString()).getTime();
              var daysCount = Math.round((dif2)/(1000*3600*24)); 
            }

            this.FullPrice = ((daysCount)* (Number(this.carModelList[z].PricePerDay))) + (this.LateDays); // חישוב עלות השכרה כוללת
            this.CarModel = this.ModelUnitList[i].Manufactor + " "+ this.ModelUnitList[i].ModelName ; // השמת פרטי הרכב
            this.orderDisplay="Display"  
             
            this.OrderID = this.orderList[j].OrderID     ;   // השמת פרטי ההזמנה לצורך החזרה בפונקציה להחזרת רכב
            this.OrderPosition = j ;                        //  מיקום ההזמנה
            this.UnitID  = this.ModelUnitList[i].ModelID ; // השמת פרטי יחידת הרכב לצורך החזרת יחידת הרכב 
            this.UnitPosition = i ;                       // מיקום יחידת הרכב
            }
          }
        }
      } 
    } 
  } 
} 
 else 
 { 
  this.Error = true ;
 }
} 
//#endregion
 
//#region  Return Car Function 
returnCar()  // פונקציה להחזרת הרכב 
{ 
  this.http.put("http://localhost:51601/api/modelunits/"+this.UnitID    ,  // מעדכנת את רשימת יחידות הרכב
  {  
    'ModelID'        : this.UnitID ,  
    "Manufactor"     : this.ModelUnitList[this.UnitPosition].Manufactor , 
    "ModelName"      : this.ModelUnitList[this.UnitPosition].ModelName  ,
    'IsAvileable'    : "Yes" ,
    'OnRipair'       : this.ModelUnitList[this.UnitPosition].OnRipair   ,
    'Mileage'        : this.ModelUnitList[this.UnitPosition].Mileage    ,
    'PlateNumber'    : this.ModelUnitList[this.UnitPosition].PlateNumber, 
    "Branch"         : this.ModelUnitList[this.UnitPosition].Branch     , 
    "Photo"          : this.ModelUnitList[this.UnitPosition].Photo 
  }).subscribe(t => this.massege = t.json());   
    
  this.http.put("http://localhost:51601/api/orders/"+this.OrderID       ,  // מעדכנת את רשימת ההזמנות
  {  
    'OrderID'          : this.OrderID ,  
    "UserID"           : this.orderList[this.OrderPosition].UserID      , 
    "StartDate"        : this.orderList[this.OrderPosition].StartDate   ,
    'ReturnDate'       : this.orderList[this.OrderPosition].ReturnDate  ,
    'ActualReturnDate' : this.Today  ,                                    // מעדכנת את תאריך החזרה בפועל
    'PlateNumber'      : this.orderList[this.OrderPosition].PlateNumber , 
  }).subscribe(t => this.massege = t.json());
 
  alert("Car Has Been Returnd"); 
  window.location.reload();
} 
//#endregion
}


    
    