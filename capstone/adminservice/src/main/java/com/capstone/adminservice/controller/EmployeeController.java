package com.capstone.adminservice.controller;

import com.capstone.adminservice.dto.EmployeeDTO;
import com.capstone.adminservice.dto.EmployeeResponse;
import com.capstone.adminservice.dto.EmployeeUserdto;
import com.capstone.adminservice.entity.Employee;
import com.capstone.adminservice.exceptions.ResourceNotFoundException;
import com.capstone.adminservice.service.EmployeeService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/employees")
@CrossOrigin(origins = "http://localhost:3000")
// Base URL for all endpoints in this controller
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Get all Employees
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    // Get an Employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    @GetMapping("/username")
    public ResponseEntity<EmployeeUserdto> getEmployeeByUsername(@RequestParam String username){
        EmployeeUserdto employee=employeeService.getEmployeeByUsername(username);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // Delete an Employee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeById(@PathVariable Long id) {
        employeeService.deleteEmployeeById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/addemployees")
    public ResponseEntity<String> addEmployees(@RequestBody List<String> emails){
        employeeService.addEmployees(emails);
        return ResponseEntity.ok("credentials sent successfully");
    }

    @GetMapping("/courses/{username}")
    public ResponseEntity<List<EmployeeResponse>> getCoursesAssignedToEmployeeByUsername(@PathVariable String username) {
        List<EmployeeResponse> courses = employeeService.getCoursesAssignedToEmployeeByUsername(username);
        if (courses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
    // New endpoint to start a course
//    @PutMapping("/start/{courseAssignmentId}/{username}")
//    public ResponseEntity<String> startCourse(@PathVariable Long courseAssignmentId, @PathVariable String username) {
//        try {
//            String response = employeeService.startCourse(courseAssignmentId, username);
//            return ResponseEntity.ok(response);
//        } catch (ResourceNotFoundException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        }
//    }
//    @PutMapping("/courses/{courseAssignmentId}/progress")
//    public String updateCourseProgress(
//            @PathVariable Long courseAssignmentId,
//            @RequestParam String username,
//            @RequestParam int progress) throws ResourceNotFoundException {
//        return employeeService.updateCourseProgress(courseAssignmentId, username, progress);
//    }

}


