import { Component } from '@angular/core';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SharedWallet';
  balance: string;
  allowance: string;

  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    this.web3Service.web3Enabled$.subscribe(async (value) => {
      if (value) {
        const res = await this.web3Service.isOwner();
        this.balance = await this.web3Service.getBalance();
        this.allowance = await this.web3Service.getAllowance(
          '0xB933602db77E3a3FAD29B46EA6e09a6CD545F25b'
        );
        console.log(this.allowance);
      }
    });
  }
}
