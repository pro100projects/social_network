package com.socialnetwork.project.service.impl;

import com.socialnetwork.project.dto.UserCreateDTO;
import com.socialnetwork.project.dto.UserDTO;
import com.socialnetwork.project.dto.UserUpdateDTO;
import com.socialnetwork.project.entity.User;
import com.socialnetwork.project.entity.enums.Role;
import com.socialnetwork.project.mapper.UserMapper;
import com.socialnetwork.project.repository.UserRepository;
import com.socialnetwork.project.security.UserSecurity;
import com.socialnetwork.project.service.ImageService;
import com.socialnetwork.project.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final ImageService imageService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean create(UserCreateDTO dto) {
        if (findByUsername(dto.getUsername()) != null) {
            throw new BadCredentialsException("Username is already exists");
        }
        if (findByEmail(dto.getEmail()) != null) {
            throw new BadCredentialsException("Email is already exists");
        }
        if (findByPhone(dto.getPhone()) != null) {
            throw new BadCredentialsException("Phone is already exists");
        }
        User entity = userMapper.toEntity(dto);
        entity.setRoles(Set.of(Role.ROLE_USER));
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setEnabled(true);
        userRepository.save(entity);
        return true;
    }

    @Override
    public UserDTO getById(Long userId) {
        return userMapper.toUserDTO(
                userRepository.findById(userId).orElseThrow()
        );
    }

    @Override
    public UserDTO update(UserUpdateDTO dto) {
        User entity = userMapper.toEntity(dto);
        User user = userRepository.findById(entity.getId()).orElseThrow();

        if (!user.getUsername().equals(entity.getUsername()) && findByEmail(dto.getEmail()) != null) {
            throw new BadCredentialsException("Username is already exists");
        }
        if (!user.getEmail().equals(entity.getEmail()) && findByEmail(dto.getEmail()) != null) {
            throw new BadCredentialsException("Email is already exists");
        }
        if (!user.getPhone().equals(entity.getPhone()) && findByPhone(dto.getPhone()) != null) {
            throw new BadCredentialsException("Phone is already exists");
        }
        if (dto.getNewPassword() != null) {
            if (passwordEncoder.matches(user.getPassword(), entity.getPassword())) {
                entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
        }
        return userMapper.toUserDTO(
                userRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        entity.setEnabled(false);
        userRepository.save(entity);
        return true;
    }


    @Override
    public String saveAvatar(MultipartFile file, Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        String avatar = imageService.saveAvatar(file, userId);
        entity.setAvatar(avatar);
        userRepository.save(entity);
        return avatar;
    }

    @Override
    public boolean updateAvatar(MultipartFile file, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return imageService.updateAvatar(user.getAvatar(), file);
    }

    @Override
    public boolean deleteAvatar(Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        if (imageService.deleteAvatar(entity.getAvatar())) {
            entity.setAvatar(null);
            userRepository.save(entity);
            return true;
        }
        return false;
    }

    @Override
    public List<UserDTO> searchChats(String search, UserSecurity userSecurity) {
        List<User> users = userRepository.searchUsers(search.toLowerCase());
        if (userSecurity != null) {
            users = users.stream()
                    .filter(user -> user.getId() != userSecurity.getId())
                    .toList();
        }
        return userMapper.toUserDTO(
                users
        );
    }


    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone).orElse(null);
    }
}
