package com.br.ifce.cantina.routes;

import com.br.ifce.cantina.models.Alimento;
import com.br.ifce.cantina.models.LancheManha;
import com.br.ifce.cantina.services.LancheManhaServices;
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
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/api/v1/lanchemanha")
@ResponseBody
public class LancheManhaRoutes {
    @Autowired
  LancheManhaServices lanchemanhaServices;

  @GetMapping
  public List<LancheManha> get() {
    return lanchemanhaServices.listAll();
  }

  @PostMapping
  public LancheManha post(@Valid @RequestBody LancheManha lanchemanha) {
    return lanchemanhaServices.createLancheManha(lanchemanha);
  }

  @PutMapping("/{id}")
  public ResponseEntity<LancheManha> put(
      @PathVariable long id,
      @Valid @RequestBody LancheManha lanchemanha) {
    return lanchemanhaServices.updateLancheManha(id, lanchemanha);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<LancheManha> delete(@PathVariable long id) {
    return lanchemanhaServices.deleteLancheManha(id);
  }

  @PostMapping(value="/{id}/alimento")
  public ResponseEntity<Alimento> postMethodName(
    @PathVariable long id,
    @RequestBody Alimento alimento) {
      return lanchemanhaServices.addAlimento(id, alimento);
  }
  
}
