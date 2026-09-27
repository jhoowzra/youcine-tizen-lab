(function(){
  'use strict';

  var views = {
    home: ['Continuar assistindo','Em destaque','Novidades','Minha lista','Ação','Comédia','Drama','Documentários'],
    filmes: ['Filme 01','Filme 02','Filme 03','Filme 04','Filme 05','Filme 06','Filme 07','Filme 08'],
    series: ['Série 01','Série 02','Série 03','Série 04','Série 05','Série 06','Série 07','Série 08'],
    pesquisa: ['Busca por título','Busca por gênero','Histórico','Sugestões'],
    perfil: ['Entrar por QR','Conta','Dispositivos','Configurações']
  };

  var title = document.getElementById('title');
  var subtitle = document.getElementById('subtitle');
  var grid = document.getElementById('grid');
  var ua = document.getElementById('ua');
  var vp = document.getElementById('vp');
  var lastKey = document.getElementById('lastKey');
  var remoteStatus = document.getElementById('remoteStatus');

  ua.textContent = navigator.userAgent;
  vp.textContent = window.innerWidth + ' x ' + window.innerHeight;

  function render(view){
    title.textContent = view.charAt(0).toUpperCase() + view.slice(1);
    subtitle.textContent = view === 'perfil'
      ? 'Estrutura preparada para login legítimo/QR em fase posterior.'
      : 'Conteúdo demonstrativo local — nenhuma API do serviço foi conectada.';
    grid.innerHTML = '';
    (views[view] || []).forEach(function(name, i){
      var b = document.createElement('button');
      b.className = 'card focusable';
      b.setAttribute('data-card', String(i));
      b.innerHTML = name + '<small>placeholder local</small>';
      grid.appendChild(b);
    });
    focusFirstMenuOrCard();
  }

  function allFocusable(){
    return Array.prototype.slice.call(document.querySelectorAll('.focusable'));
  }

  function current(){
    return document.querySelector('.focused');
  }

  function setFocus(el){
    allFocusable().forEach(function(x){ x.classList.remove('focused'); });
    if(el){ el.classList.add('focused'); try{el.focus();}catch(e){} }
  }

  function focusFirstMenuOrCard(){
    var active = document.querySelector('#menu .active');
    setFocus(active || allFocusable()[0]);
  }

  function menuButtons(){
    return Array.prototype.slice.call(document.querySelectorAll('#menu button'));
  }

  function cards(){
    return Array.prototype.slice.call(document.querySelectorAll('.card'));
  }

  function move(key){
    var cur = current();
    if(!cur){ focusFirstMenuOrCard(); return; }

    var menus = menuButtons(), cs = cards();
    var mi = menus.indexOf(cur), ci = cs.indexOf(cur);

    if(mi >= 0){
      if(key === 38 && mi > 0) setFocus(menus[mi-1]);
      else if(key === 40 && mi < menus.length-1) setFocus(menus[mi+1]);
      else if(key === 39 && cs.length) setFocus(cs[0]);
      return;
    }

    if(ci >= 0){
      var cols = 4;
      if(key === 37){
        if(ci % cols === 0) setFocus(document.querySelector('#menu .active'));
        else setFocus(cs[ci-1]);
      } else if(key === 39 && ci+1 < cs.length && (ci+1)%cols !== 0){
        setFocus(cs[ci+1]);
      } else if(key === 38 && ci-cols >= 0){
        setFocus(cs[ci-cols]);
      } else if(key === 40 && ci+cols < cs.length){
        setFocus(cs[ci+cols]);
      }
    }
  }

  document.addEventListener('keydown', function(e){
    lastKey.textContent = e.keyCode + (e.key ? ' / '+e.key : '');
    remoteStatus.textContent = 'PASS';
    if([37,38,39,40].indexOf(e.keyCode) >= 0){
      e.preventDefault();
      move(e.keyCode);
      return;
    }
    if(e.keyCode === 13){
      var cur = current();
      if(cur && cur.parentNode && cur.parentNode.id === 'menu'){
        menuButtons().forEach(function(x){x.classList.remove('active');});
        cur.classList.add('active');
        render(cur.getAttribute('data-view'));
      }
      return;
    }
    if(e.keyCode === 10009){
      try {
        if(window.history.length > 1) window.history.back();
      } catch(err){}
    }
  });

  render('home');
})();
