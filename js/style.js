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
        $("#week-text").addClass("move-left")
        refresh(nextWeek)
                
        if(shiftWeek(md, 7) > endDate)
            return

    })
    $(".left").click(function () {

        var md = findMonday($("#week-title").val())
        if(shiftWeek(md, -7) < startDate) 
            return

        let pastWeek = shiftWeek($("#week-title").val(), -7)
        $("#week-title").val(findMonday(pastWeek))
        refresh(pastWeek)
    })
}


function displayDays() {
    var segunda = new Date($("#week-title").val())

    $(".num-dia").remove()
    $(".dia").each(function () {
        var $pDia = $('<span class="num-dia"></span>')
        var dia = segunda.getDate()

        if (dia <= 9)
            dia = "0" + dia

        segunda.setDate(segunda.getDate() + 1)

        $pDia.text(dia)
        $(this).append($pDia)
    })
}

function refresh(date) {
    clearBtns()
    buttonFn()
    setTitle(date)
    focusActualDay(date)
    getLimpadores(date)
    displayDays()

    
    if(shiftWeek(findMonday(date), -7) < startDate) {
        $(".left").css("color" ,"lightgray")
    } else {
        $(".left").css("color", "gray")
    }

    if(shiftWeek(findMonday(date), 7) > endDate) {
        $(".right").css("color" ,"lightgray")
    } else {
        $(".right").css("color", "gray")
    }

    let title = document.getElementById("week-text")
    title.addEventListener("animationend", listener, false)
    title.addEventListener("animationstart", listener, false)
}

function listener(event) {
    let title = document.getElementById("week-text")
    
    switch (event.type) {
        case "animationstart":
            break;
        case "animationend":
            break;
        case "animationiteration":
            break;
    }
}

$(document).ready(() => {
    let hoje = new Date()
    $("#week-title").val(findMonday(hoje))
    refresh(hoje)
    arrowFn()

})


