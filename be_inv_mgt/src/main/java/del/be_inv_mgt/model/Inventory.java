package del.be_inv_mgt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

    @Data
@Document(collection = "inventory")
public class Inventory {
    @Id
    private String _id;

    @Indexed(unique = true)
    private String name;

    private String detail;

    private String image;

    private Double price;

    private int stock;

    public Inventory(){

    }

    public Inventory(String _name, String _detail,String _image, Double _price, int _stock){
        name = _name;
        detail = _detail;
        image = _image;
        price = _price;
        stock = _stock;
    }
}
