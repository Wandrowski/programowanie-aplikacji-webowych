class Person{
    name:string;
    lastname:string;
    age:number;
    constructor(name:string, lastname:string, age:number){
        this.name = name;
        this.lastname = lastname;
        this.age = age;
    }
    Show(){
        return `Witaj ${this.name} ${this.lastname} mam ${this.age} lat`;
    }
    let p = new Person("John", "Blake", 18);
    document.body.innerHTML = p.Show();
