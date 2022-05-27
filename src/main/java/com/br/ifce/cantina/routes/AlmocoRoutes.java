package com.br.ifce.cantina.routes;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.br.ifce.cantina.models.Alimento;
import com.br.ifce.cantina.models.Almoco;
import com.br.ifce.cantina.models.LancheTarde;
import com.br.ifce.cantina.services.AlmocoServices;
import com.br.ifce.cantina.services.LancheTardeServices; 

	@Controller
	@RequestMapping("/api/v1/almoco")
	@ResponseBody
	public class AlmocoRoutes {
		  @Autowired
		  AlmocoServices almocoServices;
		  			
		  @GetMapping
		  public List<Almoco> get() {
		    return almocoServices.listAll();
		  }
		  
		  @PostMapping
		  public Almoco post(@Valid @RequestBody Almoco almoco) {
		      return almocoServices.createAlmoco(almoco);
		  }
		   @PutMapping("/{id}")
           public ResponseEntity<Almoco> put(
		     @PathVariable long id,
		     @Valid @RequestBody Almoco almoco) {
		     return almocoServices.updateAlmoco(id, almoco);
		      }
	}