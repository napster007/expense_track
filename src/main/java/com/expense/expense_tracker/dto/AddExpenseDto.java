package com.expense.expense_tracker.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddExpenseDto {

    private String transactionName;
    private String category;
    private Float amount;
    private Boolean isExpense;

}
