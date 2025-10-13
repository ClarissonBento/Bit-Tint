//Implementação feita por Igor Nascimento
package com.ufv.BitTInt.controller;

import com.ufv.BitTInt.model.Aluno;
import com.ufv.BitTInt.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // Informa ao Spring que esta é uma classe de controle para a API REST
@RequestMapping("/alunos") // Define a URL base para todos os métodos (ex: http://localhost:8080/alunos)
public class AlunoController {

	@Autowired // Pede ao Spring para injetar (fornecer) uma instância de AlunoRepository
	private AlunoRepository alunoRepository;

	// Endpoint para criar um novo aluno. Ativado por uma requisição POST para
	// /alunos
	@PostMapping
	public Aluno cadastrarAluno(@RequestBody Aluno aluno) {
		// @RequestBody converte o JSON vindo do front-end em um objeto Aluno
		return alunoRepository.save(aluno);
	}

	// Endpoint para buscar todos os alunos. Ativado por uma requisição GET para
	// /alunos
	@GetMapping
	public List<Aluno> buscarTodosAlunos() {
		return alunoRepository.findAll();
	}

	// Endpoint para buscar um aluno pelo ID. Ativado por uma requisição GET para
	// /alunos/{id}
	@GetMapping("/{id}")
	public ResponseEntity<Aluno> buscarAlunoPorId(@PathVariable Long id) {
		// @PathVariable pega o valor do {id} da URL e o coloca na variável id
		Optional<Aluno> aluno = alunoRepository.findById(id);
		// Retorna o aluno com status 200 OK, ou um status 404 Not Found se não existir
		return aluno.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Endpoint para validar login. Ativado por uma requisição POST para
	// /alunos/login
	@PostMapping("/login")
	public ResponseEntity<String> validarLogin(@RequestBody Aluno dadosLogin) {
		Optional<Aluno> alunoOptional = alunoRepository.findByNickname(dadosLogin.getNickname());
		if (alunoOptional.isPresent() && alunoOptional.get().getSenha().equals(dadosLogin.getSenha())) {
			return ResponseEntity.ok("Login bem-sucedido!");
		}
		return ResponseEntity.status(401).body("Nickname ou senha inválidos."); // 401 Unauthorized
	}

	// Endpoint para deletar um aluno. Ativado por uma requisição DELETE para
	// /alunos/{id}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> apagarAluno(@PathVariable Long id) {
		if (!alunoRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		alunoRepository.deleteById(id);
		return ResponseEntity.noContent().build(); // Retorna status 204 No Content
	}
}
