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

    @PutMapping(value = "/approvedById/{requestID}")
    public Response<FormRequest> approvedById(@PathVariable String requestID) {
        return toResponse(formRequestService.approvedRequestById(requestID));
    }

    @PutMapping(value = "/canceledById/{requestID}")
    public Response<FormRequest> canceledById(@PathVariable String requestID) {
        return toResponse(formRequestService.canceledRequestById(requestID));
    }

    @PutMapping(value = "/rejectById/{requestID}")
    public Response<FormRequest> rejectById(@PathVariable String requestID) {
        return toResponse(formRequestService.rejectRequestById(requestID));
    }

    @PutMapping(value = "/handoverById/{requestID}")
    public Response<FormRequest> handoverById(@PathVariable String requestID) {
        return toResponse(formRequestService.handoverRequestById(requestID));
    }

    @DeleteMapping("/deleteById/{requestID}")
    public Response<Boolean> deleteById(@PathVariable String requestID) {
        return toResponse(formRequestService.deleteRequestById(requestID));
    }
}
