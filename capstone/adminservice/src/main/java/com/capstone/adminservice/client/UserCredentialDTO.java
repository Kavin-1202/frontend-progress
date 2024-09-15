package com.capstone.adminservice.client;

import com.capstone.adminservice.entity.Roles;
import lombok.Data;

@Data
public class UserCredentialDTO {
    private  Long id;
    private String username;
    private String email;
    private String password;
    private Roles role;
    private  Long accountid;
    private String accountname;
}
