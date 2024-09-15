package com.capstone.accountteam.feign;

import com.capstone.accountteam.entity.Roles;
import lombok.Data;

@Data
public class UserCredentialDTO {
    private String username;
    private String email;
    private String password;
    private Roles role = Roles.MANAGER;
}
