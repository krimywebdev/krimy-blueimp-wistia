describe("my-video-uploader component", function() {

  it("should set iframe correctly after uploading the video", function() {

    var $ctrl = getComponentController();

    var fakeData = {result: {
      hashed_id: "abcdef"
    }}

    var iframeUrl = $ctrl.showIframe(fakeData);

    expect(iframeUrl).toEqual('https://fast.wistia.net/embed/iframe/abcdef?videoFoam=true');

  });

  it("should show correct progress while uploading video", function() {

    var $ctrl = getComponentController();

    var fakeData = {
     loaded: 50,
     total: 100
    }
    var progress = $ctrl.showProgressBar(fakeData);

    expect(progress).toEqual(50);

  });

  it("should not allow non-video file extensions", function() {
    var $ctrl = getComponentController();

    var fakeName = "pic.png";

    var isValidFileName = $ctrl.validateFileExtension(fakeName);

    expect(isValidFileName).toBeTruthy();

  });

  it("should not allow all video file extensions", function() {
    var $ctrl = getComponentController();

    var fakeNames = [
      "abc.mp4",
      "abc.avi",
      "abc.wmv",
      "abc.flv",
      "abc.mpg"
    ];

    var allowsValidFileNames = fakeNames.every($ctrl.validateFileExtension);

    expect(allowsValidFileNames).toBeTruthy();

  });

  function getComponentController() {
    var $ctrl;
    module('myVideoUploader.component');
    inject(function($componentController) {
      $ctrl = $componentController('MyVideoUploaderController');
    });
    return $ctrl;
  }


});