## 🏗️ Arquitetura do Projeto

Este projeto utiliza uma **arquitetura baseada em features** otimizada para projetos frontend que consomem APIs:

```
src/
├── components/
│   ├── ui/                    # Componentes reutilizáveis
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Loading.jsx
│   └── layout/                # Layout do app
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       └── Layout.jsx
├── pages/                     # Páginas/Rotas
│   ├── Dashboard.jsx
│   ├── Courses.jsx
│   ├── Students.jsx
│   └── Analytics.jsx
├── services/                  # API calls
│   ├── api.js                 # Configuração base do Axios
│   ├── coursesApi.js
│   ├── studentsApi.js
│   └── analyticsApi.js
├── hooks/                     # Custom hooks
│   ├── useCourses.js
│   └── useStudents.js
├── utils/                     # Utilitários
│   ├── helpers.js
│   └── constants.js
└── styles/                    # CSS
    └── globals.css
```

## 📋 Descrição das Pastas

### 📁 `components/`

- **`ui/`**: Componentes reutilizáveis como botões, cards, modais
- **`layout/`**: Componentes de layout como header, sidebar, footer

### 📁 `pages/`

Componentes que representam páginas completas do sistema:

- **Dashboard**: Visão geral do sistema
- **Courses**: Gerenciamento de cursos
- **Students**: Gestão de estudantes
- **Analytics**: Relatórios e métricas

### 📁 `services/`

Camada de comunicação com APIs:

- **`api.js`**: Configuração base do cliente HTTP (Axios)
- **Demais arquivos**: Endpoints específicos por funcionalidade

### 📁 `hooks/`

Custom hooks para:

- Gerenciamento de estado local
- Lógica de negócio reutilizável
- Integração com APIs

### 📁 `utils/`

- **`helpers.js`**: Funções utilitárias
- **`constants.js`**: Constantes da aplicação

## 📦 Instalação e Inicialização

```bash
npm install
npm start
```
