import { FormsModule } from '@angular/forms';
import { Http        } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe, getLocaleDateTimeFormat } from '@angular/common';


@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.css']
})
export class OrderEditorComponent   // רכיב עריכת הזמנות 
{ 
  //#region Variables Decleration
  orderList    : any[]; 
  ModelUnitList: any[];   
  selectedOrder: any  ;
  massege      : any  ;
  StartDate    : Date ;  
  ReturnDate   : Date ;
  Today        : Date ;  
  UserID       : number ;  
  PlateNumber  : number ; 
  OrderID      : number ;
  CarModel     : string ;  
  ActualReturnDate : Date ;  
  CarNotReturnd : boolean ;  
  ReturnChange  : boolean ;
  EditDeletStatus : string ; 
  //#endregion

  constructor(private http : Http) // השמת רשימות ההזמנות ויחידות הרכב במערכים
  { 
    this.http.get("http://localhost:51601/api/orders"    ).subscribe(t => this.orderList     = t.json());
    this.http.get("http://localhost:51601/api/modelunits").subscribe(t => this.ModelUnitList = t.json()); 
    this.Today = new Date();  
    this.EditDeletStatus = "Updated" ;
    
  }

  editLoader(id :number ) // פונקציה לטעינת הזמנה ספציפית 
  {   
    this.http.get("http://localhost:51601/api/orders/"+id).subscribe(t =>{ this.selectedOrder = t.json();
    this.OrderID         = this.selectedOrder.OrderID          ; 
    this.StartDate       = this.selectedOrder.StartDate        ;
    this.ReturnDate      = this.selectedOrder.ReturnDate       ;
    this.ActualReturnDate= this.selectedOrder.ActualReturnDate ;
    this.UserID          = this.selectedOrder.UserID           ; 
    this.PlateNumber     = this.selectedOrder.PlateNumber      ;  
     
    for (let i = 0; i < this.ModelUnitList.length; i++)  // מאתרת את יחידת הדגם הרלוונטית
  {  
    if(this.ModelUnitList[i].PlateNumber === this.PlateNumber) 
    { 
      this.CarModel = this.ModelUnitList[i].Manufactor +" "+ this.ModelUnitList[i].ModelName ;  // מזינה נתונים למשתנים
      this.CarNotReturnd = false ;
      this.ReturnChange  = false ;
       
      if(new Date(this.ActualReturnDate).toString() === new Date('0001-01-01T00:00:00').toString())
      { 
       this.CarNotReturnd = true ; // במידה והרכב לא הוחזר , השמת מידע במשתנה ע"מ להעלות הודעה בהתאם
      }
    }
  }
  }); 
  }   
   
  clearOrder()   // פונקציה לאיפוס השדות
  {
    this.CarModel         = null ;  
    this.StartDate        = null ; 
    this.ReturnDate       = null ;
    this.ActualReturnDate = null ; 
    this.OrderID          = null ;  
    this.UserID           = null ; 
    this.selectedOrder    = null ; 
    this.PlateNumber      = null ; 
    this.CarNotReturnd    = false ; 
    this.ReturnChange     = false ;
  }

  actualReturnChange() // פונקציה שמתבצעת בעת שינוי תאריך החזרה בפועל 
  { 
  this.ReturnChange = true ; // והשמת מידע במשתה ע" לתת אינדיקציה בהמשך
  }
   
  editOrder()      // פונקציה לעריכת ההזמנה
  {  
  if(this.OrderID){
   if(this.CarNotReturnd === false || this.ReturnChange === false ) // במידה ולא בוצע שינוי בתאריך ההחזרה בפועל
   {                                                               // והמכונית כבר הוחזרה 
    this.http.put("http://localhost:51601/api/orders/"+this.OrderID,  // עדכון ההזמנה מתבצע
    {  
      'OrderID'          : this.OrderID ,  
      "UserID"           : this.UserID , 
      "StartDate"        : this.StartDate  ,
      'ReturnDate'       : this.ReturnDate   ,
      'ActualReturnDate' : this.ActualReturnDate  ,
      'PlateNumber'      : this.PlateNumber, 
    }).subscribe(t => this.massege = t.json()); 
    alert("Order Has Been Updated !") 
    window.location.reload();
   } 
   else                      //  אם המכונית לא הוחזרה ובוצע שינוי בתאריך ההחזרה בפועל
   {                        // מועלת הודעה המיידעת את המנהל על כך ומבקשת את אישורו על כך שהרכב יוחזר אוטומטית
     var confirmReturn = confirm("Setting An Actual Return Date Will Return the Car ! \n And End This Order"); 
      
     if( confirmReturn === true ) // במידה והמנהל אישר
     { 
     this.returnCar()  // מתבצעת קריאה לפונקציית החזרת הרכב
     }
   }
  }
  }
 
  returnCar() // פונקציה להחזרת הרכב
  { 
    for (var i = 0; i < this.ModelUnitList.length; i++) // מתבצעת בדיקה על מערך יחידות הרכב
    { 
      if (this.PlateNumber === this.ModelUnitList[i].PlateNumber) // אם הרכב בהזמנה תואם לרכב ברשימת יחידות הרכב
      { 
        this.http.put("http://localhost:51601/api/modelunits/"+this.ModelUnitList[i].ModelID,  // מתבצע עדכון של הרכב
      {  
      'ModelID'        : this.ModelUnitList[i].ModelID ,  
      "Manufactor"     : this.ModelUnitList[i].Manufactor , 
      "ModelName"      : this.ModelUnitList[i].ModelName  ,
      'IsAvileable'    : "Yes" ,
      'OnRipair'       : this.ModelUnitList[i].OnRipair   ,
      'Mileage'        : this.ModelUnitList[i].Mileage    ,
      'PlateNumber'    : this.ModelUnitList[i].PlateNumber, 
      "Branch"         : this.ModelUnitList[i].Branch     , 
      "Photo"          : this.ModelUnitList[i].Photo 
       }).subscribe(t => this.massege = t.json());  
         
       this.CarNotReturnd = false  ;                 // מתבצע איפוס משתני העזר  
       this.ReturnChange  = false  ;                // 
       this.ActualReturnDate = this.Today ;        // מוגדר תאריך החזרה בפועל ליום הנוכחי
       this.editOrder();                          // מתבצעת קריאה לפונקציה לעריכת ההזמנה

      }
    }

  } 
   
  deletOrder( id : number ) // פונקציה למחיקת הזמנה
  {  
    var confirmDelet = confirm("Are Yoy Sure You Want To Delet This Order ?") // מבקשת אישור מהמנהל
    if(confirmDelet=== true) 
    {  
    this.EditDeletStatus = "Deleted" ;
    this.editLoader(id);                   // מתבצעת טעינת המידע של ההזמנה
    this.returnCar();                     // מתבצעת פונקציית החזרת הרכב ליתר בטחון 
    this.http.delete("http://localhost:51601/api/orders/" + id).subscribe(t => this.massege = t.json()); // ההזמנה נמחקת
    alert("Order Has Been Deleted !") 
    window.location.reload();
    }
  }

}
