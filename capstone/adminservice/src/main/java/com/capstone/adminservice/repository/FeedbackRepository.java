package com.capstone.adminservice.repository;

import com.capstone.adminservice.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
    List<Feedback> findByCourseCourseid(Long courseid);
}
