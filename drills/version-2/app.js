const baseUrl = "https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/GBP"

function getTopScores() {
    return fetch( baseUrl )
        .then( res => res.json() )
        .then( ( data ) => {
            data = data.sort( ( a, b ) => {
                return a.score < b.score;
            } )
            return data.slice( 0, 3 );
        } )
}
function renderTopScores() {
    getTopScores().then( ( data ) => {
        appendScoreElements( data )
    } )
}
renderTopScores();

function appendScoreElements( array ) {
    for ( i = 0; i < 3; i++ ) { 
        let p = document.createElement( "p" );
        p.setAttribute( "class", "score-card" );
        let span = document.createElement( "span" );
        span.setAttribute( "class", "player-name" );
        let text = document.createTextNode( array[ i ].player_name )
        span.appendChild( text );
        p.appendChild( span );
        span = document.createElement( "span" );
        span.setAttribute( "class", "score" );
        text = document.createTextNode( array[ i ].score );
        span.appendChild( text );
        p.appendChild( span );
        document.querySelector( ".scores" ).appendChild( p );
    }
}

function removeElements() {
    for ( i = 0; i < 3; i++ ) {
        document.querySelector( ".scores p" ).remove();
    }
}

function postScore( object ) {
    fetch( {
        method: "POST",
        body: JSON.stringify( object ),
        headers: new Headers( {
            "Content-Type": "application/json"
        } )
    } ).then( function ( res ) {
        return res.json();
    } ).catch( console.error );
}

function scoreToObject() {
    const scoreObject = {
        "game_name": "GBP",
        "player_name": document.querySelector( "input" ).value,
        "score": score
    }
    return scoreObject;
}

document.querySelector( "canvas" ).addEventListener( "gameOver", function ( event ) {
    window.alert( "Congratulations! Your final score is " + score );
    postScore( scoreToObject() );
    removeElements();
    fetchScores();
    
} )