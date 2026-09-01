# Class Controll

App mobile para cadastro e gestão de **escolas** e **turmas**, construído com Expo SDK 57, React Native e TypeScript.

O código está organizado por domínio, com fronteira explícita entre contrato da API e modelo da UI. Isso deixa as telas simples, o cache previsível e a troca do mock por um backend real localizada em poucos arquivos.

---

## Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/650bb112-d2ae-48d4-afbe-cc6524c17d89" alt="Lista de escolas" width="250" />
  <img src="https://github.com/user-attachments/assets/d76e8975-a99d-4789-925c-65043ce091cf" alt="Turmas da escola" width="250" />
  <img src="https://github.com/user-attachments/assets/6937609c-4418-4719-acbe-adbbddb4aca0" alt="Formulário escolas" width="250" />
  <img src="https://github.com/user-attachments/assets/a326b8cc-c5e3-4878-8962-a7cfb098da6e" alt="Formulário turmas" width="250" />
  <img src="https://github.com/user-attachments/assets/33cc0f81-c072-42f6-b460-62f53e21e490" alt="Edição" width="250" />
  <img src="https://github.com/user-attachments/assets/7d6ae888-e90c-4d86-ab55-357bc21a2996" alt="Busca" width="250" />
</p>

---

## Figma

O layout eu mesmo montei no Figma, só pra ter uma base visual enquanto desenvolvia — nada de design system oficial.

<a href="https://www.figma.com/design/y85KLNMpQBONHPCxNK8H3f/Escolas-P%C3%BAblicas---App-Layout?node-id=0-1&t=8ruVpPB0rKNHW7yZ-1" target="_blank" rel="noopener noreferrer">Escolas Públicas — App Layout</a>



---

## O que o app faz

O fluxo principal é: listar escolas, abrir uma escola, gerenciar as turmas dela.

| Área    | Operações                                         |
| ------- | ------------------------------------------------- |
| Escolas | Listar, buscar, criar, editar e apagar            |
| Turmas  | Listar por escola, buscar, criar, editar e apagar |

Cada turma pertence a uma escola e tem nome, turno (manhã, tarde ou noite) e ano letivo. O ano é preenchido automaticamente com o ano corrente na criação e não é editável na UI.

---

## Stack

| Camada                    | Escolha                                        |
| ------------------------- | ---------------------------------------------- |
| Runtime                   | Expo SDK 57, React Native 0.86, React 19       |
| Linguagem                 | TypeScript (strict)                            |
| Navegação                 | Expo Router (file-based, typed routes)         |
| UI                        | Gluestack UI + NativeWind v5 / Tailwind CSS v4 |
| Servidor de estado remoto | TanStack Query                                 |
| Estado local de busca     | Zustand                                        |
| Formulários               | React Hook Form + Zod                          |
| HTTP                      | Axios (`adapter: "xhr"`)                       |
| Mock da API               | Mirage JS (somente em `__DEV__`)               |
| Debug                     | Reactotron + plugin do React Query             |

Plataformas-alvo no `app.json`: **iOS** e **Android**. Dark mode segue o sistema, porém foi feito inicialmente focado no tema 'light'.

---

## Arquitetura

A regra é: **rotas não conhecem regra de negócio, telas não conhecem HTTP, e o domínio não vaza o contrato da API para a UI**.

```
src/
├── app/                 Rotas (Expo Router). Só conectam params → screens.
├── api/                 Cliente HTTP, Query Client e mock (Mirage).
├── domains/             Regras e telas por contexto (school, classes).
├── components/
│   ├── layout/          Screen, FAB, busca, error view — composição de tela.
│   └── ui/              Primitivos visuais (Gluestack).
├── shared/              Fonts, toast, query keys, Reactotron.
└── assets/              Marca.
```

### Camadas de um domínio

Cada domínio (`school`, `classes`) segue o mesmo pipeline:

```
UI (screen + hook da tela)
        ↓
use-case (React Query: query / mutation + invalidação)
        ↓
service (orquestra API + adapter)
        ↓
adapter (DTO ⇄ modelo de domínio)
        ↓
api (Axios, paths e payloads do contrato)
        ↓
HTTP / Mirage
```

| Arquivo            | Responsabilidade                                                     |
| ------------------ | -------------------------------------------------------------------- |
| `*-types.ts`       | DTO da API (`ISchoolDTO`) e modelo da app (`TSchool`)                |
| `*-api.ts`         | Chamadas HTTP. Só fala a língua do backend.                          |
| `*-adapter.ts`     | Traduz `school_name` → `name`, calcula `classesCount`, monta payload |
| `*-service.ts`     | Caso de uso puro, sem React: busca, cria, atualiza, apaga            |
| `use-cases/`       | Hooks de Query/Mutation. Invalidam cache no sucesso.                 |
| `*-form-schema.ts` | Validação Zod daquele formulário                                     |
| `screens/`         | UI + hook da tela (`use-*-screen`). Navegação, toast, Alert.         |
| `filter-*.ts`      | Filtro local da lista                                                |
| `stores/`          | Zustand só para o texto da busca                                     |

O ponto da adaptação é o contrato da API usar snake_case (`school_id`, `class_shift`) enquanto a UI usa camelCase. Sem adapter, esse detalhe vaza para formulários, cards e caches.

### Por que o `app/` é fino

As rotas em `src/app` só extraem params e renderizam a screen do domínio:

```tsx
// src/app/schools/[schoolId]/index.tsx
export default function SchoolClassesRoute() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  return <ClassListScreen schoolId={id ?? ""} />;
}
```

Isso mantém o Expo Router como borda de navegação, não como lugar de regra.

### Estado

- **Remoto:** TanStack Query. `staleTime` de 5 minutos, retry 2 em queries e 1 em mutations. Após criar/editar/apagar, os `use-cases` invalidam `GET_SCHOOLS`, `GET_SCHOOL` e `GET_CLASSES` conforme o impacto.
- **Busca:** Zustand por lista (`useSchoolSearchStore`, `useClassSearchStore`). A query HTTP não muda; o filtro é local (`filterSchools` / `filterClasses`).
- **Formulário:** estado do React Hook Form, validado com Zod antes do submit.

---

## Navegação

```
/                                  lista de escolas
├── /schools/new                   criar escola (modal)
└── /schools/[schoolId]            turmas da escola
    ├── /schools/[schoolId]/edit   editar / apagar escola
    ├── /schools/[schoolId]/classes/new              criar turma (modal)
    └── /schools/[schoolId]/classes/[classId]/edit   editar / apagar turma
```

Criação abre como `presentation: "modal"`. Edição entra no stack com voltar. Apagar escola ou turma pede confirmação via `Alert` nativo.

---

## Contrato da API (mock)

Em desenvolvimento o Mirage intercepta `http://localhost:3000/api/v1` com delay de 400 ms e seed de 10 escolas e 15 turmas (distribuição irregular: algumas escolas com várias turmas, outras sem nenhuma).

O cliente Axios usa `adapter: "xhr"` de propósito: o Mirage faz patch de `XMLHttpRequest`. O adapter padrão do Axios no RN (fetch) não passa pelo mock.

### Escolas

| Método   | Path           | Notas                                        |
| -------- | -------------- | -------------------------------------------- |
| `GET`    | `/schools`     | Lista. Cada item inclui `school_classes`.    |
| `GET`    | `/schools/:id` | 404 se não existir.                          |
| `POST`   | `/schools`     | Body: `{ school_name, school_address }`      |
| `PUT`    | `/schools/:id` | Mesmo body da criação.                       |
| `DELETE` | `/schools/:id` | Remove a escola e as turmas associadas. 204. |

### Turmas

| Método   | Path                  | Notas                                                      |
| -------- | --------------------- | ---------------------------------------------------------- |
| `GET`    | `/classes?school_id=` | Sem `school_id`, retorna lista vazia.                      |
| `POST`   | `/classes`            | Body: `{ class_name, class_shift, class_year, school_id }` |
| `PUT`    | `/classes/:id`        | Não altera `school_id`.                                    |
| `DELETE` | `/classes/:id`        | 204.                                                       |

`class_shift`: `"morning"` \| `"afternoon"` \| `"evening"`.

O mock vive em `src/api/mocks/server.ts`. Serializers em `src/api/mocks/serializers.ts` convertem o modelo interno do Mirage para o DTO que a app espera.

Para simular erro de rede, descomente o `Response(500)` nos handlers do Mirage.

---

## Validação

Regras aplicadas no cliente (Zod), alinhadas ao que a UI mostra:

**Escola**

- Nome: 3–80 caracteres, começa com letra (`\p{L}`).
- Endereço: 5–120 caracteres, começa com letra.

**Turma**

- Nome: 3–80 caracteres.
- Turno: um dos três valores do enum.
- Ano letivo: derivado no hook (ano atual na criação; ano existente na edição).

---

## Como rodar

Pré-requisitos: Node.js compatível com Expo SDK 57, [Expo Go](https://expo.dev/go) no dispositivo ou simulador iOS / emulador Android.

```bash
npm install
npm start
```

No terminal do Metro:

- `i` — simulador iOS
- `a` — emulador Android
- escanear o QR code com o Expo Go

Não é necessário backend. O Mirage sobe no `_layout` quando `__DEV__` é verdadeiro.

```bash
npm run lint    # expo lint
```

Há `npm run web`, mas o `app.json` declara apenas iOS e Android como plataformas oficiais.

---

## Debug

Em `__DEV__` o app conecta o Reactotron (`src/shared/reactotron-config.ts`):

- cache e mutations do React Query
- requests Axios (método, URL, status, duração, body)

O plugin de networking nativo do Reactotron fica **desligado**. Ele também patcha `XMLHttpRequest` e conflita com o Mirage no segundo launch.

---

## Convenções

- Path alias `@/` aponta para `src/`.
- Arquivos em kebab-case (`school-list-screen.tsx`).
- Tipos de domínio: `T` para aliases (`TSchool`), `I` para DTOs da API (`ISchoolDTO`).
- Query keys centralizadas em `src/shared/query-keys.ts`.
- Telas usam o layout `Screen` (safe area, header, teclado, toast, FAB).
- Loading: skeleton da lista/formulário. Erro de fetch: `ErrorView` com retry. Sucesso/falha de mutation: toast.
- Labels de acessibilidade nos campos, FABs e ações destrutivas.

---

## Documentação de referência

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Mirage JS](https://miragejs.com/docs/getting-started/introduction/)
