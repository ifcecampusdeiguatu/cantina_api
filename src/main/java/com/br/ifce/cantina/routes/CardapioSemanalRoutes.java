package com.br.ifce.cantina.routes;

import com.br.ifce.cantina.models.CardapioSemanal;
import com.br.ifce.cantina.services.CardapioSemanalServices;
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

@Controller
@RequestMapping("/api/v1/cardapiosemanal")
@ResponseBody
public class CardapioSemanalRoutes {
	@Autowired
	  CardapioSemanalServices cardapiosemanalServices;

	  @GetMapping
	  public List<CardapioSemanal> get() {
	    return cardapiosemanalServices.listAll();
	  }

	  @PostMapping
	  public CardapioSemanal post(@Valid @RequestBody CardapioSemanal cardapiosemanal) {
	    return cardapiosemanalServices.createCardapioMensal(cardapiosemanal);
	  }

	  @PutMapping("/{id}")
	  public ResponseEntity<CardapioSemanal> put(
	      @PathVariable long id,
	      @Valid @RequestBody CardapioSemanal cardapiosemanal) {
	    return cardapiosemanalServices.updateCardapioMensal(id, cardapiosemanal);
	  }

	  @DeleteMapping("/{id}")
	  public ResponseEntity<CardapioSemanal> delete(@PathVariable long id) {
	    return cardapiosemanalServices.deleteCardapioMensal(id);
	  }
	}

