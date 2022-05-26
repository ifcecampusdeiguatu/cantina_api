package com.br.ifce.cantina.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.br.ifce.cantina.models.Usuario;
import com.br.ifce.cantina.models.Usuario;
import com.br.ifce.cantina.repository.UsuarioRepository;

@Service
public class UsuarioServices {

	 @Autowired
	 private UsuarioRepository usuarioRepository;
	 @Autowired
	 private PasswordEncoder encoder;
	 
	 public List<Usuario> listAll() {
	    return this.usuarioRepository.findAll();
	 }
	 
	 public Usuario createUsuario(Usuario usuario) {
		 System.out.println(usuario.getSenha());
		 usuario.setSenha(encoder.encode(usuario.getSenha()));
		 return this.usuarioRepository.save(usuario);
	 }
	 
	 public ResponseEntity<Boolean> realizarLogin(Usuario usuarioRequest){
		 Optional<Usuario> optusuario = usuarioRepository.findByMatricula(usuarioRequest.getMatricula());
		 if(optusuario.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		 }
		 Usuario usuario = optusuario.get();
		 boolean valid = encoder.matches(usuarioRequest.getSenha(), usuario.getSenha());
		  
		 HttpStatus status = (valid) ? HttpStatus.OK: HttpStatus.UNAUTHORIZED;
		 return ResponseEntity.status(status).body(valid);
		  
	 }
	 
	 public ResponseEntity<Usuario> deleteUsuario(long id) {
		    Optional<Usuario> usuarioExists = this.usuarioRepository.findById(id);

		    if (!usuarioExists.isPresent()) {
		      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		    }

		    usuarioRepository.deleteById(id);

		    return new ResponseEntity<>(HttpStatus.OK);
		  }
	 
}
