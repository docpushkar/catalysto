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

  /* ---- Floating WhatsApp Button (injected on every page) ---- */
  if(!document.querySelector('.float-wa')){
    var wa = document.createElement('a');
    wa.href = 'https://api.whatsapp.com/send?phone=918275788875&text=Hi%20Catalysto%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20to%20discuss%20how%20you%20can%20help%20my%20manufacturing%20business.';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.className = 'float-wa';
    wa.setAttribute('aria-label','Chat with Catalysto on WhatsApp');
    wa.innerHTML = '<div class="float-wa-ring"></div><div class="float-wa-ring2"></div><svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(wa);
  }
