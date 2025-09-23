package com.quartoano.btint.controller;

import com.quartoano.btint.model.Score;
import com.quartoano.btint.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    @PostMapping("/score")
    public Score saveScore(@RequestBody Score score) {
        return scoreRepository.save(score);
    }

    @GetMapping("/ranking")
    public List<Score> getRanking() {
        return scoreRepository.findTop10ByOrderByScoreDesc();
    }

    // Novo endpoint para limpar o ranking
    @DeleteMapping("/ranking/clear")
    public String clearRanking() {
        scoreRepository.deleteAll();
        return "Ranking limpo com sucesso!";
    }
}