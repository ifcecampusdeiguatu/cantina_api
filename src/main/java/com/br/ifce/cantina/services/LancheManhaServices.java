package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
public class LancheManhaServices<LancheManha> {

	@Autowired
	  private LancheManha lancheManhaRepository;

	  public List<LancheManha> listAll() {
	    return this.lancheManhaRepository.findAll();
	  }

	  public LacheManhacreateLancheManha(lancheManha lanchemanha) {
	    return this.lancheManhaRepository.save(lancheManha);
	  }

	  public ResponseEntity<LancheManha> updateLancheManha(long id, @Valid LancheManha lancheManha) {
	    Optional<LancheManha> lancheManhaExists = this.lancheManhaRepository.findById(id);

	    if (!lancheManhaExists.isPresent()) {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    LancheManhaServices updateLancheManha = lancheManhaExists.get();

	    updateLancheManha.setId(id);
	    updateLancheManha.setCategoria(lancheManha.getCategoria());

	    this.lancheManhaRepository.save(updateLancheManha);

	    return new ResponseEntity<LancheManha>(updateLancheManha, HttpStatus.OK);
	  }

	  
	  public ResponseEntity<LancheManha> deleteLancheManha(long id) {
	    Optional<LancheManha>lancheManhaExists = this.lancheManhaRepository.findById(id);

	    if (!lancheManhaExists.isPresent()) {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    lancheManhaRepository.deleteById(id);

	    return new ResponseEntity<>(HttpStatus.OK);
	  }
	}


