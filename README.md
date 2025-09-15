# 📘 Educatrix – Learning Management System  

**Educatrix** é uma plataforma em desenvolvimento no contexto de um projeto de pesquisa em Ciência da Computação (PPGCC/UFSJ). O sistema é orientado à **avaliação formativa** e ao uso de **Learning Analytics**, com foco em coletar e analisar traços de aprendizagem para apoiar o trabalho docente na era das IAs generativas.  

Este repositório representa a construção incremental do software, adotando práticas profissionais de engenharia, documentação como código (*docs-as-code*) e metodologias ágeis para garantir transparência e evolução contínua.  

---

## 🎯 Objetivos do Projeto  

- **Apoiar a avaliação formativa** por meio de relatórios individualizados para docentes.  
- **Coletar dados de processo** (tentativas, erros, tempo de resposta, padrões de cópia).  
- **Fornecer subsídios pedagógicos** que permitam intervenções mais eficazes.  
- **Explorar o impacto da IA generativa** no processo avaliativo.  
- **Construir conhecimento científico**, documentando decisões de arquitetura e resultados obtidos.  

---

## 🏗️ Arquitetura (em evolução)  

- **Frontend:** React + Bootstrap (UI responsiva e acessível).  
- **Backend:** Node.js (ExpressJS) com autenticação via **Passport**.  
- **Banco de Dados:** PostgreSQL.  
- **Documentação da API:** Swagger (autogerada).  
- **Infraestrutura:** Organização modular, integração futura com ferramentas de monitoramento e dashboards.  

> Todas as escolhas tecnológicas são registradas em **ADRs** (*Architecture Decision Records*) na pasta [`/docs/adr`](./docs/adr).  

---

## 📅 Roadmap  

- [x] Setup inicial do repositório  
- [x] Configuração do backend com rotas mockadas  
- [x] Documentação automática da API (Swagger)  
- [ ] CRUD de atividades  
- [ ] Relatórios de aprendizagem (Learning Analytics)  
- [ ] Integração com IA generativa (fase experimental)  
- [ ] Deploy em ambiente de produção para testes com docentes  

O roadmap detalhado encontra-se em [`/docs/ROADMAP.md`](./docs/ROADMAP.md).  

---

## 📖 Documentação  

- **API** → [`/docs/API.md`](./docs/API.md)  
- **ADRs** → [`/docs/adr`](./docs/adr)  
- **Planejamento** → [`/docs/ROADMAP.md`](./docs/ROADMAP.md)  

---

## 👩‍💻 Sobre a Pesquisa  

Este projeto faz parte da dissertação de **Mestrado em Ciência da Computação (UFSJ)**, linha de pesquisa *Otimização e Inteligência Computacional*.  
A investigação busca contribuir para o campo de **Educação em Computação**, explorando novas possibilidades de avaliação na era da IA.  

---

## 🚀 Estado Atual  

O projeto encontra-se em **fase inicial de desenvolvimento**, com implementação incremental.  
Cada entrega é acompanhada por documentação e registro de decisões, evidenciando o rigor metodológico e a transparência do processo de pesquisa.  

---

## 📌 Como Contribuir  

Este é um projeto acadêmico em andamento. Sugestões, revisões e feedbacks construtivos são bem-vindos via [Issues](../../issues) ou [Pull Requests](../../pulls).  

---

## ⚠️ Aviso  

Este repositório representa um **projeto de pesquisa em construção**.  
Ainda **não está pronto para uso em produção**, e alterações significativas podem ocorrer ao longo do desenvolvimento.  
