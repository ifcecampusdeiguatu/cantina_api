package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ifce.cantina.models.LancheTarde;
import com.br.ifce.cantina.repository.LancheTardeRepository;

@Service
public class LancheTardeServices {

  @Autowired
  private LancheTardeRepository lanchetardeRepository;

  public List<LancheTarde> listAll() {
    return this.lanchetardeRepository.findAll();
  }

  public LancheTarde createLancheTarde(LancheTarde lanchetarde) {
    return this.lanchetardeRepository.save(lanchetarde); 
  }

  public ResponseEntity<LancheTarde> updateLancheTarde(long id, @Valid LancheTarde lanchetarde) {
    Optional<LancheTarde> lanchetardeExists = ((CrudRepository<LancheTarde, Long>) this.lanchetardeRepository)
        .findById(id);

    if (!lanchetardeExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    LancheTarde updateLancheTarde = lanchetardeExists.get();

    updateLancheTarde.setId(id);
    updateLancheTarde.setAlimento(lanchetarde.getAlimento());
    updateLancheTarde.setBebidas(lanchetarde.getBebidas()); 
    ((CrudRepository<LancheTarde, Long>) this.lanchetardeRepository).save(updateLancheTarde);

    return new ResponseEntity<LancheTarde>(updateLancheTarde, HttpStatus.OK);
  }

  public ResponseEntity<LancheTarde> deleteLancheTarde(long id) {
    Optional<LancheTarde> lanchetardeExists = ((CrudRepository<LancheTarde, Long>) this.lanchetardeRepository)
        .findById(id);

    if (!lanchetardeExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    ((CrudRepository<LancheTarde, Long>) lanchetardeRepository).deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }
}
