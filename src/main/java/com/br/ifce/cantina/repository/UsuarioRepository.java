package com.br.ifce.cantina.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ifce.cantina.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>  {
	
	public Optional<Usuario> findByMatricula(String matricula);

}
