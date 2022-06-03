package com.socialnetwork.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.socialnetwork.project.entity.enums.Role;
import com.socialnetwork.project.entity.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "id_seq",
            initialValue = 20,
            allocationSize = 1)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex", nullable = false)
    private Sex sex;

    @Column(name = "password", nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Set<Role> roles = new HashSet<>();

    @Column(name = "enabled", nullable = false)
    private boolean enabled;


    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Profile.class)
    private Profile profile;


    @ManyToMany(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinTable(
            name = "subscriptions",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id")
    )
    private Set<User> subscriptions = new HashSet<>();

    @ManyToMany(mappedBy = "subscriptions", fetch = FetchType.LAZY, targetEntity = User.class)
    private Set<User> readers = new HashSet<>();


    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Post.class)
    private Set<Post> posts = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "likedPosts", fetch = FetchType.LAZY, targetEntity = Post.class)
    private Set<Post> likedPosts = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Comment.class)
    private Set<Comment> comments = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "likedComments", fetch = FetchType.LAZY, targetEntity = Comment.class)
    private Set<Comment> likedComments = new HashSet<>();


    @JsonIgnore
    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY, targetEntity = Chat.class)
    private Set<Chat> chats = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Message.class)
    private Set<Message> messages = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "readMessages", fetch = FetchType.LAZY, targetEntity = Message.class)
    private Set<Message> readMessages = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "likedMessages", fetch = FetchType.LAZY, targetEntity = Message.class)
    private Set<Message> likedMessages = new HashSet<>();
}


