package del.be_inv_mgt.model.respon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Response <T> {
    private String code;
    private String message;
    private  T data;
}
