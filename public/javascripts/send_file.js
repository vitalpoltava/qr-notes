/*
 * Send file to server 
 */
 
// get send button
var sendButton = document.getElementById('file_submit_button');

// progress feedback
var uploadProgress = document.getElementById('upload_feedback');

// attach event listener
sendButton.addEventListener('click', function () {
    
    // get tag
    var fileInput = document.getElementsByName('file_upload')[0];
    var file      = fileInput.files[0]; 
    
    this.setAttribute('disabled', 'disabled');
    uploadProgress.innerHTML = '&nbsp;Upload started...';
    
    // Start sending file
    var xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = function(e){
        if (e.lengthComputable){
            var percent = Math.round(e.loaded/e.total*100);
            uploadProgress.innerHTML = '&nbsp;Upload: ' + percent + '%';
        }
    };
    
    xhr.onreadystatechange = function(){            
        if (xhr.readyState == 4){
            uploadProgress.innerHTML = '&nbsp;Upload Finished! ';        
            
            setTimeout(function() {
                window.location.href = window.location.href;
            }, 3000);
        }
    };
    
    xhr.open("POST", "/upload/", true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.name));
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send(file);

});