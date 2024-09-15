package com.capstone.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDetailDto {
    private Long courseid;
    private String coursename;
    private String description;
    private String resourcelinks;
    private String otherlinks;
    private String outcomes;
    private List<FeedbackDto> feedbacks;
}
