package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.FormRequest;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.model.respon.Status;
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

    public FormRequest createRequest(FormRequest requestNew, String employeeID){

        requestNew.setRequestID("req_"+getDate("yyyyMMddHHmmss"));
        requestNew.setEmployeeID(employeeID);
        requestNew.setDateRequest(getDate("yyyy/MM/dd HH:mm:ss"));
        requestNew.setDateReceived("0000/00/00 00:00:00");

        requestNew.setStatus(Status.Pending.toString());

        return formRequestRepository.save(requestNew);
    }

    public FormRequest updateRequestById(String requestID, FormRequest requestUpd) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        if(!formRequests.getStatus().equals(Status.Pending.toString()) ){
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        formRequests.setInventoryID(requestUpd.getInventoryID());
        formRequests.setDestination(requestUpd.getDestination());
        formRequests.setQtyRequest(requestUpd.getQtyRequest());

        formRequestRepository.save(formRequests);

        return formRequests;
    }

    public FormRequest approvedRequestById(String requestID) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        if(!formRequests.getStatus().equals(Status.Pending.toString())){
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        formRequests.setStatus(Status.Approved.toString());
        formRequestRepository.save(formRequests);

        return formRequests;
    }

    public FormRequest rejectRequestById(String requestID) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        if(!formRequests.getStatus().equals(Status.Pending.toString())){
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        formRequests.setStatus(Status.Rejected.toString());
        formRequestRepository.save(formRequests);

        return formRequests;
    }

    public FormRequest handoverRequestById(String requestID) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        if(!formRequests.getStatus().equals(Status.Approved.toString())){
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        formRequests.setDateReceived(getDate("yyyy/MM/dd HH:mm:ss"));
        formRequests.setStatus(Status.Received.toString());

        formRequestRepository.save(formRequests);

        return formRequests;
    }

    public boolean deleteRequestById(String requestID) {
        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);

        if (formRequests == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        formRequestRepository.deleteByRequestID(requestID);

        return true;

    }

    static String getDate(String format){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(format);
        LocalDateTime now = LocalDateTime.now();

        String dateTimeNow = dtf.format(now);

        return dateTimeNow;
    }

}