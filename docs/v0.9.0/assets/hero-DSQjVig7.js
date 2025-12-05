import{d as o,r as y}from"./image-manifest-DIiyBpq3.js";import{B as w,r as E,d as C}from"./_base-Cy1ntaVh.js";const h="/legacy_concierge/v0.9.0/assets/bg-crashing-waves-fullscreen-video-p683KzGq.mp4",m="/legacy_concierge/v0.9.0/assets/bg-crashing-waves-fullscreen-video-BGHukiE1.webm",p=!1,z=!p,B=()=>`
    <template id="banner">
        <header class="relative isolate overflow-hidden">
			<div class="mx-auto max-w-7xl">
				<video autoplay loop muted playsinline class="absolute inset-0 -z-10 size-full object-cover object-right md:object-center" poster="${o}">
					<source src="${h}" type="video/mp4">
					<source src="${m}" type="video/webm">
					<img role="presentation" src="${o}" alt="Scenic beach with blue-green waves and a brown sandy shore" class="size-full object-cover object-right md:object-center" />
				</video>

				<div aria-hidden="true" class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
					<div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
				</div>

				<div aria-hidden="true" class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0">
					<div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
				</div>

				<div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
					<h1 class="tracking-tight sm:text-4xl">Your health, Our Purpose.</h1>
					<p class="mt-6 text-lg/8 text-pretty text-white">Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.</p>

					<div class="text-canvas mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<a href="#" class="rounded-md px-3.5 py-2.5 text-sm font-semibold no-underline shadow-xs"> Call for more details&hellip; </a>
						<a href="#" class="text-sm/6 font-semibold text-white">
							Learn more
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>
        </header>
    </template>
`;class j extends w{static get observedAttributes(){return["heading","description","image","image-alt","video","video-type","no-video","primary-cta","primary-href","secondary-cta","secondary-href","align"]}connectedCallback(){this._injectStyles(),this.render()}attributeChangedCallback(e,t,s){t!==s&&this.isConnected&&this.render()}_injectStyles(){if(document.getElementById("banner-template-styles"))return;const e=document.createElement("style");e.id="banner-template-styles",e.textContent=`
			hero-banner {
				display: block;
				background: var(--color-primary);
			}
			@keyframes bounce-scroll {
				0%, 100% {
					transform: translateY(0);
					opacity: 1;
				}
				50% {
					transform: translateY(0.5rem);
					opacity: 0.7;
				}
			}
			.scroll-indicator {
				animation: bounce-scroll 2s ease-in-out infinite;
			}
		`,document.head.appendChild(e)}_formatHeading(e){const t=e.indexOf(",");if(t===-1)return[e];const s=e.slice(0,t+1),a=e.slice(t+1);return[s,this.h("span",{class:"italic"},a)]}_createGradientBlurs(){return[]}render(){const e=this.getAttribute("heading")||"Your health, Our Purpose.",t=this.getAttribute("description")||"Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.",s=this.getAttribute("image"),a=s?y(s):o,u=this.getAttribute("image-alt")||"",n=this.getAttribute("primary-cta"),g=E(this.getAttribute("primary-href")||"#"),l=this.getAttribute("align"),f=this.children.length>0&&!this._rendered,i=[];n&&i.push(this.h("a",{href:g,class:"text-white bg-secondary/48 backdrop-blur-[2px] text-shadow-lg px-6 py-4 text-lg text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-shadow-lg tracking-wider shadow-xs border-2 border-white/64 shadow-b-4xl rounded-full no-underline hover:bg-secondary/72 hover:backdrop-blur-[0px] transition-colors mt-12"},n)),i.length===0&&!f&&i.push(this.h("a",{href:"#",class:"rounded-md px-6 py-4 text-md font-semibold text-shadow-lg shadow-xs no-underline"},"Call for more details…"));const x=l==="center"?"text-center":"text-left lg:text-left",b=l==="center"?"justify-center":"justify-start lg:justify-start";this.hasAttribute("no-video");const c=this.getAttribute("video");c?this.h("source",{src:c,type:this.getAttribute("video-type")||"video/mp4"}):[{src:h,type:"video/mp4"},{src:m,type:"video/webm"}].map(r=>this.h("source",{src:r.src,type:r.type}));const d=this.h("header",{class:"text-white relative isolate overflow-hidden min-h-dvh"},this.h("img",{role:"presentation",src:a,alt:u,class:"absolute inset-0 -z-10 size-full object-cover object-right md:object-center mt-[5rem] opacity-72"}),this.h("div",{class:"mx-auto w-[80dvw] max-w-[120rem] px-6 pt-0 min-h-dvh flex items-center -mt-24"},...this._createGradientBlurs(),this.h("div",{class:`items-center mr-auto w-full pt-0 lg:w-2/3 ${x} lg:mx-0 lg:flex-auto -mt-32`},this.h("h1",{class:"text-[#fff] font-semibold font-serif text-6xl md:text-7xl tracking-normal leading-tight text-balance"},...this._formatHeading(e)),this.h("p",{class:"mt-6 text-[clamp(1.125rem,3vw,1.75rem)] text-pretty font-medium text-shadow-lg leading-relaxed w-4/5 lg:w-2/3 max-w-4xl"},t),this.h("div",{class:`mt-10 flex items-center pt-0 -mt-12 ${b} gap-x-6`},...i)))),v=this.h("button",{type:"button",class:"absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator rounded-full p-4 cursor-pointer transition-colors","aria-label":"Scroll to content",onclick:()=>{const r=this.querySelector("header");r?.nextElementSibling?r.nextElementSibling.scrollIntoView({behavior:"smooth"}):window.scrollTo({top:r?.offsetHeight||window.innerHeight,behavior:"smooth"})}},this.svg("svg",{class:"size-8 text-white/70",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor"},this.svg("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19 9l-7 7-7-7"})));d.appendChild(v),this.innerHTML="",this.appendChild(d),this._rendered=!0}}C("hero-banner",j);export{B as BANNER_TEMPLATE,z as HERO_VIDEO_DISABLED,p as HERO_VIDEO_ENABLED,j as HeroBanner,j as default};
//# sourceMappingURL=hero-DSQjVig7.js.map
