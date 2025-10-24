(function(){
  // WhatsApp config - use provided number
  const waNumber = "212648085124"; // +212648085124
  const waMessageEn = encodeURIComponent("Hello! I want information about your tours.");
  const waMessageAr = encodeURIComponent("سلام! بغيت معلومات على الرحلات ديالكم.");

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  const waUrlEn = `https://wa.me/${waNumber}?text=${waMessageEn}`;
  const waUrlAr = `https://wa.me/${waNumber}?text=${waMessageAr}`;
  const setLinks = (url)=>{
    const els = ['whatsapp-float','whatsapp-large','whatsapp-top','bottom-contact'];
    els.forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.href = url;
    });
  };
  setLinks(waUrlEn);

  // Language toggle
  const enBtn = document.getElementById('enBtn');
  const arBtn = document.getElementById('arBtn');
  let current = localStorage.getItem('lang') || 'en';
  function applyLang(lang){
    document.documentElement.lang = (lang==='ar') ? 'ar' : 'en';
    document.documentElement.dir = (lang==='ar') ? 'rtl' : 'ltr';
    enBtn.classList.toggle('active', lang==='en');
    arBtn.classList.toggle('active', lang==='ar');
    const waHref = (lang==='ar') ? waUrlAr : waUrlEn;
    setLinks(waHref);
    document.querySelectorAll('[data-en]').forEach(el=>{
      el.textContent = (lang==='ar') ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
    localStorage.setItem('lang', lang);
  }
  enBtn.addEventListener('click', ()=> applyLang('en'));
  arBtn.addEventListener('click', ()=> applyLang('ar'));
  applyLang(current);

  // Price shimmer
  const prices = document.querySelectorAll('.price');
  let hue = 0;
  setInterval(()=>{
    hue = (hue + 2) % 360;
    prices.forEach(p=>{
      p.style.background = `linear-gradient(90deg,hsl(${hue} 90% 70%), hsl(${(hue+60)%360} 90% 70%))`;
    });
  }, 120);

})();
