document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const weightRange = document.getElementById('weightRange');
    const weightValue = document.getElementById('weightValue');
    const heightRange = document.getElementById('heightRange');
    const heightValue = document.getElementById('heightValue');
    const heightMetersRef = document.getElementById('heightMetersRef');
    const gearExtraLabel = document.getElementById('gearExtraLabel');
    const calcBtn = document.getElementById('calcBtn');
    
    // Resultados
    const imcResultNumber = document.getElementById('imcResultNumber');
    const imcCategoryLabel = document.getElementById('imcCategoryLabel');
    const avengerTierBadge = document.getElementById('avengerTierBadge');
    const heroNameResult = document.getElementById('heroNameResult');
    const heroDescResult = document.getElementById('heroDescResult');
    const scalePointer = document.getElementById('scalePointer');
    const leanMassValue = document.getElementById('leanMassValue');
    const tmbValue = document.getElementById('tmbValue');
    const dirWorkout = document.getElementById('dirWorkout');

    let currentGear = 0;

    // Atualizar displays instantaneamente ao mexer nos sliders
    weightRange.addEventListener('input', () => {
        weightValue.textContent = weightRange.value;
    });

    heightRange.addEventListener('input', () => {
        heightValue.textContent = heightRange.value;
        const meters = (heightRange.value / 100).toFixed(2);
        heightMetersRef.textContent = `${meters} M`;
    });

    // Modificadores de botões rápido (-5, -1, +1, +5)
    document.querySelectorAll('.mod-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            const val = parseInt(btn.getAttribute('data-val'));
            if (target === 'weight') {
                let nv = Math.min(200, Math.max(30, parseInt(weightRange.value) + val));
                weightRange.value = nv;
                weightValue.textContent = nv;
            } else if (target === 'height') {
                let nv = Math.min(220, Math.max(120, parseInt(heightRange.value) + val));
                heightRange.value = nv;
                heightValue.textContent = nv;
                heightMetersRef.textContent = `${(nv / 100).toFixed(2)} M`;
            }
        });
    });

    // Seleção de Carga de Equipamento Tático
    document.querySelectorAll('.eq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.eq-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGear = parseInt(btn.getAttribute('data-gear'));
            gearExtraLabel.textContent = `+${currentGear} KG`;
        });
    });

    // Perfis de Combate predefinidos
    document.querySelectorAll('.profile-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const w = chip.getAttribute('data-w');
            const h = chip.getAttribute('data-h');
            weightRange.value = w;
            weightValue.textContent = w;
            heightRange.value = h;
            heightValue.textContent = h;
            heightMetersRef.textContent = `${(h / 100).toFixed(2)} M`;
            calcularIMC();
        });
    });

    // Função Principal de Cálculo IMC e Telemetria Vingador
    function calcularIMC() {
        const baseWeight = parseFloat(weightRange.value);
        const totalWeight = baseWeight + currentGear;
        const heightM = parseFloat(heightRange.value) / 100;

        const imc = totalWeight / (heightM * heightM);
        imcResultNumber.textContent = imc.toFixed(1);

        // Classificação e Narrativa Vingadores
        let category = "";
        let tier = "";
        let heroName = "";
        let desc = "";
        let pointerPercent = 0;
        let workoutText = "";

        if (imc < 18.5) {
            category = "AGILIDADE EXTREMA (ABAIXO DO PESO)";
            tier = "TIER-AGILITY-STEALTH";
            heroName = "NÍVEL FALCÃO / VIÚVA NEGRA";
            desc = "Perfil de infiltração rápida e alta mobilidade aérea. Requer aumento de massa muscular para suportar impactos de força bruta.";
            pointerPercent = 15;
            workoutText = "Foco em hipertrofia funcional com calistenia avançada e suporte nutricional hipercalórico limpo.";
        } else if (imc >= 18.5 && imc < 25) {
            category = "PESO IDEAL (PADRÃO TÁTICO)";
            tier = "TIER-STANDARD-SOLDIER";
            heroName = "NÍVEL CAPITÃO AMÉRICA / THOR";
            desc = "Condicionamento físico de pico otimizado para combate prolongado. Agilidade, reflexos e força perfeitamente equilibrados.";
            pointerPercent = 40;
            workoutText = "Rotina combinada de treinos aeróbicos em esteira de vácuo, circuitos táticos metabólicos e mobilidade articular pesada.";
        } else if (imc >= 25 && imc < 30) {
            category = "PESO PESADO (SOBREPESO / TANQUE)";
            tier = "TIER-HEAVY-ARMOR";
            heroName = "FORÇA HULKBUSTER / TANQUE DE COMBATE";
            desc = "Massa corporal densa e blindada com alta capacidade de absorção de impacto balístico. Protocolo de força bruta apto para linha de frente.";
            pointerPercent = 65;
            workoutText = "Déficit calórico moderado de -350 kcal focado na preservação de massa muscular com alta ingestão de fibras vegetais.";
        } else {
            category = "FORÇA BRUTA MÁXIMA (OBRESIDADE / TITÃ)";
            tier = "TIER-TITAN-GAMMA";
            heroName = "NÍVEL HULK / THANOS CLASS";
            desc = "Massa titânica com geração massiva de energia cinética. Requer protocolos especiais de contenção metabólica e alta descarga calórica.";
            pointerPercent = 90;
            workoutText = "Protocolo de reengenharia metabólica com cardio de alta intensidade intervalado (HIIT) e contenção de carboidratos.";
        }

        imcCategoryLabel.textContent = category;
        avengerTierBadge.textContent = tier;
        heroNameResult.textContent = heroName;
        heroDescResult.textContent = desc;
        scalePointer.style.left = `${pointerPercent}%`;
        dirWorkout.textContent = workoutText;

        // Submétricas (Cálculos Simulados de Bioimpedância Stark)
        const leanMass = (totalWeight * 0.76).toFixed(1);
        const tmb = Math.round(10 * totalWeight + 6.25 * heightRange.value - 5 * 30 + 5);
        
        leanMassValue.textContent = leanMass;
        tmbValue.textContent = tmb.toLocaleString('pt-BR');
    }

    calcBtn.addEventListener('click', calcularIMC);

    // Botão de recarga do sensor
    document.querySelector('.reload-btn').addEventListener('click', () => {
        calcularIMC();
    });

    // Executar cálculo inicial ao carregar a página
    calcularIMC();
});