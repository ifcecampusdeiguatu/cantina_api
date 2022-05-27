package com.br.ifce.cantina.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.br.ifce.cantina.data.UsuarioDetalheData;
import com.br.ifce.cantina.models.Usuario;
import com.br.ifce.cantina.repository.UsuarioRepository;

@Component
public class UsuarioDetalheServiceImpl implements UserDetailsService{

	@Autowired
	private final UsuarioRepository usuarioRepository;
	
	public UsuarioDetalheServiceImpl(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String matricula) throws UsernameNotFoundException {
	
		Optional<Usuario> usuario = usuarioRepository.findByMatricula(matricula);
		System.out.println(usuario);
		if(usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuario de matrícula: "+matricula+" não encontrado");
		}
		return new UsuarioDetalheData(usuario);
	}

}
