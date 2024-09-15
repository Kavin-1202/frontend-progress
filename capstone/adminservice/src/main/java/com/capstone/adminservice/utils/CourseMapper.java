package com.capstone.adminservice.utils;

import com.capstone.adminservice.dto.CourseDTO;
import com.capstone.adminservice.dto.FullResponse;
import com.capstone.adminservice.entity.Course;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

public class CourseMapper {

    // Method to convert Course entity to FullResponse using BeanUtils
    public static FullResponse toDTO(Course course) {
        if (course == null) {
            return null;
        }

        FullResponse response = new FullResponse();
       BeanUtils.copyProperties(course, response);
        return response;
    }

    // Method to convert CourseDTO to Course entity using BeanUtils
    public static Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        BeanUtils.copyProperties(courseDTO, course);
        return course;
    }

//    // Method to convert a list of Course entities to a list of CourseDTOs using streams
//    public static List<CourseDTO> toDTOList(List<Course> courses) {
//        return courses.stream()
//                .map(CourseMapper::toDTO)
//                .collect(Collectors.toList());
//    }

    // Method to convert a list of CourseDTOs to a list of Course entities using streams
    public static List<Course> toEntityList(List<CourseDTO> courseDTOs) {
        return courseDTOs.stream()
                .map(CourseMapper::toEntity)
                .collect(Collectors.toList());
    }
}
