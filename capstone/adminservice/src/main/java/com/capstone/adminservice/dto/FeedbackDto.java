package com.capstone.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {
    private Long feedbackid;
    private String comments;
    private Integer rating;
    private Long courseid;
    private Long employeeid;
}
