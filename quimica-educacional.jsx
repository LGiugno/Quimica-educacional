import { useState, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════
   QUÍMICA EDUCACIONAL - Site Completo (13 Aulas)
   ═══════════════════════════════════════════════════════════ */

// ─── DATA: All 13 Lessons ───────────────────────────────────
const LESSONS_DATA = [
  {
    id: 1, title: "Introdução à Química", icon: "🧪",
    desc: "O que é Química, matéria, sistemas e propriedades",
    sections: [
      { title: "O que é Química?", content: "A Química é uma ciência que está diretamente ligada à nossa vida cotidiana. A produção do pão, a digestão dos alimentos, os medicamentos, os combustíveis, as tintas, o cimento — tudo está ligado ao universo químico. Ela estuda a composição, estrutura, propriedades e transformações da matéria." },
      { title: "Sistemas Homogêneos e Heterogêneos", content: "Um sistema é uma parte do universo considerada para estudo. Sistemas homogêneos apresentam as mesmas propriedades em toda sua extensão (aspecto uniforme). Sistemas heterogêneos não apresentam as mesmas propriedades em toda extensão — possuem mais de uma fase. Todo sistema homogêneo é monofásico (uma única fase). Todo sistema heterogêneo é polifásico (duas ou mais fases)." },
      { title: "Matéria, Corpo e Objeto", content: "Matéria é todo sistema que possui massa e ocupa lugar no espaço. Corpo é uma porção limitada de matéria. Objeto é um corpo que recebeu uma utilidade." },
      { title: "Propriedades Gerais da Matéria", content: "São propriedades que todos os corpos apresentam: massa (quantidade de matéria), extensão (espaço ocupado), impenetrabilidade (dois corpos não ocupam o mesmo lugar), compressibilidade (capacidade de reduzir volume), elasticidade (retornar à forma original), divisibilidade (ser dividido em porções menores) e inércia (não modificar por si só seu estado de movimento)." },
      { title: "Propriedades Extensivas e Intensivas", content: "Propriedades extensivas dependem do tamanho do corpo (massa, volume, energia térmica). Propriedades intensivas não dependem do tamanho (temperatura, pressão, pontos de fusão e ebulição, densidade, viscosidade)." }
    ],
    curiosity: "O granito é um exemplo perfeito de sistema heterogêneo — ele é formado por três minerais diferentes: quartzo, feldspato e mica, cada um sendo uma fase distinta!",
    quiz: [
      { q: "Um sistema formado por água + açúcar dissolvido + limalha de ferro + vapor d'água + nitrogênio pode ser classificado como:", opts: ["Homogêneo com 4 fases", "Heterogêneo com 4 fases e 3 componentes", "Heterogêneo com 3 fases e 4 componentes", "Homogêneo com 3 fases"], correct: 2, explanation: "Temos 3 fases: solução aquosa de açúcar (fase 1), limalha de ferro (fase 2) e mistura gasosa de vapor + N₂ (fase 3). São 4 componentes: água, açúcar, ferro e nitrogênio." },
      { q: "Qual NÃO é uma propriedade geral da matéria?", opts: ["Extensão", "Combustibilidade", "Divisibilidade", "Inércia"], correct: 1, explanation: "Combustibilidade é uma propriedade específica (química), não geral. Propriedades gerais são apresentadas por toda matéria." },
      { q: "Um isopor flutua na água e o ferro afunda. Qual propriedade explica isso?", opts: ["Impenetrabilidade", "Densidade", "Extensão", "Maleabilidade"], correct: 1, explanation: "A densidade determina se um corpo flutua ou afunda. O isopor tem densidade menor que a água; o ferro, maior." },
      { q: "Água + óleo formam um sistema:", opts: ["Homogêneo", "Heterogêneo bifásico", "Heterogêneo trifásico", "Monofásico"], correct: 1, explanation: "Água e óleo são imiscíveis, formando duas fases distintas — sistema heterogêneo bifásico." },
      { q: "Temperatura e pressão são propriedades:", opts: ["Extensivas", "Gerais", "Intensivas", "Químicas"], correct: 2, explanation: "Propriedades intensivas não dependem do tamanho da amostra. Duas porções de água podem ter a mesma temperatura independente do volume." }
    ]
  },
  {
    id: 2, title: "Mudanças de Estado Físico e Densidade", icon: "🌡️",
    desc: "Estados da matéria, mudanças de estado e densidade",
    sections: [
      { title: "Estados Físicos da Matéria", content: "A matéria pode se apresentar em três estados: Sólido (partículas vibram com baixa velocidade, baixa energia cinética, forças de atração altas — menor energia interna), Líquido (partículas um pouco mais afastadas, movimentos vibracionais, rotacionais e translacionais de curto alcance) e Gasoso (partículas totalmente afastadas com grande movimentação)." },
      { title: "Mudanças de Estado Físico", content: "Fusão: sólido → líquido. Vaporização: líquido → gasoso. Solidificação: líquido → sólido. Condensação (liquefação): gasoso → líquido. Sublimação: sólido → gasoso. Ressublimação: gasoso → sólido. O aquecimento (aumento de temperatura) favorece fusão, vaporização e sublimação. O resfriamento favorece os processos inversos." },
      { title: "Tipos de Vaporização", content: "Evaporação: processo lento, natural e espontâneo à temperatura ambiente (ex: roupa secando no varal). Ebulição: processo rápido, normalmente não espontâneo, ocorre em toda a massa líquida com formação de bolhas (ex: água fervendo). Calefação: ebulição sob aquecimento excessivo (ex: gota d'água em panela muito quente)." },
      { title: "Curvas de Aquecimento", content: "Substância pura: apresenta patamares (temperaturas constantes) durante a fusão e a ebulição. Mistura comum: não apresenta patamares — a temperatura varia continuamente. Mistura eutética: apresenta patamar na fusão mas não na ebulição. Mistura azeotrópica: apresenta patamar na ebulição mas não na fusão." },
      { title: "Densidade", content: "Densidade é a relação entre massa e volume: d = m/V. A unidade mais comum é g/cm³ ou g/mL. A água tem densidade de 1 g/cm³. Materiais com densidade menor que a água flutuam; com densidade maior, afundam." }
    ],
    curiosity: "A água é uma das poucas substâncias que se expande ao congelar! Por isso o gelo flutua na água líquida — sua densidade é menor (0,92 g/cm³ contra 1,0 g/cm³).",
    quiz: [
      { q: "Gases geralmente apresentam menor densidade que sólidos e líquidos porque:", opts: ["Suas partículas têm menor massa", "Há maior distância média entre suas partículas", "Não possuem interação entre partículas", "Suas partículas se movem mais devagar"], correct: 1, explanation: "A maior distância entre as partículas no estado gasoso faz com que, para uma mesma massa, o volume seja muito maior, resultando em menor densidade." },
      { q: "A 50°C, considerando: Cloro (PF -101°C, PE -34,6°C), Bromo (PF -7,2°C, PE 58,8°C) e Mercúrio (PF -38,8°C, PE 356,6°C), estão no estado líquido:", opts: ["Cloro e flúor", "Cloro e iodo", "Mercúrio e iodo", "Bromo e mercúrio"], correct: 3, explanation: "A 50°C, bromo está líquido (entre PF -7,2 e PE 58,8) e mercúrio está líquido (entre PF -38,8 e PE 356,6)." },
      { q: "Uma solução com 30g de sal em 300g de água (volume = 300mL) tem densidade de:", opts: ["10,0 g/mL", "1,0 g/mL", "0,9 g/mL", "1,1 g/mL"], correct: 3, explanation: "d = massa total / volume = (30 + 300) / 300 = 330/300 = 1,1 g/mL." },
      { q: "A ebulição da água é um processo:", opts: ["Exotérmico", "Endotérmico", "Atérmico", "Isotérmico"], correct: 1, explanation: "A vaporização é endotérmica — absorve calor para romper as interações entre as moléculas." },
      { q: "Uma mistura azeotrópica apresenta:", opts: ["Patamar na fusão e na ebulição", "Patamar apenas na fusão", "Patamar apenas na ebulição", "Nenhum patamar"], correct: 2, explanation: "Mistura azeotrópica tem ponto de ebulição constante (patamar na ebulição) mas faixa de fusão variável." }
    ]
  },
  {
    id: 3, title: "Transformações dos Materiais", icon: "🔥",
    desc: "Fenômenos físicos e químicos no cotidiano",
    sections: [
      { title: "Fenômenos Físicos", content: "São transformações que não alteram a estrutura interna da matéria — não mudam a identidade química das substâncias. Exemplos: preparar suco de tomate, evaporar água, dissolver açúcar na água, sublimação do gelo seco, condução de corrente elétrica em fio de cobre." },
      { title: "Fenômenos Químicos", content: "São fenômenos que mudam a identidade química das substâncias, formando novas substâncias com propriedades diferentes. Exemplos: amadurecimento de frutas, cozimento de ovo, formação de ferrugem, comprimido efervescente na água, produção de etanol da cana." },
      { title: "Mudanças de Estado como Fenômeno Físico", content: "Todas as mudanças de estado (fusão, vaporização, solidificação, condensação, sublimação, ressublimação) são fenômenos físicos, pois a substância continua sendo a mesma — apenas muda sua organização molecular." },
      { title: "Sinais de Fenômeno Químico", content: "Podemos identificar um fenômeno químico pelos seguintes sinais: mudança de cor, efervescência (bolhas em líquido), liberação de energia (calor ou luz), formação de um sólido (precipitado), produção de fumaça." }
    ],
    curiosity: "A fotossíntese é um dos fenômenos químicos mais importantes da natureza — as plantas convertem CO₂ e água em glicose e oxigênio usando a energia solar!",
    quiz: [
      { q: "Qual é um fenômeno físico?", opts: ["Prego enferrujando", "Roupa secando no varal", "Queima da gasolina", "Vela acesa"], correct: 1, explanation: "Secar roupa é evaporação — fenômeno físico onde a água muda de estado sem alterar sua composição." },
      { q: "Qual é um fenômeno químico?", opts: ["Picolé derretendo", "Ventilador funcionando", "Moça movendo cadeira", "Manicure removendo esmalte com acetona"], correct: 3, explanation: "A acetona dissolve o esmalte por reação química, quebrando as ligações do polímero do esmalte." },
      { q: "Sublimação da naftalina e fusão do gelo são fenômenos:", opts: ["Ambos químicos", "Ambos físicos", "Físico e químico", "Químico e físico"], correct: 1, explanation: "Ambos são mudanças de estado — fenômenos físicos que não alteram a composição das substâncias." },
      { q: "A combustão da madeira é um fenômeno:", opts: ["Físico", "Químico", "Atérmico", "Reversível"], correct: 1, explanation: "A combustão transforma a madeira em cinzas, CO₂ e vapor d'água — substâncias completamente diferentes." },
      { q: "A formação da ferrugem envolve:", opts: ["Apenas ferro", "Ferro, oxigênio e água", "Apenas ferro e água", "Apenas ferro e oxigênio"], correct: 1, explanation: "A ferrugem (Fe₂O₃·H₂O) se forma pela reação do ferro com oxigênio e água do ambiente." }
    ]
  },
  {
    id: 4, title: "Reações Químicas", icon: "⚗️",
    desc: "Leis ponderais, equações e tipos de reações",
    sections: [
      { title: "O que são Reações Químicas?", content: "Uma reação química é um processo que transforma substâncias iniciais (reagentes) em novas substâncias (produtos) com propriedades diferentes. São representadas por equações químicas que mostram fórmulas e proporções." },
      { title: "Leis Ponderais", content: "Lei de Lavoisier (Conservação das Massas): a soma das massas dos reagentes é igual à soma das massas dos produtos — 'na natureza nada se cria, nada se perde, tudo se transforma'. Lei de Proust (Proporções Constantes): uma substância composta é formada por elementos em proporção fixa de massa. Lei de Dalton (Proporções Múltiplas): massas de um elemento que se combinam com massa fixa de outro estão em relação de números inteiros." },
      { title: "Equações Químicas", content: "Formato: REAGENTES → PRODUTOS. Símbolos: (s) sólido, (l) líquido, (g) gasoso, (aq) solução aquosa, Δ aquecimento, cat catalisador, ↗ liberação de gás, ↓ precipitado, λ luz. Os coeficientes indicam a proporção entre as substâncias." },
      { title: "Tipos de Reações", content: "Síntese/Adição (A + B → AB): dois ou mais reagentes formam um único produto. Análise/Decomposição (AB → A + B): um reagente se decompõe em dois ou mais produtos (pirólise = calor, fotólise = luz, eletrólise = eletricidade). Simples Troca (A + BC → B + AC): substância simples reage com composta. Dupla Troca (AB + CD → AD + CB): duas substâncias compostas trocam íons." }
    ],
    curiosity: "A Lei de Lavoisier foi fundamental para acabar com a alquimia e estabelecer a Química como ciência! Antes, acreditava-se que era possível criar ouro a partir de outros metais.",
    quiz: [
      { q: "N₂ + 3H₂ → 2NH₃ é uma reação de:", opts: ["Análise", "Simples troca", "Dupla troca", "Síntese"], correct: 3, explanation: "Dois reagentes (N₂ e H₂) geram um único produto (NH₃) — reação de síntese." },
      { q: "C₁₂H₂₂O₁₁ → 12C + 11H₂O é uma reação de:", opts: ["Síntese", "Análise", "Simples troca", "Dupla troca"], correct: 1, explanation: "Um reagente (sacarose) se decompõe em dois produtos — reação de análise/decomposição." },
      { q: "Cu + H₂SO₄ → CuSO₄ + H₂ é uma reação de:", opts: ["Síntese", "Análise", "Simples troca", "Dupla troca"], correct: 2, explanation: "Uma substância simples (Cu) reage com uma composta (H₂SO₄), gerando novas — simples troca." },
      { q: "Pela Lei de Lavoisier, se 12g de carbono reagem com 32g de oxigênio, a massa de CO₂ formada é:", opts: ["20g", "44g", "32g", "12g"], correct: 1, explanation: "Massa dos reagentes = massa dos produtos: 12 + 32 = 44g de CO₂." },
      { q: "Pb(CH₃COO)₂ + Na₂CrO₄ → PbCrO₄ + 2NaCH₃COO é:", opts: ["Dupla troca", "Síntese", "Deslocamento", "Decomposição"], correct: 0, explanation: "Duas substâncias compostas trocam seus íons, formando duas novas compostas — dupla troca." }
    ]
  },
  {
    id: 5, title: "Substâncias e Misturas", icon: "🧬",
    desc: "Substâncias puras, simples, compostas e misturas",
    sections: [
      { title: "Representação das Substâncias", content: "As substâncias são representadas por fórmulas químicas. Uma fórmula mostra os elementos que compõem a substância e a quantidade de átomos de cada um. Ex: H₂O = 2 átomos de hidrogênio + 1 de oxigênio." },
      { title: "Substância Pura vs Mistura", content: "Substância pura: sistema contendo apenas um tipo de substância, com propriedades fixas (PF e PE constantes). Mistura: reunião de duas ou mais substâncias sem alteração das características individuais, com propriedades variáveis." },
      { title: "Substância Simples e Composta", content: "Substância simples: formada por um único elemento químico (O₂, H₂, Fe, S₈, O₃). Substância composta: formada por mais de um elemento químico (H₂O, CO₂, NaCl, C₁₂H₂₂O₁₁)." },
      { title: "Tipos de Misturas", content: "Mistura homogênea (solução): possui uma única fase, aspecto uniforme. Formada por solvente (em maior quantidade, dissolve) e soluto (em menor quantidade, é dissolvido). Ex: água + álcool, água + sal dissolvido. Mistura heterogênea: possui mais de uma fase, diferentes aspectos. Ex: água + óleo, água + areia." }
    ],
    curiosity: "O ozônio (O₃) e o gás oxigênio (O₂) são substâncias simples diferentes formadas pelo mesmo elemento — o oxigênio! Esse fenômeno se chama alotropia.",
    quiz: [
      { q: "Em uma mistura de água e sal, o solvente é:", opts: ["Água", "Sal", "Água salobra", "Água do mar"], correct: 0, explanation: "O solvente é a substância em maior quantidade que dissolve o soluto — no caso, a água." },
      { q: "O₂, H₂, Pb, O₃ e S₈ são todos:", opts: ["Substâncias compostas", "Misturas", "Substâncias simples", "Soluções"], correct: 2, explanation: "Todas são formadas por um único elemento químico, sendo substâncias simples." },
      { q: "Um sistema de água + sal dissolvido + álcool + limalha de ferro + gasolina tem:", opts: ["Uma fase", "Duas fases", "Três fases", "Cinco fases"], correct: 2, explanation: "Fase 1: solução aquosa (água+sal+álcool). Fase 2: limalha de ferro. Fase 3: gasolina. Total: 3 fases." },
      { q: "Mel é:", opts: ["Substância pura", "Substância composta", "Uma mistura", "Um solvente"], correct: 2, explanation: "Mel é uma mistura de diversos açúcares (frutose, glicose), água, enzimas e outros componentes." },
      { q: "Água + gasolina e água + areia são:", opts: ["Misturas homogêneas", "Misturas heterogêneas", "Substâncias puras", "Soluções"], correct: 1, explanation: "Ambas apresentam mais de uma fase visível — são misturas heterogêneas." }
    ]
  },
  {
    id: 6, title: "Separação de Misturas", icon: "🔬",
    desc: "Métodos de separação para misturas heterogêneas e homogêneas",
    sections: [
      { title: "Separação de Misturas Heterogêneas", content: "Catação: separação manual de componentes visíveis (ex: escolha do feijão, reciclagem). Filtração: separação de sólidos de líquidos usando um filtro (ex: coar café, filtro de barro). Ventilação: corrente de ar separa componentes de densidades diferentes (ex: arroz e palha). Peneiração: separa sólidos de tamanhos diferentes usando peneira (ex: areia e cascalho). Separação Magnética: usa ímã para separar componentes magnéticos (ex: limalha de ferro e areia). Levigação: corrente de água arrasta sólidos leves (ex: garimpo de ouro)." },
      { title: "Decantação", content: "Separa componentes pela diferença de densidade. Líquido-líquido: água e óleo são separados com funil de bromo. Sólido-líquido: a areia decanta e a água é transferida por sifonação. Sólido-gás: câmaras de poeira separam partículas do ar." },
      { title: "Centrifugação e Sublimação", content: "Centrifugação: separa materiais de densidades diferentes por rotação rápida (ex: gordura e leite). Sublimação: aproveita a passagem direta de sólido a gás de certas substâncias como o iodo." },
      { title: "Separação de Misturas Homogêneas", content: "Destilação simples: separa líquido de sólido dissolvido. O líquido vaporiza, passa pelo condensador e é recolhido como destilado (ex: água e sal). Destilação fracionada: separa líquidos com pontos de ebulição próximos usando coluna de fracionamento (ex: derivados do petróleo). Cristalização: evaporação lenta do solvente para obter cristais do soluto (ex: salinas)." }
    ],
    curiosity: "As refinarias de petróleo usam torres de destilação fracionada enormes para separar os mais de 200 compostos diferentes presentes no petróleo bruto!",
    quiz: [
      { q: "Catação, filtração e destilação fracionada são todos:", opts: ["Métodos de separação", "Fenômenos químicos", "Mudanças de estado", "Leis ponderais"], correct: 0, explanation: "Todos são métodos usados para separar componentes de misturas." },
      { q: "Limalha de ferro + enxofre / água no filtro / sal nas salinas / água+sal destilando:", opts: ["Magnética, filtração, dessalinização, dest. fracionada", "Magnética, filtração, evaporação, dest. simples", "Dest. fracionada, filtração, evaporação, magnética", "Catação, filtração, decantação, dest. simples"], correct: 1, explanation: "Ferro+enxofre: separação magnética. Filtro: filtração. Salinas: evaporação. Água+sal: destilação simples." },
      { q: "Para obter água pura da água do mar, o processo é:", opts: ["Decantação", "Sedimentação", "Centrifugação", "Destilação"], correct: 3, explanation: "A destilação separa a água dos sais dissolvidos — a água evapora e condensa, os sais ficam." },
      { q: "A separação de arroz da palha seca por corrente de ar é:", opts: ["Catação", "Ventilação", "Levigação", "Peneiração"], correct: 1, explanation: "Ventilação usa corrente de ar para separar componentes de densidades/tamanhos diferentes." },
      { q: "A destilação fracionada é usada para separar:", opts: ["Sólido de líquido", "Líquidos miscíveis com PE próximos", "Sólidos de tamanhos diferentes", "Componentes magnéticos"], correct: 1, explanation: "A coluna de fracionamento permite separar líquidos miscíveis com pontos de ebulição próximos." }
    ]
  },
  {
    id: 7, title: "Aula 07 — Revisão", icon: "📝",
    desc: "Revisão dos conceitos das aulas anteriores",
    sections: [
      { title: "Revisão: Matéria e Sistemas", content: "Matéria é tudo que tem massa e ocupa espaço. Sistemas podem ser homogêneos (monofásicos) ou heterogêneos (polifásicos). Fase é cada parte homogênea de um sistema." },
      { title: "Revisão: Estados e Mudanças", content: "Três estados: sólido, líquido, gasoso. Mudanças endotérmicas (absorvem calor): fusão, vaporização, sublimação. Mudanças exotérmicas (liberam calor): solidificação, condensação, ressublimação." },
      { title: "Revisão: Transformações e Reações", content: "Fenômenos físicos não alteram a composição. Fenômenos químicos formam novas substâncias. Tipos de reação: síntese, análise, simples troca, dupla troca. Leis de Lavoisier (conservação) e Proust (proporções constantes)." },
      { title: "Revisão: Substâncias e Separação", content: "Substâncias simples: um elemento. Compostas: mais de um. Misturas homogêneas: soluções (destilação). Heterogêneas: visualmente distintas (filtração, decantação, catação, etc.)." }
    ],
    curiosity: "A Química moderna começou no século XVIII com Lavoisier, que é considerado o 'pai da Química' por estabelecer a lei de conservação das massas!",
    quiz: [
      { q: "A fusão é a passagem de:", opts: ["Líquido para gasoso", "Sólido para líquido", "Gasoso para líquido", "Líquido para sólido"], correct: 1, explanation: "Fusão é a mudança do estado sólido para o líquido, causada pelo aumento de temperatura." },
      { q: "Substâncias compostas são formadas por:", opts: ["Um elemento", "Mais de um elemento", "Apenas metais", "Apenas não-metais"], correct: 1, explanation: "Substâncias compostas possuem dois ou mais elementos químicos diferentes em sua fórmula." },
      { q: "A Lei de Lavoisier afirma que:", opts: ["Massa se cria", "Massa se perde", "Massa se conserva", "Massa varia"], correct: 2, explanation: "Na natureza nada se cria, nada se perde — a massa total dos reagentes é igual à dos produtos." },
      { q: "Filtração separa:", opts: ["Líquidos miscíveis", "Sólidos de líquidos", "Gases de gases", "Líquidos de gases"], correct: 1, explanation: "A filtração retém partículas sólidas em um filtro, deixando o líquido passar." },
      { q: "O café é uma mistura:", opts: ["Pura", "Homogênea", "Heterogênea", "Simples"], correct: 1, explanation: "O café coado é uma solução — mistura homogênea com uma única fase visível." }
    ]
  },
  {
    id: 8, title: "Evolução dos Modelos Atômicos", icon: "⚛️",
    desc: "De Demócrito ao modelo quântico",
    sections: [
      { title: "Modelos Primitivos — Demócrito e Leucipo", content: "No século V a.C., os filósofos gregos Demócrito e Leucipo propuseram que a matéria é formada por partículas indivisíveis — os átomos (do grego: a = não, tomo = parte). A matéria não é contínua: é constituída por átomos e vazio. Aceitavam os quatro elementos: água, terra, ar e fogo. Esse modelo era baseado apenas na intuição e na lógica." },
      { title: "Aristóteles e o Eclipse do Atomismo", content: "Aristóteles (séc. IV a.C.) rejeitou o modelo de Demócrito. Acreditava que a matéria era contínua e composta por quatro elementos. Por sua enorme influência, o modelo atômico permaneceu esquecido por mais de 20 séculos!" },
      { title: "Modelo de Dalton (1803) — Bola de Bilhar", content: "Postulados: 1) Matéria formada por átomos indivisíveis e indestrutíveis. 2) Átomos do mesmo elemento são idênticos. 3) Átomos de elementos diferentes têm massas e propriedades diferentes. 4) Combinam-se em proporções fixas. 5) Nas reações, átomos se rearranjam. 6) Átomos de um elemento não se convertem em outro. Modelo: esfera maciça, indivisível, sem carga elétrica." },
      { title: "Modelo de Thomson (1897) — Pudim de Ameixa", content: "Thomson descobriu o elétron usando tubos de raios catódicos. Concluiu que existiam partículas menores que o átomo com carga negativa. Modelo: esfera maciça de carga positiva com elétrons dispersos (como ameixas em um pudim). O número de elétrons torna a carga total zero." },
      { title: "Modelo de Rutherford (1911) — Planetário", content: "Experimento da lâmina de ouro: bombardeou folha fina de ouro com partículas alfa. Resultados: a maioria passou direto, algumas desviaram, pouquíssimas foram refletidas. Conclusão: o átomo tem um núcleo pequeno e denso (positivo) e uma eletrosfera grande e vazia onde orbitam os elétrons — como planetas ao redor do Sol." },
      { title: "Modelo de Bohr (1913) — Órbitas Quantizadas", content: "Postulados: elétrons se movem em órbitas circulares com energia constante (estacionárias). Ao absorver energia, o elétron salta para órbita mais energética. Ao retornar, libera a mesma energia na forma de luz. Baseado na teoria quântica de Max Planck e nos espectros de linhas." },
      { title: "Modelo Quântico — Nuvem Eletrônica", content: "Schrödinger (1927) propôs que o elétron não tem trajetória definida. O modelo da nuvem eletrônica descreve zonas de probabilidade onde é mais provável encontrar o elétron — os orbitais. O átomo possui núcleo central (prótons + nêutrons) e nuvem eletrônica (elétrons)." }
    ],
    curiosity: "O nêutron só foi descoberto em 1932 por James Chadwick! Até então, não se sabia explicar por que a massa do átomo era maior que a soma das massas de prótons e elétrons.",
    quiz: [
      { q: "A Teoria Atômica de Dalton NÃO explica:", opts: ["Proporções constantes", "Comportamento de gases ideais", "Corrosão de metais", "Colisões moleculares"], correct: 2, explanation: "A corrosão envolve transferência de elétrons — conceito que Dalton não conhecia, pois considerava o átomo indivisível." },
      { q: "A contribuição de Thomson ao modelo atômico foi:", opts: ["Átomo indivisível", "Existência de partículas subatômicas", "Níveis discretos de energia", "Núcleo com carga positiva"], correct: 1, explanation: "Thomson descobriu o elétron, provando que existem partículas menores que o átomo." },
      { q: "O modelo de Bohr NÃO afirma que:", opts: ["Átomo tem núcleo positivo", "Átomos são indivisíveis", "Elétrons ocupam órbitas definidas", "Elétrons emitem luz ao retornar"], correct: 1, explanation: "Bohr já sabia que átomos são divisíveis — possuem prótons, nêutrons e elétrons." },
      { q: "No experimento de Rutherford, a maioria das partículas alfa:", opts: ["Foi refletida", "Sofreu desvio", "Atravessou a lâmina", "Foi absorvida"], correct: 2, explanation: "A maioria passou direto, provando que o átomo é majoritariamente vazio." },
      { q: "Segundo Dalton, todos os átomos de um mesmo elemento são:", opts: ["Diferentes", "Idênticos", "Divisíveis", "Neutros"], correct: 1, explanation: "O 2° postulado de Dalton afirma que átomos do mesmo elemento são idênticos em massa e propriedades." }
    ]
  },
  {
    id: 9, title: "Estrutura do Átomo", icon: "🔵",
    desc: "Partículas subatômicas, número atômico, isótopos e íons",
    sections: [
      { title: "Partículas Fundamentais", content: "Prótons (p⁺): carga positiva, localizados no núcleo. Nêutrons (n⁰): sem carga, no núcleo, estabilizam repulsões entre prótons. Elétrons (e⁻): carga negativa, massa desprezível, na eletrosfera (nuvem eletrônica). Carga elementar: e = 1,6 × 10⁻¹⁹ C." },
      { title: "Número Atômico (Z) e Número de Massa (A)", content: "Número atômico (Z) = número de prótons. É a identidade do elemento — cada elemento tem Z único. Número de massa (A) = prótons + nêutrons (A = Z + n). No átomo neutro: número de prótons = número de elétrons." },
      { title: "Isótopos, Isóbaros e Isótonos", content: "Isótopos: mesmo número atômico (Z), diferente massa (A). São átomos do MESMO elemento! Ex: ¹H (prótio), ²H (deutério), ³H (trítio). Isóbaros: mesmo número de massa (A), diferente Z. São de elementos DIFERENTES. Isótonos: mesmo número de nêutrons (n), diferente Z e A." },
      { title: "Íons — Cátions e Ânions", content: "Íon é um átomo com carga elétrica (p ≠ e⁻). Cátion (+): perdeu elétrons (p > e⁻). Ex: Ca²⁺ tem 20p e 18e⁻. Ânion (−): ganhou elétrons (e⁻ > p). Ex: Cl⁻ tem 17p e 18e⁻." },
      { title: "Representação do Elemento", content: "Segundo a IUPAC, um elemento é representado por: símbolo com número atômico (Z) à esquerda embaixo e número de massa (A) à esquerda em cima. Ex: ²³₁₁Na (sódio com Z=11, A=23)." }
    ],
    curiosity: "O carbono-14 é um isótopo radioativo usado para datação de fósseis! Ele permite determinar a idade de materiais orgânicos de até 50.000 anos.",
    quiz: [
      { q: "Átomos com Z=20 e n=21; A=40 e n=22; 20p e 20n pertencem ao mesmo elemento:", opts: ["Primeiro e segundo", "Primeiro e terceiro", "Segundo e terceiro", "Todos"], correct: 1, explanation: "1° tem Z=20; 2° tem Z=40-22=18; 3° tem Z=20. Mesmo Z=20 → mesmo elemento." },
      { q: "Isótopos são átomos com mesmo:", opts: ["Número de massa", "Número de nêutrons", "Número atômico", "Carga elétrica"], correct: 2, explanation: "Isótopos = mesmo Z (mesmo número de prótons) = mesmo elemento químico." },
      { q: "Ca²⁺ e K⁺ têm em comum:", opts: ["Massa", "Carga nuclear", "Número de elétrons", "Número atômico"], correct: 2, explanation: "Ca²⁺: 20p, 18e⁻. K⁺: 19p, 18e⁻. Ambos têm 18 elétrons!" },
      { q: "Se A=7x e Z=3x+2 com 38 nêutrons, o valor de x é:", opts: ["5", "8", "10", "12"], correct: 2, explanation: "A = Z + n → 7x = (3x+2) + 38 → 4x = 40 → x = 10." },
      { q: "Um ânion:", opts: ["Perdeu prótons", "Ganhou elétrons", "Perdeu elétrons", "Ganhou prótons"], correct: 1, explanation: "Ânion tem carga negativa porque ganhou elétrons, ficando com mais e⁻ do que prótons." }
    ]
  },
  {
    id: 10, title: "Distribuição Eletrônica", icon: "🌀",
    desc: "Camadas, subníveis, diagrama de Pauling e números quânticos",
    sections: [
      { title: "Camadas Eletrônicas", content: "Os elétrons se distribuem em camadas (níveis de energia): K(1)=2e⁻, L(2)=8e⁻, M(3)=18e⁻, N(4)=32e⁻, O(5)=32e⁻, P(6)=18e⁻, Q(7)=8e⁻. Cada camada tem um número máximo de elétrons." },
      { title: "Subníveis de Energia", content: "Cada camada se divide em subníveis: s (2e⁻), p (6e⁻), d (10e⁻), f (14e⁻). A ordem crescente de energia dentro de uma camada é s < p < d < f. Um orbital comporta no máximo 2 elétrons." },
      { title: "Diagrama de Pauling", content: "Linus Pauling criou um diagrama para mostrar a ordem crescente de energia dos subníveis. Seguindo as diagonais: 1s² → 2s² → 2p⁶ → 3s² → 3p⁶ → 4s² → 3d¹⁰ → 4p⁶ → 5s² → 4d¹⁰ → 5p⁶ → 6s² → 4f¹⁴ → 5d¹⁰ → 6p⁶ → 7s² → 5f¹⁴ → 6d¹⁰ → 7p⁶. Macete: Sem Pão Dá Fome!" },
      { title: "Distribuição de Íons", content: "Para cátions: distribui normalmente e retira elétrons do subnível mais externo (de valência). Ex: Ca²⁺ (Z=20): neutro 1s²2s²2p⁶3s²3p⁶4s² → cátion 1s²2s²2p⁶3s²3p⁶. Para ânions: acrescenta elétrons ao subnível de valência. Ex: Cl⁻ (Z=17): neutro ...3p⁵ → ânion ...3p⁶." },
      { title: "Números Quânticos", content: "Quatro números descrevem a posição provável de um elétron: n (principal, 1-7 = camada), ℓ (azimutal, s=0, p=1, d=2, f=3), mℓ (magnético, de -ℓ a +ℓ = orbital), ms (spin, +½ ou -½). O Princípio da Exclusão de Pauli diz que dois elétrons no mesmo átomo não podem ter os 4 números quânticos iguais." }
    ],
    curiosity: "O macete 'Sem Pão Dá Fome' ajuda a lembrar a ordem dos subníveis: s, p, d, f! A primeira letra de cada palavra corresponde a um subnível.",
    quiz: [
      { q: "A distribuição do Na (Z=11) é:", opts: ["1s² 2s² 2p⁶ 3s¹", "1s² 2s² 2p⁶ 3p¹", "1s² 2s² 2p⁷", "1s² 2s² 2p⁶ 3s² 3p¹"], correct: 0, explanation: "Seguindo o diagrama de Pauling: 1s²(2) 2s²(4) 2p⁶(10) 3s¹(11). Total = 11 elétrons." },
      { q: "O subnível mais externo do Fe (Z=26) é:", opts: ["3d⁶", "4s²", "3p⁶", "4p²"], correct: 1, explanation: "Fe: 1s²2s²2p⁶3s²3p⁶4s²3d⁶. O subnível mais externo (maior camada) é 4s²." },
      { q: "A configuração 1s²2s²2p⁶3s²3p⁶ corresponde ao elemento e ao cátion:", opts: ["Fe e Cr²⁺", "Co e Fe²⁺", "Ar e Ca²⁺", "Al e Ni²⁺"], correct: 2, explanation: "18 elétrons = Ar (Z=18). Ca²⁺ (Z=20, perdeu 2e⁻) também tem 18 elétrons com essa configuração." },
      { q: "A camada de valência do átomo com Z=32 (Ge) tem:", opts: ["1 elétron", "2 elétrons", "3 elétrons", "4 elétrons"], correct: 3, explanation: "Ge: ...4s²3d¹⁰4p². Valência (camada 4): 4s² + 4p² = 4 elétrons." },
      { q: "Um orbital comporta no máximo:", opts: ["1 elétron", "2 elétrons", "4 elétrons", "6 elétrons"], correct: 1, explanation: "Pelo Princípio de Pauli, cada orbital comporta no máximo 2 elétrons com spins opostos." }
    ]
  },
  {
    id: 11, title: "Aula 11 — Ligações Químicas (Revisão)", icon: "🔗",
    desc: "Revisão e preparação para Tabela Periódica",
    sections: [
      { title: "Revisão dos Modelos Atômicos", content: "Dalton (bola de bilhar) → Thomson (pudim de ameixa) → Rutherford (planetário) → Bohr (órbitas quantizadas) → Modelo quântico (nuvem eletrônica). Cada modelo foi aprimorando o anterior com novas descobertas experimentais." },
      { title: "Revisão da Estrutura Atômica", content: "O átomo é formado por prótons (+) e nêutrons (0) no núcleo, e elétrons (−) na eletrosfera. Z = n° de prótons; A = p + n; átomo neutro: p = e⁻. Isótopos (mesmo Z), isóbaros (mesmo A), isótonos (mesmo n)." },
      { title: "Revisão da Distribuição Eletrônica", content: "Os elétrons se distribuem em camadas (K a Q) e subníveis (s, p, d, f) seguindo o diagrama de Pauling. O subnível mais externo define a camada de valência. O subnível mais energético é o último preenchido na ordem energética." },
      { title: "Conectando com a Tabela Periódica", content: "A distribuição eletrônica é a chave para entender a posição de um elemento na tabela periódica: o número de camadas indica o período e o subnível de valência indica a família/grupo." }
    ],
    curiosity: "A camada de valência é a mais importante para as propriedades químicas de um elemento — é ela que define como o átomo se liga a outros!",
    quiz: [
      { q: "O modelo do pudim de ameixa é de:", opts: ["Dalton", "Thomson", "Rutherford", "Bohr"], correct: 1, explanation: "Thomson propôs que o átomo era uma esfera positiva com elétrons negativos dispersos — como ameixas em um pudim." },
      { q: "No átomo neutro:", opts: ["p > e⁻", "p < e⁻", "p = e⁻", "p = n"], correct: 2, explanation: "No átomo neutro, o número de prótons é igual ao de elétrons, resultando em carga total zero." },
      { q: "O número de camadas com elétrons indica:", opts: ["A família", "O período", "O número atômico", "O número de massa"], correct: 1, explanation: "O período na tabela periódica corresponde ao número de camadas eletrônicas do átomo." },
      { q: "O subnível de valência do Ca (Z=20) é:", opts: ["3p⁶", "4s²", "3d⁰", "4p⁰"], correct: 1, explanation: "Ca: 1s²2s²2p⁶3s²3p⁶4s². O subnível de valência (mais externo) é 4s²." },
      { q: "Rutherford descobriu:", opts: ["O elétron", "O nêutron", "O núcleo atômico", "Os orbitais"], correct: 2, explanation: "O experimento da lâmina de ouro revelou que o átomo possui um núcleo pequeno e denso." }
    ]
  },
  {
    id: 12, title: "Tabela Periódica", icon: "📊",
    desc: "História, organização, períodos, famílias e classificação",
    sections: [
      { title: "História da Tabela Periódica", content: "Hennig Brand (1669) descobriu o fósforo. Dalton tentou organizar por massa. Döbereiner (1817) criou as tríades. Chancourtois (1862) propôs o parafuso telúrico. Newlands (1863) propôs a Lei das Oitavas. Mendeleev e Meyer (1869) criaram tabelas semelhantes organizadas por massa atômica, com espaços para elementos não descobertos." },
      { title: "Organização Atual", content: "A tabela atual é organizada por ordem crescente de NÚMERO ATÔMICO (Z). Contém todos os elementos conhecidos com informações: símbolo, nome, Z, massa atômica. O nome em latim origina o símbolo (Fe = ferrum, Na = natrium)." },
      { title: "Períodos (Linhas Horizontais)", content: "7 períodos. Elementos do mesmo período têm a mesma quantidade de camadas eletrônicas. Ex: 4° período = 4 camadas (Ca, Ge, Br, etc.). O hidrogênio é especial — fica no período 1 mas não pertence a nenhuma família definida." },
      { title: "Famílias/Grupos (Colunas Verticais)", content: "18 grupos. Elementos do mesmo grupo têm propriedades semelhantes. Famílias especiais: 1A — Metais Alcalinos (Li, Na, K...). 2A — Alcalino-terrosos (Be, Mg, Ca...). 3A — Família do Boro. 4A — Família do Carbono. 5A — Família do Nitrogênio. 6A — Calcogênios. 7A — Halogênios (F, Cl, Br...). 8A — Gases Nobres (He, Ne, Ar...)." },
      { title: "Classificação dos Elementos", content: "Elementos representativos: famílias A (1A a 8A), subnível de valência s ou p. Elementos de transição externa: famílias B (3B a 2B), subnível d sendo preenchido. Elementos de transição interna: lantanídeos e actinídeos, subnível f sendo preenchido." }
    ],
    curiosity: "Mendeleev deixou espaços vazios em sua tabela para elementos ainda não descobertos — e previu as propriedades deles com incrível precisão! O gálio e o germânio confirmaram suas previsões.",
    quiz: [
      { q: "Um átomo com 2e⁻ na 1ª, 8 na 2ª, 18 na 3ª e 7 na 4ª camada pertence à família e período:", opts: ["Halogênios, 7° período", "Carbono, 4° período", "Halogênios, 4° período", "Calcogênios, 4° período"], correct: 2, explanation: "7 elétrons de valência = halogênio (7A). 4 camadas = 4° período." },
      { q: "Nos elementos de transição, os elétrons são adicionados na:", opts: ["Última camada", "Penúltima camada", "Antepenúltima camada", "Primeira camada"], correct: 1, explanation: "Nos elementos de transição, o subnível d da penúltima camada está sendo preenchido." },
      { q: "1s²2s²2p⁶3s²3p⁶4s²3d⁵ é um elemento:", opts: ["Representativo", "De transição com Z=25", "Gás nobre", "De transição interna"], correct: 1, explanation: "O subnível d está sendo preenchido → transição. Z = 2+2+6+2+6+2+5 = 25 (manganês)." },
      { q: "A tabela periódica atual é organizada por:", opts: ["Massa atômica crescente", "Número atômico crescente", "Eletronegatividade", "Raio atômico"], correct: 1, explanation: "Desde Moseley (1913), a tabela é organizada por ordem crescente de número atômico (Z)." },
      { q: "Os gases nobres pertencem ao grupo:", opts: ["1A", "7A", "18 (8A)", "2A"], correct: 2, explanation: "Gases nobres (He, Ne, Ar, Kr, Xe, Rn) formam o grupo 18 (antiga família 8A)." }
    ]
  },
  {
    id: 13, title: "Propriedades Periódicas", icon: "📈",
    desc: "Raio atômico, eletronegatividade, energia de ionização e mais",
    sections: [
      { title: "Propriedades Periódicas vs Aperiódicas", content: "Propriedades periódicas oscilam entre máximos e mínimos com o aumento do Z (raio atômico, energia de ionização, eletronegatividade, etc.). Propriedades aperiódicas apenas crescem ou diminuem continuamente (massa atômica, calor específico)." },
      { title: "Raio Atômico", content: "Cresce com o número de camadas (↓ na tabela). Com mesmo número de camadas, diminui com Z crescente (→ na tabela) porque mais prótons atraem mais a eletrosfera. O maior raio é o Frâncio (Fr); o menor, o Hélio (He). Cátions têm raio MENOR que o átomo neutro. Ânions têm raio MAIOR." },
      { title: "Energia de Ionização", content: "É a energia necessária para remover um elétron de um átomo gasoso. Tendência: cresce para direita e para cima na tabela (oposto ao raio atômico). Quanto menor o átomo, mais difícil remover elétrons. Gases nobres têm a maior energia de ionização." },
      { title: "Eletronegatividade e Eletropositividade", content: "Eletronegatividade: tendência de atrair elétrons (caráter ametálico). Cresce → e ↑ na tabela. Ordem: F > O > N > Cl > Br > I > S > P > C > H. Eletropositividade: tendência de perder elétrons (caráter metálico). Cresce ← e ↓ na tabela. São propriedades inversas!" },
      { title: "Afinidade Eletrônica e Reatividade", content: "Afinidade eletrônica: energia liberada quando um átomo ganha um elétron no estado gasoso. Gases nobres têm afinidade zero. Reatividade de metais: maior eletropositividade = maior reatividade. Reatividade de ametais: maior eletronegatividade = maior reatividade." },
      { title: "Propriedades Especiais", content: "Densidade: cresce da periferia para o centro da tabela. O Ósmio é o mais denso. Volume atômico: inverso da densidade, cresce para as extremidades. Ponto de fusão e ebulição: crescem da periferia para o centro. Exceção: alcalinos e alcalino-terrosos crescem de baixo para cima." }
    ],
    curiosity: "O Flúor é o elemento mais eletronegativo da tabela periódica! Por isso ele é tão reativo — basta lembrar que até o vidro é corroído pelo ácido fluorídrico.",
    quiz: [
      { q: "A energia de ionização do cloro é representada por:", opts: ["Cl₂(l) + 2e⁻ → Cl⁻(g)", "Cl(g) → Cl⁺(g) + e⁻", "Cl(g) + e⁻ → Cl⁻(g)", "Cl₂(g) → Cl⁻(g) + Cl⁺(g)"], correct: 1, explanation: "Energia de ionização = retirar elétron do átomo gasoso: X(g) → X⁺(g) + e⁻." },
      { q: "Ordem crescente de eletronegatividade: Cs, Na, Fe, S, Cl:", opts: ["Cs, Na, Fe, S, Cl", "Na, Cs, S, Fe, Cl", "Cl, S, Na, Cs, Fe", "Cs, Na, Fe, Cl, S"], correct: 0, explanation: "Cs e Na são muito eletropositivos (baixa eletroneg.). Fe é transição. S e Cl são ametais com alta eletroneg." },
      { q: "Quanto maior o caráter metálico:", opts: ["Maior a eletronegatividade", "Maior a afinidade eletrônica", "Menor a afinidade eletrônica", "Menor o raio atômico"], correct: 2, explanation: "Metais tendem a PERDER elétrons, não ganhá-los — logo, têm baixa afinidade eletrônica." },
      { q: "O raio do cátion comparado ao átomo neutro é:", opts: ["Maior", "Igual", "Menor", "Depende do elemento"], correct: 2, explanation: "Ao perder elétrons, o núcleo atrai mais a eletrosfera restante, diminuindo o raio." },
      { q: "O elemento mais eletronegativo é:", opts: ["Césio", "Oxigênio", "Flúor", "Cloro"], correct: 2, explanation: "O Flúor (F) é o campeão de eletronegatividade — o maior valor da tabela periódica." }
    ]
  }
];

// ─── STYLES ─────────────────────────────────────────────────
const darkTheme = {
  "--bg": "#0f1117", "--bg2": "#1a1d27", "--bg3": "#252836",
  "--text": "#e4e6f0", "--text2": "#9ca3bf", "--text3": "#6b7394",
  "--accent": "#6c5ce7", "--accent2": "#a29bfe", "--accent3": "#2d2654",
  "--green": "#00b894", "--green2": "#1a3a2f", "--red": "#e74c3c", "--red2": "#3a1a1a",
  "--yellow": "#fdcb6e", "--border": "#2d3148", "--card": "#1e2030",
  "--shadow": "0 4px 24px rgba(0,0,0,0.4)"
};
const lightTheme = {
  "--bg": "#f0f2f8", "--bg2": "#ffffff", "--bg3": "#e8ebf5",
  "--text": "#1a1d2e", "--text2": "#5a6180", "--text3": "#8990ab",
  "--accent": "#6c5ce7", "--accent2": "#a29bfe", "--accent3": "#ede9ff",
  "--green": "#00a381", "--green2": "#e0f5ef", "--red": "#e74c3c", "--red2": "#fde8e8",
  "--yellow": "#f0a500", "--border": "#d5dae8", "--card": "#ffffff",
  "--shadow": "0 4px 24px rgba(0,0,0,0.08)"
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{font-family:'Outfit',sans-serif;}
body{background:var(--bg);color:var(--text);transition:all .3s ease;}
.app{min-height:100vh;padding:0;}
/* Nav */
.nav{position:sticky;top:0;z-index:100;background:var(--bg2);border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);}
.nav-logo{font-size:20px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.nav-btns{display:flex;gap:8px;align-items:center;}
.nav-btn{background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:8px 16px;border-radius:10px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;transition:all .2s;}
.nav-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent);}
.nav-btn.active{background:var(--accent);color:#fff;border-color:var(--accent);}
/* Dashboard */
.dash{max-width:1200px;margin:0 auto;padding:24px 16px;}
.dash-header{text-align:center;padding:40px 0 32px;}
.dash-title{font-size:clamp(28px,5vw,48px);font-weight:800;line-height:1.1;margin-bottom:12px;}
.dash-title span{background:linear-gradient(135deg,var(--accent),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.dash-sub{color:var(--text2);font-size:16px;max-width:600px;margin:0 auto;}
/* Progress bar */
.progress-bar-wrap{background:var(--bg3);border-radius:12px;height:12px;margin:24px auto;max-width:500px;overflow:hidden;}
.progress-bar-fill{height:100%;border-radius:12px;background:linear-gradient(90deg,var(--accent),var(--green));transition:width .5s ease;}
.progress-label{text-align:center;color:var(--text2);font-size:14px;margin-bottom:32px;}
/* Grid */
.lessons-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
.lesson-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;cursor:pointer;transition:all .3s ease;position:relative;overflow:hidden;}
.lesson-card:hover{transform:translateY(-4px);box-shadow:var(--shadow);border-color:var(--accent);}
.lesson-card.completed{border-color:var(--green);}
.card-icon{font-size:36px;margin-bottom:12px;display:block;}
.card-num{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:var(--accent2);font-weight:600;margin-bottom:4px;}
.card-title{font-size:17px;font-weight:700;margin-bottom:6px;}
.card-desc{font-size:13px;color:var(--text2);line-height:1.5;}
.card-badge{position:absolute;top:16px;right:16px;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;}
.card-badge.done{background:var(--green2);color:var(--green);}
.card-badge.pending{background:var(--bg3);color:var(--text3);}
.card-progress{margin-top:12px;height:4px;background:var(--bg3);border-radius:4px;overflow:hidden;}
.card-progress-fill{height:100%;border-radius:4px;background:var(--green);transition:width .3s;}
/* Lesson page */
.lesson-page{max-width:860px;margin:0 auto;padding:24px 16px;}
.lesson-back{display:inline-flex;align-items:center;gap:6px;color:var(--text2);font-size:14px;cursor:pointer;margin-bottom:20px;padding:8px 12px;border-radius:8px;border:none;background:transparent;font-family:inherit;transition:all .2s;}
.lesson-back:hover{background:var(--bg3);color:var(--text);}
.lesson-hero{text-align:center;padding:20px 0 32px;}
.lesson-hero-icon{font-size:56px;margin-bottom:12px;display:block;}
.lesson-hero-num{font-size:12px;text-transform:uppercase;letter-spacing:3px;color:var(--accent2);font-weight:600;}
.lesson-hero-title{font-size:clamp(24px,4vw,36px);font-weight:800;margin-top:4px;}
/* Accordion */
.accordion{margin-bottom:16px;}
.accordion-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--card);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:all .2s;font-family:inherit;width:100%;text-align:left;color:var(--text);font-size:15px;font-weight:600;}
.accordion-header:hover{border-color:var(--accent);background:var(--bg3);}
.accordion-header.open{border-radius:12px 12px 0 0;border-color:var(--accent);background:var(--accent3);}
.accordion-arrow{transition:transform .3s;font-size:12px;}
.accordion-arrow.open{transform:rotate(180deg);}
.accordion-body{background:var(--card);border:1px solid var(--border);border-top:0;border-radius:0 0 12px 12px;padding:20px;line-height:1.8;color:var(--text2);font-size:14px;animation:slideDown .3s ease;}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
/* Boxes */
.curiosity-box{background:linear-gradient(135deg,var(--accent3),var(--bg3));border:1px solid var(--accent);border-radius:14px;padding:20px;margin:24px 0;}
.curiosity-box h4{color:var(--accent2);font-size:14px;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;}
.curiosity-box p{color:var(--text2);line-height:1.7;font-size:14px;}
.summary-box{background:var(--green2);border:1px solid var(--green);border-radius:14px;padding:20px;margin:24px 0;}
.summary-box h4{color:var(--green);font-size:14px;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;}
.summary-box p{color:var(--text2);line-height:1.7;font-size:14px;}
/* Nav between lessons */
.lesson-nav{display:flex;justify-content:space-between;gap:12px;margin-top:32px;padding-top:20px;border-top:1px solid var(--border);}
.lesson-nav-btn{padding:12px 24px;border-radius:12px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:600;border:1px solid var(--border);background:var(--card);color:var(--text);transition:all .2s;flex:1;text-align:center;}
.lesson-nav-btn:hover{border-color:var(--accent);background:var(--accent3);}
.lesson-nav-btn.primary{background:var(--accent);color:#fff;border-color:var(--accent);}
.lesson-nav-btn.primary:hover{opacity:.9;}
.lesson-nav-btn:disabled{opacity:.3;cursor:not-allowed;}
.complete-btn{display:block;width:100%;padding:14px;border-radius:12px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:700;border:none;background:linear-gradient(135deg,var(--green),var(--accent));color:#fff;margin:24px 0 8px;transition:all .3s;text-transform:uppercase;letter-spacing:1px;}
.complete-btn:hover{transform:scale(1.02);box-shadow:0 4px 20px rgba(108,92,231,.3);}
.complete-btn.completed{background:var(--bg3);color:var(--green);border:2px solid var(--green);}
/* Quiz */
.quiz-section{margin-top:32px;padding-top:24px;border-top:2px solid var(--border);}
.quiz-title{font-size:22px;font-weight:800;margin-bottom:4px;}
.quiz-sub{color:var(--text2);font-size:14px;margin-bottom:24px;}
.quiz-q{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:16px;}
.quiz-q-text{font-size:15px;font-weight:600;margin-bottom:14px;line-height:1.5;}
.quiz-q-num{font-size:12px;color:var(--accent2);font-weight:600;margin-bottom:6px;}
.quiz-opt{display:block;width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border-radius:10px;border:1px solid var(--border);background:var(--bg2);color:var(--text);font-family:inherit;font-size:14px;cursor:pointer;transition:all .2s;}
.quiz-opt:hover:not(.selected):not(.correct):not(.wrong){border-color:var(--accent);background:var(--accent3);}
.quiz-opt.selected{border-color:var(--accent);background:var(--accent3);}
.quiz-opt.correct{border-color:var(--green);background:var(--green2);color:var(--green);font-weight:600;}
.quiz-opt.wrong{border-color:var(--red);background:var(--red2);color:var(--red);}
.quiz-explanation{margin-top:8px;padding:12px;background:var(--bg3);border-radius:8px;font-size:13px;color:var(--text2);line-height:1.6;}
.quiz-result{text-align:center;padding:32px;background:var(--card);border-radius:16px;border:1px solid var(--border);margin-top:20px;}
.quiz-result h3{font-size:24px;margin-bottom:8px;}
.quiz-result .score{font-size:48px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.quiz-result p{color:var(--text2);margin-top:8px;}
.quiz-retry{margin-top:16px;padding:12px 32px;border-radius:10px;background:var(--accent);color:#fff;border:none;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;}
/* Progress page */
.progress-page{max-width:860px;margin:0 auto;padding:24px 16px;}
.progress-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px 20px;margin-bottom:12px;display:flex;align-items:center;gap:16px;}
.progress-icon{font-size:28px;}
.progress-info{flex:1;}
.progress-info h4{font-size:14px;font-weight:600;margin-bottom:4px;}
.progress-info .pbar{height:6px;background:var(--bg3);border-radius:4px;overflow:hidden;}
.progress-info .pbar-fill{height:100%;border-radius:4px;transition:width .5s;}
.progress-score{font-size:13px;color:var(--text2);font-weight:600;min-width:50px;text-align:right;}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:24px;}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:center;}
.stat-num{font-size:32px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.stat-label{font-size:12px;color:var(--text2);margin-top:4px;text-transform:uppercase;letter-spacing:1px;}
.reset-btn{margin-top:20px;padding:10px 20px;border-radius:8px;background:var(--red2);color:var(--red);border:1px solid var(--red);font-family:inherit;font-size:13px;cursor:pointer;font-weight:600;}
@media(max-width:600px){
  .nav{padding:10px 12px;}.nav-logo{font-size:16px;}.nav-btn{padding:6px 10px;font-size:12px;}
  .lessons-grid{grid-template-columns:1fr;}.dash{padding:16px 12px;}.lesson-page{padding:16px 12px;}
  .dash-header{padding:24px 0 20px;}.stats-grid{grid-template-columns:repeat(2,1fr);}
}
`;

// ─── COMPONENTS ─────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      <button className={`accordion-header ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`accordion-arrow ${open ? "open" : ""}`}>▼</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}

function Quiz({ quiz, lessonId, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qi, oi) => {
    if (submitted) return;
    setAnswers({ ...answers, [qi]: oi });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) return;
    setSubmitted(true);
    const score = quiz.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
    onComplete(score, quiz.length);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted ? quiz.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0) : 0;
  const pct = submitted ? Math.round((score / quiz.length) * 100) : 0;

  return (
    <div className="quiz-section">
      <h3 className="quiz-title">Quiz da Aula</h3>
      <p className="quiz-sub">Responda às {quiz.length} questões para testar seus conhecimentos</p>

      {quiz.map((q, qi) => (
        <div key={qi} className="quiz-q">
          <div className="quiz-q-num">Questão {qi + 1} de {quiz.length}</div>
          <div className="quiz-q-text">{q.q}</div>
          {q.opts.map((opt, oi) => {
            let cls = "quiz-opt";
            if (submitted) {
              if (oi === q.correct) cls += " correct";
              else if (answers[qi] === oi) cls += " wrong";
            } else if (answers[qi] === oi) cls += " selected";
            return (
              <button key={oi} className={cls} onClick={() => handleSelect(qi, oi)}>
                {String.fromCharCode(65 + oi)}) {opt}
              </button>
            );
          })}
          {submitted && <div className="quiz-explanation">💡 {q.explanation}</div>}
        </div>
      ))}

      {!submitted ? (
        <button
          className="complete-btn"
          onClick={handleSubmit}
          style={{ opacity: Object.keys(answers).length < quiz.length ? 0.5 : 1 }}
        >
          Verificar Respostas ({Object.keys(answers).length}/{quiz.length})
        </button>
      ) : (
        <div className="quiz-result">
          <div className="score">{pct}%</div>
          <h3>Você acertou {score} de {quiz.length}</h3>
          <p>{pct >= 80 ? "Excelente! Você dominou o conteúdo!" : pct >= 60 ? "Bom trabalho! Revise os pontos que errou." : "Continue estudando! Revise o conteúdo e tente novamente."}</p>
          <button className="quiz-retry" onClick={handleRetry}>Refazer Quiz</button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("dashboard"); // dashboard | lesson-N | progress
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse("{}"); } catch { return {}; }
  });

  const theme = dark ? darkTheme : lightTheme;

  const completedCount = LESSONS_DATA.filter(l => progress[`lesson-${l.id}-done`]).length;
  const totalPct = Math.round((completedCount / LESSONS_DATA.length) * 100);

  const markDone = (id) => {
    setProgress(p => ({ ...p, [`lesson-${id}-done`]: true }));
  };
  const saveQuiz = (id, score, total) => {
    setProgress(p => ({ ...p, [`quiz-${id}-score`]: score, [`quiz-${id}-total`]: total }));
  };
  const resetProgress = () => setProgress({});

  const themeStyle = {};
  Object.entries(theme).forEach(([k, v]) => { themeStyle[k] = v; });

  const currentLessonId = page.startsWith("lesson-") ? parseInt(page.split("-")[1]) : null;
  const currentLesson = currentLessonId ? LESSONS_DATA.find(l => l.id === currentLessonId) : null;

  return (
    <div className="app" style={themeStyle}>
      <style>{css}</style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("dashboard")} style={{ cursor: "pointer" }}>
          ⚗️ QuímicaLab
        </div>
        <div className="nav-btns">
          <button className={`nav-btn ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>
            Aulas
          </button>
          <button className={`nav-btn ${page === "progress" ? "active" : ""}`} onClick={() => setPage("progress")}>
            Progresso
          </button>
          <button className="nav-btn" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Dashboard */}
      {page === "dashboard" && (
        <div className="dash">
          <div className="dash-header">
            <h1 className="dash-title">Curso de <span>Química</span></h1>
            <p className="dash-sub">13 aulas completas com conteúdo interativo, exercícios e acompanhamento de progresso</p>
          </div>

          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${totalPct}%` }} />
          </div>
          <div className="progress-label">{completedCount} de {LESSONS_DATA.length} aulas concluídas ({totalPct}%)</div>

          <div className="lessons-grid">
            {LESSONS_DATA.map(l => {
              const done = progress[`lesson-${l.id}-done`];
              const quizScore = progress[`quiz-${l.id}-score`];
              const quizTotal = progress[`quiz-${l.id}-total`];
              const cardPct = done && quizScore != null ? Math.round((quizScore / quizTotal) * 100) : done ? 100 : 0;
              return (
                <div key={l.id} className={`lesson-card ${done ? "completed" : ""}`} onClick={() => setPage(`lesson-${l.id}`)}>
                  <div className="card-badge" style={done ? {} : {}}>{done ? "✓" : ""}</div>
                  <span className="card-icon">{l.icon}</span>
                  <div className="card-num">Aula {String(l.id).padStart(2, "0")}</div>
                  <div className="card-title">{l.title}</div>
                  <div className="card-desc">{l.desc}</div>
                  {quizScore != null && (
                    <div style={{ marginTop: 10, fontSize: 12, color: "var(--green)", fontWeight: 600 }}>
                      Quiz: {quizScore}/{quizTotal} ({Math.round((quizScore / quizTotal) * 100)}%)
                    </div>
                  )}
                  <div className="card-progress">
                    <div className="card-progress-fill" style={{ width: `${cardPct}%`, background: done ? "var(--green)" : "var(--accent)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lesson Page */}
      {currentLesson && (
        <div className="lesson-page">
          <button className="lesson-back" onClick={() => setPage("dashboard")}>← Voltar às aulas</button>

          <div className="lesson-hero">
            <span className="lesson-hero-icon">{currentLesson.icon}</span>
            <div className="lesson-hero-num">Aula {String(currentLesson.id).padStart(2, "0")}</div>
            <h1 className="lesson-hero-title">{currentLesson.title}</h1>
          </div>

          {/* Content sections */}
          {currentLesson.sections.map((s, i) => (
            <Accordion key={i} title={s.title} defaultOpen={i === 0}>
              <p>{s.content}</p>
            </Accordion>
          ))}

          {/* Summary */}
          <div className="summary-box">
            <h4>📋 Resumo da Aula</h4>
            <p>{currentLesson.sections.map(s => s.title).join(" • ")}</p>
          </div>

          {/* Curiosity */}
          <div className="curiosity-box">
            <h4>🧠 Curiosidade</h4>
            <p>{currentLesson.curiosity}</p>
          </div>

          {/* Complete button */}
          <button
            className={`complete-btn ${progress[`lesson-${currentLesson.id}-done`] ? "completed" : ""}`}
            onClick={() => markDone(currentLesson.id)}
          >
            {progress[`lesson-${currentLesson.id}-done`] ? "✓ Aula Concluída" : "Marcar como Concluída"}
          </button>

          {/* Quiz */}
          <Quiz
            quiz={currentLesson.quiz}
            lessonId={currentLesson.id}
            onComplete={(score, total) => saveQuiz(currentLesson.id, score, total)}
          />

          {/* Navigation */}
          <div className="lesson-nav">
            <button
              className="lesson-nav-btn"
              disabled={currentLesson.id <= 1}
              onClick={() => setPage(`lesson-${currentLesson.id - 1}`)}
            >
              ← Aula Anterior
            </button>
            <button
              className="lesson-nav-btn primary"
              disabled={currentLesson.id >= LESSONS_DATA.length}
              onClick={() => setPage(`lesson-${currentLesson.id + 1}`)}
            >
              Próxima Aula →
            </button>
          </div>
        </div>
      )}

      {/* Progress Page */}
      {page === "progress" && (
        <div className="progress-page">
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Seu Progresso</h2>
          <p style={{ color: "var(--text2)", marginBottom: 24 }}>Acompanhe sua evolução no curso de Química</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">{completedCount}</div>
              <div className="stat-label">Aulas Concluídas</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{LESSONS_DATA.filter(l => progress[`quiz-${l.id}-score`] != null).length}</div>
              <div className="stat-label">Quizzes Feitos</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{totalPct}%</div>
              <div className="stat-label">Progresso Geral</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                {(() => {
                  const scores = LESSONS_DATA.map(l => {
                    const s = progress[`quiz-${l.id}-score`];
                    const t = progress[`quiz-${l.id}-total`];
                    return s != null ? Math.round((s / t) * 100) : null;
                  }).filter(x => x != null);
                  return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) + "%" : "—";
                })()}
              </div>
              <div className="stat-label">Média dos Quizzes</div>
            </div>
          </div>

          {LESSONS_DATA.map(l => {
            const done = progress[`lesson-${l.id}-done`];
            const qs = progress[`quiz-${l.id}-score`];
            const qt = progress[`quiz-${l.id}-total`];
            const pct = qs != null ? Math.round((qs / qt) * 100) : 0;
            return (
              <div key={l.id} className="progress-card" onClick={() => setPage(`lesson-${l.id}`)} style={{ cursor: "pointer" }}>
                <div className="progress-icon">{l.icon}</div>
                <div className="progress-info">
                  <h4 style={{ color: done ? "var(--green)" : "var(--text)" }}>
                    {done ? "✓ " : ""}Aula {String(l.id).padStart(2, "0")} — {l.title}
                  </h4>
                  <div className="pbar">
                    <div className="pbar-fill" style={{ width: `${done ? (qs != null ? pct : 100) : 0}%`, background: pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--yellow)" : "var(--accent)" }} />
                  </div>
                </div>
                <div className="progress-score">
                  {qs != null ? `${qs}/${qt}` : done ? "—" : ""}
                </div>
              </div>
            );
          })}

          <button className="reset-btn" onClick={resetProgress}>Resetar Todo Progresso</button>
        </div>
      )}
    </div>
  );
}
