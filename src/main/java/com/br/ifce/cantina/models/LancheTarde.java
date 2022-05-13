package com.br.ifce.cantina.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Data
@Entity
@Table(name = "lanche_tarde")
public class LancheTarde {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 45)
  private String alimento;

  @Column(nullable = false, length = 45)
  private String bebidas;

  @ManyToMany
  @JoinTable(name = "lanche_tarde_has_alimento", uniqueConstraints = @UniqueConstraint(columnNames = { "id_alimento",
      "id_lanche_tarde" }), joinColumns = @JoinColumn(name = "id_lanche_tarde"), inverseJoinColumns = @JoinColumn(name = "id_alimento"))
  private Set<Alimento> alimentos;

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
