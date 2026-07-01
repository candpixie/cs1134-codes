/* CS-UY 1134 Code Deck — browse + flashcards. Vanilla JS, no build. */
const $ = (id) => document.getElementById(id);

// tiny Python highlighter (keywords / comments / strings)
const KW = new Set(("def class return if elif else while for in is not None and or try except "
  + "yield from True False del import").split(" "));
function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function highlight(code){
  return esc(code).split("\n").map(line=>{
    // comment
    const ci = line.indexOf("#");
    let head = ci>=0 ? line.slice(0,ci) : line;
    let tail = ci>=0 ? `<span class="tok-cm">${line.slice(ci)}</span>` : "";
    // strings (simple)
    head = head.replace(/(&#39;|&quot;|'|")(.*?)\1/g, m=>`<span class="tok-st">${m}</span>`);
    // keywords (word boundaries, skip inside spans)
    head = head.replace(/\b([a-zA-Z_]+)\b/g, (w)=> KW.has(w) ? `<span class="tok-kw">${w}</span>` : w);
    return head + tail;
  }).join("\n");
}

const App = {
  curMode:"browse", deck:[], di:0, known:0,

  init(){
    const cats = ["All categories", ...Array.from(new Set(CARDS.map(c=>c.cat)))];
    $("cat").innerHTML = cats.map(c=>`<option>${c}</option>`).join("");
    $("deckcat").innerHTML = cats.map(c=>`<option>${c}</option>`).join("");
    if($("total")) $("total").textContent = CARDS.length;
    this.render();
    this.newDeck();
  },

  mode(m){
    this.curMode=m;
    $("m-browse").classList.toggle("active", m==="browse");
    $("m-cards").classList.toggle("active", m==="cards");
    $("browse").classList.toggle("active", m==="browse");
    $("cards").classList.toggle("active", m==="cards");
  },

  filtered(catSel){
    const cat = catSel.value;
    let list = CARDS.filter(c=> cat==="All categories" || c.cat===cat);
    return list;
  },

  render(){
    const q = $("search").value.trim().toLowerCase();
    let list = this.filtered($("cat"));
    if(q) list = list.filter(c=> (c.name+" "+c.when+" "+c.move).toLowerCase().includes(q));
    $("count").textContent = `${list.length} code${list.length!==1?"s":""}`;
    $("grid").innerHTML = list.map(c=>`
      <div class="tile">
        <div class="tile-h">
          <div class="tile-name">${esc(c.name)}</div>
          <div class="tile-when">${esc(c.when)}</div>
          <div class="tags">
            <span class="tag">${esc(c.cat)}</span>
            <span class="tag move">${esc(c.move)}</span>
            <span class="tag exam">${esc(c.exam)}</span>
          </div>
        </div>
        <pre class="code">${highlight(c.code)}</pre>
      </div>`).join("");
  },

  // ---- flashcards ----
  newDeck(){
    this.deck = this.filtered($("deckcat")).slice();
    this.di=0; this.known=0;
    $("deckdone").classList.add("hidden");
    $("card").classList.remove("hidden");
    this.showCard();
  },
  shuffle(){
    for(let i=this.deck.length-1;i>0;i--){ const j=(i*7+3)%(i+1); [this.deck[i],this.deck[j]]=[this.deck[j],this.deck[i]]; }
    this.di=0; this.known=0; this.showCard();
  },
  showCard(){
    if(this.di>=this.deck.length){ return this.finish(); }
    const c=this.deck[this.di];
    $("card-cat").textContent=c.cat;
    $("card-name").textContent=c.name;
    $("card-when").textContent='"'+c.when+'"';
    $("card-code").innerHTML=highlight(c.code);
    $("card-code").classList.add("hidden");
    $("reveal").classList.remove("hidden");
    $("grade").classList.add("hidden");
    $("progress").textContent=`${this.di+1} / ${this.deck.length}  ·  ✓ ${this.known}`;
  },
  reveal(){
    $("card-code").classList.remove("hidden");
    $("reveal").classList.add("hidden");
    $("grade").classList.remove("hidden");
  },
  grade(ok){
    if(ok) this.known++;
    else this.deck.push(this.deck[this.di]); // shaky -> see it again at the end
    this.di++;
    this.showCard();
  },
  finish(){
    $("card").classList.add("hidden");
    $("deckdone").classList.remove("hidden");
    const total=this.deck.length;
    $("deckdone").innerHTML = `Deck done. <b>${this.known}</b> got cold on the first pass.<br>`
      + `<button class="ghost" style="margin-top:14px" onclick="App.newDeck()">restart deck</button>`;
    $("progress").textContent=`done · ✓ ${this.known}`;
  },
};
App.init();
