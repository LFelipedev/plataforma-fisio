# 📑 Aula 03: Potencial de Ação & Propagação do Impulso Bioelétrico (Hardware Excitability)

## 📌 Visão Geral do Módulo
Esta documentação detalha os protocolos elétricos e biofísicos que controlam a polarização, despolarização e a transmissão de sinais digitais (impulso bioelétrico) através da membrana plasmática celular. Mapeamos as portas lógicas iónicas e os algoritmos de propagação de pacotes de dados.

---

## 💻 Slide 01: Potencial de Membrana em Repouso (Default Voltage Settings)

### 📝 Resumo do Componente (TL;DR)
A membrana celular atua como um capacitor elétrico, mantendo uma diferença de potencial de voltagem (DDP) padrão estável em background. 

* **Configuração de Fábrica (Estado de Repouso):** O potencial interno da célula está fixado em aproximadamente **$-75\text{ mV}$** a **$-70\text{ mV}$**.
* **Gradiente de Concentração (Data Logs):**
  * **$K^+$ (Potássio):** Alta concentração no ambiente Intracelular ($\approx 120\text{ mM}$) vs Extracelular ($\approx 4,4\text{ mM}$). O seu potencial de equilíbrio ($E_K$) é de $-85\text{ mV}$.
  * **$Na^+$ (Sódio):** Alta concentração no ambiente Extracelular ($\approx 145\text{ mM}$) vs Intracelular ($\approx 18\text{ mM}$). O seu potencial de equilíbrio ($E_{Na}$) é de $+53\text{ mV}$.
* **Permeabilidade Relativa ($p$):** Em repouso, a membrana é muito mais permeável ao $K^+$ ($p_K = 1$) do que ao $Na^+$ ($p_{Na} = 0,04$). Por isso, a voltagem de repouso fica tão próxima do equilíbrio do Potássio.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 01 (Nível: Junior)
**Enunciado:** No estado de repouso (Default State), a voltagem interna da membrana celular é mantida negativa (cerca de $-75\text{ mV}$). Qual é o íon cuja alta permeabilidade em repouso puxa o potencial da membrana para próximo do seu valor de equilíbrio?
- [ ] A) Sódio ($Na^+$)
- [ ] B) Potássio ($K^+$)
- [ ] C) Cloro ($Cl^-$)
- [ ] D) Cálcio ($Ca^{2+}$)
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Como a permeabilidade ao K+ é muito maior em repouso, o potencial de membrana aproxima-se do potencial de equilíbrio deste íon, que é -85 mV).</details>*

---

## 💻 Slide 02: O Gatilho e as Portas Lógicas (Canais Dependentes de Voltagem)

### 📝 Resumo do Componente (TL;DR)
Para iniciar uma transmissão de dados (Potencial de Ação), o sistema precisa de receber um estímulo elétrico que atinja uma métrica mínima: o **Potencial Limiar** ($\approx -55\text{ mV}$). Se o estímulo não atingir este valor, a execução falha e o sinal morre (Lei do Tudo ou Nada).

### 🛠️ Portas Lógicas Ativadas:
1. **Canais de $Na^+$ Dependentes de Voltagem:** Abrem-se rapidamente ao atingir o limiar. Possuem duas comportas: de ativação e de inativação.
2. **Canais de $K^+$ Dependentes de Voltagem:** Têm uma abertura lenta, sendo acionados apenas no pico da despolarização para restaurar o sistema.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 02 (Nível: Pleno)
**Enunciado:** Analise o código lógico do neurónio: um estímulo de entrada alterou a voltagem da membrana de $-75\text{ mV}$ para $-60\text{ mV}$. O sistema falhou em disparar o potencial de ação. Por que razão o pacote de dados não foi enviado?
- [ ] A) Os canais de Potássio travaram o sistema.
- [ ] B) O estímulo foi hiperpolarizante.
- [ ] C) O estímulo não atingiu o Potencial Limiar mínimo de aproximadamente $-55\text{ mV}$.
- [ ] D) A bomba de sódio-potássio consumiu todo o ATP.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: Pela Lei do Tudo ou Nada, se o potencial de membrana não alcançar o limiar de -55 mV, as comportas de sódio não abrem em massa e o potencial de ação não é gerado).</details>*

---

## 💻 Slide 03: Ciclo do Potencial de Ação (Execution Pipeline)

### 📝 Resumo do Componente (TL;DR)
O ciclo completo de um potencial de ação executa 3 sub-rotinas sequenciais na "fiação" do axónio:
`[Repouso: -75mV] ➔ [Despolarização: Influxo de Na+] ➔ [Repolarização: Efluxo de K+] ➔ [Hiperpolarização] ➔ [Retorno ao Repouso]`

1. **Despolarização:** O limiar é atingido, abrindo as comportas de $Na^+$. O $Na^+$ entra massivamente na célula (Influxo), invertendo a polaridade da membrana até cerca de $+30\text{ mV}$.
2. **Repolarização:** No pico, as comportas de inativação do canal de $Na^+$ fecham (bloqueio de tráfego) e os canais de $K^+$ abrem. O $K^+$ sai rapidamente (Efluxo), trazendo a voltagem de volta para o campo negativo.
3. **Hiperpolarização:** Como os canais de $K^+$ demoram a fechar, sai mais carga positiva do que o necessário, fazendo a voltagem cair temporariamente abaixo do nível de repouso ($\approx -80\text{ mV}$).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 03 (Nível: Pleno)
**Enunciado:** Durante a fase de **Despolarização** do potencial de ação, ocorre uma inversão abrupta da polaridade da membrana (o interior fica positivo). Qual é o mecanismo de transporte de rede responsável por esta fase?
- [ ] A) Efluxo massivo de íons Potássio ($K^+$).
- [ ] B) Bloqueio total da atividade da glicose.
- [ ] C) Influxo massivo de íons Sódio ($Na^+$) por canais dependentes de voltagem.
- [ ] D) Ativação reversa da bomba de cálcio.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: A abertura rápida dos canais de Na+ permite a entrada rápida de cargas positivas na célula, despolarizando a membrana).</details>*

#### ❓ Questão 04 (Nível: Senior)
**Enunciado:** O que justifica o fenómeno de **Hiperpolarização**, onde a voltagem do sistema cai temporariamente abaixo do nível de repouso original?
- [ ] A) A inativação precoce dos canais de sódio.
- [ ] B) O encerramento lento e tardio dos canais de potássio dependentes de voltagem.
- [ ] C) A exaustão completa das reservas de ATP da célula.
- [ ] D) A entrada maciça de proteínas no meio intracelular.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Os canais de K+ fecham-se devagar; com isso, o efluxo de potássio continua por mais tempo, deixando a célula temporariamente mais negativa do que o seu estado de repouso normal).</details>*

---

## 💻 Slide 04: Períodos Refratários e Propagação de Sinal (Bandwidth Control)

### 📝 Resumo do Componente (TL;DR)
Para garantir que o sinal elétrico se propaga numa **única direção** (unidirecional) e não sofra colisões de dados, a membrana possui um sistema de trava temporal chamado **Período Refratário**:

* **Período Refratário Absoluto (PRA):** Janela de tempo onde é **impossível** gerar um novo potencial de ação, independentemente da força do estímulo. Ocorre porque os canais de $Na^+$ estão no estado *Inativado* (comporta de inativação fechada).
* **Período Refratário Relativo (PRR):** Janela onde um novo sinal pode ser gerado, mas exige um estímulo de intensidade muito superior ao limiar normal. Ocorre durante a hiperpolarização, onde os canais de $Na^+$ já resetaram para o estado *Fechado*, mas o potencial ainda está muito negativo e os canais de $K^+$ continuam abertos.

### ⚡ Tipos de Propagação (Network Cables):
* **Propagação Contínua:** Em axónios amielínicos (sem isolamento). O sinal trafega de forma lenta, despolarizando milímetro por milímetro da membrana.
* **Propagação Saltatória (High-Speed):** Em axónios com **Bainha de Mielina** (isolante elétrico produzido por oligodendrócitos/células de Schwann). O potencial de ação "salta" apenas de um **Nó de Ranvier** para o outro, multiplicando a velocidade com baixo consumo de energia.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 05 (Nível: Senior)
**Enunciado:** No decorrer do Período Refratário Absoluto (PRA), a aplicação de um segundo estímulo de Overclock (intensidade máxima) é incapaz de disparar um novo potencial de ação. Qual é a causa biofísica deste travamento de segurança?
- [ ] A) Os canais de potássio estão totalmente inativados.
- [ ] B) Os canais de sódio dependentes de voltagem encontram-se no estado inativado, impedindo a sua reabertura imediata.
- [ ] C) A membrana fundiu-se temporariamente com o meio extracelular.
- [ ] D) O potencial de membrana atingiu o infinito elétrico.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Durante o PRA, as comportas de inativação dos canais de Na+ estão fechadas e bloqueadas. O canal precisa primeiro voltar ao estado fechado antes de poder ser ativado novamente).</details>*

#### ❓ Questão 06 (Nível: Pleno)
**Enunciado:** A otimização da velocidade de transmissão do impulso elétrico no sistema nervoso é alcançada através da **condução saltatória**. Que componente estrutural funciona como o "isolante de hardware" que força o sinal a saltar entre os Nós de Ranvier?
- [ ] A) Bomba de Sódio-Potássio
- [ ] B) Canais iónicos de vazamento
- [ ] C) Bainha de Mielina
- [ ] D) Citoplasma axonal
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: A bainha de mielina funciona como um isolante elétrico que impede a perda de corrente, fazendo com que o potencial de ação se propague aos saltos de um nó de Ranvier para o outro).</details>*

---

## 📈 Logs de Performance do Aluno
| Módulo/Slide | Tópico Chave | Status do Code Review |
| :--- | :--- | :--- |
| Slide 01 | Potencial de Repouso e Íons | [ ] Pendente / [ ] Compilado |
| Slide 02 | Potencial Limiar e Canais | [ ] Pendente / [ ] Compilado |
| Slide 03 | Fases do Potencial de Ação | [ ] Pendente / [ ] Compilado |
| Slide 04 | Período Refratário e Mielina | [ ] Pendente / [ ] Compilado |