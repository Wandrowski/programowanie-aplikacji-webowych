var Person = (function () {
    function Person(name, lastname, age) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
    }
    Person.prototype.Show = function () {
        return "Witaj " + this.name + " " + this.lastname + " mam " + this.age + " lat";
    };
    return Person;
})();
var p = new Person("John", "Blake", 18);
document.body.innerHTML = p.Show();
