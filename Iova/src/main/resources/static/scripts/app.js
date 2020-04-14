$("#projectId").change(function () {
    var contextUrl = $('#contextUrl').val();
    var projectId = $("#projectId").val();

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: contextUrl + "user/getTownsByProjectId",
        data: {"id": projectId},
        dataType: 'json',
        success: function (data) {
            console.log("SUCCESS: ", data);

            var dataArr = data;

            $('#project_towns').find('option').remove();
            var nullOption = $('<option>');
            nullOption.attr('value', 0);
            nullOption.attr('selected', 'selected');
            nullOption.attr('disabled', 'disabled');
            nullOption.html("Моля избери град");
            $('#project_towns').append(nullOption);

            for (var i = 0; i < dataArr.length; i++) {

                var option = $("<option>");
                console.log('data[i].id =' + dataArr[i].id + ' data[i].name=' + dataArr[i].name);
                option.attr("value", dataArr[i].id);
                option.html(dataArr[i].name);

                $("#project_towns")
                    .append(option)
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
            //display(e);
        },
        done: function (e) {
            console.log("DONE");
        }
    })
});

$('#project_towns').change(function () {

    var project_towns = $('#project_towns').val();
    var projectId = $("#projectId").val();

    var yearInput = $('#year');
    var countInput = $('#count');

    if (project_towns != 0) {
        yearInput.attr('disabled', false);
        countInput.attr('disabled', false);
    } else {
        yearInput.attr('disabled', 'disabled');
        countInput.attr('disabled', 'disabled');
    }
});

$(document).ready(function() {

    var contextUrl = $('#contextUrl').val();
    var projectId = $('#projectId').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    console.log(contextUrl + ' ' + projectId + ' '  + ' ' + startDate + ' ' + endDate);
    if($('#canvas').val() != null){
        console.log( "ready!" );
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: contextUrl + "getReports",
            dataType: 'json',
            data: {"projectId": projectId, "startDate": startDate, "endDate": endDate},
            success: function (data) {
                var labels = data.labels;

                var reports = data.reports;


                var userData = [];
                var users = [];

                var reportsKeys = Object.keys(reports);

                for(var i = 0; i < reportsKeys.length; i++){
                    var currentUser = reportsKeys[i];
                    var currrentReport = reports[currentUser];

                    labels.forEach(function (lable) {
                        if(currrentReport[lable]){
                            userData.push(currrentReport[lable])
                        }else{
                            userData.push(0);
                        }
                    });
                    var color = getRandomColor();
                    var userTemplate = {
                        label: currentUser,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: color,
                        borderColor: color,
                        borderCapStyle: "butt",
                        boderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: userData
                    };

                    users.push(userTemplate);
                    userData = [];

                }

                var data = {
                    labels: labels,
                    datasets: users
                }


                const CHART = document.getElementById("canvas");
                var lineChart = new Chart(CHART,{
                    type: 'line',
                    data: data
                })

            },
            error: function (e) {
                console.log("ERROR: ", e);
                //display(e);
            },
            done: function (e) {
                console.log("DONE");
            }
        });

    }
});

$('#generateChart').click(function() {

    var contextUrl = $('#contextUrl').val();
    var projectId = $('#projectId').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    console.log(contextUrl + ' ' + projectId + ' '  + ' ' + startDate + ' ' + endDate);
    if($('#canvas').val() != null){
        console.log( "ready!" );
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: contextUrl + "getReports",
            dataType: 'json',
            data: {"projectId": projectId, "startDate": startDate, "endDate": endDate},
            success: function (data) {
                var labels = data.labels;

                var reports = data.reports;


                var userData = [];
                var users = [];

                var reportsKeys = Object.keys(reports);

                for(var i = 0; i < reportsKeys.length; i++){
                    var currentUser = reportsKeys[i];
                    var currrentReport = reports[currentUser];

                    labels.forEach(function (lable) {
                        if(currrentReport[lable]){
                            userData.push(currrentReport[lable])
                        }else{
                            userData.push(0);
                        }
                    });
                    var color = getRandomColor();
                    var userTemplate = {
                        label: currentUser,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: color,
                        borderColor: color,
                        borderCapStyle: "butt",
                        boderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: userData
                    };

                    users.push(userTemplate);
                    userData = [];

                }

                var data = {
                    labels: labels,
                    datasets: users
                }


                const CHART = document.getElementById("canvas");
                var lineChart = new Chart(CHART,{
                    type: 'line',
                    data: data
                })

            },
            error: function (e) {
                console.log("ERROR: ", e);
                //display(e);
            },
            done: function (e) {
                console.log("DONE");
            }
        });

    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(function() {
    $("#datepicker").datepicker();
    $(".startDate").datepicker();
    $(".endDate").datepicker();
    $("#entryDate").datepicker();
} );

$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $(':file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

        console.log(numFiles);
        console.log(label);
    });
});

$('pesho').click(function() {
    var id = $(this).attr('id');
    return id;
});

function invoiceStatusChange(id) {
    console.log(id);
    var payedId = $('#' + id).parent().siblings().children('.payed').attr('id');

    var el = $('#' + id);
    var url = $('#' + id).data('url');
    console.log(url);


    $.ajax({
        url:url,
        success: function (data, status) {
            if(data === 'true'){
                console.log(true);
                $('#' + payedId).text('Да');
                el.parent().parent().removeClass('warning').addClass('info');
                el.removeClass('btn-warning');
                el.addClass( 'btn-success');
            }else{
                $('#' + payedId).text('Не');
                el.parent().parent().removeClass('info').addClass('warning');
                console.log(false);
                el.removeClass('btn-success');
                el.addClass( 'btn-warning');
            }

        },
        error: function (error) {
            console.log(error);

        }
    });


}

$('.nav-item').click(function(){
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
});