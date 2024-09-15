package com.capstone.accountteam.entity;

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
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long managerid;
    private Long accountid;
    private String accountname;
    private String username;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private Roles role;

    @JsonManagedReference
    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingRequest> trainingRequests;
}
