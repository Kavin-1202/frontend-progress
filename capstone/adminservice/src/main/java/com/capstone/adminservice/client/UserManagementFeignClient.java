package com.capstone.adminservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "UserManagementService", url = "http://localhost:9002/users")
public interface UserManagementFeignClient {

    @PostMapping
    public ResponseEntity<UserCredentialDTO> createUser(
            @RequestBody UserCredentialDTO userCredentialDTO);
}
