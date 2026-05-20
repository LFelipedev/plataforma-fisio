# 📑 Aula 02: Fisiologia Introdutória (System Architecture & Core Engine)

## 📌 Visão Geral do Repositório
Esta documentação compila os conceitos fundamentais sobre o funcionamento do organismo humano, mapeando a distribuição de fluidos (gerenciamento de memória), mecanismos de transporte (protocolos de rede) e sistemas de controle (loops de feedback/homeostase).

---

## 💻 Slide 01: Introdução à Fisiologia e Níveis de Organização

### 📝 Resumo do Componente (TL;DR)
A Fisiologia estuda as funções mecânicas, físicas e bioquímicas do organismo. Para fins de engenharia biológica, o ecossistema é dividido em camadas de abstração de hardware e software:
* **Stack de Execução:** `Átomos ➔ Moléculas ➔ Células ➔ Tecidos ➔ Órgãos ➔ Sistemas ➔ Organismo`.
* **Microsserviço Base:** A célula é a menor unidade estrutural e funcional viva e independente.
* **Gateways de Controle:** O sistema é regulado centralmente pelo **Sistema Nervoso** (fiação elétrica/respostas rápidas) e pelo **Sistema Endócrino** (mensageria via hormônios/respostas de longo prazo).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 01 (Nível: Junior)
**Enunciado:** Na arquitetura do corpo humano, qual é o componente de nível mais baixo (Low-Level) que ainda retém todas as propriedades e funções de uma estrutura viva independente?
- [ ] A) Molécula
- [ ] B) Órgão
- [ ] C) Célula
- [ ] D) Tecido
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b></details>*

#### ❓ Questão 02 (Nível: Pleno)
**Enunciado:** O ecossistema do organismo utiliza dois principais controladores de barramento para gerenciar rotinas de depuração e comunicação a curta e longa distância. Quais são eles?
- [ ] A) Sistema Digestório e Sistema Urinário
- [ ] B) Sistema Nervoso e Sistema Endócrino
- [ ] C) Tecido Epitelial e Membrana Plasmática
- [ ] D) Sistema Linfático e Tecido Adiposo
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b></details>*

---

## 💻 Slide 02: Compartimentos de Fluidos e Balanço Hídrico

### 📝 Resumo do Componente (TL;DR)
O gerenciamento de memória volátil ($H_2O$) corresponde a **60% do peso corporal total** (aproximadamente 42 Litros em um ambiente padrão de produção). Essa memória é alocada em duas partições principais:

1. **Fluido Intracelular (LIC):** Aloca **2/3** (67%) da água total (~28 Litros). Espaço interno das células.
2. **Fluido Extracelular (LEC):** Aloca **1/3** (33%) da água total (~14 Litros). Subdividido em:
   * **Fluido Intersticial:** ~74% do LEC (~10,3L) - espaço entre as células.
   * **Plasma Sanguíneo:** ~25% do LEC (~3,5L) - porção líquida do sangue.
   * **Fluido Transcelular:** ~1% do LEC - líquidos específicos (ex: cefalorraquidiano).

### 🛠️ Firewalls de Filtragem (Barreiras)
* **Membrana Plasmática:** Separa o LIC do Interstício. Permeável a água e lipídios.
* **Capilar Fenestrado:** Separa o Interstício do Plasma. Atua como um firewall rígido de pacotes: deixa passar íons e água, mas **bloqueia macromoléculas (Proteínas)**.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 03 (Nível: Junior)
**Enunciado:** Se o pool total de água de um organismo foi inicializado em 42 litros, qual partição de memória armazena a maior fatia desse volume (aproximadamente 28 litros)?
- [ ] A) Plasma Sanguíneo
- [ ] B) Fluido Intersticial
- [ ] C) Fluido Transcelular
- [ ] D) Fluido Intracelular (LIC)
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>D</b></details>*

#### ❓ Questão 04 (Nível: Senior)
**Enunciado:** Durante a depuração do tráfego molecular entre os compartimentos do LEC, percebe-se que as proteínas plasmáticas não conseguem atravessar para o espaço intersticial. Qual "firewall" de hardware é responsável por essa retenção seletiva?
- [ ] A) A bomba de prótons dependente de ATP.
- [ ] B) O endotélio do capilar fenestrado.
- [ ] C) A membrana nuclear da célula.
- [ ] D) O gradiente químico de potássio.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b></details>*

---

## 💻 Slide 03: Pressão Osmótica e Transporte Hidrostático

### 📝 Resumo do Componente (TL;DR)
A movimentação de água entre os compartimentos obedece a regras de pressão física:
* **Pressão Hidrostática:** Força de empurrão mecânico gerada pela bomba cardíaca contra as paredes dos vasos (induz a **Filtração**).
* **Pressão Osmótica ($\pi$):** Força de atração da água gerada pela concentração de solutos que não atravessam a barreira. Calculada pelo algoritmo: $\pi = i \cdot R \cdot T \cdot C$.
* **Osmolaridade Padrão:** O ponto de ajuste padrão do LEC é estável em **290 mOsm/L**.
* **Bomba $Na^+/K^+$ ATPase:** Script ativo rodando em background que gasta energia (ATP) para manter o gradiente iônico ($Na^+$ fora, $K^+$ dentro).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 05 (Nível: Pleno)
**Enunciado:** Um sistema biológico foi submetido a uma solução exógena altamente **hiperosmótica** (ex: acima de 290 mOsm/L). Qual comportamento é esperado no volume das células (LIC) devido ao protocolo de osmose?
- [ ] A) As células vão absorver água e sofrer lise (rompimento).
- [ ] B) Não haverá fluxo de água, pois o sistema ignora variações osmóticas.
- [ ] C) A água sairá do LIC em direção ao LEC, reduzindo o volume celular (murchamento).
- [ ] D) A bomba de sódio-potássio inverterá o seu fluxo instantaneamente.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b></details>*

---

## 💻 Slide 04: Homeostase e Loops de Retroalimentação

### 📝 Resumo do Componente (TL;DR)
A **Homeostase** é o estado de equilíbrio dinâmico das variáveis internas do sistema (valores de referência/default settings). O corpo humano é um **Sistema Ativo**, o que significa que ele monitora suas próprias saídas (outputs) e corrige desvios em tempo real através de **Loops de Feedback (Retroalimentação)**.

### 📊 Variáveis Globais de Configuração:
* **Temperatura Corporal:** 37 °C (Controladores: Sistema Nervoso, Tireoide, Tecido Adiposo).
* **Glicemia:** 130 mg/dL (Controladores: Sistema Nervoso, Pâncreas, Fígado).
* **pH Sanguíneo:** 7.35 - 7.45.
* **Pressão Parcial de $O_2$ ($PO_2$):** 40 mmHg (Controladores: Pulmões).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 06 (Nível: Junior)
**Enunciado:** Qual o nome do conceito que define a capacidade do organismo de rodar rotinas automáticas de ajuste para manter suas variáveis internas (como pH, temperatura e glicemia) dentro de parâmetros estáveis, mesmo diante de variações do ambiente externo?
- [ ] A) Anabolismo celular
- [ ] B) Homeostase
- [ ] C) Difusão Facilitada
- [ ] D) Metabolismo Passivo
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b></details>*

#### ❓ Questão 07 (Nível: Pleno)
**Enunciado:** Após a ingestão de uma refeição rica em carboidratos, os sensores do organismo detectam que a glicemia subiu além do valor default de 130 mg/dL. Qual componente atua diretamente emitindo comandos/respostas hormonais de regulação ativa no loop de feedback da glicose?
- [ ] A) Pulmão
- [ ] B) Estômago
- [ ] C) Pâncreas
- [ ] D) Filtro Renal
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b></details>*

---

## 📈 Logs de Performance do Aluno
| Módulo/Slide | Tópico Chave | Status do Code Review |
| :--- | :--- | :--- |
| Slide 01 | Níveis de Organização | [ ] Pendente / [ ] Compilado |
| Slide 02 | Compartimentos de Líquidos | [ ] Pendente / [ ] Compilado |
| Slide 03 | Osmolaridade e Bombas | [ ] Pendente / [ ] Compilado |
| Slide 04 | Loops de Homeostase | [ ] Pendente / [ ] Compilado |