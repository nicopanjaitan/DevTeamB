[33mcommit b2a50f3f0246912507a4bf7061f62af842a389a0[m[33m ([m[1;36mHEAD -> [m[1;32mimpl_other[m[33m, [m[1;31morigin/impl_other[m[33m, [m[1;31morigin/form_request[m[33m, [m[1;32mform_request[m[33m)[m
Author: Nani Hutagaol <nanihutagaol@gmail.com>
Date:   Thu Dec 27 07:45:28 2018 +0700

    Fixing Form Request
    
    Fixing all about form request

[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/controller/FormRequestController.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/controller/FormRequestController.java[m
[1mindex 565609f..8a91ace 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/controller/FormRequestController.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/controller/FormRequestController.java[m
[36m@@ -41,9 +41,9 @@[m [mpublic class FormRequestController extends GlobalController {[m
         return toResponse(formRequestService.getRequestByStatus(status));[m
     }[m
 [m
[31m-    @PostMapping("/create")[m
[31m-    public Response<FormRequest> create(@Valid @RequestBody FormRequest formRequest){[m
[31m-        return toResponse(formRequestService.createRequest(formRequest));[m
[32m+[m[32m    @PostMapping("/create/{employeeID}")[m
[32m+[m[32m    public Response<FormRequest> create(@PathVariable String employeeID, @Valid @RequestBody FormRequest formRequest){[m
[32m+[m[32m        return toResponse(formRequestService.createRequest(formRequest, employeeID));[m
     }[m
 [m
     @PutMapping(value = "/updateById/{requestID}")[m
[36m@@ -51,14 +51,19 @@[m [mpublic class FormRequestController extends GlobalController {[m
         return toResponse(formRequestService.updateRequestById(requestID, formRequest));[m
     }[m
 [m
[31m-    @PutMapping(value = "/handoverById/{requestID}")[m
[31m-    public Response<FormRequest> handoverById(@PathVariable String requestID, @Valid @RequestBody FormRequest formRequest) {[m
[31m-        return toResponse(formRequestService.handoverRequestById(requestID, formRequest.getStatus()));[m
[32m+[m[32m    @PutMapping(value = "/approvedById/{requestID}")[m
[32m+[m[32m    public Response<FormRequest> approvedById(@PathVariable String requestID) {[m
[32m+[m[32m        return toResponse(formRequestService.approvedRequestById(requestID));[m
     }[m
 [m
     @PutMapping(value = "/rejectById/{requestID}")[m
[31m-    public Response<FormRequest> rejectById(@PathVariable String requestID, @Valid @RequestBody FormRequest formRequest) {[m
[31m-        return toResponse(formRequestService.rejectRequestById(requestID, formRequest.getStatus()));[m
[32m+[m[32m    public Response<FormRequest> rejectById(@PathVariable String requestID) {[m
[32m+[m[32m        return toResponse(formRequestService.rejectRequestById(requestID));[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    @PutMapping(value = "/handoverById/{requestID}")[m
[32m+[m[32m    public Response<FormRequest> handoverById(@PathVariable String requestID) {[m
[32m+[m[32m        return toResponse(formRequestService.handoverRequestById(requestID));[m
     }[m
 [m
     @DeleteMapping("/deleteById/{requestID}")[m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/model/FormRequest.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/model/FormRequest.java[m
[1mindex 4b8e7d1..76b8c2e 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/model/FormRequest.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/model/FormRequest.java[m
[36m@@ -17,7 +17,6 @@[m [mpublic class FormRequest {[m
     @Id[m
     private String id;[m
 [m
[31m-    //untuk id transaksi yg dpt di publikasi[m
     @Indexed(unique = true)[m
     private String requestID;[m
 [m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java[m
[1mindex f68a70d..998a2b6 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java[m
[36m@@ -1,4 +1,10 @@[m
 package del.be_inv_mgt.model.respon;[m
 [m
 public enum Status {[m
[32m+[m
[32m+[m[32m    Pending,[m
[32m+[m[32m    Approved,[m
[32m+[m[32m    Rejected,[m
[32m+[m[32m    Received;[m
[32m+[m
 }[m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/repository/FormRequestRepository.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/repository/FormRequestRepository.java[m
[1mindex af3ac93..09d9569 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/repository/FormRequestRepository.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/repository/FormRequestRepository.java[m
[36m@@ -14,4 +14,6 @@[m [mpublic interface FormRequestRepository extends MongoRepository<FormRequest, Stri[m
     List<FormRequest> findBySupervisorID(String supervisorID);[m
 [m
     List<FormRequest> findByStatus(String supervisorID);[m
[32m+[m
[32m+[m[32m    Boolean deleteByRequestIDEquals(String requestID);[m
 }[m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/FormRequestService.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/FormRequestService.java[m
[1mindex aa86d15..fec33f3 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/FormRequestService.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/FormRequestService.java[m
[36m@@ -15,13 +15,15 @@[m [mpublic interface FormRequestService {[m
 [m
     List<FormRequest> getRequestByStatus(String status);[m
 [m
[31m-    FormRequest createRequest(FormRequest formRequests);[m
[32m+[m[32m    FormRequest createRequest(FormRequest formRequests, String employeeID);[m
 [m
     FormRequest updateRequestById(String requestID, FormRequest formRequests);[m
 [m
[31m-    FormRequest handoverRequestById(String requestID, String newStatus);[m
[32m+[m[32m    FormRequest approvedRequestById(String requestID);[m
 [m
[31m-    FormRequest rejectRequestById(String requestID, String newStatus);[m
[32m+[m[32m    FormRequest rejectRequestById(String requestID);[m
[32m+[m
[32m+[m[32m    FormRequest handoverRequestById(String requestID);[m
 [m
     boolean deleteRequestById(String requestID);[m
 }[m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/FormRequestServiceImpl.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/FormRequestServiceImpl.java[m
[1mindex e7702e5..bd8ad99 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/FormRequestServiceImpl.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/FormRequestServiceImpl.java[m
[36m@@ -3,6 +3,7 @@[m [mpackage del.be_inv_mgt.service.impl;[m
 import del.be_inv_mgt.exception.ResourceNotFoundException;[m
 import del.be_inv_mgt.model.FormRequest;[m
 import del.be_inv_mgt.model.respon.ErrorCode;[m
[32m+[m[32mimport del.be_inv_mgt.model.respon.Status;[m
 import del.be_inv_mgt.repository.FormRequestRepository;[m
 import del.be_inv_mgt.service.FormRequestService;[m
 import org.springframework.beans.factory.annotation.Autowired;[m
[36m@@ -69,100 +70,107 @@[m [mpublic class FormRequestServiceImpl implements FormRequestService {[m
         return formRequests;[m
     }[m
 [m
[31m-    public List<FormRequest> getRequestByDateRequest(String supervisorID){[m
[31m-        List<FormRequest> formRequests = formRequestRepository.findAll();[m
[32m+[m[32m    public FormRequest createRequest(FormRequest requestNew, String employeeID){[m
 [m
[31m-        if(formRequests.isEmpty()){[m
[31m-            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
[31m-        }[m
[32m+[m[32m        requestNew.setRequestID("req_"+getDate("yyyyMMddHHmmss"));[m
[32m+[m[32m        requestNew.setEmployeeID(employeeID);[m
[32m+[m[32m        requestNew.setDateRequest(getDate("yyyy/MM/dd HH:mm:ss"));[m
[32m+[m[32m        requestNew.setDateReceived("0000/00/00 00:00:00");[m
 [m
[31m-        return formRequests;[m
[32m+[m[32m        requestNew.setStatus(Status.Pending.toString());[m
[32m+[m
[32m+[m[32m        return formRequestRepository.save(requestNew);[m
     }[m
 [m
[31m-    public FormRequest createRequest(FormRequest requestNew){[m
[31m-        FormRequest formRequests = formRequestRepository.findByRequestID(requestNew.getRequestID());[m
[32m+[m[32m    public FormRequest updateRequestById(String requestID, FormRequest requestUpd) {[m
[32m+[m[32m        FormRequest formRequests = formRequestRepository.findByRequestID(requestID);[m
 [m
[31m-        if (formRequests != null){[m
[32m+[m[32m        if (formRequests == null){[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[31m-        return formRequestRepository.save(requestNew);[m
[32m+[m[32m        if(!formRequests.getStatus().equals(Status.Pending.toString()) ){[m
[32m+[m[32m            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        formRequests.setInventoryID(requestUpd.getInventoryID());[m
[32m+[m[32m        formRequests.setDestination(requestUpd.getDestination());[m
[32m+[m[32m        formRequests.setQtyRequest(requestUpd.getQtyRequest());[m
[32m+[m
[32m+[m[32m        formRequestRepository.save(formRequests);[m
[32m+[m
[32m+[m[32m        return formRequests;[m
     }[m
 [m
[31m-    public FormRequest updateRequestById(String requestID, FormRequest requestUpd) {[m
[32m+[m[32m    public FormRequest approvedRequestById(String requestID) {[m
         FormRequest formRequests = formRequestRepository.findByRequestID(requestID);[m
 [m
         if (formRequests == null){[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
[31m-        else{[m
[31m-            //data lama[m
[31m-            formRequests.setId(formRequests.getId());[m
[31m-            formRequests.setRequestID(formRequests.getRequestID());[m
[31m-            formRequests.setInventoryID(formRequests.getInventoryID());[m
[31m-            formRequests.setEmployeeID(formRequests.getEmployeeID());[m
[31m-            formRequests.setSupervisorID(formRequests.getSupervisorID());[m
[31m-            formRequests.setDateRequest(formRequests.getDateRequest());[m
[31m-            formRequests.setDateReceived(formRequests.getDateReceived());[m
[31m-            formRequests.setStatus(formRequests.getStatus());[m
[31m-[m
[31m-            //data baru[m
[31m-            formRequests.setDestination(requestUpd.getDestination());[m
[31m-            formRequests.setQtyRequest(requestUpd.getQtyRequest());[m
[31m-[m
[31m-            formRequestRepository.save(formRequests);[m
[32m+[m
[32m+[m[32m        if(!formRequests.getStatus().equals(Status.Pending.toString())){[m
[32m+[m[32m            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[32m+[m[32m        formRequests.setStatus(Status.Approved.toString());[m
[32m+[m[32m        formRequestRepository.save(formRequests);[m
[32m+[m
         return formRequests;[m
     }[m
 [m
[31m-    public FormRequest handoverRequestById(String requestID, String status) {[m
[31m-[m
[31m-        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");[m
[32m+[m[32m    public FormRequest rejectRequestById(String requestID) {[m
         FormRequest formRequests = formRequestRepository.findByRequestID(requestID);[m
 [m
         if (formRequests == null){[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
[31m-        else{[m
[31m-            //data baru[m
[31m-            formRequests.setDateReceived(dtf.format(now));[m
[31m-            formRequests.setStatus(status);[m
 [m
[31m-            formRequestRepository.save(formRequests);[m
[32m+[m[32m        if(!formRequests.getStatus().equals(Status.Pending.toString())){[m
[32m+[m[32m            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[32m+[m[32m        formRequests.setStatus(Status.Rejected.toString());[m
[32m+[m[32m        formRequestRepository.save(formRequests);[m
[32m+[m
         return formRequests;[m
     }[m
 [m
[31m-    public FormRequest rejectRequestById(String requestID, String status) {[m
[32m+[m[32m    public FormRequest handoverRequestById(String requestID) {[m
         FormRequest formRequests = formRequestRepository.findByRequestID(requestID);[m
 [m
         if (formRequests == null){[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
[31m-        else{[m
[31m-            //data baru[m
[31m-            formRequests.setStatus(status);[m
[31m-[m
[31m-            formRequestRepository.save(formRequests);[m
[32m+[m[32m        if(!formRequests.getStatus().equals(Status.Approved.toString())){[m
[32m+[m[32m            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[32m+[m[32m        formRequests.setDateReceived(getDate("yyyy/MM/dd HH:mm:ss"));[m
[32m+[m[32m        formRequests.setStatus(Status.Received.toString());[m
[32m+[m
[32m+[m[32m        formRequestRepository.save(formRequests);[m
[32m+[m
         return formRequests;[m
     }[m
 [m
[31m-[m
     public boolean deleteRequestById(String requestID) {[m
         FormRequest formRequests = formRequestRepository.findByRequestID(requestID);[m
 [m
         if (formRequests == null){[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
[31m-        else{[m
[31m-            formRequestRepository.deleteById(requestID);[m
[31m-        }[m
[32m+[m[32m        return formRequestRepository.deleteByRequestIDEquals(requestID);[m
[32m+[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    static String getDate(String format){[m
[32m+[m[32m        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(format);[m
[32m+[m[32m        LocalDateTime now = LocalDateTime.now();[m
[32m+[m
[32m+[m[32m        String dateTimeNow = dtf.format(now);[m
 [m
[31m-        return true;[m
[32m+[m[32m        return dateTimeNow;[m
     }[m
 [m
 }[m
\ No newline at end of file[m

[33mcommit c880159ef5af0448ae630f85f0153afe802b48cf[m
Author: Nani Hutagaol <nanihutagaol@gmail.com>
Date:   Thu Dec 27 07:40:54 2018 +0700

    fixing Inv, Emp, Sup
    
    fixing other method, adding id on create method

[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java[m
[1mnew file mode 100644[m
[1mindex 0000000..f68a70d[m
[1m--- /dev/null[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/model/respon/Status.java[m
[36m@@ -0,0 +1,4 @@[m
[32m+[m[32mpackage del.be_inv_mgt.model.respon;[m
[32m+[m
[32m+[m[32mpublic enum Status {[m
[32m+[m[32m}[m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/EmployeeServiceImpl.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/EmployeeServiceImpl.java[m
[1mindex 25d0d72..ee65f0a 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/EmployeeServiceImpl.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/EmployeeServiceImpl.java[m
[36m@@ -8,6 +8,8 @@[m [mimport del.be_inv_mgt.service.EmployeeService;[m
 import org.springframework.beans.factory.annotation.Autowired;[m
 import org.springframework.stereotype.Service;[m
 [m
[32m+[m[32mimport java.time.LocalDateTime;[m
[32m+[m[32mimport java.time.format.DateTimeFormatter;[m
 import java.util.List;[m
 [m
 @Service[m
[36m@@ -52,6 +54,8 @@[m [mpublic class EmployeeServiceImpl implements EmployeeService {[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[32m+[m[32m        employeeNew.setEmployeeID("emp_"+getDate());[m
[32m+[m
         return employeeRepository.save(employeeNew);[m
     }[m
 [m
[36m@@ -98,4 +102,13 @@[m [mpublic class EmployeeServiceImpl implements EmployeeService {[m
         return true;[m
 [m
     }[m
[32m+[m
[32m+[m[32m    static String getDate(){[m
[32m+[m[32m        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");[m
[32m+[m[32m        LocalDateTime now = LocalDateTime.now();[m
[32m+[m
[32m+[m[32m        String dateTimeNow = dtf.format(now);[m
[32m+[m
[32m+[m[32m        return dateTimeNow;[m
[32m+[m[32m    }[m
 }[m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/InventoryServiceImpl.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/InventoryServiceImpl.java[m
[1mindex 0822f16..59dab43 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/InventoryServiceImpl.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/InventoryServiceImpl.java[m
[36m@@ -8,6 +8,8 @@[m [mimport del.be_inv_mgt.service.InventoryService;[m
 import org.springframework.beans.factory.annotation.Autowired;[m
 import org.springframework.stereotype.Service;[m
 [m
[32m+[m[32mimport java.time.LocalDateTime;[m
[32m+[m[32mimport java.time.format.DateTimeFormatter;[m
 import java.util.List;[m
 [m
 @Service[m
[36m@@ -51,6 +53,8 @@[m [mpublic class InventoryServiceImpl implements InventoryService {[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[32m+[m[32m        inventoryNew.setCode("inv_"+getDate());[m
[32m+[m
         return inventoryRepository.save(inventoryNew);[m
     }[m
 [m
[36m@@ -96,5 +100,14 @@[m [mpublic class InventoryServiceImpl implements InventoryService {[m
         return inventoryRepository.deleteByCodeEquals(code);[m
 [m
     }[m
[32m+[m
[32m+[m[32m    static String getDate(){[m
[32m+[m[32m        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");[m
[32m+[m[32m        LocalDateTime now = LocalDateTime.now();[m
[32m+[m
[32m+[m[32m        String dateTimeNow = dtf.format(now);[m
[32m+[m
[32m+[m[32m        return dateTimeNow;[m
[32m+[m[32m    }[m
 }[m
 [m
[1mdiff --git a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/SupervisorServiceImpl.java b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/SupervisorServiceImpl.java[m
[1mindex 4930417..415a7bf 100644[m
[1m--- a/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/SupervisorServiceImpl.java[m
[1m+++ b/be_inv_mgt/src/main/java/del/be_inv_mgt/service/impl/SupervisorServiceImpl.java[m
[36m@@ -8,6 +8,8 @@[m [mimport del.be_inv_mgt.service.SupervisorService;[m
 import org.springframework.beans.factory.annotation.Autowired;[m
 import org.springframework.stereotype.Service;[m
 [m
[32m+[m[32mimport java.time.LocalDateTime;[m
[32m+[m[32mimport java.time.format.DateTimeFormatter;[m
 import java.util.List;[m
 [m
 @Service[m
[36m@@ -42,6 +44,8 @@[m [mpublic class SupervisorServiceImpl implements SupervisorService {[m
             throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());[m
         }[m
 [m
[32m+[m[32m        supervisorNew.setSupervisorID("sup_"+getDate());[m
[32m+[m
         return supervisorRepository.save(supervisorNew);[m
     }[m
 [m
[36m@@ -71,4 +75,13 @@[m [mpublic class SupervisorServiceImpl implements SupervisorService {[m
         return supervisorRepository.deleteBySupervisorIDEquals(supervisorID);[m
 [m
     }[m
[32m+[m
[32m+[m[32m    static String getDate(){[m
[32m+[m[32m        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");[m
[32m+[m[32m        LocalDateTime now = LocalDateTime.now();[m
[32m+[m
[32m+[m[32m        String dateTimeNow = dtf.format(now);[m
[32m+[m
[32m+[m[32m        return dateTimeNow;[m
[32m+[m[32m    }[m
 }[m
