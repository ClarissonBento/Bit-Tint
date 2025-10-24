package com.ufv.BitTInt.repository;

import com.ufv.BitTInt.model.Desenho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesenhoRepository extends JpaRepository<Desenho, Long> {
}