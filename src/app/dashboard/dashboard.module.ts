import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChangeAllowanceComponent } from './change-allowance/change-allowance.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';
import { HomeComponent } from './home/home.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ChangeAllowanceComponent,
    DepositFundsComponent,
    WithdrawMoneyComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
  ],
})
export class DashboardModule {}
