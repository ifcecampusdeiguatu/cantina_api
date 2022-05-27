package com.br.ifce.cantina;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//Exclui a segurança
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)

@EntityScan(basePackages = {
    "com.br.ifce.cantina.models"
})
@EnableJpaRepositories(basePackages = {
    "com.br.ifce.cantina.repository"
})

@SpringBootApplication
public class CantinaApplication {

  public static void main(String[] args) {
    SpringApplication.run(CantinaApplication.class, args);
  }

  @Bean
  public PasswordEncoder getPasswordEncoder() {
	  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	  return encoder;  
	  }
}
