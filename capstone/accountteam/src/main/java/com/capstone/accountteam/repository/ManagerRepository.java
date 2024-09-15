package com.capstone.accountteam.repository;

import com.capstone.accountteam.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager,Long> {
    Manager findByUsername(String username);
}
