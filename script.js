// Add optional notes using the original PDF page number, e.g. 3: 'Your text here'.
const NOTES = {};
const COUNT = 132;
const editorial = document.getElementById('editorial');
const overview = document.getElementById('overview');
const overviewGrid = document.createElement('div');overviewGrid.className='overview-grid';overview.append(overviewGrid);
function path(n){return `images/page-${String(n).padStart(3,'0')}.jpg`}
for(let i=1;i<=COUNT;i+=2){
  const spread=document.createElement('section');spread.className='spread';
  for(let n=i;n<=Math.min(i+1,COUNT);n++){
    const page=document.createElement('div');page.className='page';page.id=`page-${n}`;
    const img=document.createElement('img');img.src=path(n);img.alt=`TOCA — page ${n}`;img.loading=n<=4?'eager':'lazy';page.append(img);
    if(NOTES[n]){page.classList.add('has-note');page.tabIndex=0;const overlay=document.createElement('div');overlay.className='overlay';overlay.textContent=NOTES[n];page.append(overlay);page.addEventListener('click',()=>page.classList.toggle('open'));page.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();page.classList.toggle('open')}})}
    spread.append(page);
    const thumb=document.createElement('button');thumb.className='thumb';thumb.type='button';thumb.setAttribute('aria-label',`View page ${n} in editorial`);const small=document.createElement('img');small.src=path(n);small.loading='lazy';small.alt='';const number=document.createElement('span');number.textContent=String(n).padStart(3,'0');thumb.append(small,number);thumb.addEventListener('click',()=>{switchView('editorial');requestAnimationFrame(()=>document.getElementById(`page-${n}`).scrollIntoView({block:'start',behavior:'smooth'}))});overviewGrid.append(thumb);
  }editorial.append(spread)
}
const editorialTab=document.getElementById('editorialTab'),overviewTab=document.getElementById('overviewTab');
function switchView(which){const isEditorial=which==='editorial';editorial.hidden=!isEditorial;overview.hidden=isEditorial;editorialTab.classList.toggle('active',isEditorial);overviewTab.classList.toggle('active',!isEditorial);editorialTab.setAttribute('aria-selected',String(isEditorial));overviewTab.setAttribute('aria-selected',String(!isEditorial));window.scrollTo({top:0,behavior:'instant'})}
editorialTab.addEventListener('click',()=>switchView('editorial'));overviewTab.addEventListener('click',()=>switchView('overview'));
const sound=document.getElementById('sound'),music=document.getElementById('music'),label=document.getElementById('soundLabel'),musicDialog=document.getElementById('musicDialog');
// Only play locally when the site owner supplies an appropriately licensed file.
let hasMusic=false;
fetch('music.mp3',{method:'HEAD'}).then(r=>{if(r.ok){music.src='music.mp3';hasMusic=true}}).catch(()=>{});
sound.addEventListener('click',async()=>{if(!music.paused){music.pause();label.textContent='OFF';return}if(!hasMusic){musicDialog.showModal();return}try{await music.play();label.textContent='ON'}catch(e){musicDialog.showModal()}});
if(new URLSearchParams(location.search).get('view')==='overview')switchView('overview');
