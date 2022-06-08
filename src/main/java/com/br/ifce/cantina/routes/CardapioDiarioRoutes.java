package com.br.ifce.cantina.routes;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.br.ifce.cantina.models.CardapioDiario;
import com.br.ifce.cantina.services.CardapioDiarioServices;


@Controller
@RequestMapping("/api/v1/CardapioDiario")
@ResponseBody
public class CardapioDiarioRoutes {
	@Autowired
	  CardapioDiarioServices cardapiodiarioServices;

	  @GetMapping
	  public List<CardapioDiario> get() {
	    return cardapiodiarioServices.listAll();
	  }

	  @PostMapping
	  public CardapioDiario post(@Valid @RequestBody CardapioDiario cardapiodiario) {
	    return cardapiodiarioServices.createCardapioDiario(cardapiodiario);
	  }

	  @PutMapping("/{id}")
	  public ResponseEntity<CardapioDiario> put(
	      @PathVariable long id,
	      @Valid @RequestBody CardapioDiario cardapiodiario) {
	    return cardapiodiarioServices.updateCardapioDiario(id, cardapiodiario);
	  }

	  @DeleteMapping("/{id}")
	  public ResponseEntity<CardapioDiario> delete(@PathVariable long id) {
	    return cardapiodiarioServices.deleteCardapioDiario(id);
	  }
}
