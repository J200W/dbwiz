package com.j200w.dbwiz.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse {
    private String message;
    private Integer statusCode;
    private String name;
    private String schema;
}
