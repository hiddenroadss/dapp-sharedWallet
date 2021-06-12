import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils/types/index';

import * as SharedWallet from '../../build/contracts/SharedWallet.json';

declare let window: any;

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3;
  web3Enabled$: BehaviorSubject<boolean>;
  contractAddress = '0x24b37176cb258bb2bB9f50D0bDd38f7333f69D8D';
  contractAbi = SharedWallet.abi as AbiItem[];

  currentAccount: string;

  constructor() {
    this.enableWeb3();
    this.web3Enabled$ = new BehaviorSubject(false);
  }

  async enableWeb3() {
    if (typeof window.ethereum !== undefined) {
      this.connectMetaMask();
    } else {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545')
      );
      this.web3Enabled$.next(true);
    }
  }

  async connectMetaMask() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
      } catch (err) {
        this.web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:7545')
        );
        this.web3Enabled$.next(true);
        return;
      }
      window.web3 = new Web3(window.ethereum);
      this.web3 = window.web3;
      this.web3Enabled$.next(true);
    }
  }

  async isOwner() {
    const contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
    return await contract.methods.isOwner().call();
  }

  async depositFunds(value: string) {
    const accounts = await this.web3.eth.getAccounts();
    try {
      const response = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: this.contractAddress,
            value: this.web3.utils.toHex(this.web3.utils.toWei(value, 'ether')),
          },
        ],
      });
    } catch (err) {}
  }

  async withdrawFunds(value: string) {
    const accounts = await this.web3.eth.getAccounts();
    const contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
    const amount = this.web3.utils.toHex(this.web3.utils.toWei(value));
    try {
      await contract.methods.withdrawMoney(accounts[0], amount).send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
    }
  }

  async changeAllowance(address: string, amount: string) {
    const accounts = await this.web3.eth.getAccounts();
    const contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
    return await contract.methods
      .changeAllowance('0xB933602db77E3a3FAD29B46EA6e09a6CD545F25b', 100000)
      .send({
        from: accounts[0],
      });
  }

  async getBalance() {
    const accounts = await this.web3.eth.getAccounts();
    const contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
    const balance = await contract.methods.getBalance().call();
    return this.web3.utils.fromWei(balance, 'ether');
  }

  async getAllowance(address: string) {
    const accounts = await this.web3.eth.getAccounts();
    const contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
    return await contract.methods.allowance(address).call();
  }
}
