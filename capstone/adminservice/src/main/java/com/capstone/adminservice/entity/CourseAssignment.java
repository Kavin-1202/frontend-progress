package com.capstone.adminservice.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class CourseAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "courseid")
    private Course course;

    @JsonManagedReference
    @ManyToMany
    @JoinTable(
            name = "course_assignment_employee",
            joinColumns = @JoinColumn(name = "course_assignment_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Employee> employees;
    private LocalDate assignedDate;
    private LocalDate deadline;
//    private Coursestatus Coursestatus;
//    @Column(nullable = false)
//    private float progress;
}

