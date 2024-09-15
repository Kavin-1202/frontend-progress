package com.capstone.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private String resourcelinks;
    private String otherlinks;
    private String outcomes;
}
