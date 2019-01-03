package del.be_inv_mgt.controller;

import del.be_inv_mgt.model.Users;
import del.be_inv_mgt.model.respon.Response;
import del.be_inv_mgt.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inv_mgt/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/log/{username}")
    public UserDetails getById(@PathVariable String username){
        return userService.loadUserByUsername(username);
    }


//
//    @GetMapping("/getById/{id}")
//    public Users getById(@PathVariable("id") String userId){
//        return userService.getUserById(userId);
//    }
//
//    @PostMapping("/create")
//    public Users create(@Valid @RequestBody Users user){
//        return userService.createUser(user);
//    }
//
//    @PutMapping(value = "/updateById/{id}")
//    public Users updateById(@PathVariable("id") String invId, @Valid @RequestBody Users user) {
//        user.set_id(invId);
//        userService.updateUserById(invId, user);
//        return user;
//    }
//
//    @DeleteMapping("/deleteById/{id}")
//    public int deleteById(@PathVariable("id") String userId) {
//        userService.deleteUserById(userId);
//        return 1;
//    }
}
