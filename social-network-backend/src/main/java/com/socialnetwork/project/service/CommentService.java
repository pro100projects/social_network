package com.socialnetwork.project.service;

import com.socialnetwork.project.dto.UserCreateDTO;
import com.socialnetwork.project.dto.UserUpdateDTO;
import com.socialnetwork.project.entity.User;

public interface CommentService {

    User create(UserCreateDTO dto);

    User getById(Long userId);

    User update(UserUpdateDTO dto);

    User delete(Long userId);
}
