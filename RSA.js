var texto = document.getElementById("texto");

// mandamos a llamar al big integer
//Big integer aun no se implementa(En su lugar se usan variables y metodos diferentes)
//Definir los numeros grandotes
//traemos el tamaño del primo y usamos su constructor para obtener el valor
var tamprimo;

function RSA(tamprimo) {
    this.tamprimo = tamprimo;
}
//declaracion de variables
var p, q, n;
var fi;
var e, d;
var limite = 20; // 10 elevado a tamprimo para big integer
var numerosPrimos = []; // aquí se guardaran los primos dentro del rango j y limite

//generacion de primos
for (var j = 2; j < limite; j++) {
    if (primo(j)) {
        numerosPrimos.push(j);
    }
}
//Validacion para saber si el numero que se evalua es primo
function primo(numero) {
    for (var i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return numero !== 1;
}
//Generacion de p, q, n, fi, e, d (Solo lo hace una vez por recarga)
do p = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
while (p == q) {
    q = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
}
//Esto deberia meterse en una funcion para calcular n,fi,e,d a partir de p y q
n = p * q;
fi = p - 1;
fi *= (q - 1);
do e = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)]; // considerar tamprimo
while (fi < e || maximoComunDivisor(e, fi) != 1);
d = modInverse(fi, e);

//generar los numeros primos (p,q) para usar cada ver que cifra 
//como funcion para automatizar el proceso de generacion
function generarPrimos() {
    do p = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
    while (p == q) {
        q = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
    }
    return p, q;
}
//GCD maximo comun divisor de dos numeros
function maximoComunDivisor(a, b) {
    let temporal;
    while (b !== 0) {
        temporal = b;
        b = a % b;
        a = temporal;
    }
    return a;
};

function correrCifrado() {
    var respuesta = cifrar(texto.value, e, n);
    return respuesta;
}

//Modulo inverso

function modInverse(a, m) {
    a = (a % m + m) % m
        // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

function cifrar(mensaje, e, n) {
    var i = 0;
    var respuesta = "";
    for (i; i < mensaje.length; i++) {
        if (i > 0) {
            respuesta += ";";
        }
        var char = mensaje.charAt(i);
        var caf = parseInt(char, 10);
        var x = modPow(caf, e, n);
        respuesta += x.toString();
    }
    console.log(respuesta);
    console.log(p)
    console.log(q)
    console.log(n)
    console.log(fi)
    return respuesta;
}
//mod pow
function modPow(c, exponent, module) {
    //x.modPow(exponent, module)
    //n ^ exponent % module
    /*Donde n y el modulo no son primos relativos*/
    // e, n
    var x = Math.pow(c, exponent);
    x %= module;
    return x;
}

function descifrar(mensaje, e, n) {
    var i = 0;
    var respuesta = mensaje.split(";");
    var mensajeDescifrado = "";
    for (i; i < texto.value.length; i++) {
        var de = respuesta[i];
        var caf = parseInt(de, 10);
        var x = modPow(caf, e, n);
        mensajeDescifrado += x.toString();
    }
    console.log("Descifrado = " + mensajeDescifrado)
    return mensajeDescifrado;
}

function Hacerdescifrado() {
    var mensaje = generarClaves();
    descifrar(mensaje, d, n);
}
/**
 * Se encontraron errores de codificacion, 
 * al no usar big int se cambiaron parametros 
 * por lo tanto no funciona de la misma forma, 
 * entonces deberas de cambiar eso para que cifre y descifre
 */