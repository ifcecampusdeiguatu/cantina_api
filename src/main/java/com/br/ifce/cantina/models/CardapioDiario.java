package com.br.ifce.cantina.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "cardapio_diario")
public class CardapioDiario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Temporal(TemporalType.TIMESTAMP)
  private Date data;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_almoco")
  private Almoco almoco;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_lanche_noite")
  @JsonIgnore
  private LancheNoite lancheNoite;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_lanche_manha")
  private LancheManha lancheManha;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_lanche_tarde")
  private LancheTarde lancheTarde;

  @ManyToMany
  @JoinTable(name = "cardapio_diario_has_cardapio_semanal", uniqueConstraints = @UniqueConstraint(columnNames = {
      "id_cardapio_diario",
      "id_cardapio_semanal" }), joinColumns = @JoinColumn(name = "id_cardapio_diario"), inverseJoinColumns = @JoinColumn(name = "id_cardapio_semanal"))
  private Set<CardapioSemanal> cardapiosSemanais = new HashSet<>();
}
