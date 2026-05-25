/* ============================================================
   CATALYSTO — SHARED JS
   All pages include this. Handles: nav, hamburger, scroll reveal,
   video modal, video facade.
============================================================ */
(function(){
  /* ---- Hamburger ---- */
  var ham = document.getElementById('hamburger');
  var mob = document.getElementById('mobileMenu');
  if(ham && mob){
    ham.addEventListener('click',function(){
      ham.classList.toggle('open');
      mob.classList.toggle('open');
      document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){ ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow=''; });
    });
  }

  /* ---- Scroll Reveal ---- */
  var revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    },{threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  /* ---- Video Modal ---- */
  var modal = document.getElementById('videoModal');
  var iframe = document.getElementById('modalIframe');
  var openBtn = document.getElementById('watchVideoBtn');
  var closeBtn = document.getElementById('modalClose');
  function openModal(src){
    if(!modal||!iframe) return;
    iframe.src = src;
    modal.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    if(!modal||!iframe) return;
    iframe.src='';
    modal.classList.remove('open');
    document.body.style.overflow='';
  }
  if(openBtn) openBtn.addEventListener('click',function(){ openModal(openBtn.dataset.src||''); });
  if(closeBtn) closeBtn.addEventListener('click',closeModal);
  if(modal){ modal.addEventListener('click',function(e){ if(e.target===modal) closeModal(); }); }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeModal(); });

  /* ---- Video Facades (multiple per page) ---- */
  document.querySelectorAll('.video-facade').forEach(function(facade){
    function load(){
      var src = facade.dataset.src;
      if(!src) return;
      var f = document.createElement('iframe');
      f.src = src + '?autoplay=1&rel=0';
      f.title = facade.dataset.title || 'Video';
      f.allow = 'accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';
      f.allowFullscreen = true;
      f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:18px;';
      facade.innerHTML=''; facade.appendChild(f); facade.style.cursor='default';
      facade.removeEventListener('click',load);
    }
    facade.addEventListener('click',load);
    facade.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' ') load(); });
  });

  /* ---- Navbar scroll shadow ---- */
  var navbar = document.querySelector('.navbar');
  if(navbar){
    window.addEventListener('scroll',function(){
      navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 40px rgba(0,0,0,0.4)' : '';
    },{passive:true});
  }

  /* ---- Active nav link highlight ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a){
    var href = a.getAttribute('href');
    if(href && (href===page || (page==='' && href==='index.html'))) a.classList.add('active');
  });
})();
