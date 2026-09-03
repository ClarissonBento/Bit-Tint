# 🎨 Bit Tint: Jogo Educativo (Projeto Integrador)

🎮 **[Link para o Jogo em Produção]** *(http://tomcat.nupessc.caf.ufv.br/btint/)*

O **Bit Tint** é um jogo web educativo desenvolvido ao longo de 1 ano para alunos do 4º ano do Ensino Fundamental. O projeto está alinhado à Base Nacional Comum Curricular (BNCC), especialmente para o desenvolvimento do pensamento computacional, buscando ensinar de forma lúdica os conceitos de formação de imagens, RGB e pixels[cite: 1]. 

A dinâmica central envolve um sistema de colorir em *pixel-art*, integrado a um quiz com perguntas sugeridas pelas professoras da escola municipal. Acertos no quiz recompensam os alunos com tintas extras e bônus para completar as pinturas.

O planejamento e a documentação seguiram uma adaptação do processo MAGIC[cite: 1]. 

---

## 🏗️ Minhas Contribuições (Papéis Acumulados)

Atuei simultaneamente na liderança técnica do projeto, acumulando as responsabilidades de **Arquiteto de Software** e **Gerente de Configuração** em uma equipe mista de 17 desenvolvedores (juniores e seniores).

**Como Arquiteto de Software:**
* Concepção da Prova de Conceito (PoC) para validar a viabilidade técnica da aplicação.
* Modelagem da arquitetura do sistema e definição do ecossistema de tecnologias (Frontend, Backend e Banco de Dados).
* Validação contínua para garantir que a infraestrutura desenhada suportaria os requisitos dinâmicos definidos pela equipe ao longo dos semestres.
* Responsável pelo deploy e configuração do jogo no servidor oficial da professora, garantindo 100% de entrega e estabilidade em produção.

**Como Gerente de Configuração:**
* Definição e administração da estratégia de versionamento (Gitflow).
* Gerenciamento de repositório unificado, orquestrando a integração contínua de código-fonte e uma vasta carga de documentação do ciclo de engenharia.
* Resolução de conflitos de merge, reversões complexas, rebase e aplicação de *cherry-picks* para manter a integridade da branch principal durante as entregas da equipe de juniores e seniores.

---

## 🛠️ Tecnologias e Ferramentas

**Backend & Infraestrutura:**
* Java & Spring Boot (APIs RESTful)
* MySQL Workbench para modelagem e administração do banco de dados[cite: 1]
* Deploy em servidor acadêmico (Linux)

**Frontend:**
* React & JavaScript
* Prototipação de interfaces gráficas (UX/UI)[cite: 1]

**Gestão & Engenharia:**
* **Controle de Versão:** Git, GitHub[cite: 1]
* **Metodologia:** Adaptação do processo MAGIC com ritos ágeis[cite: 1]
* **Gestão de Tarefas e Planejamento:** Trello e Clickup[cite: 1]
* **Diagramação e Modelagem:** Astah[cite: 1]

---

## 🗂️ Estrutura do Repositório

Este repositório atua como a fonte única da verdade do projeto (Single Source of Truth). Para atender aos requisitos de auditoria da disciplina, o repositório foi dividido da seguinte forma:

* `/docs`: Todos os artefatos de Engenharia de Software (Documento de Requisitos, Diagramas de Implantação e Classes, Cronogramas e Relatórios de Processo)[cite: 1].
* `/backend`: Código-fonte da API em Java/Spring Boot.
* `/frontend`: Código-fonte da interface web em React.
