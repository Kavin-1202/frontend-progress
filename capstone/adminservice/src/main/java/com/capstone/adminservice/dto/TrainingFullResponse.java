package com.capstone.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.AccessType;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingFullResponse {

    private Long requestid;
    private String coursename;
    private String description;
    private String concepts;
    private String duration;
    private String employeeposition;
    // PENDING or COMPLETED
    private int requiredemployees;
    private String managername;
    private LocalDate createddate;
}
