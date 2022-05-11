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
}
