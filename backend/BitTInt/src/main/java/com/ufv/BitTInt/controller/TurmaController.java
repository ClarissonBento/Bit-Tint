//Implementação feita por Igor Nascimento
package com.ufv.BitTInt.controller;

import com.ufv.BitTInt.model.Aluno;
import com.ufv.BitTInt.model.Turma;
import com.ufv.BitTInt.repository.AlunoRepository;
import com.ufv.BitTInt.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/turmas") // URL base: http://localhost:8080/turmas
public class TurmaController {

	@Autowired
	private TurmaRepository turmaRepository;

	@Autowired
	private AlunoRepository alunoRepository;

	// Endpoint para cadastrar uma nova turma. Ativado por POST para /turmas
	@PostMapping
	public Turma cadastrarTurma(@RequestBody Turma turma) {
		return turmaRepository.save(turma);
	}

	// Endpoint para inserir um aluno existente em uma turma
	// Ativado por POST para /turmas/{turmaId}/alunos/{alunoId}
	@PostMapping("/{turmaId}/alunos/{alunoId}")
	public ResponseEntity<Turma> inserirAlunoNaTurma(@PathVariable Long turmaId, @PathVariable Long alunoId) {
		Optional<Turma> turmaOpt = turmaRepository.findById(turmaId);
		Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);

		// Verifica se tanto a turma quanto o aluno existem no banco
		if (turmaOpt.isPresent() && alunoOpt.isPresent()) {
			Turma turma = turmaOpt.get();
			Aluno aluno = alunoOpt.get();
			turma.inserirAluno(aluno); // Usa o método de negócio que você criou na classe Turma
			turmaRepository.save(turma); // Salva a turma com o novo aluno na lista
			return ResponseEntity.ok(turma);
		}
		return ResponseEntity.notFound().build(); // Retorna 404 se a turma ou o aluno não forem encontrados
	}

	// Endpoint para buscar uma turma pelo ID e ver seu ranking
	// Ativado por GET para /turmas/{id}
	@GetMapping("/{id}")
	public ResponseEntity<Turma> buscarTurmaPorId(@PathVariable Long id) {
		return turmaRepository.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}
