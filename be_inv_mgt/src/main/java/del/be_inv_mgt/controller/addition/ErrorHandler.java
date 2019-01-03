package del.be_inv_mgt.controller.addition;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.model.respon.Response;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.io.IOException;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public Response resourceNotFoundException(ResourceNotFoundException ex){
        return Response.builder()
                .code(ex.getCode())
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler(value = IOException.class)
    public Response eException(IOException ex){
        return Response.builder()
                .code("300")
                .message("Salah bos")
                .build();
    }

    @ExceptionHandler(value = Exception.class)
    public Response unknownException(Exception ex){
        return Response.builder()
                .code(ErrorCode.SERVER_ERROR.getCode())
                .message(ErrorCode.SERVER_ERROR.getMessage())
                .build();
    }


}
