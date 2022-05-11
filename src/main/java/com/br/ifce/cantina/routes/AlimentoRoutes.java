package com.br.ifce.cantina.routes;

import java.util.List;

import javax.validation.Valid;

import com.br.ifce.cantina.models.Alimento;
import com.br.ifce.cantina.services.AlimentoServices;

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
@RequestMapping("/api/v1/alimentos")
@ResponseBody
public class AlimentoRoutes {
  @Autowired
  AlimentoServices alimentoServices;

  @GetMapping
  public List<Alimento> get() {
    return alimentoServices.listAll();
  }

  @PostMapping
  public Alimento post(@Valid @RequestBody Alimento alimento) {
    return alimentoServices.createAlimento(alimento);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Alimento> put(
      @PathVariable long id,
      @Valid @RequestBody Alimento alimento) {
    return alimentoServices.updateAlimento(id, alimento);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Alimento> delete(@PathVariable long id) {
    return alimentoServices.deleteAlimento(id);
  }
}
