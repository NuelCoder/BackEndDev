const calculate = (a,b,operation) => {
    if(a=== null|| b === null || a === undefined || b === undefined){
        throw new Error('Inputs must be valid and not null or undefined')
    }
    const allowed_operations = ['add','subtract','multiply','divide']
    if(!allowed_operations.includes(operation)){
        throw new Error('You passed an invalid operation. Allowed operations are add,subtract, multiply, divide')
    }
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error('Both values must be numbers');
    }
    if(operation === 'add'){
        console.log(`Addition: ${a} + ${b} = `, a + b);
    }
    else if(operation === 'subtract'){
        console.log(`Subtraction: ${a} - ${b} = `, a - b );
    }
    else if(operation === 'multiply'){
        console.log(`Multiplication: ${a} * ${b} = `, a * b);
    }
    else if(operation === 'divide'){
        console.log(`Division: ${a} / ${b} = `, a / b);
    }
    else{
        console.log('Unexpected Operation')
    }
};
calculate(8,7, 'add')
calculate(7,2,'divide')
calculate(15,15,'multiply')
calculate(2000,167,'subtract')