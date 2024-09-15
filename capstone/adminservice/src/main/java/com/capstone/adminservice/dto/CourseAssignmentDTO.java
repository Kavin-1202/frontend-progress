package com.capstone.adminservice.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CourseAssignmentDTO {
    private Long courseid;
    private List<String> employeeUsernames; // Change from employeeIds to employeeUsernames
    private LocalDate deadline;

}
