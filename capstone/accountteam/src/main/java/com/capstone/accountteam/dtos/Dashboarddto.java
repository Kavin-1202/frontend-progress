package com.capstone.accountteam.dtos;

import com.capstone.accountteam.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dashboarddto {
    private Long requestid;
    private String coursename;
    private String employeeposition;
    private Status status; // PENDING or COMPLETED
    private LocalDate createddate;
}
