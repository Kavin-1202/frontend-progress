package com.capstone.accountteam.dtos;

import com.capstone.accountteam.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingRequestDto {
    private  Long requestid;
    private Long accountid; // Changed to Long to match typical ID type
    private String managername;
    private String coursename;
    private String description;
    private String concepts;
    private String duration;
    private String employeeposition;
    private int requiredemployees;
    private Status status;


}
