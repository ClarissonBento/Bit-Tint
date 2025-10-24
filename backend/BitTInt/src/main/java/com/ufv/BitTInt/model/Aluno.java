package com.ufv.BitTInt.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String senha;

    private int pontuacaoTotal;
    private int faseAtual;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "aluno_pontuacao_fases", joinColumns = @JoinColumn(name = "aluno_id"))
    @Column(name = "pontuacao")
    private List<Integer> pontuacaoFases;

    // --- ATUALIZAÇÃO: Relação com a entidade Desenho ---
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "aluno_id")
    private List<Desenho> desenhos;

    public Aluno() {
    }

    public Aluno(String nickname, String senha) {
        this.nickname = nickname;
        this.senha = senha;
        this.pontuacaoTotal = 0;
        this.faseAtual = 1;
        this.pontuacaoFases = new ArrayList<>();
        this.desenhos = new ArrayList<>();
    }

    // --- MÉTODO ATUALIZADO ---
    public void inserirDesenho(Desenho novoDesenho) {
        if (this.desenhos == null) {
            this.desenhos = new ArrayList<>();
        }
        this.desenhos.add(novoDesenho);
    }

    public void inserirPontuacao(int numeroFase, int pontos) {
        int indice = numeroFase - 1;
        while (this.pontuacaoFases.size() < numeroFase) {
            this.pontuacaoFases.add(0);
        }
        int pontuacaoAntiga = this.pontuacaoFases.get(indice);
        if (pontos > pontuacaoAntiga) {
            this.pontuacaoFases.set(indice, pontos);
            atualizarPontuacaoTotal();
        }
    }

    private void atualizarPontuacaoTotal() {
        this.pontuacaoTotal = this.pontuacaoFases.stream().mapToInt(Integer::intValue).sum();
    }

    // --- Getters e Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public int getPontuacaoTotal() { return pontuacaoTotal; }
    public void setPontuacaoTotal(int pontuacaoTotal) { this.pontuacaoTotal = pontuacaoTotal; }
    public int getFaseAtual() { return faseAtual; }
    public void setFaseAtual(int faseAtual) { this.faseAtual = faseAtual; }
    public List<Integer> getPontuacaoFases() { return pontuacaoFases; }
    public void setPontuacaoFases(List<Integer> pontuacaoFases) { this.pontuacaoFases = pontuacaoFases; }
    public List<Desenho> getDesenhos() { return desenhos; }
    public void setDesenhos(List<Desenho> desenhos) { this.desenhos = desenhos; }
}