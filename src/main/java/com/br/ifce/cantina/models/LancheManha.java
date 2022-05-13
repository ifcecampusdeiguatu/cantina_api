package com.br.ifce.cantina.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.persistence.JoinColumn;

import lombok.Data;

@Entity
@Table(name = "lanche_manha")
@Data
public class LancheManha {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 45)
  private String alimento;

  @Column(nullable = false, length = 45)
  private String bebidas;

  @ManyToMany
  @JoinTable(name = "lanche_manha_has_alimento", uniqueConstraints = @UniqueConstraint(columnNames = { "id_alimento",
      "id_lanche_manha" }), joinColumns = @JoinColumn(name = "id_lanche_manha"), inverseJoinColumns = @JoinColumn(name = "id_alimento"))
  private Set<Alimento> alimentos;

  @OneToMany(mappedBy = "lancheManha", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private Set<CardapioDiario> cardapiosDiario = new HashSet<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getAlimento() {
    return alimento;
  }

  public void setAlimento(String alimento) {
    this.alimento = alimento;
  }

  public String getBebidas() {
    return bebidas;
  }

  public void setBebidas(String bebidas) {
    this.bebidas = bebidas;
  }

}
