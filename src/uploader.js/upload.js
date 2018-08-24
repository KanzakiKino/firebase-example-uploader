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
                var obj = JSON.parse( xmlhttp.responseText );
                statusText.innerText = obj.error;
            }

            setTimeout( function () {
                reloadRecentFiles();
            }, 1000 );
            form.reset();
            form.style.display = "block";
        }
    };
    xmlhttp.open( form.method, form.action, true );
    xmlhttp.send( data );
};
