import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { EXPENSES } from '../expenses-mock';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenses = EXPENSES;

  constructor() { }

  ngOnInit() {
  }

  get sortData() {
    return this.expenses.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

}
