package com.br.ifce.cantina.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

public class LancheNoite {
	@Data
	@Entity
	public class lanche_manha {
		 @Id
		  @GeneratedValue(strategy = GenerationType.IDENTITY)
		  private Long id;

		  @Column(nullable = false, length = 45)
		  private String alimento;
		  
		  @Column(nullable = false, length = 45)
		  private String bebidas;

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
}
