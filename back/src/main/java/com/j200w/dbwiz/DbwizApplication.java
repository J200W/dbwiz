package com.j200w.dbwiz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.j200w.dbwiz.model")
public class DbwizApplication {

	public static void main(String[] args) {
		SpringApplication.run(DbwizApplication.class, args);
	}

}
