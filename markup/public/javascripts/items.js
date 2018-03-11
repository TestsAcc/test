var DATA_GLOBAL = [];

$(document).ready(getItems());

function getItems() {
    $.ajax({
        url: "https://api.myjson.com/bins/bi2e1",
        type: 'GET',
        dataType: 'json',
    })
        .done(function (data) {
            DATA_GLOBAL = data.catalog;

            for (var i = 0; i < data.categories.length; i++) {
                $('#category').append(
                    "<p><a href=''>" + data.categories[i] + "</a></p>"
                );
            }

            var templateScript = $('#scriptItemPageRender').html();
            var template = Handlebars.compile(templateScript);
            for (var i = 0; i < data.catalog.length; i++) {
                $('.itemRender').append(template(DATA_GLOBAL[i]));
            }


        })

        .fail(function () {
            console.log("error");
        })



}

function itemPageRender(id) {
    var templateScript = $('#modalItemPageRender').html();
    var template = Handlebars.compile(templateScript);
    for (var i = 0; i < DATA_GLOBAL.length; i++) {

        if (id == DATA_GLOBAL[i].id) {
            $('#itemPageRender').empty().append(template(DATA_GLOBAL[i]));
        }
    }
}

function login() {
    var loginEmail = $('#loginEmail').val();
    var loginPass = $('#loginPass').val();
    var loginEmailObj = {loginEmail};
    $.ajax({
        url: "/login",
        type: 'post',
        data: {
            loginEmail: loginEmail,
            loginPass: loginPass
        },
    })
        .done(function (data) {
            console.log(data);
            var templateScript = $('#loginRenderEmail').html();
            var template = Handlebars.compile(templateScript);
            $('.userEmailRender').empty().append(template(loginEmailObj));
        });
}

function signup() {
    jQuery.validator.addMethod("accept", function(value, element, param) {
        return value.match(new RegExp("." + param + "$"));
    });

    $(".signForm").validate({
        rules: {
            signFirstName: {
                required:true,
                rangelength: [2, 30],
                accept: "[А-Яа-яЁё]"
            },

            signLastName: {
                required:true,
                rangelength: [2, 30],
                accept: "[А-Яа-яЁё]"
            },

            signEmail: {
                required:true,
                email: true
            },

            signPass: {
                required:true,
                minlength: 6
            },
            signRePass: {
                required:true,
                minlength: 6
            }
        },
        messages: {
            signFirstName:{
                required: "Это обязательное поле",
                rangelength: "Длина от 2 до 30",
                accept: "Только кириллица"
            } ,
            signLastName:{
                required: "Это обязательное поле",
                rangelength: "Длина от 2 до 30",
                accept: "Только кириллица"
            } ,

            signEmail: {
                required: "Это обязательное поле",
                email: "Ваш email должен быть в формате name@domain.com"
            },
            signPass: {
                required: "Это обязательное поле",
                minlength: "Минимум 6 симболов"
            },
            signRePass: {
                required: "Это обязательное поле",
                minlength: "Минимум 6 симболов"
            }
        }
    });
    let data = $('.signForm').serialize();


    if($('.signForm').valid()){
    if(data.signPass != data.signRePass){
        alert('Пароли не совпадают');
    }
    else{
        $.ajax({
            url: '/reg',
            type: 'POST',
            data: data
        })
            .done(function (data) {
                let dataParse = JSON.parse(data);
                if(dataParse.status == true) {
                    let templateScript = $('#signSuccess').html();
                    let template = Handlebars.compile(templateScript);
                    $('.modalLoginSignEntry').empty().append(template());
                }
                else {
                    alert('Регистрация не удалась');
                }
            });
    }
    }
}

function renderModalLogin() {
    let loginData = {
        modalTitle: 'Вход'
    };
    let templateScript = $('#loginModal').html();
    let template = Handlebars.compile(templateScript);
    $('.modalLoginSignEntry').empty().append(template(loginData));
}

function renderModalSign() {
    let signData = {
        modalTitle: 'Регистрация'
    };
    let templateScript = $('#signModal').html();
    let template = Handlebars.compile(templateScript);
    $('.modalLoginSignEntry').empty().append(template(signData));
}