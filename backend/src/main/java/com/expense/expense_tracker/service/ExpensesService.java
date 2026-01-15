package com.expense.expense_tracker.service;

import com.expense.expense_tracker.dto.AddExpenseDto;
import com.expense.expense_tracker.dto.UpdateExpenseDto;
import com.expense.expense_tracker.response.ExpensesResponse;
import com.expense.expense_tracker.response.ResponseMessageDto;

import java.util.List;

public interface ExpensesService {

    //add Expense
    ExpensesResponse createExpense(AddExpenseDto expense);

    //expense list
    List<ExpensesResponse> expensesList();

    //Update expense
    ResponseMessageDto updateExpense(UpdateExpenseDto updateExpenseDto, Long id);

    //delete expense

    ResponseMessageDto deleteExpense(Long id);

}
