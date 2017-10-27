angular.module('myVideoUploader.component',
  ['myWistiaPlayer.component'
  ]
)

.component('myVideoUploader', {
  templateUrl: 'app/views/my-video-uploader.html',
  controller: MyVideoUploaderController

  });

function MyVideoUploaderController() {}

MyVideoUploaderController.prototype = {

  showIframe: function(data) {
    $(".failure-message").hide();
    var iframeUrl = "https://fast.wistia.net/embed/iframe/" + data.result.hashed_id + "?videoFoam=true"
    $('#player').attr('src', iframeUrl);
    $('.fileinput-button').css("pointer-events", "auto");
    $(".spinner").hide();
    $(".success-message").html(
        data.result.name + " has been uploaded to Wistia successfully.");
    $(".success-message").show();

    var iframeSrcId = data.result.hashed_id;

    $("#wistia-video-preview").show();
    $("#wistia-video-preview iframe").attr("src",
      "//fast.wistia.net/embed/iframe/" + iframeSrcId +"?videoFoam=true");
    $('.progress-bar').css('width', '0%');
    $('.progress-bar').text('');
    $('#file-name-div').text('Finished uploading ' + data.files[0].name);

    return iframeUrl; //for unit tests
  },

  showProgressBar: function(data, fileName) {
    $(".spinner").hide();
    $('.fileinput-button').css("pointer-events", "none");
    $("#wistia-video-preview").hide();
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('.progress-bar').css('width', progress + '%');
    $('.progress-bar').text(progress + '%');
    $('#file-name-div').text('Uploading ' + fileName + '...');
    if(progress == 100) {
      $(".spinner").show();
    }
    return progress;
  },

  validateFileExtension: function(name) {
    var patt = new RegExp("^.*\\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)$");
    if(patt.test(name)) {
      return true;
    }
    return false;
  },

  $onInit: function() {

    var that = this;

    this.fileName = "";

    $(".success-message").hide();
    $(".failure-message").hide();
    $("#wistia-video-preview").hide();
    $(".spinner").hide();

    $('#fileupload').fileupload({
      dataType: 'json',

      send: function (e, data) {
        $('.fileinput-button').css("pointer-events", "none");
        $("#wistia-video-preview").hide();
        $(".failure-message").hide();
        that.fileName = data.files[0].name;
      },

      add: function (e, data) {
        $(".failure-message").hide();
        $(".progress-message").hide();
        $(".spinner").show();
        if(that.validateFileExtension(data.files[0].name)) {
          if(data.originalFiles.length === 1) {
            data.submit();
          } else {
            // show error
            $(".failure-message").html(
              'Please select one file at a time.');
            $(".failure-message").show();
            return false;
          }
        } else {
          // show error
          $(".failure-message").html(
            'Please select a file with one of these extensions: ' +
              'avi, wmv, flv, mpg, mp4');
          $(".failure-message").show();
          return false;
        }
      },

      done: function (e, data) {
        that.showIframe(data);
      },

      fail: function(e, data) {
        $("#wistia-video-preview").hide();
        $(".failure-message").html(
          ' Your video has not been uploaded due to an error. Please check your account\'s limit (Max allowed 3.)');
        $(".failure-message").show();
        $(".spinner").hide();
        $('.fileinput-button').css("pointer-events", "auto");
        $('.progress-bar').css('width', '0%');
        $('.progress-bar').text('');
        $('#file-name-div').text('Failed while uploading ' +  data.files[0].name);
      },

      progressall: function (e, data) {
        that.showProgressBar(data, that.fileName);
      }
    });
  }
}