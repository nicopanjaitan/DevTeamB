package del.be_inv_mgt.service;

import del.be_inv_mgt.model.FormRequest;

import java.util.List;

public interface FormRequestService {
    List<FormRequest> getAllRequest();

    FormRequest getRequestById(String reqId);

    FormRequest createRequest(FormRequest request);

    FormRequest updateRequestById(String reqId, FormRequest request);

    int deleteRequestById(String reqId);
}
