const tours = [
  {id:1,title:"Lippische Velmerstot",image:"IMG_20260928_185334.jpg", region:"Ostwestfalen",subtitle:"Felsen · Wald · Aussicht",km:"18,1 km",hm:"420 hm",time:"5:30 h",difficulty:"mittel",lat:51.83925,lon:8.95557,kind:"",desc:"Eine abwechslungsreiche Wanderung durch Wälder, über Höhenzüge und zu beeindruckenden Felsformationen. Der Kartenpunkt dient in dieser ersten Version als Orientierung; der echte GPX-Track wird später ergänzt."},
  {id:2,title:"Olgahafen – Sonnenaufgang",image:"Screenshot_2026-10-10-12-56-09-297_com.instagram.android~2.jpg",region:"Ostwestfalen",subtitle:"Wasser · Natur · Morgenstimmung",km:"12,4 km",hm:"80 hm",time:"3:15 h",difficulty:"leicht",lat:53.10662,lon:8.46784,kind:"sunrise",desc:"Eine frühe Mikroabenteuer-Tour rund um den Olgahafen. Der Kartenpunkt ist zunächst als Orientierung hinterlegt; der genaue Wandertrack folgt später."},
  {id:3,title:"Klippen an der Teufelskanzel",region:"Ostwestfalen",subtitle:"Felsen · Weserbergland · Aussicht",km:"15,7 km",hm:"310 hm",time:"4:45 h",difficulty:"mittel",lat:52.16667,lon:9.25000,kind:"cliff",desc:"Felsen, Wald und Aussicht im Weserbergland. In dieser ersten Version ist Hessisch Oldendorf als Kartenpunkt hinterlegt; der genaue GPX-Verlauf wird später ergänzt."},
  {id:4,title:"Picknick an den Externsteinen",image:"externstein.jpg",region:"Mit Kindern",subtitle:"Mystik - Abenteuer - Wald - Klettern",km:"12,4 km",hm:"80 hm",time:"3:15 h",difficulty:"leicht",lat:53.10662,lon:8.46784,kind:"sunrise",desc:"Eine frühe Mikroabenteuer-Tour rund um den Olgahafen. Der Kartenpunkt ist zunächst als Orientierung hinterlegt; der genaue Wandertrack folgt später."},
  {id:5,title:"Einsame Felsidylle in Karlshamn",image:"MVIMG_20260817_192218.jpg",region:"Schweden",subtitle:"Eine Bucht wie ein Paradies",km:"12,4 km",hm:"80 hm",time:"3:15 h",difficulty:"leicht",lat:53.10662,lon:8.46784,kind:"sunrise",desc:"Eine frühe Mikroabenteuer-Tour rund um den Olgahafen. Der Kartenpunkt ist zunächst als Orientierung hinterlegt; der genaue Wandertrack folgt später."},
  {id:6,title:"Sonnenuntergang über den Schären",region:"Schweden",subtitle:"Klettern - Über den Bäumen - Sonnenuntergang",km:"12,4 km",hm:"80 hm",time:"3:15 h",difficulty:"leicht",lat:53.10662,lon:8.46784,kind:"sunrise",desc:"Eine frühe Mikroabenteuer-Tour rund um den Olgahafen. Der Kartenpunkt ist zunächst als Orientierung hinterlegt; der genaue Wandertrack folgt später."},
  {id:7,title:"Auf den Brandenschrofen",region:"Deutschland",subtitle:"Berge - Bergwandern - Abenteuer",km:"12,4 km",hm:"80 hm",time:"3:15 h",difficulty:"leicht",lat:53.10662,lon:8.46784,kind:"sunrise",desc:"Eine frühe Mikroabenteuer-Tour rund um den Olgahafen. Der Kartenpunkt ist zunächst als Orientierung hinterlegt; der genaue Wandertrack folgt später."},
  {id:8,title:"Feierabend-Drink an der Bar DüMar",region:"Ostwestfalen",subtitle:"Wasser · Karibik-Feeling · Sandstrand",km:"12,4 km",hm:"80 hm",time:"3:15 h",difficulty:"leicht",lat:53.10662,lon:8.46784,kind:"sunrise",desc:"Eine frühe Mikroabenteuer-Tour rund um den Olgahafen. Der Kartenpunkt ist zunächst als Orientierung hinterlegt; der genaue Wandertrack folgt später."}  
  ];

const screens = ["home","tours","detail"];
let deferredPrompt = null;

function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0)}
function renderTours(filter="Alle"){
  const list=document.getElementById("tourList");
  const matches=tours.filter(t=>filter==="Alle"||t.region===filter);
  if(!matches.length){
    list.innerHTML=`<article class="community-card"><h3>${filter}</h3><p>Hier gibt es noch keine eingetragenen Touren. Die Rubrik ist vorbereitet und kann nach und nach mit passenden Mikroabenteuern gefüllt werden.</p></article>`;
    return;
  }
  list.innerHTML=matches.map(t=>`
    <article class="tour-card" onclick="openTour(${t.id})">
   
<div class="tour-image ${t.kind}" style="${t.image ? `background-image:url('${t.image}');background-size:cover;background-position:center;` : ''}">${t.id===1?"⛰️":t.id===2?"🌅":"🪨"}</div>
      <div class="tour-body"><h3>${t.title}</h3><div class="sub">${t.subtitle}</div>
      <div class="stats"><span>🥾 ${t.km}</span><span>↗ ${t.hm}</span><span>◷ ${t.time}</span><span class="difficulty">${t.difficulty}</span></div></div>
    </article>`).join("");
}
function openTour(id){
  const t=tours.find(x=>x.id===id);
  show("detail");
  document.getElementById("detailContent").innerHTML=`
   

<div class="detail-hero ${t.kind}" style="${t.image ? `background-image:url('${t.image}');background-size:cover;background-position:center;` : ''}"><div><div style="font-size:13px;opacity:.9">Mikroabenteuer #${t.id}</div><h1>${t.title}</h1></div></div>

    <div class="detail-body">
      <div class="detail-tabs"><button class="active">Übersicht</button><button>Karte</button><button>Anreise</button><button>Tipps</button></div>
      <div class="detail-stats">
        <div><strong>${t.km}</strong><span>Strecke</span></div><div><strong>${t.hm}</strong><span>Höhenmeter</span></div><div><strong>${t.time}</strong><span>Gehzeit</span></div><div><strong>${t.difficulty}</strong><span>Schwierigkeit</span></div>
      </div>
      <h3>Beschreibung</h3><p>${t.desc}</p>
      <div id="map-${t.id}" class="map"></div>
      <div class="actions">
        <button onclick="focusMap(${t.id})">🗺 Route auf Karte</button>
        <button onclick="alert('Der GPX-Track wird später ergänzt.')">⇩ GPX-Datei</button>
      </div>
      <div class="notice"><strong>🚆 Zuganreise ab Herford</strong><br>Die genaue Verbindung und der passende Startpunkt werden in der nächsten Version ergänzt.</div>
      <h3>💡 Mein Tipp</h3><p>Hier kannst du später deine persönlichen Hinweise zur Tour hinterlegen.</p>
    </div>`;
  setTimeout(()=>initMap(t),50);
}
const maps={};
function initMap(t){
  const el=document.getElementById(`map-${t.id}`); if(!el) return;
  const map=L.map(el,{scrollWheelZoom:false}).setView([t.lat,t.lon],12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(map);
  L.marker([t.lat,t.lon]).addTo(map).bindPopup(t.title).openPopup(); maps[t.id]=map;
}
function focusMap(id){maps[id]?.setView([tours.find(t=>t.id===id).lat,tours.find(t=>t.id===id).lon],14)}
document.addEventListener("click",e=>{
  const go=e.target.closest("[data-go]"); if(go) show(go.dataset.go);
  const f=e.target.closest("[data-filter]"); if(f){show("tours");document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c.dataset.filter===f.dataset.filter));renderTours(f.dataset.filter)}
});
renderTours();
window.openTour=openTour;window.focusMap=focusMap;

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.getElementById("installBtn").hidden=false});
document.getElementById("installBtn").addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();deferredPrompt=null});
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
