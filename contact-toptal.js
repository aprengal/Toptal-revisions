'use strict';

//Este arquivo só se executa se o id "contacto" está presente. Non se aplica cando se envía o formulario

if ( document.getElementById( 'contacto' ) ) {
  const p = document.getElementById( 'contacto' ),
    n = document.getElementById( 'nome' ),
    c = document.getElementById( 'correo' ),
    cval = /^.+@.+\..+$/,
    a = document.getElementById( 'asunto' ),
    m = document.getElementById( 'mensaxe' ),
    cx = document.getElementById( 'c-ver' ),
    l = document.getElementById( 'leituga' ),
    s = document.getElementById( 'enviar' ),
    c1 = document.getElementById( 'contador-a' ),
    c2 = document.getElementById( 'contador-m' );

  function s_val( l ) {
   l.classList.remove( 'invalido' );
    l.invalid = false;
  }

  function n_val( l ) {
    l.classList.add( 'invalido' );
    l.invalid = true;
  }

  function validar( l, o, r, t, u ) {

    //l = Elemento ( correo, mensaxe...  );
    if ( l.value.length === 0 ) {
        if ( l === n ) {
          var erro = 'Como desexas que te chame?';
        } else if ( l === c ) {
          var erro = 'Falta escribir o correo electrónico.';
        } else if ( l === a ){
          var erro = 'Falta poñer o asunto do correo.';
        } else if ( l === m ) {
          var erro = 'O campo para escribir a mensaxe está baleiro.';
        } else {
          var erro = 'Este campo está baleiro';
        }
      l.setCustomValidity( erro );
      s_val( l );
    } else if ( l.value.length > 0 && l.value.trim().length === 0 ) {
      l.invalid = true;
      l.setCustomValidity( 'Divirteste pulsando o espazador?' );
      n_val( l );
    } else if ( o && !l.value.match( cval ) ) {
      // o = o input é un correo?
      l.setCustomValidity( 'O correo electrónico non é válido.' );
      l.setAttribute( 'aria-invalid', true );
      n_val( l );
    } else if ( r && l.value.length < t ) {
      // r = o input ten valor mínimo?; t = extension mínima
      l.setCustomValidity( 
        `A lonxitude mínima deste campo é de ${t} caracteres.`
       );
      n_val( l );
    } else if ( l.value.length > u ) {
      // u = lonxitude valor máximo
      l.invalid = true;
      n_val( l );
      l.setCustomValidity( 'Trampas!' );
    } else {
      l.setCustomValidity( '' );
      l.removeAttribute( 'aria-invalid' );
      s_val( l );
    }
  }

  function validar_cx( cambio = false ) {
    if ( cx.checked ) {
      cx.setAttribute( 'aria-checked', true );
      cx.setAttribute( 'value', Math.PI );
      cx.setCustomValidity( '' );
      s_val( cx );
      s.disabled = false;
    } else {
      cx.removeAttribute( 'aria-checked' );
      cx.removeAttribute( 'value' );
      cx.setCustomValidity( 'Por favor, marca esta casiña se desexas enviar o formulario' );
      if ( cambio ) { n_val( cx ); }
      s.disabled = true;
    }
  }

  function contador( l, i, x ) {
    l.innerHTML = i.value.length + ' de ' + x;
  }

  /*Nome*/
  n.addEventListener( 'input', function() {
    validar( n, false, false, false, 40 );
  });

  /*Correo*/
  c.addEventListener( 'input', function() {
    validar( c, true, true, 6, 255 );
  });

  /*Asunto*/
  a.addEventListener( 'input', function() {
    validar( a,false, true, 10, 70 );
    contador( c1, a, 70 );
  });

  /*Mensaxe*/
  m.addEventListener( 'input', function() {
    validar( m, false, true, 30, 1000 );
    contador( c2, m, 1000 );
  });

  /*Leituga*/
  l.addEventListener( 'input', function() {
    if ( l.value.length >= 3 ) {
      p.reset();
      contador( c1, a, 70 );
      contador( c2, m, 1000 );
    }
  });

  /*Casiña de verificación*/
  cx.onclick = function() {
    validar_cx( true );
  };

  /*Botón de enviar*/
  p.addEventListener( 'submit', function( z ) {
    if ( 
      n.value.trim().length > 0 &&
      n.value.trim().length <= 40 &&
      c.value.match( cval ) &&
      c.value.trim().length >= 6 &&
      c.value.trim().length <= 255 &&
      a.value.trim().length >= 10 &&
      a.value.trim().length <= 70 &&
      m.value.trim().length >= 30 &&
      m.value.trim().length <= 1000 &&
      l.value.trim().length === 0 &&
      cx.checked &&
      cx.value > 3.14 &&
      cx.value < 3.17
    ) {
      //enviase o formulario
    } else {
      //O navegador leva directamente ó erro, a non ser que se modifique o HTML
      z.preventDefault();
    }
  });

  validar( n, false, false, false, 40 );
  validar( c, true, true, 6, 255 );
  validar( a, false, true, 10, 70 );
  validar( m, false, true, 30, 1000 );
  validar_cx();

}