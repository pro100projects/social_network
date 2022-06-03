package com.socialnetwork.project.service.impl;

import com.socialnetwork.project.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private final String avatarsFilepath;
    private final String messagesFilepath;

    public ImageServiceImpl() {
        try {
            avatarsFilepath = ResourceUtils.getFile("classpath:").getPath() + "/static/files/avatars/";
            File avatarsDirectory = new File(avatarsFilepath);
            if (!avatarsDirectory.exists()) {
                Files.createDirectories(avatarsDirectory.toPath());
            }

            messagesFilepath = ResourceUtils.getFile("classpath:").getPath() + "/static/files/messages/";
            File messagesDirectory = new File(avatarsFilepath);
            if (!messagesDirectory.exists()) {
                Files.createDirectories(messagesDirectory.toPath());
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String saveAvatar(MultipartFile file, Long userId) {
        try {
            File avatar = new File(avatarsFilepath + userId.toString() + file.getOriginalFilename());
            if (!avatar.exists()) {
                avatar.createNewFile();
            }
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(avatar));
            bos.write(file.getBytes());
            bos.flush();
            bos.close();
            return userId.toString() + file.getOriginalFilename();
        } catch (IOException e) {
            return null;
        }
    }

    @Override
    public boolean updateAvatar(String filename, MultipartFile file) {
        try {
            File avatar = new File(avatarsFilepath + filename);
            if (!avatar.exists()) {
                avatar.createNewFile();
            }
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(avatar));
            bos.write(file.getBytes());
            bos.flush();
            bos.close();
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    @Override
    public boolean deleteAvatar(String filename) {
        File avatar = new File(avatarsFilepath + filename);
        if (avatar.exists()) {
            return avatar.delete();
        }
        return false;
    }
}
