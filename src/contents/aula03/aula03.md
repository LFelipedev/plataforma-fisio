# 📑 Aula 03: Potencial de Ação & Propagação do Impulso Bioelétrico

## 📌 Visão Geral do Módulo
Esta documentação detalha os mecanismos elétricos e biofísicos responsáveis pela polarização, despolarização e transmissão do impulso bioelétrico através da membrana plasmática celular. São abordados os canais iónicos e os processos fisiológicos envolvidos na propagação do sinal nervoso.

---

## 💻 Slide 01: Potencial de Membrana em Repouso

### 📝 Resumo do Componente (TL;DR)
A membrana celular comporta-se como uma estrutura eletricamente polarizada, mantendo uma diferença de potencial estável entre o meio intracelular e extracelular.

* **Estado de Repouso:** O potencial elétrico interno da célula permanece em aproximadamente **$-75\text{ mV}$** a **$-70\text{ mV}$**.
* **Gradiente de Concentração Iónica:**
  * **$K^+$ (Potássio):** Alta concentração no meio intracelular ($\approx 120\text{ mM}$) em comparação ao meio extracelular ($\approx 4,4\text{ mM}$). Seu potencial de equilíbrio ($E_K$) é de $-85\text{ mV}$.
  * **$Na^+$ (Sódio):** Alta concentração no meio extracelular ($\approx 145\text{ mM}$) em comparação ao meio intracelular ($\approx 18\text{ mM}$). Seu potencial de equilíbrio ($E_{Na}$) é de $+53\text{ mV}$.
* **Permeabilidade Relativa ($p$):** Em repouso, a membrana apresenta maior permeabilidade ao $K^+$ ($p_K = 1$) do que ao $Na^+$ ($p_{Na} = 0,04$). Por isso, o potencial de repouso aproxima-se do potencial de equilíbrio do potássio.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 01 (Nível: Junior)
**Enunciado:** No estado de repouso, a voltagem interna da membrana celular mantém-se negativa (cerca de $-75\text{ mV}$). Qual íon possui maior influência nesse potencial devido à sua elevada permeabilidade em repouso?
- [ ] A) Sódio ($Na^+$)
- [ ] B) Potássio ($K^+$)
- [ ] C) Cloro ($Cl^-$)
- [ ] D) Cálcio ($Ca^{2+}$)
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Como a permeabilidade ao K+ é muito maior em repouso, o potencial de membrana aproxima-se do potencial de equilíbrio deste íon, que é -85 mV).</details>*

---

## 💻 Slide 02: Potencial Limiar e Canais Dependentes de Voltagem

### 📝 Resumo do Componente (TL;DR)
Para iniciar um potencial de ação, a membrana precisa receber um estímulo capaz de atingir o **Potencial Limiar** ($\approx -55\text{ mV}$). Caso esse valor não seja alcançado, o potencial de ação não é gerado, conforme a **Lei do Tudo ou Nada**.

### 🛠️ Canais Iónicos Ativados:
1. **Canais de $Na^+$ Dependentes de Voltagem:** Abrem-se rapidamente ao atingir o limiar. Possuem comportas de ativação e de inativação.
2. **Canais de $K^+$ Dependentes de Voltagem:** Apresentam abertura mais lenta, participando principalmente da repolarização da membrana.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 02 (Nível: Pleno)
**Enunciado:** Um estímulo alterou o potencial de membrana de $-75\text{ mV}$ para $-60\text{ mV}$, mas não ocorreu geração do potencial de ação. Qual é a explicação fisiológica para isso?
- [ ] A) Os canais de Potássio impediram completamente a despolarização.
- [ ] B) O estímulo provocou hiperpolarização da membrana.
- [ ] C) O estímulo não atingiu o Potencial Limiar aproximado de $-55\text{ mV}$.
- [ ] D) A bomba de sódio-potássio consumiu todo o ATP celular.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: Pela Lei do Tudo ou Nada, se o potencial de membrana não alcançar o limiar de -55 mV, os canais de sódio não abrem em grande escala e o potencial de ação não é gerado).</details>*

---

## 💻 Slide 03: Ciclo do Potencial de Ação

### 📝 Resumo do Componente (TL;DR)
O potencial de ação ocorre em diferentes fases sequenciais na membrana do axónio:

`[Repouso: -75mV] ➔ [Despolarização: Entrada de Na+] ➔ [Repolarização: Saída de K+] ➔ [Hiperpolarização] ➔ [Retorno ao Repouso]`

1. **Despolarização:** O limiar é atingido, promovendo abertura dos canais de $Na^+$. O sódio entra rapidamente na célula, invertendo temporariamente a polaridade da membrana até cerca de $+30\text{ mV}$.
2. **Repolarização:** Os canais de $Na^+$ tornam-se inativados e os canais de $K^+$ abrem-se. O potássio sai da célula, restaurando o potencial negativo.
3. **Hiperpolarização:** Os canais de $K^+$ permanecem abertos por mais tempo do que o necessário, levando a uma queda temporária do potencial abaixo do valor de repouso ($\approx -80\text{ mV}$).

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 03 (Nível: Pleno)
**Enunciado:** Durante a fase de **Despolarização** do potencial de ação, ocorre uma inversão temporária da polaridade da membrana. Qual mecanismo fisiológico é responsável por essa alteração?
- [ ] A) Saída massiva de íons Potássio ($K^+$).
- [ ] B) Interrupção total do metabolismo celular.
- [ ] C) Entrada massiva de íons Sódio ($Na^+$) através de canais dependentes de voltagem.
- [ ] D) Ativação reversa da bomba de cálcio.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: A abertura rápida dos canais de Na+ permite a entrada intensa de cargas positivas na célula, despolarizando a membrana).</details>*

#### ❓ Questão 04 (Nível: Senior)
**Enunciado:** O que explica o fenómeno de **Hiperpolarização**, no qual a voltagem da membrana torna-se temporariamente mais negativa do que o potencial de repouso?
- [ ] A) A inativação precoce dos canais de sódio.
- [ ] B) O fechamento lento dos canais de potássio dependentes de voltagem.
- [ ] C) A exaustão das reservas energéticas da célula.
- [ ] D) A entrada maciça de proteínas no meio intracelular.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Os canais de K+ fecham-se lentamente; assim, a saída de potássio continua por mais tempo, tornando a célula temporariamente mais negativa do que no repouso).</details>*

---

## 💻 Slide 04: Períodos Refratários e Propagação do Impulso Nervoso

### 📝 Resumo do Componente (TL;DR)
Para garantir que o impulso nervoso se propague em apenas uma direção, a membrana apresenta períodos temporários de redução ou ausência de excitabilidade chamados **Períodos Refratários**.

* **Período Refratário Absoluto (PRA):** Intervalo em que é impossível gerar um novo potencial de ação, independentemente da intensidade do estímulo. Isso ocorre porque os canais de $Na^+$ permanecem inativados.
* **Período Refratário Relativo (PRR):** Intervalo em que um novo potencial de ação pode ocorrer, mas exige um estímulo mais intenso. Acontece durante a hiperpolarização, enquanto os canais de $K^+$ ainda permanecem parcialmente abertos.

### ⚡ Tipos de Propagação:
* **Propagação Contínua:** Ocorre em axónios amielínicos. O impulso propaga-se progressivamente ao longo de toda a membrana.
* **Propagação Saltatória:** Ocorre em axónios mielinizados. O impulso "salta" entre os **Nós de Ranvier**, aumentando significativamente a velocidade de condução nervosa.

### 🧪 Testes Unitários (Questões)

#### ❓ Questão 05 (Nível: Senior)
**Enunciado:** Durante o Período Refratário Absoluto (PRA), mesmo um estímulo muito intenso não consegue gerar um novo potencial de ação. Qual é a explicação fisiológica para isso?
- [ ] A) Os canais de potássio estão totalmente inativados.
- [ ] B) Os canais de sódio dependentes de voltagem encontram-se no estado inativado, impedindo sua reativação imediata.
- [ ] C) A membrana perdeu temporariamente sua integridade estrutural.
- [ ] D) O potencial elétrico atingiu um valor máximo irreversível.
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>B</b> (Explicação: Durante o PRA, as comportas de inativação dos canais de Na+ permanecem fechadas. O canal precisa retornar ao estado fechado antes de poder ser ativado novamente).</details>*

#### ❓ Questão 06 (Nível: Pleno)
**Enunciado:** A elevada velocidade de condução do impulso nervoso em certos neurónios ocorre através da **condução saltatória**. Qual estrutura é responsável por atuar como isolante elétrico nesse processo?
- [ ] A) Bomba de Sódio-Potássio
- [ ] B) Canais iónicos de vazamento
- [ ] C) Bainha de Mielina
- [ ] D) Citoplasma axonal
*<details><summary><b>🔑 Ver Gabarito</b></summary>Alternativa Correta: <b>C</b> (Explicação: A bainha de mielina atua como isolante elétrico, reduzindo perdas de corrente e permitindo que o potencial de ação se propague entre os nós de Ranvier).</details>*

---

## 📈 Acompanhamento de Desempenho do Aluno
| Módulo/Slide | Tópico Chave | Status de Revisão |
| :--- | :--- | :--- |
| Slide 01 | Potencial de Repouso e Íons | [ ] Pendente / [ ] Revisado |
| Slide 02 | Potencial Limiar e Canais | [ ] Pendente / [ ] Revisado |
| Slide 03 | Fases do Potencial de Ação | [ ] Pendente / [ ] Revisado |
| Slide 04 | Período Refratário e Mielina | [ ] Pendente / [ ] Revisado |