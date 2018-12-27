package del.be_inv_mgt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "form_request")
public class FormRequest {
    @Id
    private String id;

    @Indexed(unique = true)
    private String requestID;

    private String inventoryID;

    private String employeeID;

    private String supervisorID;

    private int qtyRequest;

    private String destination;

    private String dateRequest;

    private String dateReceived;

    private String status;

}
