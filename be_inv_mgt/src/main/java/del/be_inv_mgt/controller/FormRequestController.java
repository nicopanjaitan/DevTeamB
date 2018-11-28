package del.be_inv_mgt.controller;

import del.be_inv_mgt.model.FormRequest;
import del.be_inv_mgt.service.FormRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/request")
public class FormRequestController {
    @Autowired
    private FormRequestService formRequestService;

    @GetMapping("/getAll")
    public List<FormRequest> getAllRequest(){
        return formRequestService.getAllRequest();
    }

    @GetMapping("/getById/{id}")
    public FormRequest getById(@PathVariable("id") String reqId){
        return formRequestService.getRequestById(reqId);
    }

    @PostMapping("/create")
    public FormRequest create(@Valid @RequestBody FormRequest formRequest){
        return formRequestService.createRequest(formRequest);
    }

    @PutMapping(value = "/updateById/{id}")
    public FormRequest updateById(@PathVariable("id") String reqId, @Valid @RequestBody FormRequest formRequest) {
        formRequest.set_id(reqId);
        formRequestService.updateRequestById(reqId, formRequest);
        return formRequest;
    }

    @DeleteMapping("/deleteById/{id}")
    public int deleteById(@PathVariable("id") String reqId) {
        formRequestService.deleteRequestById(reqId);
        return 1;
    }
}
