package del.be_inv_mgt.exception;

public class ResourceNotFoundException extends RuntimeException{
    private String code;
    private String message;

    public ResourceNotFoundException(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
