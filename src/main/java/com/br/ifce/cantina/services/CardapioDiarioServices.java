package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.br.ifce.cantina.models.CardapioDiario;
import com.br.ifce.cantina.repository.CardapioDiarioRepository;
@Service
public class CardapioDiarioServices {
	@Autowired
	private CardapioDiarioRepository cardapiodiarioRepository;

	  public List<CardapioDiario> listAll() {
	    return ((JpaRepository<CardapioDiario, Long>) this.cardapiodiarioRepository).findAll();
	  }

	  public CardapioDiario createCardapioDiario(CardapioDiario cardapiodiario) {
		  System.out.println(cardapiodiario.getData());
	    return this.cardapiodiarioRepository.save(cardapiodiario);
	  }

	  public ResponseEntity<CardapioDiario> updateCardapioDiario(long id, @Valid CardapioDiario cardapiodiario) {
	    Optional<CardapioDiario> cardapiodiarioExists = this.cardapiodiarioRepository.findById(id);

	    if (!cardapiodiarioExists.isPresent()) {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    CardapioDiario updateCardapioDiario = cardapiodiarioExists.get();

	    updateCardapioDiario.setId(id);
	    updateCardapioDiario.setData(cardapiodiario.getData());
	    updateCardapioDiario.setAlmoco(cardapiodiario.getAlmoco());
	    
	    this.cardapiodiarioRepository.save(updateCardapioDiario);

	    return new ResponseEntity<CardapioDiario>(updateCardapioDiario, HttpStatus.OK);
	  }

	  public ResponseEntity<CardapioDiario> deleteCardapioDiario(long id) {
	    Optional<CardapioDiario> cardapiodiairoExists = this.cardapiodiarioRepository.findById(id);

	    if (!cardapiodiairoExists.isPresent()) {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    cardapiodiarioRepository.deleteById(id);

	    return new ResponseEntity<>(HttpStatus.OK);
	  }
}
