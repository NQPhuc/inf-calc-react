/**
    * return an array of [digit, carry] for a number n depending on the base
    * the carry is not necessary a single digit 
*/
export function getDigitAndCarry(n, base){
    return [n % base, Math.floor(n / base)];
}

/**
* return an array of [digit, borrow] for a number n depending on the base
* the borrow is not necessary a single digit
*/
function getDigitAndBorrow(n, base){
    if (n >= 0) return [n, 0];
    //console.log(base - ((-n) % base), Math.ceil((-n) / base));
    if((-n) % base === 0) return [0, Math.ceil((-n) / base)];
    else return [base -  ((-n) % base), Math.ceil((-n) / base)];
}

export function isValidInteger(text){
    let regularExpression = /^-?[0-9]+$/;
    return regularExpression.test(text);
}

function plus(a, b){
    let res = '';
    let carry = 0;
    if(a.length < b.length){
        let temp = a;
        a = b;
        b = temp;
    }
    let i = a.length - 1;
    let j = b.length - 1;
    for(; j > -1; j--, i--){
        let digitAndCarry = getDigitAndCarry(parseInt(a[i]) + parseInt(b[j]) + carry, 10);
        res = digitAndCarry[0] + res; //adding from right to left (new digit is append to the left of the current result string)
        carry = digitAndCarry[1];
    }

    for(; i > -1; i--){
        let digitAndCarry = getDigitAndCarry(parseInt(a[i]) + carry, 10);
        res = digitAndCarry[0] + res; //adding from right to left (new digit is append to the left of the current result string)
        carry = digitAndCarry[1];
    }

    if(carry > 0) res = carry + res;
    return res;
}

/**
 * compare two positive number (leading zero trimmed), return true if a < b else return false  
 */
function smallerThan(a, b){
    if(a.length < b.length) return true;
    if(a.length > b.length) return false;
    for(let i = 0; i < a.length; i++){
        if(parseInt(a[i]) < parseInt(b[i])){
            return true;
        }
        else if(parseInt(a[i]) > parseInt(b[i])){
            return false;
        }
    }
    return false; //this line is execute only when a == b
}
function minus(a, b){
    let res = '';
    let borrow = 0;
    let swapped = false;

    //console.log(a, '-', b);
    if(smallerThan(a, b)){
        let temp = a;
        a = b;
        b = temp;
        swapped = true;
    }
    let i = a.length - 1;
    let j = b.length - 1;
    for(; j > -1; j--, i--){
        let digitAndCarry = getDigitAndBorrow(parseInt(a[i]) - parseInt(b[j]) - borrow, 10);
        //console.log('digit & carray', digitAndCarry);
        res = digitAndCarry[0] + res; //adding from right to left (new digit is append to the left of the current result string)
        //console.log('res', res);
        borrow = digitAndCarry[1];
    }

    for(; i > -1; i--){
        let digitAndCarry = getDigitAndBorrow(parseInt(a[i]) - borrow, 10);
        res = digitAndCarry[0] + res; //adding from right to left (new digit is append to the left of the current result string)
        borrow = digitAndCarry[1];
    }

    if(borrow > 0) res = '-' + borrow + res;
    if(swapped){
        if(borrow[0] === '-') res = res.slice(1);
        else res = '-' + res;
    }
    return res;
}
function mul(a, b){
    let runningSum = '0';
    
    let zeroPadding = '';
    for(let i = a.length - 1; i > -1; i--){
        let res = zeroPadding;
        let carry = 0;
        
        for(let j = b.length - 1; j > -1; j--){
            let digitAndCarry = getDigitAndCarry(parseInt(a[i]) * parseInt(b[j]) + carry, 10);
            res = digitAndCarry[0] + res;
            carry = digitAndCarry[1];
        }
        if(carry > 0) res = carry + res;    
        runningSum = plus(runningSum, res);

        zeroPadding += '0';
    }

    return runningSum;
}

function mulByTen(num){
    return num + '0';
}
function mod(a, b){
    if(b === '0') return 'undefined';
    if(smallerThan(a, b)) return a;

    let B = b;
    while (smallerThan(mulByTen(B), a)){ 
        B = mulByTen(B);
    }
    let remain = trimZero(minus(a, B));          
    //console.log(remain, '=', a, '-', B);

    return mod(remain, b);
}
function trimZero(num){
    let numIsMinus = (num[0] === '-');
    if(numIsMinus) num = num.slice(1);
    while(num[0] === '0' && num.length > 1){
        num = num.slice(1);
    }
    if(numIsMinus) num = '-' + num;
    return num;
}
/**
 * 
 * @param {*} a operand 1: string
 * @param {*} b operand 2: string
 * @param {*} op operator: +,-,* or %
 * @returns 
 */
export function calculate(a, b, op){
    let res = -999

    if(!isValidInteger(a)) return "wrong input";
    if(!isValidInteger(b)) return "wrong input";

    let aIsNeg = false;
    let bIsNeg = false;
    if(a[0] === '-'){
        aIsNeg = true;
        a = a.slice(1);
    }
    if(b[0] === '-'){
        bIsNeg = true;
        b = b.slice(1);
    }
    

    a = trimZero(a);
    b = trimZero(b);
    if(op === '+'){
        if(aIsNeg && bIsNeg){// -a + -b = -(a+b)
            //console.log(a, b);
            res = '-' + plus(a, b);
            //console.log(res);
        }
        else if(aIsNeg){// -a + b = b-a
            //console.log("here1");
            res = minus(b, a);
        }
        else if(bIsNeg){// a + -b = a-b
            //console.log("here2");
            res = minus(a, b);
        }
        else{// a + b
            //console.log("here3");
            res = plus(a, b);
        }
    }
    else if(op === '-'){
        if(aIsNeg && bIsNeg){// -a - -b = b-a 
            res = minus(b, a);
        }
        else if(aIsNeg){// -a - b = -(a+b)
            res = '-' + plus(a, b);
        }
        else if(bIsNeg){// a - -b = a+b
            res = plus(a, b);
        }
        else{//a-b
            res = minus(a, b);
        }
    }
    else if(op === '*'){
        if(aIsNeg && bIsNeg){ 
            res = mul(a, b);
        }
        else if(aIsNeg || bIsNeg){
            res = '-' + mul(a, b);
        }
        else{
            res = mul(a, b);
        }
    }
    else if(op === '%'){
        if(aIsNeg){
            res = '-' + mod(a, b);
        }
        else{
            res = mod(a, b);
        }
    }
    else{
        return 'Wrong operator';
    }

    return trimZero(res);
}