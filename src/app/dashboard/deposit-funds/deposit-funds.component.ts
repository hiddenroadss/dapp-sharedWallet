import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';

@Component({
  selector: 'app-deposit-funds',
  templateUrl: './deposit-funds.component.html',
  styleUrls: ['./deposit-funds.component.scss'],
})
export class DepositFundsComponent implements OnInit {
  depositAmount: string;

  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {}

  deposit() {
    this.web3Service.depositFunds(this.depositAmount);
  }
}
