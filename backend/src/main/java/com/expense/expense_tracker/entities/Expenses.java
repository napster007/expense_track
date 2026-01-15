package com.expense.expense_tracker.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="expenses")
public class Expenses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="transactionName")
    private String transactionName;

    @Column(name="category")
    private String category;

    @Column(name="amount")
    private Float amount;

    @Column(name="isExpense")
    private Boolean isExpense;

    @Column(name="createdAt")
    private Date createdAt;

}

