package del.be_inv_mgt.service;

import del.be_inv_mgt.model.FormRequest;

import java.util.List;

public interface FormRequestService {
    List<FormRequest> getAllRequest();

    FormRequest getRequestById(String requestID);

    List<FormRequest> getRequestByEmployeeId(String employeeID);

    List<FormRequest> getRequestBySupervisorId(String supervisorID);

    List<FormRequest> getRequestByStatus(String status);

    FormRequest createRequest(FormRequest formRequests, String employeeID);

    FormRequest updateRequestById(String requestID, FormRequest formRequests);

    FormRequest approvedRequestById(String requestID);

    FormRequest rejectRequestById(String requestID);

    FormRequest handoverRequestById(String requestID);

    boolean deleteRequestById(String requestID);
}
