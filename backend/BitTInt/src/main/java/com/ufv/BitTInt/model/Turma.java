package com.ufv.BitTInt.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nomeTurma;

    // --- NOVO CAMPO ADICIONADO ---
    private String senhaAdmin;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "turma_id")
    @OrderBy("pontuacaoTotal DESC")
    private List<Aluno> rankingAlunos;

    public Turma() {
    }

    public Turma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
        this.rankingAlunos = new ArrayList<>();
    }

    public void inserirAluno(Aluno novoAluno) {
        if (this.rankingAlunos == null) {
            this.rankingAlunos = new ArrayList<>();
        }
        this.rankingAlunos.add(novoAluno);
        this.rankingAlunos.sort(Comparator.comparingInt(Aluno::getPontuacaoTotal).reversed());
    }

    public void removerAluno(Aluno aluno) {
        this.rankingAlunos.remove(aluno);
    }

    public void exibirDesenhos() {
        if (rankingAlunos == null || rankingAlunos.isEmpty()) {
            System.out.println("Ainda não há alunos nesta turma.");
            return;
        }

        for (Aluno aluno : this.rankingAlunos) {
            System.out.println("Desenhos do aluno: " + aluno.getNickname());

            List<Desenho> listaDeDesenhos = aluno.getDesenhos();

            if (listaDeDesenhos == null || listaDeDesenhos.isEmpty()) {
                System.out.println("  - Não possui desenhos registrados.");
            } else {
                System.out.print("  - IDs dos Desenhos: ");
                for (Desenho desenho : listaDeDesenhos) {
                    System.out.print(desenho.getId() + " ");
                }
                System.out.println();
            }
        }
    }

    // --- Getters e Setters (com os novos para senhaAdmin) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNomeTurma() { return nomeTurma; }
    public void setNomeTurma(String nomeTurma) { this.nomeTurma = nomeTurma; }
    public List<Aluno> getRankingAlunos() { return rankingAlunos; }
    public void setRankingAlunos(List<Aluno> rankingAlunos) { this.rankingAlunos = rankingAlunos; }

    // --- GETTER E SETTER PARA O NOVO CAMPO ---
    public String getSenhaAdmin() { return senhaAdmin; }
    public void setSenhaAdmin(String senhaAdmin) { this.senhaAdmin = senhaAdmin; }
}