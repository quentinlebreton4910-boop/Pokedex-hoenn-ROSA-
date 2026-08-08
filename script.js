let P=[], state=JSON.parse(localStorage.getItem('hoennState')||'{}'), filter='all';
const $=s=>document.querySelector(s);
const save=()=>localStorage.setItem('hoennState',JSON.stringify(state));
const status=id=>state[id]?.status||'missing';
const shiny=id=>!!state[id]?.shiny;
const fav=id=>!!state[id]?.favorite;
const setState=(id,patch)=>{state[id]={...(state[id]||{}),...patch};save();render()};
function progress(){
 const done=P.filter(p=>status(p.id)==='obtained').length;
 const requiredDone=P.filter(p=>p.requiredForCompletion && status(p.id)==='obtained').length;
 $('#progressText').textContent=`${done} / 211`;
 $('#percent').textContent=Math.round(done/211*100)+'%';
 $('#bar').style.width=(done/211*100)+'%';
 $('#obtainedCount').textContent=`${done} obtenus`;
 $('#todoCount').textContent=`${P.length-done} à faire`;
 const t=document.querySelector('.progressCard .subprogress');
 if(t) t.title=`Complétion du Pokédex régional : ${requiredDone}/208 requis`;
}
function matches(p){
 const q=$('#search').value.trim().toLowerCase();
 if(q && !p.name.toLowerCase().includes(q) && !String(p.id).padStart(3,'0').includes(q)) return false;
 const s=status(p.id);
 if(filter==='obtained') return s==='obtained'; if(filter==='progress') return s==='progress'; if(filter==='missing') return s==='missing';
 if(filter==='impossible') return s==='impossible'; if(filter==='favorite') return fav(p.id); if(filter==='shiny') return shiny(p.id);
 return true;
}
function card(p){
 const s=status(p.id), sh=shiny(p.id);
 return `<article class="card ${s==='obtained'?'done':''}" onclick="openDetail(${p.id})">
 <button class="fav" onclick="event.stopPropagation();setState(${p.id},{favorite:!fav(${p.id})})">${fav(p.id)?'⭐':'☆'}</button>
 <div class="num">#${String(p.id).padStart(3,'0')}</div><img src="${sh?p.shiny:p.sprite}" loading="lazy" alt="${p.name}">
 <div class="name">${p.name}${p.requiredForCompletion?'':' <sup title="Non requis pour la complétion régionale">★</sup>'}</div><div class="types">${p.types.map(t=>`<span class="type">${t}</span>`).join('')}</div>
 <div class="state">
 <button class="got" onclick="event.stopPropagation();setState(${p.id},{status:'obtained'})">✓</button>
 <button class="doing" onclick="event.stopPropagation();setState(${p.id},{status:'progress'})">↻</button>
 <button class="nope" onclick="event.stopPropagation();setState(${p.id},{status:'impossible'})">×</button></div></article>`;
}
function render(){progress();$('#grid').innerHTML=P.filter(matches).map(card).join('')||'<p>Aucun Pokémon ne correspond.</p>'}
function openDetail(id){
 const p=P.find(x=>x.id===id), s=status(id);
 $('#detail').innerHTML=`<div class="detailHero"><div>#${String(p.id).padStart(3,'0')}</div><img src="${shiny(id)?p.shiny:p.sprite}" alt="${p.name}"><h2>${p.name}</h2><div>${p.types.map(t=>`<span class="type">${t}</span>`).join('')}</div></div>
 <div class="detail"><p><b>Évolution :</b> ${p.evolution}</p><p><b>Obtention :</b> ${p.location}</p><p><b>Méthode :</b> ${p.method}</p><p><b>Œuf :</b> ${p.egg}</p><p><b>Complétion :</b> ${p.requiredForCompletion?'Compte pour les 208 requis.':'Non requis pour compléter le Pokédex régional.'}</p>
 <div class="actions"><button onclick="setState(${id},{status:'obtained'});closeDetail()">✅ Obtenu</button><button onclick="setState(${id},{status:'progress'});closeDetail()">🔄 En cours</button><button onclick="setState(${id},{status:'impossible'});closeDetail()">🚫 Impossible</button><button onclick="setState(${id},{favorite:!fav(${id})})">⭐ ${fav(id)?'Retirer épingle':'Épingler'}</button><button onclick="setState(${id},{shiny:!shiny(${id})})">✨ Shiny : ${shiny(id)?'oui':'non'}</button><button onclick="setState(${id},{status:'missing'});closeDetail()">↩️ Réinitialiser</button></div></div>`;
 $('#modal').classList.remove('hidden');
}
function closeDetail(){$('#modal').classList.add('hidden');render()}
$('#close').onclick=closeDetail;$('#modal').onclick=e=>{if(e.target.id==='modal')closeDetail()};
$('#search').oninput=render;$('#filters').onclick=e=>{if(e.target.tagName!=='BUTTON')return;document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');filter=e.target.dataset.filter;render()};
$('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light')};
if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark');
$('#exportBtn').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='pokedex-hoenn-progression.json';a.click()};
$('#importFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=JSON.parse(r.result);save();render()}catch{alert('Fichier invalide.')}};r.readAsText(f)};
$('#resetBtn').onclick=()=>{if(confirm('Effacer toute la progression ?')){state={};save();render()}};
fetch('pokemon.json').then(r=>r.json()).then(d=>{P=d;render()});
if('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(()=>{});
