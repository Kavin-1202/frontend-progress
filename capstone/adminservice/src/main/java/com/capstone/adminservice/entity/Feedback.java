package com.capstone.adminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackid;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private Integer rating; // Feedback rating (e.g., 1-5)

    @ManyToOne
    @JoinColumn(name = "courseid", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "employeeid", nullable = false)
    private Employee employee;
}
