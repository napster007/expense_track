package com.expense.expense_tracker.controller;

import com.expense.expense_tracker.dto.expenses.AddExpenseDto;
import com.expense.expense_tracker.dto.expenses.UpdateExpenseDto;
import com.expense.expense_tracker.response.ExpensesResponse;
import com.expense.expense_tracker.response.ResponseMessageDto;
import com.expense.expense_tracker.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpensesController {

    private final ExpensesService expensesService;

    @Autowired
    public ExpensesController(ExpensesService expensesService) {
        this.expensesService = expensesService;
    }

    @GetMapping
    public List<ExpensesResponse> hello() {
        return expensesService.expensesList();
    }

    @GetMapping("/{id}")
    public ResponseMessageDto getExpenseById(@PathVariable("id") Long id) {
        return expensesService.expenseById(id);
    }

    @PostMapping
    public ExpensesResponse createExpense(@RequestBody AddExpenseDto addExpenseDto) {
        return expensesService.createExpense(addExpenseDto);
    }

    @PutMapping("/{id}")
    public ResponseMessageDto updateExpense(@RequestBody UpdateExpenseDto updateExpenseDto, @PathVariable("id") Long id) {
        return expensesService.updateExpense(updateExpenseDto, id);
    }

    @DeleteMapping("/{id}")
    public ResponseMessageDto deleteExpense(@PathVariable("id") Long id) {
        return expensesService.deleteExpense(id);
    }
}

