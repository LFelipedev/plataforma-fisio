# 📑 Aula 07: Neurofisiologia I - Transmissão Sináptica & Sinalização (Network Architecture & Protocols)

## 📌 Visão Geral do Módulo
Esta documentação mapeia os protocolos de comunicação intercelular do sistema nervoso. Analisamos a infraestrutura física de conexões diretas (Sinapses Elétricas) e a arquitetura orientada a eventos e mensageria química (Sinapses Químicas), detalhando o ciclo de vida dos neurotransmissores e receptores.

---

## 💻 Slide 01: Sinapses Elétricas (Hardware Bridges & Sincronização)

### 📝 Resumo do Componente (TL;DR)
As sinapses elétricas funcionam como conexões físicas diretas de baixa latência (True Real-Time) entre duas células, sem necessidade de intermediários químicos.

* **Infraestrutura:** Conexão direta por **Junções Comunicantes (Gap Junctions)**.
* **Componentes de Conectividade:** Cada junção é formada por dois conexons (um de cada membrana), e cada conexon é um canal composto por 6 subunidades da proteína **Conexina**.
* **Comportamento de Rede:** * Fluxo **bidirecional** de íons e micromoléculas.
  * Transmissão instantânea (sem atraso sináptico).
  * Atuam como **sincronizadores celulares** rápidos (ex.: redes neurais de escape, músculo cardíaco).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 01 (Nível: Junior)
**Enunciado:** No mapeamento de hardware das sinapses elétricas, qual é a estrutura de proteína responsável por criar uma ponte citoplasmática direta, permitindo o fluxo bidirecional e instantâneo de íons entre duas células adjacentes?
- [ ] A) Recipiente de Clatrina
- [ ] B) Junção Comunicante (Gap Junction / Conexons)
- [ ] C) Receptor Metabotrópico G-Protein
- [ ] D) Canal de Sódio Dependente de Voltagem
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: As junções comunicantes, formadas por conexons, criam canais físicos que interligam diretamente o citoplasma das células, permitindo a passagem livre de correntes iónicas).</details>*

---

## 💻 Slide 02: Sinapses Químicas (Event-Driven Architecture & Mensageria)

### 📝 Resumo do Componente (TL;DR)
Diferente das elétricas, as sinapses químicas são **unidirecionais** e utilizam um modelo de comunicação baseado em eventos através de uma fenda sináptica (espaço físico de isolamento).

`[Elemento Pré-Sináptico] ➔ 🌌 Fenda Sináptica ➔ [Elemento Pós-Sináptico]`

* **Pipeline de Execução (Disparo de Evento):**
  1. O **Potencial de Ação** (Impulso Elétrico) chega ao terminal axónico pré-sináptico.
  2. A despolarização ativa os **Canais de $Ca^{2+}$ (Cálcio) Dependentes de Voltagem**.
  3. O $Ca^{2+}$ entra no terminal (Influxo) e atua como o gatilho de execução para a **exocitose** das vesículas sinápticas.
  4. O payload químico (**Neurotransmissor**) é libertado na fenda sináptica e difunde-se até aos receptores pós-sinápticos.
* **Atraso Sináptico (Latency):** Existe um delay de ~0,5 a 5 ms necessário para a conversão de sinal elétrico ➔ químico ➔ elétrico.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 02 (Nível: Pleno)
**Enunciado:** Nas sinapses químicas, a chegada do potencial de ação ao terminal pré-sináptico não liberta os neurotransmissores de forma direta. Qual é o íon/gatilho essencial que precisa de entrar no terminal para iniciar o script de exocitose das vesículas?
- [ ] A) Potássio ($K^+$)
- [ ] B) Cloro ($Cl^-$)
- [ ] C) Cálcio ($Ca^{2+}$)
- [ ] D) Sódio ($Na^+$)
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: O influxo de Cálcio através de canais dependentes de voltagem é o sinal intracelular que ativa as proteínas de fusão vesicular, promovendo a exocitose dos neurotransmissores).</details>*

---

## 💻 Slide 03: Receptores Pós-Sinápticos (Drivers & Processadores de Sinais)

### 📝 Resumo do Componente (TL;DR)
O neurotransmissor atua apenas como uma mensagem de sinalização. O comportamento final do sistema pós-sináptico depende exclusivamente do tipo de **Receptor** (Driver) que vai processar o payload.

### 🔌 Tipos de Receptores (Interfaces):
1. **Ionotrópicos (Canais Iónicos Controlados por Ligante):**
   * **Mecanismo:** O neurotransmissor liga-se e abre diretamente o canal iónico.
   * **Performance:** Resposta ultra rápida (Fast synaptic transmission).
2. **Metabotrópicos (Receptores Acoplados à Proteína G):**
   * **Mecanismo:** A ligação ativa uma cascata bioquímica interna através da **Proteína G** e segundos mensageiros (ex.: AMPc, $IP_3$).
   * **Performance:** Resposta lenta, mas com alto poder de modulação, amplificação de sinal e alterações na expressão genética da célula.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 03 (Nível: Pleno)
**Enunciado:** Um desenvolvedor de sistemas neurofisiológicos precisa de programar uma sinapse com uma resposta pós-sináptica extremamente rápida e direta. Qual classe de receptores deve ser selecionada para esta função?
- [ ] A) Receptores Metabotrópicos acoplados à Proteína G
- [ ] B) Receptores Ionotrópicos (Canais iónicos ativados por ligante)
- [ ] C) Bombas de transporte ativo secundário
- [ ] D) Receptores nucleares de esteroides
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Os receptores ionotrópicos são os próprios canais iónicos. Quando o ligante se acopla, a abertura é imediata, gerando respostas rápidas na ordem dos milissegundos).</details>*

---

## 💻 Slide 04: Integração de Sinais - PEPS vs PIPS (Bitwise Logic Gates)

### 📝 Resumo do Componente (TL;DR)
A célula pós-sináptica funciona como uma unidade lógica de processamento de dados que realiza a **Soma Espacial e Temporal** de milhares de sinais de entrada para decidir se dispara ou não um potencial de ação.

* **PEPS (Potencial Excitatório Pós-Sináptico):** Despolarizações locais (ex.: abertura de canais de $Na^+$ ou $Ca^{2+}$). Trazem o potencial para mais perto do limiar de disparo. (Sinal `+1`).
* **PIPS (Potencial Inibitório Pós-Sináptico):** Hiperpolarizações locais (ex.: abertura de canais de $K^+$ ou entrada de $Cl^-$). Afastam o potencial do limiar de disparo. (Sinal `-1`).

### 🧼 Garbage Collection (Clareamento da Fenda):
Para evitar loopings infinitos de leitura e saturação do sistema, os neurotransmissores remanescentes na fenda precisam de ser eliminados através de três rotinas de limpeza:
1. **Difusão:** Afastamento fluxo natural para fora da fenda.
2. **Degradação Enzimática:** Scripts químicos destroem o transmissor (ex.: Acetilcolinesterase limpando a Acetilcolina).
3. **Recaptação:** Transportadores pré-sinápticos ou células da glia (como astrócitos) realizam o "reupload" do neurotransmissor para reciclagem.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 04 (Nível: Senior)
**Enunciado:** Durante o processamento de sinais num neurónio motor, ocorre a abertura simultânea de canais de Cloro ($Cl^-$) pós-sinápticos provocada pela libertação do neurotransmissor GABA. O que acontece com a voltagem da membrana e qual o tipo de sinal gerado?
- [ ] A) Ocorre uma despolarização, gerando um PEPS.
- [ ] B) Ocorre uma inversão térmica celular, gerando um potencial de repouso.
- [ ] C) Ocorre uma hiperpolarização (entrada de cargas negativas), gerando um PIPS que inibe a célula.
- [ ] D) O sinal elétrico é amplificado por feedback positivo.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: O influxo de íons Cloro adiciona cargas negativas no interior da célula, causando uma hiperpolarização. Isso afasta a membrana do limiar, caracterizando um PIPS).</details>*

#### ❓ Questão 05 (Nível: Senior)
**Enunciado:** Se um bug farmacológico inibir completamente o script de **degradação enzimática** e a **recaptação** de um neurotransmissor excitatório na fenda sináptica, qual será a consequência direta na sinalização de rede?
- [ ] A) O neurónio pré-sináptico sofrerá lise imediata.
- [ ] B) A sinalização pós-sináptica será interrompida por falta de dados.
- [ ] C) Haverá uma estimulação contínua e excessiva dos receptores pós-sinápticos devido à persistência do transmissor na fenda, podendo gerar toxicidade.
- [ ] D) Os receptores ionotrópicos transformam-se em metabotrópicos automaticamente.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: Sem os mecanismos de recaptação/degradação, o neurotransmissor continua ligado aos receptores da fenda, mantendo os canais abertos e provocando superestimulação contínua do sistema).</details>*

---

## 📈 Logs de Performance do Aluno
| Módulo/Slide | Tópico Chave | Status do Code Review |
| :--- | :--- | :--- |
| Slide 01 | Sinapses Elétricas & Conexinas | [ ] Pendente / [ ] Compilado |
| Slide 02 | Sinapses Químicas & Influxo de Cálcio | [ ] Pendente / [ ] Compilado |
| Slide 03 | Receptores Ionotrópicos vs Metabotrópicos | [ ] Pendente / [ ] Compilado |
| Slide 04 | Integração PEPS/PIPS & Limpeza de Fenda | [ ] Pendente / [ ] Compilado |