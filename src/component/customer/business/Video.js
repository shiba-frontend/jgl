window.onload = function() {
    const parts = [];
    let MediaRecorder;

    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream =>{
        document.getElementById('video').src = stream;
        document.getElementById('startrecord').onclick = function(){
            MediaRecorder = new MediaRecorder(stream);
            MediaRecorder.start(1000);
            MediaRecorder.ondataavailable = function (e){
                parts.push(e.data)
            }

        }
    })
}