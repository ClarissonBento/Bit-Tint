package com.ufv.BitTInt.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AlunoTest {

	private Aluno aluno;

	// A anotação @BeforeEach faz com que este método seja executado ANTES de cada
	// @Test.
	// Isso garante que cada teste comece com um objeto Aluno novo e limpo.
	@BeforeEach
	void setUp() {
		aluno = new Aluno("jogador1", "senha123");
	}

	@Test
	@DisplayName("Deve inicializar um Aluno com os valores padrão corretos")
	void deveInicializarAlunoCorretamente() {
		// Assert (Verificação)
		assertEquals("jogador1", aluno.getNickname());
		assertEquals(0, aluno.getPontuacaoTotal());
		assertEquals(1, aluno.getFaseAtual());
		assertTrue(aluno.getPontuacaoFases().isEmpty(), "A lista de pontuação de fases deveria começar vazia.");
		assertTrue(aluno.getDesenhos().isEmpty(), "A lista de desenhos deveria começar vazia.");
	}

	@Test
	@DisplayName("Deve adicionar um ID de desenho à lista de desenhos")
	void deveInserirDesenho() {
		// Arrange (Preparação)
		int idDesenho = 123;

		// Act (Ação)
		aluno.inserirDesenho(idDesenho);

		// Assert (Verificação)
		assertEquals(1, aluno.getDesenhos().size(), "A lista de desenhos deveria ter 1 item.");
		assertEquals(idDesenho, aluno.getDesenhos().get(0), "O ID do desenho na lista está incorreto.");
	}

	@Test
	@DisplayName("Deve inserir a pontuação de uma fase pela primeira vez")
	void deveInserirPontuacaoPelaPrimeiraVez() {
		// Arrange
		int numeroFase = 1;
		int pontos = 150;

		// Act
		aluno.inserirPontuacao(numeroFase, pontos);

		// Assert
		assertEquals(pontos, aluno.getPontuacaoTotal(), "A pontuação total deve ser a da primeira fase jogada.");
		assertEquals(pontos, aluno.getPontuacaoFases().get(0), "A pontuação na lista para a fase 1 está incorreta.");
	}

	@Test
	@DisplayName("Deve substituir a pontuação de uma fase por uma maior")
	void deveAtualizarParaPontuacaoMaior() {
		// Arrange
		aluno.inserirPontuacao(1, 100); // Pontuação inicial

		// Act
		aluno.inserirPontuacao(1, 150); // Nova pontuação, maior que a anterior

		// Assert
		assertEquals(150, aluno.getPontuacaoTotal(), "A pontuação total deveria ter sido atualizada para a maior.");
		assertEquals(150, aluno.getPontuacaoFases().get(0),
				"A pontuação da fase deveria ter sido atualizada para a maior.");
	}

	@Test
	@DisplayName("NÃO deve substituir a pontuação de uma fase por uma menor")
	void naoDeveAtualizarParaPontuacaoMenor() {
		// Arrange
		aluno.inserirPontuacao(1, 100); // Pontuação inicial

		// Act
		aluno.inserirPontuacao(1, 50); // Nova pontuação, menor que a anterior

		// Assert
		assertEquals(100, aluno.getPontuacaoTotal(), "A pontuação total NÃO deveria ter mudado.");
		assertEquals(100, aluno.getPontuacaoFases().get(0), "A pontuação da fase NÃO deveria ter sido alterada.");
	}

	@Test
	@DisplayName("Deve calcular a pontuação total corretamente com múltiplas fases")
	void deveCalcularPontuacaoTotalComVariasFases() {
		// Act
		aluno.inserirPontuacao(1, 100); // Fase 1: 100
		aluno.inserirPontuacao(2, 200); // Fase 2: 200
		aluno.inserirPontuacao(3, 150); // Fase 3: 150
		aluno.inserirPontuacao(2, 180); // Tenta pontuação menor na Fase 2 (deve ser ignorado)
		aluno.inserirPontuacao(1, 120); // Tenta pontuação maior na Fase 1 (deve atualizar)

		// Assert
		// A pontuação total deve ser a soma das MAIORES pontuações de cada fase: 120
		// (Fase 1) + 200 (Fase 2) + 150 (Fase 3) = 470
		assertEquals(470, aluno.getPontuacaoTotal());
		assertEquals(120, aluno.getPontuacaoFases().get(0));
		assertEquals(200, aluno.getPontuacaoFases().get(1));
	}

	@Test
	@DisplayName("Deve expandir a lista de pontuações ao inserir uma fase fora de ordem")
	void deveLidarComFasesForaDeOrdem() {
		// Act
		aluno.inserirPontuacao(3, 500); // Insere pontuação para a fase 3, pulando a 1 e 2

		// Assert
		assertEquals(3, aluno.getPontuacaoFases().size(), "A lista deveria ter sido expandida para 3 posições.");
		assertEquals(0, aluno.getPontuacaoFases().get(0), "A pontuação da fase 1 deveria ser 0.");
		assertEquals(0, aluno.getPontuacaoFases().get(1), "A pontuação da fase 2 deveria ser 0.");
		assertEquals(500, aluno.getPontuacaoFases().get(2), "A pontuação da fase 3 está incorreta.");
		assertEquals(500, aluno.getPontuacaoTotal());
	}
}
