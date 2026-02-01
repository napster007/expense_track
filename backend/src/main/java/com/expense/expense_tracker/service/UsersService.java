package com.expense.expense_tracker.service;

import com.expense.expense_tracker.dto.users.LoginDto;
import com.expense.expense_tracker.response.ResponseMessageDto;

public interface UsersService {

    ResponseMessageDto loginUser(LoginDto data);
}
