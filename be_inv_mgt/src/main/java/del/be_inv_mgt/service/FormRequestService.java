package del.be_inv_mgt.service;

import del.be_inv_mgt.model.FormRequest;

import java.util.List;

public interface FormRequestService {
    List<FormRequest> getAllRequest();

    FormRequest getRequestById(String requestID);

    List<FormRequest> getRequestByEmployeeId(String employeeID);

    List<FormRequest> getRequestBySupervisorId(String supervisorID);

    List<FormRequest> getRequestByStatus(String status);

    FormRequest createRequest(FormRequest formRequests);

    FormRequest updateRequestById(String requestID, FormRequest formRequests);

    FormRequest handoverRequestById(String requestID, String newStatus);

    FormRequest rejectRequestById(String requestID, String newStatus);

    boolean deleteRequestById(String requestID);
}
