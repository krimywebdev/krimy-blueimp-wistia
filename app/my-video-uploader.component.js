angular.module('myVideoUploader.component',
  ['myWistiaPlayer.component'
  ]
)

.component('myVideoUploader', {
  templateUrl: 'app/views/my-video-uploader.html',
  controller: MyVideoUploaderController

  });

function MyVideoUploaderController() {
  $(function() {
    $(".success-message").hide();
    $(".failure-message").hide();
    $("#wistia-video-preview").hide();
    $(".spinner").hide();

    $('#fileupload').fileupload({
      dataType: 'json',

      send: function (e, data) {
        $('.fileinput-button').css("pointer-events", "none");
        $("#wistia-video-preview").hide();
      },

      done: function (e, data) {
        $('#player').attr('src', 'https://fast.wistia.net/embed/iframe/' + data.result.hashed_id + '?videoFoam=true');
        $('.fileinput-button').css("pointer-events", "auto");
        $(".spinner").hide();
        $(".success-message").html(
          '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
          data.result.name + " has been uploaded to Wistia successfully.");
        $(".success-message").show();

        var iframeSrcId = data.result.hashed_id;

        $("#wistia-video-preview").show();
        $("#wistia-video-preview iframe").attr("src",
          "//fast.wistia.net/embed/iframe/" + iframeSrcId +"?videoFoam=true");
        $('.progress-bar').css('width', '0%');
      },

      fail: function(e, data) {
        $("#wistia-video-preview").hide();
        $(".failure-message").html(
          '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + " Your video has not been uploaded due to an error. Please check your account's limit.");
        $(".failure-message").show();
        $(".spinner").hide();
        $('.fileinput-button').css("pointer-events", "auto");
        $('.progress-bar').css('width', '0%');
      },

      progress: function (e, data) {
        $('.fileinput-button').css("pointer-events", "none");
        $("#wistia-video-preview").hide();
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('.progress-bar').css('width', progress + '%');
        if(progress == 100) {
          $(".spinner").show();
        }
      }
    });
  });}