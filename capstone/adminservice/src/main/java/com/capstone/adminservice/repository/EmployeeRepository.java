package com.capstone.adminservice.repository;


import com.capstone.adminservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    Employee findByUsername(String username);

    List<Employee> findByUsernameIn(List<String> employeeUsernames);
}
