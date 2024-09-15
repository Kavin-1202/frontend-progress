package com.capstone.adminservice.utils;

import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.entity.CourseAssignment;
import com.capstone.adminservice.entity.Coursestatus;
import com.capstone.adminservice.entity.Employee;

import java.time.LocalDate;
import java.util.List;

public class CourseAssignmentMapper {

    public static CourseAssignment getCourseAssignment(Course course, List<Employee> employees, LocalDate deadline) {
        CourseAssignment courseAssignment = new CourseAssignment();
        courseAssignment.setCourse(course);
        courseAssignment.setEmployees(employees);
        //courseAssignment.setCoursestatus(Coursestatus.ASSIGNED);
        courseAssignment.setAssignedDate(LocalDate.now());
        courseAssignment.setDeadline(deadline);
        return courseAssignment;
    }
}
