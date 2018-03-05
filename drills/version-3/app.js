const rolesURL = fetch( "https://secure-eyrie-78012.herokuapp.com/roles" );
const URL = "https://secure-eyrie-78012.herokuapp.com";
const roleList = document.getElementById( "drop_down" );
const figure = document.querySelector( "img" );

rolesURL
    .then( data => data.json() )
    .then( data => {
        for ( const role of data ) {
            const options = document.createElement( "option" );
            options.innerText = `${ role.label }`;
            roles.appendChild( options );
        }
        roles.addEventListener( "change", event => {
            const change = event.target.selectedIndex;
            data.filter( pic => {
                if ( pic.id === change ) {
                    figure.src = `${ URL }/images/${ pic.imageURL }`;
                } else if ( change === 0 ) {
                    figure.src = "assets/placeholder.jpg";
                }
            } );
        } );
    } )
    .catch( err => {
        console.error( err );
    } );

const form = document.querySelector( "form" );
form.addEventListener( "submit", sendMsg );

function sendMsg( event ) {
    event.preventDefault();
    const userURL = "https://secure-eyrie-78012.herokuapp.com/users";
    const data = new FormData( event.target );

    function roles() {
        if ( data.get( "roles" ) === "Assassin" ) {
            console.log( 1 );
            return 1;
        } else if ( data.get( "roles" ) === "Commando" ) {
            return 2;
        } else {
            return 3;
        }
    }

    const formMsg = {
        firstName: data.get( "first_name" ),
        lastName: data.get( "last_name" ),
        role: roles(),
    };

    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( formMsg ),
    };

    fetch( userURL, postOptions )
        .then( res => res.json() )
        .then( res => {
            console.log( res.message );
            const p = document.querySelector( "p" );
            p.textContent = res.message;
            setTimeout( () => {
                p.textContent = "";
            }, 4000 );
        } )
        .catch( err => {
            console.error( err );
        } );
}
// const firstName = document.querySelector( "#firstName" );
// const lastName = document.querySelector( "#lastName" );
// const rolesList = document.querySelector( "#roles" );
// const roleImage = document.querySelector( "#roleImage" );
// const submitStatus = document.querySelector( "#submitStatus" );

// function getForm() {
//     fetch( "https://secure-eyerie-78012.herokuapp.com/roles" )
//         .then( res => {
//             return res.json();
//         } )
//         .then ( data => {
//             console.log( data );
//             populateForm( data );
//             return data;
//         } )
// }

// function getForm();
// function populateForm( data ) {
//     var dropDown = document.getElementById( "roles" );
//     for (var i = 0; i < data.length; i++) {
//         dropDown.appendChild( document.createElement( "option" ));
//         dropDown.getElementsByTagName( "option" )[ i + 1 ].setAttribute( "value", `${ data[ i ].id }` );
//         var text = document.createTextNode( `${ data[ i ].label }` );
//         dropDown.getElementsByTagName( "option" )[ i + 1 ].appendChild( text );
//     }
//     generateImage();
// }

// document.getElementById( "roles" ).addEventListener( "change", () => {
//     generateImage();
// } )

// function generateImage() {
//     fetch( "https://secure-eyrie-78012.herokuapp.com/roles" )
//         .then ( res => {
//             return res.json();
//         } )
//         .then( data => {
//             if( document.getElementById( "roles" ).value !== "" ) {
//                 let image = document.getElementsByClassName( "image" )[0];
//                 for( var i = 0; i < data.length; i++ ) {
//                     let role = document.getElementById( "roles" ).value;
//                     if ( role == i + 1 ) {
//                         image.src = data[ i ].imageURL;
//                     }
//                 }
//             }
//         } )
//         return data;
//     }
// }
// document.querySelector( "form" ).addEventListener( "submit", (event) => {
//     event.preventDefault();
//     let formObj = new FormData( event.target );
//     let sendableObj = {
//         firstName: formObj.get( "firstName" ),
//         lastName: formObj.get( "lastName" ),
//         role: formObj.get( "roles" )
//     };
//     sendForm( sendableObj )
// } );

// function sendForm( data ) {
//     fetch( "https://secure-eyrie-78012.herokuapp.com/users", {
//         method: "POST",
//         body: JSON.stringify( data ),
//         headers: new Headers( { "Content-Type": "application/json" } )
//     } )
//     .then( res => res.json() )
//     .then( res => {
//         let p = document.querySelector( "p" );
//         p.innerText = res.message;
//         setTimeout( () => {
//             p.innerText = "";
//         }, 4000 );
//     } )
// } ;
