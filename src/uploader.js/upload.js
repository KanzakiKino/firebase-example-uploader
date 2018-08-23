var upload = function ()
{
    var statusText = document.getElementById( "upload-status" );
    statusText.innerText = "UPLOADING...";
    statusText.style.display = "block";

    var form = document.getElementById( "upload-form" );
    var data = new FormData( form );
    form.style.display = "none";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if ( xmlhttp.readyState == 4 ) {
            if ( xmlhttp.status == 200 ) {
                statusText.innerText = "UPLOADED";
                setTimeout( function () {
                    statusText.style.display = "none";
                }, 3000 );

            } else {
                var obj = new Object(xmlhttp.responseText);
                statusText.innerText = obj.error;
            }
            form.reset();
            form.style.display = "block";
        }
    };
    xmlhttp.open( form.method, form.action, true );
    xmlhttp.send( data );
};
