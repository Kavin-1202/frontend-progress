package com.capstone.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeUserdto {
    public Long employeeid;

    private String username;

    private String email;
}
