package com.capstone.UserManagementService.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;
    private String password;
    private Roles role;
    @Column(nullable = true)
    private  Long accountid;
    @Column(nullable = true)
    private String accountname;

    public enum Roles {
        MANAGER,
        ADMIN,
        EMPLOYEE
    }
}
