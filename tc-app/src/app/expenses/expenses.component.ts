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

  get sortData() {
    return this.expenses.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
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

  onSubmit(customerData) {
    if (this.addExpenseForm.valid) {
      console.log('Your amount has been added!! :)', customerData);
      this.toggleForm();
    }
  }
}
