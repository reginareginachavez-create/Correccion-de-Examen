const peso = document.querySelector('#peso');
const altura = document.querySelector('#altura');
const cajaResultado = document.querySelector('#caja-resultado');

let temporizador;

function calcularIMC() {
    let p = parseFloat(peso.value);
    let a = parseFloat(altura.value) / 100;
    document.querySelector('#vpeso').textContent = p;
    document.querySelector('#valtura').textContent = a.toFixed(2);

    for (let i = 1; i <= 6; i++) {
        let caja = document.querySelector('#imc' + i);
        caja.style.transition = "0.4s";
        caja.style.transform = "scale(1)";
        caja.style.position = "relative";
        caja.style.zIndex = "1";
    }

    cajaResultado.innerHTML = `<img src="gif/spinner gif.gif" width="40" alt="Cargando...">`;

    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        let imc = (p / (a * a)).toFixed(2);
        cajaResultado.innerHTML = `IMC: <strong id="imc">${imc}</strong> kg/m<sup>2</sup>`;

        let tipo = 6;
        if (imc < 18.5) tipo = 1;
        else if (imc < 25) tipo = 2;
        else if (imc < 30) tipo = 3;
        else if (imc < 35) tipo = 4;
        else if (imc < 40) tipo = 5;

        let activa = document.querySelector('#imc' + tipo);
        activa.style.transform = "scale(1.1)";
        activa.style.zIndex = "5";
    }, 500);
}

function reiniciar() {
    clearTimeout(temporizador);
    peso.value = 31;
    altura.value = 120;
    calcularIMC();
}

peso.oninput = calcularIMC;
altura.oninput = calcularIMC;

calcularIMC();