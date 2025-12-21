//Objects: Collection of key value pair {key:value}

//2 ways

//1. Classes
//2. Object literal


//2. 
// const obj = {
//     name:'Jack'
// }

//2 ways to get data from object

//1. obj.key
//obj["key"] //key in form of string

const person = {
    name: "Jack",
    age: 27,
    address: {
        city: "Pune",
        state: "Maharashtra"
    },
    skills: [{one:"Java"},{two:"JS"}, {three:"TS"}],

    humanInfo: function(){
        console.log(person.name, person.age, person.address)
    }
}

console.log(person.skills)
console.log(person.address.city)
console.log(person.skills[2])
console.log(person.skills[2].three)