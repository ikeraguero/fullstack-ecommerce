package com.shoppingsystem.shopping_system.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoryDTO {

    public CategoryDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    private int id;
    private String name;

}
