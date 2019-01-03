package del.be_inv_mgt.controller.addition;

import del.be_inv_mgt.model.respon.Response;


public abstract class GlobalController {
    public  <T> Response toResponse(T value){
        return Response.builder()
                .code("200")
                .message("Success")
                .data(value)
                .build();
    }

}
