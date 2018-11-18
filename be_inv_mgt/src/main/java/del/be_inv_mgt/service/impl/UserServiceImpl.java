package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.model.User;
import del.be_inv_mgt.repository.UserRepository;
import del.be_inv_mgt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    public User getUserById(String userId){
        return userRepository.findBy_id(userId);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User updateUserById(String empId, User user) {
        user.set_id(empId);
        userRepository.save(user);
        return user;
    }

    public int deleteUserById(String userId) {
        userRepository.deleteById(userId);
        return 1;
    }
}
