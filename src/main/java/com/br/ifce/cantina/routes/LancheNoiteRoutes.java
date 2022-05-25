package com.br.ifce.cantina.routes;
import com.br.ifce.cantina.models.LancheNoite;
import com.br.ifce.cantina.services.LancheNoiteServices;
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
@RequestMapping("/api/v1/lanchenoite")
@ResponseBody
public class LancheNoiteRoutes {
    @Autowired
  LancheNoiteServices lanchenoiteServices;

  @GetMapping
  public List<LancheNoite> get() {
    return lanchenoiteServices.listAll();
  }

  @PostMapping
  public LancheNoite post(@Valid @RequestBody LancheNoite lanchenoite) {
    return lanchenoiteServices.createLanche(lanchenoite);
  }

  @PutMapping("/{id}")
  public ResponseEntity<LancheNoite> put(
      @PathVariable long id,
      @Valid @RequestBody LancheNoite lanchenoite) {
    return lanchenoiteServices.updateLancheNoite(id, lanchenoite);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<LancheNoite> delete(@PathVariable long id) {
    return lanchenoiteServices.deleteLancheNoite(id);
  }
}


