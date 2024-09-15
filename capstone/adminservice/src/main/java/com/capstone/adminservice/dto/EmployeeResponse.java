package com.capstone.adminservice.dto;

import com.capstone.adminservice.entity.Coursestatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {
    private String coursename;
    private String description;
    private String resourcelinks;
    private String otherlinks;
    private String outcomes;
    private LocalDate assignedDate;
    private LocalDate deadline;
    private Coursestatus coursestatus;
    private Long id;
}
