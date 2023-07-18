package com.example.marketplace.Controller;

import com.example.marketplace.Object.Markers;
import com.example.marketplace.Object.User;
import com.example.marketplace.Repository.MarkersRepository;
import com.example.marketplace.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Map;

@RestController
public class MapController {
    @Autowired
    private MarkersRepository markersRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/map/getpoint")
    public ArrayList<Markers> getpoint(){

        ArrayList<Markers> markersArrayList=markersRepository.findAllByStatus(0);
        return markersArrayList;
    }

    @PostMapping("/")
    public ModelAndView addMarker(@RequestParam String category, @RequestParam String text,@RequestParam Double pos_x,@RequestParam Double pos_y, HttpServletRequest request){
        String username = request.getUserPrincipal().getName();
        Markers markers = new Markers();
        markers.setStatus(0);
        markers.setText(text);
        markers.setPos_x(pos_x);
        markers.setPos_y(pos_y);
        markers.setUser_id(username);
        markers.setCategory(category);
        markersRepository.save(markers);
        ModelAndView modelAndView = new ModelAndView("home");
        return modelAndView;
    }
}
