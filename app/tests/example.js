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

  function getComponentController() {
    var $ctrl;
    module('myVideoUploader.component');
    inject(function($componentController) {
      $ctrl = $componentController('MyVideoUploaderController');
    });
    return $ctrl;
  }


});