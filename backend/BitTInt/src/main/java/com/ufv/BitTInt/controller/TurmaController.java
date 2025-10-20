package com.ufv.BitTInt.controller;

import com.ufv.BitTInt.model.Aluno;
import com.ufv.BitTInt.model.Turma;
import com.ufv.BitTInt.repository.AlunoRepository;
import com.ufv.BitTInt.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

// --- IMPORTAÇÃO ADICIONADA ---
import org.springframework.web.bind.annotation.CrossOrigin;

// --- ANOTAÇÃO ADICIONADA ---
@CrossOrigin(origins = "http://localhost:3000") // Permite requisições do seu App React
@RestController
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private AlunoRepository alunoRepository;

    @PostMapping
    public Turma cadastrarTurma(@RequestBody Turma turma) {
        return turmaRepository.save(turma);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscarTurmaPorId(@PathVariable Long id) {
        return turmaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{turmaId}/alunos/{alunoId}")
    public ResponseEntity<Turma> inserirAlunoNaTuma(@PathVariable Long turmaId, @PathVariable Long alunoId) {
        Optional<Turma> turmaOpt = turmaRepository.findById(turmaId);
        Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);

        if (turmaOpt.isPresent() && alunoOpt.isPresent()) {
            Turma turma = turmaOpt.get();
            Aluno aluno = alunoOpt.get();
            turma.inserirAluno(aluno);
            turmaRepository.save(turma);
            return ResponseEntity.ok(turma);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/porNome/{nomeTurma}")
    public ResponseEntity<Turma> buscarTurmaPorNome(@PathVariable String nomeTurma) {
        return turmaRepository.findByNomeTurma(nomeTurma)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}