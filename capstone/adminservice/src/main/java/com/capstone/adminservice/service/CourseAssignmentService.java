package com.capstone.adminservice.service;
import com.capstone.adminservice.dto.CourseAssignmentDTO;
import com.capstone.adminservice.dto.CourseStatusDTO;
import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.entity.CourseAssignment;
import com.capstone.adminservice.entity.Employee;
import com.capstone.adminservice.exceptions.ResourceNotFoundException;
import com.capstone.adminservice.repository.CourseAssignmentRepository;
import com.capstone.adminservice.repository.CourseRepository;
import com.capstone.adminservice.repository.EmployeeRepository;
import com.capstone.adminservice.utils.CourseAssignmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseAssignmentService {

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public CourseAssignment assignCourseToEmployees(CourseAssignmentDTO courseAssignmentDTO) throws ResourceNotFoundException {

        Long courseid = courseAssignmentDTO.getCourseid();
        List<String> employeeUsernames = courseAssignmentDTO.getEmployeeUsernames();
        LocalDate deadline = courseAssignmentDTO.getDeadline();

        Course course = courseRepository.findById(courseAssignmentDTO.getCourseid())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        List<Employee> employees = employeeRepository.findByUsernameIn(employeeUsernames);

        CourseAssignment courseAssignment = CourseAssignmentMapper.
                getCourseAssignment(course, employees, deadline);

        return courseAssignmentRepository.save(courseAssignment);
    }


    public List<String> getAssignments(String name) throws ResourceNotFoundException {

        Course course = courseRepository.findByCoursenameIgnoreCase(name)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        return courseAssignmentRepository.findEmployeesByCourseName(name);
    }
    // New method to get the course status of employees assigned to a particular course
//    public List<CourseStatusDTO> getCourseStatusByEmployee(String courseName) throws ResourceNotFoundException {
//        Course course = courseRepository.findByCoursenameIgnoreCase(courseName)
//                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
//
//        List<CourseAssignment> courseAssignments = courseAssignmentRepository.findByCourse(course);
//
//        if (courseAssignments.isEmpty()) {
//            throw new ResourceNotFoundException("No assignments found for the given course");
//        }
//
//        return courseAssignments.stream()
//                .flatMap(assignment -> assignment.getEmployees().stream()
//                        .map(employee -> new CourseStatusDTO(employee.getUsername(), assignment.getCoursestatus(),employee.getEmployeeid(),assignment.getProgress())))
//                .collect(Collectors.toList());
//    }
}