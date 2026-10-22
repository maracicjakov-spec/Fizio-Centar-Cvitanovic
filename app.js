const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.getElementById('mobile-nav');
const header=document.querySelector('.header');
const stickyBooking=document.querySelector('.mobile-booking');
function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Otvori izbornik');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Zatvori izbornik':'Otvori izbornik');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menuToggle.focus();}});
window.addEventListener('resize',()=>{if(window.innerWidth>700)closeMenu();});
let scrollQueued=false;
function updateScroll(){header.classList.toggle('scrolled',window.scrollY>30);const r=document.getElementById('kontakt').getBoundingClientRect();stickyBooking.classList.toggle('visible',window.scrollY>520&&r.top>window.innerHeight*.75);scrollQueued=false;}
window.addEventListener('scroll',()=>{if(!scrollQueued){requestAnimationFrame(updateScroll);scrollQueued=true;}},{passive:true});
updateScroll();
const serviceContent={
 fizikalna:{title:'Fizikalna terapija',html:'<p>Pristup prilagođavamo vašim tegobama, pokretljivosti i ciljevima. Kombiniramo manualne tehnike, fizikalne metode i individualne vježbe.</p><div class="method-pills"><span>Manualna terapija</span><span>INDIBA / TECAR</span><span>HILT laser</span><span>Udarni val</span><span>Magnetoterapija</span></div><p>Odabir postupaka dogovaramo nakon procjene vašeg stanja.</p>'},
 rehabilitacija:{title:'Rehabilitacija',html:'<p>Individualan program oporavka za osobe nakon ozljeda, operativnih zahvata i kod tegoba mišićno-koštanog sustava.</p><ul><li>Priprema za operativni zahvat i postoperativni oporavak.</li><li>Ciljane vježbe i rad na pokretljivosti.</li><li>Praćenje napretka i edukacija za svakodnevne aktivnosti.</li></ul>'},
 sport:{title:'Sportska fizioterapija',html:'<p>Podrška u prevenciji i rehabilitaciji sportskih ozljeda. Program prilagođavamo vrsti ozljede, vašem sportu i fazi oporavka.</p><ul><li>Individualne terapijske vježbe.</li><li>Manualna terapija i metode prema procjeni.</li><li>Postupan povratak sportskim aktivnostima.</li></ul>'},
 metode:{title:'Metode koje primjenjujemo',html:'<p>Terapiju biramo prema individualnoj procjeni.</p><div class="method-pills"><span>Manualne tehnike</span><span>INDIBA / TECAR</span><span>HILT laser</span><span>Udarni val</span><span>Magnetoterapija</span><span>Elektroterapija</span><span>Ultrazvučna terapija</span><span>Kineziotaping</span><span>Kineziterapija</span><span>Medicinska i sportska masaža</span></div><p>Javite nam se za pitanja o postupcima i dogovor dolaska.</p>'}
};
const serviceDialog=document.getElementById('service-dialog');
function openDialog(dialog){dialog.showModal();document.body.classList.add('dialog-open');}
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{const s=serviceContent[button.dataset.service];document.getElementById('dialog-title').textContent=s.title;document.getElementById('dialog-content').innerHTML=s.html;openDialog(serviceDialog);}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');});});
const gallery=[...document.querySelectorAll('.gallery-item img')].map(img=>({src:img.getAttribute('src'),alt:img.alt}));
const lightbox=document.getElementById('lightbox');
let imageIndex=0;
function showImage(i){imageIndex=(i+gallery.length)%gallery.length;const item=gallery[imageIndex];const img=document.getElementById('lightbox-image');img.src=item.src;img.alt=item.alt;document.getElementById('lightbox-caption').textContent=item.alt;document.getElementById('lightbox-count').textContent=String(imageIndex+1).padStart(2,'0')+' / '+String(gallery.length).padStart(2,'0');}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{showImage(Number(button.dataset.gallery));openDialog(lightbox);}));
document.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(imageIndex-1));
document.querySelector('.lightbox-next').addEventListener('click',()=>showImage(imageIndex+1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){showImage(imageIndex+1);e.preventDefault();}if(e.key==='ArrowLeft'){showImage(imageIndex-1);e.preventDefault();}});
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
document.querySelectorAll('.faq-list details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==detail)other.open=false;});}));
document.querySelector('[data-privacy]').addEventListener('click',()=>{document.getElementById('dialog-title').textContent='Privatnost';document.getElementById('dialog-content').innerHTML='<p>Ova stranica ne prikuplja podatke putem obrasca i ne postavlja analitičke ni oglašivačke kolačiće.</p><p>Poveznice za poziv i e-poštu otvaraju aplikacije na vašem uređaju. Google karte i Instagram zasebne su usluge s vlastitim pravilima privatnosti.</p><p>Za pitanja o obradi podataka pri dogovaranju i pružanju usluga obratite se centru: <a href="mailto:fizio.zlatan@gmail.com">fizio.zlatan@gmail.com</a>.</p>';openDialog(serviceDialog);});
