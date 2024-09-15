package com.capstone.adminservice.controller;

import com.capstone.adminservice.dto.FeedbackDto;
import com.capstone.adminservice.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/feedbacks")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    // Get feedbacks by course ID
    @GetMapping("/course/{courseid}")
    public List<FeedbackDto> findFeedbacksByCourseId(@PathVariable Long courseid) {
        return feedbackService.findFeedbacksByCourseId(courseid);
    }
    // Submit feedback for a course
    @PostMapping("/submit")
    public FeedbackDto submitFeedback(@RequestBody FeedbackDto feedbackDTO) {
        return feedbackService.submitFeedback(feedbackDTO);
    }
}
