Students = [{name: 'Jonathan', age: 20, grade: 'B'},
            {name: 'Funmi', age: 18, grade: 'C'},
            {name: 'Nuel', age: 17, grade: 'A'},
            {name: 'Ifitumi', age: 18, grade: 'A'},
            {name: 'Sean', age: 19, grade: 'D'},
            {name: 'Rebecca', age: 17, grade:'B'},
            {name: 'Benson', age: 17, grade: 'E'},
]


const FilterByGrade = Students.filter((std_grade) => std_grade.grade === 'A')
console.log(FilterByGrade)

const TotalAge = Students.reduce((total,std) => total + std.age,0)
console.log(`Average age = ${TotalAge} / ${Students.length} = `, TotalAge/Students.length)