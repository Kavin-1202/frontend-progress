package com.capstone.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullResponse {
    Long requestid;
    Long courseid;
    String coursename;
    String description;
    String duration;
    String concepts;
    String resourcelinks;
    String otherlinks;
    String outcomes;
}
