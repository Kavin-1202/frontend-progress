package com.capstone.adminservice.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingResponse {
    private Long requestid;
    private Long accountid;
    private String managername;
    private String coursename;
    private Status status; // PENDING or COMPLETED
    private LocalDate createddate;
}
