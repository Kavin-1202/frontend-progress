package com.capstone.adminservice.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseid;

    private Long requestid;

    @Column(columnDefinition = "VARCHAR(255)",unique = true)
    private String coursename;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String resourcelinks;

    @Column(columnDefinition = "TEXT")
    private String otherlinks;

    private String duration;

    private String concepts;

    @Column(columnDefinition = "TEXT")
    private String outcomes;

    @JsonManagedReference
    @OneToMany(mappedBy = "course")
    private List<CourseAssignment> courseAssignments;
    private Long feedbackid;
}
