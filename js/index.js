var duplas = [
    "Thiago e Iago",
    "Carioca e Kaiky",
    "André e Hemerson",
    "Ramirez e Murilo",
    "Manu e Gabi",
    "Maitê e Bruno",
    "Fortunato e Felipe",
    "Freire e Leo",
    "Peter e Nycollas"
]

class CleanDay {
    constructor(day, duo) {
        this.day = day
        this.duo = duo
    }
}

function isWeekDay(date) {
    return date.getDay() > 0 && date.getDay() < 6
}


var startDate = new Date("01/03/2023")
var endDate = new Date("12/31/2023")

var listaDias = []

var loop = new Date(startDate)
while (loop <= endDate) {

    if (isWeekDay(loop)) {
        var dupla = duplas.shift()
        var dia = new CleanDay(new Date(loop), dupla)
        duplas.push(dupla)
        listaDias.push(dia)
    }
    loop.setDate(loop.getDate() + 1)
}
