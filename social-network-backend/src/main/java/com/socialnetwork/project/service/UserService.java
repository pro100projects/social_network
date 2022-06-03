package com.socialnetwork.project.service;

import com.socialnetwork.project.dto.UserCreateDTO;
import com.socialnetwork.project.dto.UserDTO;
import com.socialnetwork.project.dto.UserUpdateDTO;
import com.socialnetwork.project.entity.User;
import com.socialnetwork.project.security.UserSecurity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    boolean create(UserCreateDTO dto);

    UserDTO getById(Long userId);

    UserDTO update(UserUpdateDTO dto);

    boolean delete(Long userId);

    String saveAvatar(MultipartFile file, Long userId);

    boolean updateAvatar(MultipartFile file, Long userId);

    boolean deleteAvatar(Long userId);

    List<UserDTO> searchChats(String search, UserSecurity userSecurity);

    User findByUsername(String username);

    User findByEmail(String email);

    User findByPhone(String phone);
}
