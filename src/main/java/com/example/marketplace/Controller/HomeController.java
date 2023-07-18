package com.example.marketplace.Controller;

import com.example.marketplace.Object.Role;
import com.example.marketplace.Object.User;
import com.example.marketplace.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Controller
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String homepage(Model model){
        return "home";
    }
    @GetMapping("/lk")
    public String lk(HttpServletRequest request, Model model){
        String username = request.getUserPrincipal().getName();
        User user = userRepository.findByUsername(username);
        String user_name = user.getName();
        String user_surname = user.getSurname();
        String user_email = user.getEmail();
        model.addAttribute("user_name", user_name);
        model.addAttribute("user", user);
        System.out.println(user);
        return "/lk";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/exit")
    public String exit(){return "exit";}
    @GetMapping("/reg")
    public String registration(){return "registration_form";}
    @PostMapping("/reg")
    public String addUser(@RequestParam String email, @RequestParam String name, @RequestParam String surname, @RequestParam String password, @RequestParam String confirmpassword){
        if(password.equals(confirmpassword)){
            if(userRepository.findByUsername(email) == null ){
                User user = new User();
                user.setName(name);
                user.setSurname(surname);
                user.setEmail(email);
                user.setUsername(email);
                user.setPassword(password);
                user.setActive(true);
                user.setRoles(Collections.singleton(Role.USER));
                userRepository.save(user);
                return "redirect:/login";
            }
        }
        return "redirect:/reg";
    }

//    @GetMapping("/lk_change")
//    public String changelk(Model model){
//        User user = new User();
//        user.getName();
//        return "lk_change";
//    }
}
