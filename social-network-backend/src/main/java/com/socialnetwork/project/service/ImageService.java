package com.socialnetwork.project.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String saveAvatar(MultipartFile file, Long userId);

    boolean updateAvatar(String filepath, MultipartFile file);

    boolean deleteAvatar(String filepath);
}
