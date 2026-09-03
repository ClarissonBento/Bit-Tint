# 🎨 Bit Tint: Jogo Educativo (Projeto Integrador)

🎮 **[Clique aqui para jogar a versão online](http://tomcat.nupessc.caf.ufv.br/btint/)**

O **Bit Tint** é um jogo web educativo desenvolvido ao longo de 1 ano para estudantes do 4º ano do Ensino Fundamental. O projeto foi projetado em conformidade com as diretrizes de pensamento computacional da Base Nacional Comum Curricular (BNCC), introduzindo de forma lúdica os conceitos fundamentais de bitmap, malhas de pixels e o modelo de cores RGB.

A aplicação conta com um misturador dinâmico de cores (canais R, G e B), desafios de colorir malhas quadriculadas, minigames/quiz com bônus pedagógicos e um ranking de pontuação por turma no formato de arcade clássico.

---

## 🏗️ Minhas Contribuições (Liderança Técnica)

Atuei simultaneamente como **Arquiteto de Software** e **Gerente de Configuração**, coordenando a base técnica para uma equipe mista de 13 desenvolvedores (juniores e seniores).

### Como Arquiteto de Software
* **Concepção da Prova de Conceito (PoC):** Idealização, prototipação e validação da viabilidade técnica da arquitetura desacoplada cliente-servidor.
* **Definição e Padronização da Stack:** Seleção criteriosa das tecnologias (Java 21, Spring Boot 3, React e MySQL) avaliando manutenibilidade, escalabilidade e curva de aprendizado para a equipe.
* **Design de Backend & Persistência:** Estruturação de APIs RESTful com Spring Web e modelagem de persistência utilizando JPA/Hibernate para abstrair consultas ao banco de dados.
* **Design de Frontend:** Definição da modularização em componentes reutilizáveis e arquitetura de telas (`NicknameScreen`, `ColorMixerScreen`, `BoardScreen`, `RankingScreen`) utilizando React Router DOM para gerenciamento de estados e rotas.
* **Deploy em Produção:** Implantação e configuração do ambiente no servidor oficial da disciplina.

### Como Gerente de Configuração
* **Estratégia de Versionamento:** Implementação do fluxo Gitflow em repositório unificado, integrando simultaneamente o código-fonte de frontend/backend e dezenas de artefatos de processo da Engenharia de Software.
* **Integridade do Código:** Resolução de conflitos de merge, reversões críticas e aplicação de *cherry-picks* para manter as branches principais estáveis diante das entregas dos desenvolvedores juniores e seniores.

---

## 🛠️ Stack Tecnológica & Arquitetura

O sistema adota uma arquitetura em camadas totalmente desacoplada, conectada exclusivamente via APIs RESTful:

* **Backend:** Java 21, Spring Boot 3.5.5, Spring Web, Spring Data JPA / Hibernate, Maven
* **Banco de Dados:** MySQL (MySQL Driver 9.4)
* **Frontend:** React 19, JavaScript (ES6+), React Router DOM, Webpack, CSS3
* **Comunicação:** Integração client-server consumindo endpoints REST nativamente com a Fetch API do navegador
* **Controle de Versão & Gestão:** Git, GitHub, Gitflow, Astah (UML), Trello / ClickUp

---

## 🗂️ Estrutura do Repositório

Para cumprir os requisitos metodológicos do projeto (baseado em uma adaptação do processo MAGIC[cite: 1]), este repositório atua como fonte única de verdade:

* `/docs`: Artefatos completos de Engenharia de Software (Documento de Requisitos, Prova de Conceito, Diagramas de Classes/Implantação e Métricas).
* `/backend`: Aplicação Spring Boot e mapeamentos JPA.
* `/frontend`: Aplicação React com componentes modulares e roteamento.
