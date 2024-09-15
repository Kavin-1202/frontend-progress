package com.capstone.adminservice.repository;

import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.entity.CourseAssignment;
import com.capstone.adminservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment,Long> {

    @Query("SELECT e.username FROM CourseAssignment ca " +
            "JOIN ca.course c " +
            "JOIN ca.employees e " +
            "WHERE c.coursename = ?1")
    List<String> findEmployeesByCourseName(String coursename);
    // Custom query to get courses assigned to a specific employee by username
    // Query to fetch courses assigned to an employee by username
    @Query("SELECT ca FROM CourseAssignment ca " +
            "JOIN ca.course c " +
            "JOIN ca.employees e " +
            "WHERE e.username = ?1")
    List<CourseAssignment> findCourseAssignmentsByEmployeeUsername(String username);

    List<CourseAssignment> findByCourse(Course course);
}
