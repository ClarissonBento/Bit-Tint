//Implementação inicial, feita por Fabriciohva
package com.ufv.BitTInt.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity // 1. INFORMA AO JPA: Esta classe é uma tabela no banco de dados.
public class Turma {

    @Id // 2. DEFINE A CHAVE PRIMÁRIA
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 3. GERAÇÃO AUTOMÁTICA DO ID
    private Long id;

    @Column(unique = true, nullable = false) // Garante que o nome da turma seja único e não nulo.
    private String nomeTurma;

    // 4. MAPEIA A RELAÇÃO: Uma Turma tem Muitos Alunos.
    // - cascade = CascadeType.ALL: Se uma Turma for salva ou deletada, a mesma
    // operação será aplicada aos Alunos associados a ela.
    // - fetch = FetchType.EAGER: Sempre que uma Turma for carregada do banco, sua
    // lista de alunos (rankingAlunos) será carregada junto.
    // - orphanRemoval = true: Se um aluno for removido da lista 'rankingAlunos' e
    // salvo, ele também será removido do banco de dados.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "turma_id") // Cria uma coluna 'turma_id' na tabela 'Aluno' para fazer a ligação.
    @OrderBy("pontuacaoTotal DESC") // 5. ORDENAÇÃO AUTOMÁTICA: Pede ao banco para já trazer a lista ordenada pela
                                    // pontuação total em ordem decrescente.
    private List<Aluno> rankingAlunos;

    // 6. CONSTRUTOR VAZIO: Necessário para o JPA.
    public Turma() {
    }

    public Turma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
        this.rankingAlunos = new ArrayList<>();
    }

    // A anotação @OrderBy já cuida da ordenação, então a ordenação manual aqui se
    // torna uma garantia extra.
    public void inserirAluno(Aluno novoAluno) {
        this.rankingAlunos.add(novoAluno);
        this.rankingAlunos.sort(Comparator.comparingInt(Aluno::getPontuacaoTotal).reversed());
    }

    public void removerAluno(Aluno aluno) {
        this.rankingAlunos.remove(aluno);
    }

    /**
     * IMPORTANTE: Em uma aplicação web, métodos que imprimem no console
     * (System.out)
     * geralmente são substituídos. A lógica seria retornar os dados para a camada
     * de
     * Controller, que então os enviaria para o front-end.
     * ====Ponto de Atenção====
     */

    public void exibirDesenhos() {
        if (rankingAlunos.isEmpty()) {
            System.out.println("Ainda não há alunos nesta turma.");
            return;
        }

        for (Aluno aluno : this.rankingAlunos) {
            System.out.println("Desenhos do aluno: " + aluno.getNickname());
            List<Integer> idsDosDesenhos = aluno.getDesenhos();

            if (idsDosDesenhos.isEmpty()) {
                System.out.println("  - Não possui desenhos registrados.");
            } else {
                System.out.println("  - IDs: " + idsDosDesenhos);
            }
        }
    }

    // --- GETTERS E SETTERS ---
    // Adicionados para todos os campos para conformidade com o JPA.

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeTurma() {
        return nomeTurma;
    }

    public void setNomeTurma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
    }

    public List<Aluno> getRankingAlunos() {
        return rankingAlunos;
    }

    public void setRankingAlunos(List<Aluno> rankingAlunos) {
        this.rankingAlunos = rankingAlunos;
    }
}
