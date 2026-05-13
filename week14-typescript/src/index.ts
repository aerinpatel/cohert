const greet = (name: string) => `Hello, ${name}!`;
console.log(greet("sachi"));

const sum = (a:number,b:number):number => a+b;
console.log(sum(1,4));

const check = (a:number):boolean => a>18?true:false;
console.log(check(29));

const bolo = (a:(x:string) => void) =>{
    setTimeout((x:string) => console.log(a(x)), 1000);
}
bolo;
