package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.br.ifce.cantina.models.CardapioMensal;

@Service
public class CardapioMensalServices {

  @Autowired

  private JpaRepository<CardapioMensal, Long> cardapiomensalRepository;

  public List<CardapioMensal> listAll() {
    return ((JpaRepository<CardapioMensal, Long>) this.cardapiomensalRepository).findAll();
  }

  public CardapioMensal createCardapioMensal(CardapioMensal cardapiomensal) {
    return this.cardapiomensalRepository.save(cardapiomensal);
  }

  public ResponseEntity<CardapioMensal> updateCardapioMensal(long id, @Valid CardapioMensal cardapiomensal) {
    Optional<CardapioMensal> cardapiomensalExists = this.cardapiomensalRepository.findById(id);

    if (!cardapiomensalExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    CardapioMensal updateCardapioMensal = cardapiomensalExists.get();

    updateCardapioMensal.setId(id);

    this.cardapiomensalRepository.save(updateCardapioMensal);

    return new ResponseEntity<CardapioMensal>(updateCardapioMensal, HttpStatus.OK);
  }

  public ResponseEntity<CardapioMensal> deleteCardapioMensal(long id) {
    Optional<CardapioMensal> cardapiomensalExists = this.cardapiomensalRepository.findById(id);

    if (!cardapiomensalExists.isPresent()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    cardapiomensalRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
