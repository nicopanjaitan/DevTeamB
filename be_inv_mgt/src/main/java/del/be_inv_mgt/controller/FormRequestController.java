package del.be_inv_mgt.controller;

import del.be_inv_mgt.controller.addition.GlobalController;
import del.be_inv_mgt.model.FormRequest;
import del.be_inv_mgt.model.respon.Response;
import del.be_inv_mgt.service.FormRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/request")
public class FormRequestController extends GlobalController {
    @Autowired
    private FormRequestService formRequestService;

    @GetMapping("/getAll")
    public Response<List<FormRequest>> getAllRequest(){
        return toResponse(formRequestService.getAllRequest());
    }

    @GetMapping("/getById/{requestID}")
    public Response<FormRequest> getById(@PathVariable String requestID){
        return toResponse(formRequestService.getRequestById(requestID));
    }

    @GetMapping("/getByEmployeeId/{employeeID}")
    public Response<List<FormRequest>> getByEmployeeId(@PathVariable String employeeID){
        return toResponse(formRequestService.getRequestByEmployeeId(employeeID));
    }

    @GetMapping("/getBySupervisorId/{supervisorID}")
    public Response<List<FormRequest>> getBySupervisorId(@PathVariable String supervisorID){
        return toResponse(formRequestService.getRequestBySupervisorId(supervisorID));
    }

    @GetMapping("/getByStatus/{status}")
    public Response<List<FormRequest>> getByStatus(@PathVariable String status){
        return toResponse(formRequestService.getRequestByStatus(status));
    }

    @PostMapping("/create")
    public Response<FormRequest> create(@Valid @RequestBody FormRequest formRequest){
        return toResponse(formRequestService.createRequest(formRequest));
    }

    @PutMapping(value = "/updateById/{requestID}")
    public Response<FormRequest> updateById(@PathVariable String requestID, @Valid @RequestBody FormRequest formRequest) {
        return toResponse(formRequestService.updateRequestById(requestID, formRequest));
    }

    @PutMapping(value = "/handoverById/{requestID}")
    public Response<FormRequest> handoverById(@PathVariable String requestID, @Valid @RequestBody FormRequest formRequest) {
        return toResponse(formRequestService.handoverRequestById(requestID, formRequest.getStatus()));
    }

    @PutMapping(value = "/rejectById/{requestID}")
    public Response<FormRequest> rejectById(@PathVariable String requestID, @Valid @RequestBody FormRequest formRequest) {
        return toResponse(formRequestService.rejectRequestById(requestID, formRequest.getStatus()));
    }

    @DeleteMapping("/deleteById/{requestID}")
    public Response<Boolean> deleteById(@PathVariable String requestID) {
        return toResponse(formRequestService.deleteRequestById(requestID));
    }
}
