# 📑 Aula 08: Neurofisiologia II - Sistema Nervoso Autónomo (Peripheral Infrastructure & Dual-Stack Controllers)

## 📌 Visão Geral do Módulo
Esta documentação detalha a arquitetura do Sistema Nervoso Autónomo (SNA), o subsistema periférico responsável pelo controlo automático e involuntário das funções viscerais do organismo (regras de negócio em background). Analisamos o modelo de controlo dual-stack (Simpático vs Parassimpático), as suas rotas de cablagem (vias eferentes) e os protocolos de mensageria química (neurotransmissores e receptores).

---

## 💻 Slide 01: Arquitetura da Rede Periférica - Divisões do SNA

### 📝 Resumo do Componente (TL;DR)
O Sistema Nervoso Periférico Motor é dividido em duas grandes infraestruturas de hardware: o Sistema Somático (controlo voluntário de músculos esqueléticos) e o **Sistema Nervoso Autónomo (SNA)** (controlo involuntário). 

* **Rotas de Conectividade (Vias Eferentes):**
  * **Sistema Somático:** Ligação direta (Single-Cable). Um único neurónio motor sai do SNC e vai diretamente até ao efetor.
  * **Sistema Autónomo (SNA):** Ligação em série (Two-Node Cascade). O sinal passa obrigatoriamente por um nó de rede intermediário (Gânglio Autónomo).
* **Componentes da Cascata Autónoma:**
  1. **Neurónio Pré-ganglionar:** O seu corpo celular reside no SNC; o seu axónio viaja até ao gânglio.
  2. **Gânglio Autónomo:** Cluster de sinapses periféricas que atua como um repetidor de sinal.
  3. **Neurónio Pós-ganglionar:** O seu corpo celular está no gânglio; o seu axónio estende-se até ao órgão efetor (músculo liso, cardíaco ou glândulas).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 01 (Nível: Junior)
**Enunciado:** Ao analisar a cablagem do Sistema Nervoso Autónomo (SNA), um engenheiro nota que, ao contrário do sistema somático voluntário, o SNA utiliza uma topologia de dois neurónios em série para enviar dados aos efetores. Qual é o nome da estrutura periférica onde ocorre a sinapse entre o primeiro e o segundo neurónio desta via?
- [ ] A) Córtex Motor Central
- [ ] B) Gânglio Autónomo
- [ ] C) Placa Motora Terminal
- [ ] D) Nó de Ranvier
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: O gânglio autónomo é a estrutura periférica que abriga os corpos celulares dos neurónios pós-ganglionares e onde os neurónios pré-ganglionares fazem a sua sinapse).</details>*

---

## 💻 Slide 02: O Modelo Dual-Stack - Simpático vs Parassimpático

### 📝 Resumo do Componente (TL;DR)
O SNA opera através de dois subsistemas principais que exercem ações antagónicas na maioria dos órgãos (Mecanismo de Balanceamento de Carga):

* **Módulo Simpático (Fight or Flight / Alerta Máximo):**
  * **Função:** Prepara o sistema para gastar energia e responder a situações de stress, emergência ou ameaça (*Overclock*).
  * **Anatomia:** Divisão **Toracolombar** (as fibras saem da medula espinhal pelas regiões torácica e lombar).
  * **Perfil de Fibra:** Axónios pré-ganglionares curtos e pós-ganglionares longos (gânglios próximos da medula).
* **Módulo Parassimpático (Rest and Digest / Manutenção Basal):**
  * **Função:** Conserva energia, desacelera o sistema e coordena rotinas de manutenção interna (digestão, repouso).
  * **Anatomia:** Divisão **Craniossacral** (as fibras saem do tronco encefálico e da região sacral da medula).
  * **Perfil de Fibra:** Axónios pré-ganglionares longos e pós-ganglionares curtos (gânglios dentro ou muito próximos do órgão efetor).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 02 (Nível: Pleno)
**Enunciado:** Durante um cenário de stress físico extremo ("Luta ou Fuga"), o organismo precisa de instanciar rotinas de aceleração cardíaca e dilatação de vias aéreas. Qual o subsistema autónomo e qual a sua origem anatómica na medula espinhal envolvidos nesta ativação?
- [ ] A) Parassimpático, com origem Craniossacral.
- [ ] B) Somático, com origem Toracolombar.
- [ ] C) Simpático, com origem Toracolombar.
- [ ] D) Entérico, com origem Sacral pura.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: O sistema nervoso simpático é o responsável pelas respostas de luta ou fuga e possui origem anatómica toracolombar).</details>*

---

## 💻 Slide 03: Protocolos de Mensageria - Neurotransmissores

### 📝 Resumo do Componente (TL;DR)
A transmissão de comandos elétricos através da cascata autónoma exige a libertação de payloads químicos específicos (**Neurotransmissores**):

* **Fibras Colinérgicas (Libertam Acetilcolina - ACh):**
  * **Regra de Negócio 1:** **Todos** os neurónios pré-ganglionares (tanto do Simpático como do Parassimpático) libertam ACh no gânglio autónomo.
  * **Regra de Negócio 2:** Todos os neurónios pós-ganglionares do **Parassimpático** libertam ACh no órgão efetor.
* **Fibras Adrenérgicas (Libertam Noradrenalina - NA / Norepinefrina):**
  * **Regra de Negócio 3:** Quase todos os neurónios pós-ganglionares do **Simpático** libertam Noradrenalina no efetor (Exceção: glândulas sudoríparas, que usam ACh).
* **Exceção de Hardware (Glândula Suprarrenal / Adrenal):** Funciona como um gânglio simpático modificado. Neurónios pré-ganglionares simpáticos conectam-se diretamente a ela, forçando a libertação de Adrenalina (80%) e Noradrenalina (20%) diretamente no fluxo sanguíneo (Mensageria Global / Broadcast).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 03 (Nível: Pleno)
**Enunciado:** Analise o fluxo de dados químicos numa sinapse pós-ganglionar do sistema **Parassimpático**. Qual é o neurotransmissor específico libertado no terminal axónico para interagir com as células do órgão efetor?
- [ ] A) Noradrenalina
- [ ] B) Dopamina
- [ ] C) Acetilcolina
- [ ] D) Adrenalina
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: Os neurónios pós-ganglionares do sistema parassimpático são colinérgicos, ou seja, utilizam exclusivamente a acetilcolina como o seu sinalizador químico pós-ganglionar).</details>*

---

## 💻 Slide 04: Configuração de Receptores (Drivers de Leitura do SNA)

### 📝 Resumo do Componente (TL;DR)
A resposta pós-sináptica é determinada pelo tipo de receptor (driver) expresso na membrana alvo.

### 🔌 Receptores Colinérgicas (Lêem ACh):
1. **Nicotínicos ($N_1$ ou $N_n$ / $N_2$ ou $N_m$):**
   * **Tipo:** Ionotrópicos (Canais de Sódio/Potássio rápidos).
   * **Localização:** Presentes em **todos** os corpos celulares ganglionares (SNA Simpático e Parassimpático) e na placa motora muscular.
2. **Muscarínicos ($M_1$ a $M_5$):**
   * **Tipo:** Metabotrópicos (Acoplados à Proteína G, geram segundos mensageiros).
   * **Localização:** Presentes nos órgãos efetores do **Parassimpático**.

### 🔌 Receptores Adrenérgicos (Lêem Noradrenalina/Adrenalina):
*Todos são Metabotrópicos (Acoplados à Proteína G):*
* **Alfa-1 ($\alpha_1$):** Geralmente excitatório (Causa vasoconstrição periférica).
* **Alfa-2 ($\alpha_2$):** Geralmente inibitório (Atua como autoreceptor pré-sináptico, travando a libertação de mais NA).
* **Beta-1 ($\beta_1$):** Excitatório no Coração (Aumenta a frequência cardíaca e a força de contração - *Overclock* Cardíaco).
* **Beta-2 ($\beta_2$):** Inibitório/Relaxamento (Promove a broncodilatação nos pulmões).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 04 (Nível: Senior)
**Enunciado:** Um paciente foi tratado com um fármaco antagonista (bloqueador) seletivo de receptores do tipo **Beta-1 ($\beta_1$)** adrenérgicos. Qual será o impacto direto esperado nas métricas de performance do sistema cardiovascular?
- [ ] A) Vasoconstrição generalizada das artérias da pele.
- [ ] B) Redução da frequência cardíaca e da força de contração do miocárdio.
- [ ] C) Broncodilatação maciça e alívio de crises de asma.
- [ ] D) Ativação imediata da digestão estomacal.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Como os receptores Beta-1 são excitatórios e estão localizados predominantemente no tecido cardíaco, o seu bloqueio impede a ação da noradrenalina/adrenalina, reduzindo os batimentos e o débito do coração).</details>*

#### ❓ Questão 05 (Nível: Senior)
**Enunciado:** Se um programador biológico aplicar uma mutação que delete todos os **Receptores Nicotínicos** dos gânglios autónomos de um organismo modelo, qual será a consequência direta na transmissão de pacotes de dados?
- [ ] A) Apenas o sistema simpático parará de funcionar.
- [ ] B) O sistema parassimpático continuará ativo através de vias alternativas muscarínicas nos gânglios.
- [ ] C) Haverá um bloqueio total da sinalização ganglionar tanto no ramo simpático como no parassimpático, pois ambos dependem de receptores nicotínicos no gânglio para receber a ACh pré-ganglionar.
- [ ] D) Os órgãos efetores passarão a libertar neurotransmissores por conta própria.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: Os receptores nicotínicos são as portas de entrada obrigatórias localizadas nos gânglios de ambas as divisões do SNA. Sem eles, os neurónios pré-ganglionares não conseguem excitar os neurónios pós-ganglionares).</details>*

---

## 📈 Logs de Performance do Aluno
| Módulo/Slide | Tópico Chave | Status do Code Review |
| :--- | :--- | :--- |
| Slide 01 | Vias em Série e Gânglios | [ ] Pendente / [ ] Compilado |
| Slide 02 | Divisão Toracolombar vs Craniossacral | [ ] Pendente / [ ] Compilado |
| Slide 03 | Fibras Colinérgicas vs Adrenérgicas | [ ] Pendente / [ ] Compilado |
| Slide 04 | Receptores Nicotínicos, Muscarínicos e Alfas/Betas | [ ] Pendente / [ ] Compilado |