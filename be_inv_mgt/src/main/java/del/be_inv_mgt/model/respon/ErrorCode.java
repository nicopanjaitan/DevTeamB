package del.be_inv_mgt.model.respon;

public enum ErrorCode {
    NOT_FOUND("404", "Not Found"),
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
