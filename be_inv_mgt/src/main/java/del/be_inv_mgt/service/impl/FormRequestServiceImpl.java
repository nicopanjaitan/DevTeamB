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

    LocalDateTime now = LocalDateTime.now();

    public List<FormRequest> getAllRequest(){
        List<FormRequest> formRequests = formRequestRepository.findAll();

        if(formRequests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequests;
    }

    public FormRequest getRequestById(String requestID){
        FormRequest formRequest = formRequestRepository.findByRequestID(requestID);

        if(formRequest == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequest;
    }

    public List<FormRequest> getRequestByEmployeeId(String employeeID){
        List<FormRequest> formRequests = formRequestRepository.findByEmployeeID(employeeID);

        if(formRequests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequests;
    }

    public List<FormRequest> getRequestBySupervisorId(String supervisorID){
        List<FormRequest> formRequests = formRequestRepository.findBySupervisorID(supervisorID);

        if(formRequests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequests;
    }

    public List<FormRequest> getRequestByStatus(String status){
        List<FormRequest> formRequests = formRequestRepository.findByStatus(status);

        if(formRequests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequests;
    }

    public List<FormRequest> getRequestByDateRequest(String supervisorID){
        List<FormRequest> formRequests = formRequestRepository.findAll();

        if(formRequests.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequests;
    }

    public FormRequest createRequest(FormRequest requestNew){
        FormRequest formRequests = formRequestRepository.findByRequestID(requestNew.getRequestID());

        if (formRequests != null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return formRequestRepository.save(requestNew);
    }

    public FormRequest updateRequestById(String requestID, FormRequest requestUpd) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            //data lama
            formRequests.setId(formRequests.getId());
            formRequests.setRequestID(formRequests.getRequestID());
            formRequests.setInventoryID(formRequests.getInventoryID());
            formRequests.setEmployeeID(formRequests.getEmployeeID());
            formRequests.setSupervisorID(formRequests.getSupervisorID());
            formRequests.setDateRequest(formRequests.getDateRequest());
            formRequests.setDateReceived(formRequests.getDateReceived());
            formRequests.setStatus(formRequests.getStatus());

            //data baru
            formRequests.setDestination(requestUpd.getDestination());
            formRequests.setQtyRequest(requestUpd.getQtyRequest());

            formRequestRepository.save(formRequests);
        }

        return formRequests;
    }

    public FormRequest handoverRequestById(String requestID, String status) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            //data baru
            formRequests.setDateReceived(dtf.format(now));
            formRequests.setStatus(status);

            formRequestRepository.save(formRequests);
        }

        return formRequests;
    }

    public FormRequest rejectRequestById(String requestID, String status) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            //data baru
            formRequests.setStatus(status);

            formRequestRepository.save(formRequests);
        }

        return formRequests;
    }


    public boolean deleteRequestById(String requestID) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            formRequestRepository.deleteById(requestID);
        }

        return true;
    }

}