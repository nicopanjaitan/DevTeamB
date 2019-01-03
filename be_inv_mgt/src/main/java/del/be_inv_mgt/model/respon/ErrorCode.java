package del.be_inv_mgt.model.respon;

public enum ErrorCode {
    BAD_REQUEST("400", "Bad Request Error"),
    NOT_FOUND("404", "Not Found Error"),
    SERVER_ERROR("500", "Internal Server Error"),
    OK("200", "Success");

    private String code;
    private String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
