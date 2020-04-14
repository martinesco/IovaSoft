$(document).ready(function () {
    var contextUrl = $('#contextUrl').val();
   $('.tenderTable').DataTable( {

   } );

   $('#projectRequirement').click(function (event) {
       var tenderId = $(this).attr('data-id');
       console.log(tenderId);
       $.ajax({
           url: contextUrl + "admin/requirements/getAllByTender/" + tenderId,
           success: function (data) {
               if (data.length < 1){
                   location.href = contextUrl + 'admin/tender/' + tenderId + '/projectRequirement/create';
               }
               console.log(data);
               $('#eForm').empty();
               loadProjectRequirements(data);
           },
           error: function (error) {
               console.log(error);

           }
       });
   });

    $('#projectTeam').click(function (event) {
        var tenderId = $(this).attr('data-id');
        console.log(tenderId);
        $.ajax({
            url: contextUrl + "admin/tender/" + tenderId + "/getAllTeamPositionsByTender",
            success: function (positions) {
                if (positions.length < 1){
                    location.href = contextUrl + 'admin/tender/' + tenderId + '/teamPosition/list';
                }
                $('#eForm').empty();
                positions.forEach(function (position) {
                    loadTeamPositions(position, contextUrl);
                });

            },
            error: function (error) {
                console.log(error);

            }
        });
    })

});

function loadTeamPositions(position, contextUrl) {
    console.log(position.name);
    var $div = $('div[id^="team"]:last');
    var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) + 1;
    var $klon = $div.clone().prop('id', 'position'+num );
    var $heading = $klon.find('.panel-heading');
    var $p = $('<p></p>').text = position.name;
    $heading.append($p);
    if (num === 1){
        console.log(num);
        var optionURL = contextUrl + 'admin/tender/' + position.tenderId + '/teamPosition/list';
        var $options = $('<a href="' + optionURL + '"> - options</a>');
        $heading.append($options);
    }

    var $table = $klon.find('table');
    var $tbody = $table.find('tbody');
    position.requirements.forEach(function (requirement) {
        var $tr = $('<tr></tr>');
        $tr.addClass('warning');
        var $requirement = $('<td></td>');
        var $p = $("<p></p>").text = requirement.requirement;
        $requirement.append($p);
        $requirement.addClass('col-md-10');
        $requirement.addClass('text-center');
        $tr.append($requirement);
        var $action = $('<td></td>');
        $action.addClass('col-md-2');
        $action.addClass('text-center');
        var srcUrl = contextUrl + 'admin/teamPosition/' + position.id + '/requirement/create';
        var $a1 = $('<a href="' + srcUrl + '">options</a>');
        $action.append($a1);
        $tr.append($action);
        $tbody.append($tr);
    });
    $klon.prop('style', 'display:block');
    $table.addClass('tenderTable');
    $('#eForm').append($klon);
}

function loadProjectRequirements(requirements) {
    var $table = $('table[id^="template"]:last');
    var num = parseInt( $table.prop("id").match(/\d+/g), 10 ) +1;
    var $klon = $table.clone().prop('id', 'template'+num );
    $klon.addClass('tenderTable');
    var $body = $klon.find('tbody');
    requirements.forEach(function (requirement) {
        var $tr = $('<tr></tr>');
        $tr.addClass('warning');
        var $requirement = $('<td></td>');
        var $p = $("<p></p>").text = requirement.requirement;
        $requirement.append($p);
        $requirement.addClass('col-md-6');
        $requirement.addClass('text-center');
        $tr.append($requirement);
        var $sub = $('<td></td>');
        $sub.addClass('col-md-3');
        $sub.addClass('text-center');
        var $p2 = $('<p></p>').text = requirement.subRequirement;
        $sub.append($p2);
        $tr.append($sub);
        var $can = $('<td></td>');
        $can.addClass('col-md-3');
        $can.addClass('text-center');
        var $p3 = $('<p></p>').text = requirement.canProvide;
        $can.append($p3);
        $tr.append($can);
        $body.append($tr);
    });
    $klon.prop('style', 'display:block');
    $('#eForm').append($klon);
}
