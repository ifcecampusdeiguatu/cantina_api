package com.br.ifce.cantina.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Data
@Entity
public class Alimento {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 145)
  private String nome;
  
  public String getNome() {
	return nome;
}

public void setNome(String nome) {
	this.nome = nome;
}

@Column(nullable = false, length = 45)
  private String categoria;
  
  
  @ManyToMany
  @JoinTable(name = "lanche_tarde_has_alimento", uniqueConstraints = @UniqueConstraint(columnNames = { "id_alimento",
      "id_lanche_tarde" }), joinColumns = @JoinColumn(name = "id_alimento"), inverseJoinColumns = @JoinColumn(name = "id_lanche_tarde"))
  private Set<LancheNoite> lanchesTarde = new HashSet<>();

  @ManyToMany
  @JoinTable(name = "lanche_manha_has_alimento", uniqueConstraints = @UniqueConstraint(columnNames = { "id_alimento",
      "id_lanche_manha" }), joinColumns = @JoinColumn(name = "id_alimento"), inverseJoinColumns = @JoinColumn(name = "id_lanche_manha"))
  private Set<LancheManha> lanchesManhas = new HashSet<>();

  @ManyToMany
  @JoinTable(name = "lanche_noite_has_alimento", uniqueConstraints = @UniqueConstraint(columnNames = { "id_alimento",
      "id_lanche_noite" }), joinColumns = @JoinColumn(name = "id_alimento"), inverseJoinColumns = @JoinColumn(name = "id_lanche_noite"))
  private Set<LancheNoite> lanchesNoites = new HashSet<>();

  @ManyToMany
  @JoinTable(name = "almoco_has_alimento", uniqueConstraints = @UniqueConstraint(columnNames = { "id_alimento",
      "id_almoco" }), joinColumns = @JoinColumn(name = "id_alimento"), inverseJoinColumns = @JoinColumn(name = "id_almoco"))
  private Set<Almoco> almocos = new HashSet<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCategoria() {
    return categoria;
  }

  public void setCategoria(String categoria) {
    this.categoria = categoria;
  }
}
