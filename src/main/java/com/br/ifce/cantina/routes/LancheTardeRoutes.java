package com.br.ifce.cantina.routes;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.br.ifce.cantina.models.Alimento;
import com.br.ifce.cantina.models.LancheTarde;
import com.br.ifce.cantina.services.AlimentoServices;
import com.br.ifce.cantina.services.LancheTardeServices;

@Controller
@RequestMapping("/api/v1/lanchetarde")
@ResponseBody
public class LancheTardeRoutes {
	  @Autowired
	  LancheTardeServices lancheServices;
	  			
	  @GetMapping
	  public List<LancheTarde> get() {
	    return lancheServices.listAll();
	  }
	  
	  @PostMapping
	  public LancheTarde post(@Valid @RequestBody LancheTarde lanche) {
	    return lancheServices.createLancheTarde(lanche);
}
} 