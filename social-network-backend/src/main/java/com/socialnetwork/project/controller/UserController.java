package com.socialnetwork.project.controller;

import com.socialnetwork.project.annotation.CurrentUser;
import com.socialnetwork.project.dto.UserDTO;
import com.socialnetwork.project.dto.UserUpdateDTO;
import com.socialnetwork.project.security.UserSecurity;
import com.socialnetwork.project.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("user")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;

    @GetMapping("/search")
    public List<UserDTO> searchUsers(
            @RequestParam("search") String search,
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.searchChats(search, userSecurity);
    }

    @GetMapping("profile")
    public UserDTO profile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getById(userSecurity.getId());
    }

    @PutMapping("profile")
    public UserDTO updateProfile(
            @Valid @RequestBody UserUpdateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setId(userSecurity.getId());
        return userService.update(dto);
    }

    @DeleteMapping("profile")
    public boolean deleteProfile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.delete(userSecurity.getId());
    }

    @PostMapping("avatar")
    public String setAvatar(
            @RequestParam("file") MultipartFile file,
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.saveAvatar(file, userSecurity.getId());
    }

    @PutMapping("avatar")
    public boolean updateAvatar(
            @RequestParam("file") MultipartFile file,
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.updateAvatar(file, userSecurity.getId());
    }

    @DeleteMapping("avatar")
    public boolean deleteAvatar(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.deleteAvatar(userSecurity.getId());
    }
}
