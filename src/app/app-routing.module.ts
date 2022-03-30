//#region Imports
import { ModuleWithProviders  } from '@angular/core';
import { HomePageComponent    } from './home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent        } from './cars/cars.component';
import { LogInComponent       } from './nav-bar/log-in/log-in.component';
import { CalculatorComponent  } from './calculator/calculator.component';
import { SignUpComponent      } from './/sign-up/sign-up.component';
import { EmployeeComponent    } from './employee/employee.component'; 
import { ManegerComponent     } from './maneger/maneger.component';  
import { UserEditorComponent  } from './maneger/user-editor/user-editor.component';   
import { OrderEditorComponent } from './maneger/order-editor/order-editor.component';
import { CarEditorComponent   } from './maneger/car-editor/car-editor.component';  
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component'; 
import { OrderSummeryComponent } from './calculator/order-summery/order-summery.component';
//#endregion
 
// השמת משתנה המכיל את נתיבי האתר
export const routes: Routes = [ 
  { path: '',   redirectTo: '/home', pathMatch: 'full'  },
  {path: 'home'       ,  component: HomePageComponent   },
  {path: 'cars'       ,  component: CarsComponent       },
  {path: 'logIn'      ,  component: LogInComponent      },
  {path: 'calculator' ,  component: CalculatorComponent },
  {path: 'signup'     ,  component: SignUpComponent     },
  {path: 'employee'   ,  component: EmployeeComponent   }, 
  {path: 'maneger'    ,  component: ManegerComponent    }, 
  {path: 'usereditor' ,  component: UserEditorComponent },
  {path: 'ordereditor',  component: OrderEditorComponent}, 
  {path: 'careditor'  ,  component: CarEditorComponent  },
  {path: 'userhistory',  component: UserOrderHistoryComponent },
  {path: 'ordersummery',  component: OrderSummeryComponent    },

];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
