import { photoSrting } from './../../sign-up/photo.class';
import { FormsModule } from '@angular/forms';
import { Http        } from '@angular/http';
import { Component, OnInit   } from '@angular/core';  
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe            } from '@angular/common'; 
import { $                   } from 'protractor';



@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent   // מחלקת עריכת משתמשים
{ 
//#region Variables Declerations
 UserList     : any []   ; 
 selectedUser : any      ;  
 massege      : any      ;   
 FirstName    : any      ; 
 LastName     : any      ; 
 UserName     : any      ; 
 Password     : any      ; 
 Email        : any      ;
 Gender       : any      ; 
 BirthDate    : any      ;  
 Photo        : any      ; 
 selectedFile : any      ; 
 upload       : any      ;
 response     : any      ;
 errorId      : boolean  ; 
 userID       : number   ; 
 Position     : string   ; 
 addUser      : boolean = false ;
 PhotoClass   : photoSrting     ; 
 //#endregion
  
  constructor(private http : Http)  //  קבלה והשמה של רשימת המשתמשים ע"מ לבדוק תקינות ת.ז
  {  
    this.http.get("http://localhost:51601/api/users").subscribe(t => this.UserList = t.json()); 
    this.errorId = false ;
  }   
 
  //#region Buttons Functions
  addOption()                   // כפתור "מצב"להוספת משתמש 
  { 
    this.addUser = !this.addUser ; 
    this.clearUser()
  }  

  genderButton(gender:string)  // כפתור לבחירת מין המשתמש
  { 
    this.Gender = gender;
  }  

  poitionButton(position :string) //  כפתור לבחירת תפקיד המשתמש
  { 
    this.Position = position;
  }
  //#endregion

  //#region CheckID Function
  checkID()                    // פונקציה לבדיקת ת.ז 
  {  
    this.errorId = false ; 

   if(isNaN(this.userID)===false && (this.userID >100)) // בדיקה שהת.ז מספר תקין
   {
   for (var i = 0; i < this.UserList.length; i++) 
   { 
     if (this.userID == this.UserList[i].UserID)    // בדיקה שהת.ז לא קיימת כבר במסד הנתונים
     { 
       this.errorId= true ;
     }  
   } 
  } 
  else 
   { 
     this.errorId = true ;
   }  
  } 
  //#endregion
    
  //#region Defult Fields Function
  checkDefultFields() // פונקציה שמבצעת בדיקה של השדות בעת הוספת משתמש
  {                  // במידה ושדה לא מוגדר , הפונקציה מזינה ערכי ברירת מחדל
    if( this.userID    === null) 
    {                                           // בתוך הפונקציה יש פונקציה נוספת שמבצעת השמה של ת.ז ברירת מחדל תקינה
      this.userID = this.UserList.length + 100 ;
      this.checkID()  ; 
      if(this.errorId ){ while (this.errorId) {this.userID ++ ; this.checkID();}} 
    }; 
    if( this.FirstName === null){this.FirstName='defult'}; 
    if( this.LastName  === null){this.LastName ='defult'}; 
    if( this.UserName  === null){this.UserName ='defult'}; 
    if( this.Gender    === null){this.Gender   ='Male'  }; 
    if( this.Position  === null){this.Position ='user'  };
    if( this.Password  === null){this.Password ='11111' }; 
    if( this.BirthDate === null){this.BirthDate=new Date()};
    if( this.Email     === null){this.Email='israel@israeli.com'}; 
  } 
  //#endregion
    
  //#region Edit User Function
  editUser()  // פונקציה לעריכת משתמש
  {  
    this.http.put("http://localhost:51601/api/users/"+this.selectedUser.UserID,  
    {  
      'UserID'    : this.userID    , 
      'FirstName' : this.FirstName ,
      'LastName'  : this.LastName  ,
      'UserName'  : this.UserName  ,
      'Password'  : this.Password  ,
      'Email'     : this.Email     ,
      'BirthDate' : this.BirthDate ,
      'Gender'    : this.Gender    ,
      'Position'  : this.Position  , 
      'Photo'     : ""

    }).subscribe(t => this.massege = t.json());    
    window.location.reload();  
    alert("User Has Been Updated") 

    if (this.PhotoClass.stringValue)                  // במידה קיימת תמונה
    { 
    this.http.post("http://localhost:51601/api/Photo", 
    {Photo:this.PhotoClass.stringValue, 
    "photoID":this.userID }) 
    .subscribe( t =>this.response=t.json()); 
    }
  } 
  //#endregion
   
  //#region Clear Fields
  clearUser() //פונקציה לאיפוס השדות 
  {  
    this.selectedUser = null    ;
    this.userID       = null    ; 
    this.FirstName    = null    ;
    this.LastName     = null    ;
    this.UserName     = null    ;
    this.Password     = null    ;
    this.Email        = null    ; 
    this.BirthDate    = null    ; 
    this.Gender       = null    ;   
    this.Position     = null    ;
  } 
  //#endregion
   
  //#region Edit User Loader Function
  editLoader(id :number) // פונקציה שמבצעת טעינה של השדות בעת בחירת משתמש לעריכה
  {  
    this.addUser =false ;
    this.http.get("http://localhost:51601/api/users/"+id).subscribe(t =>{ this.selectedUser = t.json();
    this.userID    = this.selectedUser.UserID    ; 
    this.FirstName = this.selectedUser.FirstName ;
    this.LastName  = this.selectedUser.LastName  ;
    this.UserName  = this.selectedUser.UserName  ;
    this.Password  = this.selectedUser.Password  ;
    this.Email     = this.selectedUser.Email     ; 
    this.BirthDate = this.selectedUser.BirthDate ; 
    this.Gender    = this.selectedUser.Gender    ;  
    this.Position  = this.selectedUser.Position  ; });
  }  
  //#endregion
 
  //#region Delet User Function
  deletUser(id , position) // פונקציה שמבצעת מחיקת משתמש
  {  
    if(position ==="maneger") // במידה והמשתמש מנהל אין אפשרות למחוק
    { 
      alert("Delet Maneger Not Allowed") ;
    } 
    else 
    { 
      var confirmation = confirm("Are You sure You Want To Delet This "+ position); 
       
      if(confirmation ===true)
      { 
        this.http.delete("http://localhost:51601/api/users/"+id).subscribe(); 
        alert(position +" Has been deleted") ; 
        window.location.reload();
      }
    }
  }  
  //#endregion
 
  //#region Submit New User Function
  submitNewUser () // רישום משתמש במסד הנתונים 
 {  
    this.checkDefultFields();                                        // מבצע בדיקה של שדות ריקים והשמה של
                                                                    // ערכי ברירת מחדל בשדות ריקים
   this.http.post("http://localhost:51601/api/users", 
   {"UserID"   :this.userID   , "FirstName":this.FirstName,
    "LastName" :this.LastName  , "UserName" :this.UserName, 
    "Password" :this.Password  , "Email"    :this.Email, 
    "BirthDate":this.BirthDate , "Position" :this.Position,
    "Gender"   :this.Gender    , "Photo":'' }) 
    .subscribe(t=>{console.log();
      window.location.reload() ;
      alert("User Has Been Added");
    });
     
    if (this.PhotoClass.stringValue)                                  // במידה והמשתמש העלה תמונה
    {                                                                 // העלאת התמונה לשרת 
    this.http.post("http://localhost:51601/api/Photo", 
    {Photo:this.PhotoClass.stringValue, 
    "photoID":this.userID}) 
    .subscribe( t =>this.response=t.json()); 
    } 
 }   
 //#endregion
   
 //#region  Photo event Handler And Converting Function
 picload(event) // פונקציה שמבצעת המרה של תמונה למחרוזת
  { 
   
   this.selectedFile= event.target.files[0] ; 
   this.uploadImage(this.selectedFile) ;
  }
  uploadImage(file) 
  { 
    this.PhotoClass=new photoSrting();
    let support:photoSrting=this.PhotoClass;

    var reader = new FileReader(); 
    reader.readAsDataURL(file); 
    this.upload=reader.result; 
    reader.onload = function(){ 
    support.stringValue=reader.result;
    console.log(reader.result);
    }; 
     reader.onerror=function(error){ 
       console.log("ERROR",error);
     };
  }  
  //#endregion
}
