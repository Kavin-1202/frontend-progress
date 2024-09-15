package com.capstone.adminservice.dto;

import com.capstone.adminservice.entity.Coursestatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseStatusDTO {
    private String username;
    private Coursestatus courseStatus;
    private Long employeeid;
    private float progress;
}
