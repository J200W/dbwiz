package com.j200w.dbwiz.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;

@Data
public class BuildRequest {

    @NotBlank
    private String description;

    @NotBlank
    private String constraint;

    @NotBlank
    private String language;
}
