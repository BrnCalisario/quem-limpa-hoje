var duplas = [
    "Manu e Gabi",
    "Maitê e Bruno",
    "Freire e Leo",
    "Fortunato e Felipe",
    "Peter e Nycollas",
    "Thiago e Iago",
    "Carioca e Kaiky",
    "André e Hemerson",
    "Ramirez e Murilo"
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


var start = new Date("01/03/2023")
var end = new Date("12/31/2023")

var listaDias = []

var loop = new Date(start)
while (loop <= end) {

    if (isWeekDay(loop)) {
        var dupla = duplas.shift()
        var dia = new CleanDay(new Date(loop), dupla)
        duplas.push(dupla)
        listaDias.push(dia)
    }
    loop.setDate(loop.getDate() + 1)
}
