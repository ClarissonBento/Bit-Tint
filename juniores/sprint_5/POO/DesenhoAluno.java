public class DesenhoAluno {
    private int id;
    private int numeroFase;
    private String caminho;

    public DesenhoAluno(int id, int numeroFase, String caminho) {
        this.id = id;
        this.numeroFase = numeroFase;
        this.caminho = caminho;
    }

    public void exibir() {
        System.out.println("ID do desenho: " + id);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumeroFase() {
        return numeroFase;
    }

    public void setNumeroFase(int numeroFase) {
        this.numeroFase = numeroFase;
    }

    public String getCaminho() {
        return caminho;
    }

    public void setCaminho(String caminho) {
        this.caminho = caminho;
    }
}
