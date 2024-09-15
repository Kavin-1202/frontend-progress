package com.capstone.adminservice.utils;


import com.capstone.adminservice.dto.EmployeeDTO;
import com.capstone.adminservice.entity.Employee;
import org.springframework.beans.BeanUtils;

import java.security.SecureRandom;

public class EmployeeUtils {

    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "abcdefghijklmnopqrstuvwxyz0123456789";

    public static Employee dtoToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(dto,employee);
        return employee;
    }

    public static EmployeeDTO entityToDto(Employee employee) {
        return new EmployeeDTO(employee.getUsername(),
                employee.getEmail());
    }



    // Method to generate a random string of specified length
    public static String generateRandomString(int length) {
        StringBuilder builder = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(index));
        }
        return builder.toString();
    }
}
