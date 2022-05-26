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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.br.ifce.cantina.models.Alimento;
import com.br.ifce.cantina.models.Usuario;
import com.br.ifce.cantina.services.UsuarioServices;

@Controller
@RequestMapping("/api/v1/usuario")
@ResponseBody
public class UsuarioRoutes {
	
	@Autowired
	UsuarioServices usuarioServices;

	  @GetMapping
	  public List<Usuario> get() {
	    return usuarioServices.listAll();
	  }
	
	  @PostMapping
	  public Usuario post( @RequestBody Usuario usuario) {
	    return usuarioServices.createUsuario(usuario);
	  }
	  
	  @PostMapping("/login")
	  public ResponseEntity<Boolean> postLogin(@RequestBody Usuario usuario) {
		  return usuarioServices.realizarLogin(usuario);
	  }
	  
	  @DeleteMapping("/{id}")
	  public ResponseEntity<Usuario> delete(@PathVariable long id) {
	    return usuarioServices.deleteUsuario(id);
	  }

	  
}
