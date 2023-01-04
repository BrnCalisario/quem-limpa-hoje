function isWeekDay(date) {
    return date.getDay() > 0 && date.getDay() < 6
}

function findMonday(date) {
    var d = new Date(date)

    if (d.getDay() == 0) {
        d.setDate(d.getDate() + 1)
        return d
    }

    while (d.getDay() > 1) {
        d.setDate(d.getDate() - 1)
    }

    return d
}

function formatDayNMonth(date) {
    var ymd = date.toISOString().split("T")[0]
    var splited = ymd.split("-")
    return splited[2] + "/" + splited[1]
}

function setTitle() {
    var title = $("#week-title")
    var monday = findMonday(new Date())
    title.text(title.text() + " " + formatDayNMonth(monday))
}

function focusActualDay() {
    let hoje = new Date()

    if (!isWeekDay(hoje)) {
        return
    }

    $(".dia").map((index, div) => {
        if (index == hoje.getDay() - 1) {
            div.style.backgroundColor = "#cff6fc"
        }
    })
}

function getLimpadores(date) {
    var hoje = date || new Date()
    hoje.setHours(0, 0, 0, 0)

    var dupla = listaDias.find(d => d.day.toISOString() === hoje.toISOString())

    $("#cleaners").empty()
    $("#cleaners").append("Quem limpa:\n" + dupla.duo)
}

function clearBtns() {
    $(".dia").each(function () {
        $(this).css("background-color", "white")
    })
}

function buttonFn() {
    $(".dia").map((i, b) => {
        b.onclick = () => {
            clearBtns()
            b.style.backgroundColor = "#cff6fc"
            let monday = findMonday(new Date())
            monday.setDate(monday.getDate() + i)
            getLimpadores(monday)
        }
    })
}


function readyFn() {
    focusActualDay()
    setTitle()
    buttonFn()
    getLimpadores(new Date())
}

$(document).ready(readyFn)