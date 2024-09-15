package com.capstone.adminservice.service;

import com.capstone.adminservice.client.Accountclient;
import com.capstone.adminservice.client.TrainingRequestDto;
import com.capstone.adminservice.client.TrainingResponse;
import com.capstone.adminservice.dto.*;
import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.client.Status;
import com.capstone.adminservice.exceptions.ResourceNotFoundException;
import com.capstone.adminservice.repository.CourseRepository;
import com.capstone.adminservice.utils.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final String courseNotFound = "Course not found with id: ";
    private final Accountclient accountclient;

    @Autowired
    public CourseService(CourseRepository courseRepository,Accountclient accountclient ) {
        this.courseRepository = courseRepository;
        this.accountclient=accountclient;
    }
    public Course createCourse(Long requestid,CourseDTO courseDTO) throws ResourceNotFoundException,DataIntegrityViolationException {
        try {
            // Fetch the training request details using Feign client
            TrainingRequestDto request = accountclient.getTrainingRequestsByRequestid(requestid).getBody();

            // Check if the request exists
            if (request == null) {
                throw new ResourceNotFoundException("Training Request not found for id: " + requestid);
            }

            // Check the status of the TrainingRequest
            // Proceed with course creation since the status is PENDING
            Course course = new Course();
            BeanUtils.copyProperties(request, course);
            BeanUtils.copyProperties(courseDTO, course);
            // Save the course
            Course savedCourse = courseRepository.save(course);
            // Update status of the TrainingRequest to COMPLETED
            accountclient.updateTrainingRequestStatus(requestid, Status.COMPLETED);
            return savedCourse;
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Course already exists");
        }
    }

    public Optional<FullResponse> getCourseById(Long id) throws ResourceNotFoundException {
        if (courseRepository.existsById(id))
            return courseRepository.findById(id).map(CourseMapper::toDTO);
        else
            throw new ResourceNotFoundException(courseNotFound + id);

    }

    public FullResponse getCoursesByName(String name) throws ResourceNotFoundException {
        Course course = courseRepository.findByCoursenameIgnoreCase(name).orElse(null);
        if(course==null)
            throw new ResourceNotFoundException(courseNotFound + name);
        FullResponse response=new FullResponse();
        BeanUtils.copyProperties(course,response);
        return  response;
    }

    public List<FullResponse> getAllCourses() {
        List<FullResponse> responses=new ArrayList<>();
        List<Course> courses=courseRepository.findAll();
        for(Course course:courses){
            FullResponse response=new FullResponse();
            BeanUtils.copyProperties(course,response);
            responses.add(response);
        }
        return responses;
    }

    public Course updateCourse(Long id, CourseDTO courseDTO) throws ResourceNotFoundException {
        Course course = courseRepository.findById(id).orElse(null);
        if(course==null){
            throw new ResourceNotFoundException("course not found");
        }
        if(courseDTO.getOtherlinks()!=null)
            course.setOtherlinks(courseDTO.getOtherlinks());

        if(courseDTO.getResourcelinks()!=null)
            course.setResourcelinks(courseDTO.getResourcelinks());

        if(courseDTO.getOutcomes()!=null)
            course.setOutcomes(courseDTO.getOutcomes());
        course = courseRepository.save(course);
        return course;


    }

    public void deleteCourse(Long id) throws ResourceNotFoundException {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
        } else {

            throw new ResourceNotFoundException(courseNotFound + id);
        }
    }
    public List<TrainingResponse> getRequests(){
        return accountclient.getAllTrainingRequests().getBody();
    }
    public TrainingRequestDto getRequest(Long requestid){
        TrainingRequestDto request =  accountclient.getTrainingRequestsByRequestid(requestid).getBody();
//        TrainingFullResponse trainingFullResponse  =  new TrainingFullResponse();
//
//        trainingFullResponse.setRequestid(request.getRequestid());
//        trainingFullResponse.setConcepts(request.getConcepts());
//        trainingFullResponse.setCoursename(request.getCoursename());
//        trainingFullResponse.setConcepts(request.getConcepts());
//        trainingFullResponse.setManagername(request.getManagername());
//        trainingFullResponse.setEmployeeposition(request.getEmployeeposition());
//        trainingFullResponse.setDescription(request.getDescription());
//        trainingFullResponse.setRequiredemployees(request.getRequiredemployees());
        return request;
    }


}






