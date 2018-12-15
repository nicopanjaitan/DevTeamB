package del.be_inv_mgt.controller.addition;

import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.model.respon.Response;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(value = Exception.class)
    public Response globalException(Exception ex){
        return Response.builder()
                .code(ErrorCode.NOT_FOUND.getCode())
                .message(ErrorCode.NOT_FOUND.getMessage())
                .build();
    }
}
