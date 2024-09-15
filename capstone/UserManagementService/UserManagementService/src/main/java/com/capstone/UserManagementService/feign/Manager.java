package com.capstone.UserManagementService.feign;


import com.capstone.UserManagementService.entity.UserCredential;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class Manager {
    private Long managerid;
    private Long accountid;
    private String accountname;
    private String username;
    private String password;
    private String email;
    private UserCredential.Roles role;

}
