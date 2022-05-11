package com.br.ifce.cantina.repository;

import com.br.ifce.cantina.models.Alimento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlimentosRepository extends JpaRepository<Alimento, Long> {

}
