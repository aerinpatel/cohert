interface User{
    name:string;
    age:number;
}
// function sumOfAge(a:User,b:User) : number{
//     return a.age+b.age;
// }
// console.log(sumOfAge({name:'aerin',age:19},{name:'aerin',age:19}))

///////////////////////////////////////////PICK API/////////////////////////////////////////////////////////
// it lets you pick a value from interface and give type as output
interface User {
    name:string;
    age:number;
    id:1|2|3|4;
    email:string;
    password:string;
}
type UpdatedProps = Pick<User,'name'|'age'|'password'>;// <-----
function updateOptianalUser(u:UpdatedPropsOptinal){
    // code goes here
    console.log(u);
}
updateUser({name:'adf',age:98,password:"adfsfs",id:2} as UpdatedProps)
const a :User = {name:"aerin",age:92,id:2,email:'adsf',password:'dsf'};
const b:User = a;
console.log(b);

/////////////////////////////////////////////PARTIAL API///////////////////////////////////////////////////
type UpdatedPropsOptinal = Partial<UpdatedProps>;// <-----
function updateUser(u:UpdatedProps){
    // code goes here
    console.log(u);
}
updateOptianalUser({name:'adf',age:98})


/////////////////////////////////////////////READ ONLY API///////////////////////////////////////////////////
type Employee = {
    name:string;
    readonly email:string;
}
const x: Readonly<Employee> = {
    name:'aerin',email:"adfs"
}

console.log(' --> ', x);
// x.name = 'ramesh';
// x.email='dsfa';
console.log(x);


/////////////////////////////////////////////RECORD API///////////////////////////////////////////////////
// use give type to a array-map data with a lot of entries in a better visual way

///////////old
// interface Student {
//   id: string;
//   name: string;
// }

// type Users = { [key: string]: Student };

// const users: Users = {
//   'abc123': { id: 'abc123', name: 'John Doe' },
//   'xyz789': { id: 'xyz789', name: 'Jane Doe' },
// };

// console.log(users);

//////////by record

interface Student {
  id: string;
  name: string;
}

type Users = Record<string, Student>;

const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }


////////////////////////////////// EXCLUDE ////////////////////////////////
// this is unlike pick that picks it excludes BUT THIS IS FOR LITERALS( X = 'DSFA'|'AFDS') NOT OBJECTS FOR OBJECTS THERE IS PICK
type Event = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<Event, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK

////////////////////////// [IMP] Type Infered in zod ////////////////////////
// basically insted of defining the validation in zod and then also creating type of the same object is work for 2 times which is bad thus we create this
// z.infer<typeof ZOD_OJBECT> takes the zod validation as input and spits out type as output usefull in MONO REPOS (NEXT.JS)
import {z} from 'zod';
// import email = require('zod');
const userProfileSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional(),
})

type userProfileSchemaType = z.infer<typeof userProfileSchema>;
const q:userProfileSchemaType = {name:'adsfd'};
console.log(q);