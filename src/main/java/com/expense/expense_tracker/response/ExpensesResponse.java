package com.expense.expense_tracker.response;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpensesResponse {

    private Long id;
    private String transactionName;
    private String category;
    private Float amount;
    private Boolean isExpense;
    private Date createdAt;
}
