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

import com.br.ifce.cantina.models.Alimento;
import com.br.ifce.cantina.models.LancheManha;
import com.br.ifce.cantina.services.AlimentoServices;
import com.br.ifce.cantina.services.LancheManhaServices;

@Controller
@RequestMapping("/api/v1/lanchemanha")
@ResponseBody
public class LancheManhaRoutes {
	@Autowired
	  AlimentoServices lanchemanhaServices;

	  @GetMapping
	  public List<LancheManha> get() {
	    return (List<LancheManha>) lanchemanhaServices.listAll();
	  }	  
}
	 