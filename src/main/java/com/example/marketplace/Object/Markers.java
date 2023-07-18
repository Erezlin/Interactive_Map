package com.example.marketplace.Object;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "markers")
@Getter
@Setter
public class Markers{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Double pos_x, pos_y;
    private String text;

    private String user_id;
    private String category;
    private Integer status;
    private Boolean help_type;
}
