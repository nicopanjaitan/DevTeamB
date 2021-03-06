package del.be_inv_mgt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "supervisor")
public class Supervisor{
    @Id
    private String id;

    @Indexed(unique = true)
    private String supervisorID;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String password;
}
