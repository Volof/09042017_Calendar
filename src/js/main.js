function createCalendar(id, year, month) {
    var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = month - 1; //Місяці від 0 - 11(в JS)
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();//Переводимо дату у стрічку
    var first_day = tmp.substring(0, 3);    //Mon
    var day_name = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; //Початок тижня з Mon
    var day_num = day_name.indexOf(first_day);   //1
    var days = new Date(year, month + 1, 0).getDate();    //30
    var calendar = get_calendar(day_num, days);
    document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year; //формуємо заголовок календаря (В завданні немає, але виглядає більш інформаційно)
    document.getElementById("calendar-dates").appendChild(calendar);//формуємо дні
};

//Створюємо таблицю з даними
function get_calendar(day_num, days) {
    var table = document.createElement('table');
    var tr = document.createElement('tr');

    //1й row з днями тижня
    for (var i = 0; i <= 6; i++) {
        var td = document.createElement('td');
        td.innerHTML = "mtwtfss"[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //2й row
    tr = document.createElement('tr');
    var c;
    for (c = 0; c <= 6; c++) {
        if (c == day_num) {
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }

    var count = 1;
    for (; c <= 6; c++) {
        var td = document.createElement('td');
        td.className = "td_num";
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //3й-6й row
    for (var r = 3; r <= 7; r++) {
        tr = document.createElement('tr');
        for (var c = 0; c <= 6; c++) {
            if (count > days) {
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.className = "td_num";
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
};

createCalendar("calendar", 1984, 8); //викликаєм функцію createCalendar

$(document).ready(function () {
    $('.td_num').click(function () {
        $('.td_num').removeClass('selected');//таргет active
        $(this).addClass('selected');
        var x = $(this).text() + " " + $("#calendar-month-year").text().substring(0, 6);
        console.log(x);
        $('.modal-body').text(x); //заповнення контенту
        $('#myModal').modal('toggle');//запуск модального вікна
    });
});