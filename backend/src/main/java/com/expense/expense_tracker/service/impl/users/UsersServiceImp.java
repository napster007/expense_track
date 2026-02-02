package com.expense.expense_tracker.service.impl.users;

import com.expense.expense_tracker.dto.users.LoginDto;
import com.expense.expense_tracker.entities.UsersEntity;
import com.expense.expense_tracker.repository.users.UsersRepository;
import com.expense.expense_tracker.response.ResponseMessageDto;
import com.expense.expense_tracker.security.JwtUtil;
import com.expense.expense_tracker.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;


@Service
@Slf4j
public class UsersServiceImp implements UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public UsersServiceImp(UsersRepository usersRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    @Override
    public ResponseMessageDto loginUser(LoginDto data) {

        Optional<UsersEntity> optionalUser = usersRepository.findByUsername(data.getEmail());

        try {
            if (optionalUser.isEmpty()) {
                return ResponseMessageDto.builder()
                        .status("Error")
                        .message("Invalid credentials- username")
                        .build();
            }
            UsersEntity user = optionalUser.get();

            // Compare raw incoming password against stored hashed password (do NOT re-encode)
            if (!passwordEncoder.matches(data.getPassword(), user.getPassword())) {
                return ResponseMessageDto.builder()
                        .status("Error")
                        .message("Invalid credentials")
                        .build();
            }

            // Clear sensitive data before returning
            user.setPassword("");

            String token = jwtUtil.generateToken(user.getUsername());

            return ResponseMessageDto.builder()
                    .status("Success")
                    .message("Authorized")
                    .data(Map.of("user", user, "token", token))
                    .build();

        } catch (Error e) {

            return ResponseMessageDto.builder()
                    .status("Error")
                    .message("Internal server error")
                    .build();
        }
    }

}
