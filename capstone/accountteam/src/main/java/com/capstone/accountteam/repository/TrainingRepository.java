package com.capstone.accountteam.repository;

import com.capstone.accountteam.entity.Manager;
import com.capstone.accountteam.entity.TrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<TrainingRequest, Long> {


    List<TrainingRequest> findByManagerUsername(String username);


}
