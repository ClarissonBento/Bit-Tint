//Implementação feita por Igor Nascimento
package com.ufv.BitTInt.repository;

import com.ufv.BitTInt.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
	// JpaRepository<Turma, Long> significa:
	// "Este repositório vai gerenciar a entidade 'Turma',
	// e o tipo da chave primária dela é 'Long'."

	// Por enquanto, não precisamos de métodos personalizados aqui.
	// Os métodos básicos (save, findById, findAll, delete) já vêm de graça do
	// JpaRepository.
}
