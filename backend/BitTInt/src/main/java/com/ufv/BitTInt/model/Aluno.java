//Implementação inicial feita por Fabriciohva
package com.ufv.BitTInt.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity // 1. INFORMA AO JPA: Esta classe representa uma tabela no banco de dados.
public class Aluno {

    @Id // 2. DEFINE A CHAVE PRIMÁRIA: Este campo é o identificador único da tabela.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 3. GERAÇÃO AUTOMÁTICA: O banco de dados irá gerar e gerenciar
                                                        // o valor do ID.
    private Long id;

    @Column(unique = true, nullable = false) // 4. RESTRIÇÕES DA COLUNA: Garante que o nickname não pode ser repetido
                                             // nem nulo.
    private String nickname;

    @Column(nullable = false) // Garante que a senha não pode ser nula.
    private String senha;

    private int pontuacaoTotal;
    private int faseAtual;

    // 5. MAPEIA LISTAS: Informa ao JPA que esta lista de valores básicos (Integer)
    // deve ser armazenada em uma tabela separada e vinculada a este Aluno.
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Integer> pontuacaoFases;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Integer> desenhos;

    // 6. CONSTRUTOR VAZIO: O JPA precisa de um construtor sem argumentos para criar
    // instâncias da classe.
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

    public void inserirDesenho(int id) {
        this.desenhos.add(id);
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

    // --- GETTERS E SETTERS ---
    // Para que o JPA e outra bibliotecas do Spring possam acessar os campos.

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getPontuacaoTotal() {
        return pontuacaoTotal;
    }

    public void setPontuacaoTotal(int pontuacaoTotal) {
        this.pontuacaoTotal = pontuacaoTotal;
    }

    public int getFaseAtual() {
        return faseAtual;
    }

    public void setFaseAtual(int faseAtual) {
        this.faseAtual = faseAtual;
    }

    public List<Integer> getPontuacaoFases() {
        return pontuacaoFases;
    }

    public void setPontuacaoFases(List<Integer> pontuacaoFases) {
        this.pontuacaoFases = pontuacaoFases;
    }

    public List<Integer> getDesenhos() {
        return desenhos;
    }

    public void setDesenhos(List<Integer> desenhos) {
        this.desenhos = desenhos;
    }
}
