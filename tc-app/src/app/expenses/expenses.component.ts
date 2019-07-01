import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { EXPENSES } from '../expenses-mock';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenses = EXPENSES;
  show = false;
  addExpenseForm: FormGroup;

  now = new Date();
  today = '';

  constructor(private fb: FormBuilder) {
    this.today = formatDate(this.now, 'yyyy-MM-dd', 'en-US', '');
    this.createForm();
  }

  createForm() {
    this.addExpenseForm = this.fb.group({
      expenseDate: this.today,
      expenseAmount: ['', Validators.required ],
      expenseConcept: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  toggleForm() {
    this.show = !this.show;

    if (this.show) {
      this.createForm();
    } else {
      this.addExpenseForm.reset();
    }
  }

  cancel() {
    this.toggleForm();
  }

  get sortData() {
    return this.expenses.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  get expConcept() { return this.addExpenseForm.get('expenseConcept'); }
  get expAmount() { return this.addExpenseForm.get('expenseAmount'); }
  get expDate() { return this.addExpenseForm.get('expenseDate'); }

  onSubmit() {
    if (this.addExpenseForm.invalid) {
      return alert('Algo ha ido mal...');
    } else {
      const newAmount: any = [{
          name: this.expConcept.value,
          money: this.expAmount.value,
          date: this.expDate.value || this.today
      }];

      this.sortData.push(newAmount[0]);

      this.toggleForm();
    }
  }

}
