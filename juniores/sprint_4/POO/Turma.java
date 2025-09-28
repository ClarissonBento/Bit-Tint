import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Turma {

    private String nomeTurma;
    private List<Aluno> rankingAlunos;

    public Turma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
        this.rankingAlunos = new ArrayList<>();
    }

    public void inserirAluno(Aluno novoAluno) {
        // Adiciona o novo aluno no final da lista
        this.rankingAlunos.add(novoAluno);

        // Reordena a lista com base na pontuação total em ordem decrescente
        this.rankingAlunos.sort(Comparator.comparingInt(Aluno::getPontuacaoTotal).reversed());
    }

    public void removerAluno(Aluno aluno) {
        this.rankingAlunos.remove(aluno);
    }

    public void exibirDesenhos() {
        if (rankingAlunos.isEmpty()) {
            System.out.println("Ainda não há alunos nesta turma.");
            return;
        }

        // Para cada aluno na lista de ranking...
        for (Aluno aluno : this.rankingAlunos) {
            // Pega a lista de IDs de desenhos do aluno
            List<Integer> idsDosDesenhos = aluno.getDesenhos(); //

            if (idsDosDesenhos.isEmpty()) { //
                System.out.println("  - Não possui desenhos registrados.");
            } else {
                for (int i = 0; i < idsDosDesenhos.size(); i++) {
                    System.out.print(idsDosDesenhos.get(i)); // imprime o ID do desenho
                    if (i < idsDosDesenhos.size() - 1) {
                        System.out.print(", "); // Adiciona vírgula entre os IDs
                    }
                }
            }
        }
    }
}