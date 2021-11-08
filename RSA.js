// mandamos a llamar al big integer

//Definir los numeros grandotes
var tamprimo;
var p, q, n;
var fi;
var e, d;

function RSA(tamprimo) {
    this.tamprimo = tamprimo;
}
//generar los numeros primos
function generarPrimos() {
    var limite = 100; // 10 elevado a tamprimo
    var j = 2;
    var numerosPrimos = [];

    for (; j < limite; j++) {
        if (primo(j)) {
            numerosPrimos.push(j);
        }
    }
    do p = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
    while (p == q) {
        q = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
    }
}

function primo(numero) {
    for (var i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return numero !== 1;
}

function maximoComunDivisor(a, b) {
    let temporal;
    while (b !== 0) {
        temporal = b;
        b = a % b;
        a = temporal;
    }
    return a;
};
//do e = new BigInteger(2*tamprimo, new Random());
//while((e.compareTo(fi) != -1) || (e.gcd(fi).compareTo(BigInteger.valueOf(1)) != 0));
/*
0 es para cuando son iguales
1 es para cuando el valor del primero es mayor que el segundo
-1 es para cuando el segundo es mayor que el primero
el primero esta definido como:
primero.compareTo(segundo)
*/
function generarClaves() {
    n = p * q;
    fi = p - 1;
    fi *= (q - 1);
    do e = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)]; // considerar tamprimo
    while (fi - e > 0 || maximoComunDivisor(e, fi) != 1);
    d = modInverse(e, fi);
}

function modInverse(a, m) {
    //gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    //inverse
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
    for (; i < mensaje.length; i++) {
        if (i > 0) {
            respuesta += ";";
        }
        var char = mensaje.charAt(i);
        var caf = parseInt(char, 10);
        var x = modPow(caf, e, n);
        respuesta += x.toString();
    }
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

function descifrar(mensaje, d, n) {
    var i = 0;
    var respuesta = mensaje.split(";");
    for (; i < mensaje.length; i++) {
        var de = descifrar[i];
        var x = modPow(de, d, n);
        respuesta += x.toString();
    }
    return respuesta;
}