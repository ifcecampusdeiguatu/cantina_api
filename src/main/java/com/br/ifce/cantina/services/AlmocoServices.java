package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ifce.cantina.models.Almoco;
import com.br.ifce.cantina.repository.AlmocoRepository;

@Service
public class AlmocoServices<almocoRepository> {
  @Autowired
  private AlmocoRepository almocoRepository;

  public List<Almoco> listAll() {
    return this.almocoRepository.findAll();
  }

  public Almoco createAlmoco(Almoco almoco) {
    return this.almocoRepository.save(almoco);
  }

  public ResponseEntity<Almoco> updateAlmoco(long id, @Valid Almoco almoco) {
    Optional<Almoco> almocoExists = this.almocoRepository.findById(id);

    if (!almocoExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    Almoco updateAlmoco = almocoExists.get();

    updateAlmoco.setId(id);
    updateAlmoco.setAcompanhamento(almoco.getAcompanhamento());
    updateAlmoco.setGuarnicao(almoco.getGuarnicao());
    updateAlmoco.setPrato_proteico(almoco.getPrato_proteico());
    updateAlmoco.setSobremesa(almoco.getSobremesa());
    updateAlmoco.setSalada(almoco.getSalada());

    this.almocoRepository.save(updateAlmoco);

    return new ResponseEntity<Almoco>(updateAlmoco, HttpStatus.OK);
  }

  public ResponseEntity<Almoco> deleteAlmoco(long id) {
    Optional<Almoco> almocoExists = this.almocoRepository.findById(id);

    if (!almocoExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    almocoRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
