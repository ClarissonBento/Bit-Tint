//Implementação feita por Igor Nascimento
package com.ufv.BitTInt.repository;

import com.ufv.BitTInt.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // Anotação que indica ao Spring que esta é uma interface de repositório
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
	// JpaRepository<Aluno, Long> significa:
	// "Este repositório vai gerenciar a entidade 'Aluno',
	// e o tipo da chave primária (o @Id) do Aluno é 'Long'."

	// O Spring Data JPA vai entender o nome deste método e criar a consulta SQL
	// sozinho!
	Optional<Aluno> findByNickname(String nickname);
}
