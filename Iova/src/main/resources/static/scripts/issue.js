$(document).ready(function () {
    var contextUrl = $('#contextUrl').val();
    var issueId = $('#commentBtn').attr('data-id');
    loadComments(issueId);

    $('#commentBtn').click(function (event) {
        var issueId = $(this).attr('data-id');
        var commentText = $('#commentText').val();
        $.ajax({
            url: contextUrl + "admin/issue/" + issueId + "/comment/create",
            type: "POST",
            contentType: "application/Json",
            data: commentText,
            success: function (data) {
                $('#commentsContainer').empty();
                console.log(issueId);
                loadComments(issueId);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

});

function loadComments(issueId) {
    var contextUrl = $('#contextUrl').val();
    $.ajax({
        url: contextUrl + "admin/issue/" + issueId + "/comment/list",
        type: "GET",
        contentType: "application/Json",
        success: function (data) {
            console.log(data);
            data.forEach(function (comment) {
                buildCommentHTML(comment);
            })
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function buildCommentHTML(comment) {
    var $div = $('div[id^="comment"]:last');
    console.log($div);
    var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
    console.log(num);
    var $klon = $div.clone().prop('id', 'comment'+num );
    var $author = $klon.find('.author');
    $author.text(comment.author.fullName);
    var date = timeConverter(comment.entryDate);
    var $entryDate = $klon.find('.entryDate').text(date);
    var $content = $klon.find('.content').text(comment.content);
    var $commentsContainer = $('#commentsContainer');
    $klon.prop('style', 'display:block');
    $commentsContainer.append($klon);
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var b = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = b.toLocaleDateString();
    var timeStr = b.toLocaleTimeString();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = b.getHours();
    var min = b.getMinutes();
    var sec = b.getSeconds();
    var time = year + ' ' + timeStr;
    return time;
}

