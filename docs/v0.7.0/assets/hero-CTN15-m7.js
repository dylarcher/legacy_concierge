import{d as a,r as E}from"./image-manifest-BwmoDsCW.js";import{B as A,r as h,d as j}from"./_base-Y6FM_vQ2.js";const m="/legacy_concierge/v0.7.0/assets/bg-crashing-waves-fullscreen-video-p683KzGq.mp4",p="/legacy_concierge/v0.7.0/assets/bg-crashing-waves-fullscreen-video-BGHukiE1.webm",u=!1,P=!u,S=()=>`
    <template id="banner">
        <header class="relative isolate overflow-hidden py-24 sm:py-32">
			<div class="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
				<video autoplay loop muted playsinline class="absolute inset-0 -z-10 size-full object-cover object-right md:object-center" poster="${a}">
					<source src="${m}" type="video/mp4">
					<source src="${p}" type="video/webm">
					<img role="presentation" src="${a}" alt="Scenic beach with blue-green waves and a brown sandy shore" class="size-full object-cover object-right md:object-center" />
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
`;class k extends A{static get observedAttributes(){return["heading","description","image","image-alt","video","video-type","no-video","primary-cta","primary-href","secondary-cta","secondary-href","align"]}connectedCallback(){this._injectStyles(),this.render()}attributeChangedCallback(e,r,i){r!==i&&this.isConnected&&this.render()}_injectStyles(){if(document.getElementById("banner-template-styles"))return;const e=document.createElement("style");e.id="banner-template-styles",e.textContent=`
			hero-banner {
				display: block;
			}
			hero-banner > header::before {
				content: '';
				width: 100%;
				height: 100%;
				background: linear-gradient(160deg, #0128 56%, #0000 80%);
				left: 0;
				top: 0;
				position: absolute;
				z-index: -5;
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
		`,document.head.appendChild(e)}_createGradientBlurs(){const e="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";return[this.h("div",{"aria-hidden":"true",class:"hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"},this.h("div",{style:`clip-path: ${e}`,class:"aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"})),this.h("div",{"aria-hidden":"true",class:"absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"},this.h("div",{style:`clip-path: ${e}`,class:"aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"}))]}render(){const e=this.getAttribute("heading")||"Your health, Our Purpose.",r=this.getAttribute("description")||"Refining Private Nursing with Expertise, Discretion, and Unparalleled Personalized Care at Home.",i=this.getAttribute("image"),g=i?E(i):a,f=this.getAttribute("image-alt")||"",o=this.getAttribute("primary-cta"),b=h(this.getAttribute("primary-href")||"#"),n=this.getAttribute("secondary-cta"),x=h(this.getAttribute("secondary-href")||"#"),l=this.getAttribute("align"),v=this.children.length>0&&!this._rendered,s=[];o&&s.push(this.h("a",{href:b,class:"text-white bg-secondary/32 px-6 py-4 text-lg text-[clamp(1rem,1.5vw,1.25rem)] font-bold text-shadow-lg tracking-wider shadow-xs border-1 rounded-xl no-underline"},o)),n&&s.push(this.h("a",{href:x,class:"text-white text-lg/6 text-[clamp(0.92rem,1.32vw,1.15rem)] font-semibold text-shadow-lg tracking-wide no-underline"},n,this.h("span",{"aria-hidden":"true"}," →"))),s.length===0&&!v&&s.push(this.h("a",{href:"#",class:"rounded-md px-6 py-4 text-md font-semibold text-shadow-lg shadow-xs no-underline"},"Call for more details…"),this.h("a",{href:"#",class:"text-sm/6 font-semibold text-shadow-lg no-underline"},"Learn more",this.h("span",{"aria-hidden":"true"}," →")));const y=l==="center"?"text-center":"text-left lg:text-left",w=l==="center"?"justify-center":"justify-start lg:justify-start";this.hasAttribute("no-video");const c=this.getAttribute("video");c?this.h("source",{src:c,type:this.getAttribute("video-type")||"video/mp4"}):[{src:m,type:"video/mp4"},{src:p,type:"video/webm"}].map(t=>this.h("source",{src:t.src,type:t.type}));const d=this.h("header",{class:"text-white relative isolate overflow-hidden min-h-dvh"},this.h("img",{role:"presentation",src:g,alt:f,class:"absolute inset-0 -z-10 size-full object-cover object-right md:object-center"}),this.h("div",{class:"mx-auto max-w-6xl px-6 min-h-dvh flex items-center transform translate-y-[-24dvh] lg:translate-y-[-12dvh]"},...this._createGradientBlurs(),this.h("div",{class:`items-center mr-auto w-full lg:w-2/3 ${y} lg:mx-0 lg:flex-auto`},this.h("h1",{class:"tracking-wide leading-tight"},e),this.h("p",{class:"mt-6 text-[clamp(1.125rem,3vw,1.75rem)] text-pretty font-medium text-shadow-lg leading-relaxed w-4/5 lg:w-2/3"},r),this.h("div",{class:`mt-10 flex items-center ${w} gap-x-6`},...s)))),C=this.h("button",{type:"button",class:"absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator rounded-full p-4 cursor-pointer transition-colors","aria-label":"Scroll to content",onclick:()=>{const t=this.querySelector("header");t?.nextElementSibling?t.nextElementSibling.scrollIntoView({behavior:"smooth"}):window.scrollTo({top:t?.offsetHeight||window.innerHeight,behavior:"smooth"})}},this.svg("svg",{class:"size-8 text-white/70",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor"},this.svg("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19 9l-7 7-7-7"})));d.appendChild(C),this.innerHTML="",this.appendChild(d),this._rendered=!0}}j("hero-banner",k);export{S as BANNER_TEMPLATE,P as HERO_VIDEO_DISABLED,u as HERO_VIDEO_ENABLED,k as HeroBanner,k as default};
//# sourceMappingURL=hero-CTN15-m7.js.map
