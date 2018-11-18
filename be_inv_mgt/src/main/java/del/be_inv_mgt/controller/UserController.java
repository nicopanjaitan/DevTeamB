package del.be_inv_mgt.controller;

import del.be_inv_mgt.model.User;
import del.be_inv_mgt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/inv_mgt/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/getById/{id}")
    public User getById(@PathVariable("id") String userId){
        return userService.getUserById(userId);
    }

    @PostMapping("/create")
    public User create(@Valid @RequestBody User user){
        return userService.createUser(user);
    }

    @PutMapping(value = "/updateById/{id}")
    public User updateById(@PathVariable("id") String invId, @Valid @RequestBody User user) {
        user.set_id(invId);
        userService.updateUserById(invId, user);
        return user;
    }

    @DeleteMapping("/deleteById/{id}")
    public int deleteById(@PathVariable("id") String userId) {
        userService.deleteUserById(userId);
        return 1;
    }
}
