var prueba = document.getElementById("XD");

// mandamos a llamar al big integer

//Definir los numeros grandotes
var tamprimo;
var p, q, n;
var fi;
var e, d;
var limite = 20; // 10 elevado a tamprimo
var j = 2;
var numerosPrimos = [];

for (; j < limite; j++) {
    if (primo(j)) {
        numerosPrimos.push(j);
    }
}
console.log(numerosPrimos);

do p = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
while (p == q) {
    q = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
}
n = p * q;
fi = p - 1;
fi *= (q - 1);
do e = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)]; // considerar tamprimo
while (fi < e || maximoComunDivisor(e, fi) != 1);
d = modInverse(fi, e);



function RSA(tamprimo) {
    this.tamprimo = tamprimo;
}
//generar los numeros primos
function generarPrimos() {
    do p = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
    while (p == q) {
        q = numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
    }
    return p, q;
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
    alert(prueba.value)
    var respuesta = cifrar(prueba.value, e, n);
    return respuesta;
}

function correrDesifrado() {
    generarPrimos();
    generarClaves();
    cifrar(prueba, e, n);
}


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
//p y q 
//17 y 2
// 1;26;23
//12623
//123
//1;32;5
//1325
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
/**
 * 
 * public String descifrar(BigInteger[] cifrado){
        
        BigInteger[] descifrado = new BigInteger[cifrado.length];
        
        //vamos a descifrar con la formula
        // Md = C ^d mod n
        
        for(int j = 0; j < descifrado.length; j++){
            descifrado[j] = cifrado[j].modPow(d, n);
        }
        
        char[] charArray = new char[descifrado.length];
        
        for(int j = 0; j < charArray.length; j++ ){
            charArray[j] = (char)(descifrado[j].intValue());
        }
        
        return (new String(charArray));
    }
 */
function descifrar(mensaje, e, n) {
    var i = 0;
    var respuesta = mensaje.split(";");
    var mensajeDescifrado = "";
    for (i; i < prueba.value.length; i++) {
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