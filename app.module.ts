//#region Imports 
import { RouterModule } from '@angular/router';
import { SortCarsPipe        } from './sort-cars.pipe';
import { BrowserModule       } from '@angular/platform-browser';
import { NgModule            } from '@angular/core';
import { AppComponent        } from './app.component';
import { HomePageComponent   } from './home-page/home-page.component';
import { NavBarComponent     } from './nav-bar/nav-bar.component';
import { LogInComponent      } from './nav-bar/log-in/log-in.component';
import { SignUpComponent     } from './sign-up/sign-up.component';
import { CarsComponent       } from './cars/cars.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HttpModule          } from '@angular/http';
import { FormsModule         } from '@angular/forms';
import { routing             } from './app-routing.module';
import { EmployeeComponent   } from './employee/employee.component';
import { ManegerComponent    } from './maneger/maneger.component';
import { UserEditorComponent } from './maneger/user-editor/user-editor.component';
import { OrderEditorComponent} from './maneger/order-editor/order-editor.component';
import { CarEditorComponent  } from './maneger/car-editor/car-editor.component';   
import { Pipe, PipeTransform } from '@angular/core';
import { OrderSummeryComponent     } from './calculator/order-summery/order-summery.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';
import { UniquePipe } from './unique.pipe';
import { AgmCoreModule } from '@agm/core';
//#endregion



@NgModule({
  declarations: [
    AppComponent       , HomePageComponent   ,
    NavBarComponent    , LogInComponent      ,
    SignUpComponent    , CarsComponent       ,
    CalculatorComponent, SortCarsPipe        ,
    EmployeeComponent  , ManegerComponent    ,
    UserEditorComponent, OrderEditorComponent,
    CarEditorComponent , OrderSummeryComponent,
    UserOrderHistoryComponent, UniquePipe     ,
    

  ],
  imports: [
    BrowserModule ,
    routing,
    HttpModule,
    FormsModule,  
    RouterModule, 
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
