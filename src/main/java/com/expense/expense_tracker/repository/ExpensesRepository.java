package com.expense.expense_tracker.repository;

import com.expense.expense_tracker.entities.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpensesRepository extends JpaRepository<Expenses, Long> {
}
