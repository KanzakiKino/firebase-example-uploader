var reloadRecentFiles = function ()
{
    var list = document.getElementById( "recent-files" );

    var updateList = function ( files )
    {
        list.innerText = "";
        for ( var i = 0; i < files.length; i++ ) {
            var file = files[i];

            var item  = document.createElement( "a" );
            item.href = "/download?id="+file.id;
            item.innerHTML = "<li>"+file.filename+"</li>";
            list.insertBefore( item, list.firstChild );
        }
    };

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if ( xmlhttp.readyState == 4 ) {
            if ( xmlhttp.status == 200 ) {
                var obj = JSON.parse( xmlhttp.responseText );
                updateList( obj.list );
            }
        }
    };
    xmlhttp.open( "GET", "/files", true );
    xmlhttp.send();
};
