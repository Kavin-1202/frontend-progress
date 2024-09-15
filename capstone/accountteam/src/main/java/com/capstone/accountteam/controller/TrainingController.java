package com.capstone.accountteam.controller;
import com.capstone.accountteam.dtos.*;
import com.capstone.accountteam.entity.Manager;
import com.capstone.accountteam.entity.Status;
import com.capstone.accountteam.entity.TrainingRequest;
import com.capstone.accountteam.exception.ResourseNotFoundException;
import com.capstone.accountteam.service.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;


    @PostMapping("/addManager")
    public ResponseEntity<Manager> addManager(@RequestBody ManagerDTO manager) {
        return ResponseEntity.ok(trainingService.addManager(manager));
    }

    @PostMapping("/sendRequest/{username}")
    public ResponseEntity<String> submitTrainingRequest(@PathVariable String username, @RequestBody TrainingRequestDto trainingRequest) {
        Manager manager = trainingService.findByUsername(username);

        // Extract accountId and requestorName from the Manager object
        if (manager != null) {
            Long accountId = manager.getAccountid();
            String managerName = manager.getUsername();

            // Set the fetched accountId and requestorName to the trainingRequest DTO
            trainingRequest.setAccountid(accountId);
            trainingRequest.setManagername(managerName);
        } else {
            throw new ResourseNotFoundException("Manager not found with username: " + username);
        }
        String savedRequest=trainingService.requestform(trainingRequest);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/viewRequests")
    public ResponseEntity<List<TrainingResponse>> getAllTrainingRequests() {
        List<TrainingResponse> requests=trainingService.getAllRequests();
        return ResponseEntity.ok(requests);
    }
    @GetMapping("/viewRequest/{requestid}")
    public ResponseEntity<TrainingRequestDto> getTrainingRequestsByRequestid(@PathVariable Long requestid) {
        TrainingRequestDto request = trainingService.getRequestByrequestid(requestid);
        return ResponseEntity.ok(request);
    }
    @ExceptionHandler(ResourseNotFoundException.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> handleResourseNotFoundException(ResourseNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.OK).body(ex.getMessage());
    }
    @PutMapping("/trainingRequest/{requestid}/status")
    public ResponseEntity<String> updateTrainingRequestStatus(@PathVariable Long requestid, @RequestParam Status status) {
        trainingService.updateRequestStatus(requestid, status);
        return ResponseEntity.ok("staus changed");
    }

    @GetMapping("/Dashboard/{name}")
    public ResponseEntity<List<Dashboarddto>> getTrainingRequestByRequestName(@PathVariable String name) {
        List<Dashboarddto> request = trainingService.getRequestByrequestname(name);
        return ResponseEntity.ok(request);
    }



}

