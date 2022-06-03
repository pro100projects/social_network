package com.socialnetwork.project.controller;

import com.socialnetwork.project.dto.AuthenticationDTO;
import com.socialnetwork.project.dto.UserCreateDTO;
import com.socialnetwork.project.security.UserSecurity;
import com.socialnetwork.project.security.jwt.JwtProvider;
import com.socialnetwork.project.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthorizationController {

    private final UserService userService;

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/registration")
    public ResponseEntity registration(
            @Valid @RequestBody UserCreateDTO dto
    ) {
        userService.create(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @Valid @RequestBody AuthenticationDTO dto
    ) {
        UserSecurity user = (UserSecurity) authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()))
                .getPrincipal();

        return ResponseEntity.ok(Map.of("jwtToken", jwtProvider.generateToken(user)));
    }
}
