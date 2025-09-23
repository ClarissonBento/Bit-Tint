package com.quartoano.btint.repository;

import com.quartoano.btint.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findTop10ByOrderByScoreDesc();

    // Método para deletar todos os scores
    void deleteAll();
}