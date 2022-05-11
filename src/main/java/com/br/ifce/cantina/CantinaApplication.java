package com.br.ifce.cantina;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {
    "com.br.ifce.cantina.models"
})
@EnableJpaRepositories(basePackages = {
    "com.br.ifce.cantina.repository"
})
public class CantinaApplication {

  public static void main(String[] args) {
    SpringApplication.run(CantinaApplication.class, args);
  }

}
