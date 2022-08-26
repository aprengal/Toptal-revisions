( function() {

    function el( e, s ) {
        return e.querySelector( s );
    }

    function grup( e, s ) {
        return e.querySelectorAll( s );
    }

    //0 Variables comúns
    var doc = document;

    // 1. Engade a clase "toque-act" para os navegadores que non soportan support media queries
    // Adaptado para que só afecte a Internet Explorer 11. Fonte: https://codepen.io/Ferie/pen/vQOMmO
    var matchMedia = function() {
        // Include the 'heartz' as a way to have a non-matching MQ to help terminate the join. See <https://git.io/vznFH>.
        var prefixes = [ '-ms-' ];
        var query = [ '(', prefixes.join( 'touch-enabled),(' ), 'heartz', ')' ].join( '' );
        return window.matchMedia && window.matchMedia( query ).matches;
    };

    if ( ( 'ontouchstart' in window ) || ( window.DocumentTouch && document instanceof window.DocumentTouch ) || matchMedia() ) {
        doc.body.classList.add( 'toque-act' );
    }

    //2. Comprobación para ver se hai menú
    if ( el( doc, '.tel-b' ) ) {
        var doc = document,
            tel_b = el( doc, '.tel-b' ),
            tel_b_list = tel_b.classList,
            m_t = el( doc, '.m-t' ),
            m_t_list = m_t.classList,
            men = el( doc, '.menu-p' ),
            men_a = grup( men, 'a' ),
            men_a_l = men_a.length,
            men_b = grup( men, 'button' ),
            men_b_l = men_b.length,
            buscador = el( doc, '#buscador' ),
            b_buscar = el( doc, '.b-buscar' );

            //Existe un elemento coa clase pan?
            if ( el( doc, '.pan' ) ) {
                var pan = grup( el( doc, '.pan' ), 'a' ),
                pan_l = pan.length;
            }

            //Comprobación de se existe o elemento "actual" nas faragullas
            if ( el( doc, '.pan li.br' ) ) {
                var pan_el_actual = el( doc, '.pan li.br' );
            }


        //Activacion/desactivación de focus menú faragullas de pan 
        function focus_faragullas( modo ) {

            for ( i = 0; i < pan_l; i++ ) {

                if ( modo ) {

                    pan[i].setAttribute( 'tabindex', -1 );

                    if ( pan_el_actual ) {
                        pan_el_actual.setAttribute( 'tabindex', -1 );
                    }

                } else {

                    pan[i].removeAttribute( 'tabindex');

                    if ( pan_el_actual ) {
                        pan_el_actual.setAttribute( 'tabindex', 0 );
                    }

                }
            }
        }

        //2.1 Apertura e peche do menú con escape
        function menu_tel() {
            if ( window.innerWidth < 1024 ) {

                if ( !m_t_list.contains( 'si' ) && !m_t_list.contains( 'act' ) ) {

                    m_t_list.add( 'si' );
                    buscador.disabled = true;
                    b_buscar.disabled = true;
                    if ( pan ) { focus_faragullas( true ) };

                    //Tempo engadido para evitar que o menú apareza de golpe
                    setTimeout( function() {
                        m_t_list.add( 'act');
                        tel_b_list.add( 'activo' );
                        aria_exp( tel_b, true );
                    }, 50);

                } else if ( m_t_list.contains( 'si' ) && m_t_list.contains( 'act' ) ) {

                    m_t_list.remove( 'act' );
                    tel_b_list.remove( 'activo' );
                    aria_exp( tel_b, false );

                    //Este tempo coincide cos ms que tarda en aparecer o menú para evitar que desaparezca de golpe
                    setTimeout( function() {
                        m_t_list.remove( 'si' );
                        buscador.disabled = false;
                        b_buscar.disabled = false;
                        if ( pan ) { focus_faragullas( false ) };
                    }, 375);
                }
            }
        }
        
        tel_b.addEventListener( 'click', function() {
            menu_tel();
        })

        doc.addEventListener( 'keydown', function( p ) {
            if ( p.key === 'Escape' && window.innerWidth < 1024 ) {
                p.preventDefault();
                menu_tel();

                //50ms de espera para que se engada a clase act
                setTimeout( function() {
                    if ( m_t_list.contains( 'act' ) ) {
                        men_a[0].focus();
                    } else {
                        tel_b.focus();
                    }
                }, 50);
            }
        });

        //2.2 Activar botóns de submenús
        function submenus( e, z ) {

            if ( e.classList.contains( 'act' ) ) {
                e.classList.remove( 'act' );
                e.nextSibling.classList.remove( 'act' );
                aria_exp( e, false );
            } else {
                e.classList.add( 'act' );
                e.nextSibling.classList.add( 'act' );
                aria_exp( e, true );
            }
        }

        for ( i = 0; i < men_b_l; i++ ){
            men_b[i].addEventListener( 'click', function() {
                submenus( this );
            })
        }

        //el = elemento, val = valor
        function aria_exp( el, val ) {
            el.setAttribute( 'aria-expanded', val );
        }

        //2.3 Abrir submenús automaticamente. Só se executa se está presente a clase "m-actual"
        if ( el( men, '.m-actual' ) ) {
        
            sub = el( men, '.m-actual' );

            //Isto selecciona o botón do submenú
            b = sub.children[1];

            if ( b.classList.contains( 'fam-b' ) ) {
                submenus( b );
            }
        }


        //2.4 Clase enf
        var menu = grup( doc, '.m-p' ),
            links = grup( men, 'a' ),
            len = links.length;

        // Cada vez que un elemento se enfoca ou desenfoca, cambia a clase de "enf"
        for ( i = 0; i < len; i++ ) {
            links[i].addEventListener( 'focus', enfoque, true );
            links[i].addEventListener( 'blur', enfoque, true );
        }

        //Sets or removes the .focus class on an element.
        function enfoque() {
            var t = this;

            // Move up through the ancestors of the current link until we hit .primary-menu.
            while ( -1 === t.className.indexOf( 'menu-p' ) ) {
                // On li elements toggle the class .enf.
                if ( 'li' === t.tagName.toLowerCase() ) {
                    if ( t.classList.contains( 'enf' ) ) {
                        t.classList.remove( 'enf' );
                    } else {
                        t.classList.add( 'enf' );
                    }
                }

                // On a elements toggle the class .sel.
                if ( 'a' === t.tagName.toLowerCase() ) {
                    if ( t.classList.contains( 'sel' ) ) {
                        t.classList.remove( 'sel' );
                    } else {
                        t.classList.add( 'sel' );
                    }
                }

                t = t.parentElement;
            }
        }

        //2.5 Reactivar buscador e quitar menú se se cambia o tamaño da pantalla a máis de 1024 px
        window.addEventListener( 'resize', function() {
            if ( window.innerWidth >= 1024 && m_t_list.contains( 'si' ) ) {

                //Desactivase o menú
                m_t_list.remove( 'act', 'si' );

                //Botóns do buscador
                buscador.disabled = false;
                b_buscar.disabled = false;
                if ( pan ) { focus_faragullas( false ) };
            }
        })

    }

    //3. Rastros
    var rastros = el( doc, '.rastros' ),
        si_r = el( doc, '#si_r' ),
        non_r = el( doc, '#non_r' );

        try {
            var est_r = localStorage.getItem( "estado_rastros" )
        } catch {
            var est_r = undefined;
            console.warn( "O almacemanto local está desactivado." );
        }
        

    //Comprobación da existencia dos rastros
    if ( est_r === null ) {
        rastros.classList.remove( 'non' );
        setTimeout( function() {
            rastros.classList.remove( 'inv' );
        }, 20 );
    }

    //Rastros aceptados
    si_r.addEventListener( 'click', function() {
        fora_rastros( 1, 'permitido' );
    })

    //Rastros denegados
    non_r.addEventListener( 'click', function() {
        fora_rastros( 0, 'denegado' );
    })

    function fora_rastros( estado, valor ){
        si_r.disabled = true;
        non_r.disabled = true;
        
        if ( est_r === null ) {
            try {
                localStorage.setItem( 'estado_rastros', valor );
                if ( estado ) {
                    si_rastros();
                }
            } catch {
                console.warn( "O almacemanto local está desactivado." );
            }
        }

        rastros.classList.add( 'inv' );
            setTimeout( function() {
                rastros.classList.add( 'non' );
            }, 1000 );
    }

    if ( est_r === "permitido" ) {
        si_rastros();
    }

    function si_rastros() {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=grup( s, o )[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','/materiais/js/arriba-ga.js','ga');
            ga('create', 'UA-160367796-1', {cookieFlags: 'max-age=31536000;secure;samesite=none'});
            ga('set', 'anonymizeIp', true);
            ga('send', 'pageview');
    }


    //4. Arranxo do problema de focus ó pulsar en "saltar ao contido" en IE. Fonte: https://git.io/vWdr2
    var isIe = /(trident|msie)/i.test( navigator.userAgent );

    if ( isIe && doc.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var id = location.hash.substring( 1 ),
                element;

            if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
                return;
            }

            element = el( doc, id );

            if ( element ) {
                if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false );
    }

    //5. Service worker
    //est_r vale undefined se o almacenamento local non é accesible e é probable que tampouco se poida empregar o service worker
    if ( est_r !== undefined ) {
        if ( 'serviceWorker' in navigator ) {
        window.addEventListener( 'load', function() {
            navigator.serviceWorker.register( '/traballo.js' )
        });
        }
    }

})();
