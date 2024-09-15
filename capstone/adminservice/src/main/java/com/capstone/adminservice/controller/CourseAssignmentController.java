package com.capstone.adminservice.controller;
import com.capstone.adminservice.dto.CourseAssignmentDTO;
import com.capstone.adminservice.dto.CourseStatusDTO;
import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.entity.CourseAssignment;
import com.capstone.adminservice.entity.Employee;
import com.capstone.adminservice.exceptions.ResourceNotFoundException;
import com.capstone.adminservice.service.CourseAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/assign")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseAssignmentController {

    @Autowired
    private CourseAssignmentService courseAssignmentService;

    @PostMapping
    public ResponseEntity<String> assignCourseToEmployees(@RequestBody CourseAssignmentDTO request) throws ResourceNotFoundException {
        courseAssignmentService.assignCourseToEmployees(request);
        return ResponseEntity.ok("Course assigned successfully");
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<String>> getAssignments(@PathVariable String name) throws ResourceNotFoundException {
        return ResponseEntity.ok(courseAssignmentService.getAssignments(name));
    }
//    // New endpoint to get course status of employees assigned to a particular course
//    @GetMapping("/status/{courseName}")
//    public ResponseEntity<List<CourseStatusDTO>> getCourseStatusByEmployee(@PathVariable String courseName) throws ResourceNotFoundException {
//        List<CourseStatusDTO> courseStatuses = courseAssignmentService.getCourseStatusByEmployee(courseName);
//        return ResponseEntity.ok(courseStatuses);
//    }
}