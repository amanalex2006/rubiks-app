var Cb=Object.defineProperty;var S=(r,e,t)=>()=>{if(t)throw t[0];try{return r&&(e=r(r=0)),e}catch(i){throw t=[i],i}};var vn=(r,e)=>{for(var t in e)Cb(r,t,{get:e[t],enumerable:!0})};var Ni,Ro=S(()=>{Ni=class{animFrameID=null;animFrame=this.animFrameWrapper.bind(this);callback;constructor(e){this.callback=e}requestIsPending(){return!!this.animFrameID}requestAnimFrame(){this.animFrameID||(this.animFrameID=requestAnimationFrame(this.animFrame))}cancelAnimFrame(){this.animFrameID&&(cancelAnimationFrame(this.animFrameID),this.animFrameID=0)}animFrameWrapper(e){this.animFrameID=0,this.callback(e)}}});function Em(r,e=!0){if(!e)return r;switch(r){case Ze.Forwards:return Ze.Backwards;case Ze.Backwards:return Ze.Forwards}throw new Error("Invalid input iteration direction.")}function np(r,e){return e===Ze.Backwards?Array.from(r).reverse():r}function Mm(r){return Array.from(r).reverse()}function*op(r,e){e===Ze.Backwards?yield*Lb(r):yield*r}function*Lb(r){for(let e of Array.from(r).reverse())yield e}var Ze,sr=S(()=>{Ze={Forwards:1,Backwards:-1}});var Pb,qs,$t,Xr=S(()=>{Pb=!1,qs=class{is(e){return this instanceof e}as(e){return this instanceof e?this:null}},$t=class extends qs{constructor(){super(),Pb&&Object.defineProperty(this,"_debugStr",{get:()=>this.toString()})}get log(){return console.log.bind(console,this,this.toString())}}});var Ct,To=S(()=>{wr();Xr();sr();Ct=class r extends $t{#e;#t;constructor(e,t){super(),this.#e=En(e),this.#t=En(t)}get A(){return this.#e}get B(){return this.#t}isIdentical(e){let t=e.as(r);return!!(t?.A.isIdentical(this.A)&&t?.B.isIdentical(this.B))}invert(){return new r(this.#t,this.#e)}*experimentalExpand(e=Ze.Forwards,t){t??=1/0,t===0?yield e===Ze.Forwards?this:this.invert():e===Ze.Forwards?(yield*this.A.experimentalExpand(Ze.Forwards,t-1),yield*this.B.experimentalExpand(Ze.Forwards,t-1),yield*this.A.experimentalExpand(Ze.Backwards,t-1),yield*this.B.experimentalExpand(Ze.Backwards,t-1)):(yield*this.B.experimentalExpand(Ze.Forwards,t-1),yield*this.A.experimentalExpand(Ze.Forwards,t-1),yield*this.B.experimentalExpand(Ze.Backwards,t-1),yield*this.A.experimentalExpand(Ze.Backwards,t-1))}toString(e){return`[${this.#e.toString(e)}, ${this.#t.toString(e)}]`}}});var _t,Ao=S(()=>{wr();Xr();sr();_t=class r extends $t{#e;#t;constructor(e,t){super(),this.#e=En(e),this.#t=En(t)}get A(){return this.#e}get B(){return this.#t}isIdentical(e){let t=e.as(r);return!!(t?.A.isIdentical(this.A)&&t?.B.isIdentical(this.B))}invert(){return new r(this.#e,this.#t.invert())}*experimentalExpand(e,t){t??=1/0,t===0?yield e===Ze.Forwards?this:this.invert():(yield*this.A.experimentalExpand(Ze.Forwards,t-1),yield*this.B.experimentalExpand(e,t-1),yield*this.A.experimentalExpand(Ze.Backwards,t-1))}toString(e){return`[${this.A.toString(e)}: ${this.B.toString(e)}]`}}});var js,sp=S(()=>{js="2^31 - 1"});var Mn,ap=S(()=>{wr();Mn=class{#e=[];push(e){this.#e.push(e)}experimentalPushAlg(e){for(let t of e.childAlgNodes())this.push(t)}experimentalNumAlgNodes(){return this.#e.length}toAlg(){return new le(this.#e)}reset(){this.#e=[]}}});var Di,Ys=S(()=>{Xr();sr();Di=class r extends $t{#e;constructor(e){if(super(),e.includes(`
`)||e.includes("\r"))throw new Error("LineComment cannot contain newline");this.#e=e}get text(){return this.#e}isIdentical(e){let t=e;return e.is(r)&&this.#e===t.#e}invert(){return this}*experimentalExpand(e=Ze.Forwards,t=1/0){yield this}toString(e){return`//${this.#e}`}}});var ci,Qs=S(()=>{Xr();sr();ci=class r extends $t{toString(e){return`
`}isIdentical(e){return e.is(r)}invert(){return this}*experimentalExpand(e=Ze.Forwards,t=1/0){yield this}}});var At,Do=S(()=>{Xr();sr();At=class r extends $t{experimentalNISSGrouping;toString(e){return"."}isIdentical(e){return e.is(r)}invert(){return this}*experimentalExpand(e=Ze.Forwards,t=1/0){yield this}}});var bm,lp=S(()=>{bm={caretNISSNotationEnabled:!0}});function Ol(r,e){return r?parseInt(r,10):e}function cp(r){return new Js().parseAlg(r)}function wm(r){return new Js().parseMove(r)}function Rm(r){return new Js().parseQuantumMove(r)}function Jt(r,e,t){let i=r;return i[Zs]=e,i[$s]=t,i}function Tm(r,e){return Zs in r&&(e[Zs]=r[Zs]),$s in r&&(e[$s]=r[$s]),e}var _m,zb,kb,Nb,Ib,Ob,Zs,$s,Js,fp=S(()=>{wr();ap();To();Ao();ea();Ys();qr();Qs();Do();lp();_m=/^(\d+)?('?)/,zb=/^[_\dA-Za-z]/,kb=/^((([1-9]\d*)-)?([1-9]\d*))?([_A-Za-z]+)/,Nb=/^[^\n]*/,Ib=/^(-?\d+), ?/,Ob=/^(-?\d+)\)/;Zs=Symbol("startCharIndex"),$s=Symbol("endCharIndex");Js=class{#e="";#t=0;#i=[];parseAlg(e){this.#e=e,this.#t=0;let t=this.parseAlgWithStopping([]);this.mustBeAtEndOfInput();let i=Array.from(t.childAlgNodes());if(this.#i.length>0)for(let a of this.#i.reverse())i.push(a);let n=new le(i),{[Zs]:o,[$s]:s}=t;return Jt(n,o,s),n}parseMove(e){this.#e=e,this.#t=0;let t=this.parseMoveImpl();return this.mustBeAtEndOfInput(),t}parseQuantumMove(e){this.#e=e,this.#t=0;let t=this.parseQuantumMoveImpl();return this.mustBeAtEndOfInput(),t}mustBeAtEndOfInput(){if(this.#t!==this.#e.length)throw new Error("parsing unexpectedly ended early")}parseAlgWithStopping(e){let t=this.#t,i=this.#t,n=new Mn,o=!1,s=a=>{if(o)throw new Error(`Unexpected character at index ${a}. Are you missing a space?`)};for(;this.#t<this.#e.length;){let a=this.#t;if(e.includes(this.#e[this.#t]))return Jt(n.toAlg(),t,i);if(this.tryConsumeNext(" "))o=!1,n.experimentalNumAlgNodes()===0&&(t=this.#t);else if(zb.test(this.#e[this.#t])){s(a);let l=this.parseMoveImpl();n.push(l),o=!0,i=this.#t}else if(this.tryConsumeNext("(")){s(a);let l=this.tryRegex(Ib);if(l){let c=l[1],f=this.#t,u=this.parseRegex(Ob),p=Jt(new T(new Te("U_SQ_"),parseInt(c,10)),a+1,a+1+c.length),d=Jt(new T(new Te("D_SQ_"),parseInt(u[1],10)),f,this.#t-1),m=Jt(new le([p,d]),a+1,this.#t-1);n.push(Jt(new wt(m),a,this.#t)),o=!0,i=this.#t}else{let c=this.parseAlgWithStopping([")"]);this.mustConsumeNext(")");let f=this.parseAmount();n.push(Jt(new wt(c,f),a,this.#t)),o=!0,i=this.#t}}else if(this.tryConsumeNext("^")){if(!bm.caretNISSNotationEnabled)throw new Error("Alg contained a caret but caret NISS notation is not enabled.");this.mustConsumeNext("(");let l=this.parseAlgWithStopping([")"]);this.popNext();let c=new wt(l,-1),f=new At;c.experimentalNISSPlaceholder=f,f.experimentalNISSGrouping=c,this.#i.push(c),n.push(f)}else if(this.tryConsumeNext("[")){s(a);let l=this.parseAlgWithStopping([",",":"]),c=this.popNext(),f=this.parseAlgWithStopping(["]"]);this.mustConsumeNext("]");let u;switch(c){case":":{u=Jt(new _t(l,f),a,this.#t),o=!0,i=this.#t;break}case",":{u=Jt(new Ct(l,f),a,this.#t),o=!0,i=this.#t;break}default:throw new Error("unexpected parsing error")}let p=this.#t,d=this.parseAmount();if(d===1)n.push(u);else{let m=Jt(new le([u]),a,p),y=Jt(new wt(m,d),a,this.#t);n.push(y)}o=!0,i=this.#t}else if(this.tryConsumeNext(`
`))n.push(Jt(new ci,a,this.#t)),o=!1,i=this.#t;else if(this.tryConsumeNext("/"))if(this.tryConsumeNext("/")){s(a);let[l]=this.parseRegex(Nb);n.push(Jt(new Di(l),a,this.#t)),o=!1,i=this.#t}else n.push(Jt(new T("_SLASH_"),a,this.#t)),o=!0,i=this.#t;else if(this.tryConsumeNext("."))s(a),n.push(Jt(new At,a,this.#t)),o=!0,i=this.#t;else throw new Error(`Unexpected character: ${this.popNext()}`)}if(this.#t!==this.#e.length)throw new Error("did not finish parsing?");if(e.length>0)throw new Error("expected stopping");return Jt(n.toAlg(),t,i)}parseQuantumMoveImpl(){let[,,,e,t,i]=this.parseRegex(kb);return new Te(i,Ol(t,void 0),Ol(e,void 0))}parseMoveImpl(){let e=this.#t;if(this.tryConsumeNext("/"))return Jt(new T("_SLASH_"),e,this.#t);let t=this.parseQuantumMoveImpl(),[i,n]=this.parseAmountAndTrackEmptyAbsAmount(),o=this.parseMoveSuffix();if(o){if(i<0)throw new Error("uh-oh");if((o==="++"||o==="--")&&i!==1)throw new Error("Pochmann ++ or -- moves cannot have an amount other than 1.");if((o==="++"||o==="--")&&!n)throw new Error("Pochmann ++ or -- moves cannot have an amount written as a number.");if((o==="+"||o==="-")&&n)throw new Error("Clock dial moves must have an amount written as a natural number followed by + or -.");o.startsWith("+")&&(t=t.modified({family:`${t.family}_${o==="+"?"PLUS":"PLUSPLUS"}_`})),o.startsWith("-")&&(t=t.modified({family:`${t.family}_${o==="-"?"PLUS":"PLUSPLUS"}_`}),i*=-1)}return Jt(new T(t,i),e,this.#t)}parseMoveSuffix(){return this.tryConsumeNext("+")?this.tryConsumeNext("+")?"++":"+":this.tryConsumeNext("-")?this.tryConsumeNext("-")?"--":"-":null}parseAmountAndTrackEmptyAbsAmount(){let e=this.#t,[,t,i]=this.parseRegex(_m);if(t?.startsWith("0")&&t!=="0")throw new Error(`Error at char index ${e}: An amount can only start with 0 if it's exactly the digit 0.`);return[Ol(t,1)*(i==="'"?-1:1),!t]}parseAmount(){let e=this.#t,[,t,i]=this.parseRegex(_m);if(t?.startsWith("0")&&t!=="0")throw new Error(`Error at char index ${e}: An amount number can only start with 0 if it's exactly the digit 0.`);return Ol(t,1)*(i==="'"?-1:1)}parseRegex(e){let t=e.exec(this.remaining());if(t===null)throw new Error("internal parsing error");return this.#t+=t[0].length,t}tryRegex(e){let t=e.exec(this.remaining());return t===null?null:(this.#t+=t[0].length,t)}remaining(){return this.#e.slice(this.#t)}popNext(){let e=this.#e[this.#t];return this.#t++,e}tryConsumeNext(e){return this.#e[this.#t]===e?(this.#t++,!0):!1}mustConsumeNext(e){let t=this.popNext();if(t!==e)throw new Error(`expected \`${e}\` while parsing, encountered ${t}`);return t}}});function Fl(r){Am.has(r)||(console.warn(r),Am.add(r))}var Am,up=S(()=>{Am=new Set});var to,pp=S(()=>{sr();sp();to=class{quantum;amount;constructor(e,t=1){if(this.quantum=e,this.amount=t,!Number.isInteger(this.amount)||this.amount<-2147483648||this.amount>2147483647)throw new Error(`AlgNode amount absolute value must be a non-negative integer below ${js}.`)}suffix(){let e="",t=Math.abs(this.amount);return t!==1&&(e+=t),this.amount<0&&(e+="'"),e}isIdentical(e){return this.quantum.isIdentical(e.quantum)&&this.amount===e.amount}*experimentalExpand(e,t){let i=Math.abs(this.amount),n=Em(e,this.amount<0);for(let o=0;o<i;o++)yield*this.quantum.experimentalExpand(n,t)}}});var Te,T,qr=S(()=>{Xr();sr();sp();fp();up();pp();Te=class r extends qs{#e;#t;#i;constructor(e,t,i){if(super(),this.#e=e,this.#t=t??null,this.#i=i??null,Object.freeze(this),this.#t!==null&&(!Number.isInteger(this.#t)||this.#t<1||this.#t>2147483647))throw new Error(`QuantumMove inner layer must be a positive integer below ${js}.`);if(this.#i!==null&&(!Number.isInteger(this.#i)||this.#i<1||this.#i>2147483647))throw new Error(`QuantumMove outer layer must be a positive integer below ${js}.`);if(this.#i!==null&&this.#t!==null&&this.#t<=this.#i)throw new Error("QuantumMove outer layer must be smaller than inner layer.");if(this.#i!==null&&this.#t===null)throw new Error("QuantumMove with an outer layer must have an inner layer")}static fromString(e){return Rm(e)}modified(e){return new r(e.family??this.#e,e.innerLayer??this.#t,e.outerLayer??this.#i)}isIdentical(e){let t=e;return e.is(r)&&this.#e===t.#e&&this.#t===t.#t&&this.#i===t.#i}get family(){return this.#e}get outerLayer(){return this.#i}get innerLayer(){return this.#t}experimentalExpand(){throw new Error("experimentalExpand() cannot be called on a `QuantumMove` directly.")}toString(e){let t=this.#e;return this.#t!==null&&(t=String(this.#t)+t,this.#i!==null&&(t=`${String(this.#i)}-${t}`)),t}},T=class r extends $t{#e;constructor(...e){if(super(),typeof e[0]=="string")if(e[1]??null){this.#e=new to(Te.fromString(e[0]),e[1]);return}else return r.fromString(e[0]);this.#e=new to(e[0],e[1])}isIdentical(e){let t=e.as(r);return!!t&&this.#e.isIdentical(t.#e)}invert(){return Tm(this,new r(this.#e.quantum,this.#i()?this.amount:-this.amount))}*experimentalExpand(e=Ze.Forwards){e===Ze.Forwards?yield this:yield this.modified({amount:-this.amount})}get quantum(){return this.#e.quantum}modified(e){return new r(this.#e.quantum.modified(e),e.amount??this.amount)}static fromString(e){return wm(e)}get amount(){return this.#e.amount}get type(){return Fl("deprecated: type"),"blockMove"}get family(){return this.#e.quantum.family??void 0}get outerLayer(){return this.#e.quantum.outerLayer??void 0}get innerLayer(){return this.#e.quantum.innerLayer??void 0}#t;#i(){return this.isIdentical(this.#t??=new r("_SLASH_"))}toString(e){if(e?.notation!=="LGN"){if(this.#i())return"/";if(this.family.endsWith("_PLUS_"))return this.#e.quantum.toString().slice(0,-6)+Math.abs(this.amount)+(this.amount<0?"-":"+");if(this.family.endsWith("_PLUSPLUS_")){let t=Math.abs(this.amount);return this.#e.quantum.toString().slice(0,-10)+(t===1?"":t)+(this.amount<0?"--":"++")}}return this.#e.quantum.toString(e)+this.#e.suffix()}}});var hp,dp,wt,ea=S(()=>{wr();Xr();sr();Co();qr();pp();hp=class{quantumU_SQ_=null;quantumD_SQ_=null;format(e,t){if(t?.notation==="LGN"||e.amount!==1)return null;let i=this.tuple(e);return i?`(${i.map(n=>n.amount).join(", ")})`:null}tuple(e){if(e.amount!==1)return null;this.quantumU_SQ_||=new Te("U_SQ_"),this.quantumD_SQ_||=new Te("D_SQ_");let t=e.alg;if(t.experimentalNumChildAlgNodes()===2){let[i,n]=t.childAlgNodes();if(i.as(T)?.quantum.isIdentical(this.quantumU_SQ_)&&n.as(T)?.quantum.isIdentical(this.quantumD_SQ_))return[i,n]}return null}},dp=new hp,wt=class r extends $t{#e;experimentalNISSPlaceholder;constructor(e,t){super();let i=En(e);this.#e=new to(i,t)}isIdentical(e){let t=e;return e.is(r)&&this.#e.isIdentical(t.#e)}get alg(){return this.#e.quantum}get amount(){return this.#e.amount}modified(e){return new r(e.alg??this.alg,e.amount??this.amount)}get experimentalRepetitionSuffix(){return this.#e.suffix()}invert(){let e=dp.tuple(this);if(e){let[t,i]=e;return new r(new le([t.invert(),i.invert()]))}return new r(this.#e.quantum,-this.#e.amount)}*experimentalExpand(e=Ze.Forwards,t){t??=1/0,t===0?yield e===Ze.Forwards?this:this.invert():yield*this.#e.experimentalExpand(e,t-1)}static fromString(){throw new Error("unimplemented")}#t(e){let t=this.#e.quantum.toString(e),i=this.alg.childAlgNodes(),{value:n}=i.next();return i.next().done&&(n?.is(Ct)||n?.is(_t))?t:`(${t})`}toString(e){return dp.format(this,e)??`${this.#t(e)}${this.#e.suffix()}`}experimentalAsSquare1Tuple(){return dp.tuple(this)}}});var Co=S(()=>{To();Ao();ea();Ys();qr();Qs();Do()});function ar(r,e){return r instanceof e}function Dm(r){return ar(r,wt)||ar(r,Di)||ar(r,Ct)||ar(r,_t)||ar(r,T)||ar(r,ci)||ar(r,At)}var mp=S(()=>{Co()});function Cm(r,e,t){if(e.is(wt))return r.traverseGrouping(e,t);if(e.is(T))return r.traverseMove(e,t);if(e.is(Ct))return r.traverseCommutator(e,t);if(e.is(_t))return r.traverseConjugate(e,t);if(e.is(At))return r.traversePause(e,t);if(e.is(ci))return r.traverseNewline(e,t);if(e.is(Di))return r.traverseLineComment(e,t);throw new Error("unknown AlgNode")}function Lm(r){if(r.is(wt)||r.is(T)||r.is(Ct)||r.is(_t)||r.is(At)||r.is(ci)||r.is(Di))return r;throw new Error("internal error: expected AlgNode")}function Kt(r,e){let t=new r(...e??[]);return t.traverseAlg.bind(t)}var Vi,fi,gp=S(()=>{To();Ao();ea();Ys();qr();Qs();Do();Vi=class{traverseAlgNode(e,t){return Cm(this,e,t)}traverseIntoAlgNode(e,t){return Lm(this.traverseAlgNode(e,t))}},fi=class extends Vi{traverseAlgNode(e){return Cm(this,e,void 0)}traverseIntoAlgNode(e){return Lm(this.traverseAlgNode(e))}}});var Ub,Lo,yp=S(()=>{Ub="any-direction",Lo=class{config;constructor(e={}){this.config=e}cancelQuantum(){let{cancel:e}=this.config;return e===!0?Ub:e===!1?"none":e?.directional??"none"}cancelAny(){return this.config.cancel&&this.cancelQuantum()!=="none"}cancelPuzzleSpecificModWrap(){let{cancel:e}=this.config;return e===!0||e===!1?"canonical-centered":e?.puzzleSpecificModWrap?e?.puzzleSpecificModWrap:e?.directional==="same-direction"?"preserve-sign":"canonical-centered"}puzzleSpecificSimplifyOptions(){return this.config.puzzleLoader?.puzzleSpecificSimplifyOptions??this.config.puzzleSpecificSimplifyOptions}}});var xp,Sp,Pm=S(()=>{wr();To();Ao();ea();qr();Do();gp();Bl();yp();xp=class extends Vi{#e;#t(){return this.#e??=new Map}#i(e){return{...e,depth:e.depth?e.depth-1:null}}*traverseAlg(e,t){if(t.depth===0){yield*e.childAlgNodes();return}let i=[],n=this.#i(t);for(let o of e.childAlgNodes())for(let s of this.traverseAlgNode(o,n))i=Array.from(vp(new le(i),s,n).childAlgNodes());for(let o of i)yield o}*traverseGrouping(e,t){if(t.depth===0){yield e;return}if(e.amount===0)return;let i=new wt(this.traverseAlg(e.alg,this.#i(t)),e.amount);if(i.alg.experimentalIsEmpty())return;let n=this.#t().get(e);n&&(i.experimentalNISSPlaceholder=n,n.experimentalNISSGrouping=i),yield i}*traverseMove(e,t){yield e}#n(e,t,i){if(e.experimentalNumChildAlgNodes()===1&&t.experimentalNumChildAlgNodes()===1){let n=Array.from(e.childAlgNodes())[0]?.as(T),o=Array.from(t.childAlgNodes())[0]?.as(T);if(!(n&&o))return!1;if(o.quantum.isIdentical(n.quantum)||new Lo(i).puzzleSpecificSimplifyOptions()?.axis?.areQuantumMovesSameAxis(n.quantum,o.quantum))return!0}return!1}*traverseCommutator(e,t){if(t.depth===0){yield e;return}let i=this.#i(t),n=new Ct(this.traverseAlg(e.A,i),this.traverseAlg(e.B,i));n.A.experimentalIsEmpty()||n.B.experimentalIsEmpty()||n.A.isIdentical(n.B)||n.A.isIdentical(n.B.invert())||this.#n(n.A,n.B,t)||(yield n)}*traverseConjugate(e,t){if(t.depth===0){yield e;return}let i=this.#i(t),n=new _t(this.traverseAlg(e.A,i),this.traverseAlg(e.B,i));if(!n.B.experimentalIsEmpty()){if(n.A.experimentalIsEmpty()||n.A.isIdentical(n.B)||n.A.isIdentical(n.B.invert())||this.#n(n.A,n.B,t)){yield*e.B.childAlgNodes();return}yield n}}*traversePause(e,t){if(e.experimentalNISSGrouping){let i=new At;this.#t().set(e.experimentalNISSGrouping,i),yield i}else yield e}*traverseNewline(e,t){yield e}*traverseLineComment(e,t){yield e}},Sp=Kt(xp)});var Ep=S(()=>{Bl();Pm()});function zm(r){if(!r)return[];if(ar(r,le))return r.childAlgNodes();if(typeof r=="string")return cp(r).childAlgNodes();let e=r;if(typeof e[Symbol.iterator]=="function")return e;throw new Error("Invalid AlgNode")}function En(r){return ar(r,le)?r:new le(r)}function Bb(r,e){return r.is(ci)||e.is(ci)||e.as(wt)?.experimentalNISSPlaceholder?"":r.is(Di)&&!e.is(ci)?`
`:" "}var le,wr=S(()=>{Co();Ys();qr();Qs();Xr();mp();sr();fp();Ep();up();le=class r extends $t{#e;constructor(e){super(),this.#e=Array.from(zm(e));for(let t of this.#e)if(!Dm(t))throw new Error("An alg can only contain alg nodes.")}isIdentical(e){let t=e;if(!e.is(r))return!1;let i=Array.from(this.#e),n=Array.from(t.#e);if(i.length!==n.length)return!1;for(let o=0;o<i.length;o++)if(!i[o].isIdentical(n[o]))return!1;return!0}invert(){return new r(Mm(Array.from(this.#e).map(e=>e.invert())))}*experimentalExpand(e=Ze.Forwards,t){t??=1/0;for(let i of np(this.#e,e))yield*i.experimentalExpand(e,t)}expand(e){return new r(this.experimentalExpand(Ze.Forwards,e?.depth??1/0))}*experimentalLeafMoves(){for(let e of this.experimentalExpand())e.is(T)&&(yield e)}concat(e){return new r(Array.from(this.#e).concat(Array.from(zm(e))))}experimentalIsEmpty(){for(let e of this.#e)return!1;return!0}static fromString(e){return cp(e)}units(){return this.childAlgNodes()}*childAlgNodes(){for(let e of this.#e)yield e}experimentalNumUnits(){return this.experimentalNumChildAlgNodes()}experimentalNumChildAlgNodes(){return Array.from(this.#e).length}get type(){return Fl("deprecated: type"),"sequence"}toString(e){let t="",i=null;for(let n of this.#e){i&&(t+=Bb(i,n));let o=n.as(At)?.experimentalNISSGrouping;if(o){if(o.amount!==-1)throw new Error("Invalid NISS Grouping amount!");t+=`^(${o.alg.toString(e)})`}else n.as(wt)?.experimentalNISSPlaceholder||(t+=n.toString(e));i=n}return t}experimentalSimplify(e){return new r(Sp(this,e??{}))}simplify(e){return this.experimentalSimplify(e)}}});function Gb(r,e){return r*Math.sign(e.amount)>=0}function Gl(r,e,t=0){return((r-t)%e+e)%e+t}function ta(r,e,t){let i=new Lo(t),n=Array.from(r.childAlgNodes()),o=[e];function s(){return new le([...n,...o])}function a(l){if(i.cancelPuzzleSpecificModWrap()==="none")return l;let c=i.puzzleSpecificSimplifyOptions()?.quantumMoveOrder;if(!c)return l;let f=c(e.quantum),u;switch(i.cancelPuzzleSpecificModWrap()){case"gravity":{u=-Math.floor((f-(l.amount<0?0:1))/2);break}case"canonical-centered":{u=-Math.floor((f-1)/2);break}case"canonical-positive":{u=0;break}case"preserve-sign":{u=l.amount<0?1-f:0;break}default:throw new Error("Unknown mod wrap")}let p=Gl(l.amount,f,u);return l.modified({amount:p})}if(i.cancelAny()){let l,c=i.puzzleSpecificSimplifyOptions()?.axis;if(c)l=m=>c.areQuantumMovesSameAxis(e.quantum,m.quantum);else{let m=e.quantum.toString();l=y=>y.quantum.toString()===m}let f=i.cancelQuantum()==="same-direction",u=new Map;u.set(e.quantum.toString(),Math.sign(e.amount));let p;for(p=n.length-1;p>=0;p--){let m=n[p].as(T);if(!m||!l(m))break;let y=m.quantum.toString();if(f){let g=u.get(y);if(g&&!Gb(g,m))break;u.set(y,Math.sign(m.amount))}}let d=[...n.splice(p+1),e];if(c)o=c.simplifySameAxisMoves(d,i.cancelPuzzleSpecificModWrap()!=="none");else{let m=d.reduce((y,g)=>y+g.amount,0);if(u.size!==1)throw new Error("Internal error: multiple quantums when one was expected");o=[new T(e.quantum,m)]}}return o=o.map(l=>a(l)).filter(l=>l.amount!==0),s()}function vp(r,e,t){let i=e.as(T);return i?ta(r,i,t):new le([...r.childAlgNodes(),e])}var Bl=S(()=>{wr();qr();yp()});var Rr,na=S(()=>{Rr=class{#e=0;#t=0;queue(e){return new Promise(async(t,i)=>{try{let n=++this.#e,o=await e;n>this.#t&&(this.#t=n,t(o))}catch(n){i(n)}})}}});var Tr,Po=S(()=>{Tr=class{#e;constructor(r){this.#e=r}#t;async#i(){return this.#t??=Promise.resolve(this.#e())}async then(r,e){return this.#i().then(r,e)}catch(r){return this.#i().catch(r)}async finally(r){return this.#i().finally(r)}get[Symbol.toStringTag](){return"LazyPromise"}}});var km,Hl,yi,Le,jr,qe,Hi,be=S(()=>{Po();na();km=0,Hl=class{canReuse(e,t){return e===t||this.canReuseValue(e,t)}canReuseValue(e,t){return!1}debugGetChildren(){return Array.from(this.#e.values())}#e=new Set;addChild(e){this.#e.add(e)}removeChild(e){this.#e.delete(e)}lastSourceGeneration=0;markStale(e){if(e.detail.generation!==km)throw new Error("A TwistyProp was marked stale too late!");if(this.lastSourceGeneration!==e.detail.generation){this.lastSourceGeneration=e.detail.generation;for(let t of this.#e)t.markStale(e);this.#i()}}#t=new Set;addRawListener(e,t){this.#t.add(e),t?.initial&&e()}removeRawListener(e){this.#t.delete(e)}#i(){this.#n||(this.#n=!0,setTimeout(()=>this.#o(),0))}#n=!1;#o(){if(!this.#n)throw new Error("Invalid dispatch state!");for(let e of this.#t)e();this.#n=!1}#r=new Map;addFreshListener(e){let t=new Rr,i=null,n=async()=>{let o=await t.queue(this.get());i!==null&&this.canReuse(i,o)||(i=o,e(o))};this.#r.set(e,n),this.addRawListener(n,{initial:!0})}removeFreshListener(e){this.removeRawListener(this.#r.get(e)),this.#r.delete(e)}},yi=class extends Hl{#e;constructor(e){super(),this.#e=new Tr(async()=>this.getDefaultValue()),e&&(this.#e=this.deriveFromPromiseOrValue(e,this.#e))}set(e){this.#e=this.deriveFromPromiseOrValue(e,this.#e);let t={sourceProp:this,value:this.#e,generation:++km};this.markStale(new CustomEvent("stale",{detail:t}))}async get(){return this.#e}async deriveFromPromiseOrValue(e,t){return this.derive(await e,t)}},Le=class extends yi{derive(e){return e}},jr=Symbol("no value"),qe=class extends Hl{#e;userVisibleErrorTracker;constructor(e,t){super(),this.userVisibleErrorTracker=t,this.#e=e;for(let i of Object.values(e))i.addChild(this)}#t=null;#i=null;async get(){let e=this.lastSourceGeneration;if(this.#i?.generation===e)return this.#i.output;let t={generation:e,output:this.#o(this.#n(),e,this.#t)};return this.#i=t,this.userVisibleErrorTracker?.reset(),t.output}async#n(){let e={};for(let[i,n]of Object.entries(this.#e))e[i]=n.get();let t={};for(let i in this.#e)t[i]=await e[i];return t}async#o(e,t,i=null){let n=await e,o=a=>(this.#t={inputs:n,output:Promise.resolve(a),generation:t},a);if(!i)return o(await this.derive(n));let s=i.inputs;for(let a in this.#e)if(!this.#e[a].canReuse(n[a],s[a]))return o(await this.derive(n));return i.output}},Hi=class{#e=[];addListener(e,t){let i=!1,n=o=>{i||t(o)};e.addFreshListener(n),this.#e.push(()=>{e.removeFreshListener(n),i=!0})}addMultiListener3(e,t){this.addMultiListener(e,t)}addMultiListener(e,t){let i=!1,n=e.length-1,o=async s=>{if(n>0){n--;return}if(i)return;let a=e.map(c=>c.get()),l=await Promise.all(a);t(l)};for(let s of e)s.addFreshListener(o);this.#e.push(()=>{for(let s of e)s.removeFreshListener(o);i=!0})}disconnect(){for(let e of this.#e)e()}}});var Im,Vb,Om=S(()=>{Im={333:{puzzleID:"3x3x3",eventName:"3x3x3 Cube",scramblesImplemented:"random-state"},222:{puzzleID:"2x2x2",eventName:"2x2x2 Cube",scramblesImplemented:"random-state"},444:{puzzleID:"4x4x4",eventName:"4x4x4 Cube",scramblesImplemented:"random-state"},555:{puzzleID:"5x5x5",eventName:"5x5x5 Cube",scramblesImplemented:"random-moves"},666:{puzzleID:"6x6x6",eventName:"6x6x6 Cube",scramblesImplemented:"random-moves"},777:{puzzleID:"7x7x7",eventName:"7x7x7 Cube",scramblesImplemented:"random-moves"},"333bf":{puzzleID:"3x3x3",eventName:"3x3x3 Blindfolded",scramblesImplemented:"random-state"},"333fm":{puzzleID:"3x3x3",eventName:"3x3x3 Fewest Moves",scramblesImplemented:"random-state"},"333oh":{puzzleID:"3x3x3",eventName:"3x3x3 One-Handed",scramblesImplemented:"random-state"},clock:{puzzleID:"clock",eventName:"Clock",scramblesImplemented:"random-state"},minx:{puzzleID:"megaminx",eventName:"Megaminx",scramblesImplemented:"random-moves"},pyram:{puzzleID:"pyraminx",eventName:"Pyraminx",scramblesImplemented:"random-state"},skewb:{puzzleID:"skewb",eventName:"Skewb",scramblesImplemented:"random-state"},sq1:{puzzleID:"square1",eventName:"Square-1",scramblesImplemented:"random-state"},"444bf":{puzzleID:"4x4x4",eventName:"4x4x4 Blindfolded",scramblesImplemented:"random-state"},"555bf":{puzzleID:"5x5x5",eventName:"5x5x5 Blindfolded",scramblesImplemented:"random-moves"},"333mbf":{puzzleID:"3x3x3",eventName:"3x3x3 Multi-Blind",scramblesImplemented:"random-state"}},Vb={...Im,fto:{puzzleID:"fto",eventName:"Face-Turning Octahedron",scramblesImplemented:"random-state"},master_tetraminx:{puzzleID:"master_tetraminx",eventName:"Master Tetraminx",scramblesImplemented:"random-state"},kilominx:{puzzleID:"kilominx",eventName:"Kilominx",scramblesImplemented:"random-state"},redi_cube:{puzzleID:"redi_cube",eventName:"Redi Cube",scramblesImplemented:"random-state"},baby_fto:{puzzleID:"baby_fto",eventName:"Baby FTO",scramblesImplemented:"random-state"},loopover:{puzzleID:"loopover",eventName:"Loopover",scramblesImplemented:null}}});var Wb,Fm=S(()=>{wr();To();Ao();Co();qr();Do();Wb={Sune:new le([new T("R",1),new T("U",1),new T("R",-1),new T("U",1),new T("R",1),new T("U",-2),new T("R",-1)]),AntiSune:new le([new T("R",1),new T("U",2),new T("R",-1),new T("U",-1),new T("R",1),new T("U",-1),new T("R",-1)]),SuneCommutator:new le([new Ct(new le([new T("R",1),new T("U",1),new T("R",-2)]),new le([new _t(new le([new T("R",1)]),new le([new T("U",1)]))]))]),Niklas:new le([new T("R",1),new T("U",-1),new T("L",-1),new T("U",1),new T("R",-1),new T("U",-1),new T("L",1),new T("U",1)]),EPerm:new le([new T("x",-1),new Ct(new le([new _t(new le([new T("R",1)]),new le([new T("U",-1)]))]),new le([new T("D",1)])),new Ct(new le([new _t(new le([new T("R",1)]),new le([new T("U",1)]))]),new le([new T("D",1)])),new T("x",1)]),FURURFCompact:new le([new _t(new le([new T("F",1)]),new le([new Ct(new le([new T("U",1)]),new le([new T("R",1)]))]))]),APermCompact:new le([new _t(new le([new T("R",2)]),new le([new Ct(new le([new T("F",2)]),new le([new T("R",-1),new T("B",-1),new T("R",1)]))]))]),FURURFMoves:new le([new T("F",1),new T("U",1),new T("R",1),new T("U",-1),new T("R",-1),new T("F",-1)]),TPerm:new le([new T("R",1),new T("U",1),new T("R",-1),new T("U",-1),new T("R",-1),new T("F",1),new T("R",2),new T("U",-1),new T("R",-1),new T("U",-1),new T("R",1),new T("U",1),new T("R",-1),new T("F",-1)]),HeadlightSwaps:new le([new _t(new le([new T("F",1)]),new le([new wt(new le([new Ct(new le([new T("R",1)]),new le([new T("U",1)]))]),3)]))]),TriplePause:new le([new At,new At,new At])}});var Um=S(()=>{});var Bm=S(()=>{});var ot=S(()=>{wr();ap();Co();lp();Fm();mp();Um();Ep();gp();Bm()});function sa(r,e,t){let i={};for(let n of r.orbits){let o=e[n.orbitName],s=t[n.orbitName];if(oa(n.numOrientations,s))i[n.orbitName]=o;else if(oa(n.numOrientations,o))i[n.orbitName]=s;else{let a=new Array(n.numPieces);if(n.numOrientations===1){for(let l=0;l<n.numPieces;l++)a[l]=o.permutation[s.permutation[l]];i[n.orbitName]={permutation:a,orientationDelta:o.orientationDelta}}else{let l=new Array(n.numPieces);for(let c=0;c<n.numPieces;c++)l[c]=(o.orientationDelta[s.permutation[c]]+s.orientationDelta[c])%n.numOrientations,a[c]=o.permutation[s.permutation[c]];i[n.orbitName]={permutation:a,orientationDelta:l}}}}return i}function _p(r,e,t){let i={};for(let n of r.orbits){let o=e[n.orbitName],s=t[n.orbitName];if(oa(n.numOrientations,s))i[n.orbitName]=o;else{let a=new Array(n.numPieces);if(n.numOrientations===1){for(let c=0;c<n.numPieces;c++)a[c]=o.pieces[s.permutation[c]];let l={pieces:a,orientation:o.orientation};i[n.orbitName]=l}else{let l=new Array(n.numPieces),c=o.orientationMod?new Array(n.numPieces):void 0;for(let u=0;u<n.numPieces;u++){let p=s.permutation[u],d=n.numOrientations;if(o.orientationMod){let m=o.orientationMod[p];c[u]=m,d=m||n.numOrientations}l[u]=(o.orientation[p]+s.orientationDelta[u])%d,a[u]=o.pieces[p]}let f={pieces:a,orientation:l};c&&(f.orientationMod=c),i[n.orbitName]=f}}}return i}var Xl=S(()=>{zo()});function Hb(r){let e=Gm.get(r);if(e)return e;let t=new Array(r),i=new Array(r);for(let o=0;o<r;o++)t[o]=o,i[o]=0;let n={permutation:t,orientationDelta:i};return Vm&&(Object.freeze(t),Object.freeze(i),Object.freeze(n)),Gm.set(r,n),n}function Wm(r){let e={};for(let t of r.orbits)e[t.orbitName]=Hb(t.numPieces);return Vm&&Object.freeze(e),e}function Hm(r,e){function t(n,o){let s=n.toString(),a=r.definition.moves[s];if(a)return bn(r,a,o);let l=r.definition.derivedMoves?.[s];if(l)return bn(r,r.algToTransformation(l).transformationData,o)}let i=t(e.quantum,e.amount)??t(e,1)??t(e.invert,-1);if(i)return i;throw new Error(`Invalid move for KPuzzle (${r.name()}): ${e}`)}var Vm,Gm,wp=S(()=>{zo();Vm=!1,Gm=new Map});var Ki,aa=S(()=>{zo();Xl();wp();ql();Ki=class r{kpuzzle;transformationData;constructor(e,t){this.kpuzzle=e,this.transformationData=t}toJSON(){return{experimentalPuzzleName:this.kpuzzle.name(),transformationData:this.transformationData}}invert(){return new r(this.kpuzzle,Rp(this.kpuzzle,this.transformationData))}#e;isIdentityTransformation(){return this.#e??=this.isIdentical(this.kpuzzle.identityTransformation())}static experimentalConstructIdentity(e){let t=new r(e,Wm(e.definition));return t.#e=!0,t}isIdentical(e){return Km(this.kpuzzle,this.transformationData,e.transformationData)}apply(e){return this.applyTransformation(this.kpuzzle.toTransformation(e))}applyTransformation(e){if(this.kpuzzle!==e.kpuzzle)throw new Error(`Tried to apply a transformation for a KPuzzle (${e.kpuzzle.name()}) to a different KPuzzle (${this.kpuzzle.name()}).`);return this.#e?new r(this.kpuzzle,e.transformationData):e.#e?new r(this.kpuzzle,this.transformationData):new r(this.kpuzzle,sa(this.kpuzzle.definition,this.transformationData,e.transformationData))}applyMove(e){return this.applyTransformation(this.kpuzzle.moveToTransformation(e))}applyAlg(e){return this.applyTransformation(this.kpuzzle.algToTransformation(e))}toKPattern(){return Ar.fromTransformation(this)}repetitionOrder(){return Xm(this.kpuzzle.definition,this)}selfMultiply(e){return new r(this.kpuzzle,bn(this.kpuzzle,this.transformationData,e))}}});function oa(r,e){e.permutation||console.log(e);let{permutation:t}=e,i=t.length;for(let n=0;n<i;n++)if(t[n]!==n)return!1;if(r>1){let{orientationDelta:n}=e;for(let o=0;o<i;o++)if(n[o]!==0)return!1}return!0}function Kb(r,e,t,i={}){for(let n=0;n<r.numPieces;n++)if(!i?.ignorePieceOrientations&&e.orientationDelta[n]!==t.orientationDelta[n]||!i?.ignorePiecePermutation&&e.permutation[n]!==t.permutation[n])return!1;return!0}function Km(r,e,t){for(let i of r.definition.orbits)if(!Kb(i,e[i.orbitName],t[i.orbitName]))return!1;return!0}function Xb(r,e,t,i={}){for(let n=0;n<r.numPieces;n++)if(!i?.ignorePieceOrientations&&(e.orientation[n]!==t.orientation[n]||(e.orientationMod?.[n]??0)!==(t.orientationMod?.[n]??0))||!i?.ignorePieceIndices&&e.pieces[n]!==t.pieces[n])return!1;return!0}function qm(r,e,t){for(let i of r.definition.orbits)if(!Xb(i,e[i.orbitName],t[i.orbitName]))return!1;return!0}function Rp(r,e){let t={};for(let i of r.definition.orbits){let n=e[i.orbitName];if(oa(i.numOrientations,n))t[i.orbitName]=n;else if(i.numOrientations===1){let o=new Array(i.numPieces);for(let s=0;s<i.numPieces;s++)o[n.permutation[s]]=s;t[i.orbitName]={permutation:o,orientationDelta:n.orientationDelta}}else{let o=new Array(i.numPieces),s=new Array(i.numPieces);for(let a=0;a<i.numPieces;a++){let l=n.permutation[a];o[l]=a,s[l]=(i.numOrientations-n.orientationDelta[a]+i.numOrientations)%i.numOrientations}t[i.orbitName]={permutation:o,orientationDelta:s}}}return t}function bn(r,e,t){if(t===1)return e;if(t<0)return bn(r,Rp(r,e),-t);if(t===0){let{transformationData:o}=r.identityTransformation();return o}let i=e;t!==2&&(i=bn(r,e,Math.floor(t/2)));let n=sa(r.definition,i,i);return t%2===0?n:sa(r.definition,e,n)}function Ap(r,e){return e?Ap(e,r%e):r}function Xm(r,e){let t=1;for(let i of r.orbits){let n=e.transformationData[i.orbitName],o=new Array(i.numPieces);for(let s=0;s<i.numPieces;s++)if(!o[s]){let a=s,l=0,c=0;for(;o[a]=!0,l=l+n.orientationDelta[a],c=c+1,a=n.permutation[a],a!==s;);l!==0&&(c=c*i.numOrientations/Ap(i.numOrientations,Math.abs(l))),t=t*c/Ap(t,c)}}return t}var Tp,jm,zo=S(()=>{ot();Xl();aa();Tp=class extends Vi{traverseAlg(e,t){let i=null;for(let n of e.childAlgNodes())i?i=i.applyTransformation(this.traverseAlgNode(n,t)):i=this.traverseAlgNode(n,t);return i??t.identityTransformation()}traverseGrouping(e,t){let i=this.traverseAlg(e.alg,t);return new Ki(t,bn(t,i.transformationData,e.amount))}traverseMove(e,t){return t.moveToTransformation(e)}traverseCommutator(e,t){let i=this.traverseAlg(e.A,t),n=this.traverseAlg(e.B,t);return i.applyTransformation(n).applyTransformation(i.invert()).applyTransformation(n.invert())}traverseConjugate(e,t){let i=this.traverseAlg(e.A,t),n=this.traverseAlg(e.B,t);return i.applyTransformation(n).applyTransformation(i.invert())}traversePause(e,t){return t.identityTransformation()}traverseNewline(e,t){return t.identityTransformation()}traverseLineComment(e,t){return t.identityTransformation()}},jm=Kt(Tp)});var Ar,ql=S(()=>{zo();Xl();aa();Ar=class r{kpuzzle;patternData;constructor(e,t){this.kpuzzle=e,this.patternData=t}toJSON(){return{experimentalPuzzleName:this.kpuzzle.name(),patternData:this.patternData}}static fromTransformation(e){let t=_p(e.kpuzzle.definition,e.kpuzzle.definition.defaultPattern,e.transformationData);return new r(e.kpuzzle,t)}apply(e){return this.applyTransformation(this.kpuzzle.toTransformation(e))}applyTransformation(e){if(e.isIdentityTransformation())return new r(this.kpuzzle,this.patternData);let t=_p(this.kpuzzle.definition,this.patternData,e.transformationData);return new r(this.kpuzzle,t)}applyMove(e){return this.applyTransformation(this.kpuzzle.moveToTransformation(e))}applyAlg(e){return this.applyTransformation(this.kpuzzle.algToTransformation(e))}isIdentical(e){return qm(this.kpuzzle,this.patternData,e.patternData)}experimentalToTransformation(){if(!this.kpuzzle.canConvertDefaultPatternToUniqueTransformation())return null;let e={};for(let[t,i]of Object.entries(this.patternData)){let n={permutation:i.pieces,orientationDelta:i.orientation};e[t]=n}return new Ki(this.kpuzzle,e)}experimentalIsSolved(e){if(!this.kpuzzle.definition.experimentalIsPatternSolved)throw new Error("`KPattern.experimentalIsPatternSolved()` is not supported for this puzzle at the moment.");return this.kpuzzle.definition.experimentalIsPatternSolved(this,e)}}});var It,Ym=S(()=>{ot();zo();wp();ql();aa();It=class{definition;experimentalPGNotation;constructor(e,t){this.definition=e,this.experimentalPGNotation=t?.experimentalPGNotation}#e;lookupOrbitDefinition(e){return this.#e||=(()=>{let t={};for(let i of this.definition.orbits)t[i.orbitName]=i;return t})(),this.#e[e]}name(){return this.definition.name}identityTransformation(){return Ki.experimentalConstructIdentity(this)}#t=new Map;moveToTransformation(e){typeof e=="string"&&(e=new T(e));let t=e.toString(),i=this.#t.get(t);if(i)return new Ki(this,i);if(this.experimentalPGNotation){let o=this.experimentalPGNotation.lookupMove(e);if(!o)throw new Error(`could not map to internal move: ${e}`);return this.#t.set(t,o),new Ki(this,o)}let n=Hm(this,e);return this.#t.set(t,n),new Ki(this,n)}algToTransformation(e){return typeof e=="string"&&(e=new le(e)),jm(e,this)}toTransformation(e){return typeof e=="string"?this.algToTransformation(e):e?.is?.(le)?this.algToTransformation(e):e?.is?.(T)?this.moveToTransformation(e):e}defaultPattern(){return new Ar(this,this.definition.defaultPattern)}#i;canConvertDefaultPatternToUniqueTransformation(){return this.#i??=(()=>{for(let e of this.definition.orbits){let t=new Array(e.numPieces).fill(!1);for(let i of this.definition.defaultPattern[e.orbitName].pieces)t[i]=!0;for(let i of t)if(!i)return!1}return!0})()}}});var Xi=S(()=>{ql();Ym();aa()});function He(r){let e=new Tr(r);return()=>e}var ei=S(()=>{Po()});var jl,Qm=S(()=>{jl={name:"3x3x3",orbits:[{orbitName:"EDGES",numPieces:12,numOrientations:2},{orbitName:"CORNERS",numPieces:8,numOrientations:3},{orbitName:"CENTERS",numPieces:6,numOrientations:4}],defaultPattern:{EDGES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{pieces:[0,1,2,3,4,5],orientation:[0,0,0,0,0,0],orientationMod:[1,1,1,1,1,1]}},moves:{U:{EDGES:{permutation:[1,2,3,0,4,5,6,7,8,9,10,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[1,0,0,0,0,0]}},y:{EDGES:{permutation:[1,2,3,0,5,6,7,4,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,7,4,5,6],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientationDelta:[1,0,0,0,0,3]}},x:{EDGES:{permutation:[4,8,0,9,6,10,2,11,5,7,1,3],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,3,5,7,6,2,1],orientationDelta:[2,1,2,1,1,2,1,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientationDelta:[0,3,0,1,2,2]}},L:{EDGES:{permutation:[0,1,2,11,4,5,6,9,8,3,10,7],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientationDelta:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,1,0,0,0,0]}},F:{EDGES:{permutation:[9,1,2,3,8,5,6,7,0,4,10,11],orientationDelta:[1,0,0,0,1,0,0,0,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientationDelta:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,1,0,0,0]}},R:{EDGES:{permutation:[0,8,2,3,4,10,6,7,5,9,1,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientationDelta:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,1,0,0]}},B:{EDGES:{permutation:[0,1,10,3,4,5,11,7,8,9,6,2],orientationDelta:[0,0,1,0,0,0,1,0,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientationDelta:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,0,1,0]}},D:{EDGES:{permutation:[0,1,2,3,7,4,5,6,8,9,10,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,0,0,1]}},z:{EDGES:{permutation:[9,3,11,7,8,1,10,5,0,4,2,6],orientationDelta:[1,1,1,1,1,1,1,1,1,1,1,1]},CORNERS:{permutation:[3,2,6,5,0,4,7,1],orientationDelta:[1,2,1,2,2,1,2,1]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,1,1,3,1]}},M:{EDGES:{permutation:[2,1,6,3,0,5,4,7,8,9,10,11],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientationDelta:[2,0,0,0,2,0]}},E:{EDGES:{permutation:[0,1,2,3,4,5,6,7,9,11,8,10],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientationDelta:[0,0,0,0,0,0]}},S:{EDGES:{permutation:[0,3,2,7,4,1,6,5,8,9,10,11],orientationDelta:[0,1,0,1,0,1,0,1,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,0,1,0,1]}},u:{EDGES:{permutation:[1,2,3,0,4,5,6,7,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientationDelta:[1,0,0,0,0,0]}},l:{EDGES:{permutation:[2,1,6,11,0,5,4,9,8,3,10,7],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientationDelta:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientationDelta:[2,1,0,0,2,0]}},f:{EDGES:{permutation:[9,3,2,7,8,1,6,5,0,4,10,11],orientationDelta:[1,1,0,1,1,1,0,1,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientationDelta:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,1,1,0,1]}},r:{EDGES:{permutation:[4,8,0,3,6,10,2,7,5,9,1,11],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientationDelta:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientationDelta:[0,0,0,1,2,2]}},b:{EDGES:{permutation:[0,5,10,1,4,7,11,3,8,9,6,2],orientationDelta:[0,1,1,1,0,1,1,1,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientationDelta:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[3,0,2,5,4,1],orientationDelta:[3,3,0,3,1,3]}},d:{EDGES:{permutation:[0,1,2,3,7,4,5,6,9,11,8,10],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientationDelta:[0,0,0,0,0,1]}}},derivedMoves:{Uw:"u",Lw:"l",Fw:"f",Rw:"r",Bw:"b",Dw:"d",Uv:"y",Lv:"x'",Fv:"z",Rv:"x",Bv:"z'",Dv:"y'","2U":"u U'","2L":"l L'","2F":"f F'","2R":"r R'","2B":"b B'","2D":"d D'"}}});function Dp(r){let e=r.patternData.CENTERS.pieces[0],t=r.patternData.CENTERS.pieces[5],i=r.patternData.CENTERS.pieces[1],n=i;return e<i&&n--,t<i&&n--,[e,n]}function $m(){if(!qb){let r=["","z","x","z'","x'","x2"].map(t=>le.fromString(t)),e=new le("y");for(let t of r){let i=Yl.algToTransformation(t);for(let n=0;n<4;n++){i=i.applyAlg(e);let[o,s]=Dp(i.toKPattern());Zm[o][s]=i.invert()}}}return Zm}function Jm(r){let[e,t]=Dp(r),i=$m()[e][t];return r.applyTransformation(i)}function Cp(r,e){return e.ignorePuzzleOrientation&&(r=Jm(r)),e.ignoreCenterOrientation&&(r=new Ar(r.kpuzzle,{EDGES:r.patternData.EDGES,CORNERS:r.patternData.CORNERS,CENTERS:{pieces:r.patternData.CENTERS.pieces,orientation:new Array(6).fill(0)}})),!!r.experimentalToTransformation()?.isIdentityTransformation()}var Zm,qb,Lp=S(()=>{ot();Xi();qi();Zm=new Array(6).fill(0).map(()=>new Array(6)),qb=!1});async function Pp(r){let e=await(r.puzzleSpecificSimplifyOptions??r.puzzleSpecificSimplifyOptionsPromise);return e?{puzzleLoader:{puzzleSpecificSimplifyOptions:e}}:{}}var e0=S(()=>{});var zp,jb,t0=S(()=>{ot();zp=class extends Vi{traverseAlg(e,t){let i=[];for(let n of e.childAlgNodes())i.push(this.traverseAlgNode(n,t));return new le(i)}traverseGrouping(e,t){return e.modified({alg:this.traverseAlg(e.alg,t)})}traverseMove(e,t){let i=(()=>{let{invertExceptByFamily:n}=t;return n?!n.has(e.family):!1})();return e.modified({amount:i?-e.amount:e.amount,family:t.replaceMovesByFamily[e.family]??e.family})}traverseCommutator(e,t){return new Ct(this.traverseAlg(e.A,t),this.traverseAlg(e.B,t))}traverseConjugate(e,t){return new _t(this.traverseAlg(e.A,t),this.traverseAlg(e.B,t))}traversePause(e,t){return e}traverseNewline(e,t){return e}traverseLineComment(e,t){return e}},jb=Kt(zp)});function i0(){return{4:{F:Oe.Green,D:Oe.Yellow,L:Oe.Red,R:Oe.Blue},6:{U:Oe.White,F:Oe.Green,R:Oe.Red,D:Oe.Yellow,B:Oe.Blue,L:Oe.Orange},8:{U:Oe.White,F:Oe.Green,R:Oe.Red,D:Oe.Yellow,BB:Oe.Blue,L:Oe.Purple,BL:Oe.Orange,BR:Oe.MediumGray},12:{U:Oe.White,F:Oe.DarkGreen,R:Oe.Red,C:Oe.Cream,A:Oe.Aqua,L:Oe.Purple,E:Oe.Pink,BF:Oe.Lime,BR:Oe.BoldBlue,BL:Oe.Yellow,I:Oe.Orange,D:Oe.MediumGray},20:{R:Oe.Yellow,C:Oe.Cerise,F:Oe.DarkGreen,E:Oe.DarkGray,L:Oe.Purple,U:Oe.White,A:Oe.Teal,G:Oe.Red,I:Oe.Brown,S:Oe.Lavender,H:Oe.Aqua,J:Oe.SeaGreen,B:Oe.Green,K:Oe.Cream,D:Oe.LightGray,M:Oe.Pink,O:Oe.harcoal,P:Oe.Orange,N:Oe.Burgundy,Q:Oe.BoldBlue}}}var Oe,r0=S(()=>{Oe={White:"#ffffff",Orange:"#ff8000",Green:"#44ee00",Red:"#ff0000",Blue:"#2266ff",Yellow:"#f4f400",LightGray:"#aaaaaa",MediumGray:"#888888",DarkGray:"#5c5c5c",Purple:"#8800dd",Cream:"#e8d0a0",Pink:"#ff66cc",BoldBlue:"#0000ff",Aqua:"#3399ff",DarkGreen:"#008800",Lime:"#99ff00",Teal:"#007a89",Brown:"#7d3b11",Lavender:"#b9a1ff",SeaGreen:"#5ec4b6",harcoal:"#292929",Burgundy:"#980000",Cerise:"#d41f69"}});var ko,n0=S(()=>{ko=class{prefixFree=!0;gripnames=[];facenames;constructor(e,t){this.facenames=e,t&&(this.gripnames=t);for(let i=0;this.prefixFree&&i<e.length;i++)for(let n=0;this.prefixFree&&n<e.length;n++)i!==n&&e[i].startsWith(e[n])&&(this.prefixFree=!1)}setGripNames(e){this.gripnames=e}splitByFaceNames(e){let t=[],i=0;for(;i<e.length;){i>0&&i<e.length&&e[i]==="_"&&i++;let n=-1;for(let o=0;o<this.facenames.length;o++)e.substr(i).startsWith(this.facenames[o])&&(n<0||this.facenames[o].length>this.facenames[n].length)&&(n=o);if(n>=0)t.push(n),i+=this.facenames[n].length;else throw new Error(`Could not split ${e} into face names.`)}return t}joinByFaceIndices(e){let t="",i=[];for(let n=0;n<e.length;n++)i.push(t),i.push(this.facenames[e[n]]),this.prefixFree||(t="_");return i.join("")}spinmatch(e,t){if(e===t)return!0;try{let i=this.splitByFaceNames(e),n=this.splitByFaceNames(t);if(i.length!==n.length&&i.length<3)return!1;for(let o=0;o<i.length;o++){for(let a=0;a<o;a++)if(i[o]===i[a])return!1;let s=!1;for(let a=0;a<n.length;a++)if(i[o]===n[a]){s=!0;break}if(!s)return!1}return!0}catch{return!1}}spinmatchv(e,t){return e.endsWith("v")&&t.endsWith("v")?this.spinmatch(e.slice(0,e.length-1),t.slice(0,t.length-1)):this.spinmatch(e,t)}unswizzle(e){(e.endsWith("v")||e.endsWith("w"))&&e[0]<="Z"&&(e=e.slice(0,e.length-1));let t=e.toUpperCase();for(let i=0;i<this.gripnames.length;i++){let n=this.gripnames[i];if(this.spinmatch(t,n))return n}return e}}});var No,o0=S(()=>{ot();No=class{internalNames;externalNames;constructor(e,t){this.internalNames=e,this.externalNames=t}convertString(e,t,i){let n="";(e.endsWith("v")||e.endsWith("v"))&&e<="_"&&(n=e.slice(e.length-1),e=e.slice(0,e.length-1));let o=e.toUpperCase(),s=!1;return e!==o&&(s=!0,e=o),e=i.joinByFaceIndices(t.splitByFaceNames(e)),s&&(e=e.toLowerCase()),e+n}convert(e,t,i){let n=e.family,o=this.convertString(n,t,i);return n===o?e:new T(new Te(o,e.innerLayer,e.outerLayer),e.amount)}notationToInternal(e){return this.convert(e,this.externalNames,this.internalNames)}notationToExternal(e){return this.convert(e,this.internalNames,this.externalNames)}}});var la,s0=S(()=>{ot();la=class{child;sw;constructor(e,t){this.child=e,this.sw=t}notationToInternal(e){return e.family==="T"&&e.innerLayer===void 0&&e.outerLayer===void 0?new T(new Te("FLRv",e.innerLayer,e.outerLayer),e.amount):this.child.notationToInternal(e)}notationToExternal(e){let t=e.family;return t.length>0&&t[t.length-1]==="v"&&(t=t.substring(0,t.length-1)),this.sw.spinmatch(t,"FLUR")?new T(new Te("T",e.innerLayer,e.outerLayer),e.amount):this.child.notationToExternal(e)}}});var ca,a0=S(()=>{ot();ca=class{child;constructor(e){this.child=e}notationToInternal(e){if(e.innerLayer===void 0&&e.outerLayer===void 0){if(Math.abs(e.amount)===1){if(e.family==="R++")return new T(new Te("L",3,2),-2*e.amount);if(e.family==="R--")return new T(new Te("L",3,2),2*e.amount);if(e.family==="D++")return new T(new Te("U",3,2),-2*e.amount);if(e.family==="D--")return new T(new Te("U",3,2),2*e.amount);if(e.family==="R_PLUSPLUS_")return new T(new Te("L",3,2),-2*e.amount);if(e.family==="D_PLUSPLUS_")return new T(new Te("U",3,2),-2*e.amount)}if(e.family==="y")return new T("Uv",e.amount);if(e.family==="x"&&Math.abs(e.amount)===2)return new T("ERv",e.amount/2)}return this.child.notationToInternal(e)}notationToExternal(e){return e.family==="ERv"&&Math.abs(e.amount)===1?new T(new Te("x",e.innerLayer,e.outerLayer),e.amount*2):e.family==="ILv"&&Math.abs(e.amount)===1?new T(new Te("x",e.innerLayer,e.outerLayer),-e.amount*2):e.family==="Uv"?new T(new Te("y",e.innerLayer,e.outerLayer),e.amount):e.family==="Dv"?new T("y",-e.amount):this.child.notationToExternal(e)}}});var io,l0=S(()=>{io=class{notationToInternal(e){return e}notationToExternal(e){return e}}});var fa,c0=S(()=>{ot();fa=class{slices;constructor(e){this.slices=e}notationToInternal(e){let t=e.family;return e.innerLayer||e.outerLayer||(t==="x"?e=new T("Rv",e.amount):t==="y"?e=new T("Uv",e.amount):t==="z"&&(e=new T("Fv",e.amount)),(this.slices&1)===1&&(t==="E"?e=new T(new Te("D",(this.slices+1)/2),e.amount):t==="M"?e=new T(new Te("L",(this.slices+1)/2),e.amount):t==="S"&&(e=new T(new Te("F",(this.slices+1)/2),e.amount))),this.slices>2&&(t==="e"?e=new T(new Te("D",this.slices-1,2),e.amount):t==="m"?e=new T(new Te("L",this.slices-1,2),e.amount):t==="s"&&(e=new T(new Te("F",this.slices-1,2),e.amount)))),e}notationToExternal(e){let t=e.family;if(!(e.innerLayer||e.outerLayer)){if(t==="Rv")return new T("x",e.amount);if(t==="Uv")return new T("y",e.amount);if(t==="Fv")return new T("z",e.amount);if(t==="Lv")return new T("x",-e.amount);if(t==="Dv")return new T("y",-e.amount);if(t==="Bv")return new T("z",-e.amount)}return e}}});var Yb,Qb,f0,u0,p0,Io,ua,d0=S(()=>{ot();Yb={U:"frl",L:"fld",R:"fdr",B:"dlr",u:"FRL",l:"FLD",r:"FDR",b:"DLR",Uv:"FRLv",Lv:"FLDv",Rv:"FDRv",Bv:"DLRv",D:"D",F:"F",BL:"L",BR:"R"},Qb={U:"FRL",L:"FLD",R:"FDR",B:"DLR",u:"frl",l:"fld",r:"fdr",b:"dlr",Uv:"FRLv",Lv:"FLDv",Rv:"FDRv",Bv:"DLRv",D:"D",F:"F",BL:"L",BR:"R",d:"d",f:"f",bl:"l",br:"r"},f0={U:"FRL",L:"FLD",R:"FDR",B:"DLR"},u0=new Te("y"),p0=new Te("Dv"),Io=class{wcaHack=!1;map=Yb;child;constructor(e){this.child=e}notationToInternal(e){if(this.wcaHack&&e.innerLayer===2&&e.outerLayer===null){let i=f0[e.family];if(i)return new T(new Te(i,e.innerLayer,e.outerLayer),e.amount)}let t=this.map[e.family];return t?new T(new Te(t,e.innerLayer,e.outerLayer),e.amount):u0.isIdentical(e.quantum)?new T(p0,-e.amount):null}notationToExternal(e){if(this.wcaHack&&e.innerLayer===2&&e.outerLayer===null){for(let[t,i]of Object.entries(f0))if(this.child.spinmatch(e.family,i))return new T(new Te(t,e.innerLayer,e.outerLayer),e.amount)}for(let[t,i]of Object.entries(this.map))if(this.child.spinmatch(e.family,i))return new T(new Te(t,e.innerLayer,e.outerLayer),e.amount);return p0.isIdentical(e.quantum)?new T(u0,-e.amount):null}},ua=class extends Io{wcaHack=!0;constructor(e){super(e),this.map=Qb}}});var h0,kp,m0,Zb,Np,g0,$b,Ip,y0,Jb,pa,x0=S(()=>{ot();h0={U:"UBL",UL:"ULF",F:"UFR",UR:"URB",B:"DBL",D:"DFR",L:"DLF",R:"DRB",Uv:"UBLv",ULv:"ULFv",Fv:"UFRv",URv:"URBv",Bv:"DBLv",Dv:"DFRv",Lv:"DLFv",Rv:"DRBv"},kp=new Te("x"),m0=new Te("Rv"),Zb=new Te("Lv"),Np=new Te("y"),g0=new Te("Uv"),$b=new Te("Dv"),Ip=new Te("z"),y0=new Te("Fv"),Jb=new Te("Bv"),pa=class{child;constructor(e){this.child=e}notationToInternal(e){if(e.innerLayer||e.outerLayer)return null;let t=h0[e.family];return t?new T(new Te(t,e.outerLayer,e.innerLayer),e.amount):kp.isIdentical(e.quantum)?new T(m0,e.amount):Np.isIdentical(e.quantum)?new T(g0,e.amount):Ip.isIdentical(e.quantum)?new T(y0,e.amount):null}notationToExternal(e){for(let[t,i]of Object.entries(h0))if(this.child.spinmatchv(e.family,i))return new T(new Te(t,e.innerLayer,e.outerLayer),e.amount);return m0.isIdentical(e.quantum)?new T(kp,e.amount):Zb.isIdentical(e.quantum)?new T(kp,-e.amount):g0.isIdentical(e.quantum)?new T(Np,e.amount):$b.isIdentical(e.quantum)?new T(Np,-e.amount):y0.isIdentical(e.quantum)?new T(Ip,e.amount):Jb.isIdentical(e.quantum)?new T(Ip,-e.amount):null}}});var Op=S(()=>{o0();s0();a0();l0();c0();d0();x0()});function S0(r,e){let t={...r,moves:{}};for(let[i,n]of Object.entries(r.moves)){let o=i,s="";["v","w"].includes(i.at(-1))&&(o=i.slice(0,-1),s=i.slice(-1));let a=e.notationToExternal(T.fromString(o));if(!a)continue;let l=a+s;if(!l)throw new Error(`Missing external move name for: ${i.toString()}`);t.moves[l.toString()]=n}return t}var v0=S(()=>{ot()});var Ql,E0=S(()=>{Fp();Ql=class{verbosity=0;allMoves=!1;outerBlockMoves=!1;vertexMoves=!1;addRotations=!1;moveList=null;fixedOrientation=!1;fixedPieceType=null;orientCenters=!1;includeCornerOrbits=!0;includeCenterOrbits=!0;includeEdgeOrbits=!0;excludeOrbits=[];optimizeOrbits=!1;grayCorners=!1;grayCenters=!1;grayEdges=!1;puzzleOrientation=null;puzzleOrientations=null;scrambleAmount=0;constructor(e={}){let t=Object.fromEntries(Object.entries(e).filter(([i,n])=>typeof n<"u"));Object.assign(this,t)}}});function Qr(r){if(!Up[r]){let e=Array(r);for(let t=0;t<r;t++)e[t]=0;Up[r]=e}return Up[r]}function Dr(r){if(!Bp[r]){let e=Array(r);for(let t=0;t<r;t++)e[t]=t;Bp[r]=e}return Bp[r]}function M0(r){return new Yr(Dr(r))}function b0(r){let e=BigInt(1);for(;r>1;)e*=BigInt(r),r--;return e}function e4(r,e){if(r>e){let t=r;r=e,e=t}for(;r>0;){let t=e%r;e=r,r=t}return e}function Gp(r,e){return r/e4(r,e)*e}var Up,Bp,Yr,$l=S(()=>{Up=[],Bp=[];Yr=class r{n;p;constructor(e){this.n=e.length,this.p=e}toString(){return`Perm[${this.p.join(" ")}]`}mul(e){let t=Array(this.n);for(let i=0;i<this.n;i++)t[i]=e.p[this.p[i]];return new r(t)}rmul(e){let t=Array(this.n);for(let i=0;i<this.n;i++)t[i]=this.p[e.p[i]];return new r(t)}inv(){let e=Array(this.n);for(let t=0;t<this.n;t++)e[this.p[t]]=t;return new r(e)}compareTo(e){for(let t=0;t<this.n;t++)if(this.p[t]!==e.p[t])return this.p[t]-e.p[t];return 0}toGap(){let e=[],t=new Array(this.n);for(let i=0;i<this.p.length;i++){if(t[i]||this.p[i]===i)continue;let n=[];for(let o=this.p[i];!t[o];o=this.p[o])n.push(1+o),t[o]=!0;e.push(`(${n.reverse().join(",")})`)}return e.join("")}toMathematica(){let e=[],t=new Array(this.n);for(let i=0;i<this.p.length;i++){if(t[i]||this.p[i]===i)continue;let n=[];for(let o=this.p[i];!t[o];o=this.p[o])n.push(1+o),t[o]=!0;e.push(`{${n.reverse().join(",")}}`)}return`Cycles[{${e.join(",")}}]`}order(){let e=1,t=new Array(this.n);for(let i=0;i<this.p.length;i++){if(t[i]||this.p[i]===i)continue;let n=0;for(let o=i;!t[o];o=this.p[o])n++,t[o]=!0;e=Gp(e,n)}return e}}});function da(r,e){let t=T.fromString(e),i=r.notationToExternal(t);return i===null||t===i?e:i.toString()}function _0(r,e){let t=r.moveops.length;if(t>30)throw new Error("Canon info too big for bitmask");let i=[],n=[];for(let s=0;s<t;s++){let a=r.moveops[s];i.push(a.order());let l=0;for(let c=0;c<t;c++){if(c===s)continue;let f=r.moveops[c];a.mul(f).equal(f.mul(a))&&(l|=1<<c)}n.push(l)}let o={};o[0]=1;for(let s=0;s<100;s++){let a=0,l={},c=0;for(let f in o){let u=+f,p=o[u];a+=p,c++;for(let d=0;d<i.length;d++)if((u>>d&1)===0&&(u&n[d]&(1<<d)-1)===0){let m=u&n[d]|1<<d;l[m]===void 0&&(l[m]=0),l[m]+=(i[d]-1)*p}}e(`${s}: canonseq ${a} states ${c}`),o=l}}var Oo,t4,ha,Zr,Jl,ma,ga,ec,w0=S(()=>{ot();Op();$l();Oo=class{size;mod;constructor(e,t){this.size=e,this.mod=t}reassemblySize(){return b0(this.size)*BigInt(this.mod)**BigInt(this.size)}},t4=0;ha=class r{orbitnames;orbitdefs;solved;movenames;moveops;isRotation;forcenames;constructor(e,t,i,n,o,s,a){this.orbitnames=e,this.orbitdefs=t,this.solved=i,this.movenames=n,this.moveops=o,this.isRotation=s,this.forcenames=a}toKTransformationData(e){let t={};for(let i=0;i<this.orbitnames.length;i++)t[this.orbitnames[i]]=e.orbits[i].toKTransformationOrbitData();return t}toKPatternData(e){let t={};for(let i=0;i<this.orbitnames.length;i++)t[this.orbitnames[i]]=e.orbits[i].toKPatternOrbitData();return t}static transformToKTransformationData(e,t){let i={};for(let n=0;n<e.length;n++)i[e[n]]=t.orbits[n].toKTransformationOrbitData();return i}describeSet(e,t,i){let n=this.orbitdefs[e].size,o=new Array(n);for(let s=0;s<n;s++)o[s]=[];for(let s=0;s<this.movenames.length;s++){if(this.isRotation[s])continue;let a=this.movenames[s];this.forcenames[s]||(a=da(i,a),a[a.length-1]==="'"&&(a=a.substring(0,a.length-1)));let l=this.moveops[s].orbits[e];for(let c=0;c<n;c++)(l.perm[c]!==c||l.ori[c]!==0)&&o[c].push(a)}for(let s=0;s<n;s++)t.push(`# ${s+1} ${o[s].join(" ")}`)}toKsolve(e,t=new io){let i=[];i.push(`Name ${e}`),i.push("");for(let n=0;n<this.orbitnames.length;n++)i.push(`Set ${this.orbitnames[n]} ${this.orbitdefs[n].size} ${this.orbitdefs[n].mod}`),this.describeSet(n,i,t);i.push(""),i.push("Solved");for(let n=0;n<this.orbitnames.length;n++)this.solved.orbits[n].renumberPieces().appendDefinition(i,this.orbitnames[n],!1,!1);i.push("End");for(let n=0;n<this.movenames.length;n++){i.push("");let o=this.movenames[n];this.forcenames[n]||(o=da(t,this.movenames[n]));let s=!1;o[o.length-1]==="'"&&(s=!0,o=o.substring(0,o.length-1)),i.push(`Move ${o}`);for(let a=0;a<this.orbitnames.length;a++)s?this.moveops[n].orbits[a].inv().appendDefinition(i,this.orbitnames[a],!0):this.moveops[n].orbits[a].appendDefinition(i,this.orbitnames[a],!0);i.push("End")}return i}toKPuzzleDefinition(e){let t=[],i={};for(let o=0;o<this.orbitnames.length;o++){t.push({orbitName:this.orbitnames[o],numPieces:this.orbitdefs[o].size,numOrientations:this.orbitdefs[o].mod});let s=this.solved.orbits[o].toKTransformationOrbitData();i[this.orbitnames[o]]={pieces:s.permutation,orientation:s.orientationDelta}}let n={};if(e)for(let o=0;o<this.movenames.length;o++)n[this.movenames[o]]=this.toKTransformationData(this.moveops[o]);return{name:`PG3D #${++t4}`,orbits:t,defaultPattern:i,moves:n}}optimize(){let e=[],t=[],i=[],n=[];for(let o=0;o<this.moveops.length;o++)n.push([]);for(let o=0;o<this.orbitdefs.length;o++){let s=this.orbitdefs[o].mod,a=this.orbitdefs[o].size,l=new ec(a),c=new Array(this.orbitdefs[o].size);for(let d=0;d<a;d++)c[d]=!1;for(let d=0;d<this.moveops.length;d++)for(let m=0;m<a;m++)(this.moveops[d].orbits[o].perm[m]!==m||this.moveops[d].orbits[o].ori[m]!==0)&&(this.isRotation[d]||(c[m]=!0),l.union(m,this.moveops[d].orbits[o].perm[m]));let f=!0;if(s>1){f=!1;let d=new ec(this.orbitdefs[o].size*s);for(let m=0;m<this.moveops.length;m++)for(let y=0;y<a;y++)if(this.moveops[m].orbits[o].perm[y]!==y||this.moveops[m].orbits[o].ori[y]!==0)for(let g=0;g<s;g++)d.union(y*s+g,this.moveops[m].orbits[o].perm[y]*s+(g+this.moveops[m].orbits[o].ori[y])%s);for(let m=0;!f&&m<a;m++)for(let y=1;y<s;y++)d.find(m*s)===d.find(m*s+y)&&(f=!0);for(let m=0;!f&&m<a;m++)for(let y=0;y<m;y++)this.solved.orbits[o].perm[m]===this.solved.orbits[o].perm[y]&&(f=!0)}let u=-1,p=!1;for(let d=0;d<this.orbitdefs[o].size;d++)if(c[d]){let m=l.find(d);u<0?u=m:u!==m&&(p=!0)}for(let d=0;d<this.orbitdefs[o].size;d++){if(!c[d]||l.find(d)!==d)continue;let y=[],g=[],h=0;for(let w=0;w<this.orbitdefs[o].size;w++)l.find(w)===d&&(y[h]=w,g[w]=h,h++);if(p?e.push(`${this.orbitnames[o]}_p${d}`):e.push(this.orbitnames[o]),f){t.push(new Oo(h,this.orbitdefs[o].mod)),i.push(this.solved.orbits[o].remapVS(y,h));for(let w=0;w<this.moveops.length;w++)n[w].push(this.moveops[w].orbits[o].remap(y,g,h))}else{t.push(new Oo(h,1)),i.push(this.solved.orbits[o].remapVS(y,h).killOri());for(let w=0;w<this.moveops.length;w++)n[w].push(this.moveops[w].orbits[o].remap(y,g,h).killOri())}}}return new r(e,t,new ga(i),this.movenames,n.map(o=>new ma(o)),this.isRotation,this.forcenames)}scramble(e){this.solved=this.solved.mul(this.getScrambleTransformation(e))}getScrambleTransformation(e){e<100&&(e=100);let t=[];for(let n=0;n<this.moveops.length;n++)t[n]=this.moveops[n];for(let n=0;n<t.length;n++){let o=Math.floor(Math.random()*t.length),s=t[n];t[n]=t[o],t[o]=s}e<t.length&&(e=t.length);for(let n=0;n<e;n++){let o=Math.floor(Math.random()*t.length),s=Math.floor(Math.random()*t.length),a=Math.floor(Math.random()*this.moveops.length);t[o]=t[o].mul(t[s]).mul(this.moveops[a]),Math.random()<.1&&(t[o]=t[o].mul(this.moveops[a]))}let i=t[0];for(let n=1;n<t.length;n++)i=i.mul(t[n]);return i}reassemblySize(){let e=BigInt(1);for(let t=0;t<this.orbitdefs.length;t++)e*=this.orbitdefs[t].reassemblySize();return e}},Zr=class r{static ktransformationCache=[];static e(e,t){return new r(Dr(e),Qr(e),t)}perm;ori;orimod;constructor(e,t,i){this.perm=e,this.ori=t,this.orimod=i}mul(e){let t=this.perm.length,i=new Array(t);if(this.orimod===1){for(let n=0;n<t;n++)i[n]=this.perm[e.perm[n]];return new r(i,this.ori,this.orimod)}else{let n=new Array(t);for(let o=0;o<t;o++)i[o]=this.perm[e.perm[o]],n[o]=(this.ori[e.perm[o]]+e.ori[o])%this.orimod;return new r(i,n,this.orimod)}}inv(){let e=this.perm.length,t=new Array(e),i=new Array(e);for(let n=0;n<e;n++)t[this.perm[n]]=n,i[this.perm[n]]=(this.orimod-this.ori[n])%this.orimod;return new r(t,i,this.orimod)}equal(e){let t=this.perm.length;for(let i=0;i<t;i++)if(this.perm[i]!==e.perm[i]||this.ori[i]!==e.ori[i])return!1;return!0}killOri(){let e=this.perm.length;for(let t=0;t<e;t++)this.ori[t]=0;return this.orimod=1,this}toPerm(){let e=this.orimod;if(e===1)return new Yr(this.perm);let t=this.perm.length,i=new Array(t*e);for(let n=0;n<t;n++)for(let o=0;o<e;o++)i[n*e+o]=e*this.perm[n]+(this.ori[n]+o)%e;return new Yr(i)}renumberPieces(){let e=new Array(this.perm.length),t=new Array(this.perm.length),i=0;for(let n=0;n<this.perm.length;n++){let o=this.perm[n];e[o]===void 0&&(e[o]=i++),t[n]=e[o]}return new r(t,this.ori,this.orimod)}identicalPieces(){let e=[],t=this.perm.length,i=[];for(let n=0;n<t;n++){let o=this.perm[n];if(e[o]===void 0){let s=[n];e[o]=!0;for(let a=n+1;a<t;a++)this.perm[a]===o&&s.push(a);i.push(s)}}return i}order(){return this.toPerm().order()}isIdentity(){let e=this.perm.length;if(this.perm===Dr(e)&&this.ori===Qr(e))return!0;for(let t=0;t<e;t++)if(this.perm[t]!==t||this.ori[t]!==0)return!1;return!0}zeroOris(){let e=this.perm.length;if(this.ori===Qr(e))return!0;for(let t=0;t<e;t++)if(this.ori[t]!==0)return!1;return!0}remap(e,t,i){let n=new Array(i),o=new Array(i);for(let s=0;s<i;s++)n[s]=t[this.perm[e[s]]],o[s]=this.ori[e[s]];return new r(n,o,this.orimod)}remapVS(e,t){let i=new Array(t),n=new Array(t),o=0,s=[];for(let a=0;a<t;a++){let l=this.perm[e[a]];s[l]===void 0&&(s[l]=o++),i[a]=s[l],n[a]=this.ori[e[a]]}return new r(i,n,this.orimod)}appendDefinition(e,t,i,n=!0){if(!(n&&this.isIdentity())&&(e.push(t),e.push(this.perm.map(o=>o+1).join(" ")),!this.zeroOris()))if(i){let o=new Array(this.ori.length);for(let s=0;s<o.length;s++)o[this.perm[s]]=this.ori[s];e.push(o.join(" "))}else e.push(this.ori.join(" "))}toKTransformationOrbitData(){let e=this.perm.length;return this.isIdentity()?(r.ktransformationCache[e]||(r.ktransformationCache[e]={permutation:Dr(e),orientationDelta:Qr(e)}),r.ktransformationCache[e]):{permutation:this.perm,orientationDelta:this.ori}}toKPatternOrbitData(){let e=this.perm.length;return{pieces:this.perm,orientation:this.ori,orientationMod:Qr(e)}}},Jl=class{orbits;constructor(e){this.orbits=e}internalMul(e){let t=[];for(let i=0;i<this.orbits.length;i++)t.push(this.orbits[i].mul(e.orbits[i]));return t}internalInv(){let e=[];for(let t of this.orbits)e.push(t.inv());return e}equal(e){for(let t=0;t<this.orbits.length;t++)if(!this.orbits[t].equal(e.orbits[t]))return!1;return!0}killOri(){for(let e of this.orbits)e.killOri();return this}toPerm(){let e=[],t=0;for(let n of this.orbits){let o=n.toPerm();e.push(o),t+=o.n}let i=new Array(t);t=0;for(let n of e){for(let o=0;o<n.n;o++)i[t+o]=t+n.p[o];t+=n.n}return new Yr(i)}identicalPieces(){let e=[],t=0;for(let i of this.orbits){let n=i.orimod,o=i.identicalPieces();for(let s=0;s<o.length;s++)e.push(o[s].map(a=>a*n+t));t+=n*i.perm.length}return e}order(){let e=1;for(let t of this.orbits)e=Gp(e,t.order());return e}},ma=class r extends Jl{mul(e){return new r(this.internalMul(e))}mulScalar(e){if(e===0)return this.e();let t=this;for(e<0&&(t=t.inv(),e=-e);(e&1)===0;)t=t.mul(t),e>>=1;if(e===1)return t;let i=t,n=this.e();for(;e>0;)e&1&&(n=n.mul(i)),e>1&&(i=i.mul(i)),e>>=1;return n}inv(){return new r(this.internalInv())}e(){return new r(this.orbits.map(e=>Zr.e(e.perm.length,e.orimod)))}},ga=class r extends Jl{mul(e){return new r(this.internalMul(e))}},ec=class{heads;n;constructor(e){this.n=e,this.heads=new Array(e);for(let t=0;t<e;t++)this.heads[t]=t}find(e){let t=this.heads[e];return this.heads[t]===t||(t=this.find(this.heads[t]),this.heads[e]=t),t}union(e,t){let i=this.find(e),n=this.find(t);i<n?this.heads[n]=i:i>n&&(this.heads[i]=n)}}});function tc(r){let e=new pt(0,0,0,0);for(let t=0;t<r.length;t++)e=e.sum(r[t]);return e.smul(1/r.length)}function R0(r,e,t,i){let n=i[r].intersect3(i[e],i[t]);if(!n)return n;for(let o=0;o<i.length;o++)if(o!==r&&o!==e&&o!==t){let s=i[o].b*n.b+i[o].c*n.c+i[o].d*n.d;if(i[o].a>0&&s>i[o].a||i[o].a<0&&s<i[o].a)return!1}return n}var pt,ic=S(()=>{pt=class r{a;b;c;d;constructor(e,t,i,n){this.a=e,this.b=t,this.c=i,this.d=n}mul(e){return new r(this.a*e.a-this.b*e.b-this.c*e.c-this.d*e.d,this.a*e.b+this.b*e.a+this.c*e.d-this.d*e.c,this.a*e.c-this.b*e.d+this.c*e.a+this.d*e.b,this.a*e.d+this.b*e.c-this.c*e.b+this.d*e.a)}toString(){return`Q[${this.a},${this.b},${this.c},${this.d}]`}dist(e){return Math.hypot(this.a-e.a,this.b-e.b,this.c-e.c,this.d-e.d)}len(){return Math.hypot(this.a,this.b,this.c,this.d)}cross(e){return new r(0,this.c*e.d-this.d*e.c,this.d*e.b-this.b*e.d,this.b*e.c-this.c*e.b)}dot(e){return this.b*e.b+this.c*e.c+this.d*e.d}normalize(){let e=Math.sqrt(this.dot(this));return new r(this.a/e,this.b/e,this.c/e,this.d/e)}makenormal(){return new r(0,this.b,this.c,this.d).normalize()}normalizeplane(){let e=Math.hypot(this.b,this.c,this.d);return new r(this.a/e,this.b/e,this.c/e,this.d/e)}smul(e){return new r(this.a*e,this.b*e,this.c*e,this.d*e)}sum(e){return new r(this.a+e.a,this.b+e.b,this.c+e.c,this.d+e.d)}sub(e){return new r(this.a-e.a,this.b-e.b,this.c-e.c,this.d-e.d)}angle(){return 2*Math.acos(this.a)}invrot(){return new r(this.a,-this.b,-this.c,-this.d)}det3x3(e,t,i,n,o,s,a,l,c){return e*(o*c-s*l)+t*(s*a-n*c)+i*(n*l-o*a)}rotateplane(e){let t=e.mul(new r(0,this.b,this.c,this.d)).mul(e.invrot());return t.a=this.a,t}orthogonal(){let e=Math.abs(this.b),t=Math.abs(this.c),i=Math.abs(this.d);return e<t&&e<i?this.cross(new r(0,1,0,0)).normalize():t<e&&t<i?this.cross(new r(0,0,1,0)).normalize():this.cross(new r(0,0,0,1)).normalize()}pointrotation(e){let t=this.normalize();if(e=e.normalize(),t.sub(e).len()<1e-9)return new r(1,0,0,0);let i=t.sum(e);i.len()<1e-9?i=i.orthogonal():i=i.normalize();let n=t.cross(i);return n.a=t.dot(i),n}unproject(e){return this.sum(e.smul(-this.dot(e)/(this.len()*e.len())))}rotatepoint(e){return e.mul(this).mul(e.invrot())}rotateface(e){return e.map(t=>t.rotatepoint(this))}intersect3(e,t){let i=this.det3x3(this.b,this.c,this.d,e.b,e.c,e.d,t.b,t.c,t.d);return Math.abs(i)<1e-9?!1:new r(0,this.det3x3(this.a,this.c,this.d,e.a,e.c,e.d,t.a,t.c,t.d)/i,this.det3x3(this.b,this.a,this.d,e.b,e.a,e.d,t.b,t.a,t.d)/i,this.det3x3(this.b,this.c,this.a,e.b,e.c,e.a,t.b,t.c,t.a)/i)}side(e){return e>1e-9?1:e<-1e-9?-1:0}cutface(e){let t=this.a,i=0,n=null;for(let o=0;o<e.length;o++)i|=1<<this.side(e[o].dot(this)-t)+1;if((i&5)===5){n=[];let o=e.map(s=>this.side(s.dot(this)-t));for(let s=-1;s<=1;s+=2){let a=[];for(let l=0;l<e.length;l++){(o[l]===s||o[l]===0)&&a.push(e[l]);let c=(l+1)%e.length;if(o[l]+o[c]===0&&o[l]!==0){let f=e[l].dot(this)-t,u=e[c].dot(this)-t,p=f/(f-u),d=e[l].smul(1-p).sum(e[c].smul(p));a.push(d)}}n.push(a)}}return n}cutfaces(e){let t=[];for(let i=0;i<e.length;i++){let n=e[i],o=this.cutface(n);o?(t.push(o[0]),t.push(o[1])):t.push(n)}return t}faceside(e){let t=this.a;for(let i=0;i<e.length;i++){let n=this.side(e[i].dot(this)-t);if(n!==0)return n}throw new Error("Could not determine side of plane in faceside")}sameplane(e){let t=this.normalize(),i=e.normalize();return t.dist(i)<1e-9||t.dist(i.smul(-1))<1e-9}makecut(e){return new r(e,this.b,this.c,this.d)}}});function T0(){let r=Math.sqrt(.5);return[new pt(r,r,0,0),new pt(r,0,r,0)]}function A0(){return[new pt(.5,.5,.5,.5),new pt(.5,.5,.5,-.5)]}function D0(){let r=2*Math.PI/10,e=.5+.3*Math.sqrt(5),t=.5+.1*Math.sqrt(5),i=Math.sqrt(e*e+t*t);return e/=i,t/=i,[new pt(Math.cos(r),e*Math.sin(r),t*Math.sin(r),0),new pt(.5,.5,.5,.5)]}function C0(){let r=.16666666666666666+Math.sqrt(5)/6,e=2/3+Math.sqrt(5)/3,t=Math.sqrt(r*r+e*e);r/=t,e/=t;let i=2*Math.PI/6;return[new pt(Math.cos(i),r*Math.sin(i),e*Math.sin(i),0),new pt(Math.cos(i),-r*Math.sin(i),e*Math.sin(i),0)]}function L0(){let r=Math.sqrt(.5);return[new pt(.5,.5,.5,.5),new pt(r,0,0,r)]}function P0(r){let e=[new pt(1,0,0,0)];for(let t=0;t<e.length;t++)for(let i=0;i<r.length;i++){let n=r[i].mul(e[t]),o=n.smul(-1),s=!1;for(let a=0;a<e.length;a++)if(n.dist(e[a])<rc||o.dist(e[a])<rc){s=!0;break}s||e.push(n)}return e}function Vp(r,e){let t=[],i=[];for(let n=0;n<e.length;n++){let o=r.rotateplane(e[n]),s=!1;for(let a=0;a<t.length;a++)if(o.dist(t[a])<rc){s=!0;break}s||(t.push(o),i.push(e[n]))}return i}function Wp(r){let e=[];for(let t=1;t<r.length;t++)for(let i=t+1;i<r.length;i++){let n=R0(0,t,i,r);if(n){let o=!1;for(let s=0;s<e.length;s++)if(n.dist(e[s])<rc){o=!0;break}o||e.push(n)}}for(;;){let t=!1;for(let i=0;i<e.length;i++){let n=(i+1)%e.length;if(r[0].dot(e[i].cross(e[n]))<0){let o=e[i];e[i]=e[n],e[n]=o,t=!0}}if(!t)break}return e}var rc,z0=S(()=>{ic();rc=1e-9});var nc,k0=S(()=>{nc={"2x2x2":"c f 0","3x3x3":"c f 0.333333333333333","4x4x4":"c f 0.5 f 0","5x5x5":"c f 0.6 f 0.2","6x6x6":"c f 0.666666666666667 f 0.333333333333333 f 0","7x7x7":"c f 0.714285714285714 f 0.428571428571429 f 0.142857142857143","8x8x8":"c f 0.75 f 0.5 f 0.25 f 0","9x9x9":"c f 0.777777777777778 f 0.555555555555556 f 0.333333333333333 f 0.111111111111111","10x10x10":"c f 0.8 f 0.6 f 0.4 f 0.2 f 0","11x11x11":"c f 0.818181818181818 f 0.636363636363636 f 0.454545454545455 f 0.272727272727273 f 0.0909090909090909","12x12x12":"c f 0.833333333333333 f 0.666666666666667 f 0.5 f 0.333333333333333 f 0.166666666666667 f 0","13x13x13":"c f 0.846153846153846 f 0.692307692307692 f 0.538461538461538 f 0.384615384615385 f 0.230769230769231 f 0.0769230769230769","20x20x20":"c f 0 f .1 f .2 f .3 f .4 f .5 f .6 f .7 f .8 f .9","30x30x30":"c f 0 f .066667 f .133333 f .2 f .266667 f .333333 f .4 f .466667 f .533333 f .6 f .666667 f .733333 f .8 f .866667 f .933333","40x40x40":"c f 0 f .05 f .1 f .15 f .2 f .25 f .3 f .35 f .4 f .45 f .5 f .55 f .6 f .65 f .7 f .75 f .8 f .85 f .9 f .95",skewb:"c v 0","master skewb":"c v 0.275","professor skewb":"c v 0 v 0.38","compy cube":"c v 0.915641442663986",helicopter:"c e 0.707106781186547","curvy copter":"c e 0.83",dino:"c v 0.577350269189626","little chop":"c e 0",pyramorphix:"t e 0",mastermorphix:"t e 0.346184634065199",pyraminx:"t v 0.333333333333333 v 1.66666666666667",tetraminx:"t v 0.333333333333333","master pyraminx":"t v 0 v 1 v 2","master tetraminx":"t v 0 v 1","professor pyraminx":"t v -0.2 v 0.6 v 1.4 v 2.2","professor tetraminx":"t v -0.2 v 0.6 v 1.4","royal pyraminx":"t v -0.333333333333333 v 0.333333333333333 v 1 v 1.66666666666667 v 2.33333333333333","royal tetraminx":"t v -0.333333333333333 v 0.333333333333333 v 1 v 1.66666666666667","emperor pyraminx":"t v -0.428571428571429 v 0.142857142857143 v 0.714285714285714 v 1.28571428571429 v 1.85714285714286 v 2.42857142857143","emperor tetraminx":"t v -0.428571428571429 v 0.142857142857143 v 0.714285714285714 v 1.28571428571429 v 1.85714285714286","Jing pyraminx":"t f 0","master pyramorphix":"t e 0.866025403784437",megaminx:"d f 0.7",gigaminx:"d f 0.64 f 0.82",teraminx:"d f 0.64 f 0.76 f 0.88",petaminx:"d f 0.64 f 0.73 f 0.82 f 0.91",examinx:"d f 0.64 f 0.712 f 0.784 f 0.856 f 0.928",zetaminx:"d f 0.64 f 0.7 f 0.76 f 0.82 f 0.88 f 0.94",yottaminx:"d f 0.64 f 0.6914 f 0.7429 f 0.7943 f 0.8457 f 0.8971 f 0.9486",pentultimate:"d f 0","master pentultimate":"d f 0.1","elite pentultimate":"d f 0 f 0.145905",starminx:"d v 0.937962370425399","starminx 2":"d f 0.23606797749979","pyraminx crystal":"d f 0.447213595499989",chopasaurus:"d v 0","big chop":"d e 0","skewb diamond":"o f 0",FTO:"o f 0.333333333333333","master FTO":"o f 0.5 f 0","Christopher's jewel":"o v 0.577350269189626",octastar:"o e 0","Trajber's octahedron":"o v 0.433012701892219","radio chop":"i f 0",icosamate:"i v 0","Regular Astrominx":"i v 0.18759247376021","Regular Astrominx + Big Chop":"i v 0.18759247376021 e 0",Redicosahedron:"i v 0.794654472291766","Redicosahedron with centers":"i v 0.84",Icosaminx:"i v 0.73","Eitan's star":"i f 0.61803398874989","2x2x2 + dino":"c f 0 v 0.577350269189626","2x2x2 + little chop":"c f 0 e 0","dino + little chop":"c v 0.577350269189626 e 0","2x2x2 + dino + little chop":"c f 0 v 0.577350269189626 e 0","megaminx + chopasaurus":"d f 0.61803398875 v 0","starminx combo":"d f 0.23606797749979 v 0.937962370425399"}});function oc(r,e){let t=r[0].p.length,i=M0(t),n=[],o=[],s=[],a=[],l=[];function c(d){for(let m=d.p.length-1;m>=0;m--){let y=d.p[m];if(y!==m){if(!n[m][y])return!1;d=d.mul(o[m][y])}}return!0}function f(d,m,y){a[d].push(m),l[d].push(y);for(let g=0;g<n[d].length;g++)n[d][g]&&u(d,n[d][g].mul(m),y+s[d][g])}function u(d,m,y){let g=m.p[d];if(!n[d][g]){n[d][g]=m,o[d][g]=m.inv(),s[d][g]=y;for(let w=0;w<a[d].length;w++)u(d,m.mul(a[d][w]),y+l[d][w]);return}let h=m.mul(o[d][g]);c(h)||f(d-1,h,y+s[d][g])}function p(){n=[],o=[],a=[],s=[],l=[];for(let y=0;y<t;y++)n.push([]),o.push([]),s.push([]),a.push([]),l.push([]),n[y][y]=i,o[y][y]=i,s[y][y]=0;let d=0,m=BigInt(1);for(let y=0;y<r.length;y++){f(t-1,r[y],1),m=BigInt(1);let g=0,h=0,w=[],b=new Hp;for(let v=0;v<t;v++){let P=0,D=0;for(let k=0;k<t;k++)n[v][k]&&(P++,D+=s[v][k],v!==k&&d++);g+=a[v].length,m*=BigInt(P),P>1&&b.multiply(P);let C=D/P;w.push(C),h+=C}e(`${y}: sz ${m} T ${g} sol ${h} none ${d} mults ${b.toString()}`)}return m}return p()}var Hp,Kp=S(()=>{$l();Hp=class{mult;constructor(){this.mult=[]}multiply(e){for(let t=2;t*t<=e;t++)for(;e%t===0;)this.mult[t]!==void 0?this.mult[t]++:this.mult[t]=1,e/=t;e>1&&(this.mult[e]!==void 0?this.mult[e]++:this.mult[e]=1)}toString(){let e="";for(let t=0;t<this.mult.length;t++)this.mult[t]!==void 0&&(e!==""&&(e+="*"),e+=t,this.mult[t]>1&&(e+=`^${this.mult[t]}`));return e}}});function i4(r,e){let t=[];for(let i of r)for(let n of e)t.push(n.rotate(i));return t}function o4(){return{4:[["F","D","L","R"]],6:[["F","D","L","U","R"],["R","F","","B",""]],8:[["F","D","L","R"],["D","F","BR",""],["BR","D","","BB"],["BB","BR","U","BL"]],12:[["U","F","","","",""],["F","U","R","C","A","L"],["R","F","","","E",""],["E","R","","BF","",""],["BF","E","BR","BL","I","D"]],20:[["R","C","F","E"],["F","R","L","U"],["L","F","A",""],["E","R","G","I"],["I","E","S","H"],["S","I","J","B"],["B","S","K","D"],["K","B","M","O"],["O","K","P","N"],["P","O","Q",""]]}}function l4(){return{4:[["FLR",[0,1,0]],["F",[0,0,1]]],6:[["U",[0,1,0]],["F",[0,0,1]]],8:[["U",[0,1,0]],["F",[0,0,1]]],12:[["U",[0,1,0]],["F",[0,0,1]]],20:[["GUQMJ",[0,1,0]],["F",[0,0,1]]]}}function sc(r,e){for(let t=0;t<r.length;t++)if(r[t][0].dist(e)<Lt)return t;throw Error("Element not found")}function N0(){return nc}function I0(r){return nc[r]}function Zl(r){let e=r.split(/ /).filter(Boolean);if(e.length%2===0)return null;let t=e[0];if(t!=="o"&&t!=="c"&&t!=="i"&&t!=="d"&&t!=="t")return null;let i=[];for(let n=1;n<e.length;n+=2){if(e[n]!=="f"&&e[n]!=="v"&&e[n]!=="e")return null;i.push({cutType:e[n],distance:parseFloat(e[n+1])})}return{shape:t,cuts:i}}function jp(r,e={}){let t=Zl(r);if(t===null)throw Error("Could not parse the puzzle description");let i=new xa(t,Object.assign({},{allMoves:!0},e));return i.allstickers(),i.genperms(),i}function U0(r,e){return jp(nc[r],e)}function c4(r,e,t){let i=!1;t-e[1]<e[0]&&(r=[r[2],r[3],r[0],r[1]],e=[t-e[1],t-e[0]],i=!0);let n=r[0],o="";if(e[0]===0&&e[1]===t)n=`${n}v`;else if(e[0]===e[1])e[1]>0&&(o=String(e[1]+1));else if(e[0]===0)n=n.toLowerCase(),e[1]>1&&(o=String(e[1]+1));else throw Error(`We only support slice and outer block moves right now. ${e}`);return[o+n,i]}function f4(r,e){let t=[],i=0;for(;i<r.length;){i>0&&i<r.length&&r[i]==="_"&&i++;let n="";for(let o of e)r.substr(i).startsWith(o[1])&&o[1].length>n.length&&(n=o[1]);if(n!=="")t.push(n),i+=n.length;else throw Error(`Could not split ${r} into face names.`)}return t}function ac(r,e){return[r.b/e,-r.c/e,r.d/e]}function Xp(r,e){let t=[],i=r.length;for(let n=0;n<i;n++){let o=ac(r.get(i-n-1),e);t[3*n]=o[0],t[3*n+1]=o[1],t[3*n+2]=o[2]}return t}var ya,qp,Lt,r4,n4,s4,a4,O0,F0,xa,lc,Fp=S(()=>{ot();r0();n0();Op();v0();E0();$l();w0();z0();k0();ic();Kp();ya=class r{coords;length;constructor(e){this.coords=new Array(e.length*3);for(let t=0;t<e.length;t++)this.coords[3*t]=e[t].b,this.coords[3*t+1]=e[t].c,this.coords[3*t+2]=e[t].d;this.length=e.length}get(e){return new pt(0,this.coords[3*e],this.coords[3*e+1],this.coords[3*e+2])}centermass(){let e=0,t=0,i=0;for(let n=0;n<this.length;n++)e+=this.coords[3*n],t+=this.coords[3*n+1],i+=this.coords[3*n+2];return new pt(0,e/this.length,t/this.length,i/this.length)}rotate(e){let t=[];for(let i=0;i<this.length;i++)t.push(this.get(i).rotatepoint(e));return new r(t)}rotateforward(){let e=[];for(let t=1;t<this.length;t++)e.push(this.get(t));return e.push(this.get(0)),new r(e)}},qp=class r{face;left;right;constructor(e,t,i){this.face=e,this.left=t,this.right=i}split(e){let t=e.cutface(this.face);return t!==null&&(this.left===void 0?(this.left=new r(t[0]),this.right=new r(t[1])):(this.left=this.left?.split(e),this.right=this.right?.split(e))),this}collect(e,t){return this.left===void 0?e.push(new ya(this.face)):t?(this.left?.collect(e,!1),this.right?.collect(e,!0)):(this.right?.collect(e,!1),this.left?.collect(e,!0)),e}};Lt=1e-9,r4="PuzzleGeometry 0.1 Copyright 2018 Tomas Rokicki.",n4=!1;s4={8:[["U","F","L","R"],["BB","BR","D","BL"]]},a4={4:{v:["DFR","DLF","DRL","FLR"],e:["FR","LF","DF","DL","RD","RL"],c:["DF","FD","RL","LR"]},6:{v:["URF","UBR","ULB","UFL","DFR","DRB","DBL","DLF"],e:["UF","UR","UB","UL","DF","DR","DB","DL","FR","FL","BR","BL"],c:["UB","LU","FU","RU","BU","DF"]},8:{v:["UBBBRR","URFL","ULBLBB","DBRBBBL","DBLLF","DFRBR"],e:["UL","UBB","UR","BRD","BLD","FD","BRR","FR","FL","BLL","BLBB","BRBB"],c:["BBU","LU","RU","BRD","FD","BLD","DF","UBB"]},12:{v:["URF","UFL","ULBL","UBLBR","UBRR","DEBF","DBFI","DIA","DAC","DCE","LAI","ALF","FCA","CFR","REC","ERBR","BRBFE","BFBRBL","BLIBF","IBLL"],e:["UF","UR","UBR","UBL","UL","ER","EBR","EBF","ED","EC","IBF","IBL","IL","IA","ID","AC","CF","FA","BFBR","BRBL","BLBF","CD","AD","AL","FL","FR","CR","BFD","BRR","BLL"],c:["UF","FU","DBF","BFD","AD","CD","BRU","BLU","LA","RA","EBR","IBL"]},20:{v:["FLPQU","FUGER","FRCAL","HCREI","ISBDH","JSIEG","BSJMK","MQPOK","ONDBK","NOPLA","UQMJG","DNACH"],e:["FU","FL","FR","EG","ER","EI","SJ","SI","SB","KM","KB","KO","PQ","PO","PL","UG","JG","MQ","UQ","HC","HD","ND","NA","JM","CA","AL","CR","HI","DB","NO"],c:["FU","UF","GE","EG","JS","SJ","MK","KM","QP","PQ","LA","AL","RC","CR","IH","HI","BD","DB","ON","NO"]}};O0=["c","t","o","d","i"],F0=["f","v","e"];xa=class{rotations;basePlaneRotations;basePlanes;faceNames;facePlanes;edgeNames;vertexNames;geometryNormals;movePlanes;movePlanesFiltered;movePlaneSets;movePlaneNormals;movesetorders;movesetgeos;baseFaces;faces;faceCenterMass;baseFaceCount;stickersPerFace;shortestEdge;markedFaceLookup;cubies;vertexDistance;edgeDistance;faceToCubie;faceToCubieOrd;moveRotations;faceListHash;cubieSetNames;cubieOrbitSizes;cubieSetNums;cubieOrdNums;orbitOrientations;cubieValueMap;cubieSetCubies;cmovesBySlice=[];parsedMoveList;duplicatedFaces=[];duplicatedCubies=[];fixedCubie=-1;net=[];colors=[];swizzler;notationMapper=new io;addNotationMapper="";setReidOrSpeffzOrder=!1;options;puzzleDescription;constructor(e,t){this.puzzleDescription=e;let i="genperms";this.options=new Ql(t),this.options.verbosity>0&&console.log(this.header("# "));let{shape:n,cuts:o}=e;this.movePlanes=[],this.movePlanesFiltered=[],this.faces=[],this.cubies=[];let s=null;switch(n){case"c":{s=T0();break}case"o":{s=L0();break}case"i":{s=C0();break}case"t":{s=A0();break}case"d":{s=D0();break}default:throw Error(`Bad shape argument: ${n}`)}this.rotations=P0(s),this.options.verbosity&&console.log(`# Rotations: ${this.rotations.length}`);let a=s[0];this.basePlaneRotations=Vp(a,this.rotations);let l=this.basePlaneRotations.map(B=>a.rotateplane(B));this.basePlanes=l,this.baseFaceCount=l.length;let c=o4()[l.length];this.net=c,this.colors=i0()[l.length],this.options.verbosity>0&&console.log(`# Base planes: ${l.length}`);let f=Wp(l),u=new pt(0,0,0,0);this.options.verbosity>0&&console.log(`# Face vertices: ${f.length}`);let p=l[0].makenormal(),d=f[0].sum(f[1]).makenormal(),m=f[0].makenormal(),y=new pt(1,p.b,p.c,p.d);this.options.verbosity>0&&console.log(`# Boundary is ${y}`);let h=Vp(y,this.rotations).map(B=>y.rotateplane(B)),w=Wp(h);this.edgeDistance=w[0].sum(w[1]).smul(.5).dist(u),this.vertexDistance=w[0].dist(u);let b=[],v=[],P=!1,D=!1,C=!1;for(let B of o){let se=null,fe=0;switch(B.cutType){case"f":{se=p,fe=1,P=!0;break}case"v":{se=m,fe=this.vertexDistance,C=!0;break}case"e":{se=d,fe=this.edgeDistance,D=!0;break}default:throw Error(`Bad cut argument: ${B.cutType}`)}b.push(se.makecut(B.distance)),v.push(B.distance<fe)}this.options.addRotations&&(P||b.push(p.makecut(10)),C||b.push(m.makecut(10)),D||b.push(d.makecut(10))),this.baseFaces=[];for(let B of this.basePlaneRotations){let se=B.rotateface(w);this.baseFaces.push(new ya(se))}let k=[],M=[],x=[],R=[],W=w.length;function z(B,se,fe){for(let de of B)if(de[0].dist(se)<Lt){de.push(fe);return}B.push([se,fe])}for(let B=0;B<this.basePlaneRotations.length;B++){let se=this.basePlaneRotations[B].rotateface(w);for(let fe=0;fe<se.length;fe++){let de=(fe+1)%se.length,L=se[fe].sum(se[de]).smul(.5);z(R,L,B)}}let O=[];for(let B=0;B<this.basePlaneRotations.length;B++){let se=this.basePlaneRotations[B].rotateface(w),fe=[];for(let de=0;de<se.length;de++){let L=(de+1)%se.length,Ke=se[de].sum(se[L]).smul(.5),ze=R[sc(R,Ke)];if(B===ze[1])fe.push(ze[2]);else if(B===ze[2])fe.push(ze[1]);else throw Error("Could not find edge")}O.push(fe)}let K={},V=[];V.push(c[0][0]),K[c[0][0]]=0,V[O[0][0]]=c[0][1],K[c[0][1]]=O[0][0];for(let B of c){let se=B[0],fe=K[se];if(fe===void 0)throw Error("Bad edge description; first edge not connected");let de=-1;for(let L=0;L<O[fe].length;L++){let Ke=V[O[fe][L]];if(Ke!==void 0&&Ke===B[1]){de=L;break}}if(de<0)throw Error("First element of a net not known");for(let L=2;L<B.length;L++){if(B[L]==="")continue;let Ke=O[fe][(L+de-1)%W],ze=V[Ke];if(ze!==void 0&&ze!==B[L])throw Error("Face mismatch in net");V[Ke]=B[L],K[B[L]]=Ke}}for(let B=0;B<this.basePlaneRotations.length;B++){let se=this.basePlaneRotations[B].rotateface(w),fe=y.rotateplane(this.basePlaneRotations[B]),de=V[B];k.push([se,de]),M.push([fe,de])}for(let B=0;B<this.basePlaneRotations.length;B++){let se=this.basePlaneRotations[B].rotateface(w),fe=V[B];for(let de=0;de<se.length;de++){let L=(de+1)%se.length,Ke=se[de].sum(se[L]).smul(.5),ze=(de+2)%se.length,nt=se[L].sum(se[ze]).smul(.5),Ne=sc(R,Ke),Et=sc(R,nt);z(x,se[L],[fe,Et,Ne])}}this.swizzler=new ko(k.map(B=>B[1]));let Z=this.swizzler.prefixFree?"":"_",G=a4[this.baseFaceCount],$=[];for(let B=0;B<this.baseFaceCount;B++)$[1<<B]=B;{let B=G.v;for(let se of B){let fe=this.swizzler.splitByFaceNames(se),de=0;for(let L of fe)de|=1<<L;$[de]=fe[0]}}{let B=G.e;for(let se of B){let fe=this.swizzler.splitByFaceNames(se),de=0;for(let L of fe)de|=1<<L;$[de]=fe[0]}}{let B=G.c;for(let se of B){let fe=this.swizzler.splitByFaceNames(se),de=1<<fe[0]|1<<this.baseFaceCount;$[de]=fe[1]}}for(let B=0;B<R.length;B++){if(R[B].length!==3)throw Error(`Bad length in edge names ${R[B]}`);let se=R[B][1],fe=R[B][2],de=V[se],L=V[fe],Ke=1<<se|1<<fe;$[Ke]===se?de=de+Z+L:de=L+Z+de,R[B]=[R[B][0],de]}for(let B=0;B<x.length;B++){let se=0;if(x[B].length<4)throw Error("Bad length in vertex names");for(let Ke=1;Ke<x[B].length;Ke++)se|=1<<K[x[B][Ke][0]];let fe=$[se],de=-1;for(let Ke=1;Ke<x[B].length;Ke++)fe===K[x[B][Ke][0]]&&(de=Ke);if(de<0)throw Error("Internal error; couldn't find face name when fixing corners");let L="";for(let Ke=1;Ke<x[B].length;Ke++){Ke===1?L=x[B][de][0]:L=L+Z+x[B][de][0];for(let ze=1;ze<x[B].length;ze++)if(x[B][de][1]===x[B][ze][2]){de=ze;break}}x[B]=[x[B][0],L]}this.markedFaceLookup=$,this.options.verbosity>1&&(console.log(`# Face names: ${k.map(B=>B[1]).join(" ")}`),console.log(`# Edge names: ${R.map(B=>B[1]).join(" ")}`),console.log(`# Vertex names: ${x.map(B=>B[1]).join(" ")}`));let re=[];for(let B of M)re.push([B[0].makenormal(),B[1],"f"]);for(let B of R)re.push([B[0].makenormal(),B[1],"e"]);for(let B of x)re.push([B[0].makenormal(),B[1],"v"]);this.faceNames=k,this.facePlanes=M,this.edgeNames=R,this.vertexNames=x,this.geometryNormals=re;let ue=re.map(B=>B[1]);this.swizzler.setGripNames(ue),this.options.verbosity>0&&console.log(`# Distances: face 1 edge ${this.edgeDistance} vertex ${this.vertexDistance}`);for(let B=0;B<b.length;B++)for(let se of this.rotations){let fe=b[B].rotateplane(se),de=!1;for(let L of this.movePlanes)if(fe.sameplane(L)){de=!0;break}de||(this.movePlanes.push(fe),v[B]&&this.movePlanesFiltered.push(fe))}let ke=new qp(w),Ge=this.movePlanesFiltered.slice(),Y=31;for(let B=0;B<Ge.length;B++){let se=B+Math.floor((Ge.length-B)*(Y/65536));ke=ke.split(Ge[se]),Ge[se]=Ge[B],Y=(Y*1657+101)%65536}let ie=ke.collect([],!0);this.faces=ie,this.options.verbosity>0&&console.log(`# Faces is now ${ie.length}`),this.stickersPerFace=ie.length;let me=[],oe=tc(w);for(let B of this.rotations){let se=B.rotateface(w);oe.dist(tc(se))<Lt&&me.push(B)}let Ae=new Array(ie.length),Pe=[];for(let B=0;B<ie.length;B++){let se=ie[B].centermass();Pe.push([oe.dist(se),se,B])}Pe.sort((B,se)=>B[0]-se[0]);for(let B=0;B<ie.length;B++){let se=Pe[B][2];if(!Ae[se]){Ae[se]=!0;for(let fe of me){let de=ie[se].rotate(fe),L=de.centermass();for(let Ke=B+1;Ke<ie.length&&!(Pe[Ke][0]-Pe[B][0]>Lt);Ke++){let ze=Pe[Ke][2];if(!Ae[ze]&&L.dist(Pe[Ke][1])<Lt){Ae[ze]=!0,ie[ze]=de;break}}}}}this.shortestEdge=1e99;for(let B of ie)for(let se=0;se<B.length;se++){let fe=(se+1)%B.length,de=B.get(se).dist(B.get(fe));de<this.shortestEdge&&(this.shortestEdge=de)}this.options.verbosity>0&&console.log(`# Short edge is ${this.shortestEdge}`),n==="c"&&P&&!D&&!C&&(this.addNotationMapper="NxNxNCubeMapper",this.setReidOrSpeffzOrder=!0),n==="c"&&C&&!P&&!D&&(this.addNotationMapper="SkewbMapper"),n==="t"&&(C||P)&&!D&&(this.addNotationMapper="PyraminxOrTetraminxMapper"),n==="o"&&P&&(this.notationMapper=new No(this.swizzler,new ko(["F","D","L","BL","R","U","BR","B"])),D||C||(this.addNotationMapper="FTOMapper")),n==="d"&&P&&(this.addNotationMapper="MegaminxMapper",this.notationMapper=new No(this.swizzler,new ko(["U","F","L","BL","BR","R","FR","FL","DL","B","DR","D"])))}keyface(e){return this.keyface2(e.centermass())}keyface2(e){let t="",i=String.fromCharCode;for(let n of this.movePlaneSets)if(n.length>0){let o=e.dot(n[0]),s=0,a=1;for(;a*2<=n.length;)a*=2;for(;a>0;a>>=1)s+a<=n.length&&o>n[s+a-1].a&&(s+=a);if(s<47)t=t+i(33+s);else if(s<2256)t=t+i(80+Math.floor(s/47)-1)+i(33+s%47);else if(s<2256+2209*47)t=t+i(80+Math.floor((s-47)/2209-1))+i(80+Math.floor((s-47)/47)%47)+i(33+s%47);else throw Error("Too many slices for cubie encoding")}return t}keyface3(e){let t=e.centermass(),i=[];for(let n of this.movePlaneSets)if(n.length>0){let o=t.dot(n[0]),s=0,a=1;for(;a*2<=n.length;)a*=2;for(;a>0;a>>=1)s+a<=n.length&&o>n[s+a-1].a&&(s+=a);i.push(s)}return i}findface(e){let t=this.keyface2(e),i=this.faceListHash.get(t);if(i.length===1)return i[0];for(let n=0;n+1<i.length;n++){let o=this.faceListHash.get(t)[n];if(Math.abs(e.dist(this.faceCenterMass[o]))<Lt)return o}return i[i.length-1]}project2d(e,t,i){let n=this.faceNames[e][0],o=(t+1)%n.length,s=this.basePlanes[e],a=n[o].sub(n[t]),l=a.len();a=a.normalize();let c=a.cross(s).normalize(),f=i[1].sub(i[0]),u=f.len()/l;f=f.normalize();let p=f.b,d=f.c,m=a.smul(p).sub(c.smul(d)).smul(u),y=c.smul(p).sum(a.smul(d)).smul(u),g=new pt(0,i[0].b-m.dot(n[t]),i[0].c-y.dot(n[t]),0);return[m,y,g]}upperStringToBitSet(e){let t=0;for(let i=0;i<e.length;i++)t|=1<<e.charCodeAt(i)-65;return t}allstickers(){let e="allstickers";this.faces=i4(this.basePlaneRotations,this.faces),this.options.verbosity>0&&console.log(`# Total stickers is now ${this.faces.length}`),this.faceCenterMass=new Array(this.faces.length);for(let x=0;x<this.faces.length;x++)this.faceCenterMass[x]=this.faces[x].centermass();let t=[],i=[];for(let x of this.movePlanes){let R=x.makenormal(),W=!1;for(let z of i)R.sameplane(z.makenormal())&&(W=!0);W||(i.push(R),t.push([]))}for(let x of this.movePlanesFiltered){let R=x.makenormal();for(let W=0;W<i.length;W++)if(R.sameplane(i[W])){t[W].push(x);break}}for(let x=0;x<t.length;x++){let R=t[x].map(z=>z.normalizeplane()),W=i[x];for(let z=0;z<R.length;z++)R[z].makenormal().dist(W)>Lt&&(R[z]=R[z].smul(-1));R.sort((z,O)=>z.a-O.a),t[x]=R}this.movePlaneSets=t,this.movePlaneNormals=i;let n=t.map(x=>x.length);this.options.verbosity>0&&console.log(`# Move plane sets: ${n}`);let o=[];for(let x=0;x<t.length;x++)o.push([]);for(let x of this.rotations){if(Math.abs(Math.abs(x.a)-1)<Lt)continue;let R=x.makenormal();for(let W=0;W<t.length;W++)if(R.sameplane(i[W])){o[W].push(x);break}}this.moveRotations=o;for(let x=0;x<o.length;x++){let R=o[x],W=R[0].makenormal();for(let z=0;z<R.length;z++)W.dist(R[z].makenormal())>Lt&&(R[z]=R[z].smul(-1));R.sort((z,O)=>z.angle()-O.angle()),o[x][0].dot(i[x])<0&&R.reverse()}let s=o.map(x=>1+x.length);this.movesetorders=s;let a=[],l="?";for(let x=0;x<t.length;x++){let R=i[x],W=null,z=null;for(let O of this.geometryNormals){let K=R.dot(O[0]);Math.abs(K-1)<Lt?(z=[O[1],O[2]],l=O[2]):Math.abs(K+1)<Lt&&(W=[O[1],O[2]],l=O[2])}if(z===null||W===null)throw Error("Saw positive or negative sides as null");a.push([z[0],z[1],W[0],W[1],1+t[x].length]),this.addNotationMapper==="NxNxNCubeMapper"&&l==="f"&&(this.notationMapper=new fa(1+t[x].length),this.addNotationMapper=""),this.addNotationMapper==="SkewbMapper"&&t[0].length===1&&(this.notationMapper=new pa(this.swizzler),this.addNotationMapper=""),this.addNotationMapper==="PyraminxOrTetraminxMapper"&&(t[0].length===2&&t[0][0].a===.333333333333333&&t[0][1].a===1.66666666666667?(this.notationMapper=new Io(this.swizzler),this.addNotationMapper=""):(this.notationMapper=new ua(this.swizzler),this.addNotationMapper="")),this.addNotationMapper==="MegaminxMapper"&&l==="f"&&(1+t[x].length===3&&(this.notationMapper=new ca(this.notationMapper)),this.addNotationMapper=""),this.addNotationMapper==="FTOMapper"&&l==="f"&&(1+t[x].length===3&&(this.notationMapper=new la(this.notationMapper,this.swizzler)),this.addNotationMapper="")}this.movesetgeos=a;let c=new Map,f=this.faces;for(let x=0;x<f.length;x++){let R=f[x],W=this.keyface(R);if(!c.get(W))c.set(W,[x]);else{let z=c.get(W);if(z.push(x),z.length===this.baseFaceCount){this.options.verbosity>0&&console.log("# Splitting core.");for(let O=0;O<z.length;O++){let K=`${W} ${O}`;c.set(K,[z[O]])}}}}this.faceListHash=c,this.options.verbosity>0&&console.log(`# Cubies: ${c.size}`);let u=[],p=[],d=[];for(let x of c.values())if(x.length!==this.baseFaceCount){if(x.length>1){let R=x.map(V=>f[V].centermass()),W=tc(R);for(let V=0;x.length>2;V++){let Z=!1;for(let G=0;G<x.length;G++){let $=(G+1)%x.length;if(W.dot(R[G].cross(R[$]))<0){let re=R[G];R[G]=R[$],R[$]=re;let ue=x[G];x[G]=x[$],x[$]=ue,Z=!0}}if(!Z)break;if(V>1e3)throw Error("Bad epsilon math; too close to border")}let z=0;for(let V of x)z|=1<<Math.floor(V/this.stickersPerFace);let O=this.markedFaceLookup[z],K=-1;for(let V=0;V<x.length;V++)Math.floor(x[V]/this.stickersPerFace)===O&&(K=V);if(K<0)throw Error("Could not find marked face in list");if(K!==0){let V=x.slice();for(let Z=0;Z<x.length;Z++)x[Z]=V[(K+Z)%x.length]}}for(let R=0;R<x.length;R++){let W=x[R];p[W]=u.length,d[W]=R}u.push(x)}this.cubies=u,this.faceToCubie=p,this.faceToCubieOrd=d;let m=["?","CENTERS","EDGES","CORNERS","C4RNER","C5RNER"],y=[],g=[0,0,0,0,0,0],h=[],w=[],b=0,v=[],P=[],D=[],C=[],k=x=>u[x].map(R=>this.getfaceindex(R)).join(" "),M=[];for(let x=0;x<u.length;x++){let R=u[x];if(R.length===0||w[x])continue;let W={},z=0;D.push(0),M.push([]);let O=R.length,K=g[O]++,V=m[O];(V===void 0||O===this.baseFaceCount)&&(V="CORE"),V=V+(K===0?"":K+1),y[b]=V,h[b]=O;let Z=[x],G=0;for(w[x]=!0;G<Z.length;){let $=Z[G++],re=k($);if((R.length>1||W[re]===void 0)&&(W[re]=z++),C[$]=W[re],v[$]=b,M[b].push($),P[$]=D[b]++,Z.length<this.rotations.length){let ue=this.faceCenterMass[u[$][0]];for(let ke of o){let Ge=this.faceToCubie[this.findface(ue.rotatepoint(ke[0]))];w[Ge]||(Z.push(Ge),w[Ge]=!0)}}}b++}if(this.setReidOrSpeffzOrder&&4<=this.stickersPerFace){let x=[["UF","UR","UB","UL","DF","DR","DB","DL","FR","FL","BR","BL"],["UFR","URB","UBL","ULF","DRF","DFL","DLB","DBR"],["U","L","F","R","B","D"]],R=["U","L","F","R","B","D"],W=["UBL","URB","UFR","ULF","UBL","ULF","DFL","DLB","ULF","UFR","DRF","DFL","UFR","URB","DBR","DRF","URB","UBL","DLB","DBR","DFL","DRF","DBR","DLB"],z={};for(let G of x)for(let $=0;$<G.length;$++)z[this.upperStringToBitSet(G[$])]=$;let O={},K={},V=[],Z=[-1,0,1,0,2,-1,1,-1,3,3,-1,-1,2,-1,-1,-1];if(this.stickersPerFace>9){for(let G of this.vertexNames)O[this.upperStringToBitSet(G[1])]=G[0];for(let G=0;G<6;G++)K[R[G]]=G;for(let G of W)V.push(O[this.upperStringToBitSet(G)])}for(let G of M)for(let $ of G)if(u[$].length===3||this.stickersPerFace<=9){let re=0;for(let ue of u[$])re|=1<<this.faceNames[this.getfaceindex(ue)][1].charCodeAt(0)-65;P[$]=z[re]}else if(u[$].length<=2){let re=[];for(let ue=0;ue<u[$].length;ue++){let ke=u[$][ue],Ge=K[this.faceNames[this.getfaceindex(ke)][1]],Y=1e20,ie=this.faces[ke].centermass(),me=0;for(let oe=0;oe<4;oe++){let Ae=ie.dist(V[4*Ge+oe]);Ae+Lt<Y?(Y=Ae,me=1<<oe):Ae<Y+Lt&&(me|=1<<oe)}if(me=Z[me],me>=0){let oe=4*Ge+me;re.push([oe,W[oe]])}}if(re.length>0){if(u[$].length===1)P[$]=re[0][0];else if(re.length===2&&re[0][1]===re[1][1]){let ue=0,ke=R[re[0][0]>>2],Ge=R[re[1][0]>>2],Y=re[0][1];for(;ue<3&&(ke===Y.charAt(ue)||Ge===Y.charAt(ue));)ue++;if(ue===3)throw Error("Internal error (2) in Speffz");if(ue=(ue+1)%3,ke===Y.charAt(ue))P[$]=re[0][0];else if(Ge===Y.charAt(ue))P[$]=re[1][0];else throw console.log(ke,Ge,Y,ue,re),Error("Internal error (3) in Speffz")}}}}if(this.cubieSetNums=v,this.cubieOrdNums=P,this.cubieSetNames=y,this.cubieOrbitSizes=D,this.orbitOrientations=h,this.cubieValueMap=C,this.cubieSetCubies=M,this.options.fixedPieceType!==null){for(let x=0;x<u.length;x++)if(this.options.fixedPieceType==="v"&&u[x].length>2||this.options.fixedPieceType==="e"&&u[x].length===2||this.options.fixedPieceType==="f"&&u[x].length===1){this.fixedCubie=x;break}if(this.fixedCubie<0)throw Error(`Could not find a cubie of type ${this.options.fixedPieceType} to fix.`)}this.options.verbosity>0&&console.log(`# Cubie orbit sizes ${D}`)}unswizzle(e){let t=this.notationMapper.notationToInternal(e);return t===null?null:t.modified({family:this.swizzler.unswizzle(t.family)})}stringToBlockMove(e){let t=/^(([0-9]+)-)?([0-9]+)?([^0-9]+)([0-9]+'?)?$/,i=e.match(t);if(i===null)throw Error(`Bad move passed ${e}`);let n=i[4],o,s;if(i[2]!==void 0){if(i[3]===void 0)throw Error("Missing second number in range");o=parseInt(i[2],10)}i[3]!==void 0&&(s=parseInt(i[3],10));let a="1",l=1;return i[5]!==void 0&&(a=i[5],a[0]==="'"&&(a=`-${a.substring(1)}`),l=parseInt(a,10)),new T(new Te(n,s,o),l)}parseMove(e){let t=this.notationMapper.notationToInternal(e);if(t===null)throw Error(`Bad move ${e.family}`);e=t;let i=e.family,n=!1;if(i.endsWith("v")&&i[0]<="Z"){if(e.innerLayer!==void 0||e.outerLayer!==void 0)throw Error("Cannot use a prefix with full cube rotations");i=i.slice(0,-1),n=!0}i.endsWith("w")&&i[0]<="Z"&&(i=i.slice(0,-1).toLowerCase());let o,s=-1,a=this.swizzler.unswizzle(i),l=!1;for(let p=0;p<this.movesetgeos.length;p++){let d=this.movesetgeos[p];a===d[0]&&(l=!0,o=d,s=p),a===d[2]&&(l=!1,o=d,s=p)}let c=1,f=1;if(i.toUpperCase()!==i&&(f=2),o===void 0)throw Error(`Bad grip in move ${e.family}`);e.outerLayer!==void 0&&(c=e.outerLayer),e.innerLayer!==void 0&&(e.outerLayer===void 0?(f=e.innerLayer,i<="Z"?c=f:c=1):f=e.innerLayer),c--,f--;let u=this.movePlaneSets;if(n&&(c=0,f=u[s].length),c<0||c>u[s].length||f<0||f>u[s].length)throw Error(`Bad slice spec ${c} ${f} vs ${u[s].length}`);if(!n4&&c===0&&f===u[s].length&&!n)throw Error("! full puzzle rotations must be specified with v suffix.");return[void 0,s,c,f,l,e.amount]}parsemove(e){e instanceof T&&(e=e.toString());let t=this.parseMove(this.stringToBlockMove(e));return t[0]=e,t}genperms(){let e="genperms";if(this.cmovesBySlice.length>0)return;let t=[];if(this.options.orientCenters){for(let i=0;i<this.cubies.length;i++)if(this.cubies[i].length===1){let n=this.cubies[i][0],o=this.getfaceindex(n),s=this.baseFaces[o].centermass();if(s.dist(this.faceCenterMass[n])<Lt){let a=1<<o|1<<this.baseFaceCount,l=this.markedFaceLookup[a],c=this.basePlanes[l].makenormal(),f=-1,u=-1;for(let m=0;m<this.faces[n].length;m++){let y=this.faces[n].get(m),g=c.dot(y.sub(s));g>f&&(f=g,u=m)}let p=(u+1)%this.faces[n].length;if(Math.abs(c.dot(this.faces[n].get(p).sub(s))-f)<Lt&&(u=p),u!==0){let m=[];for(let y=0;y<this.faces[n].length;y++)m.push(this.faces[n].get((y+u)%this.faces[n].length));this.faces[n]=new ya(m)}let d=this.baseFaces[o].length;for(let m=1;m<d;m++)this.cubies[i].push(this.cubies[i][m-1]);this.duplicatedFaces[n]=d,this.duplicatedCubies[i]=d,this.orbitOrientations[this.cubieSetNums[i]]=d}}}for(let i=0;i<this.movePlaneSets.length;i++){let n=this.movePlaneSets[i],o=[],s=[n.length+1,0],a=1;for(;a*2<=n.length;)a*=2;for(let f=0;f<this.faces.length;f++){let u=0;if(n.length>0){let p=this.faceCenterMass[f].dot(n[0]);for(let d=a;d>0;d>>=1)u+d<=n.length&&p>n[u+d-1].a&&(u+=d);u=n.length-u}for(o.push(u);s.length<=u;)s.push(0);s[u]++}let l=new Array(s.length);for(let f=0;f<s.length;f++)l[f]=[];let c=[];for(let f=0;f<this.faces.length;f++){if(o[f]<0)continue;let u=[this.faceToCubie[f],this.faceToCubieOrd[f]],p=this.faceCenterMass[f],d=p,m=f,y=o[m];for(;;){o[m]=-1;let g=p.rotatepoint(this.moveRotations[i][0]);if(g.dist(d)<Lt)break;m=this.findface(g),u.push(this.faceToCubie[m],this.faceToCubieOrd[m]),p=g}if(u.length>2&&this.options.orientCenters&&(this.cubies[u[0]].length===1||this.duplicatedCubies[u[0]]>1)&&this.faceCenterMass[f].dist(this.baseFaces[this.getfaceindex(f)].centermass())<Lt){let g=this.faces[this.cubies[u[0]][0]];for(let h=0;h<u.length;h+=2){let w=this.faces[this.cubies[u[h]][0]],b=-1;for(let v=0;v<g.length;v++)if(w.get(v).dist(g.get(0))<Lt){b=v;break}if(b<0)throw Error("Couldn't find rotation of center faces; ignoring for now.");u[h+1]=b,g=g.rotate(this.moveRotations[i][0])}}if(u.length===2&&this.options.orientCenters){let g=this.faceCenterMass[f].dot(this.movePlaneNormals[i]);for(let h=1;h<this.movesetorders[i];h++)g>0?u.push(u[0],h):u.push(u[0],(this.movesetorders[i]-h)%this.movesetorders[i])}if(u.length>2&&!c[u[0]]){if(u.length!==2*this.movesetorders[i])throw Error("Bad length in perm gen");for(let g of u)l[y].push(g)}for(let g=0;g<u.length;g+=2)c[u[g]]=!0}for(let f=0;f<l.length;f++)l[f]=l[f].slice();t.push(l)}if(this.cmovesBySlice=t,this.options.moveList){let i=[];for(let n of this.options.moveList)i.push(this.parsemove(n));this.parsedMoveList=i}this.faceListHash.clear(),this.faceCenterMass=[]}getboundarygeometry(){return{baseplanes:this.basePlanes,facenames:this.faceNames,faceplanes:this.facePlanes,vertexnames:this.vertexNames,edgenames:this.edgeNames,geonormals:this.geometryNormals}}getmovesets(e){let t=this.movePlaneSets[e].length,i=[];if(this.parsedMoveList!==void 0)for(let n of this.parsedMoveList)n[1]===e&&(n[4]?i.push([n[2],n[3]]):i.push([t-n[3],t-n[2]]),i.push(n[5]));else{let n=this.movesetgeos[e],o=n[1]!==n[3];if(this.options.vertexMoves&&o&&!this.options.allMoves){if(n[1]!==n[3])for(let s=0;s<t;s++)n[1]!=="v"?(this.options.outerBlockMoves?i.push([s+1,t]):i.push([s+1,s+1]),i.push(1)):(this.options.outerBlockMoves?i.push([0,s]):i.push([s,s]),i.push(1))}else for(let s=0;s<=t;s++)!this.options.allMoves&&s+s===t||(this.options.outerBlockMoves?s+s>t?i.push([s,t]):i.push([0,s]):i.push([s,s]),i.push(1))}if(this.fixedCubie>=0){let n=this.keyface3(this.faces[this.cubies[this.fixedCubie][0]])[e],o=[];for(let s=0;s<i.length;s+=2){let a=i[s];if(n>=a[0]&&n<=a[1])if(a[0]===0)a=[a[1]+1,t];else if(t===a[1])a=[0,a[0]-1];else throw Error("fixed cubie option would disconnect move");let l=!1;for(let c=0;c<o.length;c+=2)if(o[c][0]===a[0]&&o[c][1]===a[1]&&o[c+1]===i[s+1]){l=!0;break}l||(o.push(a),o.push(i[s+1]))}i=o}return i}graybyori(e){let t=this.cubies[e].length;return this.duplicatedCubies[e]&&(t=1),t===1&&(this.options.grayCenters||!this.options.includeCenterOrbits)||t===2&&(this.options.grayEdges||!this.options.includeEdgeOrbits)||t>2&&(this.options.grayCorners||!this.options.includeCornerOrbits)}skipbyori(e){let t=this.cubies[e].length;return this.duplicatedCubies[e]&&(t=1),t===1&&!this.options.includeCenterOrbits||t===2&&!this.options.includeEdgeOrbits||t>2&&!this.options.includeCornerOrbits}skipcubie(e){return this.skipbyori(e)}header(e){return`${e+r4}
${e}
`}writegap(){let e=this.getOrbitsDef(!1),t=[],i=[];for(let o=0;o<e.moveops.length;o++){let s=e.movenames[o];e.forcenames[o]||(s=`M_${da(this.notationMapper,s)}`),s=`M_${s}`;let a=!1;s[s.length-1]==="'"&&(s=s.substring(0,s.length-1),a=!0),i.push(s),a?t.push(`${s}:=${e.moveops[o].toPerm().inv().toGap()};`):t.push(`${s}:=${e.moveops[o].toPerm().toGap()};`)}t.push("Gen:=["),t.push(i.join(",")),t.push("];");let n=e.solved.identicalPieces();return t.push(`ip:=[${n.map(o=>`[${o.map(s=>s+1).join(",")}]`).join(",")}];`),t.push("# Size(Group(Gen));"),t.push("# Size(Stabilizer(Group(Gen), ip, OnTuplesSets));"),t.push(""),this.header("# ")+t.join(`
`)}writemathematica(){let e=this.getOrbitsDef(!1),t=[],i=[];t.push(`(* ${this.header("").trim()} *)`);for(let n=0;n<e.moveops.length;n++){let o=`m${da(this.notationMapper,e.movenames[n])}`,s=!1;o[o.length-1]==="'"&&(o=o.substring(0,o.length-1),s=!0),i.push(o),s?t.push(`${o}=${e.moveops[n].toPerm().inv().toMathematica()};`):t.push(`${o}=${e.moveops[n].toPerm().toMathematica()};`)}return t.push(`gen={${i.join(",")}};`),t.join(`
`)}writeksolve(e="PuzzleGeometryPuzzle"){let t=this.getOrbitsDef(!1);return this.header("# ")+t.toKsolve(e,this.notationMapper).join(`
`)}getKPuzzleDefinition(e=!0,t=!0){let n=this.getOrbitsDef(e,t).toKPuzzleDefinition(t);if(n.experimentalPuzzleDescription=this.puzzleDescription,!n)throw Error("Missing definition!");return n}getMoveFromBits(e,t,i,n,o,s){let a=[],l=[],c=[];for(let p of this.cubieOrbitSizes)l.push(Dr(p)),c.push(Qr(p));for(let p=e[0];p<=e[1];p++){let d=n[p];for(let m=0;m<d.length;m+=2*s){let y=d.slice(m,m+2*s),g=this.cubieSetNums[y[0]];for(let b=0;b<y.length;b+=2)y[b]=this.cubieOrdNums[y[b]];let h=2,w=3;i&&(h=y.length-2,w=y.length-1),l[g]===Dr(this.cubieOrbitSizes[g])&&(l[g]=l[g].slice(),this.orbitOrientations[g]>1&&!this.options.fixedOrientation&&(c[g]=c[g].slice()));for(let b=0;b<y.length;b+=2)l[g][y[(b+h)%y.length]]=y[b],this.orbitOrientations[g]>1&&!this.options.fixedOrientation&&(c[g][y[b]]=(y[(b+w)%y.length]-y[(b+1)%y.length]+2*this.orbitOrientations[g])%this.orbitOrientations[g])}}let f=new Zr(Dr(24),Qr(24),1);for(let p=0;p<this.cubieSetNames.length;p++)if(!(o&&!o[p]))if(this.orbitOrientations[p]===1||this.options.fixedOrientation)l[p]===Dr(f.perm.length)?(l[p]!==f.perm&&(f=new Zr(l[p],c[p],1)),a.push(f)):a.push(new Zr(l[p],c[p],1));else{let d=new Array(c[p].length);for(let m=0;m<l[p].length;m++)d[m]=c[p][l[p][m]];a.push(new Zr(l[p],d,this.orbitOrientations[p]))}let u=new ma(a);return t!==1&&(u=u.mulScalar(t)),u}omitSet(e){for(let t of this.options.excludeOrbits)if(t===e)return!0;return!1}diffmvsets(e,t,i,n){for(let o=0;o<e.length;o+=2){let s=!1;for(let a=0;!s&&a<t.length;a+=2)n?e[o][0]+t[a][1]===i&&e[o][1]+t[a][0]===i&&e[o+1]===t[a+1]&&(s=!0):e[o][0]===t[a][0]&&e[o][1]===t[a][1]&&e[o+1]===t[a+1]&&(s=!0);if(!s)return!0}return!1}getOrbitsDef(e,t=!0){let i=[];if(e)for(let y=0;y<this.cubieSetNames.length;y++)i.push(1);let n=[],o=[],s=[],a=[];for(let y=0;y<this.movePlaneSets.length;y++){let g=this.getmovesets(y);s.push(g),this.options.addRotations?a.push(1):a.push(0)}let l=[];for(let y=0;y<this.movePlaneSets.length;y++){let g=this.movePlaneSets[y].length,h=!1,w=s[y];for(let b=0;b<w.length;b+=2)w[b][0]===0&&w[b][1]===g&&(h=!0);l[y]=h}if(this.options.addRotations&&(this.options.moveList||this.options.fixedPieceType!==null)){for(let y=0;y<this.moveRotations.length;y++)a[y]=0;for(let y=0;y<this.movePlaneSets.length;y++){if(l[y]){a[y]=3;continue}for(let g=0;g<this.moveRotations.length;g++){let h=this.movePlaneNormals[y];for(let w=1;w*2<=this.movesetorders[g];w++){if(h=h.rotatepoint(this.moveRotations[g][0]),a[g]&w)continue;let b=-1,v=!1;for(let D=0;D<this.movePlaneNormals.length;D++)if(h.dist(this.movePlaneNormals[D])<Lt){b=D;break}else if(h.dist(this.movePlaneNormals[D].smul(-1))<Lt){b=D,v=!0;break}if(b<0)throw Error("Could not find rotation");let P=s[b];(P.length!==s[y].length||this.movePlaneSets[y].length!==this.movePlaneSets[b].length||this.diffmvsets(P,s[y],this.movePlaneSets[b].length,v))&&(a[g]|=w)}}}for(let y=0;y<this.moveRotations.length;y++)if(a[y]===0)a[y]=1;else if(a[y]===1)this.movesetorders[y]>3?a[y]=2:a[y]=0;else if(a[y]===3)a[y]=0;else throw Error("Impossible addrot val")}for(let y=0;y<this.movePlaneSets.length;y++)a[y]!==0&&!l[y]&&(s[y].push([0,this.movePlaneSets[y].length]),s[y].push(a[y]));for(let y=0;y<this.movePlaneSets.length;y++){let g=s[y],h=this.movesetorders[y];for(let v=0;v<g.length;v+=2)for(let P=0;P<v;P+=2)if(g[v][0]===g[P][0]&&g[v][1]===g[P][1])throw Error("Redundant moves in moveset.");let w=[];for(let v=0;v<g.length;v+=2)for(let P=g[v][0];P<=g[v][1];P++)w[P]=1;let b=this.cmovesBySlice[y];for(let v=0;v<b.length;v++){if(w[v]!==1)continue;let P=b[v];for(let D=0;D<P.length;D+=2*h){if(this.skipcubie(P[D]))continue;let C=this.cubieSetNums[P[D]];i[C]=1}}}for(let y=0;y<this.cubieSetNames.length;y++)if(i[y]){if(this.omitSet(this.cubieSetNames[y])){i[y]=0;continue}n.push(this.cubieSetNames[y]),o.push(new Oo(this.cubieOrbitSizes[y],this.options.fixedOrientation?1:this.orbitOrientations[y]))}let c=[];for(let y=0;y<this.cubieSetNames.length;y++){if(!i[y]||this.omitSet(this.cubieSetNames[y]))continue;let g=Array(this.cubieOrbitSizes[y]).fill(-1),h=[];for(let w=0;w<this.cubieOrbitSizes[y];w++){if(e)g[w]=w;else{let b=this.cubieSetCubies[y][w];g[this.cubieOrdNums[b]]=this.cubieValueMap[b]}h.push(0)}c.push(new Zr(g,h,this.options.fixedOrientation?1:this.orbitOrientations[y]))}let f=[],u=[],p=[],d=[];if(t)for(let y=0;y<this.movePlaneSets.length;y++){let h=this.movePlaneSets[y].length,w=s[y],b=this.movesetgeos[y];for(let v=0;v<w.length;v+=2){let P=w[v],D,C=!1;if(this.parsedMoveList!==void 0)for(let M of this.parsedMoveList){if(M[1]!==y)continue;let x=[];M[4]?x=[M[2],M[3]]:x=[h-M[3],h-M[2]],x[0]===P[0]&&x[1]===P[1]&&(D=M[0],C=!M[4])}if(D)f.push(D),u.push(!0);else{let M=c4(b,P,h);C=M[1];let x=M[0];w[v+1]===1?f.push(x):f.push(x+w[v+1]),u.push(!1)}d.push(P[0]===0&&P[1]===h);let k=this.getMoveFromBits(P,w[v+1],C,this.cmovesBySlice[y],i,this.movesetorders[y]);p.push(k)}}let m=new ha(n,o,new ga(c),f,p,d,u);return this.options.optimizeOrbits&&(m=m.optimize()),this.options.scrambleAmount!==0&&m.scramble(this.options.scrambleAmount),m}getScramble(e=0){let t=this.getOrbitsDef(!1);return t.toKTransformationData(t.getScrambleTransformation(e))}getMovesAsPerms(){return this.getOrbitsDef(!1).moveops.map(e=>e.toPerm())}showcanon(e){_0(this.getOrbitsDef(!1),e)}getsolved(){let e=[];for(let t=0;t<this.baseFaceCount;t++)for(let i=0;i<this.stickersPerFace;i++)e.push(t);return new Yr(e)}getOrientationRotation(e){let[t,[i,n,o]]=e[0],s=new pt(0,i,-n,o),[a,[l,c,f]]=e[1],u=new pt(0,l,-c,f),p=null,d=null,m=this.swizzler.unswizzle(t),y=this.swizzler.unswizzle(a);for(let b of this.geometryNormals)m===b[1]&&(p=b[0]),y===b[1]&&(d=b[0]);if(!p)throw Error(`Could not find feature ${t}`);if(!d)throw Error(`Could not find feature ${a}`);let g=p.pointrotation(s);return d.rotatepoint(g).unproject(s).pointrotation(u.unproject(s)).mul(g)}getInitial3DRotation(){let e=this.baseFaceCount,t=null;if(this.options.puzzleOrientation?t=this.options.puzzleOrientation:this.options.puzzleOrientations&&(t=this.options.puzzleOrientations[e]),t||(t=l4()[e]),!t)throw Error("No default orientation?");return this.getOrientationRotation(t)}generate2dmapping(e=800,t=500,i=10,n=!1,o=.92){e-=2*i,t-=2*i;function s(z,O){let K=z[1][0]-z[0][0],V=z[1][1]-z[0][1],Z=2*Math.PI/O,G=Math.cos(Z),$=Math.sin(Z);for(let re=2;re<O;re++){let ue=K*G+V*$;V=V*G-K*$,K=ue,z.push([z[re-1][0]+K,z[re-1][1]+V])}}this.genperms();let c=this.getboundarygeometry().facenames[0][0].length,f=this.net;if(f===null)throw Error("No net?");let u={},p=0,d=0,m=1,y=0;u[f[0][0]]=[[1,0],[0,0]],s(u[f[0][0]],c);for(let z of f){let O=z[0];if(!u[O])throw Error("Bad edge description; first edge not connected.");for(let K=1;K<z.length;K++){let V=z[K];V===""||u[V]||(u[V]=[u[O][K%c],u[O][(K+c-1)%c]],s(u[V],c))}}for(let z in u){let O=u[z];for(let K of O)p=Math.min(p,K[0]),m=Math.max(m,K[0]),d=Math.min(d,K[1]),y=Math.max(y,K[1])}let g=Math.min(e/(m-p),t/(y-d)),h=.5*(e-g*(m+p)),w=.5*(t-g*(y+d)),b={},v=this.getboundarygeometry(),P={},D=[[g+h,w],[h,w]];P[f[0][0]]=D,s(P[f[0][0]],c),b[this.faceNames[0][1]]=this.project2d(0,0,[new pt(0,D[0][0],D[0][1],0),new pt(0,D[1][0],D[1][1],0)]);let C=[];C[0]=0;for(let z of f){let O=z[0];if(!P[O])throw Error("Bad edge description; first edge not connected.");let K=-1;for(let Z=0;Z<v.facenames.length;Z++)if(O===v.facenames[Z][1]){K=Z;break}if(K<0)throw Error(`Could not find first face name ${O}`);let V=v.facenames[K][0];for(let Z=1;Z<z.length;Z++){let G=z[Z];if(G===""||P[G])continue;P[G]=[P[O][Z%c],P[O][(Z+c-1)%c]],s(P[G],c);let $=C[K],re=V[($+Z)%c].sum(V[($+Z+c-1)%c]).smul(.5),ue=sc(v.edgenames,re),ke=v.edgenames[ue][1],Ge=f4(ke,this.faceNames),Y=Ge[O===Ge[0]?1:0],ie=-1;for(let oe=0;oe<v.facenames.length;oe++)if(Y===v.facenames[oe][1]){ie=oe;break}if(ie<0)throw Error("Could not find second face name");let me=v.facenames[ie][0];for(let oe=0;oe<me.length;oe++)if(me[oe].sum(me[(oe+1)%c]).smul(.5).dist(re)<=Lt){let Pe=P[O][(Z+c-1)%c],B=P[O][Z%c];C[ie]=oe,b[Y]=this.project2d(ie,oe,[new pt(0,B[0],B[1],0),new pt(0,Pe[0],Pe[1],0)]);break}}}let k=0,M=0,x=this.getInitial3DRotation();for(let z of this.faces){n&&(z=z.rotate(x));for(let O=0;O<z.length;O++)k=Math.max(k,Math.abs(z.get(O).b)),M=Math.max(M,Math.abs(z.get(O).c))}let R=Math.min(t/M/2,(e-i)/k/4);return(z,O)=>{if(n){O=O.rotatepoint(x);let K=.5*i+.25*e,V=this.basePlanes[z].rotateplane(x).d<0?1:-1;return[i+e*.5+V*(K-O.b*R),i+t*.5+O.c*R]}else{let K=b[this.faceNames[z][1]];return[i+o*O.dot(K[0])+K[2].b,i+t-o*O.dot(K[1])-K[2].c]}}}generateUserFriendly2D(e,t,i){let n=s4[this.baseFaceCount];if(!n)return null;this.genperms();let o=[],s=n.map((d,m)=>{let y=[];for(let b=0;b<d.length;b++)for(let v=0;v<this.faceNames.length;v++)this.faceNames[v][1]===d[b]&&(y[b]=v);let g=new pt(0,0,0,0);for(let b of y)g=g.sum(this.basePlanes[b].makenormal()),o[b]=m;g=g.normalize();let h=this.basePlanes[y[0]].makenormal(),w=h.sub(g.smul(h.dot(g))).normalize();return{up:w,right:g.cross(w),lo:[1e9,1e9],hi:[-1e9,-1e9]}});for(let d=0;d<this.baseFaceCount;d++){let m=s[o[d]];for(let y of this.faceNames[d][0]){let g=[y.dot(m.right),y.dot(m.up)];m.lo=[Math.min(m.lo[0],g[0]),Math.min(m.lo[1],g[1])],m.hi=[Math.max(m.hi[0],g[0]),Math.max(m.hi[1],g[1])]}}let a=.2*(s[0].hi[0]-s[0].lo[0]),l=-a,c=0;for(let d of s)l+=d.hi[0]-d.lo[0]+a,c=Math.max(c,d.hi[1]-d.lo[1]);let f=Math.min((e-2*i)/l,(t-2*i)/c),u=[],p=(e-f*l)/2;for(let d of s)u.push(p-f*d.lo[0]),p+=f*(d.hi[0]-d.lo[0]+a);return(d,m)=>{let y=o[d],g=s[y],h=(g.lo[1]+g.hi[1])/2;return[u[y]+f*m.dot(g.right),t/2-f*(m.dot(g.up)-h)]}}generatesvg(e=800,t=500,i=10,n=!1){let o=!n&&this.generateUserFriendly2D(e,t,i)||this.generate2dmapping(e,t,i,n);function s(p,d,m){return`<polygon id="${p}" class="sticker" style="fill: ${m}" points="${d.map(y=>`${y[0]} ${y[1]}`).join(" ")}"/>
`}let a=this.getsolved(),l=[],c=[];for(let p=0;p<this.baseFaceCount;p++)l[p]=this.colors[this.faceNames[p][1]];for(let p=0;p<this.faces.length;p++){let d=this.faces[p],m=Math.floor(p/this.stickersPerFace),y=[];for(let g=0;g<d.length;g++)y.push(o(m,d.get(g)));c.push(y)}let f=[];for(let p=0;p<this.baseFaceCount;p++){f.push("<g>"),f.push(`<title>${this.faceNames[p][1]}</title>
`);for(let d=0;d<this.stickersPerFace;d++){let m=p*this.stickersPerFace+d,y=this.faceToCubie[m],g=this.faceToCubieOrd[m],h=this.cubieSetNums[y],w=this.cubieOrdNums[y],b=this.graybyori(y)?"#808080":l[a.p[m]],v=`${this.cubieSetNames[h]}-l${w}-o${g}`;if(f.push(s(v,c[m],b)),this.duplicatedFaces[m])for(let P=1;P<this.duplicatedFaces[m];P++)v=`${this.cubieSetNames[h]}-l${w}-o${P}`,f.push(s(v,c[m],b))}f.push("</g>")}return`<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 500">
<style type="text/css"><![CDATA[.sticker { stroke: #000000; stroke-width: 1px; }]]></style>
${f.join("")}</svg>`}get3d(e){let t=[],i=this.getInitial3DRotation(),n=[],o=.52*this.baseFaces[0].get(0).len();for(let c=0;c<this.baseFaces.length;c++){let f=this.baseFaces[c].rotate(i),u=this.faceNames[c][1];n.push({coords:Xp(f,o),name:u})}for(let c=0;c<this.faces.length;c++){let f=Math.floor(c/this.stickersPerFace),u=this.faceToCubie[c],p=this.faceToCubieOrd[c],d=this.cubieSetNums[u],m=this.cubieOrdNums[u],y=this.graybyori(u)?e?.darkIgnoredOrbits?"#222222":"#808080":this.colors[this.faceNames[f][1]];e?.stickerColors&&(y=e.stickerColors[c]);let g=this.faces[c].rotate(i);t.push({coords:Xp(g,o),color:y,orbit:this.cubieSetNames[d],ord:m,ori:p,face:f});let h=g;if(this.duplicatedFaces[c]){let w=h.length/this.duplicatedFaces[c];for(let b=1;b<this.duplicatedFaces[c];b++){for(let v=0;v<w;v++)h=h.rotateforward();t.push({coords:Xp(h,o),color:y,orbit:this.cubieSetNames[d],ord:m,ori:b,face:f,isDup:!0})}}}let s=[];for(let c=0;c<this.movesetgeos.length;c++){let f=this.movesetgeos[c],u=this.movesetorders[c];for(let p of this.geometryNormals)f[0]===p[1]&&f[1]===p[2]&&(s.push({coordinates:ac(p[0].rotatepoint(i),1),quantumMove:new T(f[0]),order:u}),s.push({coordinates:ac(p[0].rotatepoint(i).smul(-1),1),quantumMove:new T(f[2]),order:u}))}let a=this.generate2dmapping(2880,2160,0,!1,1),l=(()=>{let c=i.invrot();return(f,u)=>{let p=new pt(0,u[0]*o,-u[1]*o,u[2]*o);p=p.rotatepoint(c);let d=a(f,p);return d[0]/=2880,d[1]=1-d[1]/2160,d}})().bind(this);return{stickers:t,faces:n,axis:s,unswizzle:this.unswizzle.bind(this),notationMapper:this.notationMapper,textureMapper:{getuv:l}}}getGeoNormal(e){let t=this.getInitial3DRotation(),i=this.swizzler.unswizzle(e);for(let n of this.geometryNormals)if(i===n[1]){let o=ac(n[0].rotatepoint(t),1);return Math.abs(o[0])<Lt&&Math.abs(o[2])<Lt&&(o[0]=0,o[2]=1e-6),o}}getfaceindex(e){let t=this.stickersPerFace;return Math.floor(e/t)}textForTwizzleExplorer(){return`Faces ${this.basePlaneRotations.length}
Stickers per face ${this.stickersPerFace}
Short edge ${this.shortestEdge}
Cubies ${this.cubies.length}
Edge distance ${this.edgeDistance}
Vertex distance ${this.vertexDistance}`}writeSchreierSims(e){let i=this.getOrbitsDef(!1).reassemblySize();e(`Reassembly size is ${i}`);let n=oc(this.getMovesAsPerms(),e),o=i/n;e(`Ratio is ${o}`)}},lc=class{orbitNames;pg;constructor(e,t){this.pg=e,this.orbitNames=t.orbitnames}lookupMove(e){let t=this.pg.parseMove(e);if(this.pg.parsedMoveList){let s=!1;for(let a of this.pg.parsedMoveList)a[1]===t[1]&&a[2]===t[2]&&a[3]===t[3]&&a[4]===t[4]&&(s=!0);if(!s)return null}let i=[t[2],t[3]];if(!t[4]){let s=this.pg.movePlaneSets[t[1]].length;i=[s-t[3],s-t[2]]}let n=this.pg.getMoveFromBits(i,t[5],!t[4],this.pg.cmovesBySlice[t[1]],void 0,this.pg.movesetorders[t[1]]);return ha.transformToKTransformationData(this.orbitNames,n)}remapKPuzzleDefinition(e){return S0(e,this.pg.notationMapper)}}});var Sa={};vn(Sa,{EXPERIMENTAL_PUZZLE_BASE_SHAPES:()=>O0,EXPERIMENTAL_PUZZLE_CUT_TYPES:()=>F0,ExperimentalPGNotation:()=>lc,PuzzleGeometry:()=>xa,Quat:()=>pt,getPG3DNamedPuzzles:()=>N0,getPuzzleDescriptionString:()=>I0,getPuzzleGeometryByDesc:()=>jp,getPuzzleGeometryByName:()=>U0,parsePuzzleDescription:()=>Zl,schreierSims:()=>oc});var va=S(()=>{Fp();ic();Kp()});async function Fo(r,e){return(await Promise.resolve().then(()=>(va(),Sa))).getPuzzleGeometryByDesc(r,{allMoves:e?.allMoves??!0,orientCenters:e?.orientCenters??!0,addRotations:e?.addRotations??!0,...e})}async function Yp(r,e){let t=Fo(r,e);return $p(t,`description: ${r}`)}function Qp(r,e){let t=u4++,i=null,n=async()=>i??=Yp(r),o={id:`custom-${t}`,fullName:e?.fullName??`Custom Puzzle (instance #${t})`,kpuzzle:n,svg:async()=>(await Fo(r)).generatesvg(),pg:async()=>Fo(r),basePG:async()=>Fo(r,{allMoves:!1,orientCenters:!1,addRotations:!1}),puzzleSpecificSimplifyOptionsPromise:Jp(n)};return e?.inventedBy&&(o.inventedBy=e.inventedBy),e?.inventionYear&&(o.inventionYear=e.inventionYear),o}var u4,Zp=S(()=>{lr();u4=1});function ed(r){let t=r.experimentalToTransformation().invert().transformationData.CORNERS;return t.permutation[6]*3+t.orientationDelta[6]}function G0(r){if(!p4){let e=["","z","x","z'","x'","x2"].map(i=>le.fromString(i)),t=new le("y");for(let i of e){let n=r.algToTransformation(i);for(let o=0;o<4;o++){n=n.applyAlg(t);let s=ed(n.toKPattern());B0[s]={transformation:n.invert(),alg:i.concat(t)}}}}return B0}function V0(r){let e=ed(r),{transformation:t,alg:i}=G0(r.kpuzzle)[e];return{normalizedPattern:r.applyTransformation(t),normalizationAlg:i.invert()}}function td(r,e){return e.ignorePuzzleOrientation&&(r=V0(r).normalizedPattern),!!r.experimentalToTransformation().isIdentityTransformation()}var B0,p4,W0=S(()=>{ot();B0=new Array(24),p4=!1});function cc(r,e,t,i,n){let s=r.orbits[e].pieces[t];if(s===null)return ji;let a=s.facelets?.[i];return a===null?ji:typeof a=="string"?a:n?a.hintMask??a.mask:(console.log(a),a.mask)}function fc(r){return h4[r]}var j,$r,ji,Ot,Uo,d4,Ea,ro,Ma,h4,Bo,Go,uc=S(()=>{j={Regular:"Regular",Dim:"Dim",Ignored:"Ignored",OrientationStickers:"OrientationStickers",Invisible:"Invisible",Ignoriented:"Ignoriented",IgnoreNonPrimary:"IgnoreNonPrimary",PermuteNonPrimary:"PermuteNonPrimary",OrientationWithoutPermutation:"OrientationWithoutPermutation",ExperimentalOrientationWithoutPermutation2:"ExperimentalOrientationWithoutPermutation2",Mystery:"Mystery"},$r=class{stickerings=new Map;constructor(e,t){for(let i of e.definition.orbits)this.stickerings.set(i.orbitName,new Array(i.numPieces).fill(t))}},ji="regular",Ot="ignored",Uo="oriented",d4="experimentalOriented2",Ea="invisible",ro="dim",Ma="mystery",h4={[j.Regular]:{facelets:[ji,ji,ji,ji,ji]},[j.Ignored]:{facelets:[Ot,Ot,Ot,Ot,Ot]},[j.OrientationStickers]:{facelets:[Uo,Uo,Uo,Uo,Uo]},[j.IgnoreNonPrimary]:{facelets:[ji,Ot,Ot,Ot,Ot]},[j.Invisible]:{facelets:[Ea,Ea,Ea,Ea,Ea]},[j.PermuteNonPrimary]:{facelets:[ro,ji,ji,ji,ji]},[j.Dim]:{facelets:[ro,ro,ro,ro,ro]},[j.Ignoriented]:{facelets:[ro,Ot,Ot,Ot,Ot]},[j.OrientationWithoutPermutation]:{facelets:[Uo,Ot,Ot,Ot,Ot]},[j.ExperimentalOrientationWithoutPermutation2]:{facelets:[d4,Ot,Ot,Ot,Ot]},[j.Mystery]:{facelets:[Ma,Ma,Ma,Ma,Ma]}};Bo=class extends $r{constructor(e){super(e,j.Regular)}set(e,t){for(let[i,n]of this.stickerings.entries())for(let o=0;o<n.length;o++)e.stickerings.get(i)[o]&&(n[o]=t);return this}toStickeringMask(){let e={orbits:{}};for(let[t,i]of this.stickerings.entries()){let n=[],o={pieces:n};e.orbits[t]=o;for(let s of i)n.push(fc(s))}return e}},Go=class{kpuzzle;constructor(e){this.kpuzzle=e}and(e){let t=new $r(this.kpuzzle,!1);for(let i of this.kpuzzle.definition.orbits)e:for(let n=0;n<i.numPieces;n++){t.stickerings.get(i.orbitName)[n]=!0;for(let o of e)if(!o.stickerings.get(i.orbitName)[n]){t.stickerings.get(i.orbitName)[n]=!1;continue e}}return t}or(e){let t=new $r(this.kpuzzle,!1);for(let i of this.kpuzzle.definition.orbits)e:for(let n=0;n<i.numPieces;n++){t.stickerings.get(i.orbitName)[n]=!1;for(let o of e)if(o.stickerings.get(i.orbitName)[n]){t.stickerings.get(i.orbitName)[n]=!0;continue e}}return t}not(e){let t=new $r(this.kpuzzle,!1);for(let i of this.kpuzzle.definition.orbits)for(let n=0;n<i.numPieces;n++)t.stickerings.get(i.orbitName)[n]=!e.stickerings.get(i.orbitName)[n];return t}all(){return this.and(this.moves([]))}move(e){let t=this.kpuzzle.moveToTransformation(e),i=new $r(this.kpuzzle,!1);for(let n of this.kpuzzle.definition.orbits)for(let o=0;o<n.numPieces;o++)(t.transformationData[n.orbitName].permutation[o]!==o||t.transformationData[n.orbitName].orientationDelta[o]!==0)&&(i.stickerings.get(n.orbitName)[o]=!0);return i}moves(e){return e.map(t=>this.move(t))}orbits(e){let t=new $r(this.kpuzzle,!1);for(let i of e)t.stickerings.get(i).fill(!0);return t}orbitPrefix(e){let t=new $r(this.kpuzzle,!1);for(let i of this.kpuzzle.definition.orbits)i.orbitName.startsWith(e)&&t.stickerings.get(i.orbitName).fill(!0);return t}}});var H0,K0,cr,_n,pc,id=S(()=>{H0="Last Layer",K0="Last Slot",cr={"3x3x3":H0,megaminx:H0},_n={"3x3x3":K0,megaminx:K0},pc={full:{groups:{"3x3x3":"Stickering",megaminx:"Stickering"}},OLL:{groups:cr},PLL:{groups:cr},LL:{groups:cr},EOLL:{groups:cr},COLL:{groups:cr},OCLL:{groups:cr},CPLL:{groups:cr},CLL:{groups:cr},EPLL:{groups:cr},ELL:{groups:cr},ZBLL:{groups:cr},LS:{groups:_n},LSOLL:{groups:_n},LSOCLL:{groups:_n},ELS:{groups:_n},CLS:{groups:_n},ZBLS:{groups:_n},VLS:{groups:_n},WVLS:{groups:_n},F2L:{groups:{"3x3x3":"CFOP (Fridrich)"}},Daisy:{groups:{"3x3x3":"CFOP (Fridrich)"}},Cross:{groups:{"3x3x3":"CFOP (Fridrich)"}},EO:{groups:{"3x3x3":"ZZ"}},EOline:{groups:{"3x3x3":"ZZ"}},EOcross:{groups:{"3x3x3":"ZZ"}},FirstBlock:{groups:{"3x3x3":"Roux"}},SecondBlock:{groups:{"3x3x3":"Roux"}},CMLL:{groups:{"3x3x3":"Roux"}},L10P:{groups:{"3x3x3":"Roux"}},L6E:{groups:{"3x3x3":"Roux"}},L6EO:{groups:{"3x3x3":"Roux"}},"2x2x2":{groups:{"3x3x3":"Petrus"}},"2x2x3":{groups:{"3x3x3":"Petrus"}},EODF:{groups:{"3x3x3":"Nautilus"}},G1:{groups:{"3x3x3":"FMC"}},L2C:{groups:{"4x4x4":"Reduction","5x5x5":"Reduction","6x6x6":"Reduction"}},OBL:{groups:{"2x2x2":"General"}},PBL:{groups:{"2x2x2":"Ortega"}},"Void Cube":{groups:{"3x3x3":"Miscellaneous"}},invisible:{groups:{"3x3x3":"Miscellaneous"}},picture:{groups:{"3x3x3":"Miscellaneous"}},"centers-only":{groups:{"3x3x3":"Miscellaneous"}},"opposite-centers":{groups:{"4x4x4":"Reduction"}},"experimental-centers-U":{},"experimental-centers-U-D":{},"experimental-centers-U-L-D":{},"experimental-centers-U-L-B-D":{},"experimental-centers":{},"experimental-fto-fc":{groups:{fto:"Bencisco"}},"experimental-fto-f2t":{groups:{fto:"Bencisco"}},"experimental-fto-sc":{groups:{fto:"Bencisco"}},"experimental-fto-l2c":{groups:{fto:"Bencisco"}},"experimental-fto-lbt":{groups:{fto:"Bencisco"}},"experimental-fto-l3t":{groups:{fto:"Bencisco"}}}});var Y0={};vn(Y0,{experimentalIsBigCubeSolved:()=>g4,normalizeBigCubeOrientation:()=>j0,puzzleOrientationBigCubeCache:()=>q0,puzzleOrientationBigCubeIdx:()=>rd});function rd(r){let e=r.patternData.CORNERS.pieces[0],t=r.patternData.CORNERS.orientation[0];return[e,t]}function q0(r){if(!m4){let e=["","y","y2","y'","x2","x2 y","x2 y2","x2 y'"].map(i=>le.fromString(i)),t=new le("Rv Uv");for(let i of e){let n=r.algToTransformation(i);for(let o=0;o<4;o++){let[s,a]=rd(n.toKPattern());if(X0[s][a]=new le([...i.childAlgNodes(),new wt(t,o)]).invert(),o===3)break;n=n.applyAlg(t)}}}return X0}function j0(r){let[e,t]=rd(r),i=q0(r.kpuzzle)[e][t];return r.applyAlg(i)}function g4(r,e){return e.ignorePuzzleOrientation&&(r=j0(r)),r.isIdentical(r.kpuzzle.defaultPattern())}var X0,m4,Q0=S(()=>{ot();X0=new Array(8).fill(0).map(()=>new Array(3)),m4=!1});var Yl,dc,qi=S(()=>{Xi();ei();Qm();Lp();e0();t0();Zp();W0();Lp();uc();id();Yl=new It(jl);jl.experimentalIsPatternSolved=Cp;dc=He(()=>Promise.resolve().then(()=>(Q0(),Y0)))});async function Jr(r,e){return(await y4(r,e)).toStickeringMask()}async function y4(r,e){let t=await r.kpuzzle(),i=new Bo(t),n=new Go(t),o=()=>n.move("U"),s=()=>n.or(n.moves(["U","D"])),a=()=>n.or(n.moves(["L","R"])),l=()=>n.not(a()),c=()=>n.not(o()),f=()=>n.orbitPrefix("CENTER"),u=k=>n.and([n.move(k),f()]),p=()=>n.orbitPrefix("EDGE"),d=k=>n.and([n.and(n.moves(k)),p()]),m=()=>n.or([n.orbitPrefix("CORNER"),n.orbitPrefix("C4RNER"),n.orbitPrefix("C5RNER")]),y=()=>n.or([l(),n.and([o(),p()])]),g=()=>n.and([o(),f()]),h=()=>n.and([n.and(n.moves(["F","R"])),p()]),w=()=>n.and([n.and(n.moves(["F","R"])),m(),n.not(o())]),b=()=>n.or([w(),h()]);function v(){i.set(c(),j.Dim)}function P(){i.set(o(),j.PermuteNonPrimary),i.set(g(),j.Dim)}function D(){i.set(o(),j.IgnoreNonPrimary),i.set(g(),j.Regular)}function C(){i.set(o(),j.Ignoriented),i.set(g(),j.Dim)}switch(e){case"full":break;case"PLL":{v(),P();break}case"CLS":{v(),i.set(w(),j.Regular),i.set(o(),j.Ignoriented),i.set(n.and([o(),f()]),j.Dim),i.set(n.and([o(),m()]),j.IgnoreNonPrimary);break}case"OLL":{v(),D();break}case"EOLL":{v(),D(),i.set(n.and([o(),m()]),j.Ignored);break}case"COLL":{v(),i.set(n.and([o(),p()]),j.Ignoriented),i.set(n.and([o(),f()]),j.Dim),i.set(n.and([o(),m()]),j.Regular);break}case"OCLL":{v(),C(),i.set(n.and([o(),m()]),j.IgnoreNonPrimary);break}case"CPLL":{v(),i.set(n.and([m(),o()]),j.PermuteNonPrimary),i.set(n.and([n.not(m()),o()]),j.Dim);break}case"CLL":{v(),i.set(n.not(n.and([m(),o()])),j.Dim);break}case"EPLL":{v(),i.set(o(),j.Dim),i.set(n.and([o(),p()]),j.PermuteNonPrimary);break}case"ELL":{v(),i.set(o(),j.Dim),i.set(n.and([o(),p()]),j.Regular);break}case"ELS":{v(),D(),i.set(n.and([o(),m()]),j.Ignored),i.set(h(),j.Regular),i.set(w(),j.Ignored);break}case"LL":{v();break}case"F2L":{i.set(o(),j.Ignored);break}case"ZBLL":{v(),i.set(o(),j.PermuteNonPrimary),i.set(g(),j.Dim),i.set(n.and([o(),m()]),j.Regular);break}case"ZBLS":{v(),i.set(b(),j.Regular),D(),i.set(n.and([o(),m()]),j.Ignored);break}case"VLS":{v(),i.set(b(),j.Regular),D();break}case"WVLS":{v(),i.set(b(),j.Regular),i.set(n.and([o(),p()]),j.Ignoriented),i.set(n.and([o(),f()]),j.Dim),i.set(n.and([o(),m()]),j.IgnoreNonPrimary);break}case"LS":{v(),i.set(b(),j.Regular),i.set(o(),j.Ignored),i.set(g(),j.Dim);break}case"LSOLL":{v(),D(),i.set(b(),j.Regular);break}case"LSOCLL":{v(),C(),i.set(n.and([o(),m()]),j.IgnoreNonPrimary),i.set(b(),j.Regular);break}case"EO":{i.set(m(),j.Ignored),i.set(p(),j.OrientationWithoutPermutation);break}case"EOline":{i.set(m(),j.Ignored),i.set(p(),j.OrientationWithoutPermutation),i.set(n.and(n.moves(["D","M"])),j.Regular);break}case"EOcross":{i.set(p(),j.OrientationWithoutPermutation),i.set(n.move("D"),j.Regular),i.set(m(),j.Ignored);break}case"CMLL":{i.set(c(),j.Dim),i.set(y(),j.Ignored),i.set(n.and([o(),m()]),j.Regular);break}case"L10P":{i.set(n.not(y()),j.Dim),i.set(n.and([m(),o()]),j.Regular);break}case"L6E":{i.set(n.not(y()),j.Dim);break}case"L6EO":{i.set(n.not(y()),j.Dim),i.set(y(),j.ExperimentalOrientationWithoutPermutation2),i.set(n.and([f(),s()]),j.ExperimentalOrientationWithoutPermutation2),i.set(n.and([n.move("M"),n.move("E")]),j.Ignored);break}case"Daisy":{i.set(n.all(),j.Ignored),i.set(f(),j.Dim),i.set(n.and([n.move("D"),f()]),j.Regular),i.set(n.and([n.move("U"),p()]),j.IgnoreNonPrimary);break}case"Cross":{i.set(n.all(),j.Ignored),i.set(f(),j.Dim),i.set(n.and([n.move("D"),f()]),j.Regular),i.set(n.and([n.move("D"),p()]),j.Regular);break}case"2x2x2":{i.set(n.or(n.moves(["U","F","R"])),j.Ignored),i.set(n.and([n.or(n.moves(["U","F","R"])),f()]),j.Dim);break}case"2x2x3":{i.set(n.all(),j.Dim),i.set(n.or(n.moves(["U","F","R"])),j.Ignored),i.set(n.and([n.or(n.moves(["U","F","R"])),f()]),j.Dim),i.set(n.and([n.move("F"),n.not(n.or(n.moves(["U","R"])))]),j.Regular);break}case"G1":{i.set(n.all(),j.ExperimentalOrientationWithoutPermutation2),i.set(n.or(n.moves(["E"])),j.OrientationWithoutPermutation),i.set(n.and(n.moves(["E","S"])),j.Ignored);break}case"L2C":{i.set(n.or(n.moves(["L","R","B","D"])),j.Dim),i.set(n.not(f()),j.Ignored);break}case"PBL":{i.set(n.all(),j.Ignored),i.set(n.or(n.moves(["U","D"])),j.PermuteNonPrimary);break}case"FirstBlock":{i.set(n.not(n.and([n.and(n.moves(["L"])),n.not(o())])),j.Ignored),i.set(u("R"),j.Dim);break}case"SecondBlock":{i.set(n.not(n.and([n.and(n.moves(["L"])),n.not(o())])),j.Ignored),i.set(n.and([n.and(n.moves(["L"])),n.not(o())]),j.Dim),i.set(n.and([n.and(n.moves(["R"])),n.not(o())]),j.Regular);break}case"EODF":{v(),i.set(n.or([w(),n.and([o(),m()])]),j.Ignored),i.set(n.or([n.and([o(),p()]),h()]),j.OrientationWithoutPermutation),i.set(d(["D","F"]),j.Regular),i.set(u("F"),j.Regular);break}case"Void Cube":{i.set(f(),j.Invisible);break}case"picture":case"invisible":{i.set(n.all(),j.Invisible);break}case"centers-only":{i.set(n.not(f()),j.Ignored);break}case"opposite-centers":{i.set(n.not(n.and([f(),n.or(n.moves(["U","D"]))])),j.Ignored);break}case"OBL":{i.set(n.or(n.moves(["U","D"])),j.IgnoreNonPrimary);break}default:console.warn(`Unsupported stickering for ${r.id}: ${e}. Setting all pieces to dim.`),i.set(n.and(n.moves([])),j.Dim)}return i}async function wn(r,e){let t=[],i=[];for(let[n,o]of Object.entries(pc))o.groups&&(r in o.groups?t.push(n):e?.use3x3x3Fallbacks&&"3x3x3"in o.groups&&i.push(n));return t.concat(i)}var ba=S(()=>{uc();id()});var hc,nd=S(()=>{ot();hc={KeyI:new T("R"),KeyK:new T("R'"),KeyW:new T("B"),KeyO:new T("B'"),KeyS:new T("D"),KeyL:new T("D'"),KeyD:new T("L"),KeyE:new T("L'"),KeyJ:new T("U"),KeyF:new T("U'"),KeyH:new T("F"),KeyG:new T("F'"),KeyC:new T("l"),KeyR:new T("l'"),KeyU:new T("r"),KeyM:new T("r'"),KeyX:new T("d"),Comma:new T("d'"),KeyT:new T("x"),KeyY:new T("x"),KeyV:new T("x'"),KeyN:new T("x'"),Semicolon:new T("y"),KeyA:new T("y'"),KeyP:new T("z"),KeyQ:new T("z'"),KeyZ:new T("M'"),KeyB:new T("M"),Period:new T("M'"),Backquote:new At}});function ti(r,e,t,i){let n=[];for(let o of r){let s=T.fromString(o),{family:a,amount:l}=s;if(![-1,1].includes(l))throw new Error("Invalid config move");n.push({family:a,direction:l,type:e,from:t,to:i})}return n}function Z0(r,e){let t=$0[r][e]?.[0];if(!t)throw new Error(`Could not find a reference move (axis: ${r}, move source type: ${e})`);return t}function S4(r,e,t,i){if(e+1===t){let p=J0[r].get(e);if(p)return new T(new Te(p.family),i*p.direction)}let n=no[r],{sliceDiameter:o}=n;if(e===0&&t===o){let p=Z0(r,xt.ROTATION);return new T(new Te(p.family),i*p.direction)}let s=e+t>o;s&&([e,t]=[o-t,o-e]);let a=e+1,l=t,c=a===l;c&&(l=null),a===1&&(a=null),c&&a===1&&(l=null),!c&&l===2&&(l=null);let f=c?s?xt.INDEXABLE_SLICE_FAR:xt.INDEXABLE_SLICE_NEAR:s?xt.INDEXABLE_WIDE_FAR:xt.INDEXABLE_WIDE_NEAR,u=Z0(r,f);return new T(new Te(u.family,l,a),i*u.direction)}function v4(r,e=!0){if(r.length===0)return[];let t=_a[r[0].family].axis,i=no[t],{sliceDiameter:n}=i,o=new Map,s=null;function a(p,d){let m=(o.get(p)??0)+d;e&&(m=m%4+5%4-1),m===0?o.delete(p):o.set(p,m)}let l=0;for(let p of Array.from(r).reverse()){l++;let{moveSourceInfo:d}=_a[p.family],m=p.amount*d.direction;switch(d.type){case xt.INDEXABLE_SLICE_NEAR:{let y=(p.innerLayer??1)-1;a(y,m),a(y+1,-m);break}case xt.INDEXABLE_SLICE_FAR:{let y=n-(p.innerLayer??1);a(y,m),a(y+1,-m);break}case xt.INDEXABLE_WIDE_NEAR:{a((p.outerLayer??1)-1,m),a(p.innerLayer??2,-m);break}case xt.INDEXABLE_WIDE_FAR:{a(n-(p.innerLayer??2),m),a(n-((p.outerLayer??1)-1),-m);break}case xt.SPECIFIC_SLICE:{a(d.from,m),a(d.to,-m);break}case xt.ROTATION:{a(0,m),a(n,-m);break}}[0,2].includes(o.size)&&(s={suffixLength:l,sliceDeltas:new Map(o)})}if(o.size===0)return[];if(!s)return r;let[c,f]=s.sliceDeltas.keys();c>f&&([c,f]=[f,c]);let u=s.sliceDeltas.get(c);return[...r.slice(0,-s.suffixLength),...u!==0?[S4(t,c,f,u)]:[]]}var od,xt,no,_a,$0,J0,x4,eg,tg=S(()=>{ot();od={X:"x axis",Y:"y axis",Z:"z axis"},xt={INDEXABLE_SLICE_NEAR:0,INDEXABLE_SLICE_FAR:1,INDEXABLE_WIDE_NEAR:2,INDEXABLE_WIDE_FAR:3,SPECIFIC_SLICE:4,ROTATION:5};no={[od.X]:{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...ti(["R"],xt.INDEXABLE_SLICE_NEAR,0,3),...ti(["L'"],xt.INDEXABLE_SLICE_FAR,0,3),...ti(["r","Rw"],xt.INDEXABLE_WIDE_NEAR,0,2),...ti(["l'","Lw'"],xt.INDEXABLE_WIDE_FAR,0,2),...ti(["M'"],xt.SPECIFIC_SLICE,1,2),...ti(["x","Uv","Dv'"],xt.ROTATION,0,3)]},[od.Y]:{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...ti(["U"],xt.INDEXABLE_SLICE_NEAR,0,3),...ti(["D'"],xt.INDEXABLE_SLICE_FAR,0,3),...ti(["u","Uw"],xt.INDEXABLE_WIDE_NEAR,0,2),...ti(["d'","Dw'"],xt.INDEXABLE_WIDE_FAR,0,2),...ti(["E'"],xt.SPECIFIC_SLICE,1,2),...ti(["y","Uv","Dv'"],xt.ROTATION,0,3)]},[od.Z]:{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...ti(["F"],xt.INDEXABLE_SLICE_NEAR,0,3),...ti(["B'"],xt.INDEXABLE_SLICE_FAR,0,3),...ti(["f","Fw"],xt.INDEXABLE_WIDE_NEAR,0,3),...ti(["b'","Bw'"],xt.INDEXABLE_WIDE_FAR,0,3),...ti(["S"],xt.SPECIFIC_SLICE,1,2),...ti(["z","Fv","Bv'"],xt.ROTATION,0,3)]}},_a={};for(let[r,e]of Object.entries(no))for(let t of e.moveSourceInfos)_a[t.family]={axis:r,moveSourceInfo:t};$0={};for(let r of Object.keys(no)){let e={};$0[r]=e;for(let t of no[r].moveSourceInfos)(e[t.type]??=[]).push(t)}J0={};for(let r of Object.keys(no)){let e=new Map;J0[r]=e;for(let t of no[r].moveSourceInfos)e.get(t.from)||e.set(t.from,t)}x4=(r,e)=>_a[r.family].axis===_a[e.family].axis;eg={quantumMoveOrder:()=>4,axis:{areQuantumMovesSameAxis:x4,simplifySameAxisMoves:v4}}});var E4,ig=S(()=>{E4=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
       "http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 518 440" preserveAspectRatio="xMidYMid meet">
  <title>3x3x3</title>
  <defs>
    <g id="sticker">
        <rect x="0" y="0" width="1" height="1" stroke="black" stroke-width="0.04px" />
    </g>
    <g id="sticker-thin-v">
        <rect x="0" y="0" width="0.5" height="1" stroke="black" stroke-width="0.04px" style="opacity: 0.3;" />
    </g>
    <g id="sticker-thin-h">
        <rect x="0" y="0" width="1" height="0.5" stroke="black" stroke-width="0.04px" style="opacity: 0.3;" />
    </g>
  </defs>
  <g id="puzzle" transform="translate(5,40) scale(40)">
    <g class="hint-facelet">
      <use data-copy-id="CORNERS-l0-o1" href="#sticker-thin-v" transform="translate(6.5,2.1)" style="fill: red"/>
      <use data-copy-id="EDGES-l1-o1"   href="#sticker-thin-v" transform="translate(6.5,1.1)" style="fill: red"/>
      <use data-copy-id="CORNERS-l1-o2" href="#sticker-thin-v" transform="translate(6.5,0.1)" style="fill: red"/>

      <use data-copy-id="CORNERS-l2-o2" href="#sticker-thin-h" transform="translate(3.3,-0.6)" style="fill: #26f"/>
      <use data-copy-id="EDGES-l2-o1"   href="#sticker-thin-h" transform="translate(4.3,-0.6)" style="fill: #26f"/>
      <use data-copy-id="CORNERS-l1-o1" href="#sticker-thin-h" transform="translate(5.3,-0.6)" style="fill: #26f"/>

      <use data-copy-id="CORNERS-l3-o2" href="#sticker-thin-v" transform="translate(2.6,2.1)" style="fill: orange"/>
      <use data-copy-id="EDGES-l3-o1"   href="#sticker-thin-v" transform="translate(2.6,1.1)" style="fill: orange"/>
      <use data-copy-id="CORNERS-l2-o1" href="#sticker-thin-v" transform="translate(2.6,0.1)" style="fill: orange"/>
    </g>

    <!-- CORNERS -->
    <use id="CORNERS-l0-o0" href="#sticker" transform="translate(5.3,2.1)" style="fill: white"/>
    <use id="CORNERS-l0-o1" href="#sticker" transform="translate(6.5,3.3)" style="fill: red"/>
    <use id="CORNERS-l0-o2" href="#sticker" transform="translate(5.3,3.3)" style="fill: limegreen"/>

    <use id="CORNERS-l1-o0" href="#sticker" transform="translate(5.3,0.1)" style="fill: white"/>
    <use id="CORNERS-l1-o1" href="#sticker" transform="translate(9.7,3.3)" style="fill: #26f"/>
    <use id="CORNERS-l1-o2" href="#sticker" transform="translate(8.5,3.3)" style="fill: red"/>

    <use id="CORNERS-l2-o0" href="#sticker" transform="translate(3.3,0.1)" style="fill: white"/>
    <use id="CORNERS-l2-o1" href="#sticker" transform="translate(0.1,3.3)" style="fill: orange"/>
    <use id="CORNERS-l2-o2" href="#sticker" transform="translate(11.7,3.3)" style="fill: #26f"/>

    <use id="CORNERS-l3-o0" href="#sticker" transform="translate(3.3,2.1)" style="fill: white"/>
    <use id="CORNERS-l3-o1" href="#sticker" transform="translate(3.3,3.3)" style="fill: limegreen"/>
    <use id="CORNERS-l3-o2" href="#sticker" transform="translate(2.1,3.3)" style="fill: orange"/>

    <use id="CORNERS-l4-o0" href="#sticker" transform="translate(5.3,6.5)" style="fill: yellow"/>
    <use id="CORNERS-l4-o1" href="#sticker" transform="translate(5.3,5.3)" style="fill: limegreen"/>
    <use id="CORNERS-l4-o2" href="#sticker" transform="translate(6.5,5.3)" style="fill: red"/>

    <use id="CORNERS-l5-o0" href="#sticker" transform="translate(3.3,6.5)" style="fill: yellow"/>
    <use id="CORNERS-l5-o1" href="#sticker" transform="translate(2.1,5.3)" style="fill: orange"/>
    <use id="CORNERS-l5-o2" href="#sticker" transform="translate(3.3,5.3)" style="fill: limegreen"/>

    <use id="CORNERS-l6-o0" href="#sticker" transform="translate(3.3,8.5)" style="fill: yellow"/>
    <use id="CORNERS-l6-o1" href="#sticker" transform="translate(11.7,5.3)" style="fill: #26f"/>
    <use id="CORNERS-l6-o2" href="#sticker" transform="translate(0.1,5.3)"  style="fill: orange"/>

    <use id="CORNERS-l7-o0" href="#sticker" transform="translate(5.3,8.5)" style="fill: yellow"/>
    <use id="CORNERS-l7-o1" href="#sticker" transform="translate(8.5,5.3)" style="fill: red"/>
    <use id="CORNERS-l7-o2" href="#sticker" transform="translate(9.7,5.3)" style="fill: #26f"/>

    <!-- EDGES -->
    <use id="EDGES-l0-o0"  href="#sticker" transform="translate(4.3,2.1)" style="fill: white"/>
    <use id="EDGES-l0-o1"  href="#sticker" transform="translate(4.3,3.3)" style="fill: limegreen"/>

    <use id="EDGES-l1-o0"  href="#sticker" transform="translate(5.3,1.1)" style="fill: white"/>
    <use id="EDGES-l1-o1"  href="#sticker" transform="translate(7.5,3.3)" style="fill: red"/>

    <use id="EDGES-l2-o0"  href="#sticker" transform="translate(4.3,0.1)" style="fill: white"/>
    <use id="EDGES-l2-o1"  href="#sticker" transform="translate(10.7,3.3)" style="fill: #26f"/>

    <use id="EDGES-l3-o0"  href="#sticker" transform="translate(3.3,1.1)" style="fill: white"/>
    <use id="EDGES-l3-o1"  href="#sticker" transform="translate(1.1,3.3)" style="fill: orange"/>

    <use id="EDGES-l4-o0"  href="#sticker" transform="translate(4.3,6.5)" style="fill: yellow"/>
    <use id="EDGES-l4-o1"  href="#sticker" transform="translate(4.3,5.3)" style="fill: limegreen"/>

    <use id="EDGES-l5-o0" href="#sticker" transform="translate(5.3,7.5)" style="fill: yellow"/>
    <use id="EDGES-l5-o1" href="#sticker" transform="translate(7.5,5.3)" style="fill: red"/>

    <use id="EDGES-l6-o0" href="#sticker" transform="translate(4.3,8.5)" style="fill: yellow"/>
    <use id="EDGES-l6-o1" href="#sticker" transform="translate(10.7,5.3)" style="fill: #26f"/>

    <use id="EDGES-l7-o0"  href="#sticker" transform="translate(3.3,7.5)" style="fill: yellow"/>
    <use id="EDGES-l7-o1"  href="#sticker" transform="translate(1.1,5.3)" style="fill: orange"/>

    <use id="EDGES-l8-o0"  href="#sticker" transform="translate(5.3,4.3)" style="fill: limegreen"/>
    <use id="EDGES-l8-o1"  href="#sticker" transform="translate(6.5,4.3)" style="fill: red"/>

    <use id="EDGES-l9-o0"  href="#sticker" transform="translate(3.3,4.3)" style="fill: limegreen"/>
    <use id="EDGES-l9-o1"  href="#sticker" transform="translate(2.1,4.3)" style="fill: orange"/>

    <use id="EDGES-l10-o0" href="#sticker" transform="translate(9.7,4.3)" style="fill: #26f"/>
    <use id="EDGES-l10-o1" href="#sticker" transform="translate(8.5,4.3)" style="fill: red"/>

    <use id="EDGES-l11-o0" href="#sticker" transform="translate(11.7,4.3)" style="fill: #26f"/>
    <use id="EDGES-l11-o1" href="#sticker" transform="translate(0.1,4.3)" style="fill: orange"/>

    <!-- CENTERS -->
    <!-- TODO: Allow the same sticker to be reused for multiple orientations -->
    <use id="CENTERS-l0-o0" href="#sticker" transform="translate(4.3,1.1)" style="fill: white"/>
    <use id="CENTERS-l0-o1" href="#sticker" transform="translate(4.3,1.1)" style="fill: white"/>
    <use id="CENTERS-l0-o2" href="#sticker" transform="translate(4.3,1.1)" style="fill: white"/>
    <use id="CENTERS-l0-o3" href="#sticker" transform="translate(4.3,1.1)" style="fill: white"/>

    <use id="CENTERS-l1-o0" href="#sticker" transform="translate(1.1,4.3)" style="fill: orange"/>
    <use id="CENTERS-l1-o1" href="#sticker" transform="translate(1.1,4.3)" style="fill: orange"/>
    <use id="CENTERS-l1-o2" href="#sticker" transform="translate(1.1,4.3)" style="fill: orange"/>
    <use id="CENTERS-l1-o3" href="#sticker" transform="translate(1.1,4.3)" style="fill: orange"/>

    <use id="CENTERS-l2-o0" href="#sticker" transform="translate(4.3,4.3)" style="fill: limegreen"/>
    <use id="CENTERS-l2-o1" href="#sticker" transform="translate(4.3,4.3)" style="fill: limegreen"/>
    <use id="CENTERS-l2-o2" href="#sticker" transform="translate(4.3,4.3)" style="fill: limegreen"/>
    <use id="CENTERS-l2-o3" href="#sticker" transform="translate(4.3,4.3)" style="fill: limegreen"/>

    <use id="CENTERS-l3-o0" href="#sticker" transform="translate(7.5,4.3)" style="fill: red"/>
    <use id="CENTERS-l3-o1" href="#sticker" transform="translate(7.5,4.3)" style="fill: red"/>
    <use id="CENTERS-l3-o2" href="#sticker" transform="translate(7.5,4.3)" style="fill: red"/>
    <use id="CENTERS-l3-o3" href="#sticker" transform="translate(7.5,4.3)" style="fill: red"/>

    <use id="CENTERS-l4-o0" href="#sticker" transform="translate(10.7,4.3)" style="fill: #26f"/>
    <use id="CENTERS-l4-o1" href="#sticker" transform="translate(10.7,4.3)" style="fill: #26f"/>
    <use id="CENTERS-l4-o2" href="#sticker" transform="translate(10.7,4.3)" style="fill: #26f"/>
    <use id="CENTERS-l4-o3" href="#sticker" transform="translate(10.7,4.3)" style="fill: #26f"/>

    <use id="CENTERS-l5-o0" href="#sticker" transform="translate(4.3,7.5)" style="fill: yellow"/>
    <use id="CENTERS-l5-o1" href="#sticker" transform="translate(4.3,7.5)" style="fill: yellow"/>
    <use id="CENTERS-l5-o2" href="#sticker" transform="translate(4.3,7.5)" style="fill: yellow"/>
    <use id="CENTERS-l5-o3" href="#sticker" transform="translate(4.3,7.5)" style="fill: yellow"/>
  </g>

</svg>
`});var M4,rg=S(()=>{M4=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="288px" height="288px" viewBox="-16 -16 288 288" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>3x3x3 LL</title>
  <defs>
    <g id="sticker">
        <rect x="-10" y="-10" width="1" height="1" stroke="black" stroke-width="0.04px" />
    </g>
  </defs>
  <g id="3x3x3-LL" stroke="none" stroke-width="4" style="none" stroke-linejoin="round">
    <rect id="CENTERS-l0-o0" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>
    <rect id="CENTERS-l0-o1" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>
    <rect id="CENTERS-l0-o2" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>
    <rect id="CENTERS-l0-o3" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>

    <rect    id="CORNERS-l0-o0" stroke="#000000" style="fill: white" x="160" y="160" width="64" height="64"></rect>
    <polygon id="CORNERS-l0-o1" stroke="#000000" style="fill: red" points="224 160 252 160 252 252 224 224"></polygon>
    <polygon id="CORNERS-l0-o2" stroke="#000000" style="fill: limegreen" transform="translate(206, 238) scale(1, -1) rotate(-90) translate(-206, -238) " points="192 192 220 192 220 284 192 256"></polygon>
    <rect    id="CORNERS-l1-o0" stroke="#000000" style="fill: white" x="160" y="32" width="64" height="64"></rect>
    <polygon id="CORNERS-l1-o1" stroke="#000000" style="fill: #26f" transform="translate(206, 18) rotate(-90) translate(-206, -18) " points="192 -28 220 -28 220 64 192 36"></polygon>
    <polygon id="CORNERS-l1-o2" stroke="#000000" style="fill: red" transform="translate(238, 50) scale(1, -1) translate(-238, -50) " points="224 4 252 4 252 96 224 68"></polygon>
    <rect    id="CORNERS-l2-o0" stroke="#000000" style="fill: white" x="32" y="32" width="64" height="64"></rect>
    <polygon id="CORNERS-l2-o1" stroke="#000000" style="fill: orange" transform="translate(18, 50) scale(-1, -1) translate(-18, -50) " points="4 4 32 4 32 96 4 68"></polygon>
    <polygon id="CORNERS-l2-o2" stroke="#000000" style="fill: #26f" transform="translate(50, 18) scale(1, -1) rotate(90) translate(-50, -18) " points="36 -28 64 -28 64 64 36 36"></polygon>
    <rect    id="CORNERS-l3-o0" stroke="#000000" style="fill: white" x="32" y="160" width="64" height="64"></rect>
    <polygon id="CORNERS-l3-o1" stroke="#000000" style="fill: limegreen" transform="translate(50, 238) rotate(90) translate(-50, -238) " points="36 192 64 192 64 284 36 256"></polygon>
    <polygon id="CORNERS-l3-o2" stroke="#000000" style="fill: orange" transform="translate(18, 206) scale(-1, 1) translate(-18, -206) " points="4 160 32 160 32 252 4 224"></polygon>

    <rect id="EDGES-l0-o0" stroke="#000000" style="fill: white" x="96" y="160" width="64" height="64"></rect>
    <rect id="EDGES-l0-o1" stroke="#000000" style="fill: limegreen" transform="translate(128, 238) scale(1, -1) rotate(90) translate(-128, -238) " x="114" y="206" width="28" height="64"></rect>
    <rect id="EDGES-l1-o0" stroke="#000000" style="fill: white" x="160" y="96" width="64" height="64"></rect>
    <rect id="EDGES-l1-o1" stroke="#000000" style="fill: red" x="224" y="96" width="28" height="64"></rect>
    <rect id="EDGES-l2-o0" stroke="#000000" style="fill: white" x="96" y="32" width="64" height="64"></rect>
    <rect id="EDGES-l2-o1" stroke="#000000" style="fill: #26f" transform="translate(128, 18) scale(1, -1) rotate(90) translate(-128, -18) " x="114" y="-14" width="28" height="64"></rect>
    <rect id="EDGES-l3-o0" stroke="#000000" style="fill: white" x="32" y="96" width="64" height="64"></rect>
    <rect id="EDGES-l3-o1" stroke="#000000" style="fill: orange" x="4" y="96" width="28" height="64"></rect>

  </g>
  <g style="opacity: 0">
    <!-- CORNERS -->
    <use id="CORNERS-l4-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l4-o1" href="#sticker" style="fill: limegreen"/>
    <use id="CORNERS-l4-o2" href="#sticker" style="fill: red"/>

    <use id="CORNERS-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l5-o1" href="#sticker" style="fill: orange"/>
    <use id="CORNERS-l5-o2" href="#sticker" style="fill: limegreen"/>

    <use id="CORNERS-l6-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l6-o1" href="#sticker" style="fill: #26f"/>
    <use id="CORNERS-l6-o2" href="#sticker"  style="fill: orange"/>

    <use id="CORNERS-l7-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l7-o1" href="#sticker" style="fill: red"/>
    <use id="CORNERS-l7-o2" href="#sticker" style="fill: #26f"/>

    <!-- EDGES -->
    <use id="EDGES-l4-o0"  href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l4-o1"  href="#sticker" style="fill: limegreen"/>

    <use id="EDGES-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l5-o1" href="#sticker" style="fill: red"/>

    <use id="EDGES-l6-o0" href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l6-o1" href="#sticker" style="fill: #26f"/>

    <use id="EDGES-l7-o0"  href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l7-o1"  href="#sticker" style="fill: orange"/>

    <use id="EDGES-l8-o0"  href="#sticker" style="fill: limegreen"/>
    <use id="EDGES-l8-o1"  href="#sticker" style="fill: red"/>

    <use id="EDGES-l9-o0"  href="#sticker" style="fill: limegreen"/>
    <use id="EDGES-l9-o1"  href="#sticker" style="fill: orange"/>

    <use id="EDGES-l10-o0" href="#sticker" style="fill: #26f"/>
    <use id="EDGES-l10-o1" href="#sticker" style="fill: red"/>

    <use id="EDGES-l11-o0" href="#sticker" style="fill: #26f"/>
    <use id="EDGES-l11-o1" href="#sticker" style="fill: orange"/>

    <!-- CENTERS -->
    <!-- TODO: Allow the same sticker to be reused for multiple orientations -->
    <use id="CENTERS-l1-o0" href="#sticker" style="fill: orange"/>
    <use id="CENTERS-l1-o1" href="#sticker" style="fill: orange"/>
    <use id="CENTERS-l1-o2" href="#sticker" style="fill: orange"/>
    <use id="CENTERS-l1-o3" href="#sticker" style="fill: orange"/>

    <use id="CENTERS-l2-o0" href="#sticker" style="fill: limegreen"/>
    <use id="CENTERS-l2-o1" href="#sticker" style="fill: limegreen"/>
    <use id="CENTERS-l2-o2" href="#sticker" style="fill: limegreen"/>
    <use id="CENTERS-l2-o3" href="#sticker" style="fill: limegreen"/>

    <use id="CENTERS-l3-o0" href="#sticker" style="fill: red"/>
    <use id="CENTERS-l3-o1" href="#sticker" style="fill: red"/>
    <use id="CENTERS-l3-o2" href="#sticker" style="fill: red"/>
    <use id="CENTERS-l3-o3" href="#sticker" style="fill: red"/>

    <use id="CENTERS-l4-o0" href="#sticker" style="fill: #26f"/>
    <use id="CENTERS-l4-o1" href="#sticker" style="fill: #26f"/>
    <use id="CENTERS-l4-o2" href="#sticker" style="fill: #26f"/>
    <use id="CENTERS-l4-o3" href="#sticker" style="fill: #26f"/>

    <use id="CENTERS-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="CENTERS-l5-o1" href="#sticker" style="fill: yellow"/>
    <use id="CENTERS-l5-o2" href="#sticker" style="fill: yellow"/>
    <use id="CENTERS-l5-o3" href="#sticker" style="fill: yellow"/>
  </g>
</svg>`});var b4,ng=S(()=>{b4=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="204px" height="204px" viewBox="30 30 196 196" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>3x3x3 LL</title>
  <defs>
    <g id="sticker">
        <rect x="-10" y="-10" width="1" height="1" stroke="black" stroke-width="0.04px" />
    </g>
  </defs>
  <g id="3x3x3-LL" stroke="none" stroke-width="4" style="none" stroke-linejoin="round">
    <rect x="32" y="32" width="192" height="192" stroke="black" stroke-width="16px" />
    <rect id="CENTERS-l0-o0" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>
    <rect id="CENTERS-l0-o1" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>
    <rect id="CENTERS-l0-o2" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>
    <rect id="CENTERS-l0-o3" stroke="#000000" style="fill: white" x="96" y="96" width="64" height="64"></rect>

    <rect id="CORNERS-l0-o0" stroke="#000000" style="fill: white" x="160" y="160" width="64" height="64"></rect>
    <rect id="CORNERS-l1-o0" stroke="#000000" style="fill: white" x="160" y="32" width="64" height="64"></rect>
    <rect id="CORNERS-l2-o0" stroke="#000000" style="fill: white" x="32" y="32" width="64" height="64"></rect>
    <rect id="CORNERS-l3-o0" stroke="#000000" style="fill: white" x="32" y="160" width="64" height="64"></rect>

    <rect id="EDGES-l0-o0" stroke="#000000" style="fill: white" x="96" y="160" width="64" height="64"></rect>
    <rect id="EDGES-l1-o0" stroke="#000000" style="fill: white" x="160" y="96" width="64" height="64"></rect>
    <rect id="EDGES-l2-o0" stroke="#000000" style="fill: white" x="96" y="32" width="64" height="64"></rect>
    <rect id="EDGES-l3-o0" stroke="#000000" style="fill: white" x="32" y="96" width="64" height="64"></rect>
  </g>
  <g style="opacity: 0">
    <polygon id="CORNERS-l0-o1" stroke="#000000" style="fill: red" points="224 160 252 160 252 252 224 224"></polygon>
    <polygon id="CORNERS-l0-o2" stroke="#000000" style="fill: limegreen" transform="translate(206, 238) scale(1, -1) rotate(-90) translate(-206, -238) " points="192 192 220 192 220 284 192 256"></polygon>
    <polygon id="CORNERS-l1-o1" stroke="#000000" style="fill: #26f" transform="translate(206, 18) rotate(-90) translate(-206, -18) " points="192 -28 220 -28 220 64 192 36"></polygon>
    <polygon id="CORNERS-l1-o2" stroke="#000000" style="fill: red" transform="translate(238, 50) scale(1, -1) translate(-238, -50) " points="224 4 252 4 252 96 224 68"></polygon>
    <polygon id="CORNERS-l2-o1" stroke="#000000" style="fill: orange" transform="translate(18, 50) scale(-1, -1) translate(-18, -50) " points="4 4 32 4 32 96 4 68"></polygon>
    <polygon id="CORNERS-l2-o2" stroke="#000000" style="fill: #26f" transform="translate(50, 18) scale(1, -1) rotate(90) translate(-50, -18) " points="36 -28 64 -28 64 64 36 36"></polygon>
    <polygon id="CORNERS-l3-o1" stroke="#000000" style="fill: limegreen" transform="translate(50, 238) rotate(90) translate(-50, -238) " points="36 192 64 192 64 284 36 256"></polygon>
    <polygon id="CORNERS-l3-o2" stroke="#000000" style="fill: orange" transform="translate(18, 206) scale(-1, 1) translate(-18, -206) " points="4 160 32 160 32 252 4 224"></polygon>

    <rect id="EDGES-l0-o1" stroke="#000000" style="fill: limegreen" transform="translate(128, 238) scale(1, -1) rotate(90) translate(-128, -238) " x="114" y="206" width="28" height="64"></rect>
    <rect id="EDGES-l1-o1" stroke="#000000" style="fill: red" x="224" y="96" width="28" height="64"></rect>
    <rect id="EDGES-l2-o1" stroke="#000000" style="fill: #26f" transform="translate(128, 18) scale(1, -1) rotate(90) translate(-128, -18) " x="114" y="-14" width="28" height="64"></rect>
    <rect id="EDGES-l3-o1" stroke="#000000" style="fill: orange" x="4" y="96" width="28" height="64"></rect>

    <!-- CORNERS -->
    <use id="CORNERS-l4-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l4-o1" href="#sticker" style="fill: limegreen"/>
    <use id="CORNERS-l4-o2" href="#sticker" style="fill: red"/>

    <use id="CORNERS-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l5-o1" href="#sticker" style="fill: orange"/>
    <use id="CORNERS-l5-o2" href="#sticker" style="fill: limegreen"/>

    <use id="CORNERS-l6-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l6-o1" href="#sticker" style="fill: #26f"/>
    <use id="CORNERS-l6-o2" href="#sticker"  style="fill: orange"/>

    <use id="CORNERS-l7-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l7-o1" href="#sticker" style="fill: red"/>
    <use id="CORNERS-l7-o2" href="#sticker" style="fill: #26f"/>

    <!-- EDGES -->
    <use id="EDGES-l4-o0"  href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l4-o1"  href="#sticker" style="fill: limegreen"/>

    <use id="EDGES-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l5-o1" href="#sticker" style="fill: red"/>

    <use id="EDGES-l6-o0" href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l6-o1" href="#sticker" style="fill: #26f"/>

    <use id="EDGES-l7-o0"  href="#sticker" style="fill: yellow"/>
    <use id="EDGES-l7-o1"  href="#sticker" style="fill: orange"/>

    <use id="EDGES-l8-o0"  href="#sticker" style="fill: limegreen"/>
    <use id="EDGES-l8-o1"  href="#sticker" style="fill: red"/>

    <use id="EDGES-l9-o0"  href="#sticker" style="fill: limegreen"/>
    <use id="EDGES-l9-o1"  href="#sticker" style="fill: orange"/>

    <use id="EDGES-l10-o0" href="#sticker" style="fill: #26f"/>
    <use id="EDGES-l10-o1" href="#sticker" style="fill: red"/>

    <use id="EDGES-l11-o0" href="#sticker" style="fill: #26f"/>
    <use id="EDGES-l11-o1" href="#sticker" style="fill: orange"/>

    <!-- CENTERS -->
    <!-- TODO: Allow the same sticker to be reused for multiple orientations -->
    <use id="CENTERS-l1-o0" href="#sticker" style="fill: orange"/>
    <use id="CENTERS-l1-o1" href="#sticker" style="fill: orange"/>
    <use id="CENTERS-l1-o2" href="#sticker" style="fill: orange"/>
    <use id="CENTERS-l1-o3" href="#sticker" style="fill: orange"/>

    <use id="CENTERS-l2-o0" href="#sticker" style="fill: limegreen"/>
    <use id="CENTERS-l2-o1" href="#sticker" style="fill: limegreen"/>
    <use id="CENTERS-l2-o2" href="#sticker" style="fill: limegreen"/>
    <use id="CENTERS-l2-o3" href="#sticker" style="fill: limegreen"/>

    <use id="CENTERS-l3-o0" href="#sticker" style="fill: red"/>
    <use id="CENTERS-l3-o1" href="#sticker" style="fill: red"/>
    <use id="CENTERS-l3-o2" href="#sticker" style="fill: red"/>
    <use id="CENTERS-l3-o3" href="#sticker" style="fill: red"/>

    <use id="CENTERS-l4-o0" href="#sticker" style="fill: #26f"/>
    <use id="CENTERS-l4-o1" href="#sticker" style="fill: #26f"/>
    <use id="CENTERS-l4-o2" href="#sticker" style="fill: #26f"/>
    <use id="CENTERS-l4-o3" href="#sticker" style="fill: #26f"/>

    <use id="CENTERS-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="CENTERS-l5-o1" href="#sticker" style="fill: yellow"/>
    <use id="CENTERS-l5-o2" href="#sticker" style="fill: yellow"/>
    <use id="CENTERS-l5-o3" href="#sticker" style="fill: yellow"/>
  </g>
</svg>`});var mc={};vn(mc,{cube3x3x3LLFaceSVG:()=>b4,cube3x3x3LLSVG:()=>M4,cube3x3x3SVG:()=>E4});var gc=S(()=>{ig();rg();ng()});var wa,Rn,yc=S(()=>{lr();ei();qi();ba();nd();tg();wa={"\u2194 Mirror (M)":{replaceMovesByFamily:{L:"R",R:"L",l:"r",r:"l",Lw:"Rw",Rw:"Lw",Lv:"Rv",Rv:"Lv"},invertExceptByFamily:new Set(["x","M","m"])},"\u2922 Mirror (S)":{replaceMovesByFamily:{F:"B",B:"F",f:"b",b:"f",Fw:"Bw",Bw:"Fw",Fv:"Bv",Bv:"Fv"},invertExceptByFamily:new Set(["z","S","s"])},"\u2195 Mirror (E)":{replaceMovesByFamily:{U:"D",D:"U",u:"d",d:"u",Uw:"Dw",Dw:"Uw",Uv:"Dv",Dv:"Uv"},invertExceptByFamily:new Set(["y","E","e"])}},Rn={id:"3x3x3",fullName:"3\xD73\xD73 Cube",inventedBy:["Ern\u0151 Rubik"],inventionYear:1974,kpuzzle:He(async()=>Yl),svg:He(async()=>(await Promise.resolve().then(()=>(gc(),mc))).cube3x3x3SVG),llSVG:He(async()=>(await Promise.resolve().then(()=>(gc(),mc))).cube3x3x3LLSVG),llFaceSVG:He(async()=>(await Promise.resolve().then(()=>(gc(),mc))).cube3x3x3LLFaceSVG),pg:He(async()=>Ra("3x3x3")),stickeringMask:r=>Jr(Rn,r),stickerings:()=>wn("3x3x3"),puzzleSpecificSimplifyOptions:eg,keyMapping:async()=>hc,algTransformData:wa}});async function Ra(r){return(await Promise.resolve().then(()=>(va(),Sa))).getPuzzleGeometryByName(r,{allMoves:!0,orientCenters:!0,addRotations:!0})}async function _4(r){return(await Promise.resolve().then(()=>(va(),Sa))).getPuzzleGeometryByName(r)}async function $p(r,e,t){let i=await r,n=i.getKPuzzleDefinition(!0);n.name=e;let o=await Promise.resolve().then(()=>(va(),Sa)),s=new o.ExperimentalPGNotation(i,i.getOrbitsDef(!0));if(t){let a=new Set(t);for(let[l,c]of Object.entries(n.defaultPattern))a.has(l)&&(c.orientationMod=new Array(c.pieces.length).fill(1))}return new It(s.remapKPuzzleDefinition(n),{experimentalPGNotation:s})}function Jp(r){return new Tr(async()=>{let e=await r();return{quantumMoveOrder:t=>e.moveToTransformation(new T(t)).repetitionOrder()}})}var Xt,Cr,lr=S(()=>{Po();ot();Xi();yc();ba();ei();Xt=class{pgId;id;fullName;inventedBy;inventionYear;#e;constructor(e){this.pgId=e.pgID,this.id=e.id,this.fullName=e.fullName,this.inventedBy=e.inventedBy,this.inventionYear=e.inventionYear,this.#e=e.setOrientationModTo1ForPiecesOfOrbits}#t;pg(){return this.#t??=Ra(this.pgId??this.id)}#i;basePG(){return this.#i??=_4(this.pgId??this.id)}#n;kpuzzle(){return this.#n??=$p(this.pg(),this.id,this.#e)}#o;svg(){return this.#o??=(async()=>(await this.pg()).generatesvg())()}puzzleSpecificSimplifyOptionsPromise=Jp(this.kpuzzle.bind(this))},Cr=class extends Xt{stickeringMask(e){return Jr(this,e)}stickerings=()=>wn(this.id,{use3x3x3Fallbacks:!0});algTransformData=wa}});var og,sg=S(()=>{og={name:"2x2x2",orbits:[{orbitName:"CORNERS",numPieces:8,numOrientations:3}],defaultPattern:{CORNERS:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]}},moves:{U:{CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]}},x:{CORNERS:{permutation:[4,0,3,5,7,6,2,1],orientationDelta:[2,1,2,1,1,2,1,2]}},y:{CORNERS:{permutation:[1,2,3,0,7,4,5,6],orientationDelta:[0,0,0,0,0,0,0,0]}}},derivedMoves:{z:"[x: y]",L:"[z: U]",F:"[x: U]",R:"[z': U]",B:"[x': U]",D:"[x2: U]",Uv:"y",Lv:"x'",Fv:"z",Rv:"x",Bv:"z'",Dv:"y'"}}});var ag,lg=S(()=>{ag=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
       "http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 530 394" preserveAspectRatio="xMidYMid meet">
  <title>2x2x2</title>
  <defs>
    <g id="sticker">
        <rect x="0" y="0" width="1" height="1" stroke="black" stroke-width="0.04px" />
    </g>
  </defs>
  <g id="puzzle" transform="translate(5, 5) scale(60)">
    <use id="CORNERS-l0-o0" href="#sticker" transform="translate(3.2, 1)" style="fill: white"/>
    <use id="CORNERS-l0-o1" href="#sticker" transform="translate(4.4, 2.2)" style="fill: red"/>
    <use id="CORNERS-l0-o2" href="#sticker" transform="translate(3.2, 2.2)" style="fill: limegreen"/>

    <use id="CORNERS-l1-o0" href="#sticker" transform="translate(3.2, 0)" style="fill: white"/>
    <use id="CORNERS-l1-o1" href="#sticker" transform="translate(6.6, 2.2)" style="fill: #26f"/>
    <use id="CORNERS-l1-o2" href="#sticker" transform="translate(5.4, 2.2)" style="fill: red"/>

    <use id="CORNERS-l2-o0" href="#sticker" transform="translate(2.2, 0)" style="fill: white"/>
    <use id="CORNERS-l2-o1" href="#sticker" transform="translate(0, 2.2)" style="fill: orange"/>
    <use id="CORNERS-l2-o2" href="#sticker" transform="translate(7.6, 2.2)" style="fill: #26f"/>

    <use id="CORNERS-l3-o0" href="#sticker" transform="translate(2.2, 1)" style="fill: white"/>
    <use id="CORNERS-l3-o1" href="#sticker" transform="translate(2.2, 2.2)" style="fill: limegreen"/>
    <use id="CORNERS-l3-o2" href="#sticker" transform="translate(1, 2.2)" style="fill: orange"/>

    <use id="CORNERS-l4-o0" href="#sticker" transform="translate(3.2, 4.4)" style="fill: yellow"/>
    <use id="CORNERS-l4-o1" href="#sticker" transform="translate(3.2, 3.2)" style="fill: limegreen"/>
    <use id="CORNERS-l4-o2" href="#sticker" transform="translate(4.4, 3.2)" style="fill: red"/>

    <use id="CORNERS-l5-o0" href="#sticker" transform="translate(2.2, 4.4)" style="fill: yellow"/>
    <use id="CORNERS-l5-o1" href="#sticker" transform="translate(1, 3.2)" style="fill: orange"/>
    <use id="CORNERS-l5-o2" href="#sticker" transform="translate(2.2, 3.2)" style="fill: limegreen"/>

    <use id="CORNERS-l6-o0" href="#sticker" transform="translate(2.2, 5.4)" style="fill: yellow"/>
    <use id="CORNERS-l6-o1" href="#sticker" transform="translate(7.6, 3.2)" style="fill: #26f"/>
    <use id="CORNERS-l6-o2" href="#sticker" transform="translate(0, 3.2)"  style="fill: orange"/>

    <use id="CORNERS-l7-o0" href="#sticker" transform="translate(3.2, 5.4)" style="fill: yellow"/>
    <use id="CORNERS-l7-o1" href="#sticker" transform="translate(5.4, 3.2)" style="fill: red"/>
    <use id="CORNERS-l7-o2" href="#sticker" transform="translate(6.6, 3.2)" style="fill: #26f"/>
  </g>

</svg>`});var cg,fg=S(()=>{cg=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
       "http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd">
    <svg width="288px" height="288px" viewBox="-16 -16 288 288" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <title>2x2x2 LL</title>
  <defs>
    <g id="sticker">
        <rect x="0" y="0" width="1" height="1" stroke="black" stroke-width="0.04px" />
    </g>
  </defs>
  <g id="2x2x2-LL" stroke="#000000" stroke-width="4" style="none" stroke-linejoin="round">
    <rect    id="CORNERS-l0-o0" style="fill: white" x="128" y="128" width="76" height="76"></rect>
    <polygon id="CORNERS-l0-o1" style="fill: red" points="204 128 252 128 252 252 204 204"></polygon>
    <polygon id="CORNERS-l0-o2" style="fill: limegreen" transform="translate(206, 238) scale(1, -1) rotate(-90) translate(-206, -238) " points="172 160 220 160 220 284 172 236"></polygon>
    <rect    id="CORNERS-l1-o0" style="fill: white" x="128" y="52" width="76" height="76"></rect>
    <polygon id="CORNERS-l1-o1" style="fill: #26f" transform="translate(206, 18) rotate(-90) translate(-206, -18) " points="172 -60 220 -60 220 64 172 16"></polygon>
    <polygon id="CORNERS-l1-o2" style="fill: red" transform="translate(238, 50) scale(1, -1) translate(-238, -50) " points="204 -28 252 -28 252 96 204 48"></polygon>
    <rect    id="CORNERS-l2-o0" style="fill: white" x="52" y="52" width="76" height="76"></rect>
    <polygon id="CORNERS-l2-o1" style="fill: orange" transform="translate(18, 50) scale(-1, -1) translate(-18, -50) " points="-16 -28 32 -28 32 96 -16 48"></polygon>
    <polygon id="CORNERS-l2-o2" style="fill: #26f" transform="translate(50, 18) scale(1, -1) rotate(90) translate(-50, -18) " points="16 -60 64 -60 64 64 16 16"></polygon>
    <rect    id="CORNERS-l3-o0" style="fill: white" x="52" y="128" width="76" height="76"></rect>
    <polygon id="CORNERS-l3-o1" style="fill: limegreen" transform="translate(50, 238) rotate(90) translate(-50, -238) " points="16 160 64 160 64 284 16 236"></polygon>
    <polygon id="CORNERS-l3-o2" style="fill: orange" transform="translate(18, 206) scale(-1, 1) translate(-18, -206) " points="-16 128 32 128 32 252 -16 204"></polygon>
  </g>
  <g style="opacity: 0">
    <use id="CORNERS-l4-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l4-o1" href="#sticker" style="fill: limegreen"/>
    <use id="CORNERS-l4-o2" href="#sticker" style="fill: red"/>

    <use id="CORNERS-l5-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l5-o1" href="#sticker" style="fill: orange"/>
    <use id="CORNERS-l5-o2" href="#sticker" style="fill: limegreen"/>

    <use id="CORNERS-l6-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l6-o1" href="#sticker" style="fill: #26f"/>
    <use id="CORNERS-l6-o2" href="#sticker"  style="fill: orange"/>

    <use id="CORNERS-l7-o0" href="#sticker" style="fill: yellow"/>
    <use id="CORNERS-l7-o1" href="#sticker" style="fill: red"/>
    <use id="CORNERS-l7-o2" href="#sticker" style="fill: #26f"/>
  </g>
</svg>`});var oo,Tn,Vo,ug,pg=S(()=>{oo=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],Tn=new Array(18).fill(0),Vo={permutation:oo,orientationDelta:Tn},ug={name:"clock",orbits:[{orbitName:"DIALS",numPieces:18,numOrientations:12},{orbitName:"FACES",numPieces:18,numOrientations:1},{orbitName:"FRAME",numPieces:1,numOrientations:2},{orbitName:"HOUR_MARKS",numPieces:18,numOrientations:4}],defaultPattern:{DIALS:{pieces:oo,orientation:Tn},FACES:{pieces:oo,orientation:Tn},FRAME:{pieces:[0],orientation:[0]},HOUR_MARKS:{pieces:oo,orientation:Tn}},moves:{UL_PLUS_:{DIALS:{permutation:oo,orientationDelta:[1,1,0,1,1,0,0,0,0,0,0,11,0,0,0,0,0,0]},FACES:Vo,FRAME:{permutation:[0],orientationDelta:[0]},HOUR_MARKS:Vo},U_PLUS_:{DIALS:{permutation:oo,orientationDelta:[1,1,1,1,1,1,0,0,0,11,0,11,0,0,0,0,0,0]},FACES:Vo,FRAME:{permutation:[0],orientationDelta:[0]},HOUR_MARKS:Vo},ALL_PLUS_:{DIALS:{permutation:oo,orientationDelta:[1,1,1,1,1,1,1,1,1,11,0,11,0,0,0,11,0,11]},FACES:Vo,FRAME:{permutation:[0],orientationDelta:[0]},HOUR_MARKS:Vo},y2:{DIALS:{permutation:[9,10,11,12,13,14,15,16,17,0,1,2,3,4,5,6,7,8],orientationDelta:Tn},FACES:{permutation:[9,10,11,12,13,14,15,16,17,0,1,2,3,4,5,6,7,8],orientationDelta:Tn},FRAME:{permutation:[0],orientationDelta:[1]},HOUR_MARKS:{permutation:[9,10,11,12,13,14,15,16,17,0,1,2,3,4,5,6,7,8],orientationDelta:Tn}},z:{DIALS:{permutation:[6,3,0,7,4,1,8,5,2,11,14,17,10,13,16,9,12,15],orientationDelta:[3,3,3,3,3,3,3,3,3,9,9,9,9,9,9,9,9,9]},FACES:{permutation:[6,3,0,7,4,1,8,5,2,11,14,17,10,13,16,9,12,15],orientationDelta:Tn},FRAME:{permutation:[0],orientationDelta:[0]},HOUR_MARKS:{permutation:[6,3,0,7,4,1,8,5,2,11,14,17,10,13,16,9,12,15],orientationDelta:[1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1]}}},derivedMoves:{UR_PLUS_:"[z': UL_PLUS_]",DR_PLUS_:"[z2: UL_PLUS_]",DL_PLUS_:"[z: UL_PLUS_]",R_PLUS_:"[z': U_PLUS_]",D_PLUS_:"[z2: U_PLUS_]",L_PLUS_:"[z: U_PLUS_]",F_PLUS_:"ALL_PLUS_",x2:"y2 z2",ULw_PLUS_:"U_PLUS_ L_PLUS_ UL_PLUS_'",URw_PLUS_:"U_PLUS_ R_PLUS_ UR_PLUS_'",DLw_PLUS_:"D_PLUS_ L_PLUS_ DL_PLUS_'",DRw_PLUS_:"D_PLUS_ R_PLUS_ DR_PLUS_'",BULw_PLUS_:"[y2: URw_PLUS_']",BURw_PLUS_:"[y2: ULw_PLUS_']",BDLw_PLUS_:"[y2: DRw_PLUS_']",BDRw_PLUS_:"[y2: DLw_PLUS_']",B_PLUS_:"[y2: ALL_PLUS_']",BU_PLUS_:"[y2: U_PLUS_']",BR_PLUS_:"[y2: L_PLUS_']",BD_PLUS_:"[y2: D_PLUS_']",BL_PLUS_:"[y2: R_PLUS_']",BUR_PLUS_:"[y2: UL_PLUS_']",BUL_PLUS_:"[y2: UR_PLUS_']",BDL_PLUS_:"[y2: DR_PLUS_']",BDR_PLUS_:"[y2: DL_PLUS_']",MUL_PLUS_:"UR_PLUS_' DL_PLUS_' U_PLUS_ R_PLUS_ D_PLUS_ L_PLUS_ ALL_PLUS_'",MUR_PLUS_:"UL_PLUS_' DR_PLUS_' U_PLUS_ L_PLUS_ D_PLUS_ R_PLUS_ ALL_PLUS_'",MDR_PLUS_:"MUL_PLUS_",MDL_PLUS_:"MUR_PLUS_",BMUL_PLUS_:"[y2: MUR_PLUS_']",BMUR_PLUS_:"[y2: MUL_PLUS_']",BMDR_PLUS_:"[y2: MDL_PLUS_']",BMDL_PLUS_:"[y2: MDR_PLUS_']",UL:".",UR:".",DL:".",DR:"."}}});var dg,hg=S(()=>{dg=`<?xml version="1.0" encoding="UTF-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet">
  <title>clock</title>
  <defs>
    <g id="hand" transform="translate(-20, -20)">
      <path d="M19.9995197,2.22079449 L23.8791657,19.0203611 C23.9580836,19.3338406 24,19.6620253 24,20 C24,22.209139 22.209139,24 20,24 C17.790861,24 16,22.209139 16,20 C16,19.6620253 16.0419164,19.3338406 16.1208343,19.0203611 L19.9995197,2.22079449 Z"></path>
    </g>
    <g id="cardinal_hour">
      <circle cx="0" cy="-24" r="3"></circle>
    </g>
    <g id="background_cardinal_hours" style="fill: #77889999">
      <circle cx="0" cy="24" r="1.5"></circle>
      <circle cx="-24" cy="0" r="1.5"></circle>
      <circle cx="24" cy="0" r="1.5"></circle>
      <circle cx="0" cy="-24" r="1.5"></circle>
    </g>
    <g id="background_face_hours">
      <g>
        <use href="#background_cardinal_hours"/>
      </g>
      <g transform="rotate(30)">
        <use href="#background_cardinal_hours"/>
      </g>
      <g  transform="rotate(60)">
        <use href="#background_cardinal_hours"/>
      </g>
    </g>
    <g id="peg">
      <circle id="PEG4" cx="0" cy="0" r="8"></circle>
    </g>
    <g id="frame" transform="translate(-24, -24)">
      <path stroke="#000000" d="M120,20 C137.495665,20 153.941932,24.4930026 168.247913,32.3881183 C171.855881,30.8514056 175.828512,30 180,30 C196.568542,30 210,43.4314575 210,60 C210,64.1714878 209.148594,68.1441192 207.610077,71.7536009 C215.506997,86.0580678 220,102.504335 220,120 C220,137.495665 215.506997,153.941932 207.611882,168.247913 C209.148594,171.855881 210,175.828512 210,180 C210,196.568542 196.568542,210 180,210 C175.828512,210 171.855881,209.148594 168.246399,207.610077 C153.941932,215.506997 137.495665,220 120,220 C102.504335,220 86.0580678,215.506997 71.7520869,207.611882 C68.1441192,209.148594 64.1714878,210 60,210 C43.4314575,210 30,196.568542 30,180 C30,175.828512 30.8514056,171.855881 32.3899234,168.246399 C24.4930026,153.941932 20,137.495665 20,120 C20,102.504335 24.4930026,86.0580678 32.3881183,71.7520869 C30.8514056,68.1441192 30,64.1714878 30,60 C30,43.4314575 43.4314575,30 60,30 C64.1714878,30 68.1441192,30.8514056 71.7536009,32.3899234 C86.0580678,24.4930026 102.504335,20 120,20 Z"></path>
    </g>
  </defs>
  <g>
    <g transform="translate(24, 24)">
      <use href="#frame" id="FRAME-l0-o0" style="fill: #113366"/>
      <use href="#peg" transform="translate(66, 66)" style="fill: #446699"/>
      <use href="#peg" transform="translate(126, 66)" style="fill: #446699"/>
      <use href="#peg" transform="translate(126, 126)" style="fill: #446699"/>
      <use href="#peg" transform="translate(66, 126)" style="fill: #446699"/>

      <g transform="translate(36, 36)">
        <circle id="FACES-l0-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l0-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l0-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l0-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l0-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l0-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l0-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l0-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l0-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l0-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l0-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l0-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l0-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l0-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l0-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l0-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l0-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(96, 36)">
        <circle id="FACES-l1-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l1-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l1-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l1-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l1-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l1-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l1-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l1-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l1-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l1-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l1-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l1-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l1-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l1-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l1-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l1-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l1-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(156, 36)">
        <circle id="FACES-l2-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l2-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l2-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l2-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l2-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l2-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l2-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l2-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l2-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l2-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l2-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l2-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l2-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l2-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l2-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l2-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l2-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(36, 96)">
        <circle id="FACES-l3-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l3-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l3-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l3-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l3-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l3-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l3-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l3-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l3-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l3-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l3-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l3-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l3-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l3-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l3-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l3-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l3-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(96, 96)">
        <circle id="FACES-l4-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l4-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l4-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l4-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l4-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l4-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l4-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l4-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l4-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l4-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l4-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l4-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l4-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l4-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l4-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l4-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l4-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(156, 96)">
        <circle id="FACES-l5-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l5-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l5-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l5-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l5-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l5-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l5-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l5-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l5-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l5-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l5-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l5-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l5-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l5-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l5-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l5-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l5-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(36, 156)">
        <circle id="FACES-l6-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l6-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l6-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l6-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l6-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l6-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l6-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l6-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l6-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l6-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l6-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l6-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l6-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l6-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l6-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l6-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l6-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(96, 156)">
        <circle id="FACES-l7-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l7-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l7-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l7-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l7-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l7-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l7-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l7-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l7-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l7-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l7-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l7-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l7-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l7-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l7-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l7-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l7-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(156, 156)">
        <circle id="FACES-l8-o0" stroke="#000000" style="fill: #CCDDEE" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l8-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="HOUR_MARKS-l8-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l8-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l8-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l8-o0"  href="#hand" transform="rotate(0)" style="fill: #CC0000"/>
          <use id="DIALS-l8-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l8-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l8-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l8-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l8-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l8-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l8-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l8-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l8-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l8-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l8-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
    </g>
    <g transform="translate(264, 24) scale(0.8)" transform-origin="96 96">
      <g transform="translate(32, 200)">
        <rect width="128" height="24" fill="#D9D9D9"/>
        <path d="M25.965 19.16C25.2317 19.16 24.4917 19.1333 23.745 19.08C22.9983 19.04 22.345 18.9467 21.785 18.8V5.34C22.0783 5.28667 22.3917 5.24 22.725 5.2C23.0583 5.14667 23.3983 5.10667 23.745 5.08C24.0917 5.05333 24.4317 5.03333 24.765 5.02C25.1117 5.00667 25.4383 5 25.745 5C26.585 5 27.365 5.06667 28.085 5.2C28.805 5.32 29.425 5.52667 29.945 5.82C30.4783 6.11333 30.8917 6.5 31.185 6.98C31.4783 7.46 31.625 8.05333 31.625 8.76C31.625 9.41333 31.465 9.97333 31.145 10.44C30.8383 10.9067 30.405 11.28 29.845 11.56C30.685 11.84 31.305 12.2533 31.705 12.8C32.105 13.3467 32.305 14.04 32.305 14.88C32.305 16.3067 31.785 17.38 30.745 18.1C29.705 18.8067 28.1117 19.16 25.965 19.16ZM24.265 12.76V16.98C24.545 17.0067 24.845 17.0267 25.165 17.04C25.485 17.0533 25.7783 17.06 26.045 17.06C26.565 17.06 27.045 17.0267 27.485 16.96C27.9383 16.8933 28.325 16.78 28.645 16.62C28.9783 16.4467 29.2383 16.22 29.425 15.94C29.625 15.66 29.725 15.3 29.725 14.86C29.725 14.0733 29.4383 13.5267 28.865 13.22C28.2917 12.9133 27.4983 12.76 26.485 12.76H24.265ZM24.265 10.78H26.045C27.005 10.78 27.7583 10.6467 28.305 10.38C28.8517 10.1 29.125 9.60667 29.125 8.9C29.125 8.23333 28.8383 7.76 28.265 7.48C27.705 7.2 26.9717 7.06 26.065 7.06C25.6783 7.06 25.3317 7.06667 25.025 7.08C24.7317 7.09333 24.4783 7.11333 24.265 7.14V10.78ZM41.9735 19C41.8562 18.616 41.7229 18.2213 41.5735 17.816C41.4349 17.4107 41.2962 17.0053 41.1575 16.6H36.8375C36.6989 17.0053 36.5549 17.4107 36.4055 17.816C36.2669 18.2213 36.1389 18.616 36.0215 19H33.4295C33.8455 17.8053 34.2402 16.7013 34.6135 15.688C34.9869 14.6747 35.3495 13.72 35.7015 12.824C36.0642 11.928 36.4162 11.08 36.7575 10.28C37.1095 9.46933 37.4722 8.68 37.8455 7.912H40.2295C40.5922 8.68 40.9495 9.46933 41.3015 10.28C41.6535 11.08 42.0055 11.928 42.3575 12.824C42.7202 13.72 43.0882 14.6747 43.4615 15.688C43.8349 16.7013 44.2295 17.8053 44.6455 19H41.9735ZM38.9815 10.424C38.9282 10.584 38.8482 10.8027 38.7415 11.08C38.6349 11.3573 38.5122 11.6773 38.3735 12.04C38.2349 12.4027 38.0802 12.8027 37.9095 13.24C37.7495 13.6773 37.5842 14.136 37.4135 14.616H40.5655C40.3949 14.136 40.2295 13.6773 40.0695 13.24C39.9095 12.8027 39.7549 12.4027 39.6055 12.04C39.4669 11.6773 39.3442 11.3573 39.2375 11.08C39.1309 10.8027 39.0455 10.584 38.9815 10.424ZM50.7305 19.224C48.9279 19.224 47.5519 18.7227 46.6025 17.72C45.6639 16.7173 45.1945 15.2933 45.1945 13.448C45.1945 12.5307 45.3385 11.7147 45.6265 11C45.9145 10.2747 46.3092 9.66667 46.8105 9.176C47.3119 8.67467 47.9092 8.296 48.6025 8.04C49.2959 7.784 50.0479 7.656 50.8585 7.656C51.3279 7.656 51.7545 7.69333 52.1385 7.768C52.5225 7.832 52.8585 7.912 53.1465 8.008C53.4345 8.09333 53.6745 8.184 53.8665 8.28C54.0585 8.376 54.1972 8.45067 54.2825 8.504L53.5625 10.52C53.2212 10.3387 52.8212 10.184 52.3625 10.056C51.9145 9.928 51.4025 9.864 50.8265 9.864C50.4425 9.864 50.0639 9.928 49.6905 10.056C49.3279 10.184 49.0025 10.392 48.7145 10.68C48.4372 10.9573 48.2132 11.32 48.0425 11.768C47.8719 12.216 47.7865 12.76 47.7865 13.4C47.7865 13.912 47.8399 14.392 47.9465 14.84C48.0639 15.2773 48.2452 15.656 48.4905 15.976C48.7465 16.296 49.0772 16.552 49.4825 16.744C49.8879 16.9253 50.3785 17.016 50.9545 17.016C51.3172 17.016 51.6425 16.9947 51.9305 16.952C52.2185 16.9093 52.4745 16.8613 52.6985 16.808C52.9225 16.744 53.1199 16.6747 53.2905 16.6C53.4612 16.5253 53.6159 16.456 53.7545 16.392L54.4425 18.392C54.0905 18.6053 53.5945 18.7973 52.9545 18.968C52.3145 19.1387 51.5732 19.224 50.7305 19.224ZM62.5935 19C62.3695 18.6373 62.1029 18.248 61.7935 17.832C61.4949 17.4053 61.1642 16.984 60.8015 16.568C60.4495 16.1413 60.0815 15.736 59.6975 15.352C59.3135 14.9573 58.9295 14.6107 58.5455 14.312V19H56.0495V7.912H58.5455V12.104C59.1962 11.4213 59.8469 10.712 60.4975 9.976C61.1589 9.22933 61.7722 8.54133 62.3375 7.912H65.2975C64.5402 8.808 63.7775 9.672 63.0095 10.504C62.2522 11.336 61.4522 12.1733 60.6095 13.016C61.4949 13.752 62.3482 14.6267 63.1695 15.64C64.0015 16.6533 64.7962 17.7733 65.5535 19H62.5935ZM75.5317 17.12C76.4384 17.12 77.0984 16.9667 77.5117 16.66C77.9251 16.3533 78.1317 15.92 78.1317 15.36C78.1317 15.0267 78.0584 14.74 77.9117 14.5C77.7784 14.26 77.5784 14.0467 77.3117 13.86C77.0584 13.66 76.7451 13.48 76.3717 13.32C75.9984 13.1467 75.5717 12.98 75.0917 12.82C74.6117 12.6467 74.1451 12.46 73.6917 12.26C73.2517 12.0467 72.8584 11.7867 72.5117 11.48C72.1784 11.1733 71.9051 10.8067 71.6917 10.38C71.4917 9.95333 71.3917 9.44 71.3917 8.84C71.3917 7.58667 71.8251 6.60667 72.6917 5.9C73.5584 5.18 74.7384 4.82 76.2317 4.82C77.0984 4.82 77.8651 4.92 78.5317 5.12C79.2117 5.30667 79.7451 5.51333 80.1317 5.74L79.3517 7.78C78.8984 7.52667 78.3984 7.33333 77.8517 7.2C77.3184 7.06667 76.7651 7 76.1917 7C75.5117 7 74.9784 7.14 74.5917 7.42C74.2184 7.7 74.0317 8.09333 74.0317 8.6C74.0317 8.90667 74.0917 9.17333 74.2117 9.4C74.3451 9.61333 74.5251 9.80667 74.7517 9.98C74.9917 10.1533 75.2651 10.3133 75.5717 10.46C75.8917 10.6067 76.2384 10.7467 76.6117 10.88C77.2651 11.12 77.8451 11.3667 78.3517 11.62C78.8717 11.86 79.3051 12.1533 79.6517 12.5C80.0117 12.8333 80.2851 13.2333 80.4717 13.7C80.6584 14.1533 80.7517 14.7067 80.7517 15.36C80.7517 16.6133 80.3051 17.5867 79.4117 18.28C78.5317 18.96 77.2384 19.3 75.5317 19.3C74.9584 19.3 74.4317 19.26 73.9517 19.18C73.4851 19.1133 73.0651 19.0267 72.6917 18.92C72.3317 18.8133 72.0184 18.7067 71.7517 18.6C71.4851 18.48 71.2717 18.3733 71.1117 18.28L71.8517 16.22C72.2117 16.42 72.6984 16.62 73.3117 16.82C73.9251 17.02 74.6651 17.12 75.5317 17.12ZM82.5925 7.912H85.0885V19H82.5925V7.912ZM90.151 16.968C90.2683 16.9787 90.4017 16.9893 90.551 17C90.711 17 90.8977 17 91.111 17C92.359 17 93.2817 16.6853 93.879 16.056C94.487 15.4267 94.791 14.5573 94.791 13.448C94.791 12.2853 94.503 11.4053 93.927 10.808C93.351 10.2107 92.439 9.912 91.191 9.912C91.0203 9.912 90.8443 9.91733 90.663 9.928C90.4817 9.928 90.311 9.93867 90.151 9.96V16.968ZM97.367 13.448C97.367 14.408 97.2177 15.2453 96.919 15.96C96.6203 16.6747 96.1937 17.2667 95.639 17.736C95.095 18.2053 94.4283 18.5573 93.639 18.792C92.8497 19.0267 91.9643 19.144 90.983 19.144C90.535 19.144 90.0123 19.1227 89.415 19.08C88.8177 19.048 88.231 18.9733 87.655 18.856V8.056C88.231 7.94933 88.8283 7.88 89.447 7.848C90.0763 7.80533 90.615 7.784 91.063 7.784C92.0123 7.784 92.871 7.89067 93.639 8.104C94.4177 8.31733 95.0843 8.65333 95.639 9.112C96.1937 9.57067 96.6203 10.1573 96.919 10.872C97.2177 11.5867 97.367 12.4453 97.367 13.448ZM99.4519 19V7.912H106.94V10.008H101.948V12.184H106.38V14.232H101.948V16.904H107.308V19H99.4519Z" fill="black"/>
      </g>
      <use href="#frame" id="FRAME-l0-o1" style="fill: #CCDDEE"/>

      <use href="#peg" transform="translate(66, 66)" style="fill: #88AACC"/>
      <use href="#peg" transform="translate(126, 66)" style="fill: #88AACC"/>
      <use href="#peg" transform="translate(126, 126)" style="fill: #88AACC"/>
      <use href="#peg" transform="translate(66, 126)" style="fill: #88AACC"/>

      <g transform="translate(36, 36)">
        <circle id="FACES-l9-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l9-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l9-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l9-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l9-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l9-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l9-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l9-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l9-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l9-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l9-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l9-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l9-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l9-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l9-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l9-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l9-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(96, 36)">
        <circle id="FACES-l10-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l10-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l10-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l10-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l10-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l10-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l10-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l10-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l10-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l10-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l10-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l10-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l10-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l10-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l10-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l10-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l10-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(156, 36)">
        <circle id="FACES-l11-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l11-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l11-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l11-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l11-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l11-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l11-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l11-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l11-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l11-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l11-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l11-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l11-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l11-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l11-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l11-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l11-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(36, 96)">
        <circle id="FACES-l12-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l12-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l12-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l12-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l12-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l12-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l12-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l12-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l12-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l12-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l12-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l12-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l12-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l12-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l12-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l12-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l12-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(96, 96)">
        <circle id="FACES-l13-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l13-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l13-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l13-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l13-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l13-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l13-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l13-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l13-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l13-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l13-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l13-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l13-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l13-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l13-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l13-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l13-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(156, 96)">
        <circle id="FACES-l14-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l14-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l14-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l14-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l14-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l14-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l14-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l14-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l14-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l14-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l14-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l14-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l14-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l14-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l14-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l14-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l14-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(36, 156)">
        <circle id="FACES-l15-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l15-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l15-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l15-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l15-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l15-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l15-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l15-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l15-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l15-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l15-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l15-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l15-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l15-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l15-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l15-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l15-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(96, 156)">
        <circle id="FACES-l16-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l16-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l16-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l16-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l16-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l16-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l16-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l16-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l16-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l16-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l16-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l16-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l16-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l16-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l16-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l16-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l16-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
      <g transform="translate(156, 156)">
        <circle id="FACES-l17-o0" stroke="#000000" style="fill: #113366" r="20"></circle>
        <use href="#background_face_hours"/>
        <g>
          <use id="HOUR_MARKS-l17-o0" href="#cardinal_hour" transform="rotate(0)" style="fill: #CC6600"/>
          <use id="HOUR_MARKS-l17-o1" href="#cardinal_hour" transform="rotate(90)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l17-o2" href="#cardinal_hour" transform="rotate(180)" style="fill: #0000"/>
          <use id="HOUR_MARKS-l17-o3" href="#cardinal_hour" transform="rotate(270)" style="fill: #0000"/>
        </g>
        <g>
          <use id="DIALS-l17-o0"  href="#hand" transform="rotate(0)" style="fill: #FFCC44"/>
          <use id="DIALS-l17-o1"  href="#hand" transform="rotate(30)" style="fill: #0000"/>
          <use id="DIALS-l17-o2"  href="#hand" transform="rotate(60)" style="fill: #0000"/>
          <use id="DIALS-l17-o3"  href="#hand" transform="rotate(90)" style="fill: #0000"/>
          <use id="DIALS-l17-o4"  href="#hand" transform="rotate(120)" style="fill: #0000"/>
          <use id="DIALS-l17-o5"  href="#hand" transform="rotate(150)" style="fill: #0000"/>
          <use id="DIALS-l17-o6"  href="#hand" transform="rotate(180)" style="fill: #0000"/>
          <use id="DIALS-l17-o7"  href="#hand" transform="rotate(210)" style="fill: #0000"/>
          <use id="DIALS-l17-o8"  href="#hand" transform="rotate(240)" style="fill: #0000"/>
          <use id="DIALS-l17-o9"  href="#hand" transform="rotate(270)" style="fill: #0000"/>
          <use id="DIALS-l17-o10" href="#hand" transform="rotate(300)" style="fill: #0000"/>
          <use id="DIALS-l17-o11" href="#hand" transform="rotate(330)" style="fill: #0000"/>
        </g>
      </g>
    </g>
  </g>
</svg>`});var ii,w4,mg,gg=S(()=>{ii=new Array(64).fill(0),w4=ii.map((r,e)=>e),mg={name:"Melinda's 2x2x2x2",orbits:[{orbitName:"CORNERS",numPieces:64,numOrientations:1}],defaultPattern:{CORNERS:{pieces:w4,orientation:ii}},moves:{Rx:{CORNERS:{permutation:[16,19,17,18,20,22,23,21,4,7,5,6,0,2,3,1,28,30,31,29,24,27,25,26,8,10,11,9,12,15,13,14,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],orientationDelta:ii}},Ry:{CORNERS:{permutation:[12,13,14,15,0,1,2,3,4,5,6,7,8,9,10,11,28,29,30,31,16,17,18,19,20,21,22,23,24,25,26,27,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],orientationDelta:ii}},Rz:{CORNERS:{permutation:[4,6,7,5,20,23,21,22,24,26,27,25,8,11,9,10,0,3,1,2,16,18,19,17,28,31,29,30,12,14,15,13,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],orientationDelta:ii}},Lx:{CORNERS:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,48,51,49,50,52,54,55,53,36,39,37,38,32,34,35,33,60,62,63,61,56,59,57,58,40,42,43,41,44,47,45,46],orientationDelta:ii}},Ly:{CORNERS:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,44,45,46,47,32,33,34,35,36,37,38,39,40,41,42,43,60,61,62,63,48,49,50,51,52,53,54,55,56,57,58,59],orientationDelta:ii}},Lz:{CORNERS:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,36,38,39,37,52,55,53,54,56,58,59,57,40,43,41,42,32,35,33,34,48,50,51,49,60,63,61,62,44,46,47,45],orientationDelta:ii}},Mx:{CORNERS:{permutation:[0,1,2,3,20,22,23,21,4,7,5,6,12,13,14,15,16,17,18,19,24,27,25,26,8,10,11,9,28,29,30,31,48,51,49,50,36,37,38,39,40,41,42,43,32,34,35,33,60,62,63,61,52,53,54,55,56,57,58,59,44,47,45,46],orientationDelta:ii}},My:{CORNERS:{permutation:[0,1,2,3,9,8,11,10,45,44,47,46,12,13,14,15,16,17,18,19,25,24,27,26,61,60,63,62,28,29,30,31,5,4,7,6,36,37,38,39,40,41,42,43,33,32,35,34,21,20,23,22,52,53,54,55,56,57,58,59,49,48,51,50],orientationDelta:ii}},Mz:{CORNERS:{permutation:[0,1,2,3,34,33,35,32,47,45,44,46,12,13,14,15,16,17,18,19,7,5,4,6,10,9,11,8,28,29,30,31,51,49,48,50,36,37,38,39,40,41,42,43,62,61,63,60,22,21,23,20,52,53,54,55,56,57,58,59,27,25,24,26],orientationDelta:ii}},Ox:{CORNERS:{permutation:[16,19,17,18,4,5,6,7,8,9,10,11,0,2,3,1,28,30,31,29,20,21,22,23,24,25,26,27,12,15,13,14,32,33,34,35,52,54,55,53,36,39,37,38,44,45,46,47,48,49,50,51,56,59,57,58,40,42,43,41,60,61,62,63],orientationDelta:ii}},Oy:{CORNERS:{permutation:[37,36,39,38,4,5,6,7,8,9,10,11,1,0,3,2,53,52,55,54,20,21,22,23,24,25,26,27,17,16,19,18,32,33,34,35,41,40,43,42,13,12,15,14,44,45,46,47,48,49,50,51,57,56,59,58,29,28,31,30,60,61,62,63],orientationDelta:ii}},Oz:{CORNERS:{permutation:[19,17,16,18,4,5,6,7,8,9,10,11,30,29,31,28,54,53,55,52,20,21,22,23,24,25,26,27,59,57,56,58,32,33,34,35,2,1,3,0,15,13,12,14,44,45,46,47,48,49,50,51,39,37,36,38,42,41,43,40,60,61,62,63],orientationDelta:ii}},U2:{CORNERS:{permutation:[40,41,42,43,44,45,46,47,32,33,34,35,36,37,38,39,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],orientationDelta:ii}},D2:{CORNERS:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,56,57,58,59,60,61,62,63,48,49,50,51,52,53,54,55,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,24,25,26,27,28,29,30,31,16,17,18,19,20,21,22,23],orientationDelta:ii}},F2:{CORNERS:{permutation:[52,53,54,55,48,49,50,51,8,9,10,11,12,13,14,15,36,37,38,39,32,33,34,35,24,25,26,27,28,29,30,31,20,21,22,23,16,17,18,19,40,41,42,43,44,45,46,47,4,5,6,7,0,1,2,3,56,57,58,59,60,61,62,63],orientationDelta:ii}},B2:{CORNERS:{permutation:[0,1,2,3,4,5,6,7,60,61,62,63,56,57,58,59,16,17,18,19,20,21,22,23,44,45,46,47,40,41,42,43,32,33,34,35,36,37,38,39,28,29,30,31,24,25,26,27,48,49,50,51,52,53,54,55,12,13,14,15,8,9,10,11],orientationDelta:ii}}},derivedMoves:{x:"Lx Rx",y2:"U2 D2",z2:"F2 B2"}}});var yg,xg=S(()=>{yg=`<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 180 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>melindas2x2x2x2</title>
<defs>
  <g id="sticker-UL">
    <path d="m 0,0 10,0 -10,10 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="sticker-UR">
    <path d="m 0,0 10,0 0,10 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="sticker-DR">
    <path d="m 10,0 0,10 -10,0 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="sticker-DL">
    <path d="m 00,0 10,10 -10,0 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="squished-sticker-UL">
    <path d="m 0,0 5,0 -5,10 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="squished-sticker-UR">
    <path d="m 0,0 5,0 0,10 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="squished-sticker-DR">
    <path d="m 5,0 0,10 -5,0 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
  <g id="squished-sticker-DL">
    <path d="m 00,0 5,10 -5,0 z" stroke-width="0.75px" stroke="black" stroke-linecap="butt" stroke-linejoin="round" />
  </g>
</defs>
<g>
<g id="UL" transform="translate(45, 10)">
  <use id="CORNERS-l40-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: orange"/>
  <use id="CORNERS-l41-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: white"/>
  <use id="CORNERS-l45-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: white"/>
  <use id="CORNERS-l44-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: orange"/>
  <use id="CORNERS-l36-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: orange"/>
  <use id="CORNERS-l37-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: white"/>
  <use id="CORNERS-l33-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: white"/>
  <use id="CORNERS-l32-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: orange"/>
</g>
<g id="UR" transform="translate(65, 10)">
  <use id="CORNERS-l8-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: red"/>
  <use id="CORNERS-l9-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: white"/>
  <use id="CORNERS-l13-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: white"/>
  <use id="CORNERS-l12-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: red"/>
  <use id="CORNERS-l4-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: red"/>
  <use id="CORNERS-l5-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: white"/>
  <use id="CORNERS-l1-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: white"/>
  <use id="CORNERS-l0-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: red"/>
</g>

<g id="L" transform="translate(10, 35)">
  <use data-copy-id="CORNERS-l40-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: orange"/>
  <use id="CORNERS-l43-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: pink"/>
  <use id="CORNERS-l38-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: pink"/>
  <use data-copy-id="CORNERS-l36-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: orange"/>
  <use id="CORNERS-l56-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: orange"/>
  <use id="CORNERS-l58-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: pink"/>
  <use id="CORNERS-l55-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: pink"/>
  <use id="CORNERS-l52-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: orange"/>
</g>

<g id="FL" transform="translate(35, 35)">
  <use data-copy-id="CORNERS-l36-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: orange"/>
  <use id="CORNERS-l39-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: limegreen"/>
  <use id="CORNERS-l34-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: limegreen"/>
  <use data-copy-id="CORNERS-l32-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: orange"/>
  <use data-copy-id="CORNERS-l52-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: orange"/>
  <use id="CORNERS-l54-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: limegreen"/>
  <use id="CORNERS-l51-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: limegreen"/>
  <use id="CORNERS-l48-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: orange"/>
</g>
<g id="FR" transform="translate(75, 35)">
  <use data-copy-id="CORNERS-l4-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: red"/>
  <use id="CORNERS-l7-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: limegreen"/>
  <use id="CORNERS-l2-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: limegreen"/>
  <use data-copy-id="CORNERS-l0-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: red"/>
  <use id="CORNERS-l20-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: red"/>
  <use id="CORNERS-l22-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: limegreen"/>
  <use id="CORNERS-l19-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: limegreen"/>
  <use id="CORNERS-l16-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: red"/>
</g>

<g id="R" transform="translate(100, 35)">
  <use data-copy-id="CORNERS-l0-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: red"/>
  <use id="CORNERS-l3-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: pink"/>
  <use id="CORNERS-l14-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: pink"/>
  <use data-copy-id="CORNERS-l12-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: red"/>
  <use data-copy-id="CORNERS-l16-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: red"/>
  <use id="CORNERS-l18-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: pink"/>
  <use id="CORNERS-l31-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: pink"/>
  <use id="CORNERS-l28-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: red"/>
</g>

<g id="BR" transform="translate(125, 35)">
  <use data-copy-id="CORNERS-l12-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: red"/>
  <use id="CORNERS-l15-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: #26f"/>
  <use id="CORNERS-l10-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: #26f"/>
  <use data-copy-id="CORNERS-l8-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: red"/>
  <use data-copy-id="CORNERS-l28-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: red"/>
  <use id="CORNERS-l30-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: #26f"/>
  <use id="CORNERS-l27-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: #26f"/>
  <use id="CORNERS-l24-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: red"/>
</g>
<g id="BL" transform="translate(145, 35)">
  <use data-copy-id="CORNERS-l44-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: orange"/>
  <use id="CORNERS-l47-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: #26f"/>
  <use id="CORNERS-l42-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: #26f"/>
  <use data-copy-id="CORNERS-l40-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: orange"/>
  <use id="CORNERS-l60-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: orange"/>
  <use id="CORNERS-l62-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: #26f"/>
  <use id="CORNERS-l59-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: #26f"/>
  <use data-copy-id="CORNERS-l56-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: orange"/>
</g>

<g id="DL" transform="translate(45, 60)">
  <use data-copy-id="CORNERS-l52-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: orange"/>
  <use id="CORNERS-l53-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: yellow"/>
  <use id="CORNERS-l49-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: yellow"/>
  <use data-copy-id="CORNERS-l48-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: orange"/>
  <use data-copy-id="CORNERS-l56-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: orange"/>
  <use id="CORNERS-l57-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: yellow"/>
  <use id="CORNERS-l61-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: yellow"/>
  <use data-copy-id="CORNERS-l60-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: orange"/>
</g>
<g id="DR" transform="translate(65, 60)">
  <use data-copy-id="CORNERS-l20-o0" href="#sticker-UL" transform="translate( 0,  0)" style="fill: red"/>
  <use id="CORNERS-l21-o0" href="#sticker-DR" transform="translate( 0,  0)" style="fill: yellow"/>
  <use id="CORNERS-l17-o0" href="#sticker-DL" transform="translate(10,  0)" style="fill: yellow"/>
  <use data-copy-id="CORNERS-l16-o0" href="#sticker-UR" transform="translate(10,  0)" style="fill: red"/>
  <use data-copy-id="CORNERS-l24-o0" href="#sticker-DL" transform="translate( 0, 10)" style="fill: red"/>
  <use id="CORNERS-l25-o0" href="#sticker-UR" transform="translate( 0, 10)" style="fill: yellow"/>
  <use id="CORNERS-l29-o0" href="#sticker-UL" transform="translate(10, 10)" style="fill: yellow"/>
  <use data-copy-id="CORNERS-l28-o0" href="#sticker-DR" transform="translate(10, 10)" style="fill: red"/>
</g>

<g style="opacity: 0.3;">
<g id="IL" transform="translate(55, 35)">
  <use data-copy-id="CORNERS-l32-o0" href="#squished-sticker-UL" transform="translate( 0,  0)" style="fill: orange"/>
  <use id="CORNERS-l35-o0" href="#squished-sticker-DR" transform="translate( 0,  0)" style="fill: purple"/>
  <use id="CORNERS-l46-o0" href="#squished-sticker-DL" transform="translate(5,  0)" style="fill: purple"/>
  <use data-copy-id="CORNERS-l44-o0" href="#squished-sticker-UR" transform="translate(5,  0)" style="fill: orange"/>
  <use data-copy-id="CORNERS-l48-o0" href="#squished-sticker-DL" transform="translate( 0, 10)" style="fill: orange"/>
  <use id="CORNERS-l50-o0" href="#squished-sticker-UR" transform="translate( 0, 10)" style="fill: purple"/>
  <use id="CORNERS-l63-o0" href="#squished-sticker-UL" transform="translate(5, 10)" style="fill: purple"/>
  <use data-copy-id="CORNERS-l60-o0" href="#squished-sticker-DR" transform="translate(5, 10)" style="fill: orange"/>
</g>
<g id="IR" transform="translate(65, 35)">
  <use data-copy-id="CORNERS-l8-o0" href="#squished-sticker-UL" transform="translate( 0,  0)" style="fill: red"/>
  <use id="CORNERS-l11-o0" href="#squished-sticker-DR" transform="translate( 0,  0)" style="fill: purple"/>
  <use id="CORNERS-l6-o0" href="#squished-sticker-DL" transform="translate(5,  0)" style="fill: purple"/>
  <use data-copy-id="CORNERS-l4-o0" href="#squished-sticker-UR" transform="translate(5,  0)" style="fill: red"/>
  <use data-copy-id="CORNERS-l24-o0" href="#squished-sticker-DL" transform="translate( 0, 10)" style="fill: red"/>
  <use id="CORNERS-l26-o0" href="#squished-sticker-UR" transform="translate( 0, 10)" style="fill: purple"/>
  <use id="CORNERS-l23-o0" href="#squished-sticker-UL" transform="translate(5, 10)" style="fill: purple"/>
  <use data-copy-id="CORNERS-l20-o0" href="#squished-sticker-DR" transform="translate(5, 10)" style="fill: red"/>
</g>
</g>
</g>
</svg>`});var Sg,vg=S(()=>{Sg=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN"
       "http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-20 -20 546 480" preserveAspectRatio="xMidYMid meet">
  <defs>
  </defs>
  <title>pyraminx</title>
  <defs>
    <g id="stickerA" transform="scale(1, 0.577350269)">
      <path
         d="m 0,1.732050808 1,-1.732050808 1,1.732050808 z"
         stroke="black" stroke-width="0.04px" stroke-linecap="butt" stroke-linejoin="round"
      />
    </g>
    <g id="stickerV" transform="scale(1, 0.577350269)">
      <path
         d="m 0,0 1,1.732050808 1,-1.732050808 z"
         stroke="black" stroke-width="0.04px" stroke-linecap="butt" stroke-linejoin="round"
      />
    </g>
  </defs>

<!--        0 1 2 3 4 5 6 7 8 9 10   -->
<!--        | | | | | | | | | | |    -->
<!--    0 - L L L L L F R R R R R    -->
<!--    1 -   L L L F F F R R R      -->
<!--    2 -     L F F F F F R        -->
<!--    3 -       D D D D D          -->
<!--    4 -         D D D            -->
<!--    5 -           D              -->

  <g id="puzzle" transform="translate(5, 5) scale(40, 69.28203232)">
    <!-- CORNERS -->
    <use id="CORNERS-l0-o0" href="#stickerV" transform="translate(5.2, 1.066666667)" style="fill: limegreen"/>
    <use id="CORNERS-l0-o1" href="#stickerA" transform="translate(3, 0)" style="fill: red"/>
    <use id="CORNERS-l0-o2" href="#stickerA" transform="translate(7.4, 0)" style="fill: #26f"/>

    <use id="CORNERS-l3-o0" href="#stickerA" transform="translate(4.2, 3.2)" style="fill: yellow"/>
    <use id="CORNERS-l3-o1" href="#stickerA" transform="translate(2, 1)" style="fill: red"/>
    <use id="CORNERS-l3-o2" href="#stickerV" transform="translate(4.2, 2.066666667)" style="fill: limegreen"/>

    <use id="CORNERS-l2-o0" href="#stickerA" transform="translate(6.2, 3.2)" style="fill: yellow"/>
    <use id="CORNERS-l2-o1" href="#stickerV" transform="translate(6.2, 2.066666667)" style="fill: limegreen"/>
    <use id="CORNERS-l2-o2" href="#stickerA" transform="translate(8.4, 1)" style="fill: #26f"/>

    <use id="CORNERS-l1-o1" href="#stickerA" transform="translate(9.4, 0)" style="fill: #26f"/>
    <use id="CORNERS-l1-o2" href="#stickerA" transform="translate(1, 0)" style="fill: red"/>
    <use id="CORNERS-l1-o0" href="#stickerA" transform="translate(5.2, 4.2)" style="fill: yellow"/>

    <!-- "TIPS" -->
    <!-- CORNERS2 -->
    <use id="CORNERS2-l0-o0" href="#stickerA" transform="translate(5.2, 0.066666667)" style="fill: limegreen"/>
    <use id="CORNERS2-l0-o1" href="#stickerV" transform="translate(4, 0)" style="fill: red"/>
    <use id="CORNERS2-l0-o2" href="#stickerV" transform="translate(6.4, 0)" style="fill: #26f"/>

    <use id="CORNERS2-l3-o0" href="#stickerV" transform="translate(3.2, 3.2)" style="fill: yellow"/>
    <use id="CORNERS2-l3-o1" href="#stickerV" transform="translate(2, 2)" style="fill: red"/>
    <use id="CORNERS2-l3-o2" href="#stickerA" transform="translate(3.2, 2.066666667)" style="fill: limegreen"/>

    <use id="CORNERS2-l2-o0" href="#stickerV" transform="translate(7.2, 3.2)" style="fill: yellow"/>
    <use id="CORNERS2-l2-o1" href="#stickerA" transform="translate(7.2, 2.066666667)" style="fill: limegreen"/>
    <use id="CORNERS2-l2-o2" href="#stickerV" transform="translate(8.4, 2)" style="fill: #26f"/>

    <use id="CORNERS2-l1-o1" href="#stickerV" transform="translate(10.4,0)" style="fill: #26f"/>
    <use id="CORNERS2-l1-o2" href="#stickerV" transform="translate(0, 0)" style="fill: red"/>
    <use id="CORNERS2-l1-o0" href="#stickerV" transform="translate(5.2, 5.2)" style="fill: yellow"/>

    <!-- EDGES -->
    <use id="EDGES-l0-o0" href="#stickerV" transform="translate(3, 1)" style="fill: red"/>
    <use id="EDGES-l0-o1" href="#stickerA" transform="translate(4.2, 1.066666667)" style="fill: limegreen"/>

    <use id="EDGES-l5-o0" href="#stickerA" transform="translate(6.2, 1.066666667)" style="fill: limegreen"/>
    <use id="EDGES-l5-o1" href="#stickerV" transform="translate(7.4, 1)" style="fill: #26f"/>

    <use id="EDGES-l1-o0" href="#stickerV" transform="translate(8.4, 0)" style="fill: #26f"/>
    <use id="EDGES-l1-o1" href="#stickerV" transform="translate(2, 0)" style="fill: red"/>

    <use id="EDGES-l2-o0" href="#stickerV" transform="translate(5.2, 3.2)" style="fill: yellow"/>
    <use id="EDGES-l2-o1" href="#stickerA" transform="translate(5.2, 2.066666667)" style="fill: limegreen"/>

    <use id="EDGES-l3-o0" href="#stickerV" transform="translate(9.4, 1)" style="fill: #26f"/>
    <use id="EDGES-l3-o1" href="#stickerV" transform="translate(6.2, 4.2)" style="fill: yellow"/>

    <use id="EDGES-l4-o0" href="#stickerV" transform="translate(4.2, 4.2)" style="fill: yellow"/>
    <use id="EDGES-l4-o1" href="#stickerV" transform="translate(1, 1)" style="fill: red"/>
  </g>

</svg>`});var Eg,Mg=S(()=>{Eg={name:"Square-1",orbits:[{orbitName:"WEDGES",numPieces:24,numOrientations:9},{orbitName:"EQUATOR",numPieces:2,numOrientations:6}],defaultPattern:{WEDGES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],orientation:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},EQUATOR:{pieces:[0,1],orientation:[0,0]}},moves:{U_SQ_:{WEDGES:{permutation:[11,0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},EQUATOR:{permutation:[0,1],orientationDelta:[0,0]}},D_SQ_:{WEDGES:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,23,12,13,14,15,16,17,18,19,20,21,22],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},EQUATOR:{permutation:[0,1],orientationDelta:[0,0]}},_SLASH_:{WEDGES:{permutation:[0,1,2,3,4,5,12,13,14,15,16,17,6,7,8,9,10,11,18,19,20,21,22,23],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},EQUATOR:{permutation:[0,1],orientationDelta:[0,3]}}}}});var bg,_g=S(()=>{bg=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="360px" height="552px" viewBox="0 0 360 552" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->
    <title>sq1-fancy</title>
    <desc>Created with Sketch.</desc>
    <!-- stroke="none" -->
    <g id="sq1-fancy" stroke="#888" stroke-width="0.25" fill="none" fill-rule="evenodd">
        <g id="EQUATOR" transform="translate(24.000000, 264.000000)">
            <rect id="EQUATOR-l1-o3" style="fill: red" x="168" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l1-o4" style="fill: red" x="192" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l1-o5" style="fill: limegreen" x="216" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l1-o2" style="fill: limegreen" x="240" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l1-o1" style="fill: limegreen" x="264" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l1-o0" style="fill: orange" x="288" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l0-o3" style="fill: orange" x="0" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l0-o4" style="fill: orange" x="24" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l0-o5" style="fill: #26f" x="48" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l0-o2" style="fill: #26f" x="72" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l0-o1" style="fill: #26f" x="96" y="0" width="24" height="24"></rect>
            <rect id="EQUATOR-l0-o0" style="fill: red" x="120" y="0" width="24" height="24"></rect>
        </g>
        <g id="BOTTOM" transform="translate(41.000000, 257.000000)" stroke-linejoin="round">
            <g id="WEDGES-23" transform="translate(130.000000, 88.588457) rotate(120.000000) translate(-130.000000, -88.588457) translate(82.000000, 22.588457)">
                <polygon id="WEDGES-l23-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l23-o7" style="fill: red" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l23-o6" style="fill: red" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l23-o5" style="fill: red" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l23-o4" style="fill: red" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l23-o3" style="fill: white" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l23-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l23-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l23-o0" style="fill: red" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-22" transform="translate(97.157677, 115.157677) rotate(90.000000) translate(-97.157677, -115.157677) translate(49.157677, 49.157677)">
                <polygon id="WEDGES-l22-o8" style="fill: #26f" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l22-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l22-o6" style="fill: #26f" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l22-o5" style="fill: #26f" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l22-o4" style="fill: white" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l22-o3" style="fill: #26f" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l22-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l22-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l22-o0" style="fill: #26f" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-21" transform="translate(82.000000, 154.588457) rotate(60.000000) translate(-82.000000, -154.588457) translate(34.000000, 88.588457)">
                <polygon id="WEDGES-l21-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l21-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l21-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l21-o5" style="fill: #26f" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l21-o4" style="fill: #26f" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l21-o3" style="fill: #26f" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l21-o2" style="fill: #26f" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l21-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l21-o0" style="fill: #26f" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-20" transform="translate(88.588457, 196.315353) rotate(30.000000) translate(-88.588457, -196.315353) translate(40.588457, 130.315353)">
                <polygon id="WEDGES-l20-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l20-o7" style="fill: #26f" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l20-o6" style="fill: #26f" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l20-o5" style="fill: #26f" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l20-o4" style="fill: #26f" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l20-o3" style="fill: white" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l20-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l20-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l20-o0" style="fill: #26f" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-19" transform="translate(67.157677, 163.157677)">
                <polygon id="WEDGES-l19-o8" style="fill: orange" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l19-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l19-o6" style="fill: orange" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l19-o5" style="fill: orange" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l19-o4" style="fill: white" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l19-o3" style="fill: orange" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l19-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l19-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l19-o0" style="fill: orange" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-18" transform="translate(154.588457, 244.315353) scale(-1, -1) rotate(150.000000) translate(-154.588457, -244.315353) translate(106.588457, 178.315353)">
                <polygon id="WEDGES-l18-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l18-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l18-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l18-o5" style="fill: orange" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l18-o4" style="fill: orange" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l18-o3" style="fill: orange" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l18-o2" style="fill: orange" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l18-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l18-o0" style="fill: orange" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-17" transform="translate(196.315353, 237.726896) scale(-1, -1) rotate(120.000000) translate(-196.315353, -237.726896) translate(148.315353, 171.726896)">
                <polygon id="WEDGES-l17-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l17-o7" style="fill: orange" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l17-o6" style="fill: orange" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l17-o5" style="fill: orange" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l17-o4" style="fill: orange" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l17-o3" style="fill: white" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l17-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l17-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l17-o0" style="fill: orange" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-16" transform="translate(229.157677, 211.157677) scale(-1, -1) rotate(90.000000) translate(-229.157677, -211.157677) translate(181.157677, 145.157677)">
                <polygon id="WEDGES-l16-o8" style="fill: limegreen" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l16-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l16-o6" style="fill: limegreen" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l16-o5" style="fill: limegreen" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l16-o4" style="fill: white" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l16-o3" style="fill: limegreen" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l16-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l16-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l16-o0" style="fill: limegreen" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-15" transform="translate(244.315353, 171.726896) scale(-1, -1) rotate(60.000000) translate(-244.315353, -171.726896) translate(196.315353, 105.726896)">
                <polygon id="WEDGES-l15-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l15-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l15-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l15-o5" style="fill: limegreen" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l15-o4" style="fill: limegreen" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l15-o3" style="fill: limegreen" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l15-o2" style="fill: limegreen" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l15-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l15-o0" style="fill: limegreen" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-14" transform="translate(237.726896, 130.000000) scale(-1, -1) rotate(30.000000) translate(-237.726896, -130.000000) translate(189.726896, 64.000000)">
                <polygon id="WEDGES-l14-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l14-o7" style="fill: limegreen" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l14-o6" style="fill: limegreen" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l14-o5" style="fill: limegreen" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l14-o4" style="fill: limegreen" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l14-o3" style="fill: white" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l14-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l14-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l14-o0" style="fill: limegreen" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-13" transform="translate(211.157677, 97.157677) scale(-1, -1) translate(-211.157677, -97.157677) translate(163.157677, 31.157677)">
                <polygon id="WEDGES-l13-o8" style="fill: red" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l13-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l13-o6" style="fill: red" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l13-o5" style="fill: red" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l13-o4" style="fill: white" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l13-o3" style="fill: red" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l13-o2" style="fill: white" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l13-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l13-o0" style="fill: red" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-12" transform="translate(171.726896, 82.000000) rotate(150.000000) translate(-171.726896, -82.000000) translate(123.726896, 16.000000)">
                <polygon id="WEDGES-l12-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l12-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l12-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l12-o5" style="fill: red" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l12-o4" style="fill: red" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l12-o3" style="fill: red" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l12-o2" style="fill: red" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l12-o1" style="fill: white" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l12-o0" style="fill: red" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
        </g>
        <g id="TOP" transform="translate(41.000000, -31.000000)" stroke-linejoin="round">
            <g id="WEDGES-11" transform="translate(154.588457, 244.315353) scale(-1, -1) rotate(150.000000) translate(-154.588457, -244.315353) translate(106.588457, 178.315353)">
                <polygon id="WEDGES-l11-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l11-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l11-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l11-o5" style="fill: red" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l11-o4" style="fill: red" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l11-o3" style="fill: red" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l11-o2" style="fill: red" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l11-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l11-o0" style="fill: red" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-10" transform="translate(196.315353, 237.726896) scale(-1, -1) rotate(120.000000) translate(-196.315353, -237.726896) translate(148.315353, 171.726896)">
                <polygon id="WEDGES-l10-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l10-o7" style="fill: red" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l10-o6" style="fill: red" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l10-o5" style="fill: red" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l10-o4" style="fill: red" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l10-o3" style="fill: yellow" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l10-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l10-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l10-o0" style="fill: red" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-9" transform="translate(229.157677, 211.157677) scale(-1, -1) rotate(90.000000) translate(-229.157677, -211.157677) translate(181.157677, 145.157677)">
                <polygon id="WEDGES-l9-o8" style="fill: limegreen" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l9-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l9-o6" style="fill: limegreen" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l9-o5" style="fill: limegreen" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l9-o4" style="fill: yellow" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l9-o3" style="fill: limegreen" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l9-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l9-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l9-o0" style="fill: limegreen" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-8" transform="translate(244.315353, 171.726896) scale(-1, -1) rotate(60.000000) translate(-244.315353, -171.726896) translate(196.315353, 105.726896)">
                <polygon id="WEDGES-l8-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l8-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l8-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l8-o5" style="fill: limegreen" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l8-o4" style="fill: limegreen" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l8-o3" style="fill: limegreen" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l8-o2" style="fill: limegreen" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l8-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l8-o0" style="fill: limegreen" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-7" transform="translate(237.726896, 130.000000) scale(-1, -1) rotate(30.000000) translate(-237.726896, -130.000000) translate(189.726896, 64.000000)">
                <polygon id="WEDGES-l7-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l7-o7" style="fill: limegreen" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l7-o6" style="fill: limegreen" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l7-o5" style="fill: limegreen" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l7-o4" style="fill: limegreen" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l7-o3" style="fill: yellow" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l7-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l7-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l7-o0" style="fill: limegreen" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-6" transform="translate(211.157677, 97.157677) scale(-1, -1) translate(-211.157677, -97.157677) translate(163.157677, 31.157677)">
                <polygon id="WEDGES-l6-o8" style="fill: orange" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l6-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l6-o6" style="fill: orange" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l6-o5" style="fill: orange" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l6-o4" style="fill: yellow" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l6-o3" style="fill: orange" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l6-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l6-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l6-o0" style="fill: orange" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-5" transform="translate(171.726896, 82.000000) rotate(150.000000) translate(-171.726896, -82.000000) translate(123.726896, 16.000000)">
                <polygon id="WEDGES-l5-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l5-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l5-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l5-o5" style="fill: orange" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l5-o4" style="fill: orange" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l5-o3" style="fill: orange" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l5-o2" style="fill: orange" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l5-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l5-o0" style="fill: orange" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-4" transform="translate(130.000000, 88.588457) rotate(120.000000) translate(-130.000000, -88.588457) translate(82.000000, 22.588457)">
                <polygon id="WEDGES-l4-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l4-o7" style="fill: orange" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l4-o6" style="fill: orange" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l4-o5" style="fill: orange" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l4-o4" style="fill: orange" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l4-o3" style="fill: yellow" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l4-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l4-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l4-o0" style="fill: orange" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-3" transform="translate(97.157677, 115.157677) rotate(90.000000) translate(-97.157677, -115.157677) translate(49.157677, 49.157677)">
                <polygon id="WEDGES-l3-o8" style="fill: #26f" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l3-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l3-o6" style="fill: #26f" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l3-o5" style="fill: #26f" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l3-o4" style="fill: yellow" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l3-o3" style="fill: #26f" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l3-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l3-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l3-o0" style="fill: #26f" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-2" transform="translate(82.000000, 154.588457) rotate(60.000000) translate(-82.000000, -154.588457) translate(34.000000, 88.588457)">
                <polygon id="WEDGES-l2-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l2-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l2-o6" style="fill: #D8D8D8" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l2-o5" style="fill: #26f" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l2-o4" style="fill: #26f" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l2-o3" style="fill: #26f" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l2-o2" style="fill: #26f" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l2-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l2-o0" style="fill: #26f" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-1" transform="translate(88.588457, 196.315353) rotate(30.000000) translate(-88.588457, -196.315353) translate(40.588457, 130.315353)">
                <polygon id="WEDGES-l1-o8" style="fill: #D8D8D8" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l1-o7" style="fill: #26f" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l1-o6" style="fill: #26f" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l1-o5" style="fill: #26f" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l1-o4" style="fill: #26f" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l1-o3" style="fill: yellow" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l1-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l1-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l1-o0" style="fill: #26f" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
            <g id="WEDGES-0" transform="translate(67.157677, 163.157677)">
                <polygon id="WEDGES-l0-o8" style="fill: red" points="25.723 70.277 40.574 95.999 -2.27373675e-13 96"></polygon>
                <polygon id="WEDGES-l0-o7" style="fill: #D8D8D8" points="70.2768775 96 60.8615612 131.138439 40.5741225 95.9988775"></polygon>
                <polygon id="WEDGES-l0-o6" style="fill: red" points="70.2768775 96 40.574 95.999 25.7231225 70.2768775"></polygon>
                <polygon id="WEDGES-l0-o5" style="fill: red" points="48.0001225 47.9995 68.287 47.9995 78.4307806 65.5692194"></polygon>
                <polygon id="WEDGES-l0-o4" style="fill: yellow" points="60.8615 35.1385 68.287 47.9995 48 48"></polygon>
                <polygon id="WEDGES-l0-o3" style="fill: red" points="83.1384388 48 78.4307806 65.5692194 68.2870612 47.9994388"></polygon>
                <polygon id="WEDGES-l0-o2" style="fill: yellow" points="83.1384388 48 68.287 47.9995 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l0-o1" style="fill: yellow" points="96 0 83.1384388 48 60.8615612 35.1384388"></polygon>
                <polygon id="WEDGES-l0-o0" style="fill: red" points="70.2768775 96 25.7231225 70.2768775 48.0001225 47.9995 78.4307806 65.5692194"></polygon>
            </g>
        </g>
        <g id="DIAGONALS" transform="translate(168.861561, 1.019238)" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <line x1="0" y1="287.842323" x2="70.2768775" y2="550.119201" id="BOTTOM"></line>
            <line x1="0.15767665" y1="262.276878" x2="70.4345542" y2="2.27488928e-16" id="TOP"></line>
        </g>
    </g>
</svg>`});var wg,Rg=S(()=>{wg={name:"tri_quad",orbits:[{orbitName:"CORNERS",numPieces:5,numOrientations:3},{orbitName:"CORNER_U",numPieces:1,numOrientations:4},{orbitName:"CORNER_R",numPieces:1,numOrientations:3},{orbitName:"EDGES",numPieces:8,numOrientations:2},{orbitName:"BIG_CENTERS",numPieces:6,numOrientations:1},{orbitName:"SMALL_CENTERS",numPieces:13,numOrientations:3}],defaultPattern:{CORNERS:{pieces:[0,1,2,3,4],orientation:[0,0,0,0,0]},CORNER_U:{pieces:[0],orientation:[0]},CORNER_R:{pieces:[0],orientation:[0]},EDGES:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},BIG_CENTERS:{pieces:[0,1,2,3,4,5],orientation:[0,0,0,0,0,0]},SMALL_CENTERS:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11,12],orientation:[0,0,0,0,0,0,0,0,0,0,0,0,0]}},moves:{U:{CORNERS:{permutation:[1,2,3,0,4],orientationDelta:[0,0,0,0,0]},CORNER_U:{permutation:[0],orientationDelta:[3]},CORNER_R:{permutation:[0],orientationDelta:[0]},EDGES:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},BIG_CENTERS:{permutation:[1,2,3,0,4,5],orientationDelta:[0,0,0,0,0,0]},SMALL_CENTERS:{permutation:[2,3,4,5,6,7,0,1,8,9,10,11,12],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0,0]}},R:{CORNERS:{permutation:[4,0,2,3,1],orientationDelta:[2,2,0,0,2]},CORNER_U:{permutation:[0],orientationDelta:[0]},CORNER_R:{permutation:[0],orientationDelta:[2]},EDGES:{permutation:[5,4,2,3,6,7,1,0],orientationDelta:[0,0,0,0,0,0,0,0]},BIG_CENTERS:{permutation:[4,1,2,3,5,0],orientationDelta:[0,0,0,0,0,0]},SMALL_CENTERS:{permutation:[9,8,7,3,4,5,6,12,10,11,1,0,2],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0,0]}}}}});var Tg,Ag=S(()=>{Tg=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="320"
   height="250"
   viewBox="0 0 84.666665 66.145831"
   version="1.1"
   id="svg5"
   inkscape:version="1.2.2 (b0a84865, 2022-12-01)"
   sodipodi:docname="TriQuad.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview7"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     showgrid="false"
     inkscape:zoom="2.8284271"
     inkscape:cx="202.93965"
     inkscape:cy="135.23417"
     inkscape:window-width="1728"
     inkscape:window-height="945"
     inkscape:window-x="0"
     inkscape:window-y="38"
     inkscape:window-maximized="0"
     inkscape:current-layer="layer1" />
  <defs
     id="defs2" />
  <g stroke="black" stroke-width="0.36px" >
    <rect
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       id="rect15738"
       width="11.707812"
       height="4.0348959"
       x="24.27552"
       y="16.734896" />
    <rect
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       id="rect15740"
       width="11.90625"
       height="3.6380208"
       x="24.606249"
       y="44.846874" />
    <rect
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       id="rect15742"
       width="3.96875"
       height="11.641666"
       x="43.65625"
       y="27.516666" />
    <rect
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       id="rect15744"
       width="10.318749"
       height="7.4744792"
       x="63.63229"
       y="42.664062" />
    <rect
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       id="rect15746"
       width="10.583333"
       height="8.2020836"
       x="65.021355"
       y="16.536459" />
    <rect
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       id="rect15736"
       width="5.8869791"
       height="10.847917"
       x="13.295312"
       y="27.252083" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 26.625856,38.003684 8.676292,0.11123 -3.89321,-5.33926 z"
       id="CORNER_U-l0-o3" />
    <path
       id="BIG_CENTERS-l3-o0"
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 35.191134 37.892261 L 26.514661 38.22609 L 26.796297 45.144014 A 1.4187645 1.4461632 0 0 1 26.980782 45.131095 A 1.4187645 1.4461632 0 0 1 28.3993 46.577002 A 1.4187645 1.4461632 0 0 1 26.980782 48.023425 A 1.4187645 1.4461632 0 0 1 26.913603 48.020841 L 27.293424 57.358256 L 32.187699 57.469877 L 33.669263 47.813619 A 1.4187645 1.4461632 0 0 1 33.666679 47.812585 A 1.4187645 1.4461632 0 0 1 33.468758 47.726286 A 1.4187645 1.4461632 0 0 1 33.464624 47.723702 A 1.4187645 1.4461632 0 0 1 33.281689 47.606913 A 1.4187645 1.4461632 0 0 1 33.278589 47.604329 A 1.4187645 1.4461632 0 0 1 33.113741 47.458602 A 1.4187645 1.4461632 0 0 1 32.973698 47.28962 A 1.4187645 1.4461632 0 0 1 32.970597 47.284969 A 1.4187645 1.4461632 0 0 1 32.861043 47.100484 A 1.4187645 1.4461632 0 0 1 32.855876 47.091182 A 1.4187645 1.4461632 0 0 1 32.775777 46.892745 A 1.4187645 1.4461632 0 0 1 32.773193 46.88396 A 1.4187645 1.4461632 0 0 1 32.724618 46.678288 A 1.4187645 1.4461632 0 0 1 32.722034 46.663818 A 1.4187645 1.4461632 0 0 1 32.705497 46.44471 A 1.4187645 1.4461632 0 0 1 32.725651 46.205448 A 1.4187645 1.4461632 0 0 1 32.729785 46.184261 A 1.4187645 1.4461632 0 0 1 32.78818 45.962052 A 1.4187645 1.4461632 0 0 1 32.792314 45.950167 A 1.4187645 1.4461632 0 0 1 32.892049 45.728992 A 1.4187645 1.4461632 0 0 1 33.030025 45.52487 A 1.4187645 1.4461632 0 0 1 33.032609 45.522286 A 1.4187645 1.4461632 0 0 1 33.19849 45.350203 A 1.4187645 1.4461632 0 0 1 33.206759 45.342969 A 1.4187645 1.4461632 0 0 1 33.401579 45.201375 A 1.4187645 1.4461632 0 0 1 33.857365 45.025675 A 1.4187645 1.4461632 0 0 1 34.100761 44.999837 L 35.191134 37.892261 z " />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 32.410048,57.136014 5.89543,0.44494 2.8921,-12.5695 -7.00778,-1.44605 z"
       id="SMALL_CENTERS-l7-o0" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 35.524618,38.337384 -1.00111,5.00555 6.67407,1.55729 z"
       id="EDGES-l0-o1" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 38.305478,57.247244 3.00333,-11.79085 4.78308,5.78419 z"
       id="CORNERS-l0-o2" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 22.51018,57.358484 -3.003333,-12.5695 7.119009,-1.44605 0.667406,14.23802 z"
       id="SMALL_CENTERS-l6-o0" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 16.442944,47.349782 22.51018,57.358484 19.395614,44.900224 Z"
       id="CORNERS-l3-o1"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 19.506848,44.566524 6.896539,-6.67407 -0.111236,5.56172 z"
       id="EDGES-l3-o0" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 29.295488,64.255014 -6.674074,-6.89653 h 9.677404 l 0.3337,4.11567 z"
       id="path999"
       sodipodi:nodetypes="ccccc" />
    <path
       style="fill:#ffff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 32.521288,61.362924 -0.11124,-3.89321 5.45049,0.11124 z"
       id="EDGES-l4-o0"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 26.848325,27.509764 8.676293,-0.11123 -3.89321,5.33926 z"
       id="CORNER_U-l0-o1" />
    <path
       id="BIG_CENTERS-l1-o0"
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 32.409908 8.0439535 L 27.515633 8.1550578 L 27.124959 17.753955 A 1.4187645 1.4461632 0 0 1 28.3993 19.192627 A 1.4187645 1.4461632 0 0 1 27.007654 20.638017 L 26.736869 27.287223 L 35.413342 27.621053 L 34.305916 20.403923 A 1.4187645 1.4461632 0 0 1 33.99224 20.440613 A 1.4187645 1.4461632 0 0 1 32.573206 18.994189 A 1.4187645 1.4461632 0 0 1 33.868734 17.553967 L 32.409908 8.0439535 z " />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 32.632518,8.3774337 5.89543,-0.44494 2.8921,12.5695003 -7.00778,1.44605 z"
       id="SMALL_CENTERS-l2-o0" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 35.747088,27.176064 -1.00111,-5.00555 6.67407,-1.55729 z"
       id="EDGES-l1-o0" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 38.527948,8.2662037 3.00333,11.7908503 4.78308,-5.78419 z"
       id="CORNERS-l1-o1" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 22.732649,8.1549637 -3.003333,12.5695003 7.119009,1.44605 0.667403,-14.2380203 z"
       id="SMALL_CENTERS-l3-o0" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 16.665413,18.631388 22.732649,8.1549637 19.618083,21.548667 Z"
       id="CORNERS-l2-o2"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 19.729317,20.946924 6.896539,6.67407 -0.111236,-5.56172 z"
       id="EDGES-l2-o1" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 29.517958,1.2584335 22.843883,8.154963 h 9.677405 l 0.3337,-4.1156695 z"
       id="path1220"
       sodipodi:nodetypes="ccccc" />
    <path
       style="fill:#8800dd;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 32.743758,4.1505235 -0.11124,3.8932095 5.45049,-0.11124 z"
       id="EDGES-l7-o1"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 25.457888,37.131548 -0.11123,-8.676293 5.33926,3.89321 z"
       id="CORNER_U-l0-o2" />
    <path
       id="BIG_CENTERS-l2-o0"
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 25.568982 28.566732 L 17.670239 29.778544 A 1.4187645 1.4461632 0 0 1 17.683675 29.974398 A 1.4187645 1.4461632 0 0 1 16.265157 31.420821 A 1.4187645 1.4461632 0 0 1 14.865759 30.208492 L 5.9918823 31.569649 L 6.1029867 36.463924 L 15.111739 36.830827 A 1.4187645 1.4461632 0 0 1 16.52974 35.407658 A 1.4187645 1.4461632 0 0 1 17.948258 36.853564 A 1.4187645 1.4461632 0 0 1 17.944641 36.946065 L 25.235669 37.242688 L 25.568982 28.566732 z " />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 6.3255586,31.347355 -0.44494,-5.89543 12.5694994,-2.8921 1.44605,7.00778 z"
       id="SMALL_CENTERS-l4-o0" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 25.124188,28.232785 -5.00555,1.00111 -1.55729,-6.67407 z"
       id="EDGES-l2-o0" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 6.2143286,25.451925 19.12771,21.980873 16.804661,19.255769 Z"
       id="CORNERS-l2-o1"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 6.1030886,41.247224 18.672588,44.250557 20.118638,37.131548 5.8806186,36.464145 Z"
       id="SMALL_CENTERS-l5-o0" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 16.766601,46.846738 6.1030886,41.247224 18.561348,44.36179 Z"
       id="CORNERS-l3-o2"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 18.895048,44.250556 6.67407,-6.896539 -5.56172,0.111236 z"
       id="EDGES-l3-o1" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 37.339636,37.020296 0.11123,-8.676293 -5.33926,3.89321 z"
       id="CORNER_U-l0-o0" />
    <path
       id="BIG_CENTERS-l0-o0"
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 37.228219 28.455111 L 37.562048 37.131584 L 44.151827 36.863383 A 1.4187645 1.4461632 0 0 1 44.148726 36.787419 A 1.4187645 1.4461632 0 0 1 45.567761 35.341512 A 1.4187645 1.4461632 0 0 1 46.985763 36.748145 L 56.694214 36.35282 L 56.805835 31.458545 L 46.577519 29.889132 A 1.4187645 1.4461632 0 0 1 45.170886 31.156238 A 1.4187645 1.4461632 0 0 1 43.751851 29.709814 A 1.4187645 1.4461632 0 0 1 43.774072 29.459184 L 37.228219 28.455111 z " />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 56.471966,31.236103 0.44494,-5.89543 -12.5695,-2.8921 -1.44605,7.00778 z"
       id="SMALL_CENTERS-l1-o0" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 37.673336,28.121533 5.00555,1.00111 1.55729,-6.67407 z"
       id="EDGES-l1-o1" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 56.583196,25.340673 -11.79085,-3.00333 5.78419,-4.78308 z"
       id="CORNERS-l1-o2" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 56.694436,41.135972 -12.5695,3.003333 -1.44605,-7.119009 14.23802,-0.667403 z"
       id="SMALL_CENTERS-l0-o0" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 48.463076,48.699917 8.23136,-7.563945 -12.45826,3.114566 z"
       id="CORNERS-l0-o1" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 43.902476,44.139304 -6.67407,-6.896539 5.56172,0.111236 z"
       id="EDGES-l0-o0" />
    <path
       id="BIG_CENTERS-l4-o0"
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 66.084338 35.995219 L 61.806047 38.374919 L 65.131942 46.747534 A 1.4187645 1.4461632 0 0 1 65.411511 46.718595 A 1.4187645 1.4461632 0 0 1 66.830029 48.164502 A 1.4187645 1.4461632 0 0 1 66.177873 49.380448 L 69.118262 56.782064 L 76.433577 52.105347 L 72.678251 46.259709 A 1.4187645 1.4461632 0 0 1 71.893803 46.502071 A 1.4187645 1.4461632 0 0 1 70.474768 45.055648 A 1.4187645 1.4461632 0 0 1 71.124858 43.841252 L 66.084338 35.995219 z " />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 61.782948,38.775304 -5.31064,2.5983 3.8633,12.30575 6.77659,-2.29738 z"
       id="SMALL_CENTERS-l8-o0" />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 68.605258,56.567014 -1.6684,-4.82433 -6.54498,2.03262 z"
       id="EDGES-l4-o1" />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 56.641118,41.661474 3.37348,11.69033 -7.05188,-2.57016 z"
       id="CORNERS-l0-o0" />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 70.210328,33.575674 8.94888,9.32363 -5.4096,4.84846 -7.77783,-11.94454 z"
       id="SMALL_CENTERS-l9-o0" />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 76.864042,34.005903 -6.653714,-0.430229 8.98856,9.1714 z"
       id="CORNERS-l4-o2"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 79.271738,43.091204 -2.57317,9.24577 -2.71737,-4.85397 z"
       id="EDGES-l5-o0" />
    <path
       id="BIG_CENTERS-l5-o0"
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 71.530001 11.491805 L 68.202039 17.076994 A 1.4187645 1.4461632 0 0 1 68.814404 18.266585 A 1.4187645 1.4461632 0 0 1 67.395886 19.713009 A 1.4187645 1.4461632 0 0 1 66.731844 19.54351 L 61.728015 27.941447 L 65.766528 30.70872 L 72.055033 23.685893 A 1.4187645 1.4461632 0 0 1 71.533101 22.566064 A 1.4187645 1.4461632 0 0 1 72.952136 21.120158 A 1.4187645 1.4461632 0 0 1 73.964478 21.553206 L 78.979159 15.953031 L 71.530001 11.491805 z " />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 66.135278,30.550754 4.69448,3.59388 9.29012,-8.94709 -5.0791,-5.04011 z"
       id="SMALL_CENTERS-l10-o0" />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 79.015288,16.508154 -3.57346,3.64529 4.73882,4.95094 z"
       id="EDGES-l6-o1" />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 71.012098,33.865134 8.95782,-8.23416 -3.12323,8.383912 z"
       id="CORNERS-l4-o1"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 57.722308,25.327844 4.35253,-12.16831 6.75248,2.67868 -7.2206,12.2894 z"
       id="SMALL_CENTERS-l11-o0" />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 55.884858,14.300954 1.83745,11.02689 4.19858,-12.13592 z"
       id="CORNERS-l1-o0" />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 62.196388,12.973214 9.42272,-1.82149 -3.13206,4.59732 z"
       id="EDGES-l7-o0" />
    <path
       style="fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 56.881638,40.784544 4.33814,-7.34148 -4.11567,-7.78641 z"
       id="CORNER_R-l0-o0" />
    <path
       style="fill:#00ff00;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 57.01393,41.025095 13.215848,-7.359561 -9.01,-0.3337 z"
       id="CORNER_R-l0-o1"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#2266ff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 57.549048,25.879124 3.44826,7.00777 8.89876,0.55617 z"
       id="CORNER_R-l0-o2" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 76.795311,34.065104 3.241146,-8.73125 -0.79375,17.396354 z"
       id="CORNERS-l4-o0" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 79.176561,42.531771 3.704167,1.653645 0.926041,-19.446874 -3.836458,0.727604 z"
       id="SMALL_CENTERS-l12-o0" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 79.176561,42.664062 -2.315104,9.855729 6.151562,-8.334375 z"
       id="EDGES-l5-o1"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="m 80.168749,25.333854 -0.727604,-8.665104 4.43177,8.003646 z"
       id="EDGES-l6-o0"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 22.357291,57.546875 16.594008,46.956087 6.4258814,41.831092 Z"
       id="CORNERS-l3-o0"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 22.555729,7.8713541 5.9581597,25.268988 16.594008,18.891116 Z"
       id="CORNERS-l2-o0"
       sodipodi:nodetypes="cccc" />
    <path
       style="fill:#ffa500;fill-opacity:1;stroke:#000000;stroke-width:0.35269;stroke-opacity:0.994007"
       d="M 5.8869791,25.598438 V 41.076562 L 1.0583333,33.866667 Z"
       id="path15317" />
    <path
       id="SMALL_CENTERS-l7-o2"
       style="fill:#000000"
       d="M 34.124532 44.998804 A 1.4187645 1.4461632 0 0 0 34.001025 45.004488 L 33.634123 47.8007 A 1.4187645 1.4461632 0 0 0 34.124532 47.891134 A 1.4187645 1.4461632 0 0 0 35.54305 46.44471 A 1.4187645 1.4461632 0 0 0 34.124532 44.998804 z " />
    <path
       id="SMALL_CENTERS-l7-o1"
       style="fill:#ffff00"
       d="M 32.906002 53.353333 L 32.530314 56.217757 A 1.4187645 1.4461632 0 0 0 32.669324 56.225509 A 1.4187645 1.4461632 0 0 0 34.087842 54.779085 A 1.4187645 1.4461632 0 0 0 32.906002 53.353333 z " />
    <path
       id="SMALL_CENTERS-l6-o1"
       style="fill:#000000"
       d="M 26.711031 45.158484 A 1.4187645 1.4461632 0 0 0 25.561747 46.577002 A 1.4187645 1.4461632 0 0 0 26.844873 48.015674 L 26.711031 45.158484 z " />
    <path
       id="SMALL_CENTERS-l6-o2"
       style="fill:#ffff00"
       d="M 27.072766 52.873775 A 1.4187645 1.4461632 0 0 0 25.760185 54.316064 A 1.4187645 1.4461632 0 0 0 27.17922 55.762488 A 1.4187645 1.4461632 0 0 0 27.208158 55.761454 L 27.072766 52.873775 z " />
    <path
       id="SMALL_CENTERS-l5-o1"
       style="fill:#ffa500"
       d="M 7.4383057 36.536788 A 1.4187645 1.4461632 0 0 0 8.8568237 37.969259 A 1.4187645 1.4461632 0 0 0 10.267074 36.669596 L 7.4383057 36.536788 z " />
    <path
       id="SMALL_CENTERS-l5-o2"
       style="fill:#000000"
       d="M 15.112256 36.896973 A 1.4187645 1.4461632 0 0 0 16.52974 38.299988 A 1.4187645 1.4461632 0 0 0 17.93689 37.029264 L 15.112256 36.896973 z " />
    <path
       id="SMALL_CENTERS-l4-o1"
       style="fill:#000000"
       d="M 16.265157 28.528491 A 1.4187645 1.4461632 0 0 0 14.846122 29.974398 A 1.4187645 1.4461632 0 0 0 14.86886 30.227096 L 17.679024 29.858643 A 1.4187645 1.4461632 0 0 0 16.265157 28.528491 z " />
    <path
       id="SMALL_CENTERS-l4-o2"
       style="fill:#ffa500"
       d="M 8.9229696 29.586825 A 1.4187645 1.4461632 0 0 0 7.5039347 31.032731 A 1.4187645 1.4461632 0 0 0 7.5137533 31.191895 L 10.325985 30.822925 A 1.4187645 1.4461632 0 0 0 8.9229696 29.586825 z " />
    <path
       id="SMALL_CENTERS-l3-o2"
       style="fill:#000000"
       d="M 26.980782 17.74672 A 1.4187645 1.4461632 0 0 0 25.561747 19.192627 A 1.4187645 1.4461632 0 0 0 26.920321 20.636466 L 27.055713 17.748271 A 1.4187645 1.4461632 0 0 0 26.980782 17.74672 z " />
    <path
       id="SMALL_CENTERS-l3-o1"
       style="fill:#8800dd"
       d="M 27.377657 9.7430745 A 1.4187645 1.4461632 0 0 0 25.958622 11.188981 A 1.4187645 1.4461632 0 0 0 27.295492 12.632304 L 27.430884 9.7435913 A 1.4187645 1.4461632 0 0 0 27.377657 9.7430745 z " />
    <path
       id="SMALL_CENTERS-l2-o2"
       style="fill:#8800dd"
       d="M 32.867761 9.8092204 A 1.4187645 1.4461632 0 0 0 32.820736 9.8107707 L 33.194356 12.661759 A 1.4187645 1.4461632 0 0 0 34.286279 11.255127 A 1.4187645 1.4461632 0 0 0 32.867761 9.8092204 z " />
    <path
       id="SMALL_CENTERS-l2-o1"
       style="fill:#000000"
       d="M 33.99224 17.548283 A 1.4187645 1.4461632 0 0 0 33.836694 17.557585 L 34.212382 20.422526 A 1.4187645 1.4461632 0 0 0 35.410758 18.994189 A 1.4187645 1.4461632 0 0 0 33.99224 17.548283 z " />
    <path
       id="SMALL_CENTERS-l1-o2"
       style="fill:#000000"
       d="M 45.170886 28.263908 A 1.4187645 1.4461632 0 0 0 43.759603 29.569255 L 46.571318 29.937708 A 1.4187645 1.4461632 0 0 0 46.589404 29.709814 A 1.4187645 1.4461632 0 0 0 45.170886 28.263908 z " />
    <path
       id="SMALL_CENTERS-l1-o1"
       style="fill:#ff0000"
       d="M 53.505261 29.322241 A 1.4187645 1.4461632 0 0 0 52.090361 30.661694 L 54.898975 31.030147 A 1.4187645 1.4461632 0 0 0 54.923779 30.768148 A 1.4187645 1.4461632 0 0 0 53.505261 29.322241 z " />
    <path
       id="SMALL_CENTERS-l0-o2"
       style="fill:#ff0000"
       d="M 55.642082 36.412764 L 52.842769 36.544023 A 1.4187645 1.4461632 0 0 0 54.232865 37.704675 A 1.4187645 1.4461632 0 0 0 55.642082 36.412764 z " />
    <path
       id="SMALL_CENTERS-l0-o1"
       style="fill:#000000"
       d="M 46.985246 36.818424 L 44.159062 36.951233 A 1.4187645 1.4461632 0 0 0 45.567761 38.233842 A 1.4187645 1.4461632 0 0 0 46.985246 36.818424 z " />
    <path
       id="SMALL_CENTERS-l8-o1"
       style="fill:#00ff00"
       d="M 62.328495 40.066288 A 1.4187645 1.4461632 0 0 0 61.412789 41.417627 A 1.4187645 1.4461632 0 0 0 62.831824 42.86405 A 1.4187645 1.4461632 0 0 0 63.449874 42.71884 L 62.328495 40.066288 z " />
    <path
       id="SMALL_CENTERS-l8-o2"
       style="fill:#000000"
       d="M 65.151579 46.743917 A 1.4187645 1.4461632 0 0 0 63.992476 48.164502 A 1.4187645 1.4461632 0 0 0 65.411511 49.610925 A 1.4187645 1.4461632 0 0 0 66.246086 49.332389 L 65.151579 46.743917 z " />
    <path
       id="SMALL_CENTERS-l9-o1"
       style="fill:#000000"
       d="M 71.893803 43.609741 A 1.4187645 1.4461632 0 0 0 71.182218 43.805078 L 72.747498 46.209066 A 1.4187645 1.4461632 0 0 0 73.312321 45.055648 A 1.4187645 1.4461632 0 0 0 71.893803 43.609741 z " />
    <path
       id="SMALL_CENTERS-l9-o2"
       style="fill:#00ff00"
       d="M 67.858907 37.259741 A 1.4187645 1.4461632 0 0 0 67.076526 37.500037 L 68.644906 39.908675 A 1.4187645 1.4461632 0 0 0 69.277425 38.705648 A 1.4187645 1.4461632 0 0 0 67.858907 37.259741 z " />
    <path
       id="SMALL_CENTERS-l10-o1"
       style="fill:#2266ff"
       d="M 68.77203 27.473258 L 66.907544 29.649353 A 1.4187645 1.4461632 0 0 0 67.792761 29.965613 A 1.4187645 1.4461632 0 0 0 69.211279 28.519189 A 1.4187645 1.4461632 0 0 0 68.77203 27.473258 z " />
    <path
       id="SMALL_CENTERS-l10-o2"
       style="fill:#000000"
       d="M 73.899365 21.489644 L 72.033329 23.667289 A 1.4187645 1.4461632 0 0 0 72.952136 24.012488 A 1.4187645 1.4461632 0 0 0 74.370654 22.566064 A 1.4187645 1.4461632 0 0 0 73.899365 21.489644 z " />
    <path
       id="SMALL_CENTERS-l11-o1"
       style="fill:#000000"
       d="M 67.395886 16.820679 A 1.4187645 1.4461632 0 0 0 65.976851 18.266585 A 1.4187645 1.4461632 0 0 0 66.670349 19.508887 L 68.128141 17.027901 A 1.4187645 1.4461632 0 0 0 67.395886 16.820679 z " />
    <path
       id="SMALL_CENTERS-l11-o2"
       style="fill:#2266ff"
       d="M 63.096407 24.361304 A 1.4187645 1.4461632 0 0 0 61.677372 25.80721 A 1.4187645 1.4461632 0 0 0 62.276819 26.986983 L 63.72996 24.513749 A 1.4187645 1.4461632 0 0 0 63.096407 24.361304 z " />
    <path
       id="SMALL_CENTERS-l12-o1"
       style="fill:#ffffff"
       d="M 83.706002 26.853658 A 1.2100496 1.2568218 0 0 0 82.512276 28.109912 A 1.2100496 1.2568218 0 0 0 83.586629 29.358415 L 83.706002 26.853658 z " />
    <path
       id="SMALL_CENTERS-l12-o2"
       style="fill:#ffffff"
       d="M 83.135494 38.833805 A 1.2100496 1.2568218 0 0 0 82.044604 40.083858 A 1.2100496 1.2568218 0 0 0 83.017155 41.315308 L 83.135494 38.833805 z " />
  </g>
</svg>
`});var Ii={};vn(Ii,{clockJSON:()=>ug,clockSVG:()=>dg,cube2x2x2JSON:()=>og,cube2x2x2LLSVG:()=>cg,cube2x2x2SVG:()=>ag,melindas2x2x2x2OrbitJSON:()=>mg,melindas2x2x2x2OrbitSVG:()=>yg,pyraminxSVG:()=>Sg,sq1HyperOrbitJSON:()=>Eg,sq1HyperOrbitSVG:()=>bg,triQuadJSON:()=>wg,triQuadSVG:()=>Tg});var Oi=S(()=>{sg();lg();fg();pg();hg();gg();xg();vg();Mg();_g();Rg();Ag()});var sd,Dg=S(()=>{Xi();qi();lr();ei();ba();yc();sd={id:"2x2x2",fullName:"2\xD72\xD72 Cube",kpuzzle:He(async()=>{let r=new It((await Promise.resolve().then(()=>(Oi(),Ii))).cube2x2x2JSON);return r.definition.experimentalIsPatternSolved=td,r}),svg:async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).cube2x2x2SVG,llSVG:He(async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).cube2x2x2LLSVG),pg:He(async()=>Ra("2x2x2")),stickeringMask:r=>Jr(sd,r),stickerings:()=>wn("2x2x2",{use3x3x3Fallbacks:!0}),algTransformData:wa}});var xc,ad=S(()=>{ot();nd();xc={...hc,KeyZ:new T("m'"),KeyB:new T("m"),Period:new T("m'")}});var R4,Cg=S(()=>{R4=`<svg
  height="256"
  viewBox="0 0 256 256"
  width="256"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <g id="sticker">
        <rect x="0" y="0" width="1" height="1"/>
    </g>
  </defs>
  <g fill="none" fill-rule="nonzero" stroke="#000">
    <g stroke-linejoin="round" stroke-width="3" transform="translate(17 17)">
      <!-- U -->
      <path id="CORNERS-l2-o0" d="m37.4 74.2v-36.8h36.8v36.8z" style="fill: white" />
      <path id="EDGES-l0-o0" d="m74.2 37.4h36.8v36.8h-36.8z" style="fill: white" />
      <path id="EDGES-l16-o0" d="m111 74.2v-36.8h36.8v36.8z" style="fill: white" />
      <path id="CORNERS-l1-o0" d="m147.8 37.4h36.8v36.8h-36.8z" style="fill: white" />

      <path id="EDGES-l4-o0" d="m74.2 111h-36.8v-36.8h36.8z" style="fill: white" />
      <path id="CENTERS-l0-o0" d="m111 74.2v36.8h-36.8v-36.8z" style="fill: white" />
      <path id="CENTERS-l1-o0" d="m147.8 111h-36.8v-36.8h36.8z" style="fill: white" />
      <path id="EDGES-l1-o0" d="m184.6 74.2v36.8h-36.8v-36.8z" style="fill: white" />

      <path id="EDGES-l3-o0" d="m37.4 147.8v-36.8h36.8v36.8z" style="fill: white" />
      <path id="CENTERS-l3-o0" d="m74.2 111h36.8v36.8h-36.8z" style="fill: white" />
      <path id="CENTERS-l2-o0" d="m111 147.8v-36.8h36.8v36.8z" style="fill: white" />
      <path id="EDGES-l12-o0" d="m147.8 111h36.8v36.8h-36.8z" style="fill: white" />

      <path id="CORNERS-l3-o0" d="m74.2 184.6h-36.8v-36.8h36.8z" style="fill: white" />
      <path id="EDGES-l8-o0" d="m111 147.8v36.8h-36.8v-36.8z" style="fill: white" />
      <path id="EDGES-l2-o0" d="m147.8 184.6h-36.8v-36.8h36.8z" style="fill: white" />
      <path id="CORNERS-l0-o0" d="m184.6 147.8v36.8h-36.8v-36.8z" style="fill: white" />

      <path id="CORNERS-l3-o1" d="m.6 221.4 36.8-36.8h36.8v36.8z" style="fill: limegreen" />
      <path id="EDGES-l8-o1" d="m74.2 184.5h36.8v36.8h-36.8z" style="fill: limegreen" />
      <path id="EDGES-l2-o1" d="m111 221.4v-36.8h36.8v36.8z" style="fill: limegreen" />
      <path id="CORNERS-l0-o2" d="m147.8 184.5h36.8l36.8 36.8h-73.6z" style="fill: limegreen" />

      <path id="CORNERS-l2-o1" d="m-18 55.8 36.8-36.8h36.8v36.8z" style="fill: orange" transform="matrix(0 1 -1 0 56.4 18.4)" />
      <path id="EDGES-l4-o1" d="m.6 74.2h36.8v36.8h-36.8z" style="fill: orange" transform="matrix(0 1 -1 0 111.6 73.5)" />
      <path id="EDGES-l3-o1" d="m.6 147.8v-36.8h36.8v36.8z" style="fill: orange" transform="matrix(0 1 -1 0 148.4 110.4)" />
      <path id="CORNERS-l3-o2" d="m-18 166.2h36.8l36.8 36.8h-73.6z" style="fill: orange" transform="matrix(0 1 -1 0 203.6 165.5)" />

      <path id="CORNERS-l1-o1" d="m147.8 37.4 36.8-36.8h36.8v36.8z" style="fill: #26f" transform="matrix(-1 0 0 -1 369.2 38)" />
      <path id="EDGES-l16-o1" d="m111 .6h36.8v36.8h-36.8z" style="fill: #26f" transform="matrix(-1 0 0 -1 258.8 38)" />
      <path id="EDGES-l0-o1" d="m74.2 37.4v-36.8h36.8v36.8z" style="fill: #26f" transform="matrix(-1 0 0 -1 185.2 38)" />
      <path id="CORNERS-l2-o2" d="m.6.6h36.8l36.8 36.8h-73.6z" style="fill: #26f" transform="matrix(-1 0 0 -1 74.8 38)" />

      <path id="CORNERS-l0-o1" d="m166.200018 203 36.8-36.8h36.8v36.8z" style="fill: red" transform="matrix(0 -1 1 0 18.4 387.6)" />
      <path id="EDGES-l12-o1" d="m184.6 111h36.8v36.8h-36.8z" style="fill: red" transform="matrix(0 -1 1 0 73.6 332.4)" />
      <path id="EDGES-l1-o1" d="m184.6 111v-36.8h36.8v36.8z" style="fill: red" transform="matrix(0 -1 1 0 110.4 295.6)" />
      <path id="CORNERS-l1-o2" d="m166.200012 19h36.8l36.8 36.8h-73.6z" style="fill: red" transform="matrix(0 -1 1 0 165.6 240.4)" />
    </g>
    <g opacity="0" transform="translate(17 242)">
      <path id="EDGES-l9-o0" href="#sticker" style="fill: limegreen" />
      <path id="CENTERS-l9-o0" href="#sticker" style="fill: limegreen" />
      <path id="CENTERS-l8-o0" href="#sticker" style="fill: limegreen" />
      <path id="EDGES-l5-o0" href="#sticker" style="fill: limegreen" />
      <path id="EDGES-l11-o0" href="#sticker" style="fill: limegreen" />
      <path id="CENTERS-l11-o0" href="#sticker" style="fill: limegreen" />
      <path id="CENTERS-l10-o0" href="#sticker" style="fill: limegreen" />
      <path id="EDGES-l15-o0" href="#sticker" style="fill: limegreen" />
      <path id="CORNERS-l4-o1" href="#sticker" style="fill: limegreen" />
      <path id="EDGES-l10-o1" href="#sticker" style="fill: limegreen" />
      <path id="EDGES-l20-o1" href="#sticker" style="fill: limegreen" />
      <path id="CORNERS-l5-o2" href="#sticker" style="fill: limegreen" />

      <path id="CORNERS-l5-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l20-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l10-o0" href="#sticker" style="fill: yellow"/>
      <path id="CORNERS-l4-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l21-o0" href="#sticker" style="fill: yellow"/>
      <path id="CENTERS-l21-o0" href="#sticker" style="fill: yellow"/>
      <path id="CENTERS-l20-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l6-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l23-o0" href="#sticker" style="fill: yellow"/>
      <path id="CENTERS-l23-o0" href="#sticker" style="fill: yellow"/>
      <path id="CENTERS-l22-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l14-o0" href="#sticker" style="fill: yellow"/>
      <path id="CORNERS-l7-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l22-o0" href="#sticker" style="fill: yellow"/>
      <path id="EDGES-l18-o0" href="#sticker" style="fill: yellow"/>
      <path id="CORNERS-l6-o0" href="#sticker" style="fill: yellow"/>

      <path id="EDGES-l5-o1" href="#sticker" style="fill: orange" />
      <path id="EDGES-l11-o1" href="#sticker" style="fill: orange" />
      <path id="CORNERS-l5-o1" href="#sticker" style="fill: orange" />
      <path id="EDGES-l6-o1" href="#sticker" style="fill: orange" />
      <path id="CENTERS-l6-o0" href="#sticker" style="fill: orange" />
      <path id="CENTERS-l5-o0" href="#sticker" style="fill: orange" />
      <path id="CENTERS-l4-o0" href="#sticker" style="fill: orange" />
      <path id="CENTERS-l7-o0" href="#sticker" style="fill: orange" />
      <path id="EDGES-l23-o1" href="#sticker" style="fill: orange" />
      <path id="CORNERS-l6-o2" href="#sticker" style="fill: orange" />
      <path id="EDGES-l7-o1" href="#sticker" style="fill: orange" />
      <path id="EDGES-l17-o1" href="#sticker" style="fill: orange" />

      <path id="CORNERS-l6-o1" href="#sticker" style="fill: #26f" />
      <path id="EDGES-l18-o1" href="#sticker" style="fill: #26f" />
      <path id="EDGES-l22-o1" href="#sticker" style="fill: #26f" />
      <path id="CORNERS-l7-o2" href="#sticker" style="fill: #26f" />
      <path id="EDGES-l19-o0" href="#sticker" style="fill: #26f" />
      <path id="CENTERS-l19-o0" href="#sticker" style="fill: #26f" />
      <path id="CENTERS-l18-o0" href="#sticker" style="fill: #26f" />
      <path id="EDGES-l7-o0" href="#sticker" style="fill: #26f" />
      <path id="EDGES-l17-o0" href="#sticker" style="fill: #26f" />
      <path id="CENTERS-l17-o0" href="#sticker" style="fill: #26f" />
      <path id="CENTERS-l16-o0" href="#sticker" style="fill: #26f" />
      <path id="EDGES-l13-o0" href="#sticker" style="fill: #26f" />

      <path id="CORNERS-l4-o2" href="#sticker" style="fill: red" />
      <path id="EDGES-l15-o1" href="#sticker" style="fill: red" />
      <path id="EDGES-l9-o1" href="#sticker" style="fill: red" />
      <path id="CENTERS-l12-o0" href="#sticker" style="fill: red" />
      <path id="CENTERS-l15-o0" href="#sticker" style="fill: red" />
      <path id="EDGES-l21-o1" href="#sticker" style="fill: red" />
      <path id="EDGES-l14-o1" href="#sticker" style="fill: red" />
      <path id="CENTERS-l14-o0" href="#sticker" style="fill: red" />
      <path id="CENTERS-l13-o0" href="#sticker" style="fill: red" />
      <path id="EDGES-l13-o1" href="#sticker" style="fill: red" />
      <path id="EDGES-l19-o1" href="#sticker" style="fill: red" />
      <path id="CORNERS-l7-o1" href="#sticker" style="fill: red" />
    </g>
  </g>
</svg>`});var Lg={};vn(Lg,{cube4x4x4LLSVG:()=>R4});var Pg=S(()=>{Cg()});var Wo,zg=S(()=>{lr();ei();qi();ad();Wo=new Cr({id:"4x4x4",fullName:"4\xD74\xD74 Cube",inventedBy:["Peter Sebest\xE9ny"],inventionYear:1981});Wo.llSVG=He(async()=>(await Promise.resolve().then(()=>(Pg(),Lg))).cube4x4x4LLSVG);Wo.keyMapping=async()=>xc;Wo.kpuzzle=He(async()=>{let r=await Xt.prototype.kpuzzle.call(Wo);r.definition.defaultPattern.CENTERS.pieces=[0,0,0,0,4,4,4,4,8,8,8,8,12,12,12,12,16,16,16,16,20,20,20,20];let{experimentalIsBigCubeSolved:e}=await dc();return r.definition.experimentalIsPatternSolved=e,r})});var Ta,kg=S(()=>{lr();ei();qi();ad();Ta=new Cr({id:"5x5x5",fullName:"5\xD75\xD75 Cube",inventedBy:["Udo Krell"],inventionYear:1981});Ta.keyMapping=async()=>xc;Ta.kpuzzle=He(async()=>{let r=await Xt.prototype.kpuzzle.call(Ta),e=[0,0,0,0,4,4,4,4,8,8,8,8,12,12,12,12,16,16,16,16,20,20,20,20];r.definition.defaultPattern.CENTERS.pieces=e,r.definition.defaultPattern.CENTERS2.pieces=e,r.definition.defaultPattern.CENTERS3.orientationMod=new Array(6).fill(1);let{experimentalIsBigCubeSolved:t}=await dc();return r.definition.experimentalIsPatternSolved=t,r})});async function Sc(r,e){let t=await r.kpuzzle(),i=new Bo(t),n=new Go(t),o=()=>n.and([n.move("U"),n.not(n.or(n.moves(["F","BL","BR"])))]),s=()=>n.and([n.move("U"),n.not(n.move("F"))]),a=()=>n.or([s(),n.and([n.move("F"),n.not(n.or(n.moves(["U","BL","BR"])))])]),l=()=>n.not(n.or([n.and([n.move("U"),n.move("F")]),n.and([n.move("F"),n.move("BL")]),n.and([n.move("F"),n.move("BR")]),n.and([n.move("BL"),n.move("BR")])])),c=()=>n.not(n.or([n.and([n.move("F"),n.move("BL")]),n.and([n.move("F"),n.move("BR")]),n.and([n.move("BL"),n.move("BR")])]));switch(e){case"full":break;case"experimental-fto-fc":{i.set(n.not(o()),j.Ignored);break}case"experimental-fto-f2t":{i.set(n.not(s()),j.Ignored),i.set(o(),j.Dim);break}case"experimental-fto-sc":{i.set(n.not(a()),j.Ignored),i.set(s(),j.Dim);break}case"experimental-fto-l2c":{i.set(n.not(l()),j.Ignored),i.set(a(),j.Dim);break}case"experimental-fto-lbt":{i.set(n.not(c()),j.Ignored),i.set(l(),j.Dim);break}case"experimental-fto-l3t":{i.set(c(),j.Dim);break}default:console.warn(`Unsupported stickering for ${r.id}: ${e}. Setting all pieces to dim.`),i.set(n.and(n.moves([])),j.Dim)}return i.toStickeringMask()}async function Ng(){return["full","experimental-fto-fc","experimental-fto-f2t","experimental-fto-sc","experimental-fto-l2c","experimental-fto-lbt","experimental-fto-l3t"]}var ld=S(()=>{uc()});var vc,cd=S(()=>{ot();vc={KeyI:new T("R"),KeyK:new T("R'"),KeyW:new T("B"),KeyO:new T("B'"),KeyS:new T("D"),KeyL:new T("D'"),KeyD:new T("L"),KeyE:new T("L'"),KeyJ:new T("U"),KeyF:new T("U'"),KeyH:new T("F"),KeyG:new T("F'"),KeyN:new T("Rv'"),KeyC:new T("l"),KeyR:new T("l'"),KeyU:new T("r"),KeyM:new T("r'"),KeyX:new T("d"),Comma:new T("d'"),KeyT:new T("Lv'"),KeyY:new T("Rv"),KeyV:new T("Lv"),Semicolon:new T("Uv"),KeyA:new T("Uv'"),KeyP:new T("BR'"),KeyQ:new T("BL"),KeyZ:new T("BL'"),KeyB:new T("T"),Period:new T("BR"),Backquote:new At}});var Ig,Og=S(()=>{Ig=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="1348px" height="556px" viewBox="210 210 1588 796" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>fto</title>
    <g id="fto" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
      <g transform="translate(-360, 0)">
        <g id="BL" transform="translate(2020, 608) scale(-1, -1) rotate(90) translate(-2040, -608) translate(1560, 368)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o3" style="fill: #ff8000;" points="480 0 640 160 320 160"></polygon>
            <polygon id="C4RNER-l5-o2" style="fill: #ff8000;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l2-o0" style="fill: #ff8000;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
            <polygon id="C4RNER-l3-o1" style="fill: #ff8000;" points="320 160 480 320 160 320"></polygon>
        </g>
        <g id="D" transform="translate(1280, 628)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o0" style="fill: #f4f400;" points="480 0 640 160 320 160"></polygon>
            <polygon id="C4RNER-l3-o0" style="fill: #f4f400;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l4-o0" style="fill: #f4f400;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
            <polygon id="C4RNER-l1-o0" style="fill: #f4f400;" points="320 160 480 320 160 320"></polygon>
        </g>
        <g id="BR" transform="translate(1500, 608) scale(1, -1) rotate(90) translate(-1480, -608) translate(1000, 368)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o1" style="fill: #aaaaaa;" points="480 0 640 160 320 160"></polygon>
            <polygon id="C4RNER-l2-o2" style="fill: #aaaaaa;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l1-o0" style="fill: #aaaaaa;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
            <polygon id="C4RNER-l1-o3" style="fill: #aaaaaa;" points="320 160 480 320 160 320"></polygon>
        </g>
        <g id="B" transform="translate(1760, 348) scale(1, -1) translate(-1760, -328) translate(1280, 88)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o2" style="fill: #2266ff;" points="480 0 640 160 320 160"></polygon>
            <polygon id="C4RNER-l5-o3" style="fill: #2266ff;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l6-o0" style="fill: #2266ff;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
            <polygon id="C4RNER-l2-o1" style="fill: #2266ff;" points="320 160 480 320 160 320"></polygon>
        </g>
      </g>
      <g id="R" transform="translate(868, 608) scale(-1, -1) rotate(90) translate(-888, -608) translate(408, 368)" stroke="#000000" stroke-width="12">
          <polygon id="C4RNER-l0-o1" style="fill: red;" points="480 0 640 160 320 160"></polygon>
          <polygon id="C4RNER-l2-o3" style="fill: red;" points="640 160 800 320 480 320"></polygon>
          <polygon id="CENTERS-l3-o0" style="fill: red;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
          <polygon id="C4RNER-l1-o2" style="fill: red;" points="320 160 480 320 160 320"></polygon>
      </g>
      <g id="F" transform="translate(128, 628)" stroke="#000000" stroke-width="12">
          <polygon id="C4RNER-l0-o2" style="fill: #44ee00;" points="480 0 640 160 320 160"></polygon>
          <polygon id="C4RNER-l1-o1" style="fill: #44ee00;" points="640 160 800 320 480 320"></polygon>
          <polygon id="CENTERS-l0-o0" style="fill: #44ee00;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
          <polygon id="C4RNER-l3-o3" style="fill: #44ee00;" points="320 160 480 320 160 320"></polygon>
      </g>
      <g id="L" transform="translate(348, 608) scale(1, -1) rotate(90) translate(-328, -608) translate(-152, 368)" stroke="#000000" stroke-width="12">
          <polygon id="C4RNER-l0-o3" style="fill: #8800dd;" points="480 0 640 160 320 160"></polygon>
          <polygon id="C4RNER-l5-o1" style="fill: #8800dd;" points="640 160 800 320 480 320"></polygon>
          <polygon id="CENTERS-l5-o0" style="fill: #8800dd;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
          <polygon id="C4RNER-l3-o2" style="fill: #8800dd;" points="320 160 480 320 160 320"></polygon>
      </g>
      <g id="U" transform="translate(608, 348) scale(1, -1) translate(-608, -328) translate(128, 88)" stroke="#000000" stroke-width="12">
          <polygon id="C4RNER-l0-o0" style="fill: #ffffff;" points="480 0 640 160 320 160"></polygon>
          <polygon id="C4RNER-l2-o0" style="fill: #ffffff;" points="640 160 800 320 480 320"></polygon>
          <polygon id="CENTERS-l7-o0" style="fill: #ffffff;" transform="translate(480, 240) scale(1, -1) translate(-480, -240) " points="480 160 640 320 320 320"></polygon>
          <polygon id="C4RNER-l5-o0" style="fill: #ffffff;" points="320 160 480 320 160 320"></polygon>
      </g>
    </g>
</svg>
`});var Fg,Ug=S(()=>{Fg=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="2368px" height="1216px" viewBox="0 0 2368 1216" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>fto</title>
    <g id="fto" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
        <g id="BL" transform="translate(2040.000000, 608.000000) scale(-1, -1) rotate(90.000000) translate(-2040.000000, -608.000000) translate(1560.000000, 368.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o3" style="fill: #ff8000;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l9-o0" style="fill: #ff8000;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l16-o0" style="fill: #ff8000;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l3-o0" style="fill: #ff8000;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l3-o2" style="fill: #ff8000;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l19-o0" style="fill: #ff8000;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l7-o0" style="fill: #ff8000;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l3-o0" style="fill: #ff8000;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l0-o1" style="fill: #ff8000;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="D" transform="translate(1280.000000, 648.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o0" style="fill: #f4f400;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l3-o1" style="fill: #f4f400;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l8-o0" style="fill: #f4f400;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l5-o1" style="fill: #f4f400;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l0-o0" style="fill: #f4f400;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l17-o0" style="fill: #f4f400;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l1-o1" style="fill: #f4f400;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l6-o0" style="fill: #f4f400;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l2-o0" style="fill: #f4f400;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="BR" transform="translate(1480.000000, 608.000000) scale(1, -1) rotate(90.000000) translate(-1480.000000, -608.000000) translate(1000.000000, 368.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o1" style="fill: #aaaaaa;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l2-o0" style="fill: #aaaaaa;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l15-o0" style="fill: #aaaaaa;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l5-o0" style="fill: #aaaaaa;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l5-o2" style="fill: #aaaaaa;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l2-o0" style="fill: #aaaaaa;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l4-o0" style="fill: #aaaaaa;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l4-o0" style="fill: #aaaaaa;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l2-o3" style="fill: #aaaaaa;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="B" transform="translate(1760.000000, 328.000000) scale(1, -1) translate(-1760.000000, -328.000000) translate(1280.000000, 88.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l4-o2" style="fill: #2266ff;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l9-o1" style="fill: #2266ff;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l13-o0" style="fill: #2266ff;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l2-o1" style="fill: #2266ff;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l3-o3" style="fill: #2266ff;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l12-o0" style="fill: #2266ff;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l8-o1" style="fill: #2266ff;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l10-o0" style="fill: #2266ff;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l5-o1" style="fill: #2266ff;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="R" transform="translate(888.000000, 608.000000) scale(-1, -1) rotate(90.000000) translate(-888.000000, -608.000000) translate(408.000000, 368.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l1-o1" style="fill: red;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l6-o1" style="fill: red;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l7-o0" style="fill: red;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l0-o1" style="fill: red;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l5-o3" style="fill: red;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l5-o0" style="fill: red;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l4-o1" style="fill: red;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l11-o0" style="fill: red;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l2-o2" style="fill: red;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="F" transform="translate(128.000000, 648.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l1-o2" style="fill: #44ee00;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l0-o0" style="fill: #44ee00;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l0-o0" style="fill: #44ee00;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l10-o0" style="fill: #44ee00;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l2-o1" style="fill: #44ee00;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l1-o0" style="fill: #44ee00;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l1-o0" style="fill: #44ee00;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l14-o0" style="fill: #44ee00;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l0-o3" style="fill: #44ee00;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="L" transform="translate(328.000000, 608.000000) scale(1, -1) rotate(90.000000) translate(-328.000000, -608.000000) translate(-152.000000, 368.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l1-o3" style="fill: #8800dd;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l11-o1" style="fill: #8800dd;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l21-o0" style="fill: #8800dd;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l10-o1" style="fill: #8800dd;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l3-o1" style="fill: #8800dd;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l18-o0" style="fill: #8800dd;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l7-o1" style="fill: #8800dd;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l9-o0" style="fill: #8800dd;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l0-o2" style="fill: #8800dd;" points="160 320 320 480 0 480"></polygon>
        </g>
        <g id="U" transform="translate(608.000000, 328.000000) scale(1, -1) translate(-608.000000, -328.000000) translate(128.000000, 88.000000)" stroke="#000000" stroke-width="12">
            <polygon id="C4RNER-l1-o0" style="fill: #ffffff;" points="480 0 640 160 320 160"></polygon>
            <polygon id="EDGES-l6-o0" style="fill: #ffffff;" points="640 160 800 320 480 320"></polygon>
            <polygon id="CENTERS-l20-o0" style="fill: #ffffff;" transform="translate(480.000000, 240.000000) scale(1, -1) translate(-480.000000, -240.000000) " points="480 160 640 320 320 320"></polygon>
            <polygon id="EDGES-l11-o0" style="fill: #ffffff;" points="320 160 480 320 160 320"></polygon>
            <polygon id="C4RNER-l5-o0" style="fill: #ffffff;" points="800 320 960 480 640 480"></polygon>
            <polygon id="CENTERS-l23-o0" style="fill: #ffffff;" transform="translate(640.000000, 400.000000) scale(1, -1) translate(-640.000000, -400.000000) " points="640 320 800 480 480 480"></polygon>
            <polygon id="EDGES-l8-o0" style="fill: #ffffff;" points="480 320 640 480 320 480"></polygon>
            <polygon id="CENTERS-l22-o0" style="fill: #ffffff;" transform="translate(320.000000, 400.000000) scale(1, -1) translate(-320.000000, -400.000000) " points="320 320 480 480 160 480"></polygon>
            <polygon id="C4RNER-l3-o0" style="fill: #ffffff;" points="160 320 320 480 0 480"></polygon>
        </g>
    </g>
</svg>
`});var Bg,Gg=S(()=>{Bg=`<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 500">
<style type="text/css"><![CDATA[.sticker { stroke: #000000; stroke-width: 1px; }]]></style>
<g><title>U</title>
<polygon id="CORNERS-l7-o0" class="sticker" style="fill: #ffffff" points="247.941 89.861 283.500 115.696 269.918 157.499 212.382 138.805"/>
<polygon id="CORNERS-l1-o0" class="sticker" style="fill: #ffffff" points="154.845 157.499 141.263 115.696 176.822 89.861 212.382 138.805"/>
<polygon id="CORNERS-l6-o0" class="sticker" style="fill: #ffffff" points="176.822 89.861 212.381 64.025 247.941 89.861 212.382 138.805"/>
<polygon id="CORNERS-l0-o0" class="sticker" style="fill: #ffffff" points="212.381 199.301 168.427 199.301 154.845 157.499 212.382 138.805"/>
<polygon id="CORNERS-l2-o0" class="sticker" style="fill: #ffffff" points="269.918 157.499 256.335 199.301 212.381 199.301 212.382 138.805"/>
</g><g><title>F</title>
<polygon id="CORNERS-l8-o0" class="sticker" style="fill: #008800" points="247.941 319.263 212.381 345.098 176.822 319.263 212.382 270.32"/>
<polygon id="CORNERS-l2-o2" class="sticker" style="fill: #008800" points="212.381 209.823 256.335 209.823 269.918 251.625 212.382 270.32"/>
<polygon id="CORNERS-l19-o1" class="sticker" style="fill: #008800" points="269.918 251.625 283.500 293.428 247.941 319.263 212.382 270.32"/>
<polygon id="CORNERS-l0-o1" class="sticker" style="fill: #008800" points="154.845 251.625 168.427 209.823 212.381 209.823 212.382 270.32"/>
<polygon id="CORNERS-l3-o2" class="sticker" style="fill: #008800" points="176.822 319.263 141.263 293.428 154.845 251.625 212.382 270.32"/>
</g><g><title>L</title>
<polygon id="CORNERS-l4-o0" class="sticker" style="fill: #8800dd" points="87.302 290.176 43.349 290.176 29.766 248.374 87.303 229.68"/>
<polygon id="CORNERS-l0-o2" class="sticker" style="fill: #8800dd" points="122.862 180.736 158.421 206.571 144.839 248.374 87.303 229.68"/>
<polygon id="CORNERS-l3-o1" class="sticker" style="fill: #8800dd" points="144.839 248.374 131.256 290.176 87.302 290.176 87.303 229.68"/>
<polygon id="CORNERS-l1-o1" class="sticker" style="fill: #8800dd" points="51.743 180.736 87.302 154.901 122.862 180.736 87.303 229.68"/>
<polygon id="CORNERS-l5-o2" class="sticker" style="fill: #8800dd" points="29.766 248.374 16.184 206.571 51.743 180.736 87.303 229.68"/>
</g><g><title>BL</title>
<polygon id="CORNERS-l10-o0" class="sticker" style="fill: #ffff00" points="700.480 172.224 664.921 198.059 629.361 172.224 664.921 123.281"/>
<polygon id="CORNERS-l1-o2" class="sticker" style="fill: #ffff00" points="664.921 62.784 708.874 62.784 722.457 104.586 664.921 123.281"/>
<polygon id="CORNERS-l5-o1" class="sticker" style="fill: #ffff00" points="722.457 104.586 736.039 146.389 700.480 172.224 664.921 123.281"/>
<polygon id="CORNERS-l6-o1" class="sticker" style="fill: #ffff00" points="607.384 104.586 620.967 62.784 664.921 62.784 664.921 123.281"/>
<polygon id="CORNERS-l11-o2" class="sticker" style="fill: #ffff00" points="629.361 172.224 593.802 146.389 607.384 104.586 664.921 123.281"/>
</g><g><title>BR</title>
<polygon id="CORNERS-l13-o0" class="sticker" style="fill: #0000ff" points="545.874 172.224 510.315 198.059 474.755 172.224 510.315 123.281"/>
<polygon id="CORNERS-l6-o2" class="sticker" style="fill: #0000ff" points="510.315 62.784 554.269 62.784 567.851 104.586 510.315 123.281"/>
<polygon id="CORNERS-l11-o1" class="sticker" style="fill: #0000ff" points="567.851 104.586 581.433 146.389 545.874 172.224 510.315 123.281"/>
<polygon id="CORNERS-l7-o1" class="sticker" style="fill: #0000ff" points="452.779 104.586 466.361 62.784 510.315 62.784 510.315 123.281"/>
<polygon id="CORNERS-l12-o2" class="sticker" style="fill: #0000ff" points="474.755 172.224 439.196 146.389 452.779 104.586 510.315 123.281"/>
</g><g><title>R</title>
<polygon id="CORNERS-l12-o1" class="sticker" style="fill: #ff0000" points="373.019 180.736 408.579 206.571 394.996 248.374 337.461 229.68"/>
<polygon id="CORNERS-l2-o1" class="sticker" style="fill: #ff0000" points="279.924 248.374 266.341 206.571 301.901 180.736 337.461 229.68"/>
<polygon id="CORNERS-l7-o2" class="sticker" style="fill: #ff0000" points="301.901 180.736 337.460 154.901 373.019 180.736 337.461 229.68"/>
<polygon id="CORNERS-l19-o2" class="sticker" style="fill: #ff0000" points="337.460 290.176 293.506 290.176 279.924 248.374 337.461 229.68"/>
<polygon id="CORNERS-l14-o0" class="sticker" style="fill: #ff0000" points="394.996 248.374 381.414 290.176 337.460 290.176 337.461 229.68"/>
</g><g><title>FR</title>
<polygon id="CORNERS-l16-o1" class="sticker" style="fill: #ffffd0" points="347.220 395.413 333.638 437.215 289.684 437.215 289.685 376.719"/>
<polygon id="CORNERS-l19-o0" class="sticker" style="fill: #ffffd0" points="254.125 327.775 289.684 301.940 325.244 327.775 289.685 376.719"/>
<polygon id="CORNERS-l14-o2" class="sticker" style="fill: #ffffd0" points="325.244 327.775 360.803 353.610 347.220 395.413 289.685 376.719"/>
<polygon id="CORNERS-l8-o1" class="sticker" style="fill: #ffffd0" points="232.148 395.413 218.566 353.610 254.125 327.775 289.685 376.719"/>
<polygon id="CORNERS-l17-o2" class="sticker" style="fill: #ffffd0" points="289.684 437.215 245.730 437.215 232.148 395.413 289.685 376.719"/>
</g><g><title>FL</title>
<polygon id="CORNERS-l17-o1" class="sticker" style="fill: #3399ff" points="192.615 395.413 179.032 437.215 135.078 437.215 135.079 376.719"/>
<polygon id="CORNERS-l3-o0" class="sticker" style="fill: #3399ff" points="99.519 327.775 135.078 301.940 170.638 327.775 135.079 376.719"/>
<polygon id="CORNERS-l8-o2" class="sticker" style="fill: #3399ff" points="170.638 327.775 206.197 353.610 192.615 395.413 135.079 376.719"/>
<polygon id="CORNERS-l4-o1" class="sticker" style="fill: #3399ff" points="77.542 395.413 63.960 353.610 99.519 327.775 135.079 376.719"/>
<polygon id="CORNERS-l9-o2" class="sticker" style="fill: #3399ff" points="135.078 437.215 91.125 437.215 77.542 395.413 135.079 376.719"/>
</g><g><title>DL</title>
<polygon id="CORNERS-l18-o2" class="sticker" style="fill: #ff6633" points="677.137 319.263 641.578 293.428 655.160 251.625 712.697 270.32"/>
<polygon id="CORNERS-l4-o2" class="sticker" style="fill: #ff6633" points="770.233 251.625 783.815 293.428 748.256 319.263 712.697 270.32"/>
<polygon id="CORNERS-l9-o1" class="sticker" style="fill: #ff6633" points="748.256 319.263 712.697 345.098 677.137 319.263 712.697 270.32"/>
<polygon id="CORNERS-l5-o0" class="sticker" style="fill: #ff6633" points="712.697 209.823 756.650 209.823 770.233 251.625 712.697 270.32"/>
<polygon id="CORNERS-l10-o1" class="sticker" style="fill: #ff6633" points="655.160 251.625 668.743 209.823 712.697 209.823 712.697 270.32"/>
</g><g><title>B</title>
<polygon id="CORNERS-l15-o2" class="sticker" style="fill: #99ff00" points="587.618 290.176 543.664 290.176 530.081 248.374 587.618 229.68"/>
<polygon id="CORNERS-l10-o2" class="sticker" style="fill: #99ff00" points="623.177 180.736 658.736 206.571 645.154 248.374 587.618 229.68"/>
<polygon id="CORNERS-l18-o1" class="sticker" style="fill: #99ff00" points="645.154 248.374 631.572 290.176 587.618 290.176 587.618 229.68"/>
<polygon id="CORNERS-l11-o0" class="sticker" style="fill: #99ff00" points="552.058 180.736 587.618 154.901 623.177 180.736 587.618 229.68"/>
<polygon id="CORNERS-l13-o1" class="sticker" style="fill: #99ff00" points="530.081 248.374 516.499 206.571 552.058 180.736 587.618 229.68"/>
</g><g><title>DR</title>
<polygon id="CORNERS-l16-o2" class="sticker" style="fill: #ff66cc" points="498.098 319.263 462.539 345.098 426.980 319.263 462.539 270.32"/>
<polygon id="CORNERS-l13-o2" class="sticker" style="fill: #ff66cc" points="462.539 209.823 506.493 209.823 520.075 251.625 462.539 270.32"/>
<polygon id="CORNERS-l15-o1" class="sticker" style="fill: #ff66cc" points="520.075 251.625 533.658 293.428 498.098 319.263 462.539 270.32"/>
<polygon id="CORNERS-l12-o0" class="sticker" style="fill: #ff66cc" points="405.003 251.625 418.585 209.823 462.539 209.823 462.539 270.32"/>
<polygon id="CORNERS-l14-o1" class="sticker" style="fill: #ff66cc" points="426.980 319.263 391.420 293.428 405.003 251.625 462.539 270.32"/>
</g><g><title>D</title>
<polygon id="CORNERS-l18-o0" class="sticker" style="fill: #999999" points="587.618 300.698 631.572 300.698 645.154 342.500 587.618 361.195"/>
<polygon id="CORNERS-l16-o0" class="sticker" style="fill: #999999" points="552.058 410.138 516.499 384.303 530.081 342.500 587.618 361.195"/>
<polygon id="CORNERS-l15-o0" class="sticker" style="fill: #999999" points="530.081 342.500 543.664 300.698 587.618 300.698 587.618 361.195"/>
<polygon id="CORNERS-l17-o0" class="sticker" style="fill: #999999" points="623.177 410.138 587.618 435.974 552.058 410.138 587.618 361.195"/>
<polygon id="CORNERS-l9-o0" class="sticker" style="fill: #999999" points="645.154 342.500 658.736 384.303 623.177 410.138 587.618 361.195"/>
</g></svg>
`});var fr,Vg,Wg=S(()=>{fr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Vg={name:"2x2x2",orbits:[{orbitName:"SQUARES",numPieces:25,numOrientations:3}],defaultPattern:{SQUARES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],orientation:fr}},moves:{U:{SQUARES:{permutation:[1,2,3,4,0,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],orientationDelta:fr}},"2U":{SQUARES:{permutation:[0,1,2,3,4,6,7,8,9,5,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],orientationDelta:fr}},"3U":{SQUARES:{permutation:[0,1,2,3,4,5,6,7,8,9,11,12,13,14,10,15,16,17,18,19,20,21,22,23,24],orientationDelta:fr}},"4U":{SQUARES:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18,19,15,20,21,22,23,24],orientationDelta:fr}},"5U":{SQUARES:{permutation:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,20],orientationDelta:fr}},R:{SQUARES:{permutation:[0,1,2,3,9,5,6,7,8,14,10,11,12,13,19,15,16,17,18,24,20,21,22,23,4],orientationDelta:fr}},"2R":{SQUARES:{permutation:[0,1,2,8,4,5,6,7,13,9,10,11,12,18,14,15,16,17,23,19,20,21,22,3,24],orientationDelta:fr}},"3R":{SQUARES:{permutation:[0,1,7,3,4,5,6,12,8,9,10,11,17,13,14,15,16,22,18,19,20,21,2,23,24],orientationDelta:fr}},"4R":{SQUARES:{permutation:[0,6,2,3,4,5,11,7,8,9,10,16,12,13,14,15,21,17,18,19,20,1,22,23,24],orientationDelta:fr}},"5R":{SQUARES:{permutation:[5,1,2,3,4,10,6,7,8,9,15,11,12,13,14,20,16,17,18,19,0,21,22,23,24],orientationDelta:fr}}},derivedMoves:{L:"5R'","2L":"4R'","3L":"3R'","4L":"2R'","5L":"R'",D:"5U'","2D":"4U'","3D":"3U'","4D":"2U'","5D":"U'",E:"3D",M:"3L"}}});var Hg,Kg=S(()=>{Hg=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="600px" height="600px" viewBox="-50 -50 600 600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>3x3x3 LL</title>
  <defs>
    <g id="sticker">
        <rect x="0" y="0" width="100" height="100" stroke="black" stroke-width="0.5px" />
    </g>
  </defs>
  <g id="3x3x3-LL" stroke="none" stroke-width="4" style="none" stroke-linejoin="round">
    <use id="SQUARES-l0-o0" href="#sticker" transform="translate( 00, 00)" style="fill: #E23424"/>
    <use id="SQUARES-l1-o0" href="#sticker" transform="translate(100, 00)" style="fill: #AC2A3C"/>
    <use id="SQUARES-l2-o0" href="#sticker" transform="translate(200, 00)" style="fill: #762668"/>
    <use id="SQUARES-l3-o0" href="#sticker" transform="translate(300, 00)" style="fill: #412798"/>
    <use id="SQUARES-l4-o0" href="#sticker" transform="translate(400, 00)" style="fill: #152DC9"/>

    <use id="SQUARES-l5-o0" href="#sticker" transform="translate( 00,100)" style="fill: #E34F27"/>
    <use id="SQUARES-l6-o0" href="#sticker" transform="translate(100,100)" style="fill: #AD4D3E"/>
    <use id="SQUARES-l7-o0" href="#sticker" transform="translate(200,100)" style="fill: #794E6A"/>
    <use id="SQUARES-l8-o0" href="#sticker" transform="translate(300,100)" style="fill: #485399"/>
    <use id="SQUARES-l9-o0" href="#sticker" transform="translate(400,100)" style="fill: #2758CA"/>

    <use id="SQUARES-l10-o0" href="#sticker" transform="translate( 00,200)" style="fill: #E67A30"/>
    <use id="SQUARES-l11-o0" href="#sticker" transform="translate(100,200)" style="fill: #B17A44"/>
    <use id="SQUARES-l12-o0" href="#sticker" transform="translate(200,200)" style="fill: #7F7B6D"/>
    <use id="SQUARES-l13-o0" href="#sticker" transform="translate(300,200)" style="fill: #547F9B"/>
    <use id="SQUARES-l14-o0" href="#sticker" transform="translate(400,200)" style="fill: #3B83CB"/>

    <use id="SQUARES-l15-o0" href="#sticker" transform="translate( 00,300)" style="fill: #EAA93C"/>
    <use id="SQUARES-l16-o0" href="#sticker" transform="translate(100,300)" style="fill: #B8A94C"/>
    <use id="SQUARES-l17-o0" href="#sticker" transform="translate(200,300)" style="fill: #89AA72"/>
    <use id="SQUARES-l18-o0" href="#sticker" transform="translate(300,300)" style="fill: #63AB9E"/>
    <use id="SQUARES-l19-o0" href="#sticker" transform="translate(400,300)" style="fill: #50ADCD"/>

    <use id="SQUARES-l20-o0" href="#sticker" transform="translate( 00,400)" style="fill: #F1DA49"/>
    <use id="SQUARES-l21-o0" href="#sticker" transform="translate(100,400)" style="fill: #C1D957"/>
    <use id="SQUARES-l22-o0" href="#sticker" transform="translate(200,400)" style="fill: #95D878"/>
    <use id="SQUARES-l23-o0" href="#sticker" transform="translate(300,400)" style="fill: #74D7A2"/>
    <use id="SQUARES-l24-o0" href="#sticker" transform="translate(400,400)" style="fill: #64D8D0"/>
  </g>
</svg>`});var Xg,qg=S(()=>{Xg={name:"redi_cube",orbits:[{orbitName:"EDGES",numPieces:12,numOrientations:2},{orbitName:"CORNERS",numPieces:8,numOrientations:3}],defaultPattern:{EDGES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]}},moves:{F:{EDGES:{permutation:[8,0,2,3,4,5,6,7,1,9,10,11],orientationDelta:[0,1,0,0,0,0,0,0,1,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[1,0,0,0,0,0,0,0]}},x:{EDGES:{permutation:[4,8,0,9,6,10,2,11,5,7,1,3],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,3,5,7,6,2,1],orientationDelta:[2,1,2,1,1,2,1,2]}},y:{EDGES:{permutation:[1,2,3,0,5,6,7,4,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,7,4,5,6],orientationDelta:[0,0,0,0,0,0,0,0]}}},derivedMoves:{z:"[x: y]",UR:"[y: F]",U:"[y2: F]",UL:"[y': F]",D:"[x: F]",L:"[z2: F]",R:"[x2: F]",B:"[y2 x: F]"}}});var jg,Yg=S(()=>{jg=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="546px" height="418px" viewBox="-20 -20 546 418" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>redi-cube</title>
<g istroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <g transform="translate(1.000000, 1.000000)" fill-rule="nonzero" stroke="#000000" stroke-width="1.6">
    <g id="CORNERS-l0-o0" transform="translate(208.000000, 80.000000)" style="fill: #FFFFFF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l0-o1" transform="translate(256.000000, 128.000000)" style="fill: #FF0000;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l0-o2" transform="translate(208.000000, 128.000000)" style="fill: #32CD32;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l1-o0" transform="translate(208.000000, 0.000000)" style="fill: #FFFFFF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l1-o1" transform="translate(384.000000, 128.000000)" style="fill: #2266FF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l1-o2" transform="translate(336.000000, 128.000000)" style="fill: #FF0000;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l2-o0" transform="translate(128.000000, 0.000000)" style="fill: #FFFFFF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l2-o1" transform="translate(0.000000, 128.000000)" style="fill: #FFA500;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l2-o2" transform="translate(464.000000, 128.000000)" style="fill: #2266FF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l3-o0" transform="translate(128.000000, 80.000000)" style="fill: #FFFFFF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l3-o1" transform="translate(128.000000, 128.000000)" style="fill: #32CD32;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l3-o2" transform="translate(80.000000, 128.000000)" style="fill: #FFA500;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l4-o0" transform="translate(208.000000, 256.000000)" style="fill: #FFFF00;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l4-o1" transform="translate(208.000000, 208.000000)" style="fill: #32CD32;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l4-o2" transform="translate(256.000000, 208.000000)" style="fill: #FF0000;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l5-o0" transform="translate(128.000000, 256.000000)" style="fill: #FFFF00;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l5-o1" transform="translate(80.000000, 208.000000)" style="fill: #FFA500;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l5-o2" transform="translate(128.000000, 208.000000)" style="fill: #32CD32;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l6-o0" transform="translate(128.000000, 336.000000)" style="fill: #FFFF00;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l6-o1" transform="translate(464.000000, 208.000000)" style="fill: #2266FF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l6-o2" transform="translate(0.000000, 208.000000)" style="fill: #FFA500;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l7-o0" transform="translate(208.000000, 336.000000)" style="fill: #FFFF00;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l7-o1" transform="translate(336.000000, 208.000000)" style="fill: #FF0000;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="CORNERS-l7-o2" transform="translate(384.000000, 208.000000)" style="fill: #2266FF;">
      <rect id="Rectangle" x="0" y="0" width="40" height="40"></rect>
    </g>
    <g id="EDGES-l0-o0" transform="translate(168.000000, 60.000000)" style="fill: #FFFFFF;">
      <polygon id="Rectangle" points="0 20 20 -8.8817842e-16 40 20 40 60 0 60"></polygon>
    </g>
    <g id="EDGES-l0-o1" transform="translate(168.000000, 128.000000)" style="fill: #32CD32;">
      <polygon id="Rectangle" points="0 0 40 0 40 40 20 60 0 40"></polygon>
    </g>
    <g id="EDGES-l1-o0" transform="translate(188.000000, 40.000000)" style="fill: #FFFFFF;">
      <polygon id="Rectangle" points="20 0 60 0 60 40 20 40 0 20"></polygon>
    </g>
    <g id="EDGES-l1-o1" transform="translate(296.000000, 128.000000)" style="fill: #FF0000;">
      <polygon id="Rectangle" points="0 0 40 0 40 40 20 60 0 40"></polygon>
    </g>
    <g id="EDGES-l2-o0" transform="translate(168.000000, 0.000000)" style="fill: #FFFFFF;">
      <polygon id="Rectangle" points="0 0 40 0 40 40 20 60 0 40"></polygon>
    </g>
    <g id="EDGES-l2-o1" transform="translate(424.000000, 128.000000)" style="fill: #2266FF;">
      <polygon id="Rectangle" points="0 0 40 0 40 40 20 60 0 40"></polygon>
    </g>
    <g id="EDGES-l3-o0" transform="translate(128.000000, 40.000000)" style="fill: #FFFFFF;">
      <polygon id="Rectangle" points="0 0 40 0 60 20 40 40 0 40"></polygon>
    </g>
    <g id="EDGES-l3-o1" transform="translate(40.000000, 128.000000)" style="fill: #FFA500;">
      <polygon id="Rectangle" points="0 0 40 0 40 40 20 60 0 40"></polygon>
    </g>
    <g id="EDGES-l4-o0" transform="translate(168.000000, 256.000000)" style="fill: #FFFF00;">
      <polygon id="Rectangle" points="0 0 40 0 40 40 20 60 0 40"></polygon>
    </g>
    <g id="EDGES-l4-o1" transform="translate(168.000000, 188.000000)" style="fill: #32CD32;">
      <polygon id="Rectangle" points="0 20 20 0 40 20 40 60 0 60"></polygon>
    </g>
    <g id="EDGES-l5-o0" transform="translate(188.000000, 296.000000)" style="fill: #FFFF00;">
      <polygon id="Rectangle" points="20 0 60 0 60 40 20 40 0 20"></polygon>
    </g>
    <g id="EDGES-l5-o1" transform="translate(296.000000, 188.000000)" style="fill: #FF0000;">
      <polygon id="Rectangle" points="0 20 20 0 40 20 40 60 0 60"></polygon>
    </g>
    <g id="EDGES-l6-o0" transform="translate(168.000000, 316.000000)" style="fill: #FFFF00;">
      <polygon id="Rectangle" points="0 20 20 -5.32907052e-14 40 20 40 60 0 60"></polygon>
    </g>
    <g id="EDGES-l6-o1" transform="translate(424.000000, 188.000000)" style="fill: #2266FF;">
      <polygon id="Rectangle" points="0 20 20 -1.77635684e-15 40 20 40 60 0 60"></polygon>
    </g>
    <g id="EDGES-l7-o0" transform="translate(128.000000, 296.000000)" style="fill: #FFFF00;">
      <polygon id="Rectangle" points="0 0 40 0 60 20 40 40 0 40"></polygon>
    </g>
    <g id="EDGES-l7-o1" transform="translate(40.000000, 188.000000)" style="fill: #FFA500;">
      <polygon id="Rectangle" points="0 20 20 0 40 20 40 60 0 60"></polygon>
    </g>
    <g id="EDGES-l8-o0" transform="translate(188.000000, 168.000000)" style="fill: #32CD32;">
      <polygon id="Rectangle" points="20 0 60 0 60 40 20 40 2.66453526e-14 20"></polygon>
    </g>
    <g id="EDGES-l8-o1" transform="translate(256.000000, 168.000000)" style="fill: #FF0000;">
      <polygon id="Rectangle" points="0 0 40 0 60 20 40 40 0 40"></polygon>
    </g>
    <g id="EDGES-l9-o0" transform="translate(128.000000, 168.000000)" style="fill: #32CD32;">
      <polygon id="Rectangle" points="0 0 40 0 60 20 40 40 0 40"></polygon>
    </g>
    <g id="EDGES-l9-o1" transform="translate(60.000000, 168.000000)" style="fill: #FFA500;">
      <polygon id="Rectangle" points="20 0 60 0 60 40 20 40 0 20"></polygon>
    </g>
    <g id="EDGES-l10-o0" transform="translate(384.000000, 168.000000)" style="fill: #2266FF;">
      <polygon id="Rectangle" points="0 0 40 0 60 20 40 40 0 40"></polygon>
    </g>
    <g id="EDGES-l10-o1" transform="translate(316.000000, 168.000000)" style="fill: #FF0000;">
      <polygon id="Rectangle" points="20 0 60 0 60 40 20 40 5.32907052e-14 20"></polygon>
    </g>
    <g id="EDGES-l11-o0" transform="translate(444.000000, 168.000000)" style="fill: #2266FF;">
      <polygon id="Rectangle" points="20 0 60 0 60 40 20 40 -3.55271368e-15 20"></polygon>
    </g>
    <g id="EDGES-l11-o1" transform="translate(0.000000, 168.000000)" style="fill: #FFA500;">
      <polygon id="Rectangle" points="0 0 40 0 60 20 40 40 0 40"></polygon>
    </g>
  </g>
</g>
</svg>
`});var An={};vn(An,{babyFTOSVG:()=>Ig,ftoSVG:()=>Fg,kilominxSVG:()=>Bg,loopoverJSON:()=>Vg,loopoverSVG:()=>Hg,rediCubeJSON:()=>Xg,rediCubeSVG:()=>jg});var Dn=S(()=>{Og();Ug();Gg();Wg();Kg();qg();Yg()});var fd,Qg,Zg=S(()=>{lr();ei();ld();cd();fd=class extends Xt{constructor(){super({pgID:"skewb diamond",id:"baby_fto",fullName:"Baby FTO",inventedBy:["Uwe M\xE8ffert"],setOrientationModTo1ForPiecesOfOrbits:["CENTERS"]})}stickeringMask(e){return Sc(this,e)}svg=He(async()=>(await Promise.resolve().then(()=>(Dn(),An))).babyFTOSVG);keyMapping=async()=>vc},Qg=new fd});var $g,Jg=S(()=>{Xi();ei();$g={id:"clock",fullName:"Clock",inventedBy:["Christopher C. Wiggs","Christopher J. Taylor"],inventionYear:1988,kpuzzle:He(async()=>new It((await Promise.resolve().then(()=>(Oi(),Ii))).clockJSON)),svg:He(async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).clockSVG)}});var ud,e1,t1=S(()=>{lr();ei();ld();cd();ud=class extends Xt{constructor(){super({pgID:"FTO",id:"fto",fullName:"Face-Turning Octahedron",inventedBy:["Karl Rohrbach","David Pitcher"],inventionYear:1983})}stickeringMask(e){return Sc(this,e)}stickerings=Ng;svg=He(async()=>(await Promise.resolve().then(()=>(Dn(),An))).ftoSVG);keyMapping=async()=>vc;algTransformData={"\u2194 Mirror (x)":{replaceMovesByFamily:{L:"R",R:"L",l:"r",r:"l",Lw:"Rw",Rw:"Lw",Lv:"Rv",Rv:"Lv",BL:"BR",BR:"BL",bl:"br",br:"bl",BLw:"BRw",BRw:"BLw",BLv:"BRv",BRv:"BLv"},invertExceptByFamily:new Set(["x"])}}},e1=new ud});var i1,r1,n1=S(()=>{ei();Zp();i1="d f 0.56",r1={id:"kilominx",fullName:"Kilominx",kpuzzle:He(()=>Yp(i1,{includeCenterOrbits:!1,includeEdgeOrbits:!1})),pg:()=>Fo(i1,{includeCenterOrbits:!1,includeEdgeOrbits:!1}),svg:He(async()=>(await Promise.resolve().then(()=>(Dn(),An))).kilominxSVG)}});var o1,s1=S(()=>{Xi();ei();o1={id:"loopover",fullName:"Loopover",inventedBy:["Cary Huang"],inventionYear:2018,kpuzzle:He(async()=>new It((await Promise.resolve().then(()=>(Dn(),An))).loopoverJSON)),svg:async()=>(await Promise.resolve().then(()=>(Dn(),An))).loopoverSVG}});async function a1(r,e){return(await pd()).includes(e)?Jr(r,e):(console.warn(`Unsupported stickering for ${r.id}: ${e}. Setting all pieces to dim.`),Jr(r,"full"))}function pd(){return T4}var T4,l1=S(()=>{Po();ba();T4=new Tr(()=>wn("megaminx"))});var c1,f1=S(()=>{ot();c1={KeyI:new T("R"),KeyK:new T("R'"),KeyW:new T("B"),KeyO:new T("B'"),KeyS:new T("FR"),KeyL:new T("FR'"),KeyD:new T("L"),KeyE:new T("L'"),KeyJ:new T("U"),KeyF:new T("U'"),KeyH:new T("F"),KeyG:new T("F'"),KeyC:new T("Lw"),KeyR:new T("Lw'"),KeyU:new T("Rw"),KeyM:new T("Rw'"),KeyX:new T("d"),Comma:new T("d'"),KeyT:new T("Rv"),KeyY:new T("Rv"),KeyV:new T("Rv'"),KeyN:new T("Rv'"),Semicolon:new T("y"),KeyA:new T("y'"),KeyP:new T("z"),KeyQ:new T("z'"),KeyZ:new T("2L'"),KeyB:new T("2R"),Period:new T("2R'"),Backquote:new At}});var A4,u1=S(()=>{A4=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="360px" height="343px" viewBox="0 0 360 343" version="1.1">
  <title>Megaminx LL</title>
  <defs>
    <g id="bogus">
        <rect x="-10" y="-10" width="1" height="1" stroke="black" stroke-width="0.04px" />
    </g>
  </defs>
  <g fill="none" fill-rule="nonzero" stroke="#000">
    <g style="stroke: black; stroke-width: 6; stroke-linecap: butt; stroke-linejoin: round;">
      <path id="CENTERS-l0-o0" style="fill: white;" d="M 179.5 143.480469 L 137.082031 174.296875 L 153.285156 224.164062 L 205.714844 224.164062 L 221.917969 174.296875 Z M 179.5 143.480469 "/>  />

      <path id="CORNERS-l6-o0" style="fill: white;" d="M 140.175781 92.605469 L 179.5 143.480469 L 218.824219 92.605469 L 179.5 64.035156 Z M 140.175781 92.605469 "/>  />
      <path id="CORNERS-l6-o1" style="fill: yellow;" d="M 125.15625 46.378906 L 140.175781 92.605469 L 179.5 64.035156 L 179.5 6.894531 Z M 125.15625 46.378906 "/> />
      <path id="CORNERS-l6-o2" style="fill: rgb(34, 102, 255);" d="M 179.5 64.035156 L 218.824219 92.605469 L 233.84375 46.378906 L 179.5 6.894531 Z M 179.5 64.035156 "/>  />

      <path id="EDGES-l26-o0" style="fill: white;" d="M 100.851562 121.175781 L 137.082031 174.296875 L 179.5 143.480469 L 140.175781 92.605469 Z M 100.851562 121.175781 "/> />
      <path id="EDGES-l26-o1" style="fill: yellow;" d="M 61.527344 92.605469 L 100.851562 121.175781 L 140.175781 92.605469 L 125.15625 46.378906 Z M 61.527344 92.605469 "/> />

      <path id="CORNERS-l1-o0" style="fill: white;" d="M 76.546875 195.976562 L 137.082031 174.296875 L 100.851562 121.175781 L 61.527344 149.75 Z M 76.546875 195.976562 "/> />
      <path id="CORNERS-l1-o1" style="fill: purple;" d="M 27.9375 195.976562 L 76.546875 195.976562 L 61.527344 149.75 L 7.179688 132.089844 Z M 27.9375 195.976562 "/>  />
      <path id="CORNERS-l1-o2" style="fill: yellow;" d="M 61.527344 149.75 L 100.851562 121.175781 L 61.527344 92.605469 L 7.179688 132.089844 Z M 61.527344 149.75 "/> />

      <path id="EDGES-l1-o0" style="fill: white;" d="M 91.566406 242.207031 L 153.285156 224.164062 L 137.082031 174.296875 L 76.546875 195.976562 Z M 91.566406 242.207031 "/> />
      <path id="EDGES-l1-o1" style="fill: purple;" d="M 52.242188 270.777344 L 91.566406 242.207031 L 76.546875 195.976562 L 27.9375 195.976562 Z M 52.242188 270.777344 "/> />

      <path id="CORNERS-l0-o0" style="fill: white;" d="M 155.195312 288.4375 L 153.285156 224.164062 L 91.566406 242.207031 L 106.585938 288.4375 Z M 155.195312 288.4375 "/> />
      <path id="CORNERS-l0-o1" style="fill: limegreen;" d="M 140.175781 334.664062 L 155.195312 288.4375 L 106.585938 288.4375 L 73 334.664062 Z M 140.175781 334.664062 "/>  />
      <path id="CORNERS-l0-o2" style="fill: purple;" d="M 106.585938 288.4375 L 91.566406 242.207031 L 52.242188 270.777344 L 73 334.664062 Z M 106.585938 288.4375 "/>  />

      <path id="EDGES-l0-o0" style="fill: white;" d="M 203.804688 288.4375 L 205.714844 224.164062 L 153.285156 224.164062 L 155.195312 288.4375 Z M 203.804688 288.4375 "/>  />
      <path id="EDGES-l0-o1" style="fill: limegreen;" d="M 218.824219 334.664062 L 203.804688 288.4375 L 155.195312 288.4375 L 140.175781 334.664062 Z M 218.824219 334.664062 "/>  />

      <path id="CORNERS-l2-o0" style="fill: white;" d="M 267.433594 242.207031 L 205.714844 224.164062 L 203.804688 288.4375 L 252.414062 288.4375 Z M 267.433594 242.207031 "/>  />
      <path id="CORNERS-l2-o1" style="fill: red;" d="M 306.757812 270.777344 L 267.433594 242.207031 L 252.414062 288.4375 L 286 334.664062 Z M 306.757812 270.777344 "/> />
      <path id="CORNERS-l2-o2" style="fill: limegreen;" d="M 252.414062 288.4375 L 203.804688 288.4375 L 218.824219 334.664062 L 286 334.664062 Z M 252.414062 288.4375 "/> />

      <path id="EDGES-l7-o0" style="fill: white;" d="M 282.453125 195.976562 L 221.917969 174.296875 L 205.714844 224.164062 L 267.433594 242.207031 Z M 282.453125 195.976562 "/>  />
      <path id="EDGES-l7-o1" style="fill: red;" d="M 331.0625 195.976562 L 282.453125 195.976562 L 267.433594 242.207031 L 306.757812 270.777344 Z M 331.0625 195.976562 "/>  />

      <path id="CORNERS-l7-o0" style="fill: white;" d="M 258.148438 121.175781 L 221.917969 174.296875 L 282.453125 195.976562 L 297.472656 149.75 Z M 258.148438 121.175781 "/>  />
      <path id="CORNERS-l7-o1" style="fill: rgb(34, 102, 255);" d="M 297.472656 92.605469 L 258.148438 121.175781 L 297.472656 149.75 L 351.820312 132.089844 Z M 297.472656 92.605469 "/>  />
      <path id="CORNERS-l7-o2" style="fill: red;" d="M 297.472656 149.75 L 282.453125 195.976562 L 331.0625 195.976562 L 351.820312 132.089844 Z M 297.472656 149.75 "/>  />

      <path id="EDGES-l6-o0" style="fill: white;" d="M 218.824219 92.605469 L 179.5 143.480469 L 221.917969 174.296875 L 258.148438 121.175781 Z M 218.824219 92.605469 "/> />
      <path id="EDGES-l6-o1" style="fill: rgb(34, 102, 255);" d="M 233.84375 46.378906 L 218.824219 92.605469 L 258.148438 121.175781 L 297.472656 92.605469 Z M 233.84375 46.378906 "/>  />
    </g>
    <g opacity="0">
      <g><title>U</title>
      <polygon id="CENTERS-l0-o1" href="#bogus" style="fill: white"/>
      <polygon id="CENTERS-l0-o2" href="#bogus" style="fill: white"/>
      <polygon id="CENTERS-l0-o3" href="#bogus" style="fill: white"/>
      <polygon id="CENTERS-l0-o4" href="#bogus" style="fill: white"/>
      </g><g><title>F</title>
      <polygon id="EDGES-l8-o0" href="#bogus" style="fill: limegreen"/>
      <polygon id="EDGES-l2-o0" href="#bogus" style="fill: limegreen"/>
      <polygon id="CENTERS-l2-o0" href="#bogus" style="fill: limegreen"/>
      <polygon id="CENTERS-l2-o1" href="#bogus" style="fill: limegreen"/>
      <polygon id="CENTERS-l2-o2" href="#bogus" style="fill: limegreen"/>
      <polygon id="CENTERS-l2-o3" href="#bogus" style="fill: limegreen"/>
      <polygon id="CENTERS-l2-o4" href="#bogus" style="fill: limegreen"/>
      <polygon id="EDGES-l27-o1" href="#bogus" style="fill: limegreen"/>
      <polygon id="CORNERS-l19-o1" href="#bogus" style="fill: limegreen"/>
      <polygon id="CORNERS-l8-o0" href="#bogus" style="fill: limegreen"/>
      <polygon id="EDGES-l3-o0" href="#bogus" style="fill: limegreen"/>
      <polygon id="CORNERS-l3-o2" href="#bogus" style="fill: limegreen"/>
      </g><g><title>L</title>
      <polygon id="EDGES-l5-o1" href="#bogus" style="fill: #660099"/>
      <polygon id="EDGES-l8-o1" href="#bogus" style="fill: #660099"/>
      <polygon id="CENTERS-l3-o0" href="#bogus" style="fill: #660099"/>
      <polygon id="CENTERS-l3-o1" href="#bogus" style="fill: #660099"/>
      <polygon id="CENTERS-l3-o2" href="#bogus" style="fill: #660099"/>
      <polygon id="CENTERS-l3-o3" href="#bogus" style="fill: #660099"/>
      <polygon id="CENTERS-l3-o4" href="#bogus" style="fill: #660099"/>
      <polygon id="EDGES-l4-o1" href="#bogus" style="fill: #660099"/>
      <polygon id="CORNERS-l3-o1" href="#bogus" style="fill: #660099"/>
      <polygon id="CORNERS-l4-o0" href="#bogus" style="fill: #660099"/>
      <polygon id="EDGES-l10-o1" href="#bogus" style="fill: #660099"/>
      <polygon id="CORNERS-l5-o2" href="#bogus" style="fill: #660099"/>
      </g><g><title>BL</title>
      <polygon id="EDGES-l14-o1" href="#bogus" style="fill: yellow"/>
      <polygon id="EDGES-l5-o0" href="#bogus" style="fill: yellow"/>
      <polygon id="CENTERS-l4-o0" href="#bogus" style="fill: yellow"/>
      <polygon id="CENTERS-l4-o1" href="#bogus" style="fill: yellow"/>
      <polygon id="CENTERS-l4-o2" href="#bogus" style="fill: yellow"/>
      <polygon id="CENTERS-l4-o3" href="#bogus" style="fill: yellow"/>
      <polygon id="CENTERS-l4-o4" href="#bogus" style="fill: yellow"/>
      <polygon id="EDGES-l12-o1" href="#bogus" style="fill: yellow"/>
      <polygon id="CORNERS-l5-o1" href="#bogus" style="fill: yellow"/>
      <polygon id="CORNERS-l10-o0" href="#bogus" style="fill: yellow"/>
      <polygon id="EDGES-l16-o0" href="#bogus" style="fill: yellow"/>
      <polygon id="CORNERS-l11-o2" href="#bogus" style="fill: yellow"/>
      </g><g><title>BR</title>
      <polygon id="EDGES-l21-o0" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="EDGES-l14-o0" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CENTERS-l5-o0" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CENTERS-l5-o1" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CENTERS-l5-o2" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CENTERS-l5-o3" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CENTERS-l5-o4" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="EDGES-l18-o1" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CORNERS-l11-o1" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CORNERS-l13-o0" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="EDGES-l28-o1" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      <polygon id="CORNERS-l12-o2" href="#bogus" style="fill: rgb(34, 102, 255)"/>
      </g><g><title>R</title>
      <polygon id="CORNERS-l19-o2" href="#bogus" style="fill: red"/>
      <polygon id="EDGES-l19-o1" href="#bogus" style="fill: red"/>
      <polygon id="CENTERS-l1-o0" href="#bogus" style="fill: red"/>
      <polygon id="CENTERS-l1-o1" href="#bogus" style="fill: red"/>
      <polygon id="CENTERS-l1-o2" href="#bogus" style="fill: red"/>
      <polygon id="CENTERS-l1-o3" href="#bogus" style="fill: red"/>
      <polygon id="CENTERS-l1-o4" href="#bogus" style="fill: red"/>
      <polygon id="EDGES-l2-o1" href="#bogus" style="fill: red"/>
      <polygon id="EDGES-l21-o1" href="#bogus" style="fill: red"/>
      <polygon id="CORNERS-l12-o1" href="#bogus" style="fill: red"/>
      <polygon id="EDGES-l15-o1" href="#bogus" style="fill: red"/>
      <polygon id="CORNERS-l14-o0" href="#bogus" style="fill: red"/>
      </g><g><title>C</title>
      <polygon id="CORNERS-l8-o1" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="EDGES-l9-o1" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CORNERS-l19-o0" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="EDGES-l19-o0" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CENTERS-l6-o0" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CENTERS-l6-o1" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CENTERS-l6-o2" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CENTERS-l6-o3" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CENTERS-l6-o4" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="EDGES-l27-o0" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="EDGES-l29-o1" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CORNERS-l14-o2" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CORNERS-l16-o1" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="EDGES-l22-o0" href="#bogus" style="fill: #ffffd0"/>
      <polygon id="CORNERS-l17-o2" href="#bogus" style="fill: #ffffd0"/>
      </g><g><title>A</title>
      <polygon id="CORNERS-l4-o1" href="#bogus" style="fill: #3399ff"/>
      <polygon id="EDGES-l13-o1" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CORNERS-l3-o0" href="#bogus" style="fill: #3399ff"/>
      <polygon id="EDGES-l3-o1" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CENTERS-l7-o0" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CENTERS-l7-o1" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CENTERS-l7-o2" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CENTERS-l7-o3" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CENTERS-l7-o4" href="#bogus" style="fill: #3399ff"/>
      <polygon id="EDGES-l4-o0" href="#bogus" style="fill: #3399ff"/>
      <polygon id="EDGES-l9-o0" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CORNERS-l8-o2" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CORNERS-l17-o1" href="#bogus" style="fill: #3399ff"/>
      <polygon id="EDGES-l11-o0" href="#bogus" style="fill: #3399ff"/>
      <polygon id="CORNERS-l9-o2" href="#bogus" style="fill: #3399ff"/>
      </g><g><title>I</title>
      <polygon id="CORNERS-l5-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="EDGES-l12-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CORNERS-l4-o2" href="#bogus" style="fill: #ff6633"/>
      <polygon id="EDGES-l13-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CENTERS-l8-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CENTERS-l8-o1" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CENTERS-l8-o2" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CENTERS-l8-o3" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CENTERS-l8-o4" href="#bogus" style="fill: #ff6633"/>
      <polygon id="EDGES-l10-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="EDGES-l23-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CORNERS-l9-o1" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CORNERS-l18-o2" href="#bogus" style="fill: #ff6633"/>
      <polygon id="EDGES-l17-o0" href="#bogus" style="fill: #ff6633"/>
      <polygon id="CORNERS-l10-o1" href="#bogus" style="fill: #ff6633"/>
      </g><g><title>BF</title>
      <polygon id="CORNERS-l11-o0" href="#bogus" style="fill: #99ff00"/>
      <polygon id="EDGES-l18-o0" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CORNERS-l10-o2" href="#bogus" style="fill: #99ff00"/>
      <polygon id="EDGES-l17-o1" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CENTERS-l10-o0" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CENTERS-l10-o1" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CENTERS-l10-o2" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CENTERS-l10-o3" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CENTERS-l10-o4" href="#bogus" style="fill: #99ff00"/>
      <polygon id="EDGES-l16-o1" href="#bogus" style="fill: #99ff00"/>
      <polygon id="EDGES-l20-o0" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CORNERS-l18-o1" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CORNERS-l15-o2" href="#bogus" style="fill: #99ff00"/>
      <polygon id="EDGES-l24-o1" href="#bogus" style="fill: #99ff00"/>
      <polygon id="CORNERS-l13-o1" href="#bogus" style="fill: #99ff00"/>
      </g><g><title>E</title>
      <polygon id="CORNERS-l12-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="EDGES-l15-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CORNERS-l13-o2" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="EDGES-l24-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CENTERS-l9-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CENTERS-l9-o1" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CENTERS-l9-o2" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CENTERS-l9-o3" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CENTERS-l9-o4" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="EDGES-l28-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="EDGES-l25-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CORNERS-l15-o1" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CORNERS-l16-o2" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="EDGES-l29-o0" href="#bogus" style="fill: #ff66cc"/>
      <polygon id="CORNERS-l14-o1" href="#bogus" style="fill: #ff66cc"/>
      </g><g><title>D</title>
      <polygon id="CORNERS-l17-o0" href="#bogus" style="fill: #999999"/>
      <polygon id="EDGES-l11-o1" href="#bogus" style="fill: #999999"/>
      <polygon id="CORNERS-l16-o0" href="#bogus" style="fill: #999999"/>
      <polygon id="EDGES-l25-o1" href="#bogus" style="fill: #999999"/>
      <polygon id="CENTERS-l11-o0" href="#bogus" style="fill: #999999"/>
      <polygon id="CENTERS-l11-o1" href="#bogus" style="fill: #999999"/>
      <polygon id="CENTERS-l11-o2" href="#bogus" style="fill: #999999"/>
      <polygon id="CENTERS-l11-o3" href="#bogus" style="fill: #999999"/>
      <polygon id="CENTERS-l11-o4" href="#bogus" style="fill: #999999"/>
      <polygon id="EDGES-l22-o1" href="#bogus" style="fill: #999999"/>
      <polygon id="EDGES-l20-o1" href="#bogus" style="fill: #999999"/>
      <polygon id="CORNERS-l15-o0" href="#bogus" style="fill: #999999"/>
      <polygon id="CORNERS-l18-o0" href="#bogus" style="fill: #999999"/>
      <polygon id="EDGES-l23-o1" href="#bogus" style="fill: #999999"/>
      <polygon id="CORNERS-l9-o0" href="#bogus" style="fill: #999999"/>
      </g>
    </g>
  </g>
</svg>
`});var p1={};vn(p1,{megaminxLLSVG:()=>A4});var d1=S(()=>{u1()});var dd,h1,m1=S(()=>{lr();ei();l1();f1();dd=class extends Xt{constructor(){super({id:"megaminx",fullName:"Megaminx",inventionYear:1981})}stickeringMask(e){return a1(this,e)}stickerings=pd;llSVG=He(async()=>(await Promise.resolve().then(()=>(d1(),p1))).megaminxLLSVG);keyMapping=async()=>c1},h1=new dd});var g1,y1=S(()=>{Xi();ei();g1={id:"melindas2x2x2x2",fullName:"Melinda's 2\xD72\xD72\xD72",inventedBy:["Melinda Green"],kpuzzle:He(async()=>new It((await Promise.resolve().then(()=>(Oi(),Ii))).melindas2x2x2x2OrbitJSON)),svg:He(async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).melindas2x2x2x2OrbitSVG)}});var hd,x1,S1=S(()=>{lr();ei();hd=class extends Xt{constructor(){super({id:"pyraminx",fullName:"Pyraminx",inventedBy:["Uwe Meffert"]})}svg=He(async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).pyraminxSVG);algTransformData={"\u2194 Mirror (x)":{replaceMovesByFamily:{L:"R",R:"L",l:"r",r:"l",Lw:"Rw",Rw:"Lw",Lv:"Rv",Rv:"Lv"},invertExceptByFamily:new Set([])}}},x1=new hd});var v1,E1=S(()=>{Xi();ei();v1={id:"redi_cube",fullName:"Redi Cube",inventedBy:["Oskar van Deventer"],inventionYear:2009,kpuzzle:He(async()=>new It((await Promise.resolve().then(()=>(Dn(),An))).rediCubeJSON)),svg:async()=>(await Promise.resolve().then(()=>(Dn(),An))).rediCubeSVG}});var M1,b1=S(()=>{Xi();ei();M1={id:"square1",fullName:"Square-1",inventedBy:["Karel Hr\u0161el","Vojtech Kopsk\xFD"],inventionYear:1990,kpuzzle:He(async()=>new It((await Promise.resolve().then(()=>(Oi(),Ii))).sq1HyperOrbitJSON)),svg:He(async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).sq1HyperOrbitSVG)}});var _1,w1=S(()=>{Xi();ei();_1={id:"tri_quad",fullName:"TriQuad",inventedBy:["Bram Cohen","Carl Hoff"],inventionYear:2018,kpuzzle:He(async()=>new It((await Promise.resolve().then(()=>(Oi(),Ii))).triQuadJSON)),svg:He(async()=>(await Promise.resolve().then(()=>(Oi(),Ii))).triQuadSVG)}});var md,Ec=S(()=>{Om();lr();Dg();yc();zg();kg();Zg();Jg();t1();n1();s1();m1();y1();S1();E1();b1();w1();md={"3x3x3":Rn,"2x2x2":sd,"4x4x4":Wo,"5x5x5":Ta,"6x6x6":new Cr({id:"6x6x6",fullName:"6\xD76\xD76 Cube"}),"7x7x7":new Cr({id:"7x7x7",fullName:"7\xD77\xD77 Cube"}),"40x40x40":new Cr({id:"40x40x40",fullName:"40\xD740\xD740 Cube"}),clock:$g,megaminx:h1,pyraminx:x1,skewb:new Xt({id:"skewb",fullName:"Skewb",inventedBy:["Tony Durham"]}),square1:M1,fto:e1,gigaminx:new Xt({id:"gigaminx",fullName:"Gigaminx",inventedBy:["Tyler Fox"],inventionYear:2006}),master_tetraminx:new Xt({pgID:"master tetraminx",id:"master_tetraminx",fullName:"Master Tetraminx",inventedBy:["Katsuhiko Okamoto"],inventionYear:2002}),kilominx:r1,redi_cube:v1,melindas2x2x2x2:g1,loopover:o1,tri_quad:_1,baby_fto:Qg}});var R1,gd,T1,Mc,A1,ur,qt,dt,si,Yi,en,yd,xd,Sd,D1,tn,C1,L1,P1,z1,k1,N1,I1,O1,Aa,Da,F1,U1,B1,G1,V1,W1,H1,K1,X1,bc,_c,wc,Cn,Rc,Tc,Ac,Dc,Cc,q1,j1,Qi,Y1,Q1,Z1,$1,J1,ey,ty,vd,pr,Lr,Ca,La,Ln,Pa,dr,za,ui,iy,ka,xi,Lc,hr,pi,Pc,zc,rn,Ho,Fi,Si,Pr,Ko,Xo,mr,kc,Nc,Ic,ri,Oc,Fc,zr,kr,Uc,qo,Bc,jo,Yo,Qo,Zo,$o,Jo,Na,Ia,Oa,Fa,Ua,Ba,Ga,Va,Wa,Ha,Ka,Xa,qa,ja,Ya,Qa,Za,$a,Ja,el,tl,es,il,rl,Gc,nl,ol,sl,ry,ny,oy,sy,Zi,vi,gr,so,at,ao,Ed,ay,ly,cy,Vc,fy,uy,py,dy,Md,bd,Ci,lo,it=S(()=>{R1=0,gd=1,T1=2,Mc=1,A1=2,ur=3,qt=0,dt=1,si=2,Yi=0,en=1,yd=2,xd=3,Sd=4,D1=5,tn=100,C1=101,L1=102,P1=103,z1=104,k1=200,N1=201,I1=202,O1=203,Aa=204,Da=205,F1=206,U1=207,B1=208,G1=209,V1=210,W1=211,H1=212,K1=213,X1=214,bc=0,_c=1,wc=2,Cn=3,Rc=4,Tc=5,Ac=6,Dc=7,Cc=0,q1=1,j1=2,Qi=0,Y1=1,Q1=2,Z1=3,$1=4,J1=5,ey=6,ty=7,vd=300,pr=301,Lr=302,Ca=303,La=304,Ln=306,Pa=1e3,dr=1001,za=1002,ui=1003,iy=1004,ka=1005,xi=1006,Lc=1007,hr=1008,pi=1009,Pc=1010,zc=1011,rn=1012,Ho=1013,Fi=1014,Si=1015,Pr=1016,Ko=1017,Xo=1018,mr=1020,kc=35902,Nc=1021,Ic=1022,ri=1023,Oc=1024,Fc=1025,zr=1026,kr=1027,Uc=1028,qo=1029,Bc=1030,jo=1031,Yo=1033,Qo=33776,Zo=33777,$o=33778,Jo=33779,Na=35840,Ia=35841,Oa=35842,Fa=35843,Ua=36196,Ba=37492,Ga=37496,Va=37808,Wa=37809,Ha=37810,Ka=37811,Xa=37812,qa=37813,ja=37814,Ya=37815,Qa=37816,Za=37817,$a=37818,Ja=37819,el=37820,tl=37821,es=36492,il=36494,rl=36495,Gc=36283,nl=36284,ol=36285,sl=36286,ry=3200,ny=3201,oy=0,sy=1,Zi="",vi="srgb",gr="srgb-linear",so="linear",at="srgb",ao=7680,Ed=519,ay=512,ly=513,cy=514,Vc=515,fy=516,uy=517,py=518,dy=519,Md=35044,bd="300 es",Ci=2e3,lo=2001});function Nr(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(di[r&255]+di[r>>8&255]+di[r>>16&255]+di[r>>24&255]+"-"+di[e&255]+di[e>>8&255]+"-"+di[e>>16&15|64]+di[e>>24&255]+"-"+di[t&63|128]+di[t>>8&255]+"-"+di[t>>16&255]+di[t>>24&255]+di[i&255]+di[i>>8&255]+di[i>>16&255]+di[i>>24&255]).toLowerCase()}function Ft(r,e,t){return Math.max(e,Math.min(t,r))}function hy(r,e){return(r%e+e)%e}function Hc(r,e,t){return(1-t)*r+t*e}function ts(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ei(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var di,Wc,al,Mi=S(()=>{di=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wc=Math.PI/180,al=180/Math.PI});var $i,ll=S(()=>{Mi();$i=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,o,s,a){let l=i[n+0],c=i[n+1],f=i[n+2],u=i[n+3],p=o[s+0],d=o[s+1],m=o[s+2],y=o[s+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=f,e[t+3]=u;return}if(a===1){e[t+0]=p,e[t+1]=d,e[t+2]=m,e[t+3]=y;return}if(u!==y||l!==p||c!==d||f!==m){let g=1-a,h=l*p+c*d+f*m+u*y,w=h>=0?1:-1,b=1-h*h;if(b>Number.EPSILON){let P=Math.sqrt(b),D=Math.atan2(P,h*w);g=Math.sin(g*D)/P,a=Math.sin(a*D)/P}let v=a*w;if(l=l*g+p*v,c=c*g+d*v,f=f*g+m*v,u=u*g+y*v,g===1-a){let P=1/Math.sqrt(l*l+c*c+f*f+u*u);l*=P,c*=P,f*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,o,s){let a=i[n],l=i[n+1],c=i[n+2],f=i[n+3],u=o[s],p=o[s+1],d=o[s+2],m=o[s+3];return e[t]=a*m+f*u+l*d-c*p,e[t+1]=l*m+f*p+c*u-a*d,e[t+2]=c*m+f*d+a*p-l*u,e[t+3]=f*m-a*u-l*p-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,n=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(i/2),f=a(n/2),u=a(o/2),p=l(i/2),d=l(n/2),m=l(o/2);switch(s){case"XYZ":this._x=p*f*u+c*d*m,this._y=c*d*u-p*f*m,this._z=c*f*m+p*d*u,this._w=c*f*u-p*d*m;break;case"YXZ":this._x=p*f*u+c*d*m,this._y=c*d*u-p*f*m,this._z=c*f*m-p*d*u,this._w=c*f*u+p*d*m;break;case"ZXY":this._x=p*f*u-c*d*m,this._y=c*d*u+p*f*m,this._z=c*f*m+p*d*u,this._w=c*f*u-p*d*m;break;case"ZYX":this._x=p*f*u-c*d*m,this._y=c*d*u+p*f*m,this._z=c*f*m-p*d*u,this._w=c*f*u+p*d*m;break;case"YZX":this._x=p*f*u+c*d*m,this._y=c*d*u+p*f*m,this._z=c*f*m-p*d*u,this._w=c*f*u-p*d*m;break;case"XZY":this._x=p*f*u-c*d*m,this._y=c*d*u-p*f*m,this._z=c*f*m+p*d*u,this._w=c*f*u+p*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],o=t[8],s=t[1],a=t[5],l=t[9],c=t[2],f=t[6],u=t[10],p=i+a+u;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(f-l)*d,this._y=(o-c)*d,this._z=(s-n)*d}else if(i>a&&i>u){let d=2*Math.sqrt(1+i-a-u);this._w=(f-l)/d,this._x=.25*d,this._y=(n+s)/d,this._z=(o+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-i-u);this._w=(o-c)/d,this._x=(n+s)/d,this._y=.25*d,this._z=(l+f)/d}else{let d=2*Math.sqrt(1+u-i-a);this._w=(s-n)/d,this._x=(o+c)/d,this._y=(l+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,o=e._z,s=e._w,a=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+s*a+n*c-o*l,this._y=n*f+s*l+o*a-i*c,this._z=o*f+s*c+i*l-n*a,this._w=s*f-i*a-n*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,n=this._y,o=this._z,s=this._w,a=s*e._w+i*e._x+n*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=n,this._z=o,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-t;return this._w=d*s+t*this._w,this._x=d*i+t*this._x,this._y=d*n+t*this._y,this._z=d*o+t*this._z,this.normalize(),this}let c=Math.sqrt(l),f=Math.atan2(c,a),u=Math.sin((1-t)*f)/c,p=Math.sin(t*f)/c;return this._w=s*u+this._w*p,this._x=i*u+this._x*p,this._y=n*u+this._y*p,this._z=o*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}});var I,_d,my,Dt=S(()=>{Mi();ll();I=class r{constructor(e=0,t=0,i=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(my.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(my.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*n,this.y=o[1]*t+o[4]*i+o[7]*n,this.z=o[2]*t+o[5]*i+o[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,o=e.elements,s=1/(o[3]*t+o[7]*i+o[11]*n+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*n+o[12])*s,this.y=(o[1]*t+o[5]*i+o[9]*n+o[13])*s,this.z=(o[2]*t+o[6]*i+o[10]*n+o[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*n-a*i),f=2*(a*t-o*n),u=2*(o*i-s*t);return this.x=t+l*c+s*u-a*f,this.y=i+l*f+a*c-o*u,this.z=n+l*u+o*f-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n,this.y=o[1]*t+o[5]*i+o[9]*n,this.z=o[2]*t+o[6]*i+o[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,o=e.z,s=t.x,a=t.y,l=t.z;return this.x=n*l-o*a,this.y=o*s-i*l,this.z=i*a-n*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _d.copy(this).projectOnVector(e),this.sub(_d)}reflect(e){return this.sub(_d.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_d=new I,my=new $i});var Ve,bi=S(()=>{Mi();Ve=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*n+e.x,this.y=o*n+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}});var Wt,Kc,Pt,is,rs,Ji,nn=S(()=>{Dt();bi();Mi();it();Wt=new I,Kc=new Ve,Pt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Md,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,o=this.itemSize;n<o;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Kc.fromBufferAttribute(this,t),Kc.applyMatrix3(e),this.setXY(t,Kc.x,Kc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ts(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ei(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ts(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ei(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ts(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ei(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ts(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ei(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ts(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ei(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ei(t,this.array),i=Ei(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Ei(t,this.array),i=Ei(i,this.array),n=Ei(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,o){return e*=this.itemSize,this.normalized&&(t=Ei(t,this.array),i=Ei(i,this.array),n=Ei(n,this.array),o=Ei(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Md&&(e.usage=this.usage),e}},is=class extends Pt{constructor(e,t,i){super(new Uint16Array(e),t,i)}},rs=class extends Pt{constructor(e,t,i){super(new Uint32Array(e),t,i)}},Ji=class extends Pt{constructor(e,t,i){super(new Float32Array(e),t,i)}}});function wd(r,e,t,i,n){for(let o=0,s=r.length-3;o<=s;o+=3){fo.fromArray(r,o);let a=n.x*Math.abs(fo.x)+n.y*Math.abs(fo.y)+n.z*Math.abs(fo.z),l=e.dot(fo),c=t.dot(fo),f=i.dot(fo);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}var sn,on,yr,Xc,ns,os,ss,Pn,zn,co,cl,qc,jc,fo,Rd=S(()=>{Dt();sn=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=yr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let o=i.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,yr):yr.fromBufferAttribute(o,s),yr.applyMatrix4(e.matrixWorld),this.expandByPoint(yr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xc.copy(i.boundingBox)),Xc.applyMatrix4(e.matrixWorld),this.union(Xc)}let n=e.children;for(let o=0,s=n.length;o<s;o++)this.expandByObject(n[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yr),yr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cl),qc.subVectors(this.max,cl),ns.subVectors(e.a,cl),os.subVectors(e.b,cl),ss.subVectors(e.c,cl),Pn.subVectors(os,ns),zn.subVectors(ss,os),co.subVectors(ns,ss);let t=[0,-Pn.z,Pn.y,0,-zn.z,zn.y,0,-co.z,co.y,Pn.z,0,-Pn.x,zn.z,0,-zn.x,co.z,0,-co.x,-Pn.y,Pn.x,0,-zn.y,zn.x,0,-co.y,co.x,0];return!wd(t,ns,os,ss,qc)||(t=[1,0,0,0,1,0,0,0,1],!wd(t,ns,os,ss,qc))?!1:(jc.crossVectors(Pn,zn),t=[jc.x,jc.y,jc.z],wd(t,ns,os,ss,qc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(on[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),on[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),on[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),on[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),on[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),on[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),on[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),on[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(on),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},on=[new I,new I,new I,new I,new I,new I,new I,new I],yr=new I,Xc=new sn,ns=new I,os=new I,ss=new I,Pn=new I,zn=new I,co=new I,cl=new I,qc=new I,jc=new I,fo=new I});var Li,uo=S(()=>{Li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let o=n.indexOf(t);o!==-1&&n.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let o=0,s=n.length;o<s;o++)n[o].call(this,e);e.target=null}}}});var D4,fl,Td,kn,Yc=S(()=>{Rd();Dt();D4=new sn,fl=new I,Td=new I,kn=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):D4.setFromPoints(e).getCenter(i);let n=0;for(let o=0,s=e.length;o<s;o++)n=Math.max(n,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fl.subVectors(e,this.center);let t=fl.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(fl,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Td.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fl.copy(e.center).add(Td)),this.expandByPoint(fl.copy(e.center).sub(Td))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}});var rt,as,xr,C4,L4,Nn,Qc,Ui,er=S(()=>{it();Dt();rt=class r{constructor(e,t,i,n,o,s,a,l,c,f,u,p,d,m,y,g){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,o,s,a,l,c,f,u,p,d,m,y,g)}set(e,t,i,n,o,s,a,l,c,f,u,p,d,m,y,g){let h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=n,h[1]=o,h[5]=s,h[9]=a,h[13]=l,h[2]=c,h[6]=f,h[10]=u,h[14]=p,h[3]=d,h[7]=m,h[11]=y,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,n=1/as.setFromMatrixColumn(e,0).length(),o=1/as.setFromMatrixColumn(e,1).length(),s=1/as.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,o=e.z,s=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),f=Math.cos(o),u=Math.sin(o);if(e.order==="XYZ"){let p=s*f,d=s*u,m=a*f,y=a*u;t[0]=l*f,t[4]=-l*u,t[8]=c,t[1]=d+m*c,t[5]=p-y*c,t[9]=-a*l,t[2]=y-p*c,t[6]=m+d*c,t[10]=s*l}else if(e.order==="YXZ"){let p=l*f,d=l*u,m=c*f,y=c*u;t[0]=p+y*a,t[4]=m*a-d,t[8]=s*c,t[1]=s*u,t[5]=s*f,t[9]=-a,t[2]=d*a-m,t[6]=y+p*a,t[10]=s*l}else if(e.order==="ZXY"){let p=l*f,d=l*u,m=c*f,y=c*u;t[0]=p-y*a,t[4]=-s*u,t[8]=m+d*a,t[1]=d+m*a,t[5]=s*f,t[9]=y-p*a,t[2]=-s*c,t[6]=a,t[10]=s*l}else if(e.order==="ZYX"){let p=s*f,d=s*u,m=a*f,y=a*u;t[0]=l*f,t[4]=m*c-d,t[8]=p*c+y,t[1]=l*u,t[5]=y*c+p,t[9]=d*c-m,t[2]=-c,t[6]=a*l,t[10]=s*l}else if(e.order==="YZX"){let p=s*l,d=s*c,m=a*l,y=a*c;t[0]=l*f,t[4]=y-p*u,t[8]=m*u+d,t[1]=u,t[5]=s*f,t[9]=-a*f,t[2]=-c*f,t[6]=d*u+m,t[10]=p-y*u}else if(e.order==="XZY"){let p=s*l,d=s*c,m=a*l,y=a*c;t[0]=l*f,t[4]=-u,t[8]=c*f,t[1]=p*u+y,t[5]=s*f,t[9]=d*u-m,t[2]=m*u-d,t[6]=a*f,t[10]=y*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(C4,e,L4)}lookAt(e,t,i){let n=this.elements;return Ui.subVectors(e,t),Ui.lengthSq()===0&&(Ui.z=1),Ui.normalize(),Nn.crossVectors(i,Ui),Nn.lengthSq()===0&&(Math.abs(i.z)===1?Ui.x+=1e-4:Ui.z+=1e-4,Ui.normalize(),Nn.crossVectors(i,Ui)),Nn.normalize(),Qc.crossVectors(Ui,Nn),n[0]=Nn.x,n[4]=Qc.x,n[8]=Ui.x,n[1]=Nn.y,n[5]=Qc.y,n[9]=Ui.y,n[2]=Nn.z,n[6]=Qc.z,n[10]=Ui.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,o=this.elements,s=i[0],a=i[4],l=i[8],c=i[12],f=i[1],u=i[5],p=i[9],d=i[13],m=i[2],y=i[6],g=i[10],h=i[14],w=i[3],b=i[7],v=i[11],P=i[15],D=n[0],C=n[4],k=n[8],M=n[12],x=n[1],R=n[5],W=n[9],z=n[13],O=n[2],K=n[6],V=n[10],Z=n[14],G=n[3],$=n[7],re=n[11],ue=n[15];return o[0]=s*D+a*x+l*O+c*G,o[4]=s*C+a*R+l*K+c*$,o[8]=s*k+a*W+l*V+c*re,o[12]=s*M+a*z+l*Z+c*ue,o[1]=f*D+u*x+p*O+d*G,o[5]=f*C+u*R+p*K+d*$,o[9]=f*k+u*W+p*V+d*re,o[13]=f*M+u*z+p*Z+d*ue,o[2]=m*D+y*x+g*O+h*G,o[6]=m*C+y*R+g*K+h*$,o[10]=m*k+y*W+g*V+h*re,o[14]=m*M+y*z+g*Z+h*ue,o[3]=w*D+b*x+v*O+P*G,o[7]=w*C+b*R+v*K+P*$,o[11]=w*k+b*W+v*V+P*re,o[15]=w*M+b*z+v*Z+P*ue,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],o=e[12],s=e[1],a=e[5],l=e[9],c=e[13],f=e[2],u=e[6],p=e[10],d=e[14],m=e[3],y=e[7],g=e[11],h=e[15];return m*(+o*l*u-n*c*u-o*a*p+i*c*p+n*a*d-i*l*d)+y*(+t*l*d-t*c*p+o*s*p-n*s*d+n*c*f-o*l*f)+g*(+t*c*u-t*a*d-o*s*u+i*s*d+o*a*f-i*c*f)+h*(-n*a*f-t*l*u+t*a*p+n*s*u-i*s*p+i*l*f)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],f=e[8],u=e[9],p=e[10],d=e[11],m=e[12],y=e[13],g=e[14],h=e[15],w=u*g*c-y*p*c+y*l*d-a*g*d-u*l*h+a*p*h,b=m*p*c-f*g*c-m*l*d+s*g*d+f*l*h-s*p*h,v=f*y*c-m*u*c+m*a*d-s*y*d-f*a*h+s*u*h,P=m*u*l-f*y*l-m*a*p+s*y*p+f*a*g-s*u*g,D=t*w+i*b+n*v+o*P;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/D;return e[0]=w*C,e[1]=(y*p*o-u*g*o-y*n*d+i*g*d+u*n*h-i*p*h)*C,e[2]=(a*g*o-y*l*o+y*n*c-i*g*c-a*n*h+i*l*h)*C,e[3]=(u*l*o-a*p*o-u*n*c+i*p*c+a*n*d-i*l*d)*C,e[4]=b*C,e[5]=(f*g*o-m*p*o+m*n*d-t*g*d-f*n*h+t*p*h)*C,e[6]=(m*l*o-s*g*o-m*n*c+t*g*c+s*n*h-t*l*h)*C,e[7]=(s*p*o-f*l*o+f*n*c-t*p*c-s*n*d+t*l*d)*C,e[8]=v*C,e[9]=(m*u*o-f*y*o-m*i*d+t*y*d+f*i*h-t*u*h)*C,e[10]=(s*y*o-m*a*o+m*i*c-t*y*c-s*i*h+t*a*h)*C,e[11]=(f*a*o-s*u*o-f*i*c+t*u*c+s*i*d-t*a*d)*C,e[12]=P*C,e[13]=(f*y*n-m*u*n+m*i*p-t*y*p-f*i*g+t*u*g)*C,e[14]=(m*a*n-s*y*n-m*i*l+t*y*l+s*i*g-t*a*g)*C,e[15]=(s*u*n-f*a*n+f*i*l-t*u*l-s*i*p+t*a*p)*C,this}scale(e){let t=this.elements,i=e.x,n=e.y,o=e.z;return t[0]*=i,t[4]*=n,t[8]*=o,t[1]*=i,t[5]*=n,t[9]*=o,t[2]*=i,t[6]*=n,t[10]*=o,t[3]*=i,t[7]*=n,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),o=1-i,s=e.x,a=e.y,l=e.z,c=o*s,f=o*a;return this.set(c*s+i,c*a-n*l,c*l+n*a,0,c*a+n*l,f*a+i,f*l-n*s,0,c*l-n*a,f*l+n*s,o*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,o,s){return this.set(1,i,o,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,o=t._x,s=t._y,a=t._z,l=t._w,c=o+o,f=s+s,u=a+a,p=o*c,d=o*f,m=o*u,y=s*f,g=s*u,h=a*u,w=l*c,b=l*f,v=l*u,P=i.x,D=i.y,C=i.z;return n[0]=(1-(y+h))*P,n[1]=(d+v)*P,n[2]=(m-b)*P,n[3]=0,n[4]=(d-v)*D,n[5]=(1-(p+h))*D,n[6]=(g+w)*D,n[7]=0,n[8]=(m+b)*C,n[9]=(g-w)*C,n[10]=(1-(p+y))*C,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements,o=as.set(n[0],n[1],n[2]).length(),s=as.set(n[4],n[5],n[6]).length(),a=as.set(n[8],n[9],n[10]).length();this.determinant()<0&&(o=-o),e.x=n[12],e.y=n[13],e.z=n[14],xr.copy(this);let c=1/o,f=1/s,u=1/a;return xr.elements[0]*=c,xr.elements[1]*=c,xr.elements[2]*=c,xr.elements[4]*=f,xr.elements[5]*=f,xr.elements[6]*=f,xr.elements[8]*=u,xr.elements[9]*=u,xr.elements[10]*=u,t.setFromRotationMatrix(xr),i.x=o,i.y=s,i.z=a,this}makePerspective(e,t,i,n,o,s,a=Ci){let l=this.elements,c=2*o/(t-e),f=2*o/(i-n),u=(t+e)/(t-e),p=(i+n)/(i-n),d,m;if(a===Ci)d=-(s+o)/(s-o),m=-2*s*o/(s-o);else if(a===lo)d=-s/(s-o),m=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,o,s,a=Ci){let l=this.elements,c=1/(t-e),f=1/(i-n),u=1/(s-o),p=(t+e)*c,d=(i+n)*f,m,y;if(a===Ci)m=(s+o)*u,y=-2*u;else if(a===lo)m=o*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},as=new I,xr=new rt,C4=new I(0,0,0),L4=new I(1,1,1),Nn=new I,Qc=new I,Ui=new I});var gy,yy,zt,In=S(()=>{ll();er();Mi();gy=new rt,yy=new $i,zt=class r{constructor(e=0,t=0,i=0,n=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,o=n[0],s=n[4],a=n[8],l=n[1],c=n[5],f=n[9],u=n[2],p=n[6],d=n[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ft(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-f,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gy.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gy,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yy.setFromEuler(this),this.setFromQuaternion(yy,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zt.DEFAULT_ORDER="XYZ"});var On,Zc=S(()=>{On=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}});var Fe,Ad,Or=S(()=>{Fe=class r{constructor(e,t,i,n,o,s,a,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,o,s,a,l,c)}set(e,t,i,n,o,s,a,l,c){let f=this.elements;return f[0]=e,f[1]=n,f[2]=a,f[3]=t,f[4]=o,f[5]=l,f[6]=i,f[7]=s,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,o=this.elements,s=i[0],a=i[3],l=i[6],c=i[1],f=i[4],u=i[7],p=i[2],d=i[5],m=i[8],y=n[0],g=n[3],h=n[6],w=n[1],b=n[4],v=n[7],P=n[2],D=n[5],C=n[8];return o[0]=s*y+a*w+l*P,o[3]=s*g+a*b+l*D,o[6]=s*h+a*v+l*C,o[1]=c*y+f*w+u*P,o[4]=c*g+f*b+u*D,o[7]=c*h+f*v+u*C,o[2]=p*y+d*w+m*P,o[5]=p*g+d*b+m*D,o[8]=p*h+d*v+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],f=e[8];return t*s*f-t*a*c-i*o*f+i*a*l+n*o*c-n*s*l}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],f=e[8],u=f*s-a*c,p=a*l-f*o,d=c*o-s*l,m=t*u+i*p+n*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=u*y,e[1]=(n*c-f*i)*y,e[2]=(a*i-n*s)*y,e[3]=p*y,e[4]=(f*t-n*l)*y,e[5]=(n*o-a*t)*y,e[6]=d*y,e[7]=(i*l-c*t)*y,e[8]=(s*t-i*o)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,o,s,a){let l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*s+c*a)+s+e,-n*c,n*l,-n*(-c*s+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ad.makeScale(e,t)),this}rotate(e){return this.premultiply(Ad.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ad.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ad=new Fe});var P4,xy,ls,an,$c,ul,z4,k4,Sy,vy,Ey,My,N4,cs,Dd,Ut,ln=S(()=>{ll();Dt();er();uo();In();Zc();Or();Mi();P4=0,xy=new I,ls=new $i,an=new rt,$c=new I,ul=new I,z4=new I,k4=new $i,Sy=new I(1,0,0),vy=new I(0,1,0),Ey=new I(0,0,1),My={type:"added"},N4={type:"removed"},cs={type:"childadded",child:null},Dd={type:"childremoved",child:null},Ut=class r extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:P4++}),this.uuid=Nr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new I,t=new zt,i=new $i,n=new I(1,1,1);function o(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new rt},normalMatrix:{value:new Fe}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new On,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(Sy,e)}rotateY(e){return this.rotateOnAxis(vy,e)}rotateZ(e){return this.rotateOnAxis(Ey,e)}translateOnAxis(e,t){return xy.copy(e).applyQuaternion(this.quaternion),this.position.add(xy.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sy,e)}translateY(e){return this.translateOnAxis(vy,e)}translateZ(e){return this.translateOnAxis(Ey,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?$c.copy(e):$c.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),ul.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(ul,$c,this.up):an.lookAt($c,ul,this.up),this.quaternion.setFromRotationMatrix(an),n&&(an.extractRotation(n.matrixWorld),ls.setFromRotationMatrix(an),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(My),cs.child=e,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(N4),Dd.child=e,this.dispatchEvent(Dd),Dd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(My),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let o=0,s=n.length;o<s;o++)n[o].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ul,e,z4),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ul,k4,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let n=this.children;for(let o=0,s=n.length;o<s;o++)n[o].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=o(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let u=l[c];o(e.shapes,u)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));n.material=a}else n.material=o(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];n.animations.push(o(e.animations,l))}}if(t){let a=s(e.geometries),l=s(e.materials),c=s(e.textures),f=s(e.images),u=s(e.shapes),p=s(e.skeletons),d=s(e.animations),m=s(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),u.length>0&&(i.shapes=u),p.length>0&&(i.skeletons=p),d.length>0&&(i.animations=d),m.length>0&&(i.nodes=m)}return i.object=n,i;function s(a){let l=[];for(let c in a){let f=a[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}};Ut.DEFAULT_UP=new I(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0});function Jc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Fn(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _y(){let r=Fn("canvas");return r.style.display="block",r}function po(r){r in by||(by[r]=!0,console.warn(r))}function wy(r,e,t){return new Promise(function(i,n){function o(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:i()}}setTimeout(o,t)})}function Ry(r){let e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ty(r){let e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var by,Un=S(()=>{by={}});var I4,tr,Cd,fs,Bi,pl,ni,ai,Bn=S(()=>{Dt();bi();Rd();uo();nn();Yc();ln();er();Or();Mi();Un();I4=0,tr=new rt,Cd=new Ut,fs=new I,Bi=new sn,pl=new sn,ni=new I,ai=class r extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:I4++}),this.uuid=Nr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jc(e)?rs:is)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new Fe().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tr.makeRotationFromQuaternion(e),this.applyMatrix4(tr),this}rotateX(e){return tr.makeRotationX(e),this.applyMatrix4(tr),this}rotateY(e){return tr.makeRotationY(e),this.applyMatrix4(tr),this}rotateZ(e){return tr.makeRotationZ(e),this.applyMatrix4(tr),this}translate(e,t,i){return tr.makeTranslation(e,t,i),this.applyMatrix4(tr),this}scale(e,t,i){return tr.makeScale(e,t,i),this.applyMatrix4(tr),this}lookAt(e){return Cd.lookAt(e),Cd.updateMatrix(),this.applyMatrix4(Cd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,o=e.length;n<o;n++){let s=e[n];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ji(i,3))}else{for(let i=0,n=t.count;i<n;i++){let o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let o=t[i];Bi.setFromBufferAttribute(o),this.morphTargetsRelative?(ni.addVectors(this.boundingBox.min,Bi.min),this.boundingBox.expandByPoint(ni),ni.addVectors(this.boundingBox.max,Bi.max),this.boundingBox.expandByPoint(ni)):(this.boundingBox.expandByPoint(Bi.min),this.boundingBox.expandByPoint(Bi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let i=this.boundingSphere.center;if(Bi.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];pl.setFromBufferAttribute(a),this.morphTargetsRelative?(ni.addVectors(Bi.min,pl.min),Bi.expandByPoint(ni),ni.addVectors(Bi.max,pl.max),Bi.expandByPoint(ni)):(Bi.expandByPoint(pl.min),Bi.expandByPoint(pl.max))}Bi.getCenter(i);let n=0;for(let o=0,s=e.count;o<s;o++)ni.fromBufferAttribute(e,o),n=Math.max(n,i.distanceToSquared(ni));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)ni.fromBufferAttribute(a,c),l&&(fs.fromBufferAttribute(e,c),ni.add(fs)),n=Math.max(n,i.distanceToSquared(ni))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,n=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*i.count),4));let s=this.getAttribute("tangent"),a=[],l=[];for(let k=0;k<i.count;k++)a[k]=new I,l[k]=new I;let c=new I,f=new I,u=new I,p=new Ve,d=new Ve,m=new Ve,y=new I,g=new I;function h(k,M,x){c.fromBufferAttribute(i,k),f.fromBufferAttribute(i,M),u.fromBufferAttribute(i,x),p.fromBufferAttribute(o,k),d.fromBufferAttribute(o,M),m.fromBufferAttribute(o,x),f.sub(c),u.sub(c),d.sub(p),m.sub(p);let R=1/(d.x*m.y-m.x*d.y);isFinite(R)&&(y.copy(f).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(R),g.copy(u).multiplyScalar(d.x).addScaledVector(f,-m.x).multiplyScalar(R),a[k].add(y),a[M].add(y),a[x].add(y),l[k].add(g),l[M].add(g),l[x].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let k=0,M=w.length;k<M;++k){let x=w[k],R=x.start,W=x.count;for(let z=R,O=R+W;z<O;z+=3)h(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let b=new I,v=new I,P=new I,D=new I;function C(k){P.fromBufferAttribute(n,k),D.copy(P);let M=a[k];b.copy(M),b.sub(P.multiplyScalar(P.dot(M))).normalize(),v.crossVectors(D,M);let R=v.dot(l[k])<0?-1:1;s.setXYZW(k,b.x,b.y,b.z,R)}for(let k=0,M=w.length;k<M;++k){let x=w[k],R=x.start,W=x.count;for(let z=R,O=R+W;z<O;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,d=i.count;p<d;p++)i.setXYZ(p,0,0,0);let n=new I,o=new I,s=new I,a=new I,l=new I,c=new I,f=new I,u=new I;if(e)for(let p=0,d=e.count;p<d;p+=3){let m=e.getX(p+0),y=e.getX(p+1),g=e.getX(p+2);n.fromBufferAttribute(t,m),o.fromBufferAttribute(t,y),s.fromBufferAttribute(t,g),f.subVectors(s,o),u.subVectors(n,o),f.cross(u),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),a.add(f),l.add(f),c.add(f),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let p=0,d=t.count;p<d;p+=3)n.fromBufferAttribute(t,p+0),o.fromBufferAttribute(t,p+1),s.fromBufferAttribute(t,p+2),f.subVectors(s,o),u.subVectors(n,o),f.cross(u),i.setXYZ(p+0,f.x,f.y,f.z),i.setXYZ(p+1,f.x,f.y,f.z),i.setXYZ(p+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ni.fromBufferAttribute(e,t),ni.normalize(),e.setXYZ(t,ni.x,ni.y,ni.z)}toNonIndexed(){function e(a,l){let c=a.array,f=a.itemSize,u=a.normalized,p=new c.constructor(l.length*f),d=0,m=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?d=l[y]*a.data.stride+a.offset:d=l[y]*f;for(let h=0;h<f;h++)p[m++]=c[d++]}return new Pt(p,f,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,i=this.index.array,n=this.attributes;for(let a in n){let l=n[a],c=e(l,i);t.setAttribute(a,c)}let o=this.morphAttributes;for(let a in o){let l=[],c=o[a];for(let f=0,u=c.length;f<u;f++){let p=c[f],d=e(p,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,l=s.length;a<l;a++){let c=s[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let n={},o=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let u=0,p=c.length;u<p;u++){let d=c[u];f.push(d.toJSON(e.data))}f.length>0&&(n[l]=f,o=!0)}o&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let n=e.attributes;for(let c in n){let f=n[c];this.setAttribute(c,f.clone(t))}let o=e.morphAttributes;for(let c in o){let f=[],u=o[c];for(let p=0,d=u.length;p<d;p++)f.push(u[p].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let c=0,f=s.length;c<f;c++){let u=s[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}});var Fr,dl=S(()=>{Bn();nn();Dt();Fr=class r extends ai{constructor(e=1,t=1,i=1,n=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:o,depthSegments:s};let a=this;n=Math.floor(n),o=Math.floor(o),s=Math.floor(s);let l=[],c=[],f=[],u=[],p=0,d=0;m("z","y","x",-1,-1,i,t,e,s,o,0),m("z","y","x",1,-1,i,t,-e,s,o,1),m("x","z","y",1,1,e,i,t,n,s,2),m("x","z","y",1,-1,e,i,-t,n,s,3),m("x","y","z",1,-1,e,t,i,n,o,4),m("x","y","z",-1,-1,e,t,-i,n,o,5),this.setIndex(l),this.setAttribute("position",new Ji(c,3)),this.setAttribute("normal",new Ji(f,3)),this.setAttribute("uv",new Ji(u,2));function m(y,g,h,w,b,v,P,D,C,k,M){let x=v/C,R=P/k,W=v/2,z=P/2,O=D/2,K=C+1,V=k+1,Z=0,G=0,$=new I;for(let re=0;re<V;re++){let ue=re*R-z;for(let ke=0;ke<K;ke++){let Ge=ke*x-W;$[y]=Ge*w,$[g]=ue*b,$[h]=O,c.push($.x,$.y,$.z),$[y]=0,$[g]=0,$[h]=D>0?1:-1,f.push($.x,$.y,$.z),u.push(ke/C),u.push(1-re/k),Z+=1}}for(let re=0;re<k;re++)for(let ue=0;ue<C;ue++){let ke=p+ue+K*re,Ge=p+ue+K*(re+1),Y=p+(ue+1)+K*(re+1),ie=p+(ue+1)+K*re;l.push(ke,Ge,ie),l.push(Ge,Y,ie),G+=6}a.addGroup(d,G,M),d+=G,p+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}});var Ld,Ay=S(()=>{Ld={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}}});var Pd,Dy,Cy=S(()=>{Pd=class{constructor(e,t,i){let n=this,o=!1,s=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(f){a++,o===!1&&n.onStart!==void 0&&n.onStart(f,s,a),o=!0},this.itemEnd=function(f){s++,n.onProgress!==void 0&&n.onProgress(f,s,a),s===a&&(o=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(f){n.onError!==void 0&&n.onError(f)},this.resolveURL=function(f){return l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,u){return c.push(f,u),this},this.removeHandler=function(f){let u=c.indexOf(f);return u!==-1&&c.splice(u,2),this},this.getHandler=function(f){for(let u=0,p=c.length;u<p;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.test(f))return m}return null}}},Dy=new Pd});var ho,zd=S(()=>{Cy();ho=class{constructor(e){this.manager=e!==void 0?e:Dy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,o){i.load(e,n,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ho.DEFAULT_MATERIAL_NAME="__DEFAULT"});var ef,Ly=S(()=>{Ay();zd();Un();ef=class extends ho{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=Ld.get(e);if(s!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s;let a=Fn("img");function l(){f(),Ld.add(e,this),t&&t(this),o.manager.itemEnd(e)}function c(u){f(),n&&n(u),o.manager.itemError(e),o.manager.itemEnd(e)}function f(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),o.manager.itemStart(e),a.src=e,a}}});function Sr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function mo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var $e,Py,zy,ky,Ny,Iy,Ur=S(()=>{it();Or();$e={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===at&&(r.r=Sr(r.r),r.g=Sr(r.g),r.b=Sr(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===at&&(r.r=mo(r.r),r.g=mo(r.g),r.b=mo(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zi?so:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};Py=[.64,.33,.3,.6,.15,.06],zy=[.2126,.7152,.0722],ky=[.3127,.329],Ny=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Iy=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[gr]:{primaries:Py,whitePoint:ky,transfer:so,toXYZ:Ny,fromXYZ:Iy,luminanceCoefficients:zy,workingColorSpaceConfig:{unpackColorSpace:vi},outputColorSpaceConfig:{drawingBufferColorSpace:vi}},[vi]:{primaries:Py,whitePoint:ky,transfer:at,toXYZ:Ny,fromXYZ:Iy,luminanceCoefficients:zy,outputColorSpaceConfig:{drawingBufferColorSpace:vi}}})});var us,tf,Oy=S(()=>{Un();Ur();tf=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{us===void 0&&(us=Fn("canvas")),us.width=e.width,us.height=e.height;let i=us.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=us}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Fn("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),o=n.data;for(let s=0;s<o.length;s++)o[s]=Sr(o[s]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Sr(t[i]/255)*255):t[i]=Sr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}});function kd(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?tf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var O4,ps,Nd=S(()=>{Oy();Mi();O4=0,ps=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:O4++}),this.uuid=Nr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let o;if(Array.isArray(n)){o=[];for(let s=0,a=n.length;s<a;s++)n[s].isDataTexture?o.push(kd(n[s].image)):o.push(kd(n[s]))}else o=kd(n);i.url=o}return t||(e.images[this.uuid]=i),i}}});var F4,Bt,cn=S(()=>{uo();it();Mi();bi();Or();Nd();F4=0,Bt=class r extends Li{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,i=dr,n=dr,o=xi,s=hr,a=ri,l=pi,c=r.DEFAULT_ANISOTROPY,f=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:F4++}),this.uuid=Nr(),this.name="",this.source=new ps(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pa:e.x=e.x-Math.floor(e.x);break;case dr:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pa:e.y=e.y-Math.floor(e.y);break;case dr:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=vd;Bt.DEFAULT_ANISOTROPY=1});var ds,Id=S(()=>{Ly();cn();zd();ds=class extends ho{constructor(e){super(e)}load(e,t,i,n){let o=new Bt,s=new ef(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},i,n),o}}});function Od(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var Fy,Gn,rf,Ue,hi,ir=S(()=>{Mi();Ur();it();Fy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},rf={h:0,s:0,l:0};Ue=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=hy(e,1),t=Ft(t,0,1),i=Ft(i,0,1),t===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+t):i+t-i*t,s=2*i-o;this.r=Od(s,o,e+1/3),this.g=Od(s,o,e),this.b=Od(s,o,e-1/3)}return $e.toWorkingColorSpace(this,n),this}setStyle(e,t=vi){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=n[1],a=n[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=n[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vi){let i=Fy[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}copyLinearToSRGB(e){return this.r=mo(e.r),this.g=mo(e.g),this.b=mo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vi){return $e.fromWorkingColorSpace(hi.copy(this),e),Math.round(Ft(hi.r*255,0,255))*65536+Math.round(Ft(hi.g*255,0,255))*256+Math.round(Ft(hi.b*255,0,255))}getHexString(e=vi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(hi.copy(this),t);let i=hi.r,n=hi.g,o=hi.b,s=Math.max(i,n,o),a=Math.min(i,n,o),l,c,f=(a+s)/2;if(a===s)l=0,c=0;else{let u=s-a;switch(c=f<=.5?u/(s+a):u/(2-s-a),s){case i:l=(n-o)/u+(n<o?6:0);break;case n:l=(o-i)/u+2;break;case o:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(hi.copy(this),t),e.r=hi.r,e.g=hi.g,e.b=hi.b,e}getStyle(e=vi){$e.fromWorkingColorSpace(hi.copy(this),e);let t=hi.r,i=hi.g,n=hi.b;return e!==vi?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(rf);let i=Hc(Gn.h,rf.h,t),n=Hc(Gn.s,rf.s,t),o=Hc(Gn.l,rf.l,t);return this.setHSL(i,n,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*n,this.g=o[1]*t+o[4]*i+o[7]*n,this.b=o[2]*t+o[5]*i+o[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hi=new Ue;Ue.NAMES=Fy});var U4,Br,hl=S(()=>{ir();uo();it();Mi();U4=0,Br=class extends Li{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:U4++}),this.uuid=Nr(),this.name="",this.blending=en,this.side=qt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Da,this.blendEquation=tn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Cn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ed,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ao,this.stencilZFail=ao,this.stencilZPass=ao,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==en&&(i.blending=this.blending),this.side!==qt&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Aa&&(i.blendSrc=this.blendSrc),this.blendDst!==Da&&(i.blendDst=this.blendDst),this.blendEquation!==tn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Cn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ed&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ao&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ao&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ao&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(o){let s=[];for(let a in o){let l=o[a];delete l.metadata,s.push(l)}return s}if(t){let o=n(e.textures),s=n(e.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let o=0;o!==n;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}});var ht,ml=S(()=>{hl();it();ir();In();ht=class extends Br{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zt,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}});var vr,nf=S(()=>{ln();vr=class extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}});var fn,Fd,of,Vn,Ud,sf,Bd,hs,Gd=S(()=>{Dt();fn=new I,Fd=new I,of=new I,Vn=new I,Ud=new I,sf=new I,Bd=new I,hs=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Fd.copy(e).add(t).multiplyScalar(.5),of.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(Fd);let o=e.distanceTo(t)*.5,s=-this.direction.dot(of),a=Vn.dot(this.direction),l=-Vn.dot(of),c=Vn.lengthSq(),f=Math.abs(1-s*s),u,p,d,m;if(f>0)if(u=s*l-a,p=s*a-l,m=o*f,u>=0)if(p>=-m)if(p<=m){let y=1/f;u*=y,p*=y,d=u*(u+s*p+2*a)+p*(s*u+p+2*l)+c}else p=o,u=Math.max(0,-(s*p+a)),d=-u*u+p*(p+2*l)+c;else p=-o,u=Math.max(0,-(s*p+a)),d=-u*u+p*(p+2*l)+c;else p<=-m?(u=Math.max(0,-(-s*o+a)),p=u>0?-o:Math.min(Math.max(-o,-l),o),d=-u*u+p*(p+2*l)+c):p<=m?(u=0,p=Math.min(Math.max(-o,-l),o),d=p*(p+2*l)+c):(u=Math.max(0,-(s*o+a)),p=u>0?o:Math.min(Math.max(-o,-l),o),d=-u*u+p*(p+2*l)+c);else p=s>0?-o:o,u=Math.max(0,-(s*p+a)),d=-u*u+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Fd).addScaledVector(of,p),d}intersectSphere(e,t){fn.subVectors(e.center,this.origin);let i=fn.dot(this.direction),n=fn.dot(fn)-i*i,o=e.radius*e.radius;if(n>o)return null;let s=Math.sqrt(o-n),a=i-s,l=i+s;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,o,s,a,l,c=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,n=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,n=(e.min.x-p.x)*c),f>=0?(o=(e.min.y-p.y)*f,s=(e.max.y-p.y)*f):(o=(e.max.y-p.y)*f,s=(e.min.y-p.y)*f),i>s||o>n||((o>i||isNaN(i))&&(i=o),(s<n||isNaN(n))&&(n=s),u>=0?(a=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(a=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,i,n,o){Ud.subVectors(t,e),sf.subVectors(i,e),Bd.crossVectors(Ud,sf);let s=this.direction.dot(Bd),a;if(s>0){if(n)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Vn.subVectors(this.origin,e);let l=a*this.direction.dot(sf.crossVectors(Vn,sf));if(l<0)return null;let c=a*this.direction.dot(Ud.cross(Vn));if(c<0||l+c>s)return null;let f=-a*Vn.dot(Bd);return f<0?null:this.at(f/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}});var St,Wn=S(()=>{St=class r{constructor(e=0,t=0,i=0,n=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n+s[12]*o,this.y=s[1]*t+s[5]*i+s[9]*n+s[13]*o,this.z=s[2]*t+s[6]*i+s[10]*n+s[14]*o,this.w=s[3]*t+s[7]*i+s[11]*n+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,o,l=e.elements,c=l[0],f=l[4],u=l[8],p=l[1],d=l[5],m=l[9],y=l[2],g=l[6],h=l[10];if(Math.abs(f-p)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(f+p)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,v=(d+1)/2,P=(h+1)/2,D=(f+p)/4,C=(u+y)/4,k=(m+g)/4;return b>v&&b>P?b<.01?(i=0,n=.707106781,o=.707106781):(i=Math.sqrt(b),n=D/i,o=C/i):v>P?v<.01?(i=.707106781,n=0,o=.707106781):(n=Math.sqrt(v),i=D/n,o=k/n):P<.01?(i=.707106781,n=.707106781,o=0):(o=Math.sqrt(P),i=C/o,n=k/o),this.set(i,n,o,t),this}let w=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(p-f)*(p-f));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(u-y)/w,this.z=(p-f)/w,this.w=Math.acos((c+d+h-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}});var Er,un,Vd,pn,ms,gs,Uy,Wd,Hd,Kd,Xd,qd,jd,Hn,By=S(()=>{Dt();Wn();Er=new I,un=new I,Vd=new I,pn=new I,ms=new I,gs=new I,Uy=new I,Wd=new I,Hd=new I,Kd=new I,Xd=new St,qd=new St,jd=new St,Hn=class r{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Er.subVectors(e,t),n.cross(Er);let o=n.lengthSq();return o>0?n.multiplyScalar(1/Math.sqrt(o)):n.set(0,0,0)}static getBarycoord(e,t,i,n,o){Er.subVectors(n,t),un.subVectors(i,t),Vd.subVectors(e,t);let s=Er.dot(Er),a=Er.dot(un),l=Er.dot(Vd),c=un.dot(un),f=un.dot(Vd),u=s*c-a*a;if(u===0)return o.set(0,0,0),null;let p=1/u,d=(c*l-a*f)*p,m=(s*f-a*l)*p;return o.set(1-d-m,m,d)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,i,n,o,s,a,l){return this.getBarycoord(e,t,i,n,pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,pn.x),l.addScaledVector(s,pn.y),l.addScaledVector(a,pn.z),l)}static getInterpolatedAttribute(e,t,i,n,o,s){return Xd.setScalar(0),qd.setScalar(0),jd.setScalar(0),Xd.fromBufferAttribute(e,t),qd.fromBufferAttribute(e,i),jd.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(Xd,o.x),s.addScaledVector(qd,o.y),s.addScaledVector(jd,o.z),s}static isFrontFacing(e,t,i,n){return Er.subVectors(i,t),un.subVectors(e,t),Er.cross(un).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Er.subVectors(this.c,this.b),un.subVectors(this.a,this.b),Er.cross(un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,o){return r.getInterpolation(e,this.a,this.b,this.c,t,i,n,o)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,o=this.c,s,a;ms.subVectors(n,i),gs.subVectors(o,i),Wd.subVectors(e,i);let l=ms.dot(Wd),c=gs.dot(Wd);if(l<=0&&c<=0)return t.copy(i);Hd.subVectors(e,n);let f=ms.dot(Hd),u=gs.dot(Hd);if(f>=0&&u<=f)return t.copy(n);let p=l*u-f*c;if(p<=0&&l>=0&&f<=0)return s=l/(l-f),t.copy(i).addScaledVector(ms,s);Kd.subVectors(e,o);let d=ms.dot(Kd),m=gs.dot(Kd);if(m>=0&&d<=m)return t.copy(o);let y=d*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(gs,a);let g=f*m-d*u;if(g<=0&&u-f>=0&&d-m>=0)return Uy.subVectors(o,n),a=(u-f)/(u-f+(d-m)),t.copy(n).addScaledVector(Uy,a);let h=1/(g+y+p);return s=y*h,a=p*h,t.copy(i).addScaledVector(ms,s).addScaledVector(gs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}});function B4(r,e,t,i,n,o,s,a){let l;if(e.side===dt?l=i.intersectTriangle(s,o,n,!0,a):l=i.intersectTriangle(n,o,s,e.side===qt,a),l===null)return null;pf.copy(a),pf.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(pf);return c<t.near||c>t.far?null:{distance:c,point:pf.clone(),object:r}}function df(r,e,t,i,n,o,s,a,l,c){r.getVertexPosition(a,lf),r.getVertexPosition(l,cf),r.getVertexPosition(c,ff);let f=B4(r,e,t,i,lf,cf,ff,Wy);if(f){let u=new I;Hn.getBarycoord(Wy,lf,cf,ff,u),n&&(f.uv=Hn.getInterpolatedAttribute(n,a,l,c,u,new Ve)),o&&(f.uv1=Hn.getInterpolatedAttribute(o,a,l,c,u,new Ve)),s&&(f.normal=Hn.getInterpolatedAttribute(s,a,l,c,u,new I),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let p={a,b:l,c,normal:new I,materialIndex:0};Hn.getNormal(lf,cf,ff,p.normal),f.face=p,f.barycoord=u}return f}var Gy,go,af,Vy,lf,cf,ff,Yd,uf,Wy,pf,kt,Kn=S(()=>{Dt();bi();Yc();Gd();er();ln();By();it();ml();Bn();Gy=new rt,go=new hs,af=new kn,Vy=new I,lf=new I,cf=new I,ff=new I,Yd=new I,uf=new I,Wy=new I,pf=new I,kt=class extends Ut{constructor(e=new ai,t=new ht){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=n.length;o<s;o++){let a=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let a=this.morphTargetInfluences;if(o&&a){uf.set(0,0,0);for(let l=0,c=o.length;l<c;l++){let f=a[l],u=o[l];f!==0&&(Yd.fromBufferAttribute(u,e),s?uf.addScaledVector(Yd,f):uf.addScaledVector(Yd.sub(t),f))}t.add(uf)}return t}raycast(e,t){let i=this.geometry,n=this.material,o=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),af.copy(i.boundingSphere),af.applyMatrix4(o),go.copy(e.ray).recast(e.near),!(af.containsPoint(go.origin)===!1&&(go.intersectSphere(af,Vy)===null||go.origin.distanceToSquared(Vy)>(e.far-e.near)**2))&&(Gy.copy(o).invert(),go.copy(e.ray).applyMatrix4(Gy),!(i.boundingBox!==null&&go.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,go)))}_computeIntersections(e,t,i){let n,o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,f=o.attributes.uv1,u=o.attributes.normal,p=o.groups,d=o.drawRange;if(a!==null)if(Array.isArray(s))for(let m=0,y=p.length;m<y;m++){let g=p[m],h=s[g.materialIndex],w=Math.max(g.start,d.start),b=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=w,P=b;v<P;v+=3){let D=a.getX(v),C=a.getX(v+1),k=a.getX(v+2);n=df(this,h,e,i,c,f,u,D,C,k),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{let m=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let g=m,h=y;g<h;g+=3){let w=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);n=df(this,s,e,i,c,f,u,w,b,v),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(s))for(let m=0,y=p.length;m<y;m++){let g=p[m],h=s[g.materialIndex],w=Math.max(g.start,d.start),b=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let v=w,P=b;v<P;v+=3){let D=v,C=v+1,k=v+2;n=df(this,h,e,i,c,f,u,D,C,k),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=g.materialIndex,t.push(n))}}else{let m=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let g=m,h=y;g<h;g+=3){let w=g,b=g+1,v=g+2;n=df(this,s,e,i,c,f,u,w,b,v),n&&(n.faceIndex=Math.floor(g/3),t.push(n))}}}}});function hf(r){return r*r*r*(10-r*(15-6*r))}var Qd=S(()=>{});var gf,mf,yf=S(()=>{be();gf={floating:!0,none:!0},mf=class extends Le{getDefaultValue(){return"auto"}}});var Pi,Xn,ys=S(()=>{Pi=Math.PI*2,Xn=360/Pi});var gl,xf,mi,Zd,Hy,Ky,Xy,xs,yo,Ss,vs,yl,qy=S(()=>{gl=globalThis.performance,xf=class{mode=0;dom=document.createElement("div");constructor(){this.dom.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",this.dom.addEventListener("click",e=>{e.preventDefault(),this.showPanel(++this.mode%this.dom.children.length)},!1),this.showPanel(0)}addPanel(e){return this.dom.appendChild(e.dom),e}showPanel(e){for(let t=0;t<this.dom.children.length;t++)this.dom.children[t].style.display=t===e?"block":"none";this.mode=e}beginTime=(gl||Date).now();prevTime=this.beginTime;frames=0;fpsPanel=this.addPanel(new yl("FPS","#0ff","#002"));msPanel=this.addPanel(new yl("MS","#0f0","#020"));memPanel=gl?.memory?this.addPanel(new yl("MB","#f08","#201")):null;REVISION=16;begin(){this.beginTime=(gl||Date).now()}end(){this.frames++;let e=(gl||Date).now();if(this.msPanel.update(e-this.beginTime,200),e>=this.prevTime+1e3&&(this.fpsPanel.update(this.frames*1e3/(e-this.prevTime),100),this.prevTime=e,this.frames=0,this.memPanel)){let t=gl.memory;this.memPanel.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e}update(){this.beginTime=this.end()}},mi=Math.round(globalThis?.window?.devicePixelRatio??1),Zd=80*mi,Hy=48*mi,Ky=3*mi,Xy=2*mi,xs=3*mi,yo=15*mi,Ss=74*mi,vs=30*mi,yl=class{min=1/0;max=0;dom=document.createElement("canvas");context=this.dom.getContext("2d");name;fg;bg;constructor(e,t,i){this.name=e,this.fg=t,this.bg=i,this.dom.width=Zd,this.dom.height=Hy,this.dom.style.cssText="width:80px;height:48px",this.context.font=`bold ${9*mi}px Helvetica,Arial,sans-serif`,this.context.textBaseline="top",this.context.fillStyle=i,this.context.fillRect(0,0,Zd,Hy),this.context.fillStyle=t,this.context.fillText(e,Ky,Xy),this.context.fillRect(xs,yo,Ss,vs),this.context.fillStyle=i,this.context.globalAlpha=.9,this.context.fillRect(xs,yo,Ss,vs)}update(e,t){this.min=Math.min(this.min,e),this.max=Math.max(this.max,e),this.context.fillStyle=this.bg,this.context.globalAlpha=1,this.context.fillRect(0,0,Zd,yo),this.context.fillStyle=this.fg,this.context.fillText(`${Math.round(e)} ${this.name} (${Math.round(this.min)}-${Math.round(this.max)})`,Ky,Xy),this.context.drawImage(this.dom,xs+mi,yo,Ss-mi,vs,xs,yo,Ss-mi,vs),this.context.fillRect(xs+Ss-mi,yo,mi,vs),this.context.fillStyle=this.bg,this.context.globalAlpha=.9,this.context.fillRect(xs+Ss-mi,yo,mi,Math.round((1-e/t)*vs))}}});var xl,jy=S(()=>{xl={shareAllNewRenderers:"auto",showRenderStats:!1}});function Sl(){return G4??(devicePixelRatio||1)}var G4,$d=S(()=>{G4=null});var Jd,Sf,eh,jt,_i,th,wi=S(()=>{Jd=class{};globalThis.HTMLElement?Sf=globalThis.HTMLElement:Sf=Jd;eh=class{define(){}};globalThis.customElements?jt=globalThis.customElements:jt=new eh;th=class{replaceSync(){}};globalThis.CSSStyleSheet?_i=globalThis.CSSStyleSheet:_i=th});var oi,qn=S(()=>{wi();oi=class extends Sf{shadow;contentWrapper;constructor(e){super(),this.shadow=this.attachShadow({mode:e?.mode??"closed"}),this.contentWrapper=document.createElement("div"),this.contentWrapper.classList.add("wrapper"),this.shadow.appendChild(this.contentWrapper)}addCSS(e){this.shadow.adoptedStyleSheets.push(e)}removeCSS(e){let t=this.shadow.adoptedStyleSheets.indexOf(e);typeof t<"u"&&this.shadow.adoptedStyleSheets.splice(t,t+1)}addElement(e){return this.contentWrapper.appendChild(e)}prependElement(e){this.contentWrapper.prepend(e)}removeElement(e){return this.contentWrapper.removeChild(e)}};jt.define("twisty-managed-custom-element",oi)});var vf,Yy=S(()=>{vf=class extends EventTarget{#e=new Map;target;constructor(e){super(),this.target=e}start(){this.addTargetListener("pointerdown",this.onPointerDown.bind(this)),this.addTargetListener("contextmenu",e=>{e.preventDefault()}),this.addTargetListener("touchmove",e=>e.preventDefault()),this.addTargetListener("dblclick",e=>e.preventDefault())}stop(){for(let[e,t]of this.#t.entries())this.target.removeEventListener(e,t);this.#t.clear(),this.#i=!1}#t=new Map;addTargetListener(e,t){this.#t.has(e)||(this.target.addEventListener(e,t),this.#t.set(e,t))}#i=!1;#n(){this.#i||(this.addTargetListener("pointermove",this.onPointerMove.bind(this)),this.addTargetListener("pointerup",this.onPointerUp.bind(this)),this.#i=!0)}#o(e){this.#e.delete(e.pointerId)}#r(e){let t=this.#e.get(e.pointerId);if(!t)return{movementInfo:null,hasMoved:!1};let i;return(e.movementX??0)!==0||(e.movementY??0)!==0?i={attachedInfo:t.attachedInfo,movementX:e.movementX,movementY:e.movementY,elapsedMs:e.timeStamp-t.lastTimeStamp}:i={attachedInfo:t.attachedInfo,movementX:e.clientX-t.lastClientX,movementY:e.clientY-t.lastClientY,elapsedMs:e.timeStamp-t.lastTimeStamp},t.lastClientX=e.clientX,t.lastClientY=e.clientY,t.lastTimeStamp=e.timeStamp,Math.abs(i.movementX)<.1&&Math.abs(i.movementY)<.1?{movementInfo:null,hasMoved:t.hasMoved}:(t.hasMoved=!0,{movementInfo:i,hasMoved:t.hasMoved})}onPointerDown(e){this.#n();let t={attachedInfo:{},hasMoved:!1,lastClientX:e.clientX,lastClientY:e.clientY,lastTimeStamp:e.timeStamp};this.#e.set(e.pointerId,t),this.target.setPointerCapture(e.pointerId)}onPointerMove(e){let t=this.#r(e).movementInfo;t&&(e.preventDefault(),this.dispatchEvent(new CustomEvent("move",{detail:t})))}onPointerUp(e){let t=this.#r(e),i=this.#e.get(e.pointerId);this.#o(e),this.target.releasePointerCapture(e.pointerId);let n;if(t.hasMoved)n=new CustomEvent("up",{detail:{attachedInfo:i.attachedInfo}});else{let{altKey:o,ctrlKey:s,metaKey:a,shiftKey:l}=e;n=new CustomEvent("press",{detail:{normalizedX:e.offsetX/this.target.offsetWidth*2-1,normalizedY:1-e.offsetY/this.target.offsetHeight*2,rightClick:!!(e.button&2),keys:{altKey:o,ctrlOrMetaKey:s||a,shiftKey:l}}})}this.dispatchEvent(n)}}});async function ih(r,e,t,i){vl.length===0&&vl.push(Ef());let n=await vl[0];return n.setSize(r,e),n.render(t,i),n.domElement}async function Qy(r,e,t,i,n){if(r===0||e===0)return;vl.length===0&&vl.push(Ef());let o=await ih(r,e,i,n),s=t.getContext("2d");s.clearRect(0,0,t.width,t.height),s.drawImage(o,0,0)}async function Ef(){let r=(await Gt).ThreeWebGLRenderer,e=new r({antialias:!0,alpha:!0});return e.outputColorSpace=V4,e.setPixelRatio(Sl()),e}var vl,V4,rh=S(()=>{Gr();$d();vl=[];V4="srgb-linear"});var nh,Zy=S(()=>{wi();nh=new _i;nh.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  place-content: center;
  contain: strict;
}

.loading {
  width: 4em;
  height: 4em;
  border-radius: 2.5em;
  border: 0.5em solid rgba(0, 0, 0, 0);
  border-top: 0.5em solid rgba(0, 0, 0, 0.7);
  border-right: 0.5em solid rgba(0, 0, 0, 0.7);
  animation: fade-in-delayed 4s, rotate 1s linear infinite;
}

@keyframes fade-in-delayed {
  0% { opacity: 0; }
  25% {opacity: 0; }
  100% { opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* TODO: This is due to stats hack. Replace with \`canvas\`. */
.wrapper > canvas {
  max-width: 100%;
  max-height: 100%;
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.wrapper.invisible {
  opacity: 0;
}

.wrapper.drag-input-enabled > canvas {
  cursor: grab;
}

.wrapper.drag-input-enabled > canvas:active {
  cursor: grabbing;
}
`)});function $y(r){return(Math.exp(1-r)-(1-r))/(1-Math.E)+1}var W4,oh,H4,K4,sh,Mf,Jy=S(()=>{Ro();Gr();ys();W4=!0,oh=500,H4=50,K4=.75;sh=class{scheduler=new Ni(this.render.bind(this));lastTimestamp;startTimestamp;momentumX;momentumY;callback;constructor(e,t,i,n){this.startTimestamp=e,this.momentumX=t,this.momentumY=i,this.callback=n,this.scheduler.requestAnimFrame(),this.lastTimestamp=e}render(e){let t=(this.lastTimestamp-this.startTimestamp)/oh,i=Math.min(1,(e-this.startTimestamp)/oh);if(t===0&&i>H4/oh)return;let n=$y(i)-$y(t);this.callback(this.momentumX*n*1e3,this.momentumY*n*1e3),i<1&&this.scheduler.requestAnimFrame(),this.lastTimestamp=e}},Mf=class{experimentalInertia=W4;onMovementBound=this.onMovement.bind(this);experimentalHasBeenMoved=!1;model;mirror;canvas;dragTracker;constructor(e,t,i,n){this.model=e,this.mirror=t,this.canvas=i,this.dragTracker=n,this.dragTracker.addEventListener("move",this.onMove.bind(this)),this.dragTracker.addEventListener("up",this.onUp.bind(this))}temperMovement(e){return Math.sign(e)*Math.log(Math.abs(e*10)+1)/6}onMove(e){e.detail.attachedInfo??={};let{temperedX:t,temperedY:i}=this.onMovement(e.detail.movementX,e.detail.movementY),n=e.detail.attachedInfo;n.lastTemperedX=t*10,n.lastTemperedY=i*10,n.timestamp=e.timeStamp}onMovement(e,t){let i=this.mirror?-1:1,n=Math.min(this.canvas.offsetWidth,this.canvas.offsetHeight),o=this.temperMovement(e/n),s=this.temperMovement(t/n*K4);return this.model.twistySceneModel.orbitCoordinatesRequest.set((async()=>{let a=await this.model.twistySceneModel.orbitCoordinates.get();return{latitude:a.latitude+2*s*Xn*i,longitude:a.longitude-2*o*Xn}})()),{temperedX:o,temperedY:s}}onUp(e){e.preventDefault(),"lastTemperedX"in e.detail.attachedInfo&&"lastTemperedY"in e.detail.attachedInfo&&"timestamp"in e.detail.attachedInfo&&e.timeStamp-e.detail.attachedInfo.timestamp<60&&new sh(e.timeStamp,e.detail.attachedInfo.lastTemperedX,e.detail.attachedInfo.lastTemperedY,this.onMovementBound)}}});async function lh(r,e,t=!1){let i=new(await Gt).ThreeSpherical(e.distance,(90-(t?-1:1)*e.latitude)/Xn,((t?180:0)+e.longitude)/Xn);i.makeSafe(),r.position.setFromSpherical(i),r.lookAt(0,0,0)}function q4(){return xl.shareAllNewRenderers!=="auto"?(xl.shareAllNewRenderers||ah++,xl.shareAllNewRenderers!=="never"):ah<X4?(ah++,!1):(e2=!0,!0)}function t2(){return e2}var ah,X4,e2,Es,bf=S(()=>{qy();Ro();jy();Gr();na();$d();qn();wi();Yy();rh();ys();Zy();Jy();ah=0,X4=2,e2=!1;Es=class extends oi{scene=null;stats=null;rendererIsShared=q4();loadingElement=null;model;options;constructor(e,t,i){super(),this.model=e,this.options=i,this.scene=t??null,this.loadingElement=this.addElement(document.createElement("div")),this.loadingElement.classList.add("loading"),xl.showRenderStats&&(this.stats=new xf,this.stats.dom.style.position="absolute",this.contentWrapper.appendChild(this.stats.dom))}async connectedCallback(){this.addCSS(nh),this.addElement((await this.canvasInfo()).canvas),this.#o(),new ResizeObserver(this.#o.bind(this)).observe(this.contentWrapper),this.orbitControls(),this.#e(),this.scheduleRender()}async#e(){(await this.#l()).addEventListener("press",(async t=>{await this.model.twistySceneModel.movePressInput.get()==="basic"&&this.dispatchEvent(new CustomEvent("press",{detail:{pressInfo:t.detail,cameraPromise:this.camera()}}))}))}#t=new Rr;async clearCanvas(){if(this.rendererIsShared){let e=await this.canvasInfo();e.context.clearRect(0,0,e.canvas.width,e.canvas.height)}else{let t=(await this.renderer()).getContext();t.clear(t.COLOR_BUFFER_BIT)}}#i=0;#n=0;async#o(){let e=await this.#t.queue(this.camera()),t=this.contentWrapper.clientWidth,i=this.contentWrapper.clientHeight;this.#i=t,this.#n=i;let n=0,o=0,s=0;if(i>t&&(s=i-t,o=-Math.floor(.5*s)),e.aspect=t/i,e.setViewOffset(t,i-s,n,o,t,i),e.updateProjectionMatrix(),this.clearCanvas(),this.rendererIsShared){let a=await this.canvasInfo();a.canvas.width=t*Sl(),a.canvas.height=i*Sl(),a.canvas.style.width=`${t.toString()}px`,a.canvas.style.height=`${i.toString()}px`}else(await this.renderer()).setSize(t,i,!0);this.scheduleRender()}#r=null;async renderer(){if(this.rendererIsShared)throw new Error("renderer expected to be shared.");return this.#r??=Ef()}#s=null;async canvasInfo(){return this.#s??=(async()=>{let e;if(this.rendererIsShared)e=this.addElement(document.createElement("canvas"));else{let i=await this.renderer();e=this.addElement(i.domElement)}this.loadingElement?.remove();let t=e.getContext("2d");return{canvas:e,context:t}})()}#a=null;async#l(){return this.#a??=(async()=>{let e=new vf((await this.canvasInfo()).canvas);return this.model?.twistySceneModel.dragInput.addFreshListener(t=>{let i=!1;switch(t){case"auto":{e.start(),i=!0;break}case"none":{e.stop();break}}this.contentWrapper.classList.toggle("drag-input-enabled",i)}),e})()}#u=null;async camera(){return this.#u??=(async()=>{let e=new(await Gt).ThreePerspectiveCamera(20,1,.1,20);return e.position.copy(new(await Gt).ThreeVector3(2,4,4).multiplyScalar(this.options?.backView?-1:1)),e.lookAt(0,0,0),e})()}#p=null;async orbitControls(){return this.#p??=(async()=>{let e=new Mf(this.model,!!this.options?.backView,(await this.canvasInfo()).canvas,await this.#l());return this.model&&this.addListener(this.model.twistySceneModel.orbitCoordinates,async t=>{let i=await this.camera();lh(i,t,this.options?.backView),this.scheduleRender()}),e})()}addListener(e,t){e.addFreshListener(t),this.#c.push(()=>{e.removeFreshListener(t)})}#c=[];disconnect(){for(let e of this.#c)e();this.#c=[]}#f=null;experimentalNextRenderFinishedCallback(e){this.#f=e}async render(){if(!this.scene)throw new Error("Attempted to render without a scene");this.stats?.begin();let[e,t,i]=await Promise.all([this.scene.scene(),this.camera(),this.canvasInfo()]);this.rendererIsShared?await Qy(this.#i,this.#n,i.canvas,e,t):(await this.renderer()).render(e,t),this.stats?.end(),this.#f?.(),this.#f=null}#d=new Ni(this.render.bind(this));scheduleRender(){this.#d.requestAnimFrame()}};jt.define("twisty-3d-vantage",Es)});function r2(r){return typeof r.faceletScale>"u"||r.faceletScale==="auto"?o_:r.faceletScale}function et(r,e){return new $i().setFromAxisAngle(r,Pi*e/4)}function c_(){return n2??(n2=new Fr(Vr.foundationWidth,Vr.foundationWidth,Vr.foundationWidth))}function uh(){let r=new ai,e=.5;return r.setAttribute("position",new Pt(new Float32Array([e,e,0,-e,e,0,e,-e,0,-e,e,0,-e,-e,0,e,-e,0]),3)),r.setAttribute("uv",new Pt(new Float32Array([1,1,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1,1]),2)),r}function u_(){return f_??=uh()}var i2,j4,Y4,Rf,Q4,Z4,$4,J4,e_,t_,jn,dn,lt,i_,Vr,r_,n_,o_,s_,a_,vt,tt,wf,l_,ch,El,fh,_f,n2,f_,Ms,ph=S(()=>{it();nn();Bn();ln();dl();Id();ml();ir();In();er();ll();bi();Dt();nf();Kn();Qd();yf();ys();bf();i2=new ds,j4=new ht({color:new Ue(6710886).convertLinearToSRGB()}),Y4=new ht({color:new Ue(13421772).convertLinearToSRGB(),side:dt,transparent:!0,opacity:.75}),Rf=new ht({visible:!1}),Q4=new ht({color:4513228}),Z4=new ht({color:4513228,side:dt,transparent:!0,opacity:.5}),$4=new ht({color:16776618}),J4=new ht({color:16775545,side:dt,transparent:!0,opacity:.5}),e_=new ht({color:15911883}),t_=new ht({color:15911883,side:dt,transparent:!0,opacity:.5}),jn=class{constructor(e,t,i,n,o,s){this.vector=e;this.fromZ=t;this.color=i;this.dimColor=n;this.hintOpacityScale=o;let a=new Ue(i).convertLinearToSRGB(),l=new Ue(n).convertLinearToSRGB();this.stickerMaterial={regular:new ht({color:a,side:qt}),dim:new ht({color:l,side:qt}),oriented:Q4,experimentalOriented2:$4,ignored:j4,invisible:Rf,mystery:e_},this.hintStickerMaterial={regular:new ht({color:new Ue(s?.hintColor??i).convertLinearToSRGB(),side:dt,transparent:!0,opacity:.5*o}),dim:new ht({color:new Ue(s?.hintDimColor??n).convertLinearToSRGB(),side:dt,transparent:!0,opacity:.5*o}),oriented:Z4,experimentalOriented2:J4,ignored:Y4,invisible:Rf,mystery:t_}}vector;fromZ;color;dimColor;hintOpacityScale;stickerMaterial;hintStickerMaterial},dn=[new jn(new I(0,1,0),new zt(-Pi/4,0,0),6528500,3561094,1),new jn(new I(-1,0,0),new zt(0,-Pi/4,0),15594232,8553864,1),new jn(new I(0,0,1),new zt(0,0,0),15754347,8664890,1),new jn(new I(1,0,0),new zt(0,Pi/4,0),16176989,8877619,1),new jn(new I(0,0,-1),new zt(0,Pi/2,0),16161360,8868908,1),new jn(new I(0,-1,0),new zt(Pi/4,0,0),5558176,3043672,1)],lt={U:0,L:1,F:2,R:3,B:4,D:5},i_={U:lt.U,u:lt.U,Uw:lt.U,Uv:lt.U,y:lt.U,L:lt.L,l:lt.L,Lw:lt.L,Lv:lt.L,M:lt.L,F:lt.F,f:lt.F,Fw:lt.F,Fv:lt.F,S:lt.F,z:lt.F,R:lt.R,r:lt.R,Rw:lt.R,Rv:lt.R,x:lt.R,B:lt.B,b:lt.B,Bw:lt.B,Bv:lt.B,D:lt.D,d:lt.D,Dw:lt.D,Dv:lt.D,E:lt.D},Vr={stickerElevation:.503,foundationWidth:1,defaultHintStickerElevation:1.45},r_=2,n_={showMainStickers:!0,hintFacelets:"floating",showFoundation:!0,experimentalStickeringMask:void 0,foundationSprite:null,hintSprite:null,initialHintFaceletsAnimation:"auto",faceletScale:"auto",hintFaceletsElevation:"auto"},o_=.85;s_=new ht({color:0,opacity:1,transparent:!0}),a_=new ht({color:0,opacity:.3,transparent:!0}),vt=class{constructor(e,t,i){this.orbit=e;let n=typeof t=="string"?t.split(""):t;this.stickerFaces=n.map(o=>lt[o]),this.matrix=new rt,this.matrix.setPosition(wf[e]),this.matrix.premultiply(new rt().makeRotationFromQuaternion(i))}orbit;matrix;stickerFaces};tt={O:new I(0,0,0),U:new I(0,-1,0),L:new I(1,0,0),F:new I(0,0,-1),R:new I(-1,0,0),B:new I(0,0,1),D:new I(0,1,0)},wf={EDGES:new I(0,1,1),CORNERS:new I(1,1,1),CENTERS:new I(0,1,0)},l_={EDGES:[0,1].map(r=>new rt().makeRotationAxis(wf.EDGES.clone().normalize(),-r*Pi/2)),CORNERS:[0,1,2].map(r=>new rt().makeRotationAxis(wf.CORNERS.clone().normalize(),-r*Pi/3)),CENTERS:[0,1,2,3].map(r=>new rt().makeRotationAxis(wf.CENTERS.clone().normalize(),-r*Pi/4))},ch=[lt.U,lt.F,lt.R],El={EDGES:[new vt("EDGES","UF",et(tt.O,0)),new vt("EDGES","UR",et(tt.U,3)),new vt("EDGES","UB",et(tt.U,2)),new vt("EDGES","UL",et(tt.U,1)),new vt("EDGES","DF",et(tt.F,2)),new vt("EDGES","DR",et(tt.F,2).premultiply(et(tt.D,1))),new vt("EDGES","DB",et(tt.F,2).premultiply(et(tt.D,2))),new vt("EDGES","DL",et(tt.F,2).premultiply(et(tt.D,3))),new vt("EDGES","FR",et(tt.U,3).premultiply(et(tt.R,3))),new vt("EDGES","FL",et(tt.U,1).premultiply(et(tt.R,3))),new vt("EDGES","BR",et(tt.U,3).premultiply(et(tt.R,1))),new vt("EDGES","BL",et(tt.U,1).premultiply(et(tt.R,1)))],CORNERS:[new vt("CORNERS","UFR",et(tt.O,0)),new vt("CORNERS","URB",et(tt.U,3)),new vt("CORNERS","UBL",et(tt.U,2)),new vt("CORNERS","ULF",et(tt.U,1)),new vt("CORNERS","DRF",et(tt.F,2).premultiply(et(tt.D,1))),new vt("CORNERS","DFL",et(tt.F,2).premultiply(et(tt.D,0))),new vt("CORNERS","DLB",et(tt.F,2).premultiply(et(tt.D,3))),new vt("CORNERS","DBR",et(tt.F,2).premultiply(et(tt.D,2)))],CENTERS:[new vt("CENTERS","U",et(tt.O,0)),new vt("CENTERS","L",et(tt.R,3).premultiply(et(tt.U,1))),new vt("CENTERS","F",et(tt.R,3)),new vt("CENTERS","R",et(tt.R,3).premultiply(et(tt.D,1))),new vt("CENTERS","B",et(tt.R,3).premultiply(et(tt.D,2))),new vt("CENTERS","D",et(tt.R,2))]},fh=1/3,_f={EDGES:[[[0,4,6],[0,4,5]],[[3,5,7],[0,7,5]],[[2,4,8],[0,10,5]],[[1,3,7],[0,1,5]],[[2,4,2],[2,4,3]],[[3,5,1],[2,7,3]],[[0,4,0],[2,10,3]],[[1,3,1],[2,1,3]],[[3,5,4],[3,6,4]],[[1,3,4],[1,2,4]],[[1,9,4],[1,8,4]],[[3,11,4],[3,0,4]]],CORNERS:[[[0,5,6],[0,5,5],[0,6,5]],[[3,5,8],[0,8,5],[0,9,5]],[[2,3,8],[0,11,5],[0,0,5]],[[1,3,6],[0,2,5],[0,3,5]],[[3,5,2],[2,6,3],[2,5,3]],[[2,3,2],[2,3,3],[2,2,3]],[[1,3,0],[2,0,3],[2,11,3]],[[0,5,0],[2,9,3],[2,8,3]]],CENTERS:[[[0,4,7]],[[0,1,4]],[[0,4,4]],[[0,7,4]],[[0,10,4]],[[0,4,1]]]},n2=null;Ms=class extends Ut{constructor(t,i,n={}){super();this.kpuzzle=t;this.scheduleRenderCallback=i;if(this.options={...n_},Object.assign(this.options,n),this.kpuzzle.name()!=="3x3x3")throw new Error(`Invalid puzzle for this Cube3D implementation: ${this.kpuzzle.name()}`);n.foundationSprite&&this.setSprite(n.foundationSprite),n.hintSprite&&this.setHintSprite(n.hintSprite),this.kpuzzleFaceletInfo={};for(let o in El){let s=[];this.kpuzzleFaceletInfo[o]=s,this.pieces[o]=El[o].map(this.createCubie.bind(this,o,s))}this.scale.set(fh,fh,fh),this.options.experimentalStickeringMask&&this.setStickeringMask(this.options.experimentalStickeringMask),this.#l(),this.options.faceletScale&&this.experimentalSetFaceletScale(this.options.faceletScale),typeof this.options.hintFaceletsElevation<"u"&&(this.#o=this.options.hintFaceletsElevation)}kpuzzle;scheduleRenderCallback;kpuzzleFaceletInfo;pieces={};options;experimentalHintStickerMeshes=[];experimentalFoundationMeshes=[];#e;sprite=new Promise(t=>{this.#e=i=>{i2.load(i,t)}});setSprite(t){this.sprite=t}#t;hintSprite=new Promise(t=>{this.#t=i=>{i2.load(i,t)}});setHintSprite(t){this.hintSprite=t}#i;#n(){return this.#i??=uh()}#o;setHintFaceletsElevation(t){t!==this.#o&&(this.#a=!0,this.#s(typeof t=="number"?t:Vr.defaultHintStickerElevation),this.#o=t)}#r=0;#s(t){this.#n().translate(0,0,t-this.#r),this.#r=t}#a=!1;async#l(){if(this.options.initialHintFaceletsAnimation==="none"||this.options.initialHintFaceletsAnimation!=="always"&&t2())return;let i=(typeof this.options.hintFaceletsElevation<"u"&&this.options.hintFaceletsElevation!=="auto"?this.options.hintFaceletsElevation:Vr.defaultHintStickerElevation)-Vr.stickerElevation;this.#s(Vr.stickerElevation),await new Promise(l=>setTimeout(l,500));let n=performance.now(),o=1e3;function s(l){return l*(2-l)}let a=()=>{if(this.#a)return;let l=performance.now()-n,c=Math.min(l/o,1),f=s(c)*i+Vr.stickerElevation;this.#s(f),this.scheduleRenderCallback?.(),l<o&&requestAnimationFrame(a)};a()}experimentalSetStickerSpriteURL(t){this.#e?.(t)}experimentalSetHintStickerSpriteURL(t){this.#t?.(t)}setStickeringMask(t){if(t.specialBehaviour==="picture"){for(let i of Object.values(this.kpuzzleFaceletInfo))for(let n of i)for(let o of n){o.facelet.material=Rf;let{hintFacelet:s}=o;s&&(s.material=Rf)}return}this.options.experimentalStickeringMask=t;for(let[i,n]of Object.entries(t.orbits))for(let o=0;o<n.pieces.length;o++){let s=n.pieces[o];if(s){let a=this.kpuzzleFaceletInfo[i][o];for(let l=0;l<a.length;l++){let c=s.facelets[l];if(c){let f=a[l],u=typeof c=="string"?c:c?.mask;f.facelet.material=dn[f.faceIdx].stickerMaterial[u];let p=typeof c=="string"?u:c.hintMask??u;f.hintFacelet&&(f.hintFacelet.material=dn[f.faceIdx].hintStickerMaterial[p])}}}}this.scheduleRenderCallback&&this.scheduleRenderCallback()}experimentalUpdateOptions(t){if("showMainStickers"in t)throw new Error("Unimplemented");let i=t.showFoundation;if(typeof i<"u"&&this.options.showFoundation!==i){this.options.showFoundation=i;for(let l of this.experimentalFoundationMeshes)l.visible=i}let n=t.hintFacelets;if(typeof n<"u"&&this.options.hintFacelets!==n&&gf[n]){this.options.hintFacelets=n;for(let l of this.experimentalHintStickerMeshes)l.visible=n==="floating";this.scheduleRenderCallback()}let{experimentalStickeringMask:o}=t;typeof o<"u"&&(this.options.experimentalStickeringMask=o,this.setStickeringMask(o),this.scheduleRenderCallback());let{faceletScale:s}=t;typeof s<"u"&&this.experimentalSetFaceletScale(s);let{hintFaceletsElevation:a}=t;typeof a<"u"&&this.setHintFaceletsElevation(a)}onPositionChange(t){let i=t.pattern;for(let n in El){let o=El[n];for(let s=0;s<o.length;s++){let a=i.patternData[n].pieces[s];this.pieces[n][a].matrix.copy(El[n][s].matrix),this.pieces[n][a].matrix.multiply(l_[n][i.patternData[n].orientation[s]])}for(let s of t.movesInProgress){let a=s.move,l=dn[i_[a.family]].vector,c=new rt().makeRotationAxis(l,-this.ease(s.fraction)*s.direction*a.amount*Pi/4);for(let f=0;f<o.length;f++){let u=this.kpuzzle.moveToTransformation(a.modified({amount:1})),p=u.transformationData[n].permutation[f];if(f!==p||u.transformationData[n].orientationDelta[f]!==0){let d=i.patternData[n].pieces[f];this.pieces[n][d].matrix.premultiply(c)}}}}this.scheduleRenderCallback()}createCubie(t,i,n,o){let s=[];i.push(s);let a=new vr;if(this.options.showFoundation){let l=this.createCubieFoundation();a.add(l),this.experimentalFoundationMeshes.push(l)}for(let l=0;l<n.stickerFaces.length;l++){let c=this.createSticker(dn[ch[l]],dn[n.stickerFaces[l]],!1),f={faceIdx:n.stickerFaces[l],facelet:c};if(a.add(c),this.options.hintFacelets==="floating"){let u=this.createSticker(dn[ch[l]],dn[n.stickerFaces[l]],!0);a.add(u),f.hintFacelet=u,this.experimentalHintStickerMeshes.push(u)}if(this.options.experimentalStickeringMask?.specialBehaviour==="picture"&&_f[t]&&_f[t][o]&&_f[t][o][l]){let[u,p,d]=_f[t][o][l];(async()=>{let m=async y=>{let g=await(y?this.hintSprite:this.sprite),h=this.createSticker(dn[ch[l]],dn[n.stickerFaces[l]],y);h.material=new ht({map:g,side:y?dt:si,transparent:!0});let w=p/12,b=(p+1)/12,v=d/9,P=(d+1)/9,D=new Ve(w,v),C=new Ve(w,P),k=new Ve(b,P),M=new Ve(b,v);switch(u){case 1:{[D,C,k,M]=[C,k,M,D];break}case 2:{[D,C,k,M]=[k,M,D,C];break}case 3:{[D,C,k,M]=[M,D,C,k];break}}h.geometry.setAttribute("uv",new Pt(new Float32Array([k.x,k.y,C.x,C.y,M.x,M.y,C.x,C.y,D.x,D.y,M.x,M.y]),2)),a.add(h)};m(!0),m(!1)})()}s.push(f)}return a.matrix.copy(n.matrix),a.matrixAutoUpdate=!1,this.add(a),a}createCubieFoundation(){let t=c_();return new kt(t,this.options.experimentalStickeringMask?.specialBehaviour==="picture"?s_:a_)}createSticker(t,i,n){let o=this.options.experimentalStickeringMask?.specialBehaviour==="picture"?uh():n?this.#n():u_(),s=new kt(o,n?i.hintStickerMaterial.regular:i.stickerMaterial.regular);s.setRotationFromEuler(t.fromZ),s.position.copy(t.vector);let a=n?typeof this.options.hintFaceletsElevation=="number"?this.options.hintFaceletsElevation:this.options.experimentalStickeringMask?.specialBehaviour==="picture"?r_:Vr.defaultHintStickerElevation:Vr.stickerElevation;n&&(this.#r=a);let l=r2(this.options);return s.scale.setX(l),s.scale.setY(l),s.translateZ(a-1),s}experimentalSetFoundationOpacity(t){this.experimentalFoundationMeshes[0].material.opacity=t}experimentalSetFaceletScale(t){this.options.faceletScale=t;for(let i of Object.values(this.kpuzzleFaceletInfo))for(let n of i)for(let o of n){let s=r2(this.options);o.facelet.scale.setX(s),o.facelet.scale.setY(s),o.hintFacelet?.scale.setX(s),o.hintFacelet?.scale.setY(s)}}ease(t){return hf(t)}}});function dh(r,e,t){return Math.hypot(r[3*e]-r[3*t],r[3*e+1]-r[3*t+1],r[3*e+2]-r[3*t+2])}function p_(r,e,t,i){let n=dh(r,e,t),o=dh(r,t,i),s=dh(r,e,i),a=(n+o+s)/2;return Math.sqrt(a*(a-n)*(a-o)*(a-s))}function d_(r){let e=0;for(let t=2;3*t<r.length;t++)e+=p_(r,0,1,t);return e}function h_(r){let e=Math.hypot(r[0],r[1],r[2]);return r[0]/=e,r[1]/=e,r[2]/=e,r}function m_(r,e){let t=new Array(3);return t[0]=r[1]*e[2]-r[2]*e[1],t[1]=r[2]*e[0]-r[0]*e[2],t[2]=r[0]*e[1]-r[1]*e[0],t}function g_(r){let e=[r[3]-r[0],r[4]-r[1],r[5]-r[2]],t=[r[6]-r[3],r[7]-r[4],r[8]-r[5]],i=m_(e,t);return h_(i)}function y_(r,e){let t=[],i=new Array(3),n=new Array(3);for(let o=1;o<10;o++){for(let a=0;a<r.length;a+=3){let l=(a+r.length-3)%r.length,c=(a+3)%r.length;for(let m=0;m<3;m++)i[m]=r[l+m]-r[a+m],n[m]=r[c+m]-r[a+m];let f=Math.hypot(i[0],i[1],i[2]),u=Math.hypot(n[0],n[1],n[2]);for(let m=0;m<3;m++)i[m]/=f,n[m]/=u;let p=i[0]*n[0]+i[1]*n[1]+i[2]*n[2],d=e/Math.sqrt(1-p*p);for(let m=0;m<3;m++)t[a+m]=r[a+m]+(i[m]+n[m])*d}let s=!0;for(let a=0;s&&a<t.length;a+=3){let l=(a+3)%r.length,c=0;for(let f=0;f<3;f++){let u=r[l+f]-r[a+f],p=t[l+f]-t[a+f];c+=u*p}c<=0&&(s=!1)}if(s)return t;e/=2}return r}var o2,Yn,Ml,Tf,hh,mh,gh,x_,hn,bs,yh=S(()=>{it();nn();Bn();ln();ml();ir();In();Dt();nf();Kn();ot();qi();Qd();ys();o2=new ht({side:si,color:0}),Yn=new ht({visible:!1}),Ml=new ht({vertexColors:!0});Tf=class{constructor(e,t){this.sz=e;this.tm=t;this.vertices=new Float32Array(9*e),this.uvs=void 0,this.colors=new Uint8Array(18*e),this.ind=new Uint8Array(e),this.pos=0,this.ipos=0}sz;tm;pos;ipos;vertices;colors;uvs;ind;add(e,t,i){this.vertices[this.pos]=e[3*t+0],this.vertices[this.pos+1]=e[3*t+1],this.vertices[this.pos+2]=e[3*t+2],this.colors[this.pos]=i>>16,this.colors[this.pos+1]=i>>8&255,this.colors[this.pos+2]=i&255,this.pos+=3}addUncolored(e,t){this.vertices[this.pos]=e[3*t+0],this.vertices[this.pos+1]=e[3*t+1],this.vertices[this.pos+2]=e[3*t+2],this.pos+=3}setind(e){this.ind[this.ipos++]=e}makePoly(e,t,i){let n=e;for(let o=1;3*(o+1)<n.length;o++)this.add(n,0,t),this.add(n,o,t),this.add(n,o+1,t),this.setind(i)}setAttributes(e){e.setAttribute("position",new Pt(this.vertices,3));let t=this.colors.subarray(0,9*this.sz);e.setAttribute("color",new Pt(t,3,!0))}makeGroups(e){e.clearGroups();for(let t=0;t<this.ipos;){let i=t++,n=this.ind[i];for(;this.ind[t]===n;)t++;e.addGroup(3*i,3*(t-i),n)}}saveOriginalColors(){this.colors.copyWithin(this.pos,0,this.pos)}},hh=class{origColor;origColorStickeringMask;faceColor;texturePtr=void 0;twistVal=-1;stickerStart;stickerEnd;hintStart;hintEnd;foundationStart;foundationEnd;isDup;faceNum;constructor(e,t,i,n){this.isDup=!!t.isDup,this.faceNum=t.face,this.stickerStart=e.ipos;let o=new Ue(t.color).getHex();this.origColor=o,this.origColorStickeringMask=o,n?.stickeringMask&&this.setStickeringMask(e,n.stickeringMask),this.faceColor=o;let s=this.stickerCoords(t.coords,i);e.makePoly(s,this.faceColor,this.isDup?4:0),this.stickerEnd=e.ipos}stickerCoords(e,t){return y_(e.slice(),t)}hintCoords(e,t,i,n){e=this.stickerCoords(e,i),n=n.slice();for(let s=0;s<3;s++)n[s]*=.5*t;let o=new Array(e.length);for(let s=0;3*s<e.length;s++){let a=e.length/3-1-s;o[3*s]=e[3*a]+n[0],o[3*s+1]=e[3*a+1]+n[1],o[3*s+2]=e[3*a+2]+n[2]}return o}foundationCoords(e){let t=e.slice();for(let i=0;i<e.length;i++)t[i]=e[i]*.999;return t}addHint(e,t,i,n,o,s){this.hintStart=e.ipos;let a=this.hintCoords(t.coords,n,o,s);e.makePoly(a,this.faceColor,i&&!this.isDup?2:4),this.hintEnd=e.ipos}addFoundation(e,t,i){this.foundationStart=e.ipos;let n=this.foundationCoords(t.coords);e.makePoly(n,i,this.isDup?4:6),this.foundationEnd=e.ipos}setHintStickers(e,t){let i=this.isDup||!t?4:2;for(let n=this.hintStart;n<this.hintEnd;n++)e.ind[n]=i|e.ind[n]&1}setStickeringMask(e,t){let i=0;switch(t){case"regular":{i=this.origColor;break}case"dim":{this.origColor===16777215?i=14540253:i=new Ue(this.origColor).multiplyScalar(.5).getHex();break}case"oriented":{i=4513228;break}case"experimentalOriented2":{i=16776618;break}case"ignored":{i=4473924;break}case"mystery":{i=15911883;break}case"invisible":i=this.origColor}this.origColorStickeringMask=i;for(let n=9*this.stickerStart;n<9*this.stickerEnd;n+=3)e.colors[e.pos+n]=i>>16,e.colors[e.pos+n+1]=i>>8&255,e.colors[e.pos+n+2]=i&255;for(let n=9*this.hintStart;n<9*this.hintEnd;n+=3)e.colors[e.pos+n]=i>>16,e.colors[e.pos+n+1]=i>>8&255,e.colors[e.pos+n+2]=i&255;this.setHintStickers(e,t!=="invisible"&&!this.isDup)}addUVs(e){let t=e.uvs,i=e.vertices,n=new Array(3);for(let o=3*this.stickerStart;o<3*this.stickerEnd;o++){n[0]=i[3*o],n[1]=i[3*o+1],n[2]=i[3*o+2];let s=e.tm.getuv(this.faceNum,n);t[2*o]=s[0],t[2*o+1]=s[1]}for(let o=3*this.hintStart;o<3*this.hintEnd;o++){n[0]=i[3*o],n[1]=i[3*o+1],n[2]=i[3*o+2];let s=e.tm.getuv(this.faceNum,n);t[2*o]=s[0],t[2*o+1]=s[1]}}setTexture(e,t){if(this.texturePtr===t)return 0;this.texturePtr=t;let i=6*e.sz;return e.uvs.copyWithin(6*this.stickerStart,6*t.stickerStart+i,6*t.stickerEnd+i),e.uvs.copyWithin(6*this.hintStart,6*t.hintStart+i,6*t.hintEnd+i),1}setColor(e,t){let i=t.origColorStickeringMask;if(this.faceColor!==i){this.faceColor=i;let n=e.pos;return e.colors.copyWithin(9*this.stickerStart,9*t.stickerStart+n,9*t.stickerEnd+n),e.colors.copyWithin(9*this.hintStart,9*t.hintStart+n,9*t.hintEnd+n),1}else return 0}},mh=class{cubie;geo;constructor(e,t,i){this.cubie=new vr;let n=e.coords,o=new Tf(n.length/3-2,t);for(let a=1;3*a+3<n.length;a++)o.addUncolored(n,0),o.addUncolored(n,a),o.addUncolored(n,a+1);this.geo=new ai,o.setAttributes(this.geo);let s=new kt(this.geo,Yn);s.userData.quantumMove=i.notationMapper.notationToExternal(new T(e.name)),this.cubie.scale.setScalar(.99),this.cubie.add(s)}},gh=class{axis;order;constructor(e){let t=e.coordinates;this.axis=new I(t[0],t[1],t[2]),this.order=e.order}},x_=.71,hn=.5,bs=class extends Ut{constructor(t,i,n,o=!1,s=!1,a=1,l=1,c={}){super();this.scheduleRenderCallback=t;this.kpuzzle=i;this.stickerDat=n;this.faceletScale=l;this.params=c;if(n.stickers.length===0)throw Error("Reuse of stickerdat from pg; please don't do that.");this.hintMaterial=new ht({vertexColors:!0,transparent:!0,opacity:.5}),this.hintMaterialDisposable=!0,this.stickerMaterial=Ml,this.stickerMaterialDisposable=!1,this.axesInfo={};let f=this.stickerDat.axis;for(let M of f)this.axesInfo[M.quantumMove.family]=new gh(M);let u=this.stickerDat.stickers;this.stickers={},this.materialArray1=new Array(8),this.materialArray2=new Array(8),this.showFoundation(o),o=!0;let p=0,d=3;for(let M of u){let x=M.coords.length/3;p+=d*(x-2)}let m=new Tf(p,n.textureMapper),y=0,g=[],h=0;for(let M of n.faces)g.push(g_(M.coords)),h+=d_(M.coords);let w=l!=="auto"?l*l:x_,b=0;for(let M of u)M.isDup||b++;let v=Math.sqrt(h/b)*(1-Math.sqrt(w))/2;for(let M of u){let x=M.orbit,R=M.ord,W=M.ori;this.stickers[x]||(this.stickers[x]=[]),this.stickers[x][W]||(this.stickers[x][W]=[]);let z={};c.stickeringMask&&(z.stickeringMask=cc(c.stickeringMask,x,R,W,!1));let O=new hh(m,M,v,z);this.stickers[x][W][R]=O}this.showHintStickers=s,s=!0;for(let M of u){let x=M.orbit,R=M.ord,W=M.ori;this.stickers[x][W][R].addHint(m,M,s,a,v,g[M.face])}this.foundationBound=m.ipos;for(let M of u){let x=M.orbit,R=M.ord,W=M.ori;o&&this.stickers[x][W][R].addFoundation(m,M,y)}let P=new ai;m.setAttributes(P),m.makeGroups(P);let D=new kt(P,this.materialArray1);D.scale.set(hn,hn,hn),this.add(D);let C=new kt(P,this.materialArray2);C.scale.set(hn,hn,hn),this.add(C);let k=this.stickerDat.faces;this.movingObj=C,this.fixedGeo=P,this.filler=m;for(let M of k){let x=new mh(M,n.textureMapper,this.stickerDat);x.cubie.scale.set(hn,hn,hn),this.add(x.cubie),this.controlTargets.push(x.cubie.children[0])}m.saveOriginalColors(),n.stickers=[],this.updateMaterialArrays()}scheduleRenderCallback;kpuzzle;stickerDat;faceletScale;params;stickers;axesInfo;stickerTargets=[];controlTargets=[];movingObj;filler;foundationBound;fixedGeo;lastPos;lastMoveTransformation;hintMaterial;stickerMaterial;materialArray1;materialArray2;textured=!1;showHintStickers=!1;showFoundations=!1;hintMaterialDisposable;stickerMaterialDisposable;#e=!1;dispose(){this.fixedGeo&&this.fixedGeo.dispose(),this.stickerMaterialDisposable&&(this.stickerMaterial.dispose(),this.stickerMaterial=Ml,this.stickerMaterialDisposable=!1),this.hintMaterialDisposable&&(this.hintMaterial.dispose(),this.hintMaterial=Ml,this.hintMaterialDisposable=!1)}experimentalGetStickerTargets(){return this.stickerTargets}experimentalGetControlTargets(){return this.controlTargets}#t(t){try{return this.kpuzzle.moveToTransformation(t),!0}catch{return!1}}getClosestMoveToAxis(t,i){let n=null,o=0,s=l=>l;switch(i.depth){case"secondSlice":{s=l=>l.modified({innerLayer:2});break}case"rotation":{s=l=>l.modified({family:`${l.family}v`});break}}for(let l of this.stickerDat.axis){let c=t.dot(new I(...l.coordinates));if(c>o){let f=this.stickerDat.notationMapper.notationToExternal(s(l.quantumMove));if(!f||(console.log(f.family),f.family==="T"&&i.depth==="none"))continue;this.#t(f)&&(o=c,n=f)}}if(!n)return null;i.invert&&(n=n.invert());let a=this.kpuzzle.moveToTransformation(n).repetitionOrder();return{move:n,order:a}}setStickeringMask(t){if(this.params.stickeringMask=t,t.specialBehaviour!=="picture")for(let i of this.kpuzzle.definition.orbits){let{numPieces:n,numOrientations:o}=i;for(let s=0;s<n;s++)for(let a=0;a<o;a++){let l=cc(t,i.orbitName,s,a,!1),c=this.stickers[i.orbitName][a][s];this.textured&&this.hintMaterialDisposable&&l==="invisible"||c.setStickeringMask(this.filler,l)}}this.#e=!0,this.lastPos&&this.onPositionChange(this.lastPos)}onPositionChange(t){let{pattern:i}=t,n=new zt;this.movingObj.rotation.copy(n);let o=0,s=this.filler,a=s.ind;if(!this.lastPos||this.#e||!this.lastPos.pattern.isIdentical(i)){for(let c in this.stickers){let f=this.stickers[c],u=i.patternData[c],p=f.length;if(p===1){let d=f[0];for(let m=0;m<d.length;m++){let y=u.pieces[m];this.textured?o+=d[m].setTexture(s,d[y]):o+=d[m].setColor(s,d[y])}}else for(let d=0;d<p;d++){let m=f[d];for(let y=0;y<m.length;y++){let g=(d+p-u.orientation[y])%p,h=u.pieces[y];this.textured?o+=m[y].setTexture(s,f[g][h]):o+=m[y].setColor(s,f[g][h])}}}this.lastPos=t}let l=0;for(let c of t.movesInProgress){let f=c.move,u=this.stickerDat.unswizzle(f);if(!u)return;let p=f,d;try{d=this.kpuzzle.moveToTransformation(p.modified({amount:1}))}catch(h){let w=this.stickerDat.notationMapper.notationToInternal(p);if(w){let b=this.stickerDat.notationMapper.notationToExternal(w.modified({amount:1}));b&&(d=this.kpuzzle.moveToTransformation(b))}if(!d)throw console.log(h),h}let m=this.axesInfo[u.family],y=m.axis,g=-this.ease(c.fraction)*c.direction*u.amount*Pi/m.order;if(this.movingObj.rotateOnAxis(y,g),this.lastMoveTransformation!==d){for(let h in this.stickers){let w=this.stickers[h],b=w.length,v=d.transformationData[h];for(let P=0;P<b;P++){let D=w[P];for(let C=0;C<D.length;C++){let k=D[C],M=v.permutation[C],x=0;if((M!==C||v.orientationDelta[C]!==0)&&(x=1),x!==k.twistVal){if(x){for(let R=k.stickerStart;R<k.stickerEnd;R++)a[R]|=1;for(let R=k.hintStart;R<k.hintEnd;R++)a[R]|=1;for(let R=k.foundationStart;R<k.foundationEnd;R++)a[R]|=1}else{for(let R=k.stickerStart;R<k.stickerEnd;R++)a[R]&=-2;for(let R=k.hintStart;R<k.hintEnd;R++)a[R]&=-2;for(let R=k.foundationStart;R<k.foundationEnd;R++)a[R]&=-2}k.twistVal=x,l++}}}}this.lastMoveTransformation=d}}(this.#e||l)&&this.filler.makeGroups(this.fixedGeo),(this.#e||o)&&(this.textured&&(this.fixedGeo.getAttribute("uv").addUpdateRange(0,6*this.foundationBound),this.fixedGeo.getAttribute("uv").needsUpdate=!0),(this.#e||!this.textured)&&(this.fixedGeo.getAttribute("color").addUpdateRange(0,9*this.foundationBound),this.fixedGeo.getAttribute("color").needsUpdate=!0)),this.scheduleRenderCallback(),this.#e=!1}ease(t){return hf(t)}showHintFacelets(t){this.showHintStickers=t}updateMaterialArrays(){for(let t=0;t<8;t++)this.materialArray1[t]=Yn,this.materialArray2[t]=Yn;this.materialArray1[0]=this.stickerMaterial,this.materialArray2[1]=this.stickerMaterial,this.showHintStickers?(this.materialArray1[2]=this.hintMaterial,this.materialArray2[3]=this.hintMaterial):(this.materialArray1[2]=Yn,this.materialArray2[3]=Yn),this.showFoundations?(this.materialArray1[6]=o2,this.materialArray2[7]=o2):(this.materialArray1[6]=Yn,this.materialArray2[7]=Yn)}showFoundation(t){this.showFoundations=t}setHintStickerOpacity(t){this.hintMaterialDisposable&&(this.hintMaterial.dispose(),this.hintMaterialDisposable=!1),t===0?this.hintMaterial=Yn:t===1?this.hintMaterial=this.stickerMaterial:(this.hintMaterial=new ht({vertexColors:!0,transparent:!0,opacity:t}),this.hintMaterialDisposable=!0)}experimentalUpdateOptions(t){t.hintFacelets!==void 0&&this.showHintFacelets(t.hintFacelets!=="none"),t.showFoundation!==void 0&&this.showFoundation(t.showFoundation),t.hintStickerOpacity!==void 0&&this.setHintStickerOpacity(t.hintStickerOpacity),this.#e=!0,this.lastPos&&this.onPositionChange(this.lastPos),typeof t.faceletScale<"u"&&t.faceletScale!==this.faceletScale&&console.warn("Dynamic facelet scale is not yet supported for PG3D. For now, re-create the TwistyPlayer to change the facelet scale."),this.updateMaterialArrays(),this.scheduleRenderCallback()}adduvs(){let t=this.filler;if(t.uvs)return;this.filler.uvs=new Float32Array(12*t.sz);for(let n in this.stickers){let o=this.stickers[n],s=o.length;for(let a=0;a<s;a++){let l=o[a];for(let c of l)c.addUVs(this.filler)}}t.uvs.copyWithin(6*t.sz,0,6*t.sz);let i=t.uvs.subarray(0,6*t.sz);this.fixedGeo.setAttribute("uv",new Pt(i,2,!0))}experimentalUpdateTexture(t,i,n){i||(t=!1),t&&!this.filler.uvs&&this.adduvs(),this.textured=t,this.stickerMaterialDisposable&&(this.stickerMaterial.dispose(),this.stickerMaterialDisposable=!1),t?(this.stickerMaterial=new ht({map:i,side:qt,transparent:!1}),this.stickerMaterialDisposable=!0):this.stickerMaterial=Ml,this.hintMaterialDisposable&&(this.hintMaterial.dispose(),this.hintMaterialDisposable=!1),t?(this.hintMaterial=new ht({map:n,side:qt,transparent:!0}),this.hintMaterialDisposable=!0):this.hintMaterial=Ml,t&&this.showHintFacelets(n!==null),this.updateMaterialArrays(),this.#e=!0,this.lastPos&&this.onPositionChange(this.lastPos),this.scheduleRenderCallback()}}});var _s,xh=S(()=>{it();er();ln();_s=class extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}});var Qn,s2,a2,Yt,ws=S(()=>{xh();Mi();bi();Dt();Qn=new I,s2=new Ve,a2=new Ve,Yt=class extends _s{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=al*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Wc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return al*2*Math.atan(Math.tan(Wc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z)}getViewSize(e,t){return this.getViewBounds(e,s2,a2),t.subVectors(a2,s2)}setViewOffset(e,t,i,n,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Wc*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,o=-.5*n,s=this.view;if(this.view!==null&&this.view.enabled){let l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*n/l,t-=s.offsetY*i/c,n*=s.width/l,i*=s.height/c}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}});function c2(r,e){return r.distance-e.distance}function Sh(r,e,t,i){let n=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){let o=r.children;for(let s=0,a=o.length;s<a;s++)Sh(o[s],e,t,!0)}}var l2,Af,f2=S(()=>{er();Gd();Zc();l2=new rt,Af=class{constructor(e,t,i=0,n=1/0){this.ray=new hs(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new On,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return l2.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(l2),this}intersectObject(e,t=!0,i=[]){return Sh(e,this,i,t),i.sort(c2),i}intersectObjects(e,t=!0,i=[]){for(let n=0,o=e.length;n<o;n++)Sh(e[n],this,i,t);return i.sort(c2),i}}});var Df,u2=S(()=>{Mi();Df=class{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}});var vh,S_,v_,Mr,Eh=S(()=>{Or();Dt();vh=new I,S_=new I,v_=new Fe,Mr=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=vh.subVectors(i,t).cross(S_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(vh),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/n;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||v_.getNormalMatrix(e),n=this.coplanarPoint(vh).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}});var xo,Cf,Rs,Mh=S(()=>{it();Dt();Yc();Eh();xo=new kn,Cf=new I,Rs=class{constructor(e=new Mr,t=new Mr,i=new Mr,n=new Mr,o=new Mr,s=new Mr){this.planes=[e,t,i,n,o,s]}set(e,t,i,n,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ci){let i=this.planes,n=e.elements,o=n[0],s=n[1],a=n[2],l=n[3],c=n[4],f=n[5],u=n[6],p=n[7],d=n[8],m=n[9],y=n[10],g=n[11],h=n[12],w=n[13],b=n[14],v=n[15];if(i[0].setComponents(l-o,p-c,g-d,v-h).normalize(),i[1].setComponents(l+o,p+c,g+d,v+h).normalize(),i[2].setComponents(l+s,p+f,g+m,v+w).normalize(),i[3].setComponents(l-s,p-f,g-m,v-w).normalize(),i[4].setComponents(l-a,p-u,g-y,v-b).normalize(),t===Ci)i[5].setComponents(l+a,p+u,g+y,v+b).normalize();else if(t===lo)i[5].setComponents(a,u,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xo)}intersectsSprite(e){return xo.center.set(0,0,0),xo.radius=.7071067811865476,xo.applyMatrix4(e.matrixWorld),this.intersectsSphere(xo)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(Cf.x=n.normal.x>0?e.max.x:e.min.x,Cf.y=n.normal.y>0?e.max.y:e.min.y,Cf.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Cf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}});function Lf(){let r=null,e=!1,t=null,i=null;function n(o,s){t(o,s),i=r.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}var bh=S(()=>{});function p2(r){let e=new WeakMap;function t(a,l){let c=a.array,f=a.usage,u=c.byteLength,p=r.createBuffer();r.bindBuffer(l,p),r.bufferData(l,c,f),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let f=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,f);else{u.sort((d,m)=>d.start-m.start);let p=0;for(let d=1;d<u.length;d++){let m=u[p],y=u[d];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++p,u[p]=y)}u.length=p+1;for(let d=0,m=u.length;d<m;d++){let y=u[d];r.bufferSubData(c,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:n,remove:o,update:s}}var d2=S(()=>{});var Ts,_h=S(()=>{Bn();nn();Ts=class r extends ai{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let o=e/2,s=t/2,a=Math.floor(i),l=Math.floor(n),c=a+1,f=l+1,u=e/a,p=t/l,d=[],m=[],y=[],g=[];for(let h=0;h<f;h++){let w=h*p-s;for(let b=0;b<c;b++){let v=b*u-o;m.push(v,-w,0),y.push(0,0,1),g.push(b/a),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let w=0;w<a;w++){let b=w+c*h,v=w+c*(h+1),P=w+1+c*(h+1),D=w+1+c*h;d.push(b,v,D),d.push(v,P,D)}this.setIndex(d),this.setAttribute("position",new Ji(m,3)),this.setAttribute("normal",new Ji(y,3)),this.setAttribute("uv",new Ji(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}}});function mn(r){let e={};for(let t in r){e[t]={};for(let i in r[t]){let n=r[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function gi(r){let e={};for(let t=0;t<r.length;t++){let i=mn(r[t]);for(let n in i)e[n]=i[n]}return e}function h2(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Pf(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}var m2,So=S(()=>{Ur();m2={clone:mn,merge:gi}});var g2,y2=S(()=>{g2=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`});var x2,S2=S(()=>{x2=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`});var Ri,As=S(()=>{hl();So();y2();S2();Ri=class extends Br{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=g2,this.fragmentShader=x2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mn(e.uniforms),this.uniformsGroups=h2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let s=this.uniforms[n].value;s&&s.isTexture?t.uniforms[n]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[n]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[n]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[n]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[n]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[n]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[n]={type:"m4",value:s.toArray()}:t.uniforms[n]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}});var v2,E2=S(()=>{v2=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`});var M2,b2=S(()=>{M2=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (\u03B1\u03C4)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids \u03B1\u03C4 == 0. Could also do \u03B1\u03C4 =1-\u03B1\u03C4
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`});var _2,w2=S(()=>{_2=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`});var R2,T2=S(()=>{R2=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`});var A2,D2=S(()=>{A2=`
#ifdef USE_ALPHATEST

	#ifdef ALPHA_TO_COVERAGE

	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;

	#else

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

#endif
`});var C2,L2=S(()=>{C2=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`});var P2,z2=S(()=>{P2=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`});var k2,N2=S(()=>{k2=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`});var I2,O2=S(()=>{I2=`
#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif

	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}

	float getIndirectIndex( const in int i ) {

		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );

	}

#endif

#ifdef USE_BATCHING_COLOR

	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {

		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;

	}

#endif
`});var F2,U2=S(()=>{F2=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif
`});var B2,G2=S(()=>{B2=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`});var V2,W2=S(()=>{V2=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`});var H2,K2=S(()=>{H2=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`});var X2,q2=S(()=>{X2=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`});var j2,Y2=S(()=>{j2=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`});var Q2,Z2=S(()=>{Q2=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#ifdef ALPHA_TO_COVERAGE

		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			if ( clipOpacity == 0.0 ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			float unionClipOpacity = 1.0;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			}
			#pragma unroll_loop_end

			clipOpacity *= 1.0 - unionClipOpacity;

		#endif

		diffuseColor.a *= clipOpacity;

		if ( diffuseColor.a == 0.0 ) discard;

	#else

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			bool clipped = true;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

			}
			#pragma unroll_loop_end

			if ( clipped ) discard;

		#endif

	#endif

#endif
`});var $2,J2=S(()=>{$2=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`});var ex,tx=S(()=>{ex=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`});var ix,rx=S(()=>{ix=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`});var nx,ox=S(()=>{nx=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`});var sx,ax=S(()=>{sx=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`});var lx,cx=S(()=>{lx=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	varying vec3 vColor;

#endif
`});var fx,ux=S(()=>{fx=`
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif

#ifdef USE_BATCHING_COLOR

	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );

	vColor.xyz *= batchingColor.xyz;

#endif
`});var px,dx=S(()=>{px=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`});var hx,mx=S(()=>{hx=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`});var gx,yx=S(()=>{gx=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`});var xx,Sx=S(()=>{xx=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`});var vx,Ex=S(()=>{vx=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`});var Mx,bx=S(()=>{Mx=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		emissiveColor = sRGBTransferEOTF( emissiveColor );

	#endif

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`});var _x,wx=S(()=>{_x=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`});var Rx,Tx=S(()=>{Rx=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`});var Ax,Dx=S(()=>{Ax=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`});var Cx,Lx=S(()=>{Cx=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`});var Px,zx=S(()=>{Px=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`});var kx,Nx=S(()=>{kx=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`});var Ix,Ox=S(()=>{Ix=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`});var Fx,Ux=S(()=>{Fx=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`});var Bx,Gx=S(()=>{Bx=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`});var Vx,Wx=S(()=>{Vx=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`});var Hx,Kx=S(()=>{Hx=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`});var Xx,qx=S(()=>{Xx=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`});var jx,Yx=S(()=>{jx=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`});var Qx,Zx=S(()=>{Qx=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`});var $x,Jx=S(()=>{$x=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`});var eS,tS=S(()=>{eS=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`});var iS,rS=S(()=>{iS=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if ( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`});var nS,oS=S(()=>{nS=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
`});var sS,aS=S(()=>{sS=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`});var lS,cS=S(()=>{lS=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`});var fS,uS=S(()=>{fS=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`});var pS,dS=S(()=>{pS=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`});var hS,mS=S(()=>{hS=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_DISPERSION

	material.dispersion = dispersion;

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`});var gS,yS=S(()=>{gS=`

struct PhysicalMaterial {

	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney\u2019s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );

		return saturate(v);

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from 
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;

	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

	return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

	return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Ag\xFCera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

	#endif

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

	#else

		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

	#endif

	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`});var xS,SS=S(()=>{xS=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`});var vS,ES=S(()=>{vS=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getIBLIrradiance( geometryNormal );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`});var MS,bS=S(()=>{MS=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`});var _S,wS=S(()=>{_S=`
#if defined( USE_LOGDEPTHBUF )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`});var RS,TS=S(()=>{RS=`
#if defined( USE_LOGDEPTHBUF )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`});var AS,DS=S(()=>{AS=`
#ifdef USE_LOGDEPTHBUF

	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`});var CS,LS=S(()=>{CS=`
#ifdef USE_LOGDEPTHBUF

	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

#endif
`});var PS,zS=S(()=>{PS=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`});var kS,NS=S(()=>{kS=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`});var IS,OS=S(()=>{IS=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`});var FS,US=S(()=>{FS=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`});var BS,GS=S(()=>{BS=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`});var VS,WS=S(()=>{VS=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`});var HS,KS=S(()=>{HS=`
#ifdef USE_INSTANCING_MORPH

	float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;

	}
#endif
`});var XS,qS=S(()=>{XS=`
#if defined( USE_MORPHCOLORS )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`});var jS,YS=S(()=>{jS=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`});var QS,ZS=S(()=>{QS=`
#ifdef USE_MORPHTARGETS

	#ifndef USE_INSTANCING_MORPH

		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	#endif

	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;

	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;

		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );

	}

#endif
`});var $S,JS=S(()=>{$S=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`});var e3,t3=S(()=>{e3=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`});var i3,r3=S(()=>{i3=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`});var n3,o3=S(()=>{n3=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`});var s3,a3=S(()=>{s3=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`});var l3,c3=S(()=>{l3=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`});var f3,u3=S(()=>{f3=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`});var p3,d3=S(()=>{p3=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`});var h3,m3=S(()=>{h3=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`});var g3,y3=S(()=>{g3=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`});var x3,S3=S(()=>{x3=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`});var v3,E3=S(()=>{v3=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`});var M3,b3=S(()=>{M3=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)
const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;

const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );

const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );

vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}

vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	// the 0.9999 tweak is unimportant, very tiny empirical improvement
	// return vec3( vuf * Inv255, gf * PackUpscale, bf * 0.9999 );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}

vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}

float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}

float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}

vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps orthographic depth in [ 0, 1 ] to viewZ
	return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps perspective depth in [ 0, 1 ] to viewZ
	return ( near * far ) / ( ( far - near ) * depth - far );
}
`});var _3,w3=S(()=>{_3=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`});var R3,T3=S(()=>{R3=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`});var A3,D3=S(()=>{A3=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`});var C3,L3=S(()=>{C3=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`});var P3,z3=S(()=>{P3=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`});var k3,N3=S(()=>{k3=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`});var I3,O3=S(()=>{I3=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		float hard_shadow = step( compare , distribution.x ); // Hard Shadow

		if (hard_shadow != 1.0 ) {

			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );

		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {

			// dp = normalized distance from light to fragment position
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
			dp += shadowBias;

			// bd3D = base direction 3D
			vec3 bd3D = normalize( lightToPosition );

			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );

			#else // no percentage-closer filtering

				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

			#endif

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

#endif
`});var F3,U3=S(()=>{F3=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`});var B3,G3=S(()=>{B3=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`});var V3,W3=S(()=>{V3=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`});var H3,K3=S(()=>{H3=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`});var X3,q3=S(()=>{X3=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`});var j3,Y3=S(()=>{j3=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`});var Q3,Z3=S(()=>{Q3=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`});var $3,J3=S(()=>{$3=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`});var ev,tv=S(()=>{ev=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`});var iv,rv=S(()=>{iv=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`});var nv,ov=S(()=>{nv=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 CineonToneMapping( vec3 color ) {

	// filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// AgX Tone Mapping implementation based on Filament, which in turn is based
// on Blender's implementation using rec 2020 primaries
// https://github.com/google/filament/pull/7236
// Inputs and outputs are encoded as Linear-sRGB.

vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	// LOG2_MIN      = -10.0
	// LOG2_MAX      =  +6.5
	// MIDDLE_GRAY   =  0.18
	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

	color *= toneMappingExposure;

	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	// Gamut mapping. Simple clamp for now.
	color = clamp( color, 0.0, 1.0 );

	return color;

}

// https://modelviewer.dev/examples/tone-mapping

vec3 NeutralToneMapping( vec3 color ) {

	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;

	color *= toneMappingExposure;

	float x = min( color.r, min( color.g, color.b ) );

	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

	color -= offset;

	float peak = max( color.r, max( color.g, color.b ) );

	if ( peak < StartCompression ) return color;

	float d = 1. - StartCompression;

	float newPeak = 1. - d * d / ( peak + d - StartCompression );

	color *= newPeak / peak;

	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );

	return mix( color, vec3( newPeak ), g );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`});var sv,av=S(()=>{sv=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`});var lv,cv=S(()=>{lv=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independant scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec4 transmittedLight;
		vec3 transmittance;

		#ifdef USE_DISPERSION

			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );

			for ( int i = 0; i < 3; i ++ ) {

				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				// Sample framebuffer to get pixel the refracted ray hits.
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;

				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];

			}

			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;

			// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;

			// Sample framebuffer to get pixel the refracted ray hits.
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif

		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job 
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`});var fv,uv=S(()=>{fv=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`});var pv,dv=S(()=>{pv=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`});var hv,mv=S(()=>{hv=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`});var gv,yv=S(()=>{gv=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`});var xv,Sv,vv=S(()=>{xv=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,Sv=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`});var Ev,Mv,bv=S(()=>{Ev=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,Mv=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`});var _v,wv,Rv=S(()=>{_v=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,wv=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`});var Tv,Av,Dv=S(()=>{Tv=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,Av=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#elif DEPTH_PACKING == 3202

		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );

	#elif DEPTH_PACKING == 3203

		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );

	#endif

}
`});var Cv,Lv,Pv=S(()=>{Cv=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,Lv=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`});var zv,kv,Nv=S(()=>{zv=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,kv=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`});var Iv,Ov,Fv=S(()=>{Iv=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,Ov=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`});var Uv,Bv,Gv=S(()=>{Uv=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,Bv=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`});var Vv,Wv,Hv=S(()=>{Vv=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Wv=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`});var Kv,Xv,qv=S(()=>{Kv=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,Xv=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`});var jv,Yv,Qv=S(()=>{jv=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,Yv=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`});var Zv,$v,Jv=S(()=>{Zv=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,$v=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`});var eE,tE,iE=S(()=>{eE=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,tE=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_DISPERSION
	uniform float dispersion;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`});var rE,nE,oE=S(()=>{rE=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,nE=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`});var sE,aE,lE=S(()=>{sE=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,aE=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`});var cE,fE,uE=S(()=>{cE=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,fE=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`});var pE,dE,hE=S(()=>{pE=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix[ 3 ];

	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,dE=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`});var je,wh=S(()=>{E2();b2();w2();T2();D2();L2();z2();N2();O2();U2();G2();W2();K2();q2();Y2();Z2();J2();tx();rx();ox();ax();cx();ux();dx();mx();yx();Sx();Ex();bx();wx();Tx();Dx();Lx();zx();Nx();Ox();Ux();Gx();Wx();Kx();qx();Yx();Zx();Jx();tS();rS();oS();aS();cS();uS();dS();mS();yS();SS();ES();bS();wS();TS();DS();LS();zS();NS();OS();US();GS();WS();KS();qS();YS();ZS();JS();t3();r3();o3();a3();c3();u3();d3();m3();y3();S3();E3();b3();w3();T3();D3();L3();z3();N3();O3();U3();G3();W3();K3();q3();Y3();Z3();J3();tv();rv();ov();av();cv();uv();dv();mv();yv();vv();bv();Rv();Dv();Pv();Nv();Fv();Gv();Hv();qv();Qv();Jv();iE();oE();lE();uE();hE();je={alphahash_fragment:v2,alphahash_pars_fragment:M2,alphamap_fragment:_2,alphamap_pars_fragment:R2,alphatest_fragment:A2,alphatest_pars_fragment:C2,aomap_fragment:P2,aomap_pars_fragment:k2,batching_pars_vertex:I2,batching_vertex:F2,begin_vertex:B2,beginnormal_vertex:V2,bsdfs:H2,iridescence_fragment:X2,bumpmap_pars_fragment:j2,clipping_planes_fragment:Q2,clipping_planes_pars_fragment:$2,clipping_planes_pars_vertex:ex,clipping_planes_vertex:ix,color_fragment:nx,color_pars_fragment:sx,color_pars_vertex:lx,color_vertex:fx,common:px,cube_uv_reflection_fragment:hx,defaultnormal_vertex:gx,displacementmap_pars_vertex:xx,displacementmap_vertex:vx,emissivemap_fragment:Mx,emissivemap_pars_fragment:_x,colorspace_fragment:Rx,colorspace_pars_fragment:Ax,envmap_fragment:Cx,envmap_common_pars_fragment:Px,envmap_pars_fragment:kx,envmap_pars_vertex:Ix,envmap_physical_pars_fragment:nS,envmap_vertex:Fx,fog_vertex:Bx,fog_pars_vertex:Vx,fog_fragment:Hx,fog_pars_fragment:Xx,gradientmap_pars_fragment:jx,lightmap_pars_fragment:Qx,lights_lambert_fragment:$x,lights_lambert_pars_fragment:eS,lights_pars_begin:iS,lights_toon_fragment:sS,lights_toon_pars_fragment:lS,lights_phong_fragment:fS,lights_phong_pars_fragment:pS,lights_physical_fragment:hS,lights_physical_pars_fragment:gS,lights_fragment_begin:xS,lights_fragment_maps:vS,lights_fragment_end:MS,logdepthbuf_fragment:_S,logdepthbuf_pars_fragment:RS,logdepthbuf_pars_vertex:AS,logdepthbuf_vertex:CS,map_fragment:PS,map_pars_fragment:kS,map_particle_fragment:IS,map_particle_pars_fragment:FS,metalnessmap_fragment:BS,metalnessmap_pars_fragment:VS,morphinstance_vertex:HS,morphcolor_vertex:XS,morphnormal_vertex:jS,morphtarget_pars_vertex:QS,morphtarget_vertex:$S,normal_fragment_begin:e3,normal_fragment_maps:i3,normal_pars_fragment:n3,normal_pars_vertex:s3,normal_vertex:l3,normalmap_pars_fragment:f3,clearcoat_normal_fragment_begin:p3,clearcoat_normal_fragment_maps:h3,clearcoat_pars_fragment:g3,iridescence_pars_fragment:x3,opaque_fragment:v3,packing:M3,premultiplied_alpha_fragment:_3,project_vertex:R3,dithering_fragment:A3,dithering_pars_fragment:C3,roughnessmap_fragment:P3,roughnessmap_pars_fragment:k3,shadowmap_pars_fragment:I3,shadowmap_pars_vertex:F3,shadowmap_vertex:B3,shadowmask_pars_fragment:V3,skinbase_vertex:H3,skinning_pars_vertex:X3,skinning_vertex:j3,skinnormal_vertex:Q3,specularmap_fragment:$3,specularmap_pars_fragment:ev,tonemapping_fragment:iv,tonemapping_pars_fragment:nv,transmission_fragment:sv,transmission_pars_fragment:lv,uv_pars_fragment:fv,uv_pars_vertex:pv,uv_vertex:hv,worldpos_vertex:gv,background_vert:xv,background_frag:Sv,backgroundCube_vert:Ev,backgroundCube_frag:Mv,cube_vert:_v,cube_frag:wv,depth_vert:Tv,depth_frag:Av,distanceRGBA_vert:Cv,distanceRGBA_frag:Lv,equirect_vert:zv,equirect_frag:kv,linedashed_vert:Iv,linedashed_frag:Ov,meshbasic_vert:Uv,meshbasic_frag:Bv,meshlambert_vert:Vv,meshlambert_frag:Wv,meshmatcap_vert:Kv,meshmatcap_frag:Xv,meshnormal_vert:jv,meshnormal_frag:Yv,meshphong_vert:Zv,meshphong_frag:$v,meshphysical_vert:eE,meshphysical_frag:tE,meshtoon_vert:rE,meshtoon_frag:nE,points_vert:sE,points_frag:aE,shadow_vert:cE,shadow_frag:fE,sprite_vert:pE,sprite_frag:dE}});var pe,Rh=S(()=>{ir();bi();Or();pe={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}}});var rr,Th=S(()=>{wh();So();bi();Dt();Rh();ir();Or();rr={basic:{uniforms:gi([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:gi([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:gi([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:gi([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:gi([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:gi([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:gi([pe.points,pe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:gi([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:gi([pe.common,pe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:gi([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:gi([pe.sprite,pe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:gi([pe.common,pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:gi([pe.lights,pe.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};rr.physical={uniforms:gi([rr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag}});function mE(r,e,t,i,n,o,s){let a=new Ue(0),l=o===!0?0:1,c,f,u=null,p=0,d=null;function m(w){let b=w.isScene===!0?w.background:null;return b&&b.isTexture&&(b=(w.backgroundBlurriness>0?t:e).get(b)),b}function y(w){let b=!1,v=m(w);v===null?h(a,l):v&&v.isColor&&(h(v,1),b=!0);let P=r.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(r.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(w,b){let v=m(b);v&&(v.isCubeTexture||v.mapping===Ln)?(f===void 0&&(f=new kt(new Fr(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:mn(rr.backgroundCube.uniforms),vertexShader:rr.backgroundCube.vertexShader,fragmentShader:rr.backgroundCube.fragmentShader,side:dt,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(P,D,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(f)),vo.copy(b.backgroundRotation),vo.x*=-1,vo.y*=-1,vo.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(vo.y*=-1,vo.z*=-1),f.material.uniforms.envMap.value=v,f.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(F_.makeRotationFromEuler(vo)),f.material.toneMapped=$e.getTransfer(v.colorSpace)!==at,(u!==v||p!==v.version||d!==r.toneMapping)&&(f.material.needsUpdate=!0,u=v,p=v.version,d=r.toneMapping),f.layers.enableAll(),w.unshift(f,f.geometry,f.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new kt(new Ts(2,2),new Ri({name:"BackgroundMaterial",uniforms:mn(rr.background.uniforms),vertexShader:rr.background.vertexShader,fragmentShader:rr.background.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=$e.getTransfer(v.colorSpace)!==at,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||p!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,p=v.version,d=r.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function h(w,b){w.getRGB(zf,Pf(r)),i.buffers.color.setClear(zf.r,zf.g,zf.b,b,s)}return{getClearColor:function(){return a},setClearColor:function(w,b=1){a.set(w),l=b,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,h(a,l)},render:y,addToRenderList:g}}var zf,vo,F_,gE=S(()=>{it();dl();_h();As();ir();Ur();In();er();Kn();Th();So();zf={r:0,b:0,g:0},vo=new zt,F_=new rt});function yE(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=p(null),o=n,s=!1;function a(x,R,W,z,O){let K=!1,V=u(z,W,R);o!==V&&(o=V,c(o.object)),K=d(x,z,W,O),K&&m(x,z,W,O),O!==null&&e.update(O,r.ELEMENT_ARRAY_BUFFER),(K||s)&&(s=!1,v(x,R,W,z),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function f(x){return r.deleteVertexArray(x)}function u(x,R,W){let z=W.wireframe===!0,O=i[x.id];O===void 0&&(O={},i[x.id]=O);let K=O[R.id];K===void 0&&(K={},O[R.id]=K);let V=K[z];return V===void 0&&(V=p(l()),K[z]=V),V}function p(x){let R=[],W=[],z=[];for(let O=0;O<t;O++)R[O]=0,W[O]=0,z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:W,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,R,W,z){let O=o.attributes,K=R.attributes,V=0,Z=W.getAttributes();for(let G in Z)if(Z[G].location>=0){let re=O[G],ue=K[G];if(ue===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ue=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ue=x.instanceColor)),re===void 0||re.attribute!==ue||ue&&re.data!==ue.data)return!0;V++}return o.attributesNum!==V||o.index!==z}function m(x,R,W,z){let O={},K=R.attributes,V=0,Z=W.getAttributes();for(let G in Z)if(Z[G].location>=0){let re=K[G];re===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(re=x.instanceColor));let ue={};ue.attribute=re,re&&re.data&&(ue.data=re.data),O[G]=ue,V++}o.attributes=O,o.attributesNum=V,o.index=z}function y(){let x=o.newAttributes;for(let R=0,W=x.length;R<W;R++)x[R]=0}function g(x){h(x,0)}function h(x,R){let W=o.newAttributes,z=o.enabledAttributes,O=o.attributeDivisors;W[x]=1,z[x]===0&&(r.enableVertexAttribArray(x),z[x]=1),O[x]!==R&&(r.vertexAttribDivisor(x,R),O[x]=R)}function w(){let x=o.newAttributes,R=o.enabledAttributes;for(let W=0,z=R.length;W<z;W++)R[W]!==x[W]&&(r.disableVertexAttribArray(W),R[W]=0)}function b(x,R,W,z,O,K,V){V===!0?r.vertexAttribIPointer(x,R,W,O,K):r.vertexAttribPointer(x,R,W,z,O,K)}function v(x,R,W,z){y();let O=z.attributes,K=W.getAttributes(),V=R.defaultAttributeValues;for(let Z in K){let G=K[Z];if(G.location>=0){let $=O[Z];if($===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&($=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&($=x.instanceColor)),$!==void 0){let re=$.normalized,ue=$.itemSize,ke=e.get($);if(ke===void 0)continue;let Ge=ke.buffer,Y=ke.type,ie=ke.bytesPerElement,me=Y===r.INT||Y===r.UNSIGNED_INT||$.gpuType===Ho;if($.isInterleavedBufferAttribute){let oe=$.data,Ae=oe.stride,Pe=$.offset;if(oe.isInstancedInterleavedBuffer){for(let B=0;B<G.locationSize;B++)h(G.location+B,oe.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let B=0;B<G.locationSize;B++)g(G.location+B);r.bindBuffer(r.ARRAY_BUFFER,Ge);for(let B=0;B<G.locationSize;B++)b(G.location+B,ue/G.locationSize,Y,re,Ae*ie,(Pe+ue/G.locationSize*B)*ie,me)}else{if($.isInstancedBufferAttribute){for(let oe=0;oe<G.locationSize;oe++)h(G.location+oe,$.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let oe=0;oe<G.locationSize;oe++)g(G.location+oe);r.bindBuffer(r.ARRAY_BUFFER,Ge);for(let oe=0;oe<G.locationSize;oe++)b(G.location+oe,ue/G.locationSize,Y,re,ue*ie,ue/G.locationSize*oe*ie,me)}}else if(V!==void 0){let re=V[Z];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(G.location,re);break;case 3:r.vertexAttrib3fv(G.location,re);break;case 4:r.vertexAttrib4fv(G.location,re);break;default:r.vertexAttrib1fv(G.location,re)}}}}w()}function P(){k();for(let x in i){let R=i[x];for(let W in R){let z=R[W];for(let O in z)f(z[O].object),delete z[O];delete R[W]}delete i[x]}}function D(x){if(i[x.id]===void 0)return;let R=i[x.id];for(let W in R){let z=R[W];for(let O in z)f(z[O].object),delete z[O];delete R[W]}delete i[x.id]}function C(x){for(let R in i){let W=i[R];if(W[x.id]===void 0)continue;let z=W[x.id];for(let O in z)f(z[O].object),delete z[O];delete W[x.id]}}function k(){M(),s=!0,o!==n&&(o=n,c(o.object))}function M(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:k,resetDefaultState:M,dispose:P,releaseStatesOfGeometry:D,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}var xE=S(()=>{it()});function SE(r,e,t){let i;function n(c){i=c}function o(c,f){r.drawArrays(i,c,f),t.update(f,i,1)}function s(c,f,u){u!==0&&(r.drawArraysInstanced(i,c,f,u),t.update(f,i,u))}function a(c,f,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,u);let d=0;for(let m=0;m<u;m++)d+=f[m];t.update(d,i,1)}function l(c,f,u,p){if(u===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)s(c[m],f[m],p[m]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,f,0,p,0,u);let m=0;for(let y=0;y<u;y++)m+=f[y]*p[y];t.update(m,i,1)}}this.setMode=n,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}var vE=S(()=>{});function EE(r,e,t,i){let n;function o(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(C){return!(C!==ri&&i.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let k=C===Pr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==pi&&i.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Si&&!k)}function l(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let u=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),h=r.getParameter(r.MAX_VERTEX_ATTRIBS),w=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,D=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:d,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:P,maxSamples:D}}var ME=S(()=>{it()});function bE(r){let e=this,t=null,i=0,n=!1,o=!1,s=new Mr,a=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){let d=u.length!==0||p||i!==0||n;return n=p,i=u.length,d},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,p){t=f(u,p,0)},this.setState=function(u,p,d){let m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,h=r.get(u);if(!n||m===null||m.length===0||o&&!g)o?f(null):c();else{let w=o?0:i,b=w*4,v=h.clippingState||null;l.value=v,v=f(m,p,b,d);for(let P=0;P!==b;++P)v[P]=t[P];h.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(u,p,d,m){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let h=d+y*4,w=p.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<h)&&(g=new Float32Array(h));for(let b=0,v=d;b!==y;++b,v+=4)s.copy(u[b]).applyMatrix4(w,a),s.normal.toArray(g,v),g[v+3]=s.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var _E=S(()=>{Or();Eh()});var kf,wE=S(()=>{uo();cn();it();Wn();Nd();kf=class extends Li{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);let n={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let o=new Bt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];let s=i.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,o=this.textures.length;n<o;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,n=e.textures.length;i<n;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ps(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}});var zi,Ds=S(()=>{wE();zi=class extends kf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}});var Cs,Ls,Nf,RE=S(()=>{it();ln();ws();Cs=-90,Ls=1,Nf=class extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Yt(Cs,Ls,e,t);n.layers=this.layers,this.add(n);let o=new Yt(Cs,Ls,e,t);o.layers=this.layers,this.add(o);let s=new Yt(Cs,Ls,e,t);s.layers=this.layers,this.add(s);let a=new Yt(Cs,Ls,e,t);a.layers=this.layers,this.add(a);let l=new Yt(Cs,Ls,e,t);l.layers=this.layers,this.add(l);let c=new Yt(Cs,Ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,o,s,a,l]=t;for(let c of t)this.remove(c);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,l,c,f]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,o),e.setRenderTarget(i,1,n),e.render(t,s),e.setRenderTarget(i,2,n),e.render(t,a),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,n),e.render(t,f),e.setRenderTarget(u,p,d),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}});var Ps,Ah=S(()=>{cn();it();Ps=class extends Bt{constructor(e,t,i,n,o,s,a,l,c,f){e=e!==void 0?e:[],t=t!==void 0?t:pr,super(e,t,i,n,o,s,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}});var If,TE=S(()=>{it();Kn();dl();As();So();Ds();RE();Ah();If=class extends zi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new Ps(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:xi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Fr(5,5,5),o=new Ri({name:"CubemapFromEquirect",uniforms:mn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dt,blending:Yi});o.uniforms.tEquirect.value=t;let s=new kt(n,o),a=t.minFilter;return t.minFilter===hr&&(t.minFilter=xi),new Nf(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,n){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,n);e.setRenderTarget(o)}}});function AE(r){let e=new WeakMap;function t(s,a){return a===Ca?s.mapping=pr:a===La&&(s.mapping=Lr),s}function i(s){if(s&&s.isTexture){let a=s.mapping;if(a===Ca||a===La)if(e.has(s)){let l=e.get(s).texture;return t(l,s.mapping)}else{let l=s.image;if(l&&l.height>0){let c=new If(l.height);return c.fromEquirectangularTexture(r,s),e.set(s,c),s.addEventListener("dispose",n),t(c.texture,s.mapping)}else return null}}return s}function n(s){let a=s.target;a.removeEventListener("dispose",n);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}var DE=S(()=>{it();TE()});var Of,CE=S(()=>{xh();Of=class extends _s{constructor(e=-1,t=1,i=1,n=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,o=i-e,s=i+e,a=n+t,l=n-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}});function U_(r){let e=[],t=[],i=[],n=r,o=r-ks+1+LE.length;for(let s=0;s<o;s++){let a=Math.pow(2,n);t.push(a);let l=1/a;s>r-ks?l=LE[s-r+ks-1]:s===0&&(l=0),i.push(l);let c=1/(a-2),f=-c,u=1+c,p=[f,f,u,f,u,u,f,f,u,u,f,u],d=6,m=6,y=3,g=2,h=1,w=new Float32Array(y*m*d),b=new Float32Array(g*m*d),v=new Float32Array(h*m*d);for(let D=0;D<d;D++){let C=D%3*2/3-1,k=D>2?0:-1,M=[C,k,0,C+2/3,k,0,C+2/3,k+1,0,C,k,0,C+2/3,k+1,0,C,k+1,0];w.set(M,y*m*D),b.set(p,g*m*D);let x=[D,D,D,D,D,D];v.set(x,h*m*D)}let P=new ai;P.setAttribute("position",new Pt(w,y)),P.setAttribute("uv",new Pt(b,g)),P.setAttribute("faceIndex",new Pt(v,h)),e.push(P),n>ks&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function kE(r,e,t){let i=new zi(r,e,t);return i.texture.mapping=Ln,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ff(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function B_(r,e,t){let i=new Float32Array(Mo),n=new I(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:Mo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function NE(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function IE(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function kh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var ks,LE,Mo,Dh,PE,Ch,Lh,Ph,zh,Eo,zs,zE,bl,OE=S(()=>{it();nn();Bn();Kn();CE();ws();As();Dt();ir();Ds();ml();dl();ks=4,LE=[.125,.215,.35,.446,.526,.582],Mo=20,Dh=new Of,PE=new Ue,Ch=null,Lh=0,Ph=0,zh=!1,Eo=(1+Math.sqrt(5))/2,zs=1/Eo,zE=[new I(-Eo,zs,0),new I(Eo,zs,0),new I(-zs,0,Eo),new I(zs,0,Eo),new I(0,Eo,-zs),new I(0,Eo,zs),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],bl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){Ch=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,n,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=IE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=NE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ch,Lh,Ph),this._renderer.xr.enabled=zh,e.scissorTest=!1,Ff(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pr||e.mapping===Lr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ch=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:Pr,format:ri,colorSpace:gr,depthBuffer:!1},n=kE(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kE(e,t,i);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=U_(o)),this._blurMaterial=B_(o,e,t)}return n}_compileMaterial(e){let t=new kt(this._lodPlanes[0],e);this._renderer.compile(t,Dh)}_sceneToCubeUV(e,t,i,n){let a=new Yt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(PE),f.toneMapping=Qi,f.autoClear=!1;let d=new ht({name:"PMREM.Background",side:dt,depthWrite:!1,depthTest:!1}),m=new kt(new Fr,d),y=!1,g=e.background;g?g.isColor&&(d.color.copy(g),e.background=null,y=!0):(d.color.copy(PE),y=!0);for(let h=0;h<6;h++){let w=h%3;w===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):w===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));let b=this._cubeSize;Ff(n,w*b,h>2?b:0,b,b),f.setRenderTarget(n),y&&f.render(m,a),f.render(e,a)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=u,e.background=g}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===pr||e.mapping===Lr;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=IE()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=NE());let o=n?this._cubemapMaterial:this._equirectMaterial,s=new kt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;let l=this._cubeSize;Ff(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(s,Dh)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodPlanes.length;for(let o=1;o<n;o++){let s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=zE[(n-o-1)%zE.length];this._blur(e,o-1,o,s,a)}t.autoClear=i}_blur(e,t,i,n,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,n,"latitudinal",o),this._halfBlur(s,e,i,i,n,"longitudinal",o)}_halfBlur(e,t,i,n,o,s,a){let l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let f=3,u=new kt(this._lodPlanes[n],c),p=c.uniforms,d=this._sizeLods[i]-1,m=isFinite(o)?Math.PI/(2*d):2*Math.PI/(2*Mo-1),y=o/m,g=isFinite(o)?1+Math.floor(f*y):Mo;g>Mo&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Mo}`);let h=[],w=0;for(let C=0;C<Mo;++C){let k=C/y,M=Math.exp(-k*k/2);h.push(M),C===0?w+=M:C<g&&(w+=2*M)}for(let C=0;C<h.length;C++)h[C]=h[C]/w;p.envMap.value=e.texture,p.samples.value=g,p.weights.value=h,p.latitudinal.value=s==="latitudinal",a&&(p.poleAxis.value=a);let{_lodMax:b}=this;p.dTheta.value=m,p.mipInt.value=b-i;let v=this._sizeLods[n],P=3*v*(n>b-ks?n-b+ks:0),D=4*(this._cubeSize-v);Ff(t,P,D,3*v,2*v),l.setRenderTarget(t),l.render(u,Dh)}}});function FE(r){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ca||l===La,f=l===pr||l===Lr;if(c||f){let u=e.get(a),p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new bl(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return c&&d&&d.height>0||f&&d&&n(d)?(t===null&&(t=new bl(r)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function n(a){let l=0,c=6;for(let f=0;f<c;f++)a[f]!==void 0&&l++;return l===c}function o(a){let l=a.target;l.removeEventListener("dispose",o);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}var UE=S(()=>{it();OE()});function BE(r){let e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=r.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let n=t(i);return n===null&&po("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}var GE=S(()=>{Un()});function VE(r,e,t,i){let n={},o=new WeakMap;function s(u){let p=u.target;p.index!==null&&e.remove(p.index);for(let m in p.attributes)e.remove(p.attributes[m]);for(let m in p.morphAttributes){let y=p.morphAttributes[m];for(let g=0,h=y.length;g<h;g++)e.remove(y[g])}p.removeEventListener("dispose",s),delete n[p.id];let d=o.get(p);d&&(e.remove(d),o.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(u,p){return n[p.id]===!0||(p.addEventListener("dispose",s),n[p.id]=!0,t.memory.geometries++),p}function l(u){let p=u.attributes;for(let m in p)e.update(p[m],r.ARRAY_BUFFER);let d=u.morphAttributes;for(let m in d){let y=d[m];for(let g=0,h=y.length;g<h;g++)e.update(y[g],r.ARRAY_BUFFER)}}function c(u){let p=[],d=u.index,m=u.attributes.position,y=0;if(d!==null){let w=d.array;y=d.version;for(let b=0,v=w.length;b<v;b+=3){let P=w[b+0],D=w[b+1],C=w[b+2];p.push(P,D,D,C,C,P)}}else if(m!==void 0){let w=m.array;y=m.version;for(let b=0,v=w.length/3-1;b<v;b+=3){let P=b+0,D=b+1,C=b+2;p.push(P,D,D,C,C,P)}}else return;let g=new(Jc(p)?rs:is)(p,1);g.version=y;let h=o.get(u);h&&e.remove(h),o.set(u,g)}function f(u){let p=o.get(u);if(p){let d=u.index;d!==null&&p.version<d.version&&c(u)}else c(u);return o.get(u)}return{get:a,update:l,getWireframeAttribute:f}}var WE=S(()=>{nn();Un()});function HE(r,e,t){let i;function n(p){i=p}let o,s;function a(p){o=p.type,s=p.bytesPerElement}function l(p,d){r.drawElements(i,d,o,p*s),t.update(d,i,1)}function c(p,d,m){m!==0&&(r.drawElementsInstanced(i,d,o,p*s,m),t.update(d,i,m))}function f(p,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,o,p,0,m);let g=0;for(let h=0;h<m;h++)g+=d[h];t.update(g,i,1)}function u(p,d,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<p.length;h++)c(p[h]/s,d[h],y[h]);else{g.multiDrawElementsInstancedWEBGL(i,d,0,o,p,0,y,0,m);let h=0;for(let w=0;w<m;w++)h+=d[w]*y[w];t.update(h,i,1)}}this.setMode=n,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=u}var KE=S(()=>{});function XE(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=a*(o/3);break;case r.LINES:t.lines+=a*(o/2);break;case r.LINE_STRIP:t.lines+=a*(o-1);break;case r.LINE_LOOP:t.lines+=a*o;break;case r.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}var qE=S(()=>{});var Ns,Nh=S(()=>{cn();it();Ns=class extends Bt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=ui,this.minFilter=ui,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}});function jE(r,e,t){let i=new WeakMap,n=new St;function o(s,a,l){let c=s.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=f!==void 0?f.length:0,p=i.get(a);if(p===void 0||p.count!==u){let M=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",M)};p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],b=0;d===!0&&(b=1),m===!0&&(b=2),y===!0&&(b=3);let v=a.attributes.position.count*b,P=1;v>e.maxTextureSize&&(P=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let D=new Float32Array(v*P*4*u),C=new Ns(D,v,P,u);C.type=Si,C.needsUpdate=!0;let k=b*4;for(let x=0;x<u;x++){let R=g[x],W=h[x],z=w[x],O=v*P*4*x;for(let K=0;K<R.count;K++){let V=K*k;d===!0&&(n.fromBufferAttribute(R,K),D[O+V+0]=n.x,D[O+V+1]=n.y,D[O+V+2]=n.z,D[O+V+3]=0),m===!0&&(n.fromBufferAttribute(W,K),D[O+V+4]=n.x,D[O+V+5]=n.y,D[O+V+6]=n.z,D[O+V+7]=0),y===!0&&(n.fromBufferAttribute(z,K),D[O+V+8]=n.x,D[O+V+9]=n.y,D[O+V+10]=n.z,D[O+V+11]=z.itemSize===4?n.w:1)}}p={count:u,texture:C,size:new Ve(v,P)},i.set(a,p),a.addEventListener("dispose",M)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let m=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}return{update:o}}var YE=S(()=>{it();Nh();Wn();bi()});function QE(r,e,t,i){let n=new WeakMap;function o(l){let c=i.render.frame,f=l.geometry,u=e.get(l,f);if(n.get(u)!==c&&(e.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),n.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;n.get(p)!==c&&(p.update(),n.set(p,c))}return u}function s(){n=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:s}}var ZE=S(()=>{});var Uf,$E=S(()=>{cn();it();Uf=class extends Bt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=ui,this.minFilter=ui,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}});var Is,Ih=S(()=>{cn();it();Is=class extends Bt{constructor(e,t,i,n,o,s,a,l,c,f=zr){if(f!==zr&&f!==kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===zr&&(i=Fi),i===void 0&&f===kr&&(i=mr),super(null,n,o,s,a,l,f,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ui,this.minFilter=l!==void 0?l:ui,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}});function Os(r,e,t){let i=r[0];if(i<=0||i>0)return r;let n=e*t,o=eM[n];if(o===void 0&&(o=new Float32Array(n),eM[n]=o),e!==0){i.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,r[s].toArray(o,a)}return o}function Qt(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Bf(r,e){let t=tM[e];t===void 0&&(t=new Int32Array(e),tM[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function G_(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function V_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function W_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Qt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function H_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function K_(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(Qt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Qt(t,i))return;nM.set(i),r.uniformMatrix2fv(this.addr,!1,nM),Zt(t,i)}}function X_(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(Qt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Qt(t,i))return;rM.set(i),r.uniformMatrix3fv(this.addr,!1,rM),Zt(t,i)}}function q_(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(Qt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Qt(t,i))return;iM.set(i),r.uniformMatrix4fv(this.addr,!1,iM),Zt(t,i)}}function j_(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Y_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function Q_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function Z_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function $_(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function J_(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function ew(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function tw(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function iw(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let o;this.type===r.SAMPLER_2D_SHADOW?(JE.compareFunction=Vc,o=JE):o=sM,t.setTexture2D(e||o,n)}function rw(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||lM,n)}function nw(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||cM,n)}function ow(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||aM,n)}function sw(r){switch(r){case 5126:return G_;case 35664:return V_;case 35665:return W_;case 35666:return H_;case 35674:return K_;case 35675:return X_;case 35676:return q_;case 5124:case 35670:return j_;case 35667:case 35671:return Y_;case 35668:case 35672:return Q_;case 35669:case 35673:return Z_;case 5125:return $_;case 36294:return J_;case 36295:return ew;case 36296:return tw;case 35678:case 36198:case 36298:case 36306:case 35682:return iw;case 35679:case 36299:case 36307:return rw;case 35680:case 36300:case 36308:case 36293:return nw;case 36289:case 36303:case 36311:case 36292:return ow}}function aw(r,e){r.uniform1fv(this.addr,e)}function lw(r,e){let t=Os(e,this.size,2);r.uniform2fv(this.addr,t)}function cw(r,e){let t=Os(e,this.size,3);r.uniform3fv(this.addr,t)}function fw(r,e){let t=Os(e,this.size,4);r.uniform4fv(this.addr,t)}function uw(r,e){let t=Os(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function pw(r,e){let t=Os(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function dw(r,e){let t=Os(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function hw(r,e){r.uniform1iv(this.addr,e)}function mw(r,e){r.uniform2iv(this.addr,e)}function gw(r,e){r.uniform3iv(this.addr,e)}function yw(r,e){r.uniform4iv(this.addr,e)}function xw(r,e){r.uniform1uiv(this.addr,e)}function Sw(r,e){r.uniform2uiv(this.addr,e)}function vw(r,e){r.uniform3uiv(this.addr,e)}function Ew(r,e){r.uniform4uiv(this.addr,e)}function Mw(r,e,t){let i=this.cache,n=e.length,o=Bf(t,n);Qt(i,o)||(r.uniform1iv(this.addr,o),Zt(i,o));for(let s=0;s!==n;++s)t.setTexture2D(e[s]||sM,o[s])}function bw(r,e,t){let i=this.cache,n=e.length,o=Bf(t,n);Qt(i,o)||(r.uniform1iv(this.addr,o),Zt(i,o));for(let s=0;s!==n;++s)t.setTexture3D(e[s]||lM,o[s])}function _w(r,e,t){let i=this.cache,n=e.length,o=Bf(t,n);Qt(i,o)||(r.uniform1iv(this.addr,o),Zt(i,o));for(let s=0;s!==n;++s)t.setTextureCube(e[s]||cM,o[s])}function ww(r,e,t){let i=this.cache,n=e.length,o=Bf(t,n);Qt(i,o)||(r.uniform1iv(this.addr,o),Zt(i,o));for(let s=0;s!==n;++s)t.setTexture2DArray(e[s]||aM,o[s])}function Rw(r){switch(r){case 5126:return aw;case 35664:return lw;case 35665:return cw;case 35666:return fw;case 35674:return uw;case 35675:return pw;case 35676:return dw;case 5124:case 35670:return hw;case 35667:case 35671:return mw;case 35668:case 35672:return gw;case 35669:case 35673:return yw;case 5125:return xw;case 36294:return Sw;case 36295:return vw;case 36296:return Ew;case 35678:case 36198:case 36298:case 36306:case 35682:return Mw;case 35679:case 36299:case 36307:return bw;case 35680:case 36300:case 36308:case 36293:return _w;case 36289:case 36303:case 36311:case 36292:return ww}}function oM(r,e){r.seq.push(e),r.map[e.id]=e}function Tw(r,e,t){let i=r.name,n=i.length;for(Oh.lastIndex=0;;){let o=Oh.exec(i),s=Oh.lastIndex,a=o[1],l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===n){oM(t,c===void 0?new Fh(a,r,e):new Uh(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Bh(a),oM(t,u)),t=u}}}var sM,JE,aM,lM,cM,eM,tM,iM,rM,nM,Fh,Uh,Bh,Oh,Zn,Gh=S(()=>{Ah();cn();Nh();$E();Ih();it();sM=new Bt,JE=new Is(1,1),aM=new Ns,lM=new Uf,cM=new Ps,eM=[],tM=[],iM=new Float32Array(16),rM=new Float32Array(9),nM=new Float32Array(4);Fh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sw(t.type)}},Uh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Rw(t.type)}},Bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let o=0,s=n.length;o!==s;++o){let a=n[o];a.setValue(e,t[a.id],i)}}},Oh=/(\w+)(\])?(\[|\.)?/g;Zn=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){let o=e.getActiveUniform(t,n),s=e.getUniformLocation(t,o.name);Tw(o,s,this)}}setValue(e,t,i,n){let o=this.map[t];o!==void 0&&o.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let o=0,s=t.length;o!==s;++o){let a=t[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,o=e.length;n!==o;++n){let s=e[n];s.id in t&&i.push(s)}return i}}});function Vh(r,e,t){let i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}var fM=S(()=>{});function Cw(r,e){let t=r.split(`
`),i=[],n=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=n;s<o;s++){let a=s+1;i.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return i.join(`
`)}function Lw(r){$e._getMatrix(uM,$e.workingColorSpace,r);let e=`mat3( ${uM.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(r)){case so:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function pM(r,e,t){let i=r.getShaderParameter(e,r.COMPILE_STATUS),n=r.getShaderInfoLog(e).trim();if(i&&n==="")return"";let o=/ERROR: 0:(\d+)/.exec(n);if(o){let s=parseInt(o[1]);return t.toUpperCase()+`

`+n+`

`+Cw(r.getShaderSource(e),s)}else return n}function Pw(r,e){let t=Lw(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zw(r,e){let t;switch(e){case Y1:t="Linear";break;case Q1:t="Reinhard";break;case Z1:t="Cineon";break;case $1:t="ACESFilmic";break;case ey:t="AgX";break;case ty:t="Neutral";break;case J1:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function kw(){$e.getLuminanceCoefficients(Gf);let r=Gf.x.toFixed(4),e=Gf.y.toFixed(4),t=Gf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Nw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_l).join(`
`)}function Iw(r){let e=[];for(let t in r){let i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ow(r,e){let t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let o=r.getActiveAttrib(e,n),s=o.name,a=1;o.type===r.FLOAT_MAT2&&(a=2),o.type===r.FLOAT_MAT3&&(a=3),o.type===r.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:r.getAttribLocation(e,s),locationSize:a}}return t}function _l(r){return r!==""}function dM(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hM(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Wh(r){return r.replace(Fw,Bw)}function Bw(r,e){let t=je[e];if(t===void 0){let i=Uw.get(e);if(i!==void 0)t=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Wh(t)}function mM(r){return r.replace(Gw,Vw)}function Vw(r,e,t,i){let n="";for(let o=parseInt(e);o<parseInt(t);o++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return n}function gM(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ww(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Mc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===A1?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ur&&(e="SHADOWMAP_TYPE_VSM"),e}function Hw(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case pr:case Lr:e="ENVMAP_TYPE_CUBE";break;case Ln:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Kw(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Lr&&(e="ENVMAP_MODE_REFRACTION"),e}function Xw(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Cc:e="ENVMAP_BLENDING_MULTIPLY";break;case q1:e="ENVMAP_BLENDING_MIX";break;case j1:e="ENVMAP_BLENDING_ADD";break}return e}function qw(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function yM(r,e,t,i){let n=r.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,l=Ww(t),c=Hw(t),f=Kw(t),u=Xw(t),p=qw(t),d=Nw(t),m=Iw(o),y=n.createProgram(),g,h,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(_l).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(_l).join(`
`),h.length>0&&(h+=`
`)):(g=[gM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_l).join(`
`),h=[gM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qi?"#define TONE_MAPPING":"",t.toneMapping!==Qi?je.tonemapping_pars_fragment:"",t.toneMapping!==Qi?zw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Pw("linearToOutputTexel",t.outputColorSpace),kw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_l).join(`
`)),s=Wh(s),s=dM(s,t),s=hM(s,t),a=Wh(a),a=dM(a,t),a=hM(a,t),s=mM(s),a=mM(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",t.glslVersion===bd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let b=w+g+s,v=w+h+a,P=Vh(n,n.VERTEX_SHADER,b),D=Vh(n,n.FRAGMENT_SHADER,v);n.attachShader(y,P),n.attachShader(y,D),t.index0AttributeName!==void 0?n.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(y,0,"position"),n.linkProgram(y);function C(R){if(r.debug.checkShaderErrors){let W=n.getProgramInfoLog(y).trim(),z=n.getShaderInfoLog(P).trim(),O=n.getShaderInfoLog(D).trim(),K=!0,V=!0;if(n.getProgramParameter(y,n.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,y,P,D);else{let Z=pM(n,P,"vertex"),G=pM(n,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(y,n.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+Z+`
`+G)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(z===""||O==="")&&(V=!1);V&&(R.diagnostics={runnable:K,programLog:W,vertexShader:{log:z,prefix:g},fragmentShader:{log:O,prefix:h}})}n.deleteShader(P),n.deleteShader(D),k=new Zn(n,y),M=Ow(n,y)}let k;this.getUniforms=function(){return k===void 0&&C(this),k};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=n.getProgramParameter(y,Aw)),x},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dw++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=D,this}var Aw,Dw,uM,Gf,Fw,Uw,Gw,xM=S(()=>{Gh();fM();wh();it();Ur();Dt();Or();Aw=37297,Dw=0;uM=new Fe;Gf=new I;Fw=/^[ \t]*#include +<([\w\d./]+)>/gm;Uw=new Map;Gw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g});var jw,Vf,Hh,SM=S(()=>{jw=0,Vf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),o=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Hh(e),t.set(e,i)),i}},Hh=class{constructor(e){this.id=jw++,this.code=e,this.usedTimes=0}}});function vM(r,e,t,i,n,o,s){let a=new On,l=new Vf,c=new Set,f=[],u=n.logarithmicDepthBuffer,p=n.vertexTextures,d=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,x,R,W,z){let O=W.fog,K=z.geometry,V=M.isMeshStandardMaterial?W.environment:null,Z=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),G=Z&&Z.mapping===Ln?Z.image.height:null,$=m[M.type];M.precision!==null&&(d=n.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let re=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ue=re!==void 0?re.length:0,ke=0;K.morphAttributes.position!==void 0&&(ke=1),K.morphAttributes.normal!==void 0&&(ke=2),K.morphAttributes.color!==void 0&&(ke=3);let Ge,Y,ie,me;if($){let yt=rr[$];Ge=yt.vertexShader,Y=yt.fragmentShader}else Ge=M.vertexShader,Y=M.fragmentShader,l.update(M),ie=l.getVertexShaderID(M),me=l.getFragmentShaderID(M);let oe=r.getRenderTarget(),Ae=r.state.buffers.depth.getReversed(),Pe=z.isInstancedMesh===!0,B=z.isBatchedMesh===!0,se=!!M.map,fe=!!M.matcap,de=!!Z,L=!!M.aoMap,Ke=!!M.lightMap,ze=!!M.bumpMap,nt=!!M.normalMap,Ne=!!M.displacementMap,Et=!!M.emissiveMap,Ie=!!M.metalnessMap,A=!!M.roughnessMap,E=M.anisotropy>0,H=M.clearcoat>0,ee=M.dispersion>0,ne=M.iridescence>0,J=M.sheen>0,De=M.transmission>0,ge=E&&!!M.anisotropyMap,ve=H&&!!M.clearcoatMap,ct=H&&!!M.clearcoatNormalMap,ae=H&&!!M.clearcoatRoughnessMap,Ee=ne&&!!M.iridescenceMap,Be=ne&&!!M.iridescenceThicknessMap,We=J&&!!M.sheenColorMap,Me=J&&!!M.sheenRoughnessMap,st=!!M.specularMap,Je=!!M.specularColorMap,Mt=!!M.specularIntensityMap,N=De&&!!M.transmissionMap,he=De&&!!M.thicknessMap,Q=!!M.gradientMap,te=!!M.alphaMap,Se=M.alphaTest>0,ye=!!M.alphaHash,Ye=!!M.extensions,Nt=Qi;M.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Nt=r.toneMapping);let li={shaderID:$,shaderType:M.type,shaderName:M.name,vertexShader:Ge,fragmentShader:Y,defines:M.defines,customVertexShaderID:ie,customFragmentShaderID:me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:B,batchingColor:B&&z._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&z.instanceColor!==null,instancingMorph:Pe&&z.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:oe===null?r.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:gr,alphaToCoverage:!!M.alphaToCoverage,map:se,matcap:fe,envMap:de,envMapMode:de&&Z.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:Ke,bumpMap:ze,normalMap:nt,displacementMap:p&&Ne,emissiveMap:Et,normalMapObjectSpace:nt&&M.normalMapType===sy,normalMapTangentSpace:nt&&M.normalMapType===oy,metalnessMap:Ie,roughnessMap:A,anisotropy:E,anisotropyMap:ge,clearcoat:H,clearcoatMap:ve,clearcoatNormalMap:ct,clearcoatRoughnessMap:ae,dispersion:ee,iridescence:ne,iridescenceMap:Ee,iridescenceThicknessMap:Be,sheen:J,sheenColorMap:We,sheenRoughnessMap:Me,specularMap:st,specularColorMap:Je,specularIntensityMap:Mt,transmission:De,transmissionMap:N,thicknessMap:he,gradientMap:Q,opaque:M.transparent===!1&&M.blending===en&&M.alphaToCoverage===!1,alphaMap:te,alphaTest:Se,alphaHash:ye,combine:M.combine,mapUv:se&&y(M.map.channel),aoMapUv:L&&y(M.aoMap.channel),lightMapUv:Ke&&y(M.lightMap.channel),bumpMapUv:ze&&y(M.bumpMap.channel),normalMapUv:nt&&y(M.normalMap.channel),displacementMapUv:Ne&&y(M.displacementMap.channel),emissiveMapUv:Et&&y(M.emissiveMap.channel),metalnessMapUv:Ie&&y(M.metalnessMap.channel),roughnessMapUv:A&&y(M.roughnessMap.channel),anisotropyMapUv:ge&&y(M.anisotropyMap.channel),clearcoatMapUv:ve&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:ct&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:We&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:Me&&y(M.sheenRoughnessMap.channel),specularMapUv:st&&y(M.specularMap.channel),specularColorMapUv:Je&&y(M.specularColorMap.channel),specularIntensityMapUv:Mt&&y(M.specularIntensityMap.channel),transmissionMapUv:N&&y(M.transmissionMap.channel),thicknessMapUv:he&&y(M.thicknessMap.channel),alphaMapUv:te&&y(M.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(nt||E),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(se||te),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ae,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:ke,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:Nt,decodeVideoTexture:se&&M.map.isVideoTexture===!0&&$e.getTransfer(M.map.colorSpace)===at,decodeVideoTextureEmissive:Et&&M.emissiveMap.isVideoTexture===!0&&$e.getTransfer(M.emissiveMap.colorSpace)===at,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===si,flipSided:M.side===dt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ye&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&M.extensions.multiDraw===!0||B)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return li.vertexUv1s=c.has(1),li.vertexUv2s=c.has(2),li.vertexUv3s=c.has(3),c.clear(),li}function h(M){let x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(let R in M.defines)x.push(R),x.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(w(x,M),b(x,M),x.push(r.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function w(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function b(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){let x=m[M.type],R;if(x){let W=rr[x];R=m2.clone(W.uniforms)}else R=M.uniforms;return R}function P(M,x){let R;for(let W=0,z=f.length;W<z;W++){let O=f[W];if(O.cacheKey===x){R=O,++R.usedTimes;break}}return R===void 0&&(R=new yM(r,x,M,o),f.push(R)),R}function D(M){if(--M.usedTimes===0){let x=f.indexOf(M);f[x]=f[f.length-1],f.pop(),M.destroy()}}function C(M){l.remove(M)}function k(){l.dispose()}return{getParameters:g,getProgramCacheKey:h,getUniforms:v,acquireProgram:P,releaseProgram:D,releaseShaderCache:C,programs:f,dispose:k}}var EM=S(()=>{it();Zc();xM();SM();Th();So();Ur()});function MM(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function i(s){r.delete(s)}function n(s,a,l){r.get(s)[a]=l}function o(){r=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:o}}var bM=S(()=>{});function Yw(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function _M(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function wM(){let r=[],e=0,t=[],i=[],n=[];function o(){e=0,t.length=0,i.length=0,n.length=0}function s(u,p,d,m,y,g){let h=r[e];return h===void 0?(h={id:u.id,object:u,geometry:p,material:d,groupOrder:m,renderOrder:u.renderOrder,z:y,group:g},r[e]=h):(h.id=u.id,h.object=u,h.geometry=p,h.material=d,h.groupOrder=m,h.renderOrder=u.renderOrder,h.z=y,h.group=g),e++,h}function a(u,p,d,m,y,g){let h=s(u,p,d,m,y,g);d.transmission>0?i.push(h):d.transparent===!0?n.push(h):t.push(h)}function l(u,p,d,m,y,g){let h=s(u,p,d,m,y,g);d.transmission>0?i.unshift(h):d.transparent===!0?n.unshift(h):t.unshift(h)}function c(u,p){t.length>1&&t.sort(u||Yw),i.length>1&&i.sort(p||_M),n.length>1&&n.sort(p||_M)}function f(){for(let u=e,p=r.length;u<p;u++){let d=r[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:n,init:o,push:a,unshift:l,finish:f,sort:c}}function RM(){let r=new WeakMap;function e(i,n){let o=r.get(i),s;return o===void 0?(s=new wM,r.set(i,[s])):n>=o.length?(s=new wM,o.push(s)):s=o[n],s}function t(){r=new WeakMap}return{get:e,dispose:t}}var TM=S(()=>{});function Qw(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ue};break;case"SpotLight":t={position:new I,direction:new I,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function Zw(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}function Jw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function AM(r){let e=new Qw,t=Zw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let n=new I,o=new rt,s=new rt;function a(c){let f=0,u=0,p=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let d=0,m=0,y=0,g=0,h=0,w=0,b=0,v=0,P=0,D=0,C=0;c.sort(Jw);for(let M=0,x=c.length;M<x;M++){let R=c[M],W=R.color,z=R.intensity,O=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)f+=W.r*z,u+=W.g*z,p+=W.b*z;else if(R.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(R.sh.coefficients[V],z);C++}else if(R.isDirectionalLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let Z=R.shadow,G=t.get(R);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,i.directionalShadow[d]=G,i.directionalShadowMap[d]=K,i.directionalShadowMatrix[d]=R.shadow.matrix,w++}i.directional[d]=V,d++}else if(R.isSpotLight){let V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(W).multiplyScalar(z),V.distance=O,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,i.spot[y]=V;let Z=R.shadow;if(R.map&&(i.spotLightMap[P]=R.map,P++,Z.updateMatrices(R),R.castShadow&&D++),i.spotLightMatrix[y]=Z.matrix,R.castShadow){let G=t.get(R);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,i.spotShadow[y]=G,i.spotShadowMap[y]=K,v++}y++}else if(R.isRectAreaLight){let V=e.get(R);V.color.copy(W).multiplyScalar(z),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=V,g++}else if(R.isPointLight){let V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){let Z=R.shadow,G=t.get(R);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=K,i.pointShadowMatrix[m]=R.shadow.matrix,b++}i.point[m]=V,m++}else if(R.isHemisphereLight){let V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(z),V.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[h]=V,h++}}g>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=u,i.ambient[2]=p;let k=i.hash;(k.directionalLength!==d||k.pointLength!==m||k.spotLength!==y||k.rectAreaLength!==g||k.hemiLength!==h||k.numDirectionalShadows!==w||k.numPointShadows!==b||k.numSpotShadows!==v||k.numSpotMaps!==P||k.numLightProbes!==C)&&(i.directional.length=d,i.spot.length=y,i.rectArea.length=g,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+P-D,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=C,k.directionalLength=d,k.pointLength=m,k.spotLength=y,k.rectAreaLength=g,k.hemiLength=h,k.numDirectionalShadows=w,k.numPointShadows=b,k.numSpotShadows=v,k.numSpotMaps=P,k.numLightProbes=C,i.version=$w++)}function l(c,f){let u=0,p=0,d=0,m=0,y=0,g=f.matrixWorldInverse;for(let h=0,w=c.length;h<w;h++){let b=c[h];if(b.isDirectionalLight){let v=i.directional[u];v.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(g),u++}else if(b.isSpotLight){let v=i.spot[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(g),d++}else if(b.isRectAreaLight){let v=i.rectArea[m];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),s.identity(),o.copy(b.matrixWorld),o.premultiply(g),s.extractRotation(o),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),m++}else if(b.isPointLight){let v=i.point[p];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),p++}else if(b.isHemisphereLight){let v=i.hemi[y];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:i}}var $w,DM=S(()=>{ir();er();bi();Dt();Rh();$w=0});function CM(r){let e=new AM(r),t=[],i=[];function n(f){c.camera=f,t.length=0,i.length=0}function o(f){t.push(f)}function s(f){i.push(f)}function a(){e.setup(t)}function l(f){e.setupView(t,f)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function LM(r){let e=new WeakMap;function t(n,o=0){let s=e.get(n),a;return s===void 0?(a=new CM(r),e.set(n,[a])):o>=s.length?(a=new CM(r),s.push(a)):a=s[o],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var PM=S(()=>{DM()});var Wf,zM=S(()=>{hl();it();Wf=class extends Br{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ry,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}});var Hf,kM=S(()=>{hl();Hf=class extends Br{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}});var NM,IM,OM=S(()=>{NM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,IM=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`});function FM(r,e,t){let i=new Rs,n=new Ve,o=new Ve,s=new St,a=new Wf({depthPacking:ny}),l=new Hf,c={},f=t.maxTextureSize,u={[qt]:dt,[dt]:qt,[si]:si},p=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:NM,fragmentShader:IM}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let m=new ai;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new kt(m,p),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mc;let h=this.type;this.render=function(D,C,k){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||D.length===0)return;let M=r.getRenderTarget(),x=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),W=r.state;W.setBlending(Yi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let z=h!==ur&&this.type===ur,O=h===ur&&this.type!==ur;for(let K=0,V=D.length;K<V;K++){let Z=D[K],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;n.copy(G.mapSize);let $=G.getFrameExtents();if(n.multiply($),o.copy(G.mapSize),(n.x>f||n.y>f)&&(n.x>f&&(o.x=Math.floor(f/$.x),n.x=o.x*$.x,G.mapSize.x=o.x),n.y>f&&(o.y=Math.floor(f/$.y),n.y=o.y*$.y,G.mapSize.y=o.y)),G.map===null||z===!0||O===!0){let ue=this.type!==ur?{minFilter:ui,magFilter:ui}:{};G.map!==null&&G.map.dispose(),G.map=new zi(n.x,n.y,ue),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();let re=G.getViewportCount();for(let ue=0;ue<re;ue++){let ke=G.getViewport(ue);s.set(o.x*ke.x,o.y*ke.y,o.x*ke.z,o.y*ke.w),W.viewport(s),G.updateMatrices(Z,ue),i=G.getFrustum(),v(C,k,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===ur&&w(G,k),G.needsUpdate=!1}h=this.type,g.needsUpdate=!1,r.setRenderTarget(M,x,R)};function w(D,C){let k=e.update(y);p.defines.VSM_SAMPLES!==D.blurSamples&&(p.defines.VSM_SAMPLES=D.blurSamples,d.defines.VSM_SAMPLES=D.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new zi(n.x,n.y)),p.uniforms.shadow_pass.value=D.map.texture,p.uniforms.resolution.value=D.mapSize,p.uniforms.radius.value=D.radius,r.setRenderTarget(D.mapPass),r.clear(),r.renderBufferDirect(C,null,k,p,y,null),d.uniforms.shadow_pass.value=D.mapPass.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,r.setRenderTarget(D.map),r.clear(),r.renderBufferDirect(C,null,k,d,y,null)}function b(D,C,k,M){let x=null,R=k.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(R!==void 0)x=R;else if(x=k.isPointLight===!0?l:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let W=x.uuid,z=C.uuid,O=c[W];O===void 0&&(O={},c[W]=O);let K=O[z];K===void 0&&(K=x.clone(),O[z]=K,C.addEventListener("dispose",P)),x=K}if(x.visible=C.visible,x.wireframe=C.wireframe,M===ur?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:u[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,k.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let W=r.properties.get(x);W.light=k}return x}function v(D,C,k,M,x){if(D.visible===!1)return;if(D.layers.test(C.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&x===ur)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,D.matrixWorld);let z=e.update(D),O=D.material;if(Array.isArray(O)){let K=z.groups;for(let V=0,Z=K.length;V<Z;V++){let G=K[V],$=O[G.materialIndex];if($&&$.visible){let re=b(D,$,M,x);D.onBeforeShadow(r,D,C,k,z,re,G),r.renderBufferDirect(k,null,z,re,D,G),D.onAfterShadow(r,D,C,k,z,re,G)}}}else if(O.visible){let K=b(D,O,M,x);D.onBeforeShadow(r,D,C,k,z,K,null),r.renderBufferDirect(k,null,z,K,D,null),D.onAfterShadow(r,D,C,k,z,K,null)}}let W=D.children;for(let z=0,O=W.length;z<O;z++)v(W[z],C,k,M,x)}function P(D){D.target.removeEventListener("dispose",P);for(let k in c){let M=c[k],x=D.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}var UM=S(()=>{it();Ds();zM();kM();As();nn();Bn();Kn();Wn();bi();Mh();OM()});function BM(r,e){function t(){let N=!1,he=new St,Q=null,te=new St(0,0,0,0);return{setMask:function(Se){Q!==Se&&!N&&(r.colorMask(Se,Se,Se,Se),Q=Se)},setLocked:function(Se){N=Se},setClear:function(Se,ye,Ye,Nt,li){li===!0&&(Se*=Nt,ye*=Nt,Ye*=Nt),he.set(Se,ye,Ye,Nt),te.equals(he)===!1&&(r.clearColor(Se,ye,Ye,Nt),te.copy(he))},reset:function(){N=!1,Q=null,te.set(-1,0,0,0)}}}function i(){let N=!1,he=!1,Q=null,te=null,Se=null;return{setReversed:function(ye){if(he!==ye){let Ye=e.get("EXT_clip_control");he?Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.ZERO_TO_ONE_EXT):Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.NEGATIVE_ONE_TO_ONE_EXT);let Nt=Se;Se=null,this.setClear(Nt)}he=ye},getReversed:function(){return he},setTest:function(ye){ye?oe(r.DEPTH_TEST):Ae(r.DEPTH_TEST)},setMask:function(ye){Q!==ye&&!N&&(r.depthMask(ye),Q=ye)},setFunc:function(ye){if(he&&(ye=t6[ye]),te!==ye){switch(ye){case bc:r.depthFunc(r.NEVER);break;case _c:r.depthFunc(r.ALWAYS);break;case wc:r.depthFunc(r.LESS);break;case Cn:r.depthFunc(r.LEQUAL);break;case Rc:r.depthFunc(r.EQUAL);break;case Tc:r.depthFunc(r.GEQUAL);break;case Ac:r.depthFunc(r.GREATER);break;case Dc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}te=ye}},setLocked:function(ye){N=ye},setClear:function(ye){Se!==ye&&(he&&(ye=1-ye),r.clearDepth(ye),Se=ye)},reset:function(){N=!1,Q=null,te=null,Se=null,he=!1}}}function n(){let N=!1,he=null,Q=null,te=null,Se=null,ye=null,Ye=null,Nt=null,li=null;return{setTest:function(yt){N||(yt?oe(r.STENCIL_TEST):Ae(r.STENCIL_TEST))},setMask:function(yt){he!==yt&&!N&&(r.stencilMask(yt),he=yt)},setFunc:function(yt,nr,Hr){(Q!==yt||te!==nr||Se!==Hr)&&(r.stencilFunc(yt,nr,Hr),Q=yt,te=nr,Se=Hr)},setOp:function(yt,nr,Hr){(ye!==yt||Ye!==nr||Nt!==Hr)&&(r.stencilOp(yt,nr,Hr),ye=yt,Ye=nr,Nt=Hr)},setLocked:function(yt){N=yt},setClear:function(yt){li!==yt&&(r.clearStencil(yt),li=yt)},reset:function(){N=!1,he=null,Q=null,te=null,Se=null,ye=null,Ye=null,Nt=null,li=null}}}let o=new t,s=new i,a=new n,l=new WeakMap,c=new WeakMap,f={},u={},p=new WeakMap,d=[],m=null,y=!1,g=null,h=null,w=null,b=null,v=null,P=null,D=null,C=new Ue(0,0,0),k=0,M=!1,x=null,R=null,W=null,z=null,O=null,K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,Z=0,G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=Z>=2);let $=null,re={},ue=r.getParameter(r.SCISSOR_BOX),ke=r.getParameter(r.VIEWPORT),Ge=new St().fromArray(ue),Y=new St().fromArray(ke);function ie(N,he,Q,te){let Se=new Uint8Array(4),ye=r.createTexture();r.bindTexture(N,ye),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ye=0;Ye<Q;Ye++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(he,0,r.RGBA,1,1,te,0,r.RGBA,r.UNSIGNED_BYTE,Se):r.texImage2D(he+Ye,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Se);return ye}let me={};me[r.TEXTURE_2D]=ie(r.TEXTURE_2D,r.TEXTURE_2D,1),me[r.TEXTURE_CUBE_MAP]=ie(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[r.TEXTURE_2D_ARRAY]=ie(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),me[r.TEXTURE_3D]=ie(r.TEXTURE_3D,r.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),oe(r.DEPTH_TEST),s.setFunc(Cn),ze(!1),nt(gd),oe(r.CULL_FACE),L(Yi);function oe(N){f[N]!==!0&&(r.enable(N),f[N]=!0)}function Ae(N){f[N]!==!1&&(r.disable(N),f[N]=!1)}function Pe(N,he){return u[N]!==he?(r.bindFramebuffer(N,he),u[N]=he,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=he),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=he),!0):!1}function B(N,he){let Q=d,te=!1;if(N){Q=p.get(he),Q===void 0&&(Q=[],p.set(he,Q));let Se=N.textures;if(Q.length!==Se.length||Q[0]!==r.COLOR_ATTACHMENT0){for(let ye=0,Ye=Se.length;ye<Ye;ye++)Q[ye]=r.COLOR_ATTACHMENT0+ye;Q.length=Se.length,te=!0}}else Q[0]!==r.BACK&&(Q[0]=r.BACK,te=!0);te&&r.drawBuffers(Q)}function se(N){return m!==N?(r.useProgram(N),m=N,!0):!1}let fe={[tn]:r.FUNC_ADD,[C1]:r.FUNC_SUBTRACT,[L1]:r.FUNC_REVERSE_SUBTRACT};fe[P1]=r.MIN,fe[z1]=r.MAX;let de={[k1]:r.ZERO,[N1]:r.ONE,[I1]:r.SRC_COLOR,[Aa]:r.SRC_ALPHA,[V1]:r.SRC_ALPHA_SATURATE,[B1]:r.DST_COLOR,[F1]:r.DST_ALPHA,[O1]:r.ONE_MINUS_SRC_COLOR,[Da]:r.ONE_MINUS_SRC_ALPHA,[G1]:r.ONE_MINUS_DST_COLOR,[U1]:r.ONE_MINUS_DST_ALPHA,[W1]:r.CONSTANT_COLOR,[H1]:r.ONE_MINUS_CONSTANT_COLOR,[K1]:r.CONSTANT_ALPHA,[X1]:r.ONE_MINUS_CONSTANT_ALPHA};function L(N,he,Q,te,Se,ye,Ye,Nt,li,yt){if(N===Yi){y===!0&&(Ae(r.BLEND),y=!1);return}if(y===!1&&(oe(r.BLEND),y=!0),N!==D1){if(N!==g||yt!==M){if((h!==tn||v!==tn)&&(r.blendEquation(r.FUNC_ADD),h=tn,v=tn),yt)switch(N){case en:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yd:r.blendFunc(r.ONE,r.ONE);break;case xd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case en:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case yd:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case xd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}w=null,b=null,P=null,D=null,C.set(0,0,0),k=0,g=N,M=yt}return}Se=Se||he,ye=ye||Q,Ye=Ye||te,(he!==h||Se!==v)&&(r.blendEquationSeparate(fe[he],fe[Se]),h=he,v=Se),(Q!==w||te!==b||ye!==P||Ye!==D)&&(r.blendFuncSeparate(de[Q],de[te],de[ye],de[Ye]),w=Q,b=te,P=ye,D=Ye),(Nt.equals(C)===!1||li!==k)&&(r.blendColor(Nt.r,Nt.g,Nt.b,li),C.copy(Nt),k=li),g=N,M=!1}function Ke(N,he){N.side===si?Ae(r.CULL_FACE):oe(r.CULL_FACE);let Q=N.side===dt;he&&(Q=!Q),ze(Q),N.blending===en&&N.transparent===!1?L(Yi):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),o.setMask(N.colorWrite);let te=N.stencilWrite;a.setTest(te),te&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Et(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?oe(r.SAMPLE_ALPHA_TO_COVERAGE):Ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function ze(N){x!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),x=N)}function nt(N){N!==R1?(oe(r.CULL_FACE),N!==R&&(N===gd?r.cullFace(r.BACK):N===T1?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ae(r.CULL_FACE),R=N}function Ne(N){N!==W&&(V&&r.lineWidth(N),W=N)}function Et(N,he,Q){N?(oe(r.POLYGON_OFFSET_FILL),(z!==he||O!==Q)&&(r.polygonOffset(he,Q),z=he,O=Q)):Ae(r.POLYGON_OFFSET_FILL)}function Ie(N){N?oe(r.SCISSOR_TEST):Ae(r.SCISSOR_TEST)}function A(N){N===void 0&&(N=r.TEXTURE0+K-1),$!==N&&(r.activeTexture(N),$=N)}function E(N,he,Q){Q===void 0&&($===null?Q=r.TEXTURE0+K-1:Q=$);let te=re[Q];te===void 0&&(te={type:void 0,texture:void 0},re[Q]=te),(te.type!==N||te.texture!==he)&&($!==Q&&(r.activeTexture(Q),$=Q),r.bindTexture(N,he||me[N]),te.type=N,te.texture=he)}function H(){let N=re[$];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ee(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ct(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Be(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function We(N){Ge.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Ge.copy(N))}function Me(N){Y.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Y.copy(N))}function st(N,he){let Q=c.get(he);Q===void 0&&(Q=new WeakMap,c.set(he,Q));let te=Q.get(N);te===void 0&&(te=r.getUniformBlockIndex(he,N.name),Q.set(N,te))}function Je(N,he){let te=c.get(he).get(N);l.get(he)!==te&&(r.uniformBlockBinding(he,te,N.__bindingPointIndex),l.set(he,te))}function Mt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},$=null,re={},u={},p=new WeakMap,d=[],m=null,y=!1,g=null,h=null,w=null,b=null,v=null,P=null,D=null,C=new Ue(0,0,0),k=0,M=!1,x=null,R=null,W=null,z=null,O=null,Ge.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:oe,disable:Ae,bindFramebuffer:Pe,drawBuffers:B,useProgram:se,setBlending:L,setMaterial:Ke,setFlipSided:ze,setCullFace:nt,setLineWidth:Ne,setPolygonOffset:Et,setScissorTest:Ie,activeTexture:A,bindTexture:E,unbindTexture:H,compressedTexImage2D:ee,compressedTexImage3D:ne,texImage2D:Ee,texImage3D:Be,updateUBOMapping:st,uniformBlockBinding:Je,texStorage2D:ct,texStorage3D:ae,texSubImage2D:J,texSubImage3D:De,compressedTexSubImage2D:ge,compressedTexSubImage3D:ve,scissor:We,viewport:Me,reset:Mt}}var t6,GM=S(()=>{it();ir();Wn();t6={[bc]:_c,[wc]:Ac,[Rc]:Dc,[Cn]:Tc,[_c]:bc,[Ac]:wc,[Dc]:Rc,[Tc]:Cn}});function Kh(r,e,t,i){let n=i6(i);switch(t){case Nc:return r*e;case Oc:return r*e;case Fc:return r*e*2;case Uc:return r*e/n.components*n.byteLength;case qo:return r*e/n.components*n.byteLength;case Bc:return r*e*2/n.components*n.byteLength;case jo:return r*e*2/n.components*n.byteLength;case Ic:return r*e*3/n.components*n.byteLength;case ri:return r*e*4/n.components*n.byteLength;case Yo:return r*e*4/n.components*n.byteLength;case Qo:case Zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case $o:case Jo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ia:case Fa:return Math.max(r,16)*Math.max(e,8)/4;case Na:case Oa:return Math.max(r,8)*Math.max(e,8)/2;case Ua:case Ba:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ga:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Va:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ja:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Za:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ja:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case el:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case tl:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case es:case il:case rl:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Gc:case nl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ol:case sl:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function i6(r){switch(r){case pi:case Pc:return{byteLength:1,components:1};case rn:case zc:case Pr:return{byteLength:2,components:1};case Ko:case Xo:return{byteLength:2,components:4};case Fi:case Ho:case Si:return{byteLength:4,components:1};case kc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}var VM=S(()=>{it()});function WM(r,e,t,i,n,o,s){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ve,f=new WeakMap,u,p=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,E){return d?new OffscreenCanvas(A,E):Fn("canvas")}function y(A,E,H){let ee=1,ne=Ie(A);if((ne.width>H||ne.height>H)&&(ee=H/Math.max(ne.width,ne.height)),ee<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let J=Math.floor(ee*ne.width),De=Math.floor(ee*ne.height);u===void 0&&(u=m(J,De));let ge=E?m(J,De):u;return ge.width=J,ge.height=De,ge.getContext("2d").drawImage(A,0,0,J,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+J+"x"+De+")."),ge}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),A;return A}function g(A){return A.generateMipmaps}function h(A){r.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(A,E,H,ee,ne=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let J=E;if(E===r.RED&&(H===r.FLOAT&&(J=r.R32F),H===r.HALF_FLOAT&&(J=r.R16F),H===r.UNSIGNED_BYTE&&(J=r.R8)),E===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.R8UI),H===r.UNSIGNED_SHORT&&(J=r.R16UI),H===r.UNSIGNED_INT&&(J=r.R32UI),H===r.BYTE&&(J=r.R8I),H===r.SHORT&&(J=r.R16I),H===r.INT&&(J=r.R32I)),E===r.RG&&(H===r.FLOAT&&(J=r.RG32F),H===r.HALF_FLOAT&&(J=r.RG16F),H===r.UNSIGNED_BYTE&&(J=r.RG8)),E===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RG8UI),H===r.UNSIGNED_SHORT&&(J=r.RG16UI),H===r.UNSIGNED_INT&&(J=r.RG32UI),H===r.BYTE&&(J=r.RG8I),H===r.SHORT&&(J=r.RG16I),H===r.INT&&(J=r.RG32I)),E===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RGB8UI),H===r.UNSIGNED_SHORT&&(J=r.RGB16UI),H===r.UNSIGNED_INT&&(J=r.RGB32UI),H===r.BYTE&&(J=r.RGB8I),H===r.SHORT&&(J=r.RGB16I),H===r.INT&&(J=r.RGB32I)),E===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),H===r.UNSIGNED_INT&&(J=r.RGBA32UI),H===r.BYTE&&(J=r.RGBA8I),H===r.SHORT&&(J=r.RGBA16I),H===r.INT&&(J=r.RGBA32I)),E===r.RGB&&H===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),E===r.RGBA){let De=ne?so:$e.getTransfer(ee);H===r.FLOAT&&(J=r.RGBA32F),H===r.HALF_FLOAT&&(J=r.RGBA16F),H===r.UNSIGNED_BYTE&&(J=De===at?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function v(A,E){let H;return A?E===null||E===Fi||E===mr?H=r.DEPTH24_STENCIL8:E===Si?H=r.DEPTH32F_STENCIL8:E===rn&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Fi||E===mr?H=r.DEPTH_COMPONENT24:E===Si?H=r.DEPTH_COMPONENT32F:E===rn&&(H=r.DEPTH_COMPONENT16),H}function P(A,E){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==ui&&A.minFilter!==xi?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function D(A){let E=A.target;E.removeEventListener("dispose",D),k(E),E.isVideoTexture&&f.delete(E)}function C(A){let E=A.target;E.removeEventListener("dispose",C),x(E)}function k(A){let E=i.get(A);if(E.__webglInit===void 0)return;let H=A.source,ee=p.get(H);if(ee){let ne=ee[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&M(A),Object.keys(ee).length===0&&p.delete(H)}i.remove(A)}function M(A){let E=i.get(A);r.deleteTexture(E.__webglTexture);let H=A.source,ee=p.get(H);delete ee[E.__cacheKey],s.memory.textures--}function x(A){let E=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(E.__webglFramebuffer[ee]))for(let ne=0;ne<E.__webglFramebuffer[ee].length;ne++)r.deleteFramebuffer(E.__webglFramebuffer[ee][ne]);else r.deleteFramebuffer(E.__webglFramebuffer[ee]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[ee])}else{if(Array.isArray(E.__webglFramebuffer))for(let ee=0;ee<E.__webglFramebuffer.length;ee++)r.deleteFramebuffer(E.__webglFramebuffer[ee]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ee=0;ee<E.__webglColorRenderbuffer.length;ee++)E.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[ee]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let H=A.textures;for(let ee=0,ne=H.length;ee<ne;ee++){let J=i.get(H[ee]);J.__webglTexture&&(r.deleteTexture(J.__webglTexture),s.memory.textures--),i.remove(H[ee])}i.remove(A)}let R=0;function W(){R=0}function z(){let A=R;return A>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),R+=1,A}function O(A){let E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function K(A,E){let H=i.get(A);if(A.isVideoTexture&&Ne(A),A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){let ee=A.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(H,A,E);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+E)}function V(A,E){let H=i.get(A);if(A.version>0&&H.__version!==A.version){Y(H,A,E);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+E)}function Z(A,E){let H=i.get(A);if(A.version>0&&H.__version!==A.version){Y(H,A,E);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+E)}function G(A,E){let H=i.get(A);if(A.version>0&&H.__version!==A.version){ie(H,A,E);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+E)}let $={[Pa]:r.REPEAT,[dr]:r.CLAMP_TO_EDGE,[za]:r.MIRRORED_REPEAT},re={[ui]:r.NEAREST,[iy]:r.NEAREST_MIPMAP_NEAREST,[ka]:r.NEAREST_MIPMAP_LINEAR,[xi]:r.LINEAR,[Lc]:r.LINEAR_MIPMAP_NEAREST,[hr]:r.LINEAR_MIPMAP_LINEAR},ue={[ay]:r.NEVER,[dy]:r.ALWAYS,[ly]:r.LESS,[Vc]:r.LEQUAL,[cy]:r.EQUAL,[py]:r.GEQUAL,[fy]:r.GREATER,[uy]:r.NOTEQUAL};function ke(A,E){if(E.type===Si&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===xi||E.magFilter===Lc||E.magFilter===ka||E.magFilter===hr||E.minFilter===xi||E.minFilter===Lc||E.minFilter===ka||E.minFilter===hr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,$[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,$[E.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,$[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,re[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,re[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,ue[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ui||E.minFilter!==ka&&E.minFilter!==hr||E.type===Si&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,n.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Ge(A,E){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",D));let ee=E.source,ne=p.get(ee);ne===void 0&&(ne={},p.set(ee,ne));let J=O(E);if(J!==A.__cacheKey){ne[J]===void 0&&(ne[J]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,H=!0),ne[J].usedTimes++;let De=ne[A.__cacheKey];De!==void 0&&(ne[A.__cacheKey].usedTimes--,De.usedTimes===0&&M(E)),A.__cacheKey=J,A.__webglTexture=ne[J].texture}return H}function Y(A,E,H){let ee=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ee=r.TEXTURE_3D);let ne=Ge(A,E),J=E.source;t.bindTexture(ee,A.__webglTexture,r.TEXTURE0+H);let De=i.get(J);if(J.version!==De.__version||ne===!0){t.activeTexture(r.TEXTURE0+H);let ge=$e.getPrimaries($e.workingColorSpace),ve=E.colorSpace===Zi?null:$e.getPrimaries(E.colorSpace),ct=E.colorSpace===Zi||ge===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let ae=y(E.image,!1,n.maxTextureSize);ae=Et(E,ae);let Ee=o.convert(E.format,E.colorSpace),Be=o.convert(E.type),We=b(E.internalFormat,Ee,Be,E.colorSpace,E.isVideoTexture);ke(ee,E);let Me,st=E.mipmaps,Je=E.isVideoTexture!==!0,Mt=De.__version===void 0||ne===!0,N=J.dataReady,he=P(E,ae);if(E.isDepthTexture)We=v(E.format===kr,E.type),Mt&&(Je?t.texStorage2D(r.TEXTURE_2D,1,We,ae.width,ae.height):t.texImage2D(r.TEXTURE_2D,0,We,ae.width,ae.height,0,Ee,Be,null));else if(E.isDataTexture)if(st.length>0){Je&&Mt&&t.texStorage2D(r.TEXTURE_2D,he,We,st[0].width,st[0].height);for(let Q=0,te=st.length;Q<te;Q++)Me=st[Q],Je?N&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,Me.width,Me.height,Ee,Be,Me.data):t.texImage2D(r.TEXTURE_2D,Q,We,Me.width,Me.height,0,Ee,Be,Me.data);E.generateMipmaps=!1}else Je?(Mt&&t.texStorage2D(r.TEXTURE_2D,he,We,ae.width,ae.height),N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ae.width,ae.height,Ee,Be,ae.data)):t.texImage2D(r.TEXTURE_2D,0,We,ae.width,ae.height,0,Ee,Be,ae.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Je&&Mt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,We,st[0].width,st[0].height,ae.depth);for(let Q=0,te=st.length;Q<te;Q++)if(Me=st[Q],E.format!==ri)if(Ee!==null)if(Je){if(N)if(E.layerUpdates.size>0){let Se=Kh(Me.width,Me.height,E.format,E.type);for(let ye of E.layerUpdates){let Ye=Me.data.subarray(ye*Se/Me.data.BYTES_PER_ELEMENT,(ye+1)*Se/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,ye,Me.width,Me.height,1,Ee,Ye)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,Me.width,Me.height,ae.depth,Ee,Me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,We,Me.width,Me.height,ae.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,Me.width,Me.height,ae.depth,Ee,Be,Me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Q,We,Me.width,Me.height,ae.depth,0,Ee,Be,Me.data)}else{Je&&Mt&&t.texStorage2D(r.TEXTURE_2D,he,We,st[0].width,st[0].height);for(let Q=0,te=st.length;Q<te;Q++)Me=st[Q],E.format!==ri?Ee!==null?Je?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,Me.width,Me.height,Ee,Me.data):t.compressedTexImage2D(r.TEXTURE_2D,Q,We,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?N&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,Me.width,Me.height,Ee,Be,Me.data):t.texImage2D(r.TEXTURE_2D,Q,We,Me.width,Me.height,0,Ee,Be,Me.data)}else if(E.isDataArrayTexture)if(Je){if(Mt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,We,ae.width,ae.height,ae.depth),N)if(E.layerUpdates.size>0){let Q=Kh(ae.width,ae.height,E.format,E.type);for(let te of E.layerUpdates){let Se=ae.data.subarray(te*Q/ae.data.BYTES_PER_ELEMENT,(te+1)*Q/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,ae.width,ae.height,1,Ee,Be,Se)}E.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Ee,Be,ae.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,We,ae.width,ae.height,ae.depth,0,Ee,Be,ae.data);else if(E.isData3DTexture)Je?(Mt&&t.texStorage3D(r.TEXTURE_3D,he,We,ae.width,ae.height,ae.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Ee,Be,ae.data)):t.texImage3D(r.TEXTURE_3D,0,We,ae.width,ae.height,ae.depth,0,Ee,Be,ae.data);else if(E.isFramebufferTexture){if(Mt)if(Je)t.texStorage2D(r.TEXTURE_2D,he,We,ae.width,ae.height);else{let Q=ae.width,te=ae.height;for(let Se=0;Se<he;Se++)t.texImage2D(r.TEXTURE_2D,Se,We,Q,te,0,Ee,Be,null),Q>>=1,te>>=1}}else if(st.length>0){if(Je&&Mt){let Q=Ie(st[0]);t.texStorage2D(r.TEXTURE_2D,he,We,Q.width,Q.height)}for(let Q=0,te=st.length;Q<te;Q++)Me=st[Q],Je?N&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,Ee,Be,Me):t.texImage2D(r.TEXTURE_2D,Q,We,Ee,Be,Me);E.generateMipmaps=!1}else if(Je){if(Mt){let Q=Ie(ae);t.texStorage2D(r.TEXTURE_2D,he,We,Q.width,Q.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,Be,ae)}else t.texImage2D(r.TEXTURE_2D,0,We,Ee,Be,ae);g(E)&&h(ee),De.__version=J.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function ie(A,E,H){if(E.image.length!==6)return;let ee=Ge(A,E),ne=E.source;t.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+H);let J=i.get(ne);if(ne.version!==J.__version||ee===!0){t.activeTexture(r.TEXTURE0+H);let De=$e.getPrimaries($e.workingColorSpace),ge=E.colorSpace===Zi?null:$e.getPrimaries(E.colorSpace),ve=E.colorSpace===Zi||De===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let ct=E.isCompressedTexture||E.image[0].isCompressedTexture,ae=E.image[0]&&E.image[0].isDataTexture,Ee=[];for(let te=0;te<6;te++)!ct&&!ae?Ee[te]=y(E.image[te],!0,n.maxCubemapSize):Ee[te]=ae?E.image[te].image:E.image[te],Ee[te]=Et(E,Ee[te]);let Be=Ee[0],We=o.convert(E.format,E.colorSpace),Me=o.convert(E.type),st=b(E.internalFormat,We,Me,E.colorSpace),Je=E.isVideoTexture!==!0,Mt=J.__version===void 0||ee===!0,N=ne.dataReady,he=P(E,Be);ke(r.TEXTURE_CUBE_MAP,E);let Q;if(ct){Je&&Mt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,he,st,Be.width,Be.height);for(let te=0;te<6;te++){Q=Ee[te].mipmaps;for(let Se=0;Se<Q.length;Se++){let ye=Q[Se];E.format!==ri?We!==null?Je?N&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,0,0,ye.width,ye.height,We,ye.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,st,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,0,0,ye.width,ye.height,We,Me,ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,st,ye.width,ye.height,0,We,Me,ye.data)}}}else{if(Q=E.mipmaps,Je&&Mt){Q.length>0&&he++;let te=Ie(Ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,he,st,te.width,te.height)}for(let te=0;te<6;te++)if(ae){Je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ee[te].width,Ee[te].height,We,Me,Ee[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,st,Ee[te].width,Ee[te].height,0,We,Me,Ee[te].data);for(let Se=0;Se<Q.length;Se++){let Ye=Q[Se].image[te].image;Je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,0,0,Ye.width,Ye.height,We,Me,Ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,st,Ye.width,Ye.height,0,We,Me,Ye.data)}}else{Je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,We,Me,Ee[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,st,We,Me,Ee[te]);for(let Se=0;Se<Q.length;Se++){let ye=Q[Se];Je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,0,0,We,Me,ye.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,st,We,Me,ye.image[te])}}}g(E)&&h(r.TEXTURE_CUBE_MAP),J.__version=ne.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function me(A,E,H,ee,ne,J){let De=o.convert(H.format,H.colorSpace),ge=o.convert(H.type),ve=b(H.internalFormat,De,ge,H.colorSpace),ct=i.get(E),ae=i.get(H);if(ae.__renderTarget=E,!ct.__hasExternalTextures){let Ee=Math.max(1,E.width>>J),Be=Math.max(1,E.height>>J);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,J,ve,Ee,Be,E.depth,0,De,ge,null):t.texImage2D(ne,J,ve,Ee,Be,0,De,ge,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),nt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,ne,ae.__webglTexture,0,ze(E)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,ne,ae.__webglTexture,J),t.bindFramebuffer(r.FRAMEBUFFER,null)}function oe(A,E,H){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){let ee=E.depthTexture,ne=ee&&ee.isDepthTexture?ee.type:null,J=v(E.stencilBuffer,ne),De=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=ze(E);nt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ge,J,E.width,E.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,J,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,J,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,De,r.RENDERBUFFER,A)}else{let ee=E.textures;for(let ne=0;ne<ee.length;ne++){let J=ee[ne],De=o.convert(J.format,J.colorSpace),ge=o.convert(J.type),ve=b(J.internalFormat,De,ge,J.colorSpace),ct=ze(E);H&&nt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ct,ve,E.width,E.height):nt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ct,ve,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,ve,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ae(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ee=i.get(E.depthTexture);ee.__renderTarget=E,(!ee.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),K(E.depthTexture,0);let ne=ee.__webglTexture,J=ze(E);if(E.depthTexture.format===zr)nt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(E.depthTexture.format===kr)nt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Pe(A){let E=i.get(A),H=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let ee=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ee){let ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ee.removeEventListener("dispose",ne)};ee.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=ee}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Ae(E.__webglFramebuffer,A)}else if(H){E.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[ee]),E.__webglDepthbuffer[ee]===void 0)E.__webglDepthbuffer[ee]=r.createRenderbuffer(),oe(E.__webglDepthbuffer[ee],A,!1);else{let ne=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,J=E.__webglDepthbuffer[ee];r.bindRenderbuffer(r.RENDERBUFFER,J),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,J)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),oe(E.__webglDepthbuffer,A,!1);else{let ee=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,ne)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function B(A,E,H){let ee=i.get(A);E!==void 0&&me(ee.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&Pe(A)}function se(A){let E=A.texture,H=i.get(A),ee=i.get(E);A.addEventListener("dispose",C);let ne=A.textures,J=A.isWebGLCubeRenderTarget===!0,De=ne.length>1;if(De||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=E.version,s.memory.textures++),J){H.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[ge]=[];for(let ve=0;ve<E.mipmaps.length;ve++)H.__webglFramebuffer[ge][ve]=r.createFramebuffer()}else H.__webglFramebuffer[ge]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let ge=0;ge<E.mipmaps.length;ge++)H.__webglFramebuffer[ge]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(De)for(let ge=0,ve=ne.length;ge<ve;ge++){let ct=i.get(ne[ge]);ct.__webglTexture===void 0&&(ct.__webglTexture=r.createTexture(),s.memory.textures++)}if(A.samples>0&&nt(A)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ge=0;ge<ne.length;ge++){let ve=ne[ge];H.__webglColorRenderbuffer[ge]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[ge]);let ct=o.convert(ve.format,ve.colorSpace),ae=o.convert(ve.type),Ee=b(ve.internalFormat,ct,ae,ve.colorSpace,A.isXRRenderTarget===!0),Be=ze(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Be,Ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,H.__webglColorRenderbuffer[ge])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),oe(H.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){t.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),ke(r.TEXTURE_CUBE_MAP,E);for(let ge=0;ge<6;ge++)if(E.mipmaps&&E.mipmaps.length>0)for(let ve=0;ve<E.mipmaps.length;ve++)me(H.__webglFramebuffer[ge][ve],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,ve);else me(H.__webglFramebuffer[ge],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);g(E)&&h(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let ge=0,ve=ne.length;ge<ve;ge++){let ct=ne[ge],ae=i.get(ct);t.bindTexture(r.TEXTURE_2D,ae.__webglTexture),ke(r.TEXTURE_2D,ct),me(H.__webglFramebuffer,A,ct,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,0),g(ct)&&h(r.TEXTURE_2D)}t.unbindTexture()}else{let ge=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ge=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ge,ee.__webglTexture),ke(ge,E),E.mipmaps&&E.mipmaps.length>0)for(let ve=0;ve<E.mipmaps.length;ve++)me(H.__webglFramebuffer[ve],A,E,r.COLOR_ATTACHMENT0,ge,ve);else me(H.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,ge,0);g(E)&&h(ge),t.unbindTexture()}A.depthBuffer&&Pe(A)}function fe(A){let E=A.textures;for(let H=0,ee=E.length;H<ee;H++){let ne=E[H];if(g(ne)){let J=w(A),De=i.get(ne).__webglTexture;t.bindTexture(J,De),h(J),t.unbindTexture()}}}let de=[],L=[];function Ke(A){if(A.samples>0){if(nt(A)===!1){let E=A.textures,H=A.width,ee=A.height,ne=r.COLOR_BUFFER_BIT,J=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,De=i.get(A),ge=E.length>1;if(ge)for(let ve=0;ve<E.length;ve++)t.bindFramebuffer(r.FRAMEBUFFER,De.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,De.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let ve=0;ve<E.length;ve++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),ge){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,De.__webglColorRenderbuffer[ve]);let ct=i.get(E[ve]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ct,0)}r.blitFramebuffer(0,0,H,ee,0,0,H,ee,ne,r.NEAREST),l===!0&&(de.length=0,L.length=0,de.push(r.COLOR_ATTACHMENT0+ve),A.depthBuffer&&A.resolveDepthBuffer===!1&&(de.push(J),L.push(J),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ge)for(let ve=0;ve<E.length;ve++){t.bindFramebuffer(r.FRAMEBUFFER,De.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,De.__webglColorRenderbuffer[ve]);let ct=i.get(E[ve]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,De.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,ct,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function ze(A){return Math.min(n.maxSamples,A.samples)}function nt(A){let E=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ne(A){let E=s.render.frame;f.get(A)!==E&&(f.set(A,E),A.update())}function Et(A,E){let H=A.colorSpace,ee=A.format,ne=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==gr&&H!==Zi&&($e.getTransfer(H)===at?(ee!==ri||ne!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function Ie(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=W,this.setTexture2D=K,this.setTexture2DArray=V,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=B,this.setupRenderTarget=se,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=nt}var HM=S(()=>{it();Un();Ur();bi();VM()});function KM(r,e){function t(i,n=Zi){let o,s=$e.getTransfer(n);if(i===pi)return r.UNSIGNED_BYTE;if(i===Ko)return r.UNSIGNED_SHORT_4_4_4_4;if(i===Xo)return r.UNSIGNED_SHORT_5_5_5_1;if(i===kc)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===Pc)return r.BYTE;if(i===zc)return r.SHORT;if(i===rn)return r.UNSIGNED_SHORT;if(i===Ho)return r.INT;if(i===Fi)return r.UNSIGNED_INT;if(i===Si)return r.FLOAT;if(i===Pr)return r.HALF_FLOAT;if(i===Nc)return r.ALPHA;if(i===Ic)return r.RGB;if(i===ri)return r.RGBA;if(i===Oc)return r.LUMINANCE;if(i===Fc)return r.LUMINANCE_ALPHA;if(i===zr)return r.DEPTH_COMPONENT;if(i===kr)return r.DEPTH_STENCIL;if(i===Uc)return r.RED;if(i===qo)return r.RED_INTEGER;if(i===Bc)return r.RG;if(i===jo)return r.RG_INTEGER;if(i===Yo)return r.RGBA_INTEGER;if(i===Qo||i===Zo||i===$o||i===Jo)if(s===at)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Qo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Jo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Qo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$o)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Jo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Na||i===Ia||i===Oa||i===Fa)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Na)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ia)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ua||i===Ba||i===Ga)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(i===Ua||i===Ba)return s===at?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===Ga)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Va||i===Wa||i===Ha||i===Ka||i===Xa||i===qa||i===ja||i===Ya||i===Qa||i===Za||i===$a||i===Ja||i===el||i===tl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(i===Va)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wa)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ka)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Xa)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qa)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ja)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ya)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qa)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Za)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$a)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ja)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===el)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===tl)return s===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===es||i===il||i===rl)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(i===es)return s===at?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===il)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===rl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Gc||i===nl||i===ol||i===sl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(i===es)return o.COMPRESSED_RED_RGTC1_EXT;if(i===nl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ol)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===mr?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:t}}var XM=S(()=>{it();Ur()});var Kf,qM=S(()=>{ws();Kf=class extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}});var r6,Fs,jM=S(()=>{Dt();nf();r6={type:"move"},Fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,o=null,s=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,i),h=this._getHandJoint(c,y);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}let f=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=f.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&p>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&o!==null&&(n=o),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(r6)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new vr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}});var n6,o6,Xf,YM=S(()=>{_h();As();Kn();cn();n6=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,o6=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Xf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){let n=new Bt,o=e.properties.get(n);o.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Ri({vertexShader:n6,fragmentShader:o6,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new kt(new Ts(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}});var qf,QM=S(()=>{qM();uo();ws();bi();Dt();Wn();Mi();bh();Ds();jM();Ih();it();YM();qf=class extends Li{constructor(e,t){super();let i=this,n=null,o=1,s=null,a="local-floor",l=1,c=null,f=null,u=null,p=null,d=null,m=null,y=new Xf,g=t.getContextAttributes(),h=null,w=null,b=[],v=[],P=new Ve,D=null,C=new Yt;C.viewport=new St;let k=new Yt;k.viewport=new St;let M=[C,k],x=new Kf,R=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ie=b[Y];return ie===void 0&&(ie=new Fs,b[Y]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Y){let ie=b[Y];return ie===void 0&&(ie=new Fs,b[Y]=ie),ie.getGripSpace()},this.getHand=function(Y){let ie=b[Y];return ie===void 0&&(ie=new Fs,b[Y]=ie),ie.getHandSpace()};function z(Y){let ie=v.indexOf(Y.inputSource);if(ie===-1)return;let me=b[ie];me!==void 0&&(me.update(Y.inputSource,Y.frame,c||s),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){n.removeEventListener("select",z),n.removeEventListener("selectstart",z),n.removeEventListener("selectend",z),n.removeEventListener("squeeze",z),n.removeEventListener("squeezestart",z),n.removeEventListener("squeezeend",z),n.removeEventListener("end",O),n.removeEventListener("inputsourceschange",K);for(let Y=0;Y<b.length;Y++){let ie=v[Y];ie!==null&&(v[Y]=null,b[Y].disconnect(ie))}R=null,W=null,y.reset(),e.setRenderTarget(h),d=null,p=null,u=null,n=null,w=null,Ge.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(Y){if(n=Y,n!==null){if(h=e.getRenderTarget(),n.addEventListener("select",z),n.addEventListener("selectstart",z),n.addEventListener("selectend",z),n.addEventListener("squeeze",z),n.addEventListener("squeezestart",z),n.addEventListener("squeezeend",z),n.addEventListener("end",O),n.addEventListener("inputsourceschange",K),g.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(P),n.renderState.layers===void 0){let ie={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};d=new XRWebGLLayer(n,t,ie),n.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new zi(d.framebufferWidth,d.framebufferHeight,{format:ri,type:pi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ie=null,me=null,oe=null;g.depth&&(oe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=g.stencil?kr:zr,me=g.stencil?mr:Fi);let Ae={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:o};u=new XRWebGLBinding(n,t),p=u.createProjectionLayer(Ae),n.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),w=new zi(p.textureWidth,p.textureHeight,{format:ri,type:pi,depthTexture:new Is(p.textureWidth,p.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await n.requestReferenceSpace(a),Ge.setContext(n),Ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function K(Y){for(let ie=0;ie<Y.removed.length;ie++){let me=Y.removed[ie],oe=v.indexOf(me);oe>=0&&(v[oe]=null,b[oe].disconnect(me))}for(let ie=0;ie<Y.added.length;ie++){let me=Y.added[ie],oe=v.indexOf(me);if(oe===-1){for(let Pe=0;Pe<b.length;Pe++)if(Pe>=v.length){v.push(me),oe=Pe;break}else if(v[Pe]===null){v[Pe]=me,oe=Pe;break}if(oe===-1)break}let Ae=b[oe];Ae&&Ae.connect(me)}}let V=new I,Z=new I;function G(Y,ie,me){V.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(me.matrixWorld);let oe=V.distanceTo(Z),Ae=ie.projectionMatrix.elements,Pe=me.projectionMatrix.elements,B=Ae[14]/(Ae[10]-1),se=Ae[14]/(Ae[10]+1),fe=(Ae[9]+1)/Ae[5],de=(Ae[9]-1)/Ae[5],L=(Ae[8]-1)/Ae[0],Ke=(Pe[8]+1)/Pe[0],ze=B*L,nt=B*Ke,Ne=oe/(-L+Ke),Et=Ne*-L;if(ie.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Et),Y.translateZ(Ne),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ae[10]===-1)Y.projectionMatrix.copy(ie.projectionMatrix),Y.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{let Ie=B+Ne,A=se+Ne,E=ze-Et,H=nt+(oe-Et),ee=fe*se/A*Ie,ne=de*se/A*Ie;Y.projectionMatrix.makePerspective(E,H,ee,ne,Ie,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function $(Y,ie){ie===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ie.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(n===null)return;let ie=Y.near,me=Y.far;y.texture!==null&&(y.depthNear>0&&(ie=y.depthNear),y.depthFar>0&&(me=y.depthFar)),x.near=k.near=C.near=ie,x.far=k.far=C.far=me,(R!==x.near||W!==x.far)&&(n.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,W=x.far),C.layers.mask=Y.layers.mask|2,k.layers.mask=Y.layers.mask|4,x.layers.mask=C.layers.mask|k.layers.mask;let oe=Y.parent,Ae=x.cameras;$(x,oe);for(let Pe=0;Pe<Ae.length;Pe++)$(Ae[Pe],oe);Ae.length===2?G(x,C,k):x.projectionMatrix.copy(C.projectionMatrix),re(Y,x,oe)};function re(Y,ie,me){me===null?Y.matrix.copy(ie.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ie.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ie.projectionMatrix),Y.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=al*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(Y){l=Y,p!==null&&(p.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(x)};let ue=null;function ke(Y,ie){if(f=ie.getViewerPose(c||s),m=ie,f!==null){let me=f.views;d!==null&&(e.setRenderTargetFramebuffer(w,d.framebuffer),e.setRenderTarget(w));let oe=!1;me.length!==x.cameras.length&&(x.cameras.length=0,oe=!0);for(let Pe=0;Pe<me.length;Pe++){let B=me[Pe],se=null;if(d!==null)se=d.getViewport(B);else{let de=u.getViewSubImage(p,B);se=de.viewport,Pe===0&&(e.setRenderTargetTextures(w,de.colorTexture,p.ignoreDepthValues?void 0:de.depthStencilTexture),e.setRenderTarget(w))}let fe=M[Pe];fe===void 0&&(fe=new Yt,fe.layers.enable(Pe),fe.viewport=new St,M[Pe]=fe),fe.matrix.fromArray(B.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(B.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(se.x,se.y,se.width,se.height),Pe===0&&(x.matrix.copy(fe.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),oe===!0&&x.cameras.push(fe)}let Ae=n.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")){let Pe=u.getDepthInformation(me[0]);Pe&&Pe.isValid&&Pe.texture&&y.init(e,Pe,n.renderState)}}for(let me=0;me<b.length;me++){let oe=v[me],Ae=b[me];oe!==null&&Ae!==void 0&&Ae.update(oe,ie,c||s)}ue&&ue(Y,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),m=null}let Ge=new Lf;Ge.setAnimationLoop(ke),this.setAnimationLoop=function(Y){ue=Y},this.dispose=function(){}}}});function ZM(r,e){function t(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Pf(r)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function n(g,h,w,b,v){h.isMeshBasicMaterial||h.isMeshLambertMaterial?o(g,h):h.isMeshToonMaterial?(o(g,h),u(g,h)):h.isMeshPhongMaterial?(o(g,h),f(g,h)):h.isMeshStandardMaterial?(o(g,h),p(g,h),h.isMeshPhysicalMaterial&&d(g,h,v)):h.isMeshMatcapMaterial?(o(g,h),m(g,h)):h.isMeshDepthMaterial?o(g,h):h.isMeshDistanceMaterial?(o(g,h),y(g,h)):h.isMeshNormalMaterial?o(g,h):h.isLineBasicMaterial?(s(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?l(g,h,w,b):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function o(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,t(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,t(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===dt&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,t(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===dt&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,t(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,t(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);let w=e.get(h),b=w.envMap,v=w.envMapRotation;b&&(g.envMap.value=b,bo.copy(v),bo.x*=-1,bo.y*=-1,bo.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(bo.y*=-1,bo.z*=-1),g.envMapRotation.value.setFromMatrix4(s6.makeRotationFromEuler(bo)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,g.aoMapTransform))}function s(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,t(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,w,b){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*w,g.scale.value=b*.5,h.map&&(g.map.value=h.map,t(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,t(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function f(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function u(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function p(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function d(g,h,w){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===dt&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function y(g,h){let w=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}var bo,s6,$M=S(()=>{it();So();In();er();bo=new zt,s6=new rt});function JM(r,e,t,i){let n={},o={},s=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,b){let v=b.program;i.uniformBlockBinding(w,v)}function c(w,b){let v=n[w.id];v===void 0&&(m(w),v=f(w),n[w.id]=v,w.addEventListener("dispose",g));let P=b.program;i.updateUBOMapping(w,P);let D=e.render.frame;o[w.id]!==D&&(p(w),o[w.id]=D)}function f(w){let b=u();w.__bindingPointIndex=b;let v=r.createBuffer(),P=w.__size,D=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,P,D),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,v),v}function u(){for(let w=0;w<a;w++)if(s.indexOf(w)===-1)return s.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(w){let b=n[w.id],v=w.uniforms,P=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let D=0,C=v.length;D<C;D++){let k=Array.isArray(v[D])?v[D]:[v[D]];for(let M=0,x=k.length;M<x;M++){let R=k[M];if(d(R,D,M,P)===!0){let W=R.__offset,z=Array.isArray(R.value)?R.value:[R.value],O=0;for(let K=0;K<z.length;K++){let V=z[K],Z=y(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,W+O,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,O),O+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,W,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(w,b,v,P){let D=w.value,C=b+"_"+v;if(P[C]===void 0)return typeof D=="number"||typeof D=="boolean"?P[C]=D:P[C]=D.clone(),!0;{let k=P[C];if(typeof D=="number"||typeof D=="boolean"){if(k!==D)return P[C]=D,!0}else if(k.equals(D)===!1)return k.copy(D),!0}return!1}function m(w){let b=w.uniforms,v=0,P=16;for(let C=0,k=b.length;C<k;C++){let M=Array.isArray(b[C])?b[C]:[b[C]];for(let x=0,R=M.length;x<R;x++){let W=M[x],z=Array.isArray(W.value)?W.value:[W.value];for(let O=0,K=z.length;O<K;O++){let V=z[O],Z=y(V),G=v%P,$=G%Z.boundary,re=G+$;v+=$,re!==0&&P-re<Z.storage&&(v+=P-re),W.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=v,v+=Z.storage}}}let D=v%P;return D>0&&(v+=P-D),w.__size=v,w.__cache={},this}function y(w){let b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function g(w){let b=w.target;b.removeEventListener("dispose",g);let v=s.indexOf(b.__bindingPointIndex);s.splice(v,1),r.deleteBuffer(n[b.id]),delete n[b.id],delete o[b.id]}function h(){for(let w in n)r.deleteBuffer(n[w]);s=[],n={},o={}}return{bind:l,update:c,dispose:h}}var eb=S(()=>{});var jf,tb=S(()=>{it();ir();Mh();er();Dt();Wn();bh();d2();gE();xE();vE();ME();_E();DE();UE();GE();WE();KE();qE();YE();ZE();EM();bM();TM();PM();Ds();UM();GM();HM();Gh();XM();QM();$M();eb();Un();Ur();jf=class{constructor(e={}){let{canvas:t=_y(),context:i=null,depth:n=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=s;let m=new Uint32Array(4),y=new Int32Array(4),g=null,h=null,w=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vi,this.toneMapping=Qi,this.toneMappingExposure=1;let v=this,P=!1,D=0,C=0,k=null,M=-1,x=null,R=new St,W=new St,z=null,O=new Ue(0),K=0,V=t.width,Z=t.height,G=1,$=null,re=null,ue=new St(0,0,V,Z),ke=new St(0,0,V,Z),Ge=!1,Y=new Rs,ie=!1,me=!1,oe=new rt,Ae=new rt,Pe=new I,B=new St,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},fe=!1;function de(){return k===null?G:1}let L=i;function Ke(_,F){return t.getContext(_,F)}try{let _={alpha:!0,depth:n,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"170"}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",ye,!1),L===null){let F="webgl2";if(L=Ke(F,_),L===null)throw Ke(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let ze,nt,Ne,Et,Ie,A,E,H,ee,ne,J,De,ge,ve,ct,ae,Ee,Be,We,Me,st,Je,Mt,N;function he(){ze=new BE(L),ze.init(),Je=new KM(L,ze),nt=new EE(L,ze,e,Je),Ne=new BM(L,ze),nt.reverseDepthBuffer&&p&&Ne.buffers.depth.setReversed(!0),Et=new XE(L),Ie=new MM,A=new WM(L,ze,Ne,Ie,nt,Je,Et),E=new AE(v),H=new FE(v),ee=new p2(L),Mt=new yE(L,ee),ne=new VE(L,ee,Et,Mt),J=new QE(L,ne,ee,Et),We=new jE(L,nt,A),ae=new bE(Ie),De=new vM(v,E,H,ze,nt,Mt,ae),ge=new ZM(v,Ie),ve=new RM,ct=new LM(ze),Be=new mE(v,E,H,Ne,J,d,l),Ee=new FM(v,J,nt),N=new JM(L,Et,nt,Ne),Me=new SE(L,ze,Et),st=new HE(L,ze,Et),Et.programs=De.programs,v.capabilities=nt,v.extensions=ze,v.properties=Ie,v.renderLists=ve,v.shadowMap=Ee,v.state=Ne,v.info=Et}he();let Q=new qf(v,L);this.xr=Q,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let _=ze.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=ze.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(_){_!==void 0&&(G=_,this.setSize(V,Z,!1))},this.getSize=function(_){return _.set(V,Z)},this.setSize=function(_,F,X=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=_,Z=F,t.width=Math.floor(_*G),t.height=Math.floor(F*G),X===!0&&(t.style.width=_+"px",t.style.height=F+"px"),this.setViewport(0,0,_,F)},this.getDrawingBufferSize=function(_){return _.set(V*G,Z*G).floor()},this.setDrawingBufferSize=function(_,F,X){V=_,Z=F,G=X,t.width=Math.floor(_*X),t.height=Math.floor(F*X),this.setViewport(0,0,_,F)},this.getCurrentViewport=function(_){return _.copy(R)},this.getViewport=function(_){return _.copy(ue)},this.setViewport=function(_,F,X,q){_.isVector4?ue.set(_.x,_.y,_.z,_.w):ue.set(_,F,X,q),Ne.viewport(R.copy(ue).multiplyScalar(G).round())},this.getScissor=function(_){return _.copy(ke)},this.setScissor=function(_,F,X,q){_.isVector4?ke.set(_.x,_.y,_.z,_.w):ke.set(_,F,X,q),Ne.scissor(W.copy(ke).multiplyScalar(G).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(_){Ne.setScissorTest(Ge=_)},this.setOpaqueSort=function(_){$=_},this.setTransparentSort=function(_){re=_},this.getClearColor=function(_){return _.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(_=!0,F=!0,X=!0){let q=0;if(_){let U=!1;if(k!==null){let ce=k.texture.format;U=ce===Yo||ce===jo||ce===qo}if(U){let ce=k.texture.type,xe=ce===pi||ce===Fi||ce===rn||ce===mr||ce===Ko||ce===Xo,_e=Be.getClearColor(),we=Be.getClearAlpha(),Xe=_e.r,Qe=_e.g,Re=_e.b;xe?(m[0]=Xe,m[1]=Qe,m[2]=Re,m[3]=we,L.clearBufferuiv(L.COLOR,0,m)):(y[0]=Xe,y[1]=Qe,y[2]=Re,y[3]=we,L.clearBufferiv(L.COLOR,0,y))}else q|=L.COLOR_BUFFER_BIT}F&&(q|=L.DEPTH_BUFFER_BIT),X&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),ve.dispose(),ct.dispose(),Ie.dispose(),E.dispose(),H.dispose(),J.dispose(),Mt.dispose(),N.dispose(),De.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",dm),Q.removeEventListener("sessionend",hm),eo.stop()};function te(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let _=Et.autoReset,F=Ee.enabled,X=Ee.autoUpdate,q=Ee.needsUpdate,U=Ee.type;he(),Et.autoReset=_,Ee.enabled=F,Ee.autoUpdate=X,Ee.needsUpdate=q,Ee.type=U}function ye(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function Ye(_){let F=_.target;F.removeEventListener("dispose",Ye),Nt(F)}function Nt(_){li(_),Ie.remove(_)}function li(_){let F=Ie.get(_).programs;F!==void 0&&(F.forEach(function(X){De.releaseProgram(X)}),_.isShaderMaterial&&De.releaseShaderCache(_))}this.renderBufferDirect=function(_,F,X,q,U,ce){F===null&&(F=se);let xe=U.isMesh&&U.matrixWorld.determinant()<0,_e=Tb(_,F,X,q,U);Ne.setMaterial(q,xe);let we=X.index,Xe=1;if(q.wireframe===!0){if(we=ne.getWireframeAttribute(X),we===void 0)return;Xe=2}let Qe=X.drawRange,Re=X.attributes.position,ut=Qe.start*Xe,bt=(Qe.start+Qe.count)*Xe;ce!==null&&(ut=Math.max(ut,ce.start*Xe),bt=Math.min(bt,(ce.start+ce.count)*Xe)),we!==null?(ut=Math.max(ut,0),bt=Math.min(bt,we.count)):Re!=null&&(ut=Math.max(ut,0),bt=Math.min(bt,Re.count));let Rt=bt-ut;if(Rt<0||Rt===1/0)return;Mt.setup(U,q,_e,X,we);let Ai,mt=Me;if(we!==null&&(Ai=ee.get(we),mt=st,mt.setIndex(Ai)),U.isMesh)q.wireframe===!0?(Ne.setLineWidth(q.wireframeLinewidth*de()),mt.setMode(L.LINES)):mt.setMode(L.TRIANGLES);else if(U.isLine){let Ce=q.linewidth;Ce===void 0&&(Ce=1),Ne.setLineWidth(Ce*de()),U.isLineSegments?mt.setMode(L.LINES):U.isLineLoop?mt.setMode(L.LINE_LOOP):mt.setMode(L.LINE_STRIP)}else U.isPoints?mt.setMode(L.POINTS):U.isSprite&&mt.setMode(L.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)mt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))mt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Ce=U._multiDrawStarts,Kr=U._multiDrawCounts,gt=U._multiDrawCount,or=we?ee.get(we).bytesPerElement:1,wo=Ie.get(q).currentProgram.getUniforms();for(let ki=0;ki<gt;ki++)wo.setValue(L,"_gl_DrawID",ki),mt.render(Ce[ki]/or,Kr[ki])}else if(U.isInstancedMesh)mt.renderInstances(ut,Rt,U.count);else if(X.isInstancedBufferGeometry){let Ce=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Kr=Math.min(X.instanceCount,Ce);mt.renderInstances(ut,Rt,Kr)}else mt.render(ut,Rt)};function yt(_,F,X){_.transparent===!0&&_.side===si&&_.forceSinglePass===!1?(_.side=dt,_.needsUpdate=!0,Il(_,F,X),_.side=qt,_.needsUpdate=!0,Il(_,F,X),_.side=si):Il(_,F,X)}this.compile=function(_,F,X=null){X===null&&(X=_),h=ct.get(X),h.init(F),b.push(h),X.traverseVisible(function(U){U.isLight&&U.layers.test(F.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),_!==X&&_.traverseVisible(function(U){U.isLight&&U.layers.test(F.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),h.setupLights();let q=new Set;return _.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let ce=U.material;if(ce)if(Array.isArray(ce))for(let xe=0;xe<ce.length;xe++){let _e=ce[xe];yt(_e,X,U),q.add(_e)}else yt(ce,X,U),q.add(ce)}),b.pop(),h=null,q},this.compileAsync=function(_,F,X=null){let q=this.compile(_,F,X);return new Promise(U=>{function ce(){if(q.forEach(function(xe){Ie.get(xe).currentProgram.isReady()&&q.delete(xe)}),q.size===0){U(_);return}setTimeout(ce,10)}ze.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let nr=null;function Hr(_){nr&&nr(_)}function dm(){eo.stop()}function hm(){eo.start()}let eo=new Lf;eo.setAnimationLoop(Hr),typeof self<"u"&&eo.setContext(self),this.setAnimationLoop=function(_){nr=_,Q.setAnimationLoop(_),_===null?eo.stop():eo.start()},Q.addEventListener("sessionstart",dm),Q.addEventListener("sessionend",hm),this.render=function(_,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(F),F=Q.getCamera()),_.isScene===!0&&_.onBeforeRender(v,_,F,k),h=ct.get(_,b.length),h.init(F),b.push(h),Ae.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(Ae),me=this.localClippingEnabled,ie=ae.init(this.clippingPlanes,me),g=ve.get(_,w.length),g.init(),w.push(g),Q.enabled===!0&&Q.isPresenting===!0){let ce=v.xr.getDepthSensingMesh();ce!==null&&rp(ce,F,-1/0,v.sortObjects)}rp(_,F,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort($,re),fe=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,fe&&Be.addToRenderList(g,_),this.info.render.frame++,ie===!0&&ae.beginShadows();let X=h.state.shadowsArray;Ee.render(X,_,F),ie===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=g.opaque,U=g.transmissive;if(h.setupLights(),F.isArrayCamera){let ce=F.cameras;if(U.length>0)for(let xe=0,_e=ce.length;xe<_e;xe++){let we=ce[xe];gm(q,U,_,we)}fe&&Be.render(_);for(let xe=0,_e=ce.length;xe<_e;xe++){let we=ce[xe];mm(g,_,we,we.viewport)}}else U.length>0&&gm(q,U,_,F),fe&&Be.render(_),mm(g,_,F);k!==null&&(A.updateMultisampleRenderTarget(k),A.updateRenderTargetMipmap(k)),_.isScene===!0&&_.onAfterRender(v,_,F),Mt.resetDefaultState(),M=-1,x=null,b.pop(),b.length>0?(h=b[b.length-1],ie===!0&&ae.setGlobalState(v.clippingPlanes,h.state.camera)):h=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function rp(_,F,X,q){if(_.visible===!1)return;if(_.layers.test(F.layers)){if(_.isGroup)X=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(F);else if(_.isLight)h.pushLight(_),_.castShadow&&h.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||Y.intersectsSprite(_)){q&&B.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ae);let xe=J.update(_),_e=_.material;_e.visible&&g.push(_,xe,_e,X,B.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||Y.intersectsObject(_))){let xe=J.update(_),_e=_.material;if(q&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),B.copy(_.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),B.copy(xe.boundingSphere.center)),B.applyMatrix4(_.matrixWorld).applyMatrix4(Ae)),Array.isArray(_e)){let we=xe.groups;for(let Xe=0,Qe=we.length;Xe<Qe;Xe++){let Re=we[Xe],ut=_e[Re.materialIndex];ut&&ut.visible&&g.push(_,xe,ut,X,B.z,Re)}}else _e.visible&&g.push(_,xe,_e,X,B.z,null)}}let ce=_.children;for(let xe=0,_e=ce.length;xe<_e;xe++)rp(ce[xe],F,X,q)}function mm(_,F,X,q){let U=_.opaque,ce=_.transmissive,xe=_.transparent;h.setupLightsView(X),ie===!0&&ae.setGlobalState(v.clippingPlanes,X),q&&Ne.viewport(R.copy(q)),U.length>0&&Nl(U,F,X),ce.length>0&&Nl(ce,F,X),xe.length>0&&Nl(xe,F,X),Ne.buffers.depth.setTest(!0),Ne.buffers.depth.setMask(!0),Ne.buffers.color.setMask(!0),Ne.setPolygonOffset(!1)}function gm(_,F,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[q.id]===void 0&&(h.state.transmissionRenderTarget[q.id]=new zi(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Pr:pi,minFilter:hr,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));let ce=h.state.transmissionRenderTarget[q.id],xe=q.viewport||R;ce.setSize(xe.z,xe.w);let _e=v.getRenderTarget();v.setRenderTarget(ce),v.getClearColor(O),K=v.getClearAlpha(),K<1&&v.setClearColor(16777215,.5),v.clear(),fe&&Be.render(X);let we=v.toneMapping;v.toneMapping=Qi;let Xe=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),h.setupLightsView(q),ie===!0&&ae.setGlobalState(v.clippingPlanes,q),Nl(_,X,q),A.updateMultisampleRenderTarget(ce),A.updateRenderTargetMipmap(ce),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Re=0,ut=F.length;Re<ut;Re++){let bt=F[Re],Rt=bt.object,Ai=bt.geometry,mt=bt.material,Ce=bt.group;if(mt.side===si&&Rt.layers.test(q.layers)){let Kr=mt.side;mt.side=dt,mt.needsUpdate=!0,ym(Rt,X,q,Ai,mt,Ce),mt.side=Kr,mt.needsUpdate=!0,Qe=!0}}Qe===!0&&(A.updateMultisampleRenderTarget(ce),A.updateRenderTargetMipmap(ce))}v.setRenderTarget(_e),v.setClearColor(O,K),Xe!==void 0&&(q.viewport=Xe),v.toneMapping=we}function Nl(_,F,X){let q=F.isScene===!0?F.overrideMaterial:null;for(let U=0,ce=_.length;U<ce;U++){let xe=_[U],_e=xe.object,we=xe.geometry,Xe=q===null?xe.material:q,Qe=xe.group;_e.layers.test(X.layers)&&ym(_e,F,X,we,Xe,Qe)}}function ym(_,F,X,q,U,ce){_.onBeforeRender(v,F,X,q,U,ce),_.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),U.onBeforeRender(v,F,X,q,_,ce),U.transparent===!0&&U.side===si&&U.forceSinglePass===!1?(U.side=dt,U.needsUpdate=!0,v.renderBufferDirect(X,F,q,U,_,ce),U.side=qt,U.needsUpdate=!0,v.renderBufferDirect(X,F,q,U,_,ce),U.side=si):v.renderBufferDirect(X,F,q,U,_,ce),_.onAfterRender(v,F,X,q,U,ce)}function Il(_,F,X){F.isScene!==!0&&(F=se);let q=Ie.get(_),U=h.state.lights,ce=h.state.shadowsArray,xe=U.state.version,_e=De.getParameters(_,U.state,ce,F,X),we=De.getProgramCacheKey(_e),Xe=q.programs;q.environment=_.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(_.isMeshStandardMaterial?H:E).get(_.envMap||q.environment),q.envMapRotation=q.environment!==null&&_.envMap===null?F.environmentRotation:_.envMapRotation,Xe===void 0&&(_.addEventListener("dispose",Ye),Xe=new Map,q.programs=Xe);let Qe=Xe.get(we);if(Qe!==void 0){if(q.currentProgram===Qe&&q.lightsStateVersion===xe)return Sm(_,_e),Qe}else _e.uniforms=De.getUniforms(_),_.onBeforeCompile(_e,v),Qe=De.acquireProgram(_e,we),Xe.set(we,Qe),q.uniforms=_e.uniforms;let Re=q.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Re.clippingPlanes=ae.uniform),Sm(_,_e),q.needsLights=Db(_),q.lightsStateVersion=xe,q.needsLights&&(Re.ambientLightColor.value=U.state.ambient,Re.lightProbe.value=U.state.probe,Re.directionalLights.value=U.state.directional,Re.directionalLightShadows.value=U.state.directionalShadow,Re.spotLights.value=U.state.spot,Re.spotLightShadows.value=U.state.spotShadow,Re.rectAreaLights.value=U.state.rectArea,Re.ltc_1.value=U.state.rectAreaLTC1,Re.ltc_2.value=U.state.rectAreaLTC2,Re.pointLights.value=U.state.point,Re.pointLightShadows.value=U.state.pointShadow,Re.hemisphereLights.value=U.state.hemi,Re.directionalShadowMap.value=U.state.directionalShadowMap,Re.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Re.spotShadowMap.value=U.state.spotShadowMap,Re.spotLightMatrix.value=U.state.spotLightMatrix,Re.spotLightMap.value=U.state.spotLightMap,Re.pointShadowMap.value=U.state.pointShadowMap,Re.pointShadowMatrix.value=U.state.pointShadowMatrix),q.currentProgram=Qe,q.uniformsList=null,Qe}function xm(_){if(_.uniformsList===null){let F=_.currentProgram.getUniforms();_.uniformsList=Zn.seqWithValue(F.seq,_.uniforms)}return _.uniformsList}function Sm(_,F){let X=Ie.get(_);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function Tb(_,F,X,q,U){F.isScene!==!0&&(F=se),A.resetTextureUnits();let ce=F.fog,xe=q.isMeshStandardMaterial?F.environment:null,_e=k===null?v.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:gr,we=(q.isMeshStandardMaterial?H:E).get(q.envMap||xe),Xe=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Qe=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Re=!!X.morphAttributes.position,ut=!!X.morphAttributes.normal,bt=!!X.morphAttributes.color,Rt=Qi;q.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Rt=v.toneMapping);let Ai=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,mt=Ai!==void 0?Ai.length:0,Ce=Ie.get(q),Kr=h.state.lights;if(ie===!0&&(me===!0||_!==x)){let Gi=_===x&&q.id===M;ae.setState(q,_,Gi)}let gt=!1;q.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Kr.state.version||Ce.outputColorSpace!==_e||U.isBatchedMesh&&Ce.batching===!1||!U.isBatchedMesh&&Ce.batching===!0||U.isBatchedMesh&&Ce.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ce.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ce.instancing===!1||!U.isInstancedMesh&&Ce.instancing===!0||U.isSkinnedMesh&&Ce.skinning===!1||!U.isSkinnedMesh&&Ce.skinning===!0||U.isInstancedMesh&&Ce.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ce.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ce.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ce.instancingMorph===!1&&U.morphTexture!==null||Ce.envMap!==we||q.fog===!0&&Ce.fog!==ce||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ae.numPlanes||Ce.numIntersection!==ae.numIntersection)||Ce.vertexAlphas!==Xe||Ce.vertexTangents!==Qe||Ce.morphTargets!==Re||Ce.morphNormals!==ut||Ce.morphColors!==bt||Ce.toneMapping!==Rt||Ce.morphTargetsCount!==mt)&&(gt=!0):(gt=!0,Ce.__version=q.version);let or=Ce.currentProgram;gt===!0&&(or=Il(q,F,U));let wo=!1,ki=!1,Ks=!1,Tt=or.getUniforms(),_r=Ce.uniforms;if(Ne.useProgram(or.program)&&(wo=!0,ki=!0,Ks=!0),q.id!==M&&(M=q.id,ki=!0),wo||x!==_){Ne.buffers.depth.getReversed()?(oe.copy(_.projectionMatrix),Ry(oe),Ty(oe),Tt.setValue(L,"projectionMatrix",oe)):Tt.setValue(L,"projectionMatrix",_.projectionMatrix),Tt.setValue(L,"viewMatrix",_.matrixWorldInverse);let xn=Tt.map.cameraPosition;xn!==void 0&&xn.setValue(L,Pe.setFromMatrixPosition(_.matrixWorld)),nt.logarithmicDepthBuffer&&Tt.setValue(L,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Tt.setValue(L,"isOrthographic",_.isOrthographicCamera===!0),x!==_&&(x=_,ki=!0,Ks=!0)}if(U.isSkinnedMesh){Tt.setOptional(L,U,"bindMatrix"),Tt.setOptional(L,U,"bindMatrixInverse");let Gi=U.skeleton;Gi&&(Gi.boneTexture===null&&Gi.computeBoneTexture(),Tt.setValue(L,"boneTexture",Gi.boneTexture,A))}U.isBatchedMesh&&(Tt.setOptional(L,U,"batchingTexture"),Tt.setValue(L,"batchingTexture",U._matricesTexture,A),Tt.setOptional(L,U,"batchingIdTexture"),Tt.setValue(L,"batchingIdTexture",U._indirectTexture,A),Tt.setOptional(L,U,"batchingColorTexture"),U._colorsTexture!==null&&Tt.setValue(L,"batchingColorTexture",U._colorsTexture,A));let Xs=X.morphAttributes;if((Xs.position!==void 0||Xs.normal!==void 0||Xs.color!==void 0)&&We.update(U,X,or),(ki||Ce.receiveShadow!==U.receiveShadow)&&(Ce.receiveShadow=U.receiveShadow,Tt.setValue(L,"receiveShadow",U.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(_r.envMap.value=we,_r.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(_r.envMapIntensity.value=F.environmentIntensity),ki&&(Tt.setValue(L,"toneMappingExposure",v.toneMappingExposure),Ce.needsLights&&Ab(_r,Ks),ce&&q.fog===!0&&ge.refreshFogUniforms(_r,ce),ge.refreshMaterialUniforms(_r,q,G,Z,h.state.transmissionRenderTarget[_.id]),Zn.upload(L,xm(Ce),_r,A)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Zn.upload(L,xm(Ce),_r,A),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Tt.setValue(L,"center",U.center),Tt.setValue(L,"modelViewMatrix",U.modelViewMatrix),Tt.setValue(L,"normalMatrix",U.normalMatrix),Tt.setValue(L,"modelMatrix",U.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Gi=q.uniformsGroups;for(let xn=0,Sn=Gi.length;xn<Sn;xn++){let vm=Gi[xn];N.update(vm,or),N.bind(vm,or)}}return or}function Ab(_,F){_.ambientLightColor.needsUpdate=F,_.lightProbe.needsUpdate=F,_.directionalLights.needsUpdate=F,_.directionalLightShadows.needsUpdate=F,_.pointLights.needsUpdate=F,_.pointLightShadows.needsUpdate=F,_.spotLights.needsUpdate=F,_.spotLightShadows.needsUpdate=F,_.rectAreaLights.needsUpdate=F,_.hemisphereLights.needsUpdate=F}function Db(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(_,F,X){Ie.get(_.texture).__webglTexture=F,Ie.get(_.depthTexture).__webglTexture=X;let q=Ie.get(_);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(_,F){let X=Ie.get(_);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(_,F=0,X=0){k=_,D=F,C=X;let q=!0,U=null,ce=!1,xe=!1;if(_){let we=Ie.get(_);if(we.__useDefaultFramebuffer!==void 0)Ne.bindFramebuffer(L.FRAMEBUFFER,null),q=!1;else if(we.__webglFramebuffer===void 0)A.setupRenderTarget(_);else if(we.__hasExternalTextures)A.rebindTextures(_,Ie.get(_.texture).__webglTexture,Ie.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Re=_.depthTexture;if(we.__boundDepthTexture!==Re){if(Re!==null&&Ie.has(Re)&&(_.width!==Re.image.width||_.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(_)}}let Xe=_.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(xe=!0);let Qe=Ie.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Qe[F])?U=Qe[F][X]:U=Qe[F],ce=!0):_.samples>0&&A.useMultisampledRTT(_)===!1?U=Ie.get(_).__webglMultisampledFramebuffer:Array.isArray(Qe)?U=Qe[X]:U=Qe,R.copy(_.viewport),W.copy(_.scissor),z=_.scissorTest}else R.copy(ue).multiplyScalar(G).floor(),W.copy(ke).multiplyScalar(G).floor(),z=Ge;if(Ne.bindFramebuffer(L.FRAMEBUFFER,U)&&q&&Ne.drawBuffers(_,U),Ne.viewport(R),Ne.scissor(W),Ne.setScissorTest(z),ce){let we=Ie.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,we.__webglTexture,X)}else if(xe){let we=Ie.get(_.texture),Xe=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.__webglTexture,X||0,Xe)}M=-1},this.readRenderTargetPixels=function(_,F,X,q,U,ce,xe){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Ie.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&xe!==void 0&&(_e=_e[xe]),_e){Ne.bindFramebuffer(L.FRAMEBUFFER,_e);try{let we=_.texture,Xe=we.format,Qe=we.type;if(!nt.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=_.width-q&&X>=0&&X<=_.height-U&&L.readPixels(F,X,q,U,Je.convert(Xe),Je.convert(Qe),ce)}finally{let we=k!==null?Ie.get(k).__webglFramebuffer:null;Ne.bindFramebuffer(L.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(_,F,X,q,U,ce,xe){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Ie.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&xe!==void 0&&(_e=_e[xe]),_e){let we=_.texture,Xe=we.format,Qe=we.type;if(!nt.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=_.width-q&&X>=0&&X<=_.height-U){Ne.bindFramebuffer(L.FRAMEBUFFER,_e);let Re=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Re),L.bufferData(L.PIXEL_PACK_BUFFER,ce.byteLength,L.STREAM_READ),L.readPixels(F,X,q,U,Je.convert(Xe),Je.convert(Qe),0);let ut=k!==null?Ie.get(k).__webglFramebuffer:null;Ne.bindFramebuffer(L.FRAMEBUFFER,ut);let bt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await wy(L,bt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Re),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ce),L.deleteBuffer(Re),L.deleteSync(bt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(_,F=null,X=0){_.isTexture!==!0&&(po("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,_=arguments[1]);let q=Math.pow(2,-X),U=Math.floor(_.image.width*q),ce=Math.floor(_.image.height*q),xe=F!==null?F.x:0,_e=F!==null?F.y:0;A.setTexture2D(_,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,xe,_e,U,ce),Ne.unbindTexture()},this.copyTextureToTexture=function(_,F,X=null,q=null,U=0){_.isTexture!==!0&&(po("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,_=arguments[1],F=arguments[2],U=arguments[3]||0,X=null);let ce,xe,_e,we,Xe,Qe,Re,ut,bt,Rt=_.isCompressedTexture?_.mipmaps[U]:_.image;X!==null?(ce=X.max.x-X.min.x,xe=X.max.y-X.min.y,_e=X.isBox3?X.max.z-X.min.z:1,we=X.min.x,Xe=X.min.y,Qe=X.isBox3?X.min.z:0):(ce=Rt.width,xe=Rt.height,_e=Rt.depth||1,we=0,Xe=0,Qe=0),q!==null?(Re=q.x,ut=q.y,bt=q.z):(Re=0,ut=0,bt=0);let Ai=Je.convert(F.format),mt=Je.convert(F.type),Ce;F.isData3DTexture?(A.setTexture3D(F,0),Ce=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(A.setTexture2DArray(F,0),Ce=L.TEXTURE_2D_ARRAY):(A.setTexture2D(F,0),Ce=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);let Kr=L.getParameter(L.UNPACK_ROW_LENGTH),gt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),or=L.getParameter(L.UNPACK_SKIP_PIXELS),wo=L.getParameter(L.UNPACK_SKIP_ROWS),ki=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Rt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Rt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,we),L.pixelStorei(L.UNPACK_SKIP_ROWS,Xe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Qe);let Ks=_.isDataArrayTexture||_.isData3DTexture,Tt=F.isDataArrayTexture||F.isData3DTexture;if(_.isRenderTargetTexture||_.isDepthTexture){let _r=Ie.get(_),Xs=Ie.get(F),Gi=Ie.get(_r.__renderTarget),xn=Ie.get(Xs.__renderTarget);Ne.bindFramebuffer(L.READ_FRAMEBUFFER,Gi.__webglFramebuffer),Ne.bindFramebuffer(L.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let Sn=0;Sn<_e;Sn++)Ks&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ie.get(_).__webglTexture,U,Qe+Sn),_.isDepthTexture?(Tt&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ie.get(F).__webglTexture,U,bt+Sn),L.blitFramebuffer(we,Xe,ce,xe,Re,ut,ce,xe,L.DEPTH_BUFFER_BIT,L.NEAREST)):Tt?L.copyTexSubImage3D(Ce,U,Re,ut,bt+Sn,we,Xe,ce,xe):L.copyTexSubImage2D(Ce,U,Re,ut,bt+Sn,we,Xe,ce,xe);Ne.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Tt?_.isDataTexture||_.isData3DTexture?L.texSubImage3D(Ce,U,Re,ut,bt,ce,xe,_e,Ai,mt,Rt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Ce,U,Re,ut,bt,ce,xe,_e,Ai,Rt.data):L.texSubImage3D(Ce,U,Re,ut,bt,ce,xe,_e,Ai,mt,Rt):_.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,U,Re,ut,ce,xe,Ai,mt,Rt.data):_.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,U,Re,ut,Rt.width,Rt.height,Ai,Rt.data):L.texSubImage2D(L.TEXTURE_2D,U,Re,ut,ce,xe,Ai,mt,Rt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Kr),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,gt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,or),L.pixelStorei(L.UNPACK_SKIP_ROWS,wo),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ki),U===0&&F.generateMipmaps&&L.generateMipmap(Ce),Ne.unbindTexture()},this.copyTextureToTexture3D=function(_,F,X=null,q=null,U=0){return _.isTexture!==!0&&(po("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,_=arguments[2],F=arguments[3],U=arguments[4]||0),po('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(_,F,X,q,U)},this.initRenderTarget=function(_){Ie.get(_).__webglFramebuffer===void 0&&A.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?A.setTextureCube(_,0):_.isData3DTexture?A.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?A.setTexture2DArray(_,0):A.setTexture2D(_,0),Ne.unbindTexture()},this.resetState=function(){D=0,C=0,k=null,Ne.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}});var Yf,ib=S(()=>{ln();In();Yf=class extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zt,this.environmentIntensity=1,this.environmentRotation=new zt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}});var Qf,rb=S(()=>{Gr();Qf=class{renderTargets=new Set;twisty3Ds=new Set;threeJSScene=(async()=>new(await Gt).ThreeScene)();addRenderTarget(e){this.renderTargets.add(e)}scheduleRender(){for(let e of this.renderTargets)e.scheduleRender()}async addTwisty3DPuzzle(e){this.twisty3Ds.add(e),(await this.threeJSScene).add(e)}async removeTwisty3DPuzzle(e){this.twisty3Ds.delete(e),(await this.threeJSScene).remove(e)}async clearPuzzles(){for(let e of this.twisty3Ds)(await this.threeJSScene).remove(e);this.twisty3Ds.clear()}}});var nb={};vn(nb,{Cube3D:()=>Ms,PG3D:()=>bs,ThreePerspectiveCamera:()=>Yt,ThreeRaycaster:()=>Af,ThreeScene:()=>Yf,ThreeSpherical:()=>Df,ThreeTextureLoader:()=>ds,ThreeVector2:()=>Ve,ThreeVector3:()=>I,ThreeWebGLRenderer:()=>jf,Twisty3DScene:()=>Qf,cube3DShim:()=>l6,pg3dShim:()=>c6});async function l6(r,e){return new Ms(await Rn.kpuzzle(),r,e)}async function c6(r,e,t,i,n){return new bs(r,await e.kpuzzle(),(await e.pg()).get3d({darkIgnoredOrbits:n}),!0,t==="floating",void 0,i)}var ob=S(()=>{Ec();ph();yh();ws();f2();Id();u2();bi();Dt();tb();ib();ph();yh();rb()});var Gt,Gr=S(()=>{Po();Gt=new Tr(()=>Promise.resolve().then(()=>(ob(),nb)))});Ro();sr();Bl();function ia(r,e){if(r===e)return!0;if(r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0}function Mp(r,e,t){if(r===e)return!0;if(r.length!==e.length)return!1;for(let i=0;i<r.length;i++)if(!t(r[i],e[i]))return!1;return!0}function ra(r,e,t){return Gl(r,t-e,e)}na();var Vt={Forwards:1,Paused:0,Backwards:-1};var Wi={Move:"move",EntireTimeline:"entire-timeline"};Ro();var bp=class{catchingUp=!1;pendingFrame=!1;tempoScale=1;model;constructor(e){this.model=e,e.tempoScale.addFreshListener(t=>{this.tempoScale=t})}scheduler=new Ni(this.animFrame.bind(this));start(){this.catchingUp||(this.lastTimestamp=performance.now()),this.catchingUp=!0,this.pendingFrame=!0,this.scheduler.requestAnimFrame()}stop(){this.catchingUp=!1,this.scheduler.cancelAnimFrame()}catchUpMs=500;lastTimestamp=0;animFrame(e){this.scheduler.requestAnimFrame();let t=this.tempoScale*(e-this.lastTimestamp)/this.catchUpMs;this.lastTimestamp=e,this.model.catchUpMove.set((async()=>{let i=await this.model.catchUpMove.get();if(i.move===null)return i;let n=i.amount+t;return n>=1?(this.pendingFrame=!0,this.stop(),this.model.timestampRequest.set("end"),{move:null,amount:0}):(this.pendingFrame=!1,{move:i.move,amount:n})})())}},Vl=class{playing=!1;direction=Vt.Forwards;catchUpHelper;model;lastDatestamp=0;lastTimestampPromise;scheduler=new Ni(this.animFrame.bind(this));delegate;constructor(e,t){this.delegate=t,this.model=e,this.lastTimestampPromise=this.#e(),this.model.playingInfo.addFreshListener(this.onPlayingProp.bind(this)),this.catchUpHelper=new bp(this.model),this.model.catchUpMove.addFreshListener(this.onCatchUpMoveProp.bind(this))}async onPlayingProp(e){e.playing!==this.playing&&(e.playing?this.play(e):this.pause())}async onCatchUpMoveProp(e){let t=e.move!==null;t!==this.catchUpHelper.catchingUp&&(t?this.catchUpHelper.start():this.catchUpHelper.stop()),this.scheduler.requestAnimFrame()}async#e(){return(await this.model.detailedTimelineInfo.get()).timestamp}jumpToStart(e){this.model.timestampRequest.set("start"),this.pause(),e?.flash&&this.delegate.flash()}jumpToEnd(e){this.model.timestampRequest.set("end"),this.pause(),e?.flash&&this.delegate.flash()}playPause(){this.playing?this.pause():this.play()}play(e){(async()=>{let t=e?.direction??Vt.Forwards,i=await this.model.coarseTimelineInfo.get();(e?.autoSkipToOtherEndIfStartingAtBoundary??!0)&&(t===Vt.Forwards&&i.atEnd&&(this.model.timestampRequest.set("start"),this.delegate.flash()),t===Vt.Backwards&&i.atStart&&(this.model.timestampRequest.set("end"),this.delegate.flash())),this.model.playingInfo.set({playing:!0,direction:t,untilBoundary:e?.untilBoundary??Wi.EntireTimeline,loop:e?.loop??!1}),this.playing=!0,this.lastDatestamp=performance.now(),this.lastTimestampPromise=this.#e(),this.scheduler.requestAnimFrame()})()}pause(){this.playing=!1,this.scheduler.cancelAnimFrame(),this.model.playingInfo.set({playing:!1,untilBoundary:Wi.EntireTimeline})}#t=new Rr;async animFrame(e){this.playing&&this.scheduler.requestAnimFrame();let t=this.lastDatestamp,i=await this.#t.queue(Promise.all([this.model.playingInfo.get(),this.lastTimestampPromise,this.model.timeRange.get(),this.model.tempoScale.get(),this.model.currentMoveInfo.get()])),[n,o,s,a,l]=i;if(!n.playing){this.playing=!1;return}let c=l.earliestEnd;(l.currentMoves.length===0||n.untilBoundary===Wi.EntireTimeline)&&(c=s.end);let f=l.latestStart;(l.currentMoves.length===0||n.untilBoundary===Wi.EntireTimeline)&&(f=s.start);let u=(e-t)*this.direction*a;u=Math.max(u,1),u*=n.direction;let p=o+u,d=null;p>=c?n.loop?p=ra(p,s.start,s.end):(p===s.end?d="end":p=c,this.playing=!1,this.model.playingInfo.set({playing:!1})):p<=f&&(n.loop?p=ra(p,s.start,s.end):(p===s.start?d="start":p=f,this.playing=!1,this.model.playingInfo.set({playing:!1}))),this.lastDatestamp=e,this.lastTimestampPromise=Promise.resolve(p),this.model.timestampRequest.set(d??p)}};var Wl=class{animationController;model;constructor(e,t){this.model=e,this.animationController=new Vl(e,t)}jumpToStart(e){this.animationController.jumpToStart(e)}jumpToEnd(e){this.animationController.jumpToEnd(e)}togglePlay(e){typeof e>"u"&&this.animationController.playPause(),e?this.animationController.play():this.animationController.pause()}async visitTwizzleLink(){let e=document.createElement("a");e.href=await this.model.twizzleLink(),e.target="_blank",e.click()}};be();var Nm={"bottom-row":!0,none:!0},Kl=class extends Le{getDefaultValue(){return"auto"}};Gr();be();qn();wi();wi();var wl=new _i;wl.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.wrapper > * {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.back-view-side-by-side {
  grid-template-columns: 1fr 1fr;
}

.wrapper.back-view-top-right {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
}

.wrapper.back-view-top-right > :nth-child(1) {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.wrapper.back-view-top-right > :nth-child(2) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
`);be();yf();Ro();be();var Wr=class{#e=null;elem;prefix;validSuffixes;constructor(e,t,i){this.elem=e,this.prefix=t,this.validSuffixes=i}clearValue(){this.#e&&this.elem.contentWrapper.classList.remove(this.#e),this.#e=null}setValue(e){if(!this.validSuffixes.includes(e))throw new Error(`Invalid suffix: ${e}`);let t=`${this.prefix}${e}`,i=this.#e!==t;return i&&(this.clearValue(),this.elem.contentWrapper.classList.add(t),this.#e=t),i}};qn();wi();wi();var Xh=new _i;Xh.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.svg-wrapper,
twisty-2d-svg,
svg {
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
}

svg {
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hint-facelets-none .hint-facelet {
  display: none;
}
`);var Zf="http://www.w3.org/2000/svg",sb="data-copy-id",ab=0;function f6(){return ab+=1,`svg${ab.toString()}`}var u6={dim:{white:"#dddddd",orange:"#884400",limegreen:"#008800",red:"#660000","rgb(34, 102, 255)":"#000088",yellow:"#888800","rgb(102, 0, 153)":"rgb(50, 0, 76)",purple:"#3f003f"},oriented:"#44ddcc",ignored:"#555555",invisible:"#00000000"},$f=class{wrapperElement;svgElement;gradientDefs;originalColors={};gradients={};svgID;kpuzzle;showUnknownOrientations=!1;constructor(e,t,i,n=!1){if(this.kpuzzle=e,this.showUnknownOrientations=n,!t)throw new Error(`No SVG definition for puzzle type: ${e.name()}`);this.svgID=f6(),this.wrapperElement=document.createElement("div"),this.wrapperElement.classList.add("svg-wrapper"),this.wrapperElement.innerHTML=t;let o=this.wrapperElement.querySelector("svg");if(!o)throw new Error("Could not get SVG element");if(this.svgElement=o,Zf!==o.namespaceURI)throw new Error("Unexpected XML namespace");o.style.maxWidth="100%",o.style.maxHeight="100%",this.gradientDefs=document.createElementNS(Zf,"defs"),o.insertBefore(this.gradientDefs,o.firstChild);for(let s of e.definition.orbits)for(let a=0;a<s.numPieces;a++)for(let l=0;l<s.numOrientations;l++){let c=this.elementID(s.orbitName,a,l),f=this.elementByID(c),u=f?.style.fill;i?(()=>{let p=i.orbits;if(!p)return;let d=p[s.orbitName];if(!d)return;let m=d.pieces[a];if(!m)return;let y=m.facelets[l];if(!y)return;let g=typeof y=="string"?y:y?.mask,h=u6[g];typeof h=="string"?u=h:h&&(u=h[u])})():u=f?.style.fill,this.originalColors[c]=u,this.gradients[c]=this.newGradient(c,u),this.gradientDefs.appendChild(this.gradients[c]),f?.setAttribute("style",`fill: url(#grad-${this.svgID}-${c})`)}for(let s of Array.from(o.querySelectorAll(`[${sb}]`))){let a=s.getAttribute(sb);s.setAttribute("style",`fill: url(#grad-${this.svgID}-${a})`)}this.showUnknownOrientations&&this.drawPattern(this.kpuzzle.defaultPattern())}drawPattern(e,t,i){this.draw(e,t,i)}draw(e,t,i){let n=t?.experimentalToTransformation();if(!e)throw new Error("Distinguishable pieces are not handled for SVG yet!");for(let o of e.kpuzzle.definition.orbits){let s=e.patternData[o.orbitName],a=n?n.transformationData[o.orbitName]:null;for(let l=0;l<o.numPieces;l++)for(let c=0;c<o.numOrientations;c++){let f=this.elementID(o.orbitName,l,c),u=this.elementID(o.orbitName,s.pieces[l],(o.numOrientations-s.orientation[l]+c)%o.numOrientations),p=!1;if(a){let d=this.elementID(o.orbitName,a.permutation[l],(o.numOrientations-a.orientationDelta[l]+c)%o.numOrientations);u===d&&(p=!0),i=i||0;let m=100*(1-i*i*(2-i*i));this.gradients[f].children[0].setAttribute("stop-color",this.originalColors[u]),this.gradients[f].children[0].setAttribute("offset",`${Math.max(m-5,0)}%`),this.gradients[f].children[1].setAttribute("offset",`${Math.max(m-5,0)}%`),this.gradients[f].children[2].setAttribute("offset",`${m}%`),this.gradients[f].children[3].setAttribute("offset",`${m}%`),this.gradients[f].children[3].setAttribute("stop-color",this.originalColors[d])}else p=!0;p&&(this.showUnknownOrientations&&s.orientationMod?.[l]===1?(this.gradients[f].children[0].setAttribute("stop-color","#000"),this.gradients[f].children[0].setAttribute("offset","5%"),this.gradients[f].children[1].setAttribute("offset","5%"),this.gradients[f].children[2].setAttribute("offset","20%"),this.gradients[f].children[3].setAttribute("offset","20%"),this.gradients[f].children[3].setAttribute("stop-color",this.originalColors[u])):(this.gradients[f].children[0].setAttribute("stop-color",this.originalColors[u]),this.gradients[f].children[0].setAttribute("offset","100%"),this.gradients[f].children[1].setAttribute("offset","100%"),this.gradients[f].children[2].setAttribute("offset","100%"),this.gradients[f].children[3].setAttribute("offset","100%")))}}}newGradient(e,t){let i=document.createElementNS(Zf,"radialGradient");i.setAttribute("id",`grad-${this.svgID}-${e}`),i.setAttribute("r","70.7107%");let n=[{offset:0,color:t},{offset:0,color:"black"},{offset:0,color:"black"},{offset:0,color:t}];for(let o of n){let s=document.createElementNS(Zf,"stop");s.setAttribute("offset",`${o.offset}%`),s.setAttribute("stop-color",o.color),s.setAttribute("stop-opacity","1"),i.appendChild(s)}return i}elementID(e,t,i){return`${e}-l${t}-o${i}`}elementByID(e){return this.wrapperElement.querySelector(`#${e}`)}};var Rl=class extends oi{svgWrapper;scheduler=new Ni(this.render.bind(this));#e=null;model;kpuzzle;svgSource;options;puzzleLoader;constructor(e,t,i,n,o){super(),this.model=e,this.kpuzzle=t,this.svgSource=i,this.options=n,this.addCSS(Xh),this.resetSVG(),this.#t.addListener(this.model.puzzleID,s=>{o?.id!==s&&this.disconnect()}),this.#t.addListener(this.model.twistySceneModel.hintFacelet,s=>{this.setHintFacelet(s)}),this.#t.addListener(this.model.legacyPosition,this.onPositionChange.bind(this)),this.options?.experimentalStickeringMask&&this.experimentalSetStickeringMask(this.options.experimentalStickeringMask)}#t=new Hi;disconnect(){this.#t.disconnect()}onPositionChange(e){try{if(e.movesInProgress.length>0){let t=e.movesInProgress[0].move,i=t;e.movesInProgress[0].direction===Vt.Backwards&&(i=t.invert());let n=e.pattern.applyMove(i);this.svgWrapper?.draw(e.pattern,n,e.movesInProgress[0].fraction)}else this.svgWrapper?.draw(e.pattern),this.#e=e}catch(t){console.warn("Bad position (this doesn't necessarily mean something is wrong). Pre-emptively disconnecting:",this.puzzleLoader?.id,t),this.disconnect()}}scheduleRender(){this.scheduler.requestAnimFrame()}experimentalSetStickeringMask(e){this.resetSVG(e)}resetSVG(e){this.svgWrapper&&this.removeElement(this.svgWrapper.wrapperElement),this.kpuzzle&&(this.svgWrapper=new $f(this.kpuzzle,this.svgSource,e),this.addElement(this.svgWrapper.wrapperElement),this.#e&&this.onPositionChange(this.#e))}hintFaceletsClassListManager=new Wr(this,"hint-facelets-",Object.keys(gf));setHintFacelet(e){this.hintFaceletsClassListManager.setValue(e==="auto"?"floating":e)}render(){}};jt.define("twisty-2d-puzzle",Rl);var Jf=class{model;schedulable;puzzleLoader;effectiveVisualization;constructor(e,t,i,n){this.model=e,this.schedulable=t,this.puzzleLoader=i,this.effectiveVisualization=n,this.twisty2DPuzzle(),this.#e.addListener(this.model.twistySceneModel.stickeringMask,async o=>{(await this.twisty2DPuzzle()).experimentalSetStickeringMask(o)})}#e=new Hi;disconnect(){this.#e.disconnect()}scheduleRender(){}#t=null;async twisty2DPuzzle(){return this.#t??=(async()=>{let e=this.effectiveVisualization==="experimental-2D-LL-face"?this.puzzleLoader.llFaceSVG():this.effectiveVisualization==="experimental-2D-LL"?this.puzzleLoader.llSVG():this.puzzleLoader.svg();return new Rl(this.model,await this.puzzleLoader.kpuzzle(),await e,{},this.puzzleLoader)})()}};var Tl=class extends oi{#e=new Hi;disconnect(){this.#e.disconnect()}model;effectiveVisualization;constructor(e,t){super(),this.model=e,this.effectiveVisualization=t}async connectedCallback(){this.addCSS(wl),this.model&&this.#e.addListener(this.model.twistyPlayerModel.puzzleLoader,this.onPuzzleLoader.bind(this))}#t;async scene(){return this.#t??=(async()=>new(await Gt).ThreeScene)()}scheduleRender(){this.#i?.scheduleRender()}#i;currentTwisty2DPuzzleWrapper(){return this.#i}async setCurrentTwisty2DPuzzleWrapper(e){let t=this.#i;this.#i=e,t?.disconnect();let i=e.twisty2DPuzzle();this.contentWrapper.textContent="",this.addElement(await i)}async onPuzzleLoader(e){this.#i?.disconnect();let t=new Jf(this.model.twistyPlayerModel,this,e,this.effectiveVisualization);this.setCurrentTwisty2DPuzzleWrapper(t)}};jt.define("twisty-2d-scene-wrapper",Tl);Gr();na();be();var Us=class{#e;reject;promise;constructor(){this.promise=new Promise((e,t)=>{this.#e=e,this.reject=t})}handleNewValue(e){this.#e(e)}};qn();wi();Gr();be();var Bs=class extends EventTarget{model;schedulable;puzzleLoader;visualizationStrategy;constructor(e,t,i,n){super(),this.model=e,this.schedulable=t,this.puzzleLoader=i,this.visualizationStrategy=n,this.twisty3DPuzzle(),this.#e.addListener(this.model.puzzleLoader,o=>{this.puzzleLoader.id!==o.id&&this.disconnect()}),this.#e.addListener(this.model.legacyPosition,async o=>{try{(await this.twisty3DPuzzle()).onPositionChange(o),this.scheduleRender()}catch{this.disconnect()}}),this.#e.addListener(this.model.twistySceneModel.hintFacelet,async o=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFacelets:o==="auto"?"floating":o}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.foundationDisplay,async o=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({showFoundation:o!=="none"}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.stickeringMask,async o=>{(await this.twisty3DPuzzle()).setStickeringMask(o),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.faceletScale,async o=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({faceletScale:o}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.hintFaceletsElevation,async o=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFaceletsElevation:o}),this.scheduleRender()}),this.#e.addMultiListener3([this.model.twistySceneModel.stickeringMask,this.model.twistySceneModel.foundationStickerSprite,this.model.twistySceneModel.hintStickerSprite],async o=>{"experimentalUpdateTexture"in await this.twisty3DPuzzle()&&((await this.twisty3DPuzzle()).experimentalUpdateTexture(o[0].specialBehaviour==="picture",o[1],o[2]),this.scheduleRender())})}#e=new Hi;disconnect(){this.#e.disconnect()}scheduleRender(){this.schedulable.scheduleRender(),this.dispatchEvent(new CustomEvent("render-scheduled"))}#t=null;async twisty3DPuzzle(){return this.#t??=(async()=>{if(this.puzzleLoader.id==="3x3x3"&&this.visualizationStrategy==="Cube3D"){let[e,t,i,n,o,s]=await Promise.all([this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.stickeringMask.get(),this.model.twistySceneModel.initialHintFaceletsAnimation.get(),this.model.twistySceneModel.faceletScale.get(),this.model.twistySceneModel.hintFaceletsElevation.get()]);return(await Gt).cube3DShim(()=>this.schedulable.scheduleRender(),{foundationSprite:e,hintSprite:t,experimentalStickeringMask:i,initialHintFaceletsAnimation:n,faceletScale:o,hintFaceletsElevation:s})}else{let[e,t,i,n]=await Promise.all([this.model.twistySceneModel.hintFacelet.get(),this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.faceletScale.get()]),o=(await Gt).pg3dShim(()=>this.schedulable.scheduleRender(),this.puzzleLoader,e==="auto"?"floating":e,n,this.puzzleLoader.id==="kilominx");return o.then(s=>s.experimentalUpdateTexture(!0,t??void 0,i??void 0)),o}})()}async raycastMove(e,t){let i=await this.twisty3DPuzzle();if(!("experimentalGetControlTargets"in i)){console.info("not PG3D! skipping raycast");return}let n=i.experimentalGetControlTargets(),[o,s]=await Promise.all([e,this.model.twistySceneModel.movePressCancelOptions.get()]),a=o.intersectObjects(n);if(a.length>0){let l=i.getClosestMoveToAxis(a[0].point,t);l?this.model.experimentalAddMove(l.move,{cancel:s}):console.info("Skipping move!")}}};bf();var Gs=class extends oi{#e=new Wr(this,"back-view-",["auto","none","side-by-side","top-right"]);#t=new Hi;disconnect(){this.#t.disconnect()}model;constructor(e){super(),this.model=e}async connectedCallback(){this.addCSS(wl);let e=new Es(this.model,this);this.addVantage(e),this.model&&(this.#t.addMultiListener([this.model.puzzleLoader,this.model.visualizationStrategy],this.onPuzzle.bind(this)),this.#t.addListener(this.model.backView,this.setBackView.bind(this))),this.scheduleRender()}#i=null;setBackView(e){let t=["side-by-side","top-right"].includes(e),i=this.#i!==null;this.#e.setValue(e),t?i||(this.#i=new Es(this.model,this,{backView:!0}),this.addVantage(this.#i),this.scheduleRender()):this.#i&&(this.removeVantage(this.#i),this.#i=null)}async onPress(e){let t=this.#r;if(!t){console.info("no wrapper; skipping scene wrapper press!");return}let i=(async()=>{let[n,{ThreeRaycaster:o,ThreeVector2:s}]=await Promise.all([e.detail.cameraPromise,(async()=>{let{ThreeRaycaster:c,ThreeVector2:f}=await Gt;return{ThreeRaycaster:c,ThreeVector2:f}})()]),a=new o,l=new s(e.detail.pressInfo.normalizedX,e.detail.pressInfo.normalizedY);return a.setFromCamera(l,n),a})();await t.raycastMove(i,{invert:!e.detail.pressInfo.rightClick,depth:e.detail.pressInfo.keys.ctrlOrMetaKey?"rotation":e.detail.pressInfo.keys.shiftKey?"secondSlice":"none"})}#n;async scene(){return this.#n??=(async()=>new(await Gt).ThreeScene)()}#o=new Set;addVantage(e){e.addEventListener("press",this.onPress.bind(this)),this.#o.add(e),this.contentWrapper.appendChild(e)}removeVantage(e){this.#o.delete(e),e.remove(),e.disconnect(),this.#r?.disconnect()}experimentalVantages(){return this.#o.values()}scheduleRender(){for(let e of this.#o)e.scheduleRender()}#r=null;async setCurrentTwisty3DPuzzleWrapper(e,t){let i=this.#r;try{this.#r=t,i?.disconnect(),e.add(await t.twisty3DPuzzle())}finally{i&&e.remove(await i.twisty3DPuzzle())}this.#s.handleNewValue(t)}#s=new Us;async experimentalTwisty3DPuzzleWrapper(){return this.#r||this.#s.promise}#a=new Rr;async onPuzzle(e){if(e[1]==="2D")return;this.#r?.disconnect();let[t,i]=await this.#a.queue(Promise.all([this.scene(),new Bs(this.model,this,e[0],e[1])]));this.setCurrentTwisty3DPuzzleWrapper(t,i)}};jt.define("twisty-3d-scene-wrapper",Gs);var gn=typeof document>"u"?null:document;var lb=gn?.fullscreenEnabled||!!gn?.webkitFullscreenEnabled;function cb(){return document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen()}function qh(){return document.fullscreenElement?document.fullscreenElement:document.webkitFullscreenElement??null}function fb(r){return r.requestFullscreen?r.requestFullscreen():r.webkitRequestFullscreen()}be();var ub=["skip-to-start","skip-to-end","step-forward","step-backward","pause","play","enter-fullscreen","exit-fullscreen","twizzle-tw"],eu=class extends qe{derive(e){return{fullscreen:{enabled:lb,icon:document.fullscreenElement===null?"enter-fullscreen":"exit-fullscreen",title:"Enter fullscreen"},"jump-to-start":{enabled:!e.coarseTimelineInfo.atStart,icon:"skip-to-start",title:"Restart"},"play-step-backwards":{enabled:!e.coarseTimelineInfo.atStart,icon:"step-backward",title:"Step backward"},"play-pause":{enabled:!(e.coarseTimelineInfo.atStart&&e.coarseTimelineInfo.atEnd),icon:e.coarseTimelineInfo.playing?"pause":"play",title:e.coarseTimelineInfo.playing?"Pause":"Play"},"play-step":{enabled:!e.coarseTimelineInfo.atEnd,icon:"step-forward",title:"Step forward"},"jump-to-end":{enabled:!e.coarseTimelineInfo.atEnd,icon:"skip-to-end",title:"Skip to End"},"twizzle-link":{enabled:!0,icon:"twizzle-tw",title:"View at Twizzle",hidden:e.viewerLink==="none"}}}};qn();wi();wi();var jh=new _i;jh.replaceSync(`
:host {
  width: 384px;
  height: 24px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  grid-auto-flow: column;
}

.viewer-link-none .twizzle-link-button {
  display: none;
}

.wrapper twisty-button,
.wrapper twisty-control-button {
  width: inherit;
  height: inherit;
}
`);var Yh=new _i;Yh.replaceSync(`
:host:not([hidden]) {
  display: grid;
}

:host {
  width: 48px;
  height: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

button {
  width: 100%;
  height: 100%;
  border: none;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-color: rgba(196, 196, 196, 0.75);
}

button:enabled {
  background-color: rgba(196, 196, 196, 0.75)
}

.dark-mode button:enabled {
  background-color: #88888888;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.25;
  pointer-events: none;
}

.dark-mode button:disabled {
  background-color: #ffffff44;
}

button:enabled:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

/* TODO: fullscreen icons have too much padding?? */
.svg-skip-to-start button,
button.svg-skip-to-start {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjQzIDEwMzdxMTktMTkgMzItMTN0MTMgMzJ2MTQ3MnEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djcxMHEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djY3OHEwIDI2LTE5IDQ1dC00NSAxOUg5NjBxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWgxMjhxMjYgMCA0NSAxOXQxOSA0NXY2NzhxNC0xMSAxMy0xOWw3MTAtNzEwcTE5LTE5IDMyLTEzdDEzIDMydjcxMHE0LTExIDEzLTE5eiIvPjwvc3ZnPg==");
}

.svg-skip-to-end button,
button.svg-skip-to-end {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik05NDEgMjU0N3EtMTkgMTktMzIgMTN0LTEzLTMyVjEwNTZxMC0yNiAxMy0zMnQzMiAxM2w3MTAgNzEwcTggOCAxMyAxOXYtNzEwcTAtMjYgMTMtMzJ0MzIgMTNsNzEwIDcxMHE4IDggMTMgMTl2LTY3OHEwLTI2IDE5LTQ1dDQ1LTE5aDEyOHEyNiAwIDQ1IDE5dDE5IDQ1djE0MDhxMCAyNi0xOSA0NXQtNDUgMTloLTEyOHEtMjYgMC00NS0xOXQtMTktNDV2LTY3OHEtNSAxMC0xMyAxOWwtNzEwIDcxMHEtMTkgMTktMzIgMTN0LTEzLTMydi03MTBxLTUgMTAtMTMgMTl6Ii8+PC9zdmc+");
}

.svg-step-forward button,
button.svg-step-forward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDE1NjhxMCAyNi0xOSA0NWwtNTEyIDUxMnEtMTkgMTktNDUgMTl0LTQ1LTE5cS0xOS0xOS0xOS00NXYtMjU2aC0yMjRxLTk4IDAtMTc1LjUgNnQtMTU0IDIxLjVxLTc2LjUgMTUuNS0xMzMgNDIuNXQtMTA1LjUgNjkuNXEtNDkgNDIuNS04MCAxMDF0LTQ4LjUgMTM4LjVxLTE3LjUgODAtMTcuNSAxODEgMCA1NSA1IDEyMyAwIDYgMi41IDIzLjV0Mi41IDI2LjVxMCAxNS04LjUgMjV0LTIzLjUgMTBxLTE2IDAtMjgtMTctNy05LTEzLTIydC0xMy41LTMwcS03LjUtMTctMTAuNS0yNC0xMjctMjg1LTEyNy00NTEgMC0xOTkgNTMtMzMzIDE2Mi00MDMgODc1LTQwM2gyMjR2LTI1NnEwLTI2IDE5LTQ1dDQ1LTE5cTI2IDAgNDUgMTlsNTEyIDUxMnExOSAxOSAxOSA0NXoiLz48L3N2Zz4=");
}

.svg-step-backward button,
button.svg-step-backward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDIwNDhxMCAxNjYtMTI3IDQ1MS0zIDctMTAuNSAyNHQtMTMuNSAzMHEtNiAxMy0xMyAyMi0xMiAxNy0yOCAxNy0xNSAwLTIzLjUtMTB0LTguNS0yNXEwLTkgMi41LTI2LjV0Mi41LTIzLjVxNS02OCA1LTEyMyAwLTEwMS0xNy41LTE4MXQtNDguNS0xMzguNXEtMzEtNTguNS04MC0xMDF0LTEwNS41LTY5LjVxLTU2LjUtMjctMTMzLTQyLjV0LTE1NC0yMS41cS03Ny41LTYtMTc1LjUtNmgtMjI0djI1NnEwIDI2LTE5IDQ1dC00NSAxOXEtMjYgMC00NS0xOWwtNTEyLTUxMnEtMTktMTktMTktNDV0MTktNDVsNTEyLTUxMnExOS0xOSA0NS0xOXQ0NSAxOXExOSAxOSAxOSA0NXYyNTZoMjI0cTcxMyAwIDg3NSA0MDMgNTMgMTM0IDUzIDMzM3oiLz48L3N2Zz4=");
}

.svg-pause button,
button.svg-pause {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNTYwIDEwODh2MTQwOHEwIDI2LTE5IDQ1dC00NSAxOWgtNTEycS0yNiAwLTQ1LTE5dC0xOS00NVYxMDg4cTAtMjYgMTktNDV0NDUtMTloNTEycTI2IDAgNDUgMTl0MTkgNDV6bS04OTYgMHYxNDA4cTAgMjYtMTkgNDV0LTQ1IDE5aC01MTJxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWg1MTJxMjYgMCA0NSAxOXQxOSA0NXoiLz48L3N2Zz4=");
}

.svg-play button,
button.svg-play {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNDcyLjUgMTgyM2wtMTMyOCA3MzhxLTIzIDEzLTM5LjUgM3QtMTYuNS0zNlYxMDU2cTAtMjYgMTYuNS0zNnQzOS41IDNsMTMyOCA3MzhxMjMgMTMgMjMgMzF0LTIzIDMxeiIvPjwvc3ZnPg==");
}

.svg-enter-fullscreen button,
button.svg-enter-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTZIN3Y1aDV2LTJIOXYtM3ptLTItNGgyVjloM1Y3SDd2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTYgN3YyaDN2M2gyVjdoLTV6Ii8+PC9zdmc+");
}

.svg-exit-fullscreen button,
button.svg-exit-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMThoM3YzaDJ2LTVIN3Yyem0zLThIN3YyaDVWN2gtMnYzem02IDExaDJ2LTNoM3YtMmgtNXY1em0yLTExVjdoLTJ2NWg1di0yaC0zeiIvPjwvc3ZnPg==");
}

.svg-twizzle-tw button,
button.svg-twizzle-tw {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODY0IiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk3LjU4MSAxNTEuMTh2NTcuMDg0aC04OS43MDN2MjQwLjM1MmgtNjYuOTU1VjIwOC4yNjRIMTUxLjIydi01Ny4wODNoMjQ2LjM2MXptNTQuMzEgNzEuNjc3bDcuNTEyIDMzLjY5MmMyLjcxOCAxMi4xNiA1LjU4IDI0LjY4IDguNTg0IDM3LjU1NWEyMTgwLjc3NSAyMTgwLjc3NSAwIDAwOS40NDIgMzguODQzIDEyNjYuMyAxMjY2LjMgMCAwMDEwLjA4NiAzNy41NTVjMy43Mi0xMi41OSA3LjM2OC0yNS40NjYgMTAuOTQ1LTM4LjYyOCAzLjU3Ni0xMy4xNjIgNy4wMS0yNi4xMSAxMC4zLTM4Ljg0M2w1Ljc2OS0yMi40NTZjMS4yNDgtNC44ODcgMi40NzItOS43MDUgMy42NzQtMTQuNDU1IDMuMDA0LTExLjg3NSA1LjY1MS0yMi45NjIgNy45NC0zMy4yNjNoNDYuMzU0bDIuMzg0IDEwLjU2M2EyMDAwLjc3IDIwMDAuNzcgMCAwMDMuOTM1IDE2LjgyOGw2LjcxMSAyNy43MWMxLjIxMyA0Ljk1NiAyLjQ1IDkuOTggMy43MDkgMTUuMDczYTMxMTkuNzc3IDMxMTkuNzc3IDAgMDA5Ljg3MSAzOC44NDMgMTI0OS4yMjcgMTI0OS4yMjcgMCAwMDEwLjczIDM4LjYyOCAxOTA3LjYwNSAxOTA3LjYwNSAwIDAwMTAuMzAxLTM3LjU1NSAxMzk3Ljk0IDEzOTcuOTQgMCAwMDkuNjU3LTM4Ljg0M2w0LjQtMTkuMDQ2Yy43MTUtMy4xMyAxLjQyMS02LjIzNiAyLjExOC05LjMyMWw5LjU3Ny00Mi44OGg2Ni41MjZhMjk4OC43MTggMjk4OC43MTggMCAwMS0xOS41MjkgNjYuMzExbC01LjcyOCAxOC40ODJhMzIzNy40NiAzMjM3LjQ2IDAgMDEtMTQuMDE1IDQzLjc1MmMtNi40MzggMTkuNi0xMi43MzMgMzcuNjk4LTE4Ljg4NSA1NC4yOTRsLTMuMzA2IDguODI1Yy00Ljg4NCAxMi44OTgtOS40MzMgMjQuMjYzLTEzLjY0NyAzNC4wOTVoLTQ5Ljc4N2E4NDE3LjI4OSA4NDE3LjI4OSAwIDAxLTIxLjAzMS02NC44MDkgMTI4OC42ODYgMTI4OC42ODYgMCAwMS0xOC44ODUtNjQuODEgMTk3Mi40NDQgMTk3Mi40NDQgMCAwMS0xOC4yNCA2NC44MSAyNTc5LjQxMiAyNTc5LjQxMiAwIDAxLTIwLjM4OCA2NC44MWgtNDkuNzg3Yy00LjY4Mi0xMC45MjYtOS43Mi0yMy43NDMtMTUuMTEtMzguNDUxbC0xLjYyOS00LjQ3Yy01LjI1OC0xNC41MjEtMTAuNjgtMzAuMTkyLTE2LjI2Ni00Ny4wMTRsLTIuNDA0LTcuMjhjLTYuNDM4LTE5LjYtMTMuMDItNDAuMzQ0LTE5Ljc0My02Mi4yMzRhMjk4OC43MDcgMjk4OC43MDcgMCAwMS0xOS41MjktNjYuMzExaDY3LjM4NXoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==");
}
`);var pb={fullscreen:!0,"jump-to-start":!0,"play-step-backwards":!0,"play-pause":!0,"play-step":!0,"jump-to-end":!0,"twizzle-link":!0},Al=class extends oi{buttons=null;model;controller;defaultFullscreenElement;constructor(e,t,i){super(),this.model=e,this.controller=t,this.defaultFullscreenElement=i}connectedCallback(){this.addCSS(jh);let e={};for(let t in pb){let i=new tu;e[t]=i,i.htmlButton.addEventListener("click",()=>this.#e(t)),this.addElement(i)}this.buttons=e,this.model?.buttonAppearance.addFreshListener(this.update.bind(this)),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}#e(e){switch(e){case"fullscreen":{this.onFullscreenButton();break}case"jump-to-start":{this.controller?.jumpToStart({flash:!0});break}case"play-step-backwards":{this.controller?.animationController.play({direction:Vt.Backwards,untilBoundary:Wi.Move});break}case"play-pause":{this.controller?.togglePlay();break}case"play-step":{this.controller?.animationController.play({direction:Vt.Forwards,untilBoundary:Wi.Move});break}case"jump-to-end":{this.controller?.jumpToEnd({flash:!0});break}case"twizzle-link":{this.controller?.visitTwizzleLink();break}default:throw new Error("Missing command")}}async onFullscreenButton(){if(!this.defaultFullscreenElement)throw new Error("Attempted to go fullscreen without an element.");if(qh()===this.defaultFullscreenElement)cb();else{this.buttons?.fullscreen.setIcon("exit-fullscreen"),fb(await this.model?.twistySceneModel.fullscreenElement.get()??this.defaultFullscreenElement);let e=()=>{qh()!==this.defaultFullscreenElement&&(this.buttons?.fullscreen.setIcon("enter-fullscreen"),globalThis.removeEventListener("fullscreenchange",e))};globalThis.addEventListener("fullscreenchange",e)}}async update(e){for(let t in pb){let i=this.buttons[t],n=e[t];i.htmlButton.disabled=!n.enabled,i.htmlButton.title=n.title,i.setIcon(n.icon),i.hidden=!!n.hidden}}updateColorScheme(e){for(let t of Object.values(this.buttons??{}))t.updateColorScheme(e)}};jt.define("twisty-buttons",Al);var tu=class extends oi{htmlButton=document.createElement("button");updateColorScheme(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}connectedCallback(){this.addCSS(Yh),this.addElement(this.htmlButton)}#e=new Wr(this,"svg-",ub);setIcon(e){this.#e.setValue(e)}};jt.define("twisty-button",tu);qn();wi();wi();var Qh=new _i;Qh.replaceSync(`
:host {
  width: 384px;
  height: 16px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(196, 196, 196, 0.75);
}

input:not(:disabled) {
  cursor: ew-resize;
}

.wrapper.dark-mode {
  background: #666666;
}
`);var p6=!1,ru=!1;gn?.addEventListener("mousedown",r=>{r.which&&(ru=!0)},!0);gn?.addEventListener("mouseup",r=>{r.which&&(ru=!1)},!0);var Jh=0,iu=0;gn?.addEventListener("mousedown",()=>{iu++},!1);gn?.addEventListener("mousemove",mb,!1);gn?.addEventListener("mouseenter",mb,!1);function mb(r){Jh=r.pageY}var db=0,hb=0,Zh=!1,$h=0,Dl=class extends oi{model;controller;constructor(e,t){super(),this.model=e,this.controller=t}async onDetailedTimelineInfo(e){let t=await this.inputElem();t.min=e.timeRange.start.toString(),t.max=e.timeRange.end.toString(),t.disabled=t.min===t.max,t.value=e.timestamp.toString()}async connectedCallback(){this.addCSS(Qh),this.addElement(await this.inputElem()),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}updateColorScheme(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}#e=null;async inputElem(){return this.#e??=(async()=>{let e=document.createElement("input");return e.type="range",e.disabled=!0,this.model?.detailedTimelineInfo.addFreshListener(this.onDetailedTimelineInfo.bind(this)),e.addEventListener("input",this.onInput.bind(this)),e.addEventListener("keydown",this.onKeypress.bind(this)),e})()}async onInput(e){if(Zh)return;let t=await this.inputElem();await this.slowDown(e,t);let i=parseInt(t.value,10);this.model?.playingInfo.set({playing:!1}),this.model?.timestampRequest.set(i)}onKeypress(e){switch(e.key){case"ArrowLeft":case"ArrowRight":{this.controller?.animationController.play({direction:e.key==="ArrowLeft"?Vt.Backwards:Vt.Forwards,untilBoundary:Wi.Move}),e.preventDefault();break}case" ":{this.controller?.togglePlay(),e.preventDefault();break}}}async slowDown(e,t){if(p6&&ru){let i=t.getBoundingClientRect(),n=i.top+i.height/2;console.log(n,e,Jh,ru);let o=Math.abs(n-Jh),s=1;o>64&&(s=Math.max(2**(-(o-64)/64),1/32));let a=parseInt(t.value,10);if(console.log("cl",$h,iu,a),$h===iu){let l=(a-hb)*s;console.log("delta",l,o),Zh=!0;let c=a;c=db+l*s+(a-db)*Math.min(1,(1/2)**(o*o/64)),t.value=c.toString(),console.log(s),Zh=!1,this.contentWrapper.style.opacity=s.toString()}else $h=iu;hb=a}}};jt.define("twisty-scrubber",Dl);wi();Gr();rh();bf();var d6=null;async function em(r,e){let[{ThreePerspectiveCamera:t,ThreeScene:i},n,o,s,a,l,c]=await Promise.all([(async()=>{let{ThreePerspectiveCamera:b,ThreeScene:v}=await Gt;return{ThreePerspectiveCamera:b,ThreeScene:v}})(),await r.puzzleLoader.get(),await r.visualizationStrategy.get(),await r.twistySceneModel.stickeringRequest.get(),await r.twistySceneModel.stickeringMaskRequest.get(),await r.legacyPosition.get(),await r.twistySceneModel.orbitCoordinates.get()]),f=e?.width??2048,u=e?.height??2048,p=f/u,d=d6??=await(async()=>new t(20,p,.1,20))(),m=new i,y=new Bs(r,{scheduleRender:()=>{}},n,o);m.add(await y.twisty3DPuzzle()),await lh(d,c);let h=(await ih(f,u,m,d)).toDataURL(),w=await tm(r);return{dataURL:h,download:async b=>{im(h,b??w)}}}async function tm(r){let[e,t]=await Promise.all([r.puzzleID.get(),r.alg.get()]);return`[${e}]${t.alg.experimentalNumChildAlgNodes()===0?"":` ${t.alg.toString()}`}`}function im(r,e,t="png"){let i=document.createElement("a");i.href=r,i.download=`${e}.${t}`,i.click()}wi();var rm=new _i;rm.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;

  -webkit-user-select: none;
  user-select: none;
}

.wrapper {
  display: grid;
  overflow: hidden;
  contain: size;
  grid-template-rows: 7fr minmax(1.5em, 0.5fr) minmax(2em, 1fr);
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

.wrapper.controls-none {
  grid-template-rows: 7fr;
}

.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-control-button-panel ,
.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-buttons {
  display: none;
}

twisty-scrubber {
  background: rgba(196, 196, 196, 0.5);
}

.wrapper.checkered,
.wrapper.checkered-transparent {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}

.wrapper.checkered-transparent {
  background-color: #F4F4F4;
  background-image: linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88),
    linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88);
}

.wrapper.dark-mode {
  background-color: #444;
  background-image: linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b),
    linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b);
}

.visualization-wrapper > * {
  width: 100%;
  height: 100%;
}

.error-elem {
  width: 100%;
  height: 100%;
  display: none;
  place-content: center;
  font-family: sans-serif;
  box-shadow: inset 0 0 2em rgb(255, 0, 0);
  color: red;
  text-shadow: 0 0 0.2em white;
  background: rgba(255, 255, 255, 0.25);
}

.wrapper.error .visualization-wrapper {
  display: none;
}

.wrapper.error .error-elem {
  display: grid;
}
`);ot();qi();be();var Cl=class extends Le{getDefaultValue(){return null}};be();var _o=class extends yi{getDefaultValue(){return null}derive(e){return typeof e=="string"?new URL(e,location.href):e}};ot();be();var $n=class r{warnings;errors;constructor(e){this.warnings=Object.freeze(e?.warnings??[]),this.errors=Object.freeze(e?.errors??[]),Object.freeze(this)}add(e){return new r({warnings:this.warnings.concat(e?.warnings??[]),errors:this.errors.concat(e?.errors??[])})}log(){this.errors.length>0?console.error(`\u{1F6A8} ${this.errors[0]}`):this.warnings.length>0?console.warn(`\u26A0\uFE0F ${this.warnings[0]}`):console.info("\u{1F60E} No issues!")}};function h6(r){try{let e=le.fromString(r),t=[];return e.toString()!==r&&t.push("Alg is non-canonical!"),{alg:e,issues:new $n({warnings:t})}}catch(e){return{alg:new le,issues:new $n({errors:[`Malformed alg: ${e.toString()}`]})}}}function m6(r,e){return r.alg.isIdentical(e.alg)&&ia(r.issues.warnings,e.issues.warnings)&&ia(r.issues.errors,e.issues.errors)}var Ll=class extends yi{getDefaultValue(){return{alg:new le,issues:new $n}}canReuseValue(e,t){return m6(e,t)}async derive(e){return typeof e=="string"?h6(e):{alg:e,issues:new $n}}};be();var nu=class extends qe{derive(e){return e.kpuzzle.algToTransformation(e.setupAlg.alg)}};be();var ou=class extends qe{derive(e){if(e.setupTransformation)return e.setupTransformation;switch(e.setupAnchor){case"start":return e.setupAlgTransformation;case"end":{let i=e.indexer.transformationAtIndex(e.indexer.numAnimatedLeaves()).invert();return e.setupAlgTransformation.applyTransformation(i)}default:throw new Error("Unimplemented!")}}};be();var su=class extends Le{getDefaultValue(){return null}};be();var au=class extends Le{getDefaultValue(){return{move:null,amount:0}}canReuseValue(e,t){return e.move===t.move&&e.amount===t.amount}};be();var lu=class extends qe{derive(e){return{patternIndex:e.currentMoveInfo.patternIndex,movesFinishing:e.currentMoveInfo.movesFinishing.map(t=>t.move),movesFinished:e.currentMoveInfo.movesFinished.map(t=>t.move)}}canReuseValue(e,t){return e.patternIndex===t.patternIndex&&Mp(e.movesFinishing,t.movesFinishing,(i,n)=>i.isIdentical(n))&&Mp(e.movesFinished,t.movesFinished,(i,n)=>i.isIdentical(n))}};ot();be();var cu=class extends qe{derive(e){function t(i){return e.detailedTimelineInfo.atEnd&&e.catchUpMove.move!==null&&i.currentMoves.push({move:e.catchUpMove.move,direction:Vt.Backwards,fraction:1-e.catchUpMove.amount,startTimestamp:-1,endTimestamp:-1}),i}if(e.indexer.currentMoveInfo)return t(e.indexer.currentMoveInfo(e.detailedTimelineInfo.timestamp));{let i=e.indexer.timestampToIndex(e.detailedTimelineInfo.timestamp),n={patternIndex:i,currentMoves:[],movesFinishing:[],movesFinished:[],movesStarting:[],latestStart:-1/0,earliestEnd:1/0};if(e.indexer.numAnimatedLeaves()>0){let o=e.indexer.getAnimLeaf(i)?.as(T);if(!o)return t(n);let s=e.indexer.indexToMoveStartTimestamp(i),a=e.indexer.moveDuration(i),l=a?(e.detailedTimelineInfo.timestamp-s)/a:0,c=s+a,f={move:o,direction:Vt.Forwards,fraction:l,startTimestamp:s,endTimestamp:c};l===0?n.movesStarting.push(f):l===1?n.movesFinishing.push(f):(n.currentMoves.push(f),n.latestStart=Math.max(n.latestStart,s),n.earliestEnd=Math.min(n.earliestEnd,c))}return t(n)}}};be();var fu=class extends qe{derive(e){let t=e.indexer.transformationAtIndex(e.currentLeavesSimplified.patternIndex);t=e.anchoredStart.applyTransformation(t);for(let i of e.currentLeavesSimplified.movesFinishing)t=t.applyMove(i);for(let i of e.currentLeavesSimplified.movesFinished)t=t.applyMove(i);return t.toKPattern()}};ot();var Jn={OuterBlockTurnMetric:"OBTM",RangeBlockTurnMetric:"RBTM",SingleSliceTurnMetric:"SSTM",OuterBlockQuantumTurnMetric:"OBQTM",RangeBlockQuantumTurnMetric:"RBQTM",SingleSliceQuantumTurnMetric:"SSQTM",ExecutionTurnMetric:"ETM"};qi();var Ti={Rotation:"Rotation",Outer:"Outer",Inner:"Inner"};var g6={[Jn.OuterBlockTurnMetric]:{[Ti.Rotation]:{constantFactor:0,amountFactor:0,zeroAmount:0},[Ti.Outer]:{constantFactor:1,amountFactor:0,zeroAmount:0},[Ti.Inner]:{constantFactor:2,amountFactor:0,zeroAmount:0}},[Jn.RangeBlockTurnMetric]:{[Ti.Rotation]:{constantFactor:0,amountFactor:0,zeroAmount:0},[Ti.Outer]:{constantFactor:1,amountFactor:0,zeroAmount:0},[Ti.Inner]:{constantFactor:1,amountFactor:0,zeroAmount:0}},[Jn.OuterBlockQuantumTurnMetric]:{[Ti.Rotation]:{constantFactor:0,amountFactor:0,zeroAmount:0},[Ti.Outer]:{constantFactor:0,amountFactor:1,zeroAmount:0},[Ti.Inner]:{constantFactor:0,amountFactor:2,zeroAmount:0}},[Jn.RangeBlockQuantumTurnMetric]:{[Ti.Rotation]:{constantFactor:0,amountFactor:0,zeroAmount:0},[Ti.Outer]:{constantFactor:0,amountFactor:1,zeroAmount:0},[Ti.Inner]:{constantFactor:0,amountFactor:1,zeroAmount:0}},[Jn.ExecutionTurnMetric]:{[Ti.Rotation]:{constantFactor:1,amountFactor:0,zeroAmount:1},[Ti.Outer]:{constantFactor:1,amountFactor:0,zeroAmount:1},[Ti.Inner]:{constantFactor:1,amountFactor:0,zeroAmount:1}}};var Vs=class extends fi{metric;constructor(e){super(),this.metric=e}traverseAlg(e){let t=0;for(let i of e.childAlgNodes())t+=this.traverseAlgNode(i);return t}traverseGrouping(e){let t=e.alg;return this.traverseAlg(t)*Math.abs(e.amount)}traverseMove(e){return this.metric(e)}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return 0}traverseNewline(e){return 0}traverseLineComment(e){return 0}},nm=class extends fi{traverseAlg(e){let t=0;for(let i of e.childAlgNodes())t+=this.traverseAlgNode(i);return t}traverseGrouping(e){let t=e.alg;return this.traverseAlg(t)*Math.abs(e.amount)}traverseMove(e){return 1}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return 1}traverseNewline(e){return 1}traverseLineComment(e){return 1}};function gb(r){return"A"<=r&&r<="Z"}function y6(r){let e=r.family;return gb(e[0])&&e[e.length-1]==="v"||e==="x"||e==="y"||e==="z"||e==="T"?0:1}function x6(r){return 1}function yb(r){let e=r.family;return gb(e[0])&&e[e.length-1]==="v"||e==="x"||e==="y"||e==="z"||e==="T"?0:1}function S6(r){return Math.abs(r.amount)*yb(r)}var v6=Kt(Vs,[y6]),E6=Kt(Vs,[x6]),eH=Kt(Vs,[S6]),tH=Kt(Vs,[yb]),xb=Kt(nm,[]);ot();ot();var om=class extends fi{traverseAlg(e){let t=0;for(let i of e.childAlgNodes())t+=this.traverseAlgNode(i);return t}traverseGrouping(e){return this.traverseAlg(e.alg)*Math.abs(e.amount)}traverseMove(e){return 1}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return 1}traverseNewline(e){return 0}traverseLineComment(e){return 0}},sm=Kt(om);ot();function br(r){switch(Math.abs(r)){case 0:return 0;case 1:return 1e3;case 2:return 1500;default:return 2e3}}var Ws=class extends fi{durationForAmount=br;constructor(e=br){super(),this.durationForAmount=e}traverseAlg(e){let t=0;for(let i of e.childAlgNodes())t+=this.traverseAlgNode(i);return t}traverseGrouping(e){return e.amount*this.traverseAlg(e.alg)}traverseMove(e){return this.durationForAmount(e.amount)}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return this.durationForAmount(1)}traverseNewline(e){return this.durationForAmount(1)}traverseLineComment(e){return this.durationForAmount(0)}};var uu=class{moves;durationFn=new Ws(br);kpuzzle;constructor(e,t){this.kpuzzle=e,this.moves=new le(t.experimentalExpand())}getAnimLeaf(e){return Array.from(this.moves.childAlgNodes())[e]}indexToMoveStartTimestamp(e){let t=new le(Array.from(this.moves.childAlgNodes()).slice(0,e));return this.durationFn.traverseAlg(t)}timestampToIndex(e){let t=0,i;for(i=0;i<this.numAnimatedLeaves();i++)if(t+=this.durationFn.traverseMove(this.getAnimLeaf(i)),t>=e)return i;return i}patternAtIndex(e){return this.kpuzzle.defaultPattern().applyTransformation(this.transformationAtIndex(e))}transformationAtIndex(e){let t=this.kpuzzle.identityTransformation();for(let i of Array.from(this.moves.childAlgNodes()).slice(0,e))t=t.applyMove(i);return t}algDuration(){return this.durationFn.traverseAlg(this.moves)}numAnimatedLeaves(){return sm(this.moves)}moveDuration(e){return this.durationFn.traverseMove(this.getAnimLeaf(e))}};ot();ot();var Sb={u:"y",l:"x",f:"z",r:"x",b:"z",d:"y",m:"x",e:"y",s:"z",x:"x",y:"y",z:"z"};function M6(r,e){return Sb[r.family[0].toLowerCase()]===Sb[e.family[0].toLowerCase()]}var am=class extends fi{traverseAlg(e){let t=[];for(let i of e.childAlgNodes())t.push(this.traverseAlgNode(i));return Array.prototype.concat(...t)}traverseGroupingOnce(e){if(e.experimentalIsEmpty())return[];let t=[];for(let o of e.childAlgNodes()){if(!(o.is(T)||o.is(Di)||o.is(ci)))return this.traverseAlg(e);let s=o.as(T);s&&t.push(s)}let i=br(t[0].amount);for(let o=0;o<t.length-1;o++){for(let s=1;s<t.length;s++)if(!M6(t[o],t[s]))return this.traverseAlg(e);i=Math.max(i,br(t[o].amount))}let n=t.map(o=>({animLeafAlgNode:o,msUntilNext:0,duration:i}));return n[n.length-1].msUntilNext=i,n}traverseGrouping(e){let t=[],i=e.amount>0?e.alg:e.alg.invert();for(let n=0;n<Math.abs(e.amount);n++)t.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...t)}traverseMove(e){let t=br(e.amount);return[{animLeafAlgNode:e,msUntilNext:t,duration:t}]}traverseCommutator(e){let t=[],i=[e.A,e.B,e.A.invert(),e.B.invert()];for(let n of i)t.push(this.traverseGroupingOnce(n));return Array.prototype.concat(...t)}traverseConjugate(e){let t=[],i=[e.A,e.B,e.A.invert()];for(let n of i)t.push(this.traverseGroupingOnce(n));return Array.prototype.concat(...t)}traversePause(e){if(e.experimentalNISSGrouping)return[];let t=br(1);return[{animLeafAlgNode:e,msUntilNext:t,duration:t}]}traverseNewline(e){return[]}traverseLineComment(e){return[]}},b6=Kt(am);function vb(r){let e=0;return b6(r).map(i=>{let n={animLeaf:i.animLeafAlgNode,start:e,end:e+i.duration};return e+=i.msUntilNext,n})}var Hs=class{animLeaves;kpuzzle;constructor(e,t,i){this.kpuzzle=e,this.animLeaves=i?.animationTimelineLeaves??vb(t)}getAnimLeaf(e){return this.animLeaves[Math.min(e,this.animLeaves.length-1)]?.animLeaf??null}getAnimationTimelineLeaf(e){return this.animLeaves[Math.min(e,this.animLeaves.length-1)]}indexToMoveStartTimestamp(e){let t=0;return this.animLeaves.length>0&&(t=this.animLeaves[Math.min(e,this.animLeaves.length-1)].start),t}timestampToIndex(e){let t=0;for(t=0;t<this.animLeaves.length;t++)if(this.animLeaves[t].start>=e)return Math.max(0,t-1);return Math.max(0,t-1)}timestampToPosition(e,t){let i=this.currentMoveInfo(e),n=t??this.kpuzzle.identityTransformation().toKPattern();for(let o of this.animLeaves.slice(0,i.patternIndex)){let s=o.animLeaf.as(T);s!==null&&(n=n.applyMove(s))}return{pattern:n,movesInProgress:i.currentMoves}}currentMoveInfo(e){let t=1/0;for(let f of this.animLeaves)if(f.start<=e&&f.end>=e)t=Math.min(t,f.start);else if(f.start>e)break;let i=[],n=[],o=[],s=[],a=-1/0,l=1/0,c=0;for(let f of this.animLeaves)if(f.end<=t){if(!isFinite(t)&&f.start>e)break;c++}else{if(f.start>e)break;{let u=f.animLeaf.as(T);if(u!==null){let p=(e-f.start)/(f.end-f.start),d=!1;p>1&&(p=1,d=!0);let m={move:u,direction:Vt.Forwards,fraction:p,startTimestamp:f.start,endTimestamp:f.end};switch(p){case 0:{n.push(m);break}case 1:{d?s.push(m):o.push(m);break}default:i.push(m),a=Math.max(a,f.start),l=Math.min(l,f.end)}}}}return{patternIndex:c,currentMoves:i,latestStart:a,earliestEnd:l,movesStarting:n,movesFinishing:o,movesFinished:s}}patternAtIndex(e,t){let i=t??this.kpuzzle.defaultPattern();for(let n=0;n<this.animLeaves.length&&n<e;n++){let s=this.animLeaves[n].animLeaf.as(T);s!==null&&(i=i.applyMove(s))}return i}transformationAtIndex(e){let t=this.kpuzzle.identityTransformation();for(let i of this.animLeaves.slice(0,e)){let n=i.animLeaf.as(T);n!==null&&(t=t.applyMove(n))}return t}algDuration(){let e=0;for(let t of this.animLeaves)e=Math.max(e,t.end);return e}numAnimatedLeaves(){return this.animLeaves.length}moveDuration(e){let t=this.getAnimationTimelineLeaf(e);return t.end-t.start}};ot();var yn=class{moveCount;duration;forward;backward;children=[];constructor(e,t,i,n,o=[]){this.moveCount=e,this.duration=t,this.forward=i,this.backward=n,this.children=o}},pu=class extends fi{identity;dummyLeaf;durationFn=new Ws(br);cache={};kpuzzle;constructor(e){super(),this.kpuzzle=e,this.identity=e.identityTransformation(),this.dummyLeaf=new yn(0,0,this.identity,this.identity,[])}traverseAlg(e){let t=0,i=0,n=this.identity,o=[];for(let s of e.childAlgNodes()){let a=this.traverseAlgNode(s);t+=a.moveCount,i+=a.duration,n===this.identity?n=a.forward:n=n.applyTransformation(a.forward),o.push(a)}return new yn(t,i,n,n.invert(),o)}traverseGrouping(e){let t=this.traverseAlg(e.alg);return this.mult(t,e.amount,[t])}traverseMove(e){let t=e.toString(),i=this.cache[t];if(i)return i;let n=this.kpuzzle.moveToTransformation(e);return i=new yn(1,this.durationFn.traverseAlgNode(e),n,n.invert()),this.cache[t]=i,i}traverseCommutator(e){let t=this.traverseAlg(e.A),i=this.traverseAlg(e.B),n=t.forward.applyTransformation(i.forward),o=t.backward.applyTransformation(i.backward),s=n.applyTransformation(o),a=new yn(2*(t.moveCount+i.moveCount),2*(t.duration+i.duration),s,s.invert(),[t,i]);return this.mult(a,1,[a,t,i])}traverseConjugate(e){let t=this.traverseAlg(e.A),i=this.traverseAlg(e.B),o=t.forward.applyTransformation(i.forward).applyTransformation(t.backward),s=new yn(2*t.moveCount+i.moveCount,2*t.duration+i.duration,o,o.invert(),[t,i]);return this.mult(s,1,[s,t,i])}traversePause(e){return e.experimentalNISSGrouping?this.dummyLeaf:new yn(1,this.durationFn.traverseAlgNode(e),this.identity,this.identity)}traverseNewline(e){return this.dummyLeaf}traverseLineComment(e){return this.dummyLeaf}mult(e,t,i){let n=Math.abs(t),o=e.forward.selfMultiply(t);return new yn(e.moveCount*n,e.duration*n,o,o.invert(),i)}},Ht=class{apd;back;constructor(e,t){this.apd=e,this.back=t}},du=class extends Vi{move;moveDuration;back;st;root;i;dur;goalIndex;goalDuration;kpuzzle;algOrAlgNode;apd;constructor(e,t,i){super(),this.kpuzzle=e,this.algOrAlgNode=t,this.apd=i,this.i=-1,this.dur=-1,this.goalIndex=-1,this.goalDuration=-1,this.move=void 0,this.back=!1,this.moveDuration=0,this.st=this.kpuzzle.identityTransformation(),this.root=new Ht(this.apd,!1)}moveByIndex(e){return this.i>=0&&this.i===e?this.move!==void 0:this.dosearch(e,1/0)}moveByDuration(e){return this.dur>=0&&this.dur<e&&this.dur+this.moveDuration>=e?this.move!==void 0:this.dosearch(1/0,e)}dosearch(e,t){return this.goalIndex=e,this.goalDuration=t,this.i=0,this.dur=0,this.move=void 0,this.moveDuration=0,this.back=!1,this.st=this.kpuzzle.identityTransformation(),this.algOrAlgNode.is(le)?this.traverseAlg(this.algOrAlgNode,this.root):this.traverseAlgNode(this.algOrAlgNode,this.root)}traverseAlg(e,t){if(!this.firstcheck(t))return!1;let i=t.back?e.experimentalNumChildAlgNodes()-1:0;for(let n of op(e.childAlgNodes(),t.back?Ze.Backwards:Ze.Forwards)){if(this.traverseAlgNode(n,new Ht(t.apd.children[i],t.back)))return!0;i+=t.back?-1:1}return!1}traverseGrouping(e,t){if(!this.firstcheck(t))return!1;let i=this.domult(t,e.amount);return this.traverseAlg(e.alg,new Ht(t.apd.children[0],i))}traverseMove(e,t){return this.firstcheck(t)?(this.move=e,this.moveDuration=t.apd.duration,this.back=t.back,!0):!1}traverseCommutator(e,t){if(!this.firstcheck(t))return!1;let i=this.domult(t,1);return i?this.traverseAlg(e.B,new Ht(t.apd.children[2],!i))||this.traverseAlg(e.A,new Ht(t.apd.children[1],!i))||this.traverseAlg(e.B,new Ht(t.apd.children[2],i))||this.traverseAlg(e.A,new Ht(t.apd.children[1],i)):this.traverseAlg(e.A,new Ht(t.apd.children[1],i))||this.traverseAlg(e.B,new Ht(t.apd.children[2],i))||this.traverseAlg(e.A,new Ht(t.apd.children[1],!i))||this.traverseAlg(e.B,new Ht(t.apd.children[2],!i))}traverseConjugate(e,t){if(!this.firstcheck(t))return!1;let i=this.domult(t,1);return i?this.traverseAlg(e.A,new Ht(t.apd.children[1],!i))||this.traverseAlg(e.B,new Ht(t.apd.children[2],i))||this.traverseAlg(e.A,new Ht(t.apd.children[1],i)):this.traverseAlg(e.A,new Ht(t.apd.children[1],i))||this.traverseAlg(e.B,new Ht(t.apd.children[2],i))||this.traverseAlg(e.A,new Ht(t.apd.children[1],!i))}traversePause(e,t){return this.firstcheck(t)?(this.move=e,this.moveDuration=t.apd.duration,this.back=t.back,!0):!1}traverseNewline(e,t){return!1}traverseLineComment(e,t){return!1}firstcheck(e){return e.apd.moveCount+this.i<=this.goalIndex&&e.apd.duration+this.dur<this.goalDuration?this.keepgoing(e):!0}domult(e,t){let i=e.back;if(t===0)return i;t<0&&(i=!i,t=-t);let n=e.apd.children[0],o=Math.min(Math.floor((this.goalIndex-this.i)/n.moveCount),Math.ceil((this.goalDuration-this.dur)/n.duration-1));return o>0&&this.keepgoing(new Ht(n,i),o),i}keepgoing(e,t=1){return this.i+=t*e.apd.moveCount,this.dur+=t*e.apd.duration,t!==1?e.back?this.st=this.st.applyTransformation(e.apd.backward.selfMultiply(t)):this.st=this.st.applyTransformation(e.apd.forward.selfMultiply(t)):e.back?this.st=this.st.applyTransformation(e.apd.backward):this.st=this.st.applyTransformation(e.apd.forward),!1}};ot();var _6=16;function w6(r,e){let t=new Mn,i=new Mn;for(let n of r.childAlgNodes())i.push(n),i.experimentalNumAlgNodes()>=e&&(t.push(new wt(i.toAlg())),i.reset());return t.push(new wt(i.toAlg())),t.toAlg()}var lm=class extends fi{traverseAlg(e){let t=e.experimentalNumChildAlgNodes();return t<_6?e:w6(e,Math.ceil(Math.sqrt(t)))}traverseGrouping(e){return new wt(this.traverseAlg(e.alg),e.amount)}traverseMove(e){return e}traverseCommutator(e){return new _t(this.traverseAlg(e.A),this.traverseAlg(e.B))}traverseConjugate(e){return new _t(this.traverseAlg(e.A),this.traverseAlg(e.B))}traversePause(e){return e}traverseNewline(e){return e}traverseLineComment(e){return e}},Eb=Kt(lm);var Pl=class{decoration;walker;kpuzzle;constructor(e,t){this.kpuzzle=e;let i=new pu(this.kpuzzle),n=Eb(t);this.decoration=i.traverseAlg(n),this.walker=new du(this.kpuzzle,n,this.decoration)}getAnimLeaf(e){if(this.walker.moveByIndex(e)){if(!this.walker.move)throw new Error("`this.walker.mv` missing");let t=this.walker.move;return this.walker.back?t.invert():t}return null}indexToMoveStartTimestamp(e){if(this.walker.moveByIndex(e)||this.walker.i===e)return this.walker.dur;throw new Error(`Out of algorithm: index ${e}`)}indexToMovesInProgress(e){if(this.walker.moveByIndex(e)||this.walker.i===e)return this.walker.dur;throw new Error(`Out of algorithm: index ${e}`)}patternAtIndex(e,t){return this.walker.moveByIndex(e),(t??this.kpuzzle.defaultPattern()).applyTransformation(this.walker.st)}transformationAtIndex(e){return this.walker.moveByIndex(e),this.walker.st}numAnimatedLeaves(){return this.decoration.moveCount}timestampToIndex(e){return this.walker.moveByDuration(e),this.walker.i}algDuration(){return this.decoration.duration}moveDuration(e){return this.walker.moveByIndex(e),this.walker.moveDuration}};be();var R6=1024,hu=class extends qe{derive(e){switch(e.indexerConstructorRequest){case"auto":return e.animationTimelineLeaves!==null?Hs:xb(e.alg.alg)<=R6&&e.puzzle==="3x3x3"&&e.visualizationStrategy==="Cube3D"?Hs:Pl;case"tree":return Pl;case"simple":return uu;case"simultaneous":return Hs;default:throw new Error("Invalid indexer request!")}}};be();var mu=class extends Le{getDefaultValue(){return"auto"}};be();var gu=class extends qe{derive(e){return new e.indexerConstructor(e.kpuzzle,e.algWithIssues.alg,{animationTimelineLeaves:e.animationTimelineLeaves})}};be();var yu=class extends qe{derive(e){return{pattern:e.currentPattern,movesInProgress:e.currentMoveInfo.currentMoves}}};ot();be();var T6=!0;var zl=class extends qe{async derive(e){try{return T6&&e.kpuzzle.algToTransformation(e.algWithIssues.alg),e.algWithIssues}catch(t){return{alg:new le,issues:new $n({errors:[`Invalid alg for puzzle: ${t.toString()}`]})}}}};be();var xu=class extends Le{getDefaultValue(){return"start"}};be();var Su=class extends Le{getDefaultValue(){return null}};be();var vu=class extends qe{async derive(e){return e.puzzleLoader.kpuzzle()}};be();var Eu=class extends Le{getDefaultValue(){return jr}};be();var Mu=class extends qe{async derive(e){return e.puzzleLoader.id}};be();var bu=class extends Le{getDefaultValue(){return jr}};qi();Ec();be();var _u=class extends qe{derive(e){if(e.puzzleIDRequest&&e.puzzleIDRequest!==jr){let t=md[e.puzzleIDRequest];return t||this.userVisibleErrorTracker.set({errors:[`Invalid puzzle ID: ${e.puzzleIDRequest}`]}),t}return e.puzzleDescriptionRequest&&e.puzzleDescriptionRequest!==jr?Qp(e.puzzleDescriptionRequest):Rn}};be();be();var wu=class extends qe{derive(e){return{playing:e.playingInfo.playing,atStart:e.detailedTimelineInfo.atStart,atEnd:e.detailedTimelineInfo.atEnd}}canReuseValue(e,t){return e.playing===t.playing&&e.atStart===t.atStart&&e.atEnd===t.atEnd}};be();var Ru=class extends qe{derive(e){let t=this.#e(e),i=!1,n=!1;return t>=e.timeRange.end&&(n=!0,t=Math.min(e.timeRange.end,t)),t<=e.timeRange.start&&(i=!0,t=Math.max(e.timeRange.start,t)),{timestamp:t,timeRange:e.timeRange,atStart:i,atEnd:n}}#e(e){switch(e.timestampRequest){case"auto":return e.setupAnchor==="start"&&e.setupAlg.alg.experimentalIsEmpty()?e.timeRange.end:e.timeRange.start;case"start":return e.timeRange.start;case"end":return e.timeRange.end;case"anchor":return e.setupAnchor==="start"?e.timeRange.start:e.timeRange.end;case"opposite-anchor":return e.setupAnchor==="start"?e.timeRange.end:e.timeRange.start;default:return e.timestampRequest}}canReuseValue(e,t){return e.timestamp===t.timestamp&&e.timeRange.start===t.timeRange.start&&e.timeRange.end===t.timeRange.end&&e.atStart===t.atStart&&e.atEnd===t.atEnd}};be();var Tu=class extends yi{async getDefaultValue(){return{direction:Vt.Forwards,playing:!1,untilBoundary:Wi.EntireTimeline,loop:!1}}async derive(e,t){let i=await t,n=Object.assign({},i);return Object.assign(n,e),n}canReuseValue(e,t){return e.direction===t.direction&&e.playing===t.playing&&e.untilBoundary===t.untilBoundary&&e.loop===t.loop}};be();var Au=class extends yi{getDefaultValue(){return 1}derive(e){return e<0?1:e}};be();var A6={auto:!0,start:!0,end:!0,anchor:!0,"opposite-anchor":!0},Du=class extends Le{getDefaultValue(){return"auto"}set(e){let t=this.get();super.set((async()=>this.validInput(await e)?e:t)())}validInput(e){return!!(typeof e=="number"||A6[e])}};be();var Cu=class extends Le{getDefaultValue(){return"auto"}};be();var Lu=class extends qe{derive(e){return{start:0,end:e.indexer.algDuration()}}};be();var Pu=class extends Le{getDefaultValue(){return"auto"}};be();var zu=class extends Le{getDefaultValue(){return"auto"}};be();var ku=class extends qe{derive(e){switch(e.puzzleID){case"clock":case"square1":case"redi_cube":case"melindas2x2x2x2":case"tri_quad":case"loopover":return"2D";case"3x3x3":switch(e.visualizationRequest){case"auto":case"3D":return"Cube3D";default:return e.visualizationRequest}default:switch(e.visualizationRequest){case"auto":case"3D":return"PG3D";case"experimental-2D-LL":case"experimental-2D-LL-face":return["2x2x2","4x4x4","megaminx"].includes(e.puzzleID)?"experimental-2D-LL":"2D";default:return e.visualizationRequest}}}};be();var Nu=class extends Le{getDefaultValue(){return"auto"}};be();var Iu=class extends Le{getDefaultValue(){return"auto"}};yf();be();var Ou=class extends Le{getDefaultValue(){return"auto"}};be();var Fu=class extends Le{getDefaultValue(){return"auto"}};Gr();be();var D6=null;async function C6(){return D6??=new(await Gt).ThreeTextureLoader}var kl=class extends qe{async derive(e){let{spriteURL:t}=e;return t===null?null:new Promise(async(i,n)=>{let o=()=>{console.warn("Could not load sprite:",t.toString()),i(null)};try{(await C6()).load(t.toString(),i,o,o)}catch{o()}})}};be();var L6={facelets:["regular","regular","regular","regular","regular"]};async function P6(r){let{definition:e}=await r.kpuzzle(),t={orbits:{}};for(let i of e.orbits)t.orbits[i.orbitName]={pieces:new Array(i.numPieces).fill(L6)};return t}var Uu=class extends qe{getDefaultValue(){return{orbits:{}}}async derive(e){return e.stickeringMaskRequest?e.stickeringMaskRequest:e.stickeringRequest==="picture"?{specialBehaviour:"picture",orbits:{}}:e.puzzleLoader.stickeringMask?.(e.stickeringRequest??"full")??P6(e.puzzleLoader)}};be();qi();var z6={"-":j.Regular,D:j.Dim,I:j.Ignored,X:j.Invisible,O:j.IgnoreNonPrimary,P:j.PermuteNonPrimary,o:j.Ignoriented,"?":j.OrientationWithoutPermutation,M:j.Mystery,"@":j.Regular};function Mb(r){let e={orbits:{}},t=r.split(",");for(let i of t){let[n,o,...s]=i.split(":");if(s.length>0)throw new Error(`Invalid serialized orbit stickering mask (too many colons): \`${i}\``);let a=[];e.orbits[n]={pieces:a};for(let l of o){let c=z6[l];a.push(fc(c))}}return e}var Bu=class extends yi{getDefaultValue(){return null}derive(e){return e===null?null:typeof e=="string"?Mb(e):e}};qi();be();var Gu=class extends Le{getDefaultValue(){return null}};be();var Vu=class extends Le{getDefaultValue(){return"auto"}};be();var Wu=class extends Le{getDefaultValue(){return{}}};be();var Hu=class extends Le{getDefaultValue(){return"auto"}};be();var Ku=class extends Le{getDefaultValue(){return"auto"}};be();var Xu=class extends qe{derive(e){return e.colorSchemeRequest==="dark"?"dark":"light"}};be();var qu=class extends Le{getDefaultValue(){return"auto"}};be();var ju=class extends Le{getDefaultValue(){return null}};be();var k6=35,Yu=class extends Le{getDefaultValue(){return k6}};ys();be();be();function cm(r,e){return r.latitude===e.latitude&&r.longitude===e.longitude&&r.distance===e.distance}var Qu=class extends yi{getDefaultValue(){return"auto"}canReuseValue(e,t){return e===t||cm(e,t)}async derive(e,t){if(e==="auto")return"auto";let i=await t;i==="auto"&&(i={});let n=Object.assign({},i);return Object.assign(n,e),typeof n.latitude<"u"&&(n.latitude=Math.min(Math.max(n.latitude,-90),90)),typeof n.longitude<"u"&&(n.longitude=ra(n.longitude,180,-180)),n}};var Zu=class extends qe{canReuseValue(e,t){return cm(e,t)}async derive(e){if(e.orbitCoordinatesRequest==="auto")return _b(e.puzzleID,e.strategy);let t=Object.assign(Object.assign({},_b(e.puzzleID,e.strategy),e.orbitCoordinatesRequest));if(Math.abs(t.latitude)<=e.latitudeLimit)return t;{let{latitude:i,longitude:n,distance:o}=t;return{latitude:e.latitudeLimit*Math.sign(i),longitude:n,distance:o}}}},N6={latitude:31.717474411461005,longitude:0,distance:5.877852522924731},I6={latitude:35,longitude:30,distance:6},bb={latitude:35,longitude:30,distance:6.25},O6={latitude:Math.atan(1/2)*Xn,longitude:0,distance:6.7},F6={latitude:26.56505117707799,longitude:0,distance:6};function _b(r,e){if(r[1]==="x")return e==="Cube3D"?I6:bb;switch(r){case"megaminx":case"gigaminx":return O6;case"pyraminx":case"master_tetraminx":return F6;case"skewb":return bb;default:return N6}}var $u=class{background=new Ku;colorSchemeRequest=new qu;dragInput=new Vu;foundationDisplay=new Iu;foundationStickerSpriteURL=new _o;fullscreenElement=new ju;hintFacelet=new mf;hintStickerSpriteURL=new _o;initialHintFaceletsAnimation=new Fu;hintFaceletsElevation=new Ou;latitudeLimit=new Yu;movePressInput=new Hu;movePressCancelOptions=new Wu;orbitCoordinatesRequest=new Qu;stickeringMaskRequest=new Bu;stickeringRequest=new Gu;faceletScale=new Nu;colorScheme=new Xu({colorSchemeRequest:this.colorSchemeRequest});foundationStickerSprite=new kl({spriteURL:this.foundationStickerSpriteURL});hintStickerSprite=new kl({spriteURL:this.hintStickerSpriteURL});orbitCoordinates;stickeringMask;twistyPlayerModel;constructor(e){this.twistyPlayerModel=e,this.orbitCoordinates=new Zu({orbitCoordinatesRequest:this.orbitCoordinatesRequest,latitudeLimit:this.latitudeLimit,puzzleID:e.puzzleID,strategy:e.visualizationStrategy}),this.stickeringMask=new Uu({stickeringMaskRequest:this.stickeringMaskRequest,stickeringRequest:this.stickeringRequest,puzzleLoader:e.puzzleLoader})}};be();var U6={errors:[]},Ju=class extends Le{getDefaultValue(){return U6}reset(){this.set(this.getDefaultValue())}canReuseValue(e,t){return ia(e.errors,t.errors)}};var ep=class{userVisibleErrorTracker=new Ju;alg=new Ll;backView=new Cu;controlPanel=new Kl;catchUpMove=new au;indexerConstructorRequest=new mu;playingInfo=new Tu;puzzleDescriptionRequest=new Eu;puzzleIDRequest=new bu;setupAnchor=new xu;setupAlg=new Ll;setupTransformation=new Su;tempoScale=new Au;timestampRequest=new Du;viewerLink=new Pu;visualizationFormat=new zu;title=new Cl;videoURL=new _o;competitionID=new Cl;animationTimelineLeavesRequest=new su;puzzleLoader=new _u({puzzleIDRequest:this.puzzleIDRequest,puzzleDescriptionRequest:this.puzzleDescriptionRequest},this.userVisibleErrorTracker);kpuzzle=new vu({puzzleLoader:this.puzzleLoader});puzzleID=new Mu({puzzleLoader:this.puzzleLoader});puzzleAlg=new zl({algWithIssues:this.alg,kpuzzle:this.kpuzzle});puzzleSetupAlg=new zl({algWithIssues:this.setupAlg,kpuzzle:this.kpuzzle});visualizationStrategy=new ku({visualizationRequest:this.visualizationFormat,puzzleID:this.puzzleID});indexerConstructor=new hu({alg:this.alg,puzzle:this.puzzleID,visualizationStrategy:this.visualizationStrategy,indexerConstructorRequest:this.indexerConstructorRequest,animationTimelineLeaves:this.animationTimelineLeavesRequest});setupAlgTransformation=new nu({setupAlg:this.puzzleSetupAlg,kpuzzle:this.kpuzzle});indexer=new gu({indexerConstructor:this.indexerConstructor,algWithIssues:this.puzzleAlg,kpuzzle:this.kpuzzle,animationTimelineLeaves:this.animationTimelineLeavesRequest});anchorTransformation=new ou({setupTransformation:this.setupTransformation,setupAnchor:this.setupAnchor,setupAlgTransformation:this.setupAlgTransformation,indexer:this.indexer});timeRange=new Lu({indexer:this.indexer});detailedTimelineInfo=new Ru({timestampRequest:this.timestampRequest,timeRange:this.timeRange,setupAnchor:this.setupAnchor,setupAlg:this.setupAlg});coarseTimelineInfo=new wu({detailedTimelineInfo:this.detailedTimelineInfo,playingInfo:this.playingInfo});currentMoveInfo=new cu({indexer:this.indexer,detailedTimelineInfo:this.detailedTimelineInfo,catchUpMove:this.catchUpMove});buttonAppearance=new eu({coarseTimelineInfo:this.coarseTimelineInfo,viewerLink:this.viewerLink});currentLeavesSimplified=new lu({currentMoveInfo:this.currentMoveInfo});currentPattern=new fu({anchoredStart:this.anchorTransformation,currentLeavesSimplified:this.currentLeavesSimplified,indexer:this.indexer});legacyPosition=new yu({currentMoveInfo:this.currentMoveInfo,currentPattern:this.currentPattern});twistySceneModel=new $u(this);async twizzleLink(){let[e,t,i,n,o,s,a,l]=await Promise.all([this.viewerLink.get(),this.puzzleID.get(),this.puzzleDescriptionRequest.get(),this.alg.get(),this.setupAlg.get(),this.setupAnchor.get(),this.twistySceneModel.stickeringRequest.get(),this.twistySceneModel.twistyPlayerModel.title.get()]),c=e==="experimental-twizzle-explorer",f=new URL(`https://alpha.twizzle.net/${c?"explore":"edit"}/`);return n.alg.experimentalIsEmpty()||f.searchParams.set("alg",n.alg.toString()),o.alg.experimentalIsEmpty()||f.searchParams.set("setup-alg",o.alg.toString()),s!=="start"&&f.searchParams.set("setup-anchor",s),a!=="full"&&a!==null&&f.searchParams.set("experimental-stickering",a),c&&i!==jr?f.searchParams.set("puzzle-description",i):t!=="3x3x3"&&f.searchParams.set("puzzle",t),l&&f.searchParams.set("title",l),f.toString()}experimentalAddAlgLeaf(e,t){let i=e.as(T);i?this.experimentalAddMove(i,t):this.alg.set((async()=>{let o=(await this.alg.get()).alg.concat(new le([e]));return this.timestampRequest.set("end"),o})())}experimentalAddMove(e,t){let i=typeof e=="string"?new T(e):e;this.alg.set((async()=>{let[{alg:n},o]=await Promise.all([this.alg.get(),this.puzzleLoader.get()]),s=ta(n,i,{...t,...await Pp(o)});return this.timestampRequest.set("end"),this.catchUpMove.set({move:i,amount:0}),s})())}experimentalRemoveFinalChild(){this.alg.set((async()=>{let e=(await this.alg.get()).alg,t=Array.from(e.childAlgNodes()),[i]=t.splice(-1);if(!i)return e;this.timestampRequest.set("end");let n=i.as(T);return n&&this.catchUpMove.set({move:n.invert(),amount:0}),new le(t)})())}};qn();function ft(r){return new Error(`Cannot get \`.${r}\` directly from a \`TwistyPlayer\`.`)}var tp=class extends oi{experimentalModel=new ep;set alg(e){this.experimentalModel.alg.set(e)}get alg(){throw ft("alg")}set experimentalSetupAlg(e){this.experimentalModel.setupAlg.set(e)}get experimentalSetupAlg(){throw ft("setup")}set experimentalSetupAnchor(e){this.experimentalModel.setupAnchor.set(e)}get experimentalSetupAnchor(){throw ft("anchor")}set puzzle(e){this.experimentalModel.puzzleIDRequest.set(e)}get puzzle(){throw ft("puzzle")}set experimentalPuzzleDescription(e){this.experimentalModel.puzzleDescriptionRequest.set(e)}get experimentalPuzzleDescription(){throw ft("experimentalPuzzleDescription")}set timestamp(e){this.experimentalModel.timestampRequest.set(e)}get timestamp(){throw ft("timestamp")}set hintFacelets(e){this.experimentalModel.twistySceneModel.hintFacelet.set(e)}get hintFacelets(){throw ft("hintFacelets")}set experimentalStickering(e){this.experimentalModel.twistySceneModel.stickeringRequest.set(e)}get experimentalStickering(){throw ft("experimentalStickering")}set experimentalStickeringMaskOrbits(e){this.experimentalModel.twistySceneModel.stickeringMaskRequest.set(e)}get experimentalStickeringMaskOrbits(){throw ft("experimentalStickeringMaskOrbits")}set experimentalFaceletScale(e){this.experimentalModel.twistySceneModel.faceletScale.set(e)}get experimentalFaceletScale(){throw ft("experimentalFaceletScale")}set backView(e){this.experimentalModel.backView.set(e)}get backView(){throw ft("backView")}set background(e){this.experimentalModel.twistySceneModel.background.set(e)}get background(){throw ft("background")}set colorScheme(e){this.experimentalModel.twistySceneModel.colorSchemeRequest.set(e)}get colorScheme(){throw ft("colorScheme")}set controlPanel(e){this.experimentalModel.controlPanel.set(e)}get controlPanel(){throw ft("controlPanel")}set visualization(e){this.experimentalModel.visualizationFormat.set(e)}get visualization(){throw ft("visualization")}set experimentalTitle(e){this.experimentalModel.title.set(e)}get experimentalTitle(){throw ft("experimentalTitle")}set experimentalVideoURL(e){this.experimentalModel.videoURL.set(e)}get experimentalVideoURL(){throw ft("experimentalVideoURL")}set experimentalCompetitionID(e){this.experimentalModel.competitionID.set(e)}get experimentalCompetitionID(){throw ft("experimentalCompetitionID")}set viewerLink(e){this.experimentalModel.viewerLink.set(e)}get viewerLink(){throw ft("viewerLink")}set experimentalMovePressInput(e){this.experimentalModel.twistySceneModel.movePressInput.set(e)}get experimentalMovePressInput(){throw ft("experimentalMovePressInput")}set experimentalMovePressCancelOptions(e){this.experimentalModel.twistySceneModel.movePressCancelOptions.set(e)}get experimentalMovePressCancelOptions(){throw ft("experimentalMovePressCancelOptions")}set cameraLatitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({latitude:e})}get cameraLatitude(){throw ft("cameraLatitude")}set cameraLongitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({longitude:e})}get cameraLongitude(){throw ft("cameraLongitude")}set cameraDistance(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({distance:e})}get cameraDistance(){throw ft("cameraDistance")}set cameraLatitudeLimit(e){this.experimentalModel.twistySceneModel.latitudeLimit.set(e)}get cameraLatitudeLimit(){throw ft("cameraLatitudeLimit")}set indexer(e){this.experimentalModel.indexerConstructorRequest.set(e)}get indexer(){throw ft("indexer")}set tempoScale(e){this.experimentalModel.tempoScale.set(e)}get tempoScale(){throw ft("tempoScale")}set experimentalSprite(e){this.experimentalModel.twistySceneModel.foundationStickerSpriteURL.set(e)}get experimentalSprite(){throw ft("experimentalSprite")}set experimentalHintSprite(e){this.experimentalModel.twistySceneModel.hintStickerSpriteURL.set(e)}get experimentalHintSprite(){throw ft("experimentalHintSprite")}set fullscreenElement(e){this.experimentalModel.twistySceneModel.fullscreenElement.set(e)}get fullscreenElement(){throw ft("fullscreenElement")}set experimentalInitialHintFaceletsAnimation(e){this.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set(e)}get experimentalInitialHintFaceletsAnimation(){throw ft("experimentalInitialHintFaceletsAnimation")}set experimentalHintFaceletsElevation(e){this.experimentalModel.twistySceneModel.hintFaceletsElevation.set(e)}get experimentalHintFaceletsElevation(){throw ft("experimentalHintFaceletsElevation")}set experimentalDragInput(e){this.experimentalModel.twistySceneModel.dragInput.set(e)}get experimentalDragInput(){throw ft("experimentalDragInput")}experimentalGet=new fm(this.experimentalModel)},fm=class{model;constructor(e){this.model=e}async alg(){return(await this.model.alg.get()).alg}async setupAlg(){return(await this.model.setupAlg.get()).alg}puzzleID(){return this.model.puzzleID.get()}async timestamp(){return(await this.model.detailedTimelineInfo.get()).timestamp}};var um="data-",pm={alg:"alg","experimental-setup-alg":"experimentalSetupAlg","experimental-setup-anchor":"experimentalSetupAnchor",puzzle:"puzzle","experimental-puzzle-description":"experimentalPuzzleDescription",visualization:"visualization","hint-facelets":"hintFacelets","experimental-stickering":"experimentalStickering","experimental-stickering-mask-orbits":"experimentalStickeringMaskOrbits",background:"background","color-scheme":"colorScheme","control-panel":"controlPanel","back-view":"backView","experimental-facelet-scale":"experimentalFaceletScale","experimental-initial-hint-facelets-animation":"experimentalInitialHintFaceletsAnimation","experimental-hint-facelets-elevation":"experimentalHintFaceletsElevation","viewer-link":"viewerLink","experimental-move-press-input":"experimentalMovePressInput","experimental-drag-input":"experimentalDragInput","experimental-title":"experimentalTitle","experimental-video-url":"experimentalVideoURL","experimental-competition-id":"experimentalCompetitionID","camera-latitude":"cameraLatitude","camera-longitude":"cameraLongitude","camera-distance":"cameraDistance","camera-latitude-limit":"cameraLatitudeLimit","tempo-scale":"tempoScale","experimental-sprite":"experimentalSprite","experimental-hint-sprite":"experimentalHintSprite"},B6=Object.fromEntries(Object.values(pm).map(r=>[r,!0])),G6={experimentalMovePressCancelOptions:!0},wb,Rb=Symbol("intersectedCallback");function V6(r){wb??=new IntersectionObserver((e,t)=>{for(let i of e)i.isIntersecting&&i.intersectionRect.height>0&&(i.target[Rb](),t.unobserve(i.target))}),wb.observe(r)}var ip=class extends tp{controller=new Wl(this.experimentalModel,this);buttons;experimentalCanvasClickCallback=()=>{};constructor(e={}){super();for(let[t,i]of Object.entries(e)){if(!(B6[t]||G6[t])){console.warn(`Invalid config passed to TwistyPlayer: ${t}`);break}this[t]=i}}#e=new Wr(this,"controls-",["auto"].concat(Object.keys(Nm)));#t=document.createElement("div");#i=document.createElement("div");#n=!1;connectedCallback(){this.addCSS(rm),V6(this)}async[Rb](){if(this.#n)return;this.#n=!0,this.addElement(this.#t).classList.add("visualization-wrapper"),this.addElement(this.#i).classList.add("error-elem"),this.#i.textContent="Error",this.experimentalModel.userVisibleErrorTracker.addFreshListener(t=>{let i=t.errors[0]??null;this.contentWrapper.classList.toggle("error",!!i),i&&(this.#i.textContent=i)});let e=new Dl(this.experimentalModel,this.controller);this.contentWrapper.appendChild(e),this.buttons=new Al(this.experimentalModel,this.controller,this),this.contentWrapper.appendChild(this.buttons),this.experimentalModel.twistySceneModel.background.addFreshListener(t=>{this.contentWrapper.classList.toggle("checkered",["auto","checkered"].includes(t)),this.contentWrapper.classList.toggle("checkered-transparent",t==="checkered-transparent")}),this.experimentalModel.twistySceneModel.colorScheme.addFreshListener(t=>{this.contentWrapper.classList.toggle("dark-mode",["dark"].includes(t))}),this.experimentalModel.controlPanel.addFreshListener(t=>{this.#e.setValue(t)}),this.experimentalModel.visualizationStrategy.addFreshListener(this.#l.bind(this)),this.experimentalModel.puzzleID.addFreshListener(this.flash.bind(this))}#o="auto";experimentalSetFlashLevel(e){this.#o=e}flash(){this.#o==="auto"&&this.#r?.animate([{opacity:.25},{opacity:1}],{duration:250,easing:"ease-out"})}#r=null;#s=new Us;#a=null;#l(e){if(e!==this.#a){this.#r?.remove(),this.#r?.disconnect();let t;switch(e){case"2D":case"experimental-2D-LL":case"experimental-2D-LL-face":{t=new Tl(this.experimentalModel.twistySceneModel,e);break}case"Cube3D":case"PG3D":{t=new Gs(this.experimentalModel),this.#s.handleNewValue(t);break}default:throw new Error("Invalid visualization")}this.#t.appendChild(t),this.#r=t,this.#a=e}}async experimentalCurrentVantages(){this.connectedCallback();let e=this.#r;return e instanceof Gs?e.experimentalVantages():[]}async experimentalCurrentCanvases(){let e=await this.experimentalCurrentVantages(),t=[];for(let i of e)t.push((await i.canvasInfo()).canvas);return t}async experimentalCurrentThreeJSPuzzleObject(e){this.connectedCallback();let i=await(await this.#s.promise).experimentalTwisty3DPuzzleWrapper(),n=i.twisty3DPuzzle(),o=(async()=>{await n,await new Promise(s=>setTimeout(s,0))})();if(e){let s=new Ni(async()=>{});i.addEventListener("render-scheduled",async()=>{s.requestIsPending()||(s.requestAnimFrame(),await o,e())})}return n}jumpToStart(e){this.controller.jumpToStart(e)}jumpToEnd(e){this.controller.jumpToEnd(e)}play(){this.controller.togglePlay(!0)}pause(){this.controller.togglePlay(!1)}togglePlay(e){this.controller.togglePlay(e)}experimentalAddMove(e,t){this.experimentalModel.experimentalAddMove(e,t)}experimentalAddAlgLeaf(e,t){this.experimentalModel.experimentalAddAlgLeaf(e,t)}static get observedAttributes(){let e=[];for(let t of Object.keys(pm))e.push(t,um+t);return e}experimentalRemoveFinalChild(){this.experimentalModel.experimentalRemoveFinalChild()}attributeChangedCallback(e,t,i){e.startsWith(um)&&(e=e.slice(um.length));let n=pm[e];n&&(this[n]=i)}async experimentalScreenshot(e){return(await em(this.experimentalModel,e)).dataURL}async experimentalDownloadScreenshot(e){if(["2D","experimental-2D-LL","experimental-2D-LL-face"].includes(await this.experimentalModel.visualizationStrategy.get())){let i=await this.#r.currentTwisty2DPuzzleWrapper().twisty2DPuzzle(),n=new XMLSerializer().serializeToString(i.svgWrapper.svgElement),o=URL.createObjectURL(new Blob([n]));im(o,e??await tm(this.experimentalModel),"svg")}else await(await em(this.experimentalModel)).download(e)}};jt.define("twisty-player",ip);ot();Ec();Xi();export{le as Alg,Ar as KPattern,It as KPuzzle,T as Move,ip as TwistyPlayer,Rn as cube3x3x3,md as puzzles};
