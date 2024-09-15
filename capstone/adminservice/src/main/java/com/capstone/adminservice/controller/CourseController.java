package com.capstone.adminservice.controller;

import com.capstone.adminservice.dto.CourseDTO;
import com.capstone.adminservice.dto.FullResponse;
import com.capstone.adminservice.client.TrainingRequestDto;
import com.capstone.adminservice.client.TrainingResponse;
import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.exceptions.ResourceNotFoundException;
import com.capstone.adminservice.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/create/{requestid}")
    public ResponseEntity<Course> createCourse(@PathVariable Long requestid,@Valid @RequestBody CourseDTO courseDTO) throws ResourceNotFoundException {
        Course createdCourse = courseService.createCourse(requestid,courseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FullResponse> getCourseById(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<FullResponse> response = courseService.getCourseById(id);
        return response.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @GetMapping
    public ResponseEntity<List<FullResponse>> getAllCourses() {
        List<FullResponse> responses = courseService.getAllCourses();
        return ResponseEntity.ok(responses);
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<FullResponse> getCoursesByName(@PathVariable String name) throws ResourceNotFoundException {
        FullResponse course = courseService.getCoursesByName(name);
        return ResponseEntity.ok(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseDTO courseDTO) throws ResourceNotFoundException {
        Course updatedCourse = courseService.updateCourse(id, courseDTO);
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) throws ResourceNotFoundException {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("course removed successfully!");
    }
    @GetMapping("/dashboard")
    public ResponseEntity<List<TrainingResponse>> getRequests(){
        return ResponseEntity.ok(courseService.getRequests());
    }
    @GetMapping("/dashboard/view/{requestid}")
    public ResponseEntity<TrainingRequestDto> getRequestPlan(@PathVariable Long requestid){
        return ResponseEntity.ok(courseService.getRequest(requestid));
    }

}
