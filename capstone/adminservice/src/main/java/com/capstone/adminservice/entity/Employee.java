package com.capstone.adminservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long employeeid;

    private String username;

    private String email;

    private String password;

    private Roles role = Roles.EMPLOYEE;// Automatically set role to "employee"

    @JsonBackReference
    @ManyToMany(mappedBy = "employees")
    private List<CourseAssignment> courseAssignments;
    private Long feedbackid;

}

