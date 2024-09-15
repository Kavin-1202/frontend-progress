package com.capstone.adminservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "Accountteam",url = "http://localhost:9000/accounts")
public interface Accountclient {
    @GetMapping("/viewRequest/{requestid}")
    public ResponseEntity<TrainingRequestDto> getTrainingRequestsByRequestid(@PathVariable Long requestid);

    @GetMapping("/viewRequests")
    public ResponseEntity<List<TrainingResponse>> getAllTrainingRequests();


    @PutMapping("/trainingRequest/{requestid}/status")
    ResponseEntity<String> updateTrainingRequestStatus(@PathVariable Long requestid, @RequestParam Status status);
}
