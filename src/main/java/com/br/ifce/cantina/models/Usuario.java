package com.br.ifce.cantina.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false, length =145)
  private String nome;
  
  @Column(nullable = false, length = 45)
  private String matricula;
  
  @Column(nullable = false, length = 255)
  private String senha;
  

public Usuario(Long id, String nome, String matricula, String senha) {
	this.id = id;
	this.nome = nome;
	this.matricula = matricula;
	this.senha = senha;
}

public Usuario() {
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getNome() {
	return nome;
}

public void setNome(String nome) {
	this.nome = nome;
}

public String getMatricula() {
	return matricula;
}

public void setMatricula(String matricula) {
	this.matricula = matricula;
}

public String getSenha() {
	return senha;
}

public void setSenha(String senha) {
	this.senha = senha;
}



  
  
  
  //@Column(nullable = false, length = 45)
  //private String turma;
  
  
  
  
}
