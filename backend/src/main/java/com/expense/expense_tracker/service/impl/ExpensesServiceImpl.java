package com.expense.expense_tracker.service.impl;

import com.expense.expense_tracker.dto.AddExpenseDto;
import com.expense.expense_tracker.dto.UpdateExpenseDto;
import com.expense.expense_tracker.entities.Expenses;
import com.expense.expense_tracker.repository.ExpensesRepository;
import com.expense.expense_tracker.response.ExpensesResponse;
import com.expense.expense_tracker.response.ResponseMessageDto;
import com.expense.expense_tracker.service.ExpensesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ExpensesServiceImpl implements ExpensesService {

    @Autowired
    private final ExpensesRepository expensesRepository;

    public ExpensesServiceImpl(ExpensesRepository expensesRepository) {
        this.expensesRepository = expensesRepository;
    }

    @Override
    public List<ExpensesResponse> expensesList(){
        final List<Expenses> expenses = expensesRepository.findAll();

        return expenses.stream().map(expense -> ExpensesResponse.builder()
                .id(expense.getId())
                .transactionName(expense.getTransactionName())
                .category(expense.getCategory())
                .amount(expense.getAmount())
                .isExpense(expense.getIsExpense())
                .createdAt(expense.getCreatedAt())
                .build()).collect(Collectors.toList());
    }

    public ExpensesResponse createExpense(AddExpenseDto expense){
        Expenses newExpense = new Expenses();
        newExpense.setTransactionName(expense.getTransactionName());
        newExpense.setAmount(expense.getAmount());
        newExpense.setCategory(expense.getCategory());
        newExpense.setIsExpense(expense.getIsExpense());
        newExpense.setCreatedAt(new Date());

        Expenses createExpense = expensesRepository.save(newExpense);

        return ExpensesResponse.builder()
                .id(createExpense.getId())
                .transactionName(createExpense.getTransactionName())
                .amount(createExpense.getAmount())
                .isExpense(createExpense.getIsExpense())
                .category(createExpense.getCategory())
                .createdAt(createExpense.getCreatedAt())
                .build();

    }


    @Override
    public ResponseMessageDto updateExpense(UpdateExpenseDto updateExpenseDto, Long id) {

        Expenses expenseData = expensesRepository.findById(id).get();

        if(Objects.isNull(expenseData.getId()) ){
            return ResponseMessageDto.builder()
                    .status("Failed")
                    .message("Data not Found!")
                    .build();
        }

        if(Objects.nonNull(updateExpenseDto.getTransactionName()) && !"".equalsIgnoreCase((updateExpenseDto.getTransactionName()))){
            expenseData.setTransactionName(updateExpenseDto.getTransactionName());
        }

        if(Objects.nonNull(updateExpenseDto.getCategory()) && !"".equalsIgnoreCase((updateExpenseDto.getCategory()))){
            expenseData.setCategory(updateExpenseDto.getCategory());
        }

        if(Objects.nonNull(updateExpenseDto.getAmount()) ){
            expenseData.setAmount(updateExpenseDto.getAmount());
        }

        if(Objects.nonNull(updateExpenseDto.getIsExpense())){
            expenseData.setIsExpense(updateExpenseDto.getIsExpense());
        }

        Expenses createExpense = expensesRepository.save(expenseData);

        return ResponseMessageDto.builder()
                .status("Success")
                .message("Expense Have Been Updated")
                .data(createExpense)
                .build();
    }

    @Override
    public ResponseMessageDto deleteExpense(Long id) {

        Expenses expenseData = expensesRepository.findById(id).get();

        if(Objects.isNull(expenseData.getId()) ){
            return ResponseMessageDto.builder()
                    .status("Failed")
                    .message("Data not Found!")
                    .build();
        }

        expensesRepository.deleteById(id);
        return ResponseMessageDto.builder()
                .status("Success")
                .message("Expense Delete!")
                .build();
    }

}
