package com.capstone.adminservice.service;

import com.capstone.adminservice.dto.FeedbackDto;
import com.capstone.adminservice.entity.Course;
import com.capstone.adminservice.entity.Employee;
import com.capstone.adminservice.entity.Feedback;
import com.capstone.adminservice.repository.CourseRepository;
import com.capstone.adminservice.repository.EmployeeRepository;
import com.capstone.adminservice.repository.FeedbackRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class FeedbackService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<FeedbackDto> findFeedbacksByCourseId(Long courseid) {
        List<Feedback> feedbacks=feedbackRepository.findByCourseCourseid(courseid);
        List<FeedbackDto>dtos=new ArrayList<>();
        for(Feedback feedback:feedbacks){
            FeedbackDto dto=new FeedbackDto();
            dto.setFeedbackid(feedback.getFeedbackid());
            dto.setCourseid(feedback.getCourse().getCourseid());
            dto.setRating(feedback.getRating());
            dto.setComments(feedback.getComments());
            dto.setEmployeeid(feedback.getEmployee().getEmployeeid());
            dtos.add(dto);
        }
        return dtos;
    }
    @Transactional
    public FeedbackDto submitFeedback(FeedbackDto feedbackDTO) throws DataIntegrityViolationException {
        // Check if course and employee exist
        Course course = courseRepository.findById(feedbackDTO.getCourseid())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Employee employee = employeeRepository.findById(feedbackDTO.getEmployeeid())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if(employee.getFeedbackid()==null) {
            // Create a new feedback entry
            Feedback feedback = new Feedback();
            feedback.setComments(feedbackDTO.getComments());
            feedback.setRating(feedbackDTO.getRating());
            feedback.setCourse(course);
            feedback.setEmployee(employee);
            feedbackRepository.save(feedback);
            course.setFeedbackid(feedback.getFeedbackid());
            employee.setFeedbackid(feedback.getFeedbackid());
            employeeRepository.save(employee);
            courseRepository.save(course);
            // Save feedback
            Feedback savedFeedback = feedbackRepository.save(feedback);
            // Return saved feedback as DTO
            return new FeedbackDto(
                    savedFeedback.getFeedbackid(),
                    savedFeedback.getComments(),
                    savedFeedback.getRating(),
                    savedFeedback.getEmployee().getEmployeeid(),
                    savedFeedback.getCourse().getCourseid());
        }
        else{
            throw new DataIntegrityViolationException("Feedback already given");
        }
    }
}
