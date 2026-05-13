
interface Person{
    name:string;
    age:number;
    greet():string;
}

class Employee implements Person{
    name: string;
    age: number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    greet(): string {
        return `hello there ${this.name}`;
    }
}
