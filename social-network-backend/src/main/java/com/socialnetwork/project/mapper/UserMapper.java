package com.socialnetwork.project.mapper;

import com.socialnetwork.project.dto.UserCreateDTO;
import com.socialnetwork.project.dto.UserDTO;
import com.socialnetwork.project.dto.UserUpdateDTO;
import com.socialnetwork.project.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    User toEntity(UserCreateDTO userDTO);

    User toEntity(UserUpdateDTO userDTO);

    UserDTO toUserDTO(User user);
    List<UserDTO> toUserDTO(List<User> users);
}
