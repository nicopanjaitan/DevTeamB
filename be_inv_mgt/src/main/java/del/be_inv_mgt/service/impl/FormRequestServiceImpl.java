package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.FormRequest;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.repository.FormRequestRepository;
import del.be_inv_mgt.service.FormRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class FormRequestServiceImpl implements FormRequestService {
    @Autowired
    private FormRequestRepository formRequestRepository;

    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();

    public List<FormRequest> getAllRequest(){
        List<FormRequest> requests = formRequestRepository.findAll();

        if(requests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return requests;
    }

    public FormRequest getRequestById(String requestID){
        FormRequest request = formRequestRepository.findByRequestID(requestID);

        if(request == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return request;
    }

    public List<FormRequest> getRequestByEmployeeId(String employeeID){
        List<FormRequest> requests = formRequestRepository.findByEmployeeID(employeeID);

        if(requests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return requests;
    }

    public List<FormRequest> getRequestBySupervisorId(String supervisorID){
        List<FormRequest> requests = formRequestRepository.findBySupervisorID(supervisorID);

        if(requests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return requests;
    }

    public List<FormRequest> getRequestByStatus(String status){
        List<FormRequest> requests = formRequestRepository.findByStatus(status);

        if(requests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return requests;
    }

//    public List<FormRequest> getRequestByDateRequest(String supervisorID){
//        List<FormRequest> requests = formRequestRepository.findAll();
//
//        if(requests.isEmpty()){
//            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
//        }
//
//        return requests;
//    }

    public FormRequest createRequest(FormRequest requestNew){
        FormRequest request = formRequestRepository.findByRequestID(requestNew.getRequestID());

        if (request != null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequestRepository.save(requestNew);
    }

    public FormRequest updateRequestById(String requestID, FormRequest requestUpd) {
        FormRequest request = formRequestRepository.findByRequestID(requestID);

        if (request == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            //data lama
            request.setId(request.getId());
            request.setRequestID(request.getRequestID());
            request.setInventoryID(request.getInventoryID());
            request.setEmployeeID(request.getEmployeeID());
            request.setSupervisorID(request.getSupervisorID());
            request.setDateRequest(request.getDateRequest());
            request.setDateReceived(request.getDateReceived());
            request.setStatus(request.getStatus());

            //data baru
            request.setDestination(requestUpd.getDestination());
            request.setQtyRequest(requestUpd.getQtyRequest());

            formRequestRepository.save(request);
        }

        return requestUpd;
    }

    public FormRequest handoverRequestById(String requestID, String status) {
        FormRequest request = formRequestRepository.findByRequestID(requestID);

        if (request == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            //data lama
            request.setId(request.getId());
            request.setRequestID(request.getRequestID());
            request.setInventoryID(request.getInventoryID());
            request.setEmployeeID(request.getEmployeeID());
            request.setSupervisorID(request.getSupervisorID());
            request.setDateRequest(request.getDateRequest());
            request.setDestination(request.getDestination());
            request.setQtyRequest(request.getQtyRequest());

            //data baru
            request.setDateReceived(dtf.format(now));
            request.setStatus(status);

            formRequestRepository.save(request);
        }

        return request;
    }

    public FormRequest rejectRequestById(String requestID, String status) {
        FormRequest request = formRequestRepository.findByRequestID(requestID);

        if (request == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            //data lama
            request.setId(request.getId());
            request.setRequestID(request.getRequestID());
            request.setInventoryID(request.getInventoryID());
            request.setEmployeeID(request.getEmployeeID());
            request.setSupervisorID(request.getSupervisorID());
            request.setDateRequest(request.getDateRequest());
            request.setDestination(request.getDestination());
            request.setQtyRequest(request.getQtyRequest());
            request.setDateReceived(request.getDateReceived());

            //data baru
            request.setStatus(status);

            formRequestRepository.save(request);
        }

        return request;
    }


    public boolean deleteRequestById(String requestID) {
        FormRequest request = formRequestRepository.findByRequestID(requestID);

        if (request == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            formRequestRepository.deleteById(requestID);
        }

        return true;
    }

}
