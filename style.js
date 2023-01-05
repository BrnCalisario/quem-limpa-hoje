var isWeekDay = (date) => date.getDay() > 0 && date.getDay < 6

var shiftWeek = (date, shift) => {
    let nextMonday = findMonday(date)
    nextMonday.setDate(nextMonday.getDate() + shift)
    return nextMonday
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

function setTitle(date) {
    var title = $("#week-text")
    $("#week-text").val(date.toISOString().split("T")[0])
    var monday = findMonday(date)
    title.text("Semana " + formatDayNMonth(monday))
}

function focusActualDay(date) {
    let hoje = date || new Date()

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

    $("#cleaners").text(dupla.duo)
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
            let monday = findMonday(new Date($("#week-title").val()))
            monday.setDate(monday.getDate() + i)
            getLimpadores(monday)
        }
    })
}

function arrowFn() {
    $(".right").click(function () {
        let nextWeek = shiftWeek($("#week-title").val(), 7)
        $("#week-title").val(findMonday(nextWeek))
        refresh(nextWeek)
    })
    $(".left").click(function () {
        let pastWeek = shiftWeek($("#week-title").val(), -7)
        $("#week-title").val(findMonday(pastWeek))
        refresh(pastWeek)
    })
}

function refresh(date) {
    clearBtns()
    buttonFn()
    setTitle(date)
    focusActualDay(date)
    getLimpadores(date)
}



$(document).ready(() => {
    let hoje = new Date()
    $("#week-title").val(findMonday(hoje))
    refresh(hoje)
    arrowFn()

})


