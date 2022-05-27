package com.br.ifce.cantina.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.br.ifce.cantina.data.UsuarioDetalheData;
import com.br.ifce.cantina.models.Usuario;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter  {

	public static final int TOKEN_EXPIRACAO = 600_000;
	public static final String TOKEN_SENHA = "JAVINHA";
	
	private final AuthenticationManager authenticationManager;

	public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, 
												HttpServletResponse response)
												throws AuthenticationException {
		try {
			Usuario usuario = new ObjectMapper().readValue(request.getInputStream(),
															Usuario.class);
			
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				 usuario.getMatricula(),
				 usuario.getSenha(),
				 new ArrayList<>()
				 ));
			
		}catch(IOException e) {
			throw new RuntimeException("Falha ao autenticar usuário",  e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request,
										    HttpServletResponse response, 
										    FilterChain chain,
										    Authentication authResult) throws IOException, ServletException {
		
		UsuarioDetalheData usuarioDetalheData = (UsuarioDetalheData) authResult.getPrincipal();
		
		String  token = JWT.create().
				withSubject(usuarioDetalheData.getUsername()).
				withExpiresAt(new Date(System.currentTimeMillis()+TOKEN_EXPIRACAO)).
				sign(Algorithm.HMAC512(TOKEN_SENHA));
		System.out.println(token);
		
		response.getWriter().write(token);
		response.getWriter().flush();
}
}