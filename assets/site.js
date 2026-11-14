// Google Tag Manager container for the public JNS website.
(() => {
  const containerId = "GTM-WGM8VXCD";
  if (window.__JNS_GTM_LOADED__) return;
  window.__JNS_GTM_LOADED__ = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(containerId);
  (document.head || document.documentElement).appendChild(tag);
})();


document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});}
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
 const toSlug=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const params=new URLSearchParams(window.location.search);
 const serviceSelect=document.querySelector('#service-interest');
 const serviceParam=params.get('service');
 if(serviceSelect&&serviceParam){[...serviceSelect.options].forEach(o=>{if(toSlug(o.value||o.textContent)===serviceParam)serviceSelect.value=o.value||o.textContent;});}
 const roleSelect=document.querySelector('#candidate-role');
 const roleParam=params.get('role');
 if(roleSelect&&roleParam){[...roleSelect.options].forEach(o=>{if(toSlug(o.value||o.textContent)===roleParam)roleSelect.value=o.value||o.textContent;});}

 const searchInput=document.querySelector('#service-search');
 const serviceCards=[...document.querySelectorAll('.searchable-service')];
 const filterButtons=[...document.querySelectorAll('.service-filter')];
 let activeCategory='all';
 const runServiceFilter=()=>{
  const term=toSlug(searchInput?.value||'');
  let visible=0;
  serviceCards.forEach(card=>{
   const matchText=!term||card.dataset.search.includes(term);
   const matchCategory=activeCategory==='all'||card.dataset.category===activeCategory;
   const show=matchText&&matchCategory;
   card.hidden=!show;if(show)visible++;
  });
  const out=document.querySelector('#service-results');
  if(out)out.textContent=`Showing ${visible} of ${serviceCards.length} services.`;
 };
 if(searchInput)searchInput.addEventListener('input',runServiceFilter);
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  activeCategory=btn.dataset.filter||'all';
  filterButtons.forEach(b=>{b.classList.toggle('btn-navy',b===btn);b.classList.toggle('btn-outline-light',b!==btn);});
  runServiceFilter();
 }));

 document.querySelectorAll('form[data-mailto]').forEach(form=>{
  form.addEventListener('submit',e=>{
   e.preventDefault();if(!form.reportValidity())return;
   const data=new FormData(form);let body='';
   for(const [k,v] of data.entries()) body+=k+': '+v+'\n';
   body+='\nPlease review and send this email. This website form does not store submissions online.';
   const subject=encodeURIComponent(form.dataset.subject||'JNS Website Enquiry');
   const url='mailto:jnshomenursingservices@gmail.com?subject='+subject+'&body='+encodeURIComponent(body);
   const status=form.querySelector('.formstatus');if(status)status.textContent='Your email app should open. Review the details and send the email to complete your enquiry.';
   window.location.href=url;
  });
 });
});
