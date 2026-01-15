package com.expense.expense_tracker.controller;

import com.expense.expense_tracker.dto.AddExpenseDto;
import com.expense.expense_tracker.dto.UpdateExpenseDto;
import com.expense.expense_tracker.response.ExpensesResponse;
import com.expense.expense_tracker.response.ResponseMessageDto;
import com.expense.expense_tracker.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ExpensesController {

    private static ExpensesService expensesService;

    @Autowired
    public ExpensesController(ExpensesService expensesService) {
        ExpensesController.expensesService = expensesService;
    }

    @GetMapping("/expenses")
    public static List<ExpensesResponse> hello(){

        return expensesService.expensesList();
    }

    @PostMapping("/expenses")
    public static ExpensesResponse createExpense( @RequestBody AddExpenseDto addExpenseDto) {

        return expensesService.createExpense(addExpenseDto);
    }

    @PutMapping("/expenses/{id}")
    public static ResponseMessageDto updateExpense(@RequestBody UpdateExpenseDto updateExpenseDto, @PathVariable("id") Long id) {

        return expensesService.updateExpense(updateExpenseDto, id);
    }

    @DeleteMapping("/expenses/{id}")
    public static ResponseMessageDto deleteExpense(@PathVariable("id") Long id) {

        return expensesService.deleteExpense(id);
    }
}

