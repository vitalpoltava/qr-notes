/*
 * Detecting file properties by means of native browser tools
 */
 
// get tag
var fileInput = document.getElementsByName('file_upload')[0];

// get feedback tag
var feedbackDiv = document.getElementById('file_props');

// attach event listener to input field
fileInput.addEventListener('change',function () {
    
    var fileSelected, maxBytesPerFile, infoFeedback;
    
    // Max file size
    maxBytesPerFile = 4194304;
    
    // Private method -- bytes to pretty string
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + ' ' + sizes[i]; 
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };
    
    // Private method -- return file type
    function getFileMimeType(){
        var type = fileSelected.type || '/';
        var fName = fileSelected.name;
        return type.split('/')[1] || fName.split('.')[fName.split('.').length - 1];
    }
    
    // private method -- check max size
    function isMaxFileSizeExceeded(bytes, max){
        return parseInt(bytes) > parseInt(max);
    }
    
    // Check Files
    if(typeof this.files === 'undefined'){
        feedbackDiv.innerHTML = 'Browser do not support file recognition API';
    } else {
        fileSelected = fileInput.files[0];        
        infoFeedback = 'Size: <b>' + bytesToSize( fileSelected.size, 10 ) + '</b>&nbsp;&nbsp;' +
        'Type: <b>' + (getFileMimeType()).toUpperCase() + '</b>';
        
        // Check max size
        if(isMaxFileSizeExceeded(fileSelected.size, maxBytesPerFile)){
            infoFeedback += '<br><span style="color:red;">Max Size Exceeded: > ' + bytesToSize(maxBytesPerFile) + '</span>';
        }
        
        feedbackDiv.innerHTML = infoFeedback;
        
        // Show submit button
        document.getElementById('file_submit').style.display = 'block';;
        if(!isMaxFileSizeExceeded(fileSelected.size, maxBytesPerFile)){
            document.getElementById('file_submit_button').removeAttribute('disabled');
        } else {
            document.getElementById('file_submit_button').setAttribute('disabled', 'disbled');
        }
    }
    
},false);


