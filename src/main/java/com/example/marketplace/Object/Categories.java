package com.example.marketplace.Object;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "categories")
@Getter
@Setter
public class Categories{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String category_name;
    private String category_text;
}
