package com.br.ifce.cantina.services;

import com.br.ifce.cantina.repository.AlimentosRepository;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.br.ifce.cantina.models.Alimento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AlimentoServices {
  @Autowired
  private AlimentosRepository alimentosRepository;

  public List<Alimento> listAll() {
    return this.alimentosRepository.findAll();
  }

  public Alimento createAlimento(Alimento alimento) {   return this.alimentosRepository.save(alimento);
  }

  public ResponseEntity<Alimento> updateAlimento(long id, @Valid Alimento alimento) {
    Optional<Alimento> alimentoExists = this.alimentosRepository.findById(id);

    if (!alimentoExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    Alimento updateAlimento = alimentoExists.get();

    updateAlimento.setId(id);
    updateAlimento.setCategoria(alimento.getCategoria());

    this.alimentosRepository.save(updateAlimento);

    return new ResponseEntity<Alimento>(updateAlimento, HttpStatus.OK);
  }

  /**
   * Método deve retornar apenas o status code.
   * -------
   * Todo:
   * - Alterar o tipo do retorno.
   * 
   * @param id
   * @return
   */
  public ResponseEntity<Alimento> deleteAlimento(long id) {
    Optional<Alimento> alimentoExists = this.alimentosRepository.findById(id);

    if (!alimentoExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    alimentosRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }
}
