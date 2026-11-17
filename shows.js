/* SHOWS extension. Keep original script.js unchanged. */
(()=>{
 const shows=document.getElementById('shows'),tab=document.getElementById('showsTab');
 const editorial=document.getElementById('editorial'),overview=document.getElementById('overview');
 const music=document.querySelector('.music-player'),audio=document.getElementById('carmenAudio');
 const play=document.getElementById('carmenPlay');
 const originalIframe=music?.querySelector('iframe');
 const originalSrc=originalIframe?.getAttribute('src');
 function stopCarmen(){audio.pause();audio.currentTime=0;play.textContent='PLAY'}
 function stopBandcamp(){if(originalIframe&&originalSrc){originalIframe.setAttribute('src','about:blank')}}
 function restoreBandcamp(){if(originalIframe&&originalSrc&&originalIframe.getAttribute('src')!==originalSrc){originalIframe.setAttribute('src',originalSrc)}}
 function leaveShows(){if(!shows.hidden){shows.hidden=true;stopCarmen();if(music)music.hidden=false;restoreBandcamp();tab.classList.remove('active');tab.setAttribute('aria-selected','false')}}
 document.getElementById('editorialTab')?.addEventListener('click',leaveShows);
 document.getElementById('overviewTab')?.addEventListener('click',leaveShows);
 tab.addEventListener('click',()=>{
   editorial.hidden=true;overview.hidden=true;shows.hidden=false;
   document.querySelectorAll('nav .tab').forEach(t=>{t.classList.toggle('active',t===tab);t.setAttribute('aria-selected',String(t===tab))});
   stopBandcamp();if(music)music.hidden=true;window.scrollTo({top:0,behavior:'instant'});
 });
 play.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();play.textContent='PAUSE'}catch(e){play.textContent='PLAY'}}else{audio.pause();play.textContent='PLAY'}});
 audio.addEventListener('ended',()=>play.textContent='PLAY');
 // Add photo filenames to these lists once exported from Canva.
const photos2020=Array.from({length:21},(_,i)=>`show-${String(i+1).padStart(2,"0")}.jpg`);const photos2025=Array.from({length:34},(_,i)=>`show-${String(i+22).padStart(2,"0")}.jpg`);
 function gallery(id,photos){const root=document.getElementById(id);if(!photos.length){root.innerHTML='<p class="shows-empty">Photographs will be inserted here.</p>';return}photos.forEach(src=>{const b=document.createElement('button');b.className='shows-photo';const img=document.createElement('img');img.src=src;img.alt='TOCA runway photograph';img.loading='lazy';b.append(img);b.addEventListener('click',()=>{const modal=document.createElement('div');modal.className='shows-lightbox';modal.setAttribute('role','dialog');modal.setAttribute('aria-label','Enlarged photograph');const large=document.createElement('img');large.src=src;large.alt=img.alt;const close=document.createElement('button');close.className='shows-close';close.textContent='CLOSE';close.addEventListener('click',()=>modal.remove());modal.addEventListener('click',e=>{if(e.target===modal)modal.remove()});modal.append(large,close);document.body.append(modal);close.focus()});root.append(b)})}
 gallery('show2020',photos2020);gallery('show2025',photos2025);
 const grid2020=document.getElementById('show2020');const video=document.createElement('div');video.className='shows-video shows-video-in-grid';video.innerHTML='<video controls preload="metadata" playsinline poster="shows-video-poster.jpg" src="EDIT01V4_WIDE_DESFILE_TOCA_25.mp4"></video>';grid2020.append(video);
 // Videos: insert <video controls src="your-video.mp4"></video> into #video2020 or #video2025.
})();
