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
        this.rankingAlunos.add(novoAluno);

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

        for (Aluno aluno : this.rankingAlunos) {
            List<DesenhoAluno> DesenhosDoAluno = aluno.getDesenhos(); 

            if (DesenhosDoAluno.isEmpty()) { //
                System.out.println("  - Não possui desenhos registrados.");
            } else {
                for (DesenhoAluno desenho : DesenhosDoAluno) {
                    desenho.exibir();
                    }
                }
            }
        }
    }
