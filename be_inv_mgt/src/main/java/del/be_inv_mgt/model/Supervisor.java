package del.be_inv_mgt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "supervisor")
public class Supervisor {
    @Id
    private String _id;
}
