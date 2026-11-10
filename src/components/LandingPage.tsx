"use client";
import Image from "next/image";
import {useLocale} from "next-intl";
import {useState, type FormEvent} from "react";
import {ArrowUpRight, ArrowRight, Menu, X, MessageCircle, Plus} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL} from "@/lib/constants";
import s from "./LuxuryHome.module.css";

const copy = {
  fr: {
    nav:["Expertises","Méthode","Projets","Contact"],
    cta:"Présenter mon projet",
    label:"INGÉNIERIE TECHNIQUE DU BÂTIMENT",
    title:"Le confort se conçoit.",
    accent:"La précision l’installe.",
    intro:"AEROVENTIS conçoit, installe et maintient des solutions de climatisation, ventilation et plomberie pensées pour l’architecture, les usages et la performance du bâtiment.",
    discover:"Découvrir notre méthode",
    image:"Techniciens AEROVENTIS en intervention",
    imageNote:"Visuel d’illustration — ne représente pas un chantier client.",
    proof:["Étude & dimensionnement","Installation & mise en service","Maintenance & SAV"],
    expertiseTitle:"Une expertise complète, sans compromis.",
    expertiseIntro:"Chaque projet est traité comme un ensemble cohérent : étude des besoins, choix des systèmes, intégration technique, exécution et suivi.",
    services:[
      {n:"01",title:"Climatisation",text:"Gainable, split, cassette, multi-split et VRV/DRV. Dimensionnement, implantation et installation adaptés aux volumes et aux usages.",tags:["GAINABLE","SPLIT","CASSETTE","VRV / DRV"]},
      {n:"02",title:"Ventilation & VMC",text:"Renouvellement d’air, extraction, soufflage et reprise. Réseaux pensés pour le débit, le confort acoustique et l’intégration architecturale.",tags:["VMC","EXTRACTION","SOUFFLAGE","REPRISE"]},
      {n:"03",title:"Plomberie",text:"Distribution EF/ECS, évacuation, équipements sanitaires et réseaux techniques avec une exécution claire, accessible et durable.",tags:["EF / ECS","ÉVACUATION","SANITAIRE","RÉSEAUX"]},
      {n:"04",title:"Maintenance & SAV",text:"Entretien préventif, diagnostic, dépannage et remise en service afin de préserver la fiabilité et la durée de vie des installations.",tags:["DIAGNOSTIC","ENTRETIEN","SAV","MISE EN SERVICE"]}
    ],
    systems:"SYSTÈMES & SOLUTIONS",
    systemList:["Gainable inverter","Split mural","Cassette","VRV / DRV","VMC simple & double flux","Extraction","Plomberie sanitaire"],
    methodLabel:"NOTRE MÉTHODE",
    methodTitle:"Un projet maîtrisé du premier relevé à la mise en service.",
    methodIntro:"La qualité d’une installation ne se résume pas à l’équipement. Elle dépend du dimensionnement, de l’implantation, des réseaux, de l’exécution et des contrôles.",
    steps:[
      ["01","Relevé & compréhension","Surfaces, volumes, usages, contraintes techniques et attentes architecturales."],
      ["02","Étude & dimensionnement","Puissances, débits, tracés, implantation des unités et cohérence des réseaux."],
      ["03","Coordination","Échanges avec le client, l’architecte et les autres corps d’état lorsque le projet l’exige."],
      ["04","Installation","Pose méthodique, finitions soignées, accessibilité pour la maintenance et respect du chantier."],
      ["05","Mise en service & suivi","Contrôles, réglages, conseils d’utilisation et accompagnement après installation."]
    ],
    projectsLabel:"TYPOLOGIES DE PROJETS",
    projectsTitle:"Des solutions pensées pour chaque bâtiment.",
    projectCards:[
      ["Villas & résidences","Confort discret, intégration au faux plafond, zoning et maîtrise acoustique."],
      ["Bureaux & commerces","Confort des occupants, continuité de service et maintenance accessible."],
      ["Projets professionnels","Solutions techniques adaptées aux contraintes d’exploitation et aux exigences du site."]
    ],
    detailLabel:"NOTRE EXIGENCE",
    detailTitle:"Le détail technique fait la différence.",
    detailText:"Nous cherchons une installation lisible, précise et maintenable : réseaux organisés, reprises correctement dimensionnées, soufflages cohérents, évacuations maîtrisées et équipements accessibles.",
    detailItems:["Implantation étudiée","Réseaux propres et accessibles","Soufflage & reprise cohérents","Finitions soignées","Maintenance anticipée","Communication claire"],
    contactLabel:"CONTACT",
    contactTitle:"Parlons de votre projet.",
    contactIntro:"Décrivez votre besoin. Nous préparons votre message et ouvrons WhatsApp afin que vous puissiez l’envoyer directement à AEROVENTIS.",
    name:"Votre nom",
    city:"Ville du projet",
    need:"Votre besoin",
    choose:"Sélectionner une expertise",
    message:"Décrivez brièvement votre projet",
    send:"Préparer ma demande WhatsApp",
    notice:"Le bouton prépare votre message dans WhatsApp. Vous choisissez ensuite de l’envoyer.",
    footer:"Climatisation · Ventilation · Plomberie · Maintenance",
    legal:"Mentions légales",
    privacy:"Confidentialité"
  },
  en: {
    nav:["Expertise","Method","Projects","Contact"],
    cta:"Discuss my project",
    label:"BUILDING SERVICES ENGINEERING",
    title:"Comfort is designed.",
    accent:"Precision installs it.",
    intro:"AEROVENTIS designs, installs and maintains air conditioning, ventilation and plumbing solutions shaped around architecture, usage and building performance.",
    discover:"Explore our method",
    image:"AEROVENTIS technicians at work",
    imageNote:"Illustrative image — not a client project.",
    proof:["Design & sizing","Installation & commissioning","Maintenance & support"],
    expertiseTitle:"Complete expertise, without compromise.",
    expertiseIntro:"Each project is treated as one coherent system: needs assessment, system selection, technical integration, execution and follow-up.",
    services:[
      {n:"01",title:"Air conditioning",text:"Ducted, split, cassette, multi-split and VRF systems. Sizing, positioning and installation adapted to volumes and usage.",tags:["DUCTED","SPLIT","CASSETTE","VRF"]},
      {n:"02",title:"Ventilation & VMC",text:"Fresh air, extraction, supply and return. Networks designed around airflow, acoustics and architectural integration.",tags:["VMC","EXTRACTION","SUPPLY","RETURN"]},
      {n:"03",title:"Plumbing",text:"Cold/hot water distribution, drainage, sanitary equipment and technical networks with clear, durable execution.",tags:["CW / HW","DRAINAGE","SANITARY","NETWORKS"]},
      {n:"04",title:"Maintenance & support",text:"Preventive servicing, diagnostics, repairs and recommissioning to protect reliability and system life.",tags:["DIAGNOSTICS","SERVICING","SUPPORT","COMMISSIONING"]}
    ],
    systems:"SYSTEMS & SOLUTIONS",
    systemList:["Inverter ducted","Wall split","Cassette","VRF","VMC systems","Extraction","Sanitary plumbing"],
    methodLabel:"OUR METHOD",
    methodTitle:"A controlled project from first survey to commissioning.",
    methodIntro:"Installation quality is not only about equipment. It depends on sizing, positioning, networks, execution and control.",
    steps:[
      ["01","Survey & understanding","Areas, volumes, usage, technical constraints and architectural expectations."],
      ["02","Design & sizing","Capacities, airflow, routing, unit positions and network consistency."],
      ["03","Coordination","Coordination with client, architect and other trades where required."],
      ["04","Installation","Methodical installation, neat finishes, service access and respect for the site."],
      ["05","Commissioning & follow-up","Checks, settings, operating guidance and after-installation support."]
    ],
    projectsLabel:"PROJECT TYPOLOGIES",
    projectsTitle:"Solutions designed for each building.",
    projectCards:[
      ["Villas & residences","Discreet comfort, ceiling integration, zoning and acoustic control."],
      ["Offices & retail","Occupant comfort, service continuity and accessible maintenance."],
      ["Professional projects","Technical solutions adapted to operational constraints and site requirements."]
    ],
    detailLabel:"OUR STANDARD",
    detailTitle:"Technical detail makes the difference.",
    detailText:"We aim for installations that are clear, precise and maintainable: organised networks, correctly sized returns, coherent supply air, controlled drainage and accessible equipment.",
    detailItems:["Studied positioning","Clean accessible networks","Balanced supply & return","Neat finishes","Maintenance anticipated","Clear communication"],
    contactLabel:"CONTACT",
    contactTitle:"Let’s discuss your project.",
    contactIntro:"Describe your requirements. We prepare your message and open WhatsApp so you can send it directly to AEROVENTIS.",
    name:"Your name",
    city:"Project city",
    need:"Your requirements",
    choose:"Select an expertise",
    message:"Briefly describe your project",
    send:"Prepare my WhatsApp request",
    notice:"The button prepares your message in WhatsApp. You then choose whether to send it.",
    footer:"Air conditioning · Ventilation · Plumbing · Maintenance",
    legal:"Legal notice",
    privacy:"Privacy"
  },
  ar: {
    nav:["خبراتنا","منهجنا","المشاريع","تواصل معنا"],
    cta:"عرض مشروعي",
    label:"الهندسة التقنية للمباني",
    title:"الراحة تبدأ بالتصميم.",
    accent:"والدقة تُنجزها.",
    intro:"تقوم AEROVENTIS بدراسة وتركيب وصيانة حلول التكييف والتهوية والسباكة بما ينسجم مع الهندسة المعمارية واستعمال المبنى ومتطلباته التقنية.",
    discover:"اكتشف منهجنا",
    image:"فنيو AEROVENTIS أثناء العمل",
    imageNote:"صورة توضيحية — لا تمثل مشروع عميل.",
    proof:["الدراسة والحساب","التركيب والتشغيل","الصيانة والدعم"],
    expertiseTitle:"خبرة متكاملة دون تنازل عن الجودة.",
    expertiseIntro:"نتعامل مع كل مشروع كنظام متكامل: فهم الاحتياجات، اختيار الحلول، الدمج التقني، التنفيذ والمتابعة.",
    services:[
      {n:"01",title:"التكييف",text:"أنظمة مخفية وسبليت وكاسيت ومتعددة الوحدات وVRV/DRV مع حساب القدرة والتموضع والتركيب حسب المساحات والاستعمال.",tags:["GAINABLE","SPLIT","CASSETTE","VRV / DRV"]},
      {n:"02",title:"التهوية وVMC",text:"تجديد الهواء والاستخراج والدفع والرجوع، مع تصميم الشبكات حسب التدفق والراحة الصوتية والاندماج المعماري.",tags:["VMC","EXTRACTION","SOUFFLAGE","REPRISE"]},
      {n:"03",title:"السباكة",text:"شبكات المياه الباردة والساخنة والصرف والتجهيزات الصحية، بتنفيذ واضح ومتين وسهل الصيانة.",tags:["EF / ECS","ÉVACUATION","SANITAIRE","RÉSEAUX"]},
      {n:"04",title:"الصيانة والدعم",text:"صيانة وقائية وتشخيص وإصلاح وإعادة التشغيل للحفاظ على موثوقية المعدات وعمرها.",tags:["DIAGNOSTIC","ENTRETIEN","SAV","MISE EN SERVICE"]}
    ],
    systems:"الأنظمة والحلول",
    systemList:["Gainable inverter","Split mural","Cassette","VRV / DRV","VMC","Extraction","Plomberie sanitaire"],
    methodLabel:"منهجنا",
    methodTitle:"مشروع مضبوط من أول معاينة إلى التشغيل.",
    methodIntro:"جودة التركيب لا تعتمد على الجهاز فقط، بل على الحساب والتموضع والشبكات والتنفيذ والمراقبة.",
    steps:[
      ["01","المعاينة والفهم","المساحات والحجوم والاستعمال والقيود التقنية ومتطلبات التصميم."],
      ["02","الدراسة والحساب","القدرات والتدفقات والمسارات وتموضع الوحدات وتناسق الشبكات."],
      ["03","التنسيق","تنسيق مع العميل والمهندس المعماري وباقي المتدخلين عند الحاجة."],
      ["04","التركيب","تنفيذ منظم وتشطيبات دقيقة مع ضمان سهولة الوصول للصيانة."],
      ["05","التشغيل والمتابعة","مراقبة وضبط وتوجيه للاستعمال ومواكبة بعد التركيب."]
    ],
    projectsLabel:"أنواع المشاريع",
    projectsTitle:"حلول مدروسة لكل مبنى.",
    projectCards:[
      ["الفيلات والإقامات","راحة هادئة واندماج في السقف المستعار وتقسيم المناطق والتحكم الصوتي."],
      ["المكاتب والمحلات","راحة المستخدمين واستمرارية الخدمة وسهولة الصيانة."],
      ["المشاريع المهنية","حلول تقنية حسب متطلبات الاستغلال وخصوصيات الموقع."]
    ],
    detailLabel:"معيارنا",
    detailTitle:"التفاصيل التقنية تصنع الفارق.",
    detailText:"نهدف إلى تركيب واضح ودقيق وسهل الصيانة: شبكات مرتبة، رجوع هواء محسوب، دفع متناسق، صرف مضبوط ومعدات يسهل الوصول إليها.",
    detailItems:["تموضع مدروس","شبكات منظمة وسهلة الوصول","دفع ورجوع متناسقان","تشطيبات دقيقة","صيانة محسوبة مسبقاً","تواصل واضح"],
    contactLabel:"تواصل معنا",
    contactTitle:"لنتحدث عن مشروعك.",
    contactIntro:"صف احتياجك. نجهز رسالتك ونفتح واتساب لتتمكن من إرسالها مباشرة إلى AEROVENTIS.",
    name:"اسمك",
    city:"مدينة المشروع",
    need:"احتياجك",
    choose:"اختر التخصص",
    message:"صف مشروعك باختصار",
    send:"تجهيز طلبي عبر واتساب",
    notice:"الزر يجهز رسالتك في واتساب، ثم تختار إرسالها.",
    footer:"التكييف · التهوية · السباكة · الصيانة",
    legal:"إشعارات قانونية",
    privacy:"الخصوصية"
  }
};

export function LandingPage({contactQrDataUrl}:{contactQrDataUrl:string}) {
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] || copy.fr;
  const [open,setOpen] = useState(false);

  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const text =
      "AEROVENTIS — " + t.cta + "\n" +
      t.name + ": " + f.get("name") + "\n" +
      t.city + ": " + f.get("city") + "\n" +
      t.need + ": " + f.get("service") + "\n" +
      String(f.get("message") || "");
    window.location.assign(WHATSAPP_URL + "?text=" + encodeURIComponent(text));
  }

  return <div className={s.site}>
    <header className={s.header}>
      <Link href="/" aria-label="AEROVENTIS" className={s.brand}>
        <span className={s.logoCrop}><Image src="/aeroventis-logo.png" width={220} height={220} alt="" priority/></span>
        <span className={s.brandText}><strong>AEROVENTIS</strong><small>ENGINEERING & COMFORT</small></span>
      </Link>

      <nav id="site-navigation" className={[s.nav, open ? s.open : ""].join(" ")} aria-label="Navigation principale">
        {t.nav.map((item,i)=><a key={item} href={["#expertises","#method","#projects","#contact"][i]} onClick={()=>setOpen(false)}>{item}</a>)}
      </nav>

      <div className={s.headerActions}>
        <div className={s.lang}>{(["fr","ar","en"] as const).map(l=><Link key={l} href="/" locale={l} aria-current={locale===l?"page":undefined}>{l.toUpperCase()}</Link>)}</div>
        <a className={s.headCta} href="#contact">{t.cta}<ArrowUpRight size={16}/></a>
        <button className={s.menu} type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="site-navigation" aria-label="Menu">{open?<X/>:<Menu/>}</button>
      </div>
    </header>

    <main>
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <p className={s.kicker}><span/> {t.label}</p>
          <h1>{t.title}<em>{t.accent}</em></h1>
          <p className={s.heroIntro}>{t.intro}</p>
          <div className={s.heroActions}>
            <a className={s.primary} href="#contact">{t.cta}<ArrowUpRight size={19}/></a>
            <a className={s.secondary} href="#method">{t.discover}<ArrowRight size={17}/></a>
          </div>
          <div className={s.heroFoot}><span>CASABLANCA · MAROC</span><span>AEROVENTIS / 2026</span></div>
        </div>

        <div className={s.heroVisual}>
          <Image src="/redesign/engineering-team-v4.webp" fill priority sizes="(max-width: 800px) 100vw, 52vw" alt={t.image}/>
          <div className={s.heroOverlay}>
            <span>AEROVENTIS</span>
            <strong>ENGINEERING<br/>WITH PRECISION.</strong>
          </div>
          <p className={s.imageNote}>{t.imageNote}</p>
        </div>
      </section>

      <section className={s.proofStrip}>
        {t.proof.map((item,i)=><div key={item}><span>0{i+1}</span><strong>{item}</strong></div>)}
      </section>

      <section className={s.expertise} id="expertises">
        <div className={s.sectionIntro}>
          <p className={s.kicker}>01 — {t.nav[0]}</p>
          <h2>{t.expertiseTitle}</h2>
          <p>{t.expertiseIntro}</p>
        </div>

        <div className={s.serviceGrid}>
          {t.services.map((service)=><article className={s.serviceCard} key={service.n}>
            <div className={s.serviceTop}><span>{service.n}</span><ArrowUpRight size={20}/></div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <div className={s.tags}>{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
          </article>)}
        </div>
      </section>

      <section className={s.systemBand}>
        <div className={s.systemTitle}>{t.systems}</div>
        <div className={s.systemList}>{t.systemList.map((item)=><span key={item}>{item}</span>)}</div>
      </section>

      <section className={s.method} id="method">
        <div className={s.methodLead}>
          <p className={s.kicker}>02 — {t.methodLabel}</p>
          <h2>{t.methodTitle}</h2>
          <p>{t.methodIntro}</p>
        </div>
        <div className={s.steps}>
          {t.steps.map(step=><div className={s.step} key={step[0]}>
            <span>{step[0]}</span>
            <div><h3>{step[1]}</h3><p>{step[2]}</p></div>
          </div>)}
        </div>
      </section>

      <section className={s.projects} id="projects">
        <div className={s.projectImage}>
          <Image src="/redesign/architecture-editorial.webp" fill sizes="(max-width: 800px) 100vw, 46vw" alt="Architecture contemporaine"/>
        </div>
        <div className={s.projectCopy}>
          <p className={s.kicker}>03 — {t.projectsLabel}</p>
          <h2>{t.projectsTitle}</h2>
          <div className={s.projectCards}>
            {t.projectCards.map((card,i)=><div key={card[0]}><span>0{i+1}</span><h3>{card[0]}</h3><p>{card[1]}</p></div>)}
          </div>
        </div>
      </section>

      <section className={s.detail}>
        <div>
          <p className={s.kicker}>04 — {t.detailLabel}</p>
          <h2>{t.detailTitle}</h2>
          <p>{t.detailText}</p>
        </div>
        <div className={s.detailList}>
          {t.detailItems.map((item,i)=><div key={item}><span>0{i+1}</span><strong>{item}</strong><ArrowUpRight size={17}/></div>)}
        </div>
      </section>

      <section className={s.contact} id="contact">
        <div className={s.contactLead}>
          <p className={s.kicker}>05 — {t.contactLabel}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactIntro}</p>
          <a className={s.phone} href={"tel:"+PHONE_E164}>{PHONE_DISPLAY}<ArrowUpRight size={20}/></a>
          <div className={s.whatsapp}><a href={WHATSAPP_URL}><MessageCircle size={19}/>WhatsApp<ArrowUpRight size={15}/></a><Image src={contactQrDataUrl} width={72} height={72} alt="WhatsApp QR"/></div>
        </div>

        <form className={s.form} onSubmit={submit}>
          <div className={s.formRow}>
            <label>{t.name}<input name="name" required maxLength={100} autoComplete="name"/></label>
            <label>{t.city}<input name="city" required maxLength={100} autoComplete="address-level2"/></label>
          </div>
          <label>{t.need}<select name="service" required defaultValue=""><option value="" disabled>{t.choose}</option>{t.services.map(x=><option key={x.title}>{x.title}</option>)}</select></label>
          <label>{t.message}<textarea name="message" rows={5} required maxLength={2000}/></label>
          <button type="submit">{t.send}<ArrowUpRight size={19}/></button>
          <p className={s.notice}>{t.notice}</p>
        </form>
      </section>
    </main>

    <footer className={s.footer}>
      <div><strong>AEROVENTIS</strong><p>{t.footer}</p></div>
      <div className={s.footerLinks}><Link href="/mentions-legales">{t.legal}</Link><Link href="/politique-confidentialite">{t.privacy}</Link></div>
      <div className={s.footerBottom}><span>© {new Date().getFullYear()} AEROVENTIS</span><span>CASABLANCA · MAROC</span></div>
    </footer>
  </div>;
}
