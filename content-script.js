

//document.getElementsByName("iot-iframe")[0].contentWindow.document.querySelector(".el-textarea__inner").value = str

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        document.getElementsByName("iot-iframe")[0].contentWindow.document.querySelector(".el-textarea__inner").value = request.greeting;
    });