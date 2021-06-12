import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.scss'],
})
export class WithdrawMoneyComponent implements OnInit {
  amountToWithdraw: string;

  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {}

  async withdraw() {
    const res = await this.web3Service.withdrawFunds(this.amountToWithdraw);
    console.log(res);
  }
}
