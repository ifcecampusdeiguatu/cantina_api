package com.br.ifce.cantina.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.br.ifce.cantina.data.UsuarioDetalheData;
import com.br.ifce.cantina.models.Usuario;
import com.br.ifce.cantina.repository.UsuarioRepository;

@Component
public class UsuarioDetalheServiceImpl implements UserDetailsService{

	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	
		Optional<Usuario> usuario = usuarioRepository.findByMatricula(username);
		if(usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuario de matrícula: "+username+" não encontrado");
		}
		return new UsuarioDetalheData(usuario);
	}

}
