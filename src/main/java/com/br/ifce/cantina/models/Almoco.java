package com.br.ifce.cantina.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Almoco {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 45)
  private String prato_proteico;

  @Column(nullable = false, length = 45)
  private String acompanhamento;

  @Column(nullable = false, length = 45)
  private String guarnicao;

  @Column(nullable = false, length = 45)
  private String salada;

  @Column(nullable = false, length = 45)
  private String sobremesa;

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getPrato_proteico() {
	return prato_proteico;
}

public void setPrato_proteico(String prato_proteico) {
	this.prato_proteico = prato_proteico;
}

public String getAcompanhamento() {
	return acompanhamento;
}

public void setAcompanhamento(String acompanhamento) {
	this.acompanhamento = acompanhamento;
}

public String getGuarnicao() {
	return guarnicao;
}

public void setGuarnicao(String guarnicao) {
	this.guarnicao = guarnicao;
}

public String getSalada() {
	return salada;
}

public void setSalada(String salada) {
	this.salada = salada;
}

public String getSobremesa() {
	return sobremesa;
}

public void setSobremesa(String sobremesa) {
	this.sobremesa = sobremesa;
}
  
}
