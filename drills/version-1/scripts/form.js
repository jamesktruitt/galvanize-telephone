const URL = window.location.href;

function getName( nameURL ) {
    return nameURL.split( "=" )[ 1 ];
}

const nameForm = document.getElementById( "name" );
nameForm.value = getName( URL );

const submission = document.querySelector( "form" );

submission.addEventListener( "submit", ( event ) => {
    event.preventDefault();
    const entry = new FormData( event.target );
    const entryObj = {
        data: {
            character: entry.get( "user_name" ),
            message: entry.get( "user_message" ),
        },
    };
    postData( entryObj );
} );

function postData( submissionObj ) {
    const apiUrl = "https://quiet-bayou-99554.herokuapp.com/api/v1/contacts";
    fetch( apiUrl, {
        method: "POST",
        body: JSON.stringify( submissionObj ),
        headers: new Headers( {
            "Content-Type": "application/json",
        } ),
    } ).then( response => response.json() )
        .then( responseToStatus );
}

function responseToStatus( response ) {
    response.error ? displayStatus( response.error.message ) : displayStatus( response.data.message );
}

function displayStatus( status ) {
    document.querySelector( "#status" ).textContent = status;
}
