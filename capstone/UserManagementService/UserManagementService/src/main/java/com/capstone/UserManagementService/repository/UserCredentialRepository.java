package com.capstone.UserManagementService.repository;

import com.capstone.UserManagementService.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialRepository extends JpaRepository<UserCredential, Long> {

   Optional<UserCredential>  findByUsername(String name);
}

