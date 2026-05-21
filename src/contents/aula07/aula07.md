# 📑 Aula 07: Neurofisiologia I - Transmissão Sináptica & Sinalização

## 📌 Visão Geral do Módulo
Esta documentação aborda os mecanismos de comunicação intercelular do sistema nervoso. São analisadas as conexões diretas das sinapses elétricas e os processos de transmissão química das sinapses químicas, detalhando o funcionamento dos neurotransmissores e dos receptores pós-sinápticos.

---

## 💻 Slide 01: Sinapses Elétricas

### 📝 Resumo do Componente (TL;DR)
As sinapses elétricas estabelecem conexões diretas entre células, permitindo transmissão extremamente rápida de sinais elétricos sem a participação de neurotransmissores.

* **Estrutura:** Conexão direta através de **Junções Comunicantes (Gap Junctions)**.
* **Composição:** Cada junção é formada por dois conexons, e cada conexon é constituído por 6 subunidades proteicas chamadas **Conexinas**.
* **Características Funcionais:**
  * Fluxo **bidirecional** de íons e pequenas moléculas.
  * Transmissão praticamente instantânea, sem atraso sináptico significativo.
  * Importantes para sincronização rápida de células, como no músculo cardíaco e em determinados circuitos neurais.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 01 (Nível: Junior)
**Enunciado:** Nas sinapses elétricas, qual estrutura é responsável por formar uma conexão citoplasmática direta entre células adjacentes, permitindo a passagem rápida e bidirecional de íons?
- [ ] A) Recipiente de Clatrina
- [ ] B) Junção Comunicante (Gap Junction / Conexons)
- [ ] C) Receptor Metabotrópico acoplado à Proteína G
- [ ] D) Canal de Sódio Dependente de Voltagem
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: As junções comunicantes, formadas por conexons, criam canais físicos que conectam diretamente o citoplasma de células vizinhas, permitindo a passagem de correntes iónicas).</details>*

---

## 💻 Slide 02: Sinapses Químicas

### 📝 Resumo do Componente (TL;DR)
As sinapses químicas são estruturas de transmissão unidirecional que utilizam neurotransmissores para comunicar sinais entre neurónios através da fenda sináptica.

`[Elemento Pré-Sináptico] ➔ 🌌 Fenda Sináptica ➔ [Elemento Pós-Sináptico]`

* **Etapas da Transmissão Sináptica:**
  1. O **Potencial de Ação** chega ao terminal axónico pré-sináptico.
  2. A despolarização ativa os **Canais de $Ca^{2+}$ Dependentes de Voltagem**.
  3. O influxo de $Ca^{2+}$ desencadeia a **exocitose** das vesículas sinápticas.
  4. Os neurotransmissores são libertados na fenda sináptica e difundem-se até os receptores pós-sinápticos.
* **Atraso Sináptico:** Existe um pequeno intervalo de tempo (~0,5 a 5 ms) necessário para conversão do sinal elétrico em químico e posteriormente em elétrico novamente.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 02 (Nível: Pleno)
**Enunciado:** Nas sinapses químicas, qual íon é essencial para desencadear a exocitose das vesículas sinápticas após a chegada do potencial de ação ao terminal pré-sináptico?
- [ ] A) Potássio ($K^+$)
- [ ] B) Cloro ($Cl^-$)
- [ ] C) Cálcio ($Ca^{2+}$)
- [ ] D) Sódio ($Na^+$)
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: O influxo de cálcio através de canais dependentes de voltagem atua como sinal intracelular que promove a fusão das vesículas e a libertação dos neurotransmissores).</details>*

---

## 💻 Slide 03: Receptores Pós-Sinápticos

### 📝 Resumo do Componente (TL;DR)
O efeito produzido por um neurotransmissor depende do tipo de receptor presente na célula pós-sináptica.

### 🔌 Tipos de Receptores:
1. **Ionotrópicos (Canais Iónicos Controlados por Ligante):**
   * **Mecanismo:** O neurotransmissor liga-se diretamente ao receptor, promovendo abertura imediata do canal iónico.
   * **Características:** Resposta rápida e curta duração.
2. **Metabotrópicos (Receptores Acoplados à Proteína G):**
   * **Mecanismo:** A ligação do neurotransmissor ativa proteínas G e segundos mensageiros intracelulares, como AMPc e $IP_3$.
   * **Características:** Resposta mais lenta, porém com maior capacidade de modulação celular e alterações metabólicas.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 03 (Nível: Pleno)
**Enunciado:** Para produzir uma resposta pós-sináptica extremamente rápida e direta, qual tipo de receptor é mais adequado?
- [ ] A) Receptores Metabotrópicos acoplados à Proteína G
- [ ] B) Receptores Ionotrópicos (Canais iónicos ativados por ligante)
- [ ] C) Bombas de transporte ativo secundário
- [ ] D) Receptores nucleares de esteroides
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Os receptores ionotrópicos funcionam diretamente como canais iónicos, permitindo respostas rápidas após a ligação do neurotransmissor).</details>*

---

## 💻 Slide 04: Integração de Sinais - PEPS vs PIPS

### 📝 Resumo do Componente (TL;DR)
A célula pós-sináptica integra múltiplos sinais excitatórios e inibitórios para determinar se ocorrerá ou não a geração de um potencial de ação.

* **PEPS (Potencial Excitatório Pós-Sináptico):** Produz despolarização local da membrana, aproximando o potencial do limiar de disparo.
* **PIPS (Potencial Inibitório Pós-Sináptico):** Produz hiperpolarização da membrana, afastando o potencial do limiar de disparo.

### 🧼 Clareamento da Fenda Sináptica
Para impedir estimulação contínua, os neurotransmissores precisam ser removidos da fenda sináptica através de diferentes mecanismos:
1. **Difusão:** Dispersão natural para fora da fenda.
2. **Degradação Enzimática:** Enzimas degradam neurotransmissores específicos (ex.: acetilcolinesterase degradando acetilcolina).
3. **Recaptação:** Neurotransmissores são recaptados pelo terminal pré-sináptico ou por células da glia para reutilização.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 04 (Nível: Senior)
**Enunciado:** Durante a atividade de um neurónio motor, ocorre abertura de canais de Cloro ($Cl^-$) pós-sinápticos induzida pelo neurotransmissor GABA. Qual será o efeito na membrana e que tipo de potencial será produzido?
- [ ] A) Ocorre despolarização, gerando um PEPS.
- [ ] B) Ocorre estabilização térmica celular.
- [ ] C) Ocorre hiperpolarização, gerando um PIPS que reduz a excitabilidade da célula.
- [ ] D) O sinal elétrico é amplificado por feedback positivo.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: A entrada de íons Cloro aumenta a negatividade intracelular, produzindo hiperpolarização e reduzindo a probabilidade de geração de um potencial de ação).</details>*

#### ❓ Questão 05 (Nível: Senior)
**Enunciado:** Caso os mecanismos de degradação enzimática e recaptação de um neurotransmissor excitatório sejam completamente inibidos, qual será a consequência fisiológica mais provável?
- [ ] A) O neurónio pré-sináptico sofrerá lise imediata.
- [ ] B) A transmissão pós-sináptica será interrompida.
- [ ] C) Haverá estimulação contínua e excessiva dos receptores pós-sinápticos devido à permanência do neurotransmissor na fenda sináptica.
- [ ] D) Os receptores ionotrópicos transformar-se-ão em metabotrópicos.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: Sem recaptação ou degradação, o neurotransmissor permanece ativo na fenda sináptica, promovendo estimulação prolongada dos receptores pós-sinápticos).</details>*

---

## 📈 Acompanhamento de Desempenho do Aluno
| Módulo/Slide | Tópico Chave | Status de Revisão |
| :--- | :--- | :--- |
| Slide 01 | Sinapses Elétricas & Conexinas | [ ] Pendente / [ ] Revisado |
| Slide 02 | Sinapses Químicas & Influxo de Cálcio | [ ] Pendente / [ ] Revisado |
| Slide 03 | Receptores Ionotrópicos vs Metabotrópicos | [ ] Pendente / [ ] Revisado |
| Slide 04 | Integração PEPS/PIPS & Clareamento da Fenda | [ ] Pendente / [ ] Revisado |