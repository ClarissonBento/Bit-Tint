package com.ufv.BitTInt.controller;

import com.ufv.BitTInt.model.Aluno;
import com.ufv.BitTInt.model.Desenho;
import com.ufv.BitTInt.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// --- IMPORTAÇÃO ADICIONADA ---
import org.springframework.web.bind.annotation.CrossOrigin;

// --- ANOTAÇÃO ADICIONADA ---
@CrossOrigin(origins = "http://localhost:3000") // Permite requisições do seu App React
@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @PostMapping
    public Aluno cadastrarAluno(@RequestBody Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    @GetMapping
    public List<Aluno> buscarTodosAlunos() {
        return alunoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarAlunoPorId(@PathVariable Long id) {
        return alunoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<String> validarLogin(@RequestBody Aluno dadosLogin) {
        Optional<Aluno> alunoOptional = alunoRepository.findByNickname(dadosLogin.getNickname());
        if (alunoOptional.isPresent() && alunoOptional.get().getSenha().equals(dadosLogin.getSenha())) {
            return ResponseEntity.ok("Login bem-sucedido!");
        }
        return ResponseEntity.status(401).body("Nickname ou senha inválidos.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAluno(@PathVariable Long id) {
        if (!alunoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        alunoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{alunoId}/desenhos")
    public ResponseEntity<Aluno> adicionarDesenho(@PathVariable Long alunoId) {
        Optional<Aluno> alunoOptional = alunoRepository.findById(alunoId);
        if (alunoOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Aluno aluno = alunoOptional.get();
        aluno.inserirDesenho(new Desenho());
        Aluno alunoAtualizado = alunoRepository.save(aluno);

        return ResponseEntity.ok(alunoAtualizado);
    }
}