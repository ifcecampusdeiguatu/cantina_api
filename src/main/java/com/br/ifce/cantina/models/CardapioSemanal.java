package com.br.ifce.cantina.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Data
@Entity
@Table(name = "cardapio_semanal")
public class CardapioSemanal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 45)
  private String periodo;

  @ManyToMany
  @JoinTable(name = "cardapio_diario_has_cardapio_semanal", uniqueConstraints = @UniqueConstraint(columnNames = {
      "id_cardapio_diario",
      "id_cardapio_semanal" }), joinColumns = @JoinColumn(name = "id_cardapio_semanal"), inverseJoinColumns = @JoinColumn(name = "id_cardapio_diario"))
  private Set<CardapioDiario> cardapiosDiarios = new HashSet<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPeriodo() {
    return periodo;
  }

  public void setPeriodo(String periodo) {
    this.periodo = periodo;
  }
}
