const calculateBtn = document.getElementById('calculate-btn');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const resultDiv = document.getElementById('result');
const imcValueP = document.getElementById('imc-value');
const imcClassificationP = document.getElementById('imc-classification');

calculateBtn.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Validação básica dos campos
    if (!weight || weight <= 0 || !height || height <= 0) {
        alert('Por favor, insira valores válidos e maiores que zero para peso e altura.');
        return;
    }

    // Cálculo do IMC: Peso / (Altura * Altura)
    const imc = weight / (height * height);
    let classification = '';

    // Classificação conforme padrões da OMS
    if (imc < 18.5) {
        classification = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        classification = 'Peso normal (Eutrofia)';
    } else if (imc >= 25 && imc < 30) {
        classification = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        classification = 'Obesidade Grau I';
    } else if (imc >= 35 && imc < 40) {
        classification = 'Obesidade Grau II';
    } else {
        classification = 'Obesidade Grau III (Mórbida)';
    }

    // Exibição dos resultados no DOM
    imcValueP.textContent = `Seu IMC: ${imc.toFixed(2)}`;
    imcClassificationP.textContent = `Classificação: ${classification}`;
    
    resultDiv.classList.remove('hidden');
});