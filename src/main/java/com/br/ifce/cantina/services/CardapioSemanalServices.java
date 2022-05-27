package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ifce.cantina.models.CardapioSemanal;

@Service
public class CardapioSemanalServices {

  @Autowired

  private JpaRepository<CardapioSemanal, Long> cardapiomensalRepository;

  public List<CardapioSemanal> listAll() {
    return ((JpaRepository<CardapioSemanal, Long>) this.cardapiomensalRepository).findAll();
  }

  public CardapioSemanal createCardapioMensal(CardapioSemanal cardapiomensal) {
    return this.cardapiomensalRepository.save(cardapiomensal);
  }

  public ResponseEntity<CardapioSemanal> updateCardapioMensal(long id, @Valid CardapioSemanal cardapiomensal) {
    Optional<CardapioSemanal> cardapiomensalExists = this.cardapiomensalRepository.findById(id);

    if (!cardapiomensalExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    CardapioSemanal updateCardapioMensal = cardapiomensalExists.get();

    updateCardapioMensal.setId(id);
    updateCardapioMensal.setPeriodo(cardapiomensal.getPeriodo());

    this.cardapiomensalRepository.save(updateCardapioMensal);

    return new ResponseEntity<CardapioSemanal>(updateCardapioMensal, HttpStatus.OK);
  }

  public ResponseEntity<CardapioSemanal> deleteCardapioMensal(long id) {
    Optional<CardapioSemanal> cardapiomensalExists = this.cardapiomensalRepository.findById(id);

    if (!cardapiomensalExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    cardapiomensalRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
