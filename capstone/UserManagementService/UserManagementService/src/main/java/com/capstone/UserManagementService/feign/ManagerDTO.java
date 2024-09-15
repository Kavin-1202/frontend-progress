package com.capstone.UserManagementService.feign;


import com.capstone.UserManagementService.entity.UserCredential;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class ManagerDTO {
    private Long accountid;
    private String accountname;
    private String username;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private UserCredential.Roles role= UserCredential.Roles.MANAGER;
}