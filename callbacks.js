let animals = ['cat', 'dog', 'bird' ]

// foreach loop
animals.forEach(function(animal, index) {
    console.log(index, animal)
})

// another way to use a foreach loop using arrow function notation
animals.forEach((animal, index) => {
    console.log(index, animal)
})

