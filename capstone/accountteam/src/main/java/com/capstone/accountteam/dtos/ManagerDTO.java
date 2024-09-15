package com.capstone.accountteam.dtos;

import com.capstone.accountteam.entity.Roles;
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
    private Roles role=Roles.MANAGER;
}
