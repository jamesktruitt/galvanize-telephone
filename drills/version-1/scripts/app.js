/* global fetch document */
function createNode( element ) {
    return document.createElement( element );
}

function append( parent, el ) {
    return parent.appendChild( el );
}

const ul = document.getElementById( "characters" ); // Get the list where we will place our characters
const url = "https://quiet-bayou-99554.herokuapp.com/api/v1/contacts";

fetch( url )
    .then( res => res.json() )
    .then( ( obj ) => {
        const characters = obj.data;
        return characters.forEach( ( character ) => {
            const li = createNode( "li" );
            const img = createNode( "img" );
            const span = createNode( "span" );
            const p = createNode( "p" );
            const a = createNode( "a" );
            img.src = character.imageURL;
            span.innerHTML = `${ character.name } ${ character.phone }`;
            p.innerHTML = `${ character.message }`;
            a.innerHTML = `Leave ${ character.name } a Message`;
            a.href = `contact.html?character=${ character.name }`;
            append( li, img );
            append( li, span );
            append( li, p );
            append( li, a );
            append( ul, li );
        } );
    } );
