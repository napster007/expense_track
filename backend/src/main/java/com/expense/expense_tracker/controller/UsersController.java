package com.expense.expense_tracker.controller;

import com.expense.expense_tracker.dto.users.LoginDto;
import com.expense.expense_tracker.response.ResponseMessageDto;
import com.expense.expense_tracker.response.users.LoginResponse;
import com.expense.expense_tracker.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/users")
public class UsersController {

    private static UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService){ UsersController.usersService = usersService;}

    @PostMapping("/login")
    public static ResponseMessageDto login(@RequestBody LoginDto data){
        System.out.println("UserData: " + data);
        return usersService.loginUser(data);
    }

}
