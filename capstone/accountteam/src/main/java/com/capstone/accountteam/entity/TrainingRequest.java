package com.capstone.accountteam.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestid;

    @Column(columnDefinition = "VARCHAR(255)", unique = true)
    private String coursename;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String concepts;

    @Column(columnDefinition = "VARCHAR(255)")
    private String duration;

    @Column(columnDefinition = "VARCHAR(255)")
    private String employeeposition;

    @Enumerated(EnumType.STRING)
    private Status status; // PENDING or COMPLETED

    @Column(columnDefinition = "DATE")
    private LocalDate createddate;

    private int requiredemployees;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managerid") // Foreign key column in the TrainingRequest table
    private Manager manager;
}
