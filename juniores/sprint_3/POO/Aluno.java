import java.util.ArrayList;
import java.util.List;

public class Aluno {

    private String nickname;
    private String senha;
    private int pontuacaoTotal;
    private int faseAtual;
    private List<Integer> pontuacaoFases;
    private List<Integer> desenhos;

    public Aluno(String nickname, String senha) {
        this.nickname = nickname;
        this.senha = senha;
        this.pontuacaoTotal = 0;
        this.faseAtual = 1;
        this.pontuacaoFases = new ArrayList<>();
        this.desenhos = new ArrayList<>();
    }

    /**
     * Adiciona o ID de um novo desenho à lista de desenhos do jogador.
     * @param id O identificador único do desenho a ser adicionado.
     */
    public void inserirDesenho(int id) {
        this.desenhos.add(id);
    }

    /**
     * Insere ou atualiza a pontuação de uma determinada fase.
     * Se a pontuação nova for maior que a antiga, ela é substituída.
     * A pontuação total é recalculada após a modificação.
     * @param numeroFase O número da fase (ex: 1, 2, 3...).
     * @param pontos A pontuação obtida nesta tentativa.
     */
    public void inserirPontuacao(int numeroFase, int pontos) {
        // As listas em Java começam no índice 0, então a fase 1 corresponde ao índice 0.
        int indice = numeroFase - 1;

        //Garante que a lista tenha tamanho suficiente para a fase, preenchendo com 0 se necessário.
        while (this.pontuacaoFases.size() < numeroFase) {
            this.pontuacaoFases.add(0);
        }

        // Pega a pontuação antiga para comparar.
        int pontuacaoAntiga = this.pontuacaoFases.get(indice);

        // Compara a pontuação nova com a antiga e mantém a maior.
        if (pontos > pontuacaoAntiga) {
            this.pontuacaoFases.set(indice, pontos);
            atualizarPontuacaoTotal();
        }
    }

    /**
     *  Método auxiliar privado para recalcular a pontuação total do jogador.
     * Ele soma todas as pontuações da lista pontuacaoFases para garantir que
     * o total esteja sempre correto.
     */
    private void atualizarPontuacaoTotal() {
        int total = 0;
        for (int pontuacao : this.pontuacaoFases) {
            total += pontuacao;
        }
        this.pontuacaoTotal = total;
    }

    public String getNickname() {
        return nickname;
    }

    public int getPontuacaoTotal() {
        return pontuacaoTotal;
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

    public List<Integer> getDesenhos() {
        return desenhos;
    }
    
    public void setSenha(String senha) {
        this.senha = senha;
    }
}