package com.capstone.accountteam.service;

import com.capstone.accountteam.dtos.Dashboarddto;
import com.capstone.accountteam.dtos.ManagerDTO;
import com.capstone.accountteam.dtos.TrainingRequestDto;
import com.capstone.accountteam.dtos.TrainingResponse;
import com.capstone.accountteam.entity.Manager;
import com.capstone.accountteam.entity.Status;
import com.capstone.accountteam.entity.TrainingRequest;
import com.capstone.accountteam.exception.ResourseNotFoundException;
import com.capstone.accountteam.feign.UserCredentialDTO;
import com.capstone.accountteam.feign.UserManagementFeignClient;
import com.capstone.accountteam.repository.ManagerRepository;
import com.capstone.accountteam.repository.TrainingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrainingService {

    @Autowired
    private TrainingRepository trainingRequestRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserManagementFeignClient userClient;

    public String requestform(TrainingRequestDto trainingRequestDto) {
        TrainingRequest request = new TrainingRequest();
       if(managerRepository.
                findByUsername(trainingRequestDto.getManagername())==null)
           throw new ResourseNotFoundException("Manager not found");
        BeanUtils.copyProperties(trainingRequestDto, request);
        request.setCreateddate(LocalDate.now());
        request.setStatus(Status.PENDING);

        // Fetch and set the associated manager
        Manager manager = managerRepository.findByUsername(trainingRequestDto.getManagername());
              if(manager==null)
                  throw new ResourseNotFoundException("Manager not found");
        request.setManager(manager);

        trainingRequestRepository.save(request);
        return "Request created successfully";
    }

    public List<TrainingResponse> getAllRequests() {
        List<TrainingRequest> requests = trainingRequestRepository.findAll();
        List<TrainingResponse> sendrequest = new ArrayList<>();
        for (TrainingRequest trainingRequest : requests) {
            TrainingResponse request = new TrainingResponse();
            request.setAccountid(trainingRequest.getManager().getAccountid());
            request.setManagername(trainingRequest.getManager().getUsername());
            request.setCreateddate(trainingRequest.getCreateddate());
            BeanUtils.copyProperties(trainingRequest,request);
            sendrequest.add(request);
        }
        return sendrequest;
    }

    public TrainingRequestDto getRequestByrequestid(Long requestid) {
        TrainingRequest request=trainingRequestRepository.findById(requestid)
                .orElseThrow(() -> new ResourseNotFoundException("Request not found"));
        TrainingRequestDto requestDto=new TrainingRequestDto();

        requestDto.setRequestid(requestid);
        requestDto.setAccountid(request.getManager().getAccountid());
        requestDto.setManagername(request.getManager().getUsername());
        requestDto.setConcepts(request.getConcepts());
        requestDto.setDescription(request.getDescription());
        requestDto.setCoursename(request.getCoursename());
        requestDto.setEmployeeposition(request.getEmployeeposition());
        requestDto.setDuration(request.getDuration());
        requestDto.setRequiredemployees(request.getRequiredemployees());
        requestDto.setStatus(request.getStatus());
        return requestDto;

    }

    public void updateRequestStatus(Long requestid, Status status) {
        TrainingRequest request = trainingRequestRepository.findById(requestid)
                .orElseThrow(() -> new ResourseNotFoundException("Training Request not found for id: " + requestid));
        request.setStatus(status);
        trainingRequestRepository.save(request);
    }

    public List<Dashboarddto> getRequestByrequestname(String requestorname) {

        List<TrainingRequest> requests = trainingRequestRepository.findByManagerUsername(requestorname);


        List<Dashboarddto> dashboarddtoList = new ArrayList<>();
        for (TrainingRequest request : requests) {
            Dashboarddto dto = new Dashboarddto();
            BeanUtils.copyProperties(request, dto);
            dto.setCreateddate(request.getCreateddate());
            dashboarddtoList.add(dto);
        }
        return dashboarddtoList;
    }

    public Manager addManager(ManagerDTO managerDto) {
        Manager manager = new Manager();
        UserCredentialDTO userCredentialDTO = new UserCredentialDTO();

        BeanUtils.copyProperties(managerDto, manager);

        return  managerRepository.save(manager);
    }

    public Manager findByUsername(String username) {
        // Logic to fetch Manager by username
        Manager manager = managerRepository.findByUsername(username);
        if(manager==null)

            throw new ResourseNotFoundException("Manager not found");
        return manager;
    }
}
