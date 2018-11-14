package del.be_inv_mgt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "request")
public class FormRequest {
    @Id
    private String id;

    private Inventory invId;

    private Employee empId;

    private int qtyRequest;

    private String destination;

    private Date dateRequest;

    private Date dateReceived;

}
