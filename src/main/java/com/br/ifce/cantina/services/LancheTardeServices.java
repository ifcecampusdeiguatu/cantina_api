package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.br.ifce.cantina.models.LancheTarde;

public class LancheTardeServices<LancheTardeRepository> {

  @Autowired
  private LancheTardeRepository lanchetardeRepository;

  public List<LancheTarde> listAll() {
    return ((JpaRepository<LancheTarde, Long>) this.lanchetardeRepository).findAll();
  }

  public LancheTarde createLancheTarde(LancheTarde lanchetarde) {
    return null;
  }

  public ResponseEntity<LancheTarde> updateLancheTarde(long id, @Valid LancheTarde lanchetarde) {
    Optional<LancheTarde> lanchetardeExists = ((CrudRepository<LancheTarde, Long>) this.lanchetardeRepository)
        .findById(id);

    if (!lanchetardeExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    LancheTarde updateLancheTarde = lanchetardeExists.get();

    updateLancheTarde.setId(id);

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
