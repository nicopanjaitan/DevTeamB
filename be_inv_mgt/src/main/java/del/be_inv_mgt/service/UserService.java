package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Users;

import java.util.List;

public interface UserService {
    List<Users> getAllUser();

//    Users getUserById(String userId);

    Users createUser(Users users);
//
//    Users updateUserById(String userId, Users user);
//
//    int deleteUserById(String userId);
}
