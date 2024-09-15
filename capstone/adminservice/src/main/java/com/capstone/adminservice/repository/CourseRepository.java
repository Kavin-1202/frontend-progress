package com.capstone.adminservice.repository;

import com.capstone.adminservice.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    Optional<Course> findByCoursenameIgnoreCase(String coursename);



}
