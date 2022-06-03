package com.socialnetwork.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.socialnetwork.project.entity.enums.ForwardType;
import com.socialnetwork.project.entity.enums.MessageStatus;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "messages")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "id_seq",
            initialValue = 20,
            allocationSize = 1)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Chat.class)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @Column(name = "text")
    private String text;

    @Column(name = "photo")
    private String photo;

    @Column(name = "forward_id")
    private Long forwardId;

    @Enumerated(EnumType.STRING)
    @Column(name = "forward_type")
    private ForwardType forwardType;

    @Column(name = "is_updated", nullable = false)
    private boolean isUpdated;

    @CreationTimestamp
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column(name = "sent_at", nullable = false, updatable = false)
    private LocalDateTime sentAt;

    @Transient
    private MessageStatus messageStatus;

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER, targetEntity = User.class)
    @JoinTable(
            name = "read_messages",
            joinColumns = @JoinColumn(name = "message_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> readMessages = new HashSet<>();

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER, targetEntity = User.class)
    @JoinTable(
            name = "liked_messages",
            joinColumns = @JoinColumn(name = "message_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> likedMessages = new HashSet<>();
}
