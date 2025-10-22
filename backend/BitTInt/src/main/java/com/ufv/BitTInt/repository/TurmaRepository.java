package com.ufv.BitTInt.repository;

import com.ufv.BitTInt.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // <-- ADICIONE OU VERIFIQUE ESTA IMPORTAÇÃO

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {

    // --- NOVO MÉTODO ADICIONADO ABAIXO ---
    // Permite buscar uma turma pelo seu nome exato.
    // Retorna um Optional, que pode conter a Turma se ela for encontrada, ou vazio caso contrário.
    Optional<Turma> findByNomeTurma(String nomeTurma);
}