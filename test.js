let records = [[
    "name",
    "category",
    "sub_category",
    "description",
    "chasis_number",
    "model",
    "color",
    "height",
    "length",
    "weight",
    "engine"
],
[
    "Honda Civic",
    "Vehicle",
    "Car",
    "A great car",
    "436235",
    "bv300",
    "white",
    "1.59m",
    "2.99m",
    "5325kg",
    "2000cc"
],
[
    "Renault Duster",
    "Vehicle",
    "Car",
    "Best condition",
    "31513",
    "Lxi",
    "brown",
    "",
    "3.5m",
    "6000kg",
    "1300cc"
],
[
    "Maruti Alto",
    "Vehicle",
    "Car",
    "Cheap buy",
    "38r019",
    "Vue",
    "",
    "",
    "",
    "",
    ""
]
]

arayD = {}

for(let i=1;i<records.length;i++){
    arayD[records[0][0]] = records[i][0]
}

console.log(arayD)