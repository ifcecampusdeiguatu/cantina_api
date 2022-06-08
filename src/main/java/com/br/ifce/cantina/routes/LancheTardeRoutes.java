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
import com.br.ifce.cantina.models.Almoco;
import com.br.ifce.cantina.models.LancheTarde;
import com.br.ifce.cantina.services.AlimentoServices;
import com.br.ifce.cantina.services.LancheTardeServices;

@Controller
@RequestMapping("/api/v1/lanchetarde")
@ResponseBody
public class LancheTardeRoutes {
	  @Autowired
	  LancheTardeServices lanchetardeServices;
	  			
	  @GetMapping
	  public List<LancheTarde> get() {
	    return lanchetardeServices.listAll();
	  }
	  
	  @PostMapping
	  public LancheTarde post(@Valid @RequestBody LancheTarde lanche) {
	    return lanchetardeServices.createLancheTarde(lanche);
}

      @PutMapping("/{id}")
      public ResponseEntity<LancheTarde> put(
      @PathVariable long id,
      @Valid @RequestBody LancheTarde lanchetarde) {
      return lanchetardeServices.updateLancheTarde(id, lanchetarde); 
    }
      
      @DeleteMapping("/{id}")
      public ResponseEntity<LancheTarde> delete(@PathVariable long id) {
        return lanchetardeServices.deleteLancheTarde(id);
   }
} 	   
