package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ifce.cantina.models.LancheNoite;
import com.br.ifce.cantina.repository.LancheNoiteRepository;

@Service
public class LancheNoiteServices {
  @Autowired
  private LancheNoiteRepository lancheNoiteRepository;

  public List<LancheNoite> listAll() {
    return this.lancheNoiteRepository.findAll();
  }

  public LancheNoite createLanche(LancheNoite lancheNoite) {
    return this.lancheNoiteRepository.save(lancheNoite);
  }

  public ResponseEntity<LancheNoite> updateLancheNoite(long id, @Valid LancheNoite lancheNoite) {
    Optional<LancheNoite> lancheNoiteExists = this.lancheNoiteRepository.findById(id);

    if (!lancheNoiteExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    LancheNoite updateLancheNoite = lancheNoiteExists.get();

    updateLancheNoite.setId(id);
    updateLancheNoite.setAlimento(lancheNoite.getAlimento());
    updateLancheNoite.setBebidas(lancheNoite.getBebidas());
    this.lancheNoiteRepository.save(updateLancheNoite);

    return new ResponseEntity<LancheNoite>(updateLancheNoite, HttpStatus.OK);
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

  public ResponseEntity<LancheNoite> deleteLancheNoite(long id) {
    Optional<LancheNoite> lancheNoiteExists = this.lancheNoiteRepository.findById(id);

    if (!lancheNoiteExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    lancheNoiteRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }
}
