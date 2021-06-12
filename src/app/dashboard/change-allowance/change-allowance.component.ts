import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';

@Component({
  selector: 'app-change-allowance',
  templateUrl: './change-allowance.component.html',
  styleUrls: ['./change-allowance.component.scss'],
})
export class ChangeAllowanceComponent implements OnInit {
  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {}

  changeAllowance() {
    this.web3Service.changeAllowance('', '');
  }
}
