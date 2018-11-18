package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.model.FormRequest;
import del.be_inv_mgt.repository.FormRequestRepository;
import del.be_inv_mgt.service.FormRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormRequestServiceImpl implements FormRequestService {
    @Autowired
    private FormRequestRepository formRequestRepository;

    public List<FormRequest> getAllRequest(){
        return formRequestRepository.findAll();
    }

    public FormRequest getRequestById(String reqId){
        return formRequestRepository.findBy_id(reqId);
    }

    public FormRequest createRequest(FormRequest request){
        return formRequestRepository.save(request);
    }

    public FormRequest updateRequestById(String reqId, FormRequest request) {
        request.set_id(reqId);
        formRequestRepository.save(request);
        return request;
    }

    public int deleteRequestById(String reqId) {
        formRequestRepository.deleteById(reqId);
        return 1;
    }
}
