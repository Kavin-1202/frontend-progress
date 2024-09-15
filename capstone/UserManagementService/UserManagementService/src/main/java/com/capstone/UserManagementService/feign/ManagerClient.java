package com.capstone.UserManagementService.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "Accountteam", url = "http://localhost:9000/accounts")
public interface ManagerClient {

    @PostMapping("/addManager")
    public ResponseEntity<Manager> addManager(@RequestBody ManagerDTO manager);
}
