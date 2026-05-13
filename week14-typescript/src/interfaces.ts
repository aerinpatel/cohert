interface User{
    name:string,
    age:"yes"|"no";
}
let a:User = {name:'aerin',age:'yes'};
// let check = (user:User):void => user.age >18 ? console.log(user.name + 'is above 18'):console.log(user.name + 'is underaged');
// check(a);

console.log(a);