import { useEffect, useRef, useState } from 'react'
import './App.css'

type Locale = 'en' | 'zh' | 'nl' | 'de'

type NavLink = {
  label: string
  href: string
}

type QuickLink = NavLink & {
  badge: string
}

type FeatureCard = {
  title: string
  subtitle: string
  href: string
  image: string
}

type ArchivePanel = {
  id: string
  eyebrow: string
  title: string
  description: string
}

type ChannelPanel = {
  id: string
  title: string
  handle: string
  description: string
}

type LegalPanel = {
  id?: string
  eyebrow: string
  description: string
}

type GalleryItem = {
  title?: string
  description?: string
  image: string
  layout?: 'standard' | 'featured' | 'portrait'
}

type Copy = {
  langLabel: string
  brandSubtitle: string
  primaryNav: NavLink[]
  footerLinks: NavLink[]
  quickLinks: QuickLink[]
  featureCards: FeatureCard[]
  archivePanels: ArchivePanel[]
  channelPanels: ChannelPanel[]
  galleryLabel: string
  galleryTitle: string
  galleryIntro: string
  galleryItems: GalleryItem[]
  legalPanels: LegalPanel[]
  heroEyebrow: string
  heroCaption: string
  heroQuote: string
  featuredAria: string
  archiveAria: string
  channelsAria: string
  legalAria: string
  footerAria: string
  footerQuickLinksAria: string
  footerCopyright: string
  openSearchLabel: string
  openNavigationLabel: string
  instrumentQuickLinksAria: string
  homeAria: string
  closeOverlayLabel: string
  closeMenuLabel: string
  menuLabel: string
  mobileNavigationAria: string
  closeSearchLabel: string
  searchLabel: string
  searchPlaceholder: string
  searchHint: string
}

const languageOptions: { code: Locale; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
  { code: 'de', label: 'DE' },
]

const sharedQuickLinks = {
  zh: [],
  en: [],
  nl: [],
  de: [],
} satisfies Record<Locale, QuickLink[]>

const performanceGalleryItems: GalleryItem[] = [
  { image: '/演出照片/团体5.jpg', layout: 'featured' },
  { image: '/演出照片/萨克斯1.jpg', layout: 'featured' },
  { image: '/演出照片/琵琶2.jpg' },
  { image: '/演出照片/琵琶古筝.jpg' },
  { image: '/演出照片/古筝6.jpg' },
  { image: '/演出照片/萨克斯2.jpg', layout: 'featured' },
  { image: '/演出照片/团体合照.jpg', layout: 'featured' },
  { image: '/演出照片/团体合照3.jpg', layout: 'featured' },
  { image: '/演出照片/古筝2.jpg', layout: 'portrait' },
  { image: '/演出照片/舞蹈6.jpg' },
  { image: '/演出照片/观众照片.jpg' },
  { image: '/演出照片/古筝琵琶3.jpg' },
  { image: '/演出照片/萨克斯5.jpg' },
  { image: '/演出照片/唱歌.jpg' },
  { image: '/演出照片/唱歌2.jpg' },
  { image: '/演出照片/唱歌3.jpg' },
  { image: '/演出照片/古筝.jpg' },
  { image: '/演出照片/古筝武术.jpg' },
  { image: '/演出照片/古筝琵琶8.jpg' },
  { image: '/演出照片/琵琶.jpg' },
  { image: '/演出照片/90b906d332dbab87330e411995939db4.jpg' },
  { image: '/演出照片/跳舞.jpg' },
  { image: '/演出照片/团体.jpg' },
  { image: '/演出照片/团体2.jpg' },
  { image: '/演出照片/团体3.jpg', layout: 'portrait' },
  { image: '/演出照片/团体4.jpg' },
  { image: '/演出照片/团体合照4.jpg' },
  { image: '/演出照片/武术8.jpg' },
  { image: '/演出照片/舞蹈.jpg' },
  { image: '/演出照片/舞蹈4.jpg' },
  { image: '/演出照片/彩排.jpg' },
  { image: '/演出照片/古筝琵琶7.jpg' },
]

const copy: Record<Locale, Copy> = {
  zh: {
    langLabel: '语言',
    brandSubtitle: '风华艺术团',
    primaryNav: [
      { label: '首页', href: '#home' },
      { label: '关于我们', href: '#about' },
      { label: '现场演出', href: '#programs' },
      { label: '教学工作坊', href: '#repertoire' },
      { label: '私人活动', href: '#workshops' },
      { label: '图片展示', href: '#gallery' },
      { label: '预约联系', href: '#contact' },
    ],
    footerLinks: [
      { label: '现场演出', href: '#programs' },
      { label: '图片展示', href: '#gallery' },
      { label: '预约联系', href: '#contact' },
    ],
    quickLinks: sharedQuickLinks.zh,
    featureCards: [
      { title: '关于风华', subtitle: '扎根荷兰十余年的艺术团', href: '#about', image: '/assets/card-guzheng.svg' },
      { title: '现场演出', subtitle: '适用于文化节、社区活动与舞台演出', href: '#programs', image: '/assets/card-pipa.svg' },
      { title: '教学工作坊', subtitle: '古筝与琵琶体验及文化互动', href: '#repertoire', image: '/assets/card-erhu.svg' },
      { title: '私人活动', subtitle: '企业活动、私人庆典与定制演出', href: '#workshops', image: '/assets/card-dialogue.svg' },
    ],
    archivePanels: [
      {
        id: 'about',
        eyebrow: '风华艺术团介绍',
        title: '风华艺术团',
        description:
          '风华艺术团扎根荷兰十余年，长期致力于中华传统音乐与艺术的传播。我们希望通过演出、文化活动与教学，为社区文化生活增添更多色彩，促进跨文化交流，也让更多人感受传统艺术的温度与魅力。',
      },
      {
        id: 'programs',
        eyebrow: '服务内容',
        title: '现场演出',
        description:
          '我们提供现场演出，适用于文化节、社区活动、节庆庆典、艺术展演与舞台节目。演出形式可根据空间与观众调整，从细腻安静到热烈开阔，保持自然的文化气质。',
      },
      {
        id: 'repertoire',
        eyebrow: '教育推广',
        title: '教学工作坊',
        description:
          '我们目前提供古筝和琵琶的入门与体验式工作坊，适合学校、社区及文化活动中的艺术互动、音乐欣赏与简单上手体验，是艺术推广与文化分享的一部分。',
      },
      {
        id: 'workshops',
        eyebrow: '定制活动',
        title: '私人活动',
        description:
          '我们也承接私人及定制活动，包括企业活动、私人庆典、接待场合与特别文化项目，提供更贴合空间、节奏与观众氛围的演出安排。',
      },
      {
        id: 'gallery',
        eyebrow: '音乐气质',
        title: '现场风格',
        description:
          '无论活动需要安静沉思的音乐氛围，还是更热闹、欢快、适合交流的现场感，我们都乐于根据观众、空间与活动气质来设计演出。',
      },
      {
        id: 'program-pipa',
        eyebrow: '文化活动',
        title: '文化活动',
        description:
          '我们可以为各类文化活动提供现场音乐，包括文化交流、艺术分享会、咖啡馆与酒吧活动、社区项目以及不同规模的现场演出。',
      },
      {
        id: 'program-erhu',
        eyebrow: '教学形式',
        title: '教学与体验',
        description:
          '我们的教学项目适合学校、社区项目与艺术机构，融合示范、讲解与互动体验，用轻松友好的方式带领观众认识亚洲民族乐器。',
      },
      {
        id: 'program-dialogue',
        eyebrow: '舞台形式',
        title: '节日庆祝',
        description:
          '面对节庆活动、公共庆典与更大的舞台，我们也可以呈现更具动感和感染力的节目，把弦乐、吹管、节奏与舞台张力结合起来，形成热情而鲜明的现场体验。',
      },
    ],
    channelPanels: [
      {
        id: 'contact',
        title: '预约联系',
        handle: 'asian.art.performance@gmail.com',
        description: '欢迎荷兰各地的节庆活动、文化机构、餐饮空间、学校与社区合作伙伴联系我们。',
      },
      {
        id: 'phone',
        title: '电话',
        handle: '0613530981',
        description: '如需演出、教学、文化交流活动或定制节目方案，欢迎随时联系。',
      },
    ],
    galleryLabel: '图片展示',
    galleryTitle: '演出与活动照片',
    galleryIntro: '',
    galleryItems: performanceGalleryItems,
    legalPanels: [
      {
        id: 'terms',
        eyebrow: '合作对象',
        description:
          '我们乐于与节庆主办方、文化机构、咖啡馆、酒吧、餐饮空间、学校、博物馆、画廊和社区项目合作，带来有特色且富有亲和力的现场音乐体验。',
      },
      { eyebrow: '预约联系', description: 'Email: asian.art.performance@gmail.com\nPhone: 0613530981' },
      {
        id: 'privacy',
        eyebrow: '活动适配',
        description:
          '无论你正在策划温馨的文化夜、热闹的公共活动、跨文化项目，还是教育工作坊，我们都愿意为你的观众与场地量身安排合适的演出。',
      },
    ],
    heroEyebrow: '立足荷兰的亚洲民族器乐现场演出',
    heroCaption:
      '风华艺术团在荷兰提供富有感染力的现场演出、文化项目与器乐工作坊，音乐气质可以从安静细腻的氛围感，自然过渡到热烈、欢庆、充满能量的舞台表达。',
    heroQuote: '传统器乐，当代表达，温暖而难忘的现场氛围。',
    featuredAria: '特色内容',
    archiveAria: '艺术团信息',
    channelsAria: '联系信息',
    legalAria: '站点信息',
    footerAria: '页脚',
    footerQuickLinksAria: '页脚快捷链接',
    footerCopyright: '(C) 2026 Fenghua Arts Ensemble. All Rights Reserved.',
    openSearchLabel: '打开搜索',
    openNavigationLabel: '打开导航',
    instrumentQuickLinksAria: '快捷链接',
    homeAria: '风华首页',
    closeOverlayLabel: '关闭遮罩层',
    closeMenuLabel: '关闭菜单',
    menuLabel: '菜单',
    mobileNavigationAria: '移动端导航',
    closeSearchLabel: '关闭搜索',
    searchLabel: '搜索艺术团内容',
    searchPlaceholder: '搜索演出、器乐、工作坊...',
    searchHint: '按回车关闭，或按 ESC 退出',
  },
  en: {
    langLabel: 'Language',
    brandSubtitle: 'Fenghua Arts Ensemble',
    primaryNav: [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Live Performance', href: '#programs' },
      { label: 'Teaching Workshops', href: '#repertoire' },
      { label: 'Private Events', href: '#workshops' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Booking', href: '#contact' },
    ],
    footerLinks: [
      { label: 'Live Performance', href: '#programs' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Booking', href: '#contact' },
    ],
    quickLinks: sharedQuickLinks.en,
    featureCards: [
      { title: 'About Fenghua', subtitle: 'rooted in the Netherlands for over ten years', href: '#about', image: '/assets/card-guzheng.svg' },
      { title: 'Live Performance', subtitle: 'for festivals, community events, and stage programmes', href: '#programs', image: '/assets/card-pipa.svg' },
      { title: 'Teaching Workshops', subtitle: 'guzheng and pipa learning experiences', href: '#repertoire', image: '/assets/card-erhu.svg' },
      { title: 'Private Events', subtitle: 'tailored performances for gatherings and celebrations', href: '#workshops', image: '/assets/card-dialogue.svg' },
    ],
    archivePanels: [
      {
        id: 'about',
        eyebrow: 'About Us',
        title: 'Fenghua',
        description:
          'Fenghua Arts Ensemble has been rooted in the Netherlands for the past decade, sharing the beauty of Chinese traditional music and arts with local audiences. Through performances, cultural activities, and teaching, we hope to enrich community cultural life, encourage exchange, and help more people experience the warmth of traditional arts.',
      },
      {
        id: 'programs',
        eyebrow: 'Services',
        title: 'Live Performance',
        description:
          'We offer live performances for festivals, community events, stage programmes, cultural presentations, and festive celebrations. Each set is shaped to suit the space and audience, from intimate and reflective to lively and open.',
      },
      {
        id: 'repertoire',
        eyebrow: 'Education',
        title: 'Teaching Workshops',
        description:
          'We currently offer introductory and educational workshops in guzheng and pipa, suitable for schools, community groups, cultural learning, music appreciation, and hands-on artistic experience.',
      },
      {
        id: 'workshops',
        eyebrow: 'Tailored Events',
        title: 'Private Events',
        description:
          'We also create tailored performances for private events, including company gatherings, private celebrations, receptions, and special cultural occasions, with programmes shaped around the setting and audience.',
      },
      {
        id: 'gallery',
        eyebrow: 'Live Atmosphere',
        title: 'Atmosphere',
        description:
          'Whether the setting is quiet and reflective or lively and celebratory, we love creating a musical atmosphere that suits the audience, the space, and the spirit of the event.',
      },
      {
        id: 'program-pipa',
        eyebrow: 'Cultural Events',
        title: 'Cultural Events',
        description:
          'We provide live music for a wide range of cultural events, including cultural exchange programmes, arts gatherings, cafe and bar events, community activities, and performances of different scales.',
      },
      {
        id: 'program-erhu',
        eyebrow: 'Educational Format',
        title: 'Workshops & Teaching',
        description:
          'Our teaching sessions are suitable for schools, community programmes, and arts organisations, combining demonstration, explanation, and hands-on musical discovery in a friendly and engaging format.',
      },
      {
        id: 'program-dialogue',
        eyebrow: 'Stage Format',
        title: 'Festival Celebrations',
        description:
          'For seasonal events, public celebrations, and larger stages, we can present more vibrant and dynamic sets that bring together rhythm, movement, and a welcoming festive atmosphere.',
      },
    ],
    channelPanels: [
      {
        id: 'contact',
        title: 'Booking',
        handle: 'asian.art.performance@gmail.com',
        description: 'We would be delighted to hear from festivals, cultural organisations, hospitality venues, schools, and community partners across the Netherlands.',
      },
      {
        id: 'phone',
        title: 'Phone',
        handle: '0613530981',
        description: 'Please get in touch for performances, workshops, cultural exchange programmes, or a tailored live music concept for your event.',
      },
    ],
    galleryLabel: 'Image Gallery',
    galleryTitle: 'Performance & Event Gallery',
    galleryIntro: '',
    galleryItems: performanceGalleryItems,
    legalPanels: [
      {
        id: 'terms',
        eyebrow: 'Who We Work With',
        description:
          'We love collaborating with festivals, cultural organisations, cafes, bars, hospitality venues, schools, museums, galleries, and community partners looking for a distinctive and welcoming live music experience.',
      },
      { eyebrow: 'Booking', description: 'Email: asian.art.performance@gmail.com\nPhone: 0613530981' },
      {
        id: 'privacy',
        eyebrow: 'Event Fit',
        description:
          'Whether you are planning an intimate cultural evening, a lively public event, a cross-cultural programme, or an educational workshop, we are happy to shape a performance that fits your audience and space.',
      },
    ],
    heroEyebrow: 'Netherlands-based live Asian instrumental performance',
    heroCaption:
      'Fenghua offers expressive live performances, cultural programmes, and instrumental workshops across the Netherlands, with music that moves naturally from quiet and atmospheric to vibrant, festive, and full of energy.',
    heroQuote: 'Traditional instruments, contemporary warmth, and memorable live atmosphere.',
    featuredAria: 'Featured destinations',
    archiveAria: 'Ensemble information',
    channelsAria: 'Contact panels',
    legalAria: 'Site information',
    footerAria: 'Footer',
    footerQuickLinksAria: 'Footer quick links',
    footerCopyright: '(C) 2026 Fenghua Arts Ensemble. All Rights Reserved.',
    openSearchLabel: 'Open search',
    openNavigationLabel: 'Open navigation',
    instrumentQuickLinksAria: 'Quick links',
    homeAria: 'Fenghua home',
    closeOverlayLabel: 'Close overlay',
    closeMenuLabel: 'Close menu',
    menuLabel: 'Menu',
    mobileNavigationAria: 'Mobile navigation',
    closeSearchLabel: 'Close search',
    searchLabel: 'Search the ensemble',
    searchPlaceholder: 'Search performances, instruments, workshops...',
    searchHint: 'Press enter to close or ESC to exit',
  },
  nl: {
    langLabel: 'Taal',
    brandSubtitle: 'Fenghua Arts Ensemble',
    primaryNav: [
      { label: 'Home', href: '#home' },
      { label: 'Over ons', href: '#about' },
      { label: 'Live Performance', href: '#programs' },
      { label: 'Workshops', href: '#repertoire' },
      { label: 'Privé-evenementen', href: '#workshops' },
      { label: 'Galerij', href: '#gallery' },
      { label: 'Boeking', href: '#contact' },
    ],
    footerLinks: [
      { label: 'Live Performance', href: '#programs' },
      { label: 'Galerij', href: '#gallery' },
      { label: 'Boeking', href: '#contact' },
    ],
    quickLinks: sharedQuickLinks.nl,
    featureCards: [
      { title: 'Over Fenghua', subtitle: 'al meer dan tien jaar geworteld in Nederland', href: '#about', image: '/assets/card-guzheng.svg' },
      { title: 'Live Performance', subtitle: 'voor festivals, community events en podiumprogramma’s', href: '#programs', image: '/assets/card-pipa.svg' },
      { title: 'Workshops', subtitle: 'guzheng- en pipa-ervaringen', href: '#repertoire', image: '/assets/card-erhu.svg' },
      { title: 'Privé-evenementen', subtitle: 'optredens op maat voor bijeenkomsten en vieringen', href: '#workshops', image: '/assets/card-dialogue.svg' },
    ],
    archivePanels: [
      {
        id: 'about',
        eyebrow: 'Over ons',
        title: 'Fenghua',
        description:
          'Fenghua Arts Ensemble is al meer dan tien jaar geworteld in Nederland en deelt de schoonheid van Chinese traditionele muziek en kunst met een breed publiek. Met optredens, culturele activiteiten en onderwijs willen wij het culturele leven in de gemeenschap verrijken, uitwisseling stimuleren en meer mensen de warmte van traditionele kunsten laten ervaren.',
      },
      {
        id: 'programs',
        eyebrow: 'Diensten',
        title: 'Live Performance',
        description:
          'Wij verzorgen live optredens voor festivals, community events, podiumprogramma’s, culturele presentaties en feestelijke vieringen. Elke set wordt afgestemd op locatie en publiek, van intiem en verstild tot levendig en open.',
      },
      {
        id: 'repertoire',
        eyebrow: 'Educatie',
        title: 'Workshops',
        description:
          'Wij bieden momenteel inleidende en educatieve workshops in guzheng en pipa, geschikt voor scholen, communitygroepen, culturele leeractiviteiten, muziekwaardering en praktische artistieke ervaring.',
      },
      {
        id: 'workshops',
        eyebrow: 'Op maat',
        title: 'Privé-evenementen',
        description:
          'Wij verzorgen ook optredens op maat voor privé-evenementen, waaronder bedrijfsbijeenkomsten, particuliere vieringen, ontvangsten en bijzondere culturele gelegenheden, steeds afgestemd op de sfeer en het publiek.',
      },
      {
        id: 'gallery',
        eyebrow: 'Live sfeer',
        title: 'Sfeer',
        description:
          'Of de setting nu rustig en reflectief is of juist levendig en feestelijk, wij creëren graag een muzikale sfeer die past bij het publiek, de locatie en de geest van het evenement.',
      },
      {
        id: 'program-pipa',
        eyebrow: 'Culturele activiteiten',
        title: 'Culturele activiteiten',
        description:
          'Wij verzorgen live muziek voor uiteenlopende culturele activiteiten, waaronder culturele uitwisselingsprogramma’s, kunstbijeenkomsten, café- en barevenementen, communityprojecten en optredens op verschillende schaalniveaus.',
      },
      {
        id: 'program-erhu',
        eyebrow: 'Educatief format',
        title: 'Workshops & les',
        description:
          'Onze lessessies zijn geschikt voor scholen, communityprojecten en kunstorganisaties, met een combinatie van demonstratie, uitleg en praktische muzikale ontdekking in een vriendelijke en toegankelijke vorm.',
      },
      {
        id: 'program-dialogue',
        eyebrow: 'Podiumformat',
        title: 'Feestelijke vieringen',
        description:
          'Voor seizoensvieringen, publieke festiviteiten en grotere podia kunnen wij levendigere sets brengen met ritme, beweging en een warme, feestelijke uitstraling.',
      },
    ],
    channelPanels: [
      {
        id: 'contact',
        title: 'Boeking',
        handle: 'asian.art.performance@gmail.com',
        description: 'Wij horen graag van festivals, culturele organisaties, hospitalitylocaties, scholen en communitypartners in heel Nederland.',
      },
      {
        id: 'phone',
        title: 'Telefoon',
        handle: '0613530981',
        description: 'Neem gerust contact op voor optredens, workshops, culturele uitwisseling of een live muziekconcept op maat voor jouw evenement.',
      },
    ],
    galleryLabel: 'Beeldgalerij',
    galleryTitle: 'Galerij van optredens en events',
    galleryIntro: '',
    galleryItems: performanceGalleryItems,
    legalPanels: [
      {
        id: 'terms',
        eyebrow: 'Met wie wij werken',
        description:
          'Wij werken graag samen met festivals, culturele organisaties, cafés, bars, hospitalitylocaties, scholen, musea, galeries en communitypartners die op zoek zijn naar een onderscheidende en gastvrije live muziekervaring.',
      },
      { eyebrow: 'Boeking', description: 'Email: asian.art.performance@gmail.com\nPhone: 0613530981' },
      {
        id: 'privacy',
        eyebrow: 'Passend voor jouw event',
        description:
          'Of je nu een intieme culturele avond, een levendig publiek evenement, een crosscultureel programma of een educatieve workshop organiseert, wij denken graag mee over een optreden dat past bij jouw publiek en locatie.',
      },
    ],
    heroEyebrow: 'In Nederland gevestigd live Aziatisch instrumentaal ensemble',
    heroCaption:
      'Fenghua verzorgt expressieve live optredens, culturele programma’s en instrumentale workshops in heel Nederland, met muziek die zich natuurlijk beweegt van rustig en sfeervol naar levendig, feestelijk en vol energie.',
    heroQuote: 'Traditionele instrumenten, hedendaagse warmte en een live sfeer die blijft hangen.',
    featuredAria: 'Uitgelichte onderdelen',
    archiveAria: 'Ensemble-informatie',
    channelsAria: 'Contactgegevens',
    legalAria: 'Site-informatie',
    footerAria: 'Footer',
    footerQuickLinksAria: 'Snelle links in footer',
    footerCopyright: '(C) 2026 Fenghua Arts Ensemble. All Rights Reserved.',
    openSearchLabel: 'Zoeken openen',
    openNavigationLabel: 'Navigatie openen',
    instrumentQuickLinksAria: 'Snelle links',
    homeAria: 'Fenghua home',
    closeOverlayLabel: 'Overlay sluiten',
    closeMenuLabel: 'Menu sluiten',
    menuLabel: 'Menu',
    mobileNavigationAria: 'Mobiele navigatie',
    closeSearchLabel: 'Zoeken sluiten',
    searchLabel: 'Zoek in het ensemble',
    searchPlaceholder: 'Zoek optredens, instrumenten, workshops...',
    searchHint: 'Druk op enter om te sluiten of ESC om af te sluiten',
  },
  de: {
    langLabel: 'Sprache',
    brandSubtitle: 'Fenghua Arts Ensemble',
    primaryNav: [
      { label: 'Start', href: '#home' },
      { label: 'Über uns', href: '#about' },
      { label: 'Live-Auftritte', href: '#programs' },
      { label: 'Workshops', href: '#repertoire' },
      { label: 'Private Veranstaltungen', href: '#workshops' },
      { label: 'Galerie', href: '#gallery' },
      { label: 'Buchung', href: '#contact' },
    ],
    footerLinks: [
      { label: 'Live-Auftritte', href: '#programs' },
      { label: 'Galerie', href: '#gallery' },
      { label: 'Buchung', href: '#contact' },
    ],
    quickLinks: sharedQuickLinks.de,
    featureCards: [
      { title: 'Über Fenghua', subtitle: 'seit über zehn Jahren in den Niederlanden verwurzelt', href: '#about', image: '/assets/card-guzheng.svg' },
      { title: 'Live-Auftritte', subtitle: 'für Festivals, Community-Events und Bühnenprogramme', href: '#programs', image: '/assets/card-pipa.svg' },
      { title: 'Workshops', subtitle: 'Guzheng- und Pipa-Erlebnisse', href: '#repertoire', image: '/assets/card-erhu.svg' },
      { title: 'Private Veranstaltungen', subtitle: 'maßgeschneiderte Auftritte für Feiern und Begegnungen', href: '#workshops', image: '/assets/card-dialogue.svg' },
    ],
    archivePanels: [
      {
        id: 'about',
        eyebrow: 'Über uns',
        title: 'Fenghua',
        description:
          'Fenghua Arts Ensemble ist seit über zehn Jahren in den Niederlanden verwurzelt und vermittelt die Schönheit chinesischer traditioneller Musik und Kunst an ein vielfältiges Publikum. Mit Aufführungen, kulturellen Aktivitäten und Unterricht möchten wir das kulturelle Leben in der Gemeinschaft bereichern, Austausch fördern und mehr Menschen die Wärme traditioneller Künste näherbringen.',
      },
      {
        id: 'programs',
        eyebrow: 'Angebot',
        title: 'Live-Auftritte',
        description:
          'Wir gestalten Live-Auftritte für Festivals, Community-Events, Bühnenprogramme, kulturelle Präsentationen und festliche Anlässe. Jedes Set wird auf Raum und Publikum abgestimmt, von intim und ruhig bis lebendig und offen.',
      },
      {
        id: 'repertoire',
        eyebrow: 'Bildung',
        title: 'Workshops',
        description:
          'Derzeit bieten wir einführende und edukative Workshops für Guzheng und Pipa an, geeignet für Schulen, Community-Gruppen, kulturelles Lernen, Musikvermittlung und praktische künstlerische Erfahrung.',
      },
      {
        id: 'workshops',
        eyebrow: 'Individuelle Formate',
        title: 'Private Veranstaltungen',
        description:
          'Wir gestalten auch Aufführungen für private und maßgeschneiderte Veranstaltungen, darunter Firmenanlässe, private Feiern, Empfänge und besondere kulturelle Formate, immer passend zur Atmosphäre und zum Publikum.',
      },
      {
        id: 'gallery',
        eyebrow: 'Live-Atmosphäre',
        title: 'Atmosphäre',
        description:
          'Ob ruhig und nachdenklich oder lebendig und festlich: Wir gestalten gern eine musikalische Atmosphäre, die zum Publikum, zum Raum und zur Stimmung der Veranstaltung passt.',
      },
      {
        id: 'program-pipa',
        eyebrow: 'Kulturveranstaltungen',
        title: 'Kulturveranstaltungen',
        description:
          'Wir gestalten Live-Musik für verschiedenste Kulturveranstaltungen, darunter interkulturelle Programme, künstlerische Begegnungen, Café- und Barveranstaltungen, Community-Projekte und Auftritte in unterschiedlichen Formaten.',
      },
      {
        id: 'program-erhu',
        eyebrow: 'Bildungsformat',
        title: 'Workshops & Unterricht',
        description:
          'Unsere Unterrichtsformate eignen sich für Schulen, Community-Programme und Kunstorganisationen und verbinden Demonstration, Erklärung und praktisches musikalisches Entdecken in einer offenen und freundlichen Atmosphäre.',
      },
      {
        id: 'program-dialogue',
        eyebrow: 'Bühnenformat',
        title: 'Festliche Feiern',
        description:
          'Für saisonale Feiern, öffentliche Feste und größere Bühnen präsentieren wir gern lebendigere Sets mit Rhythmus, Bewegung und einer warmen, festlichen Ausstrahlung.',
      },
    ],
    channelPanels: [
      {
        id: 'contact',
        title: 'Buchung',
        handle: 'asian.art.performance@gmail.com',
        description: 'Wir freuen uns über Anfragen von Festivals, Kulturorganisationen, Hospitality-Locations, Schulen und Community-Partnern in den Niederlanden.',
      },
      {
        id: 'phone',
        title: 'Telefon',
        handle: '0613530981',
        description: 'Kontaktieren Sie uns gern für Auftritte, Workshops, Kulturprogramme oder ein maßgeschneidertes Live-Musikkonzept für Ihre Veranstaltung.',
      },
    ],
    galleryLabel: 'Bildgalerie',
    galleryTitle: 'Galerie für Auftritte und Veranstaltungen',
    galleryIntro: '',
    galleryItems: performanceGalleryItems,
    legalPanels: [
      {
        id: 'terms',
        eyebrow: 'Mit wem wir arbeiten',
        description:
          'Wir arbeiten gern mit Festivals, Kulturorganisationen, Cafés, Bars, Hospitality-Locations, Schulen, Museen, Galerien und Community-Partnern zusammen, die nach einem besonderen und einladenden Live-Musikerlebnis suchen.',
      },
      { eyebrow: 'Buchung', description: 'Email: asian.art.performance@gmail.com\nPhone: 0613530981' },
      {
        id: 'privacy',
        eyebrow: 'Passend für Ihr Event',
        description:
          'Ob Sie einen intimen Kulturabend, ein lebendiges öffentliches Event, ein interkulturelles Programm oder einen Bildungsworkshop planen: Wir gestalten gern eine Performance, die zu Ihrem Publikum und Ihrem Raum passt.',
      },
    ],
    heroEyebrow: 'Live asiatisches Instrumentalensemble mit Sitz in den Niederlanden',
    heroCaption:
      'Fenghua bietet ausdrucksstarke Live-Auftritte, Kulturprogramme und Instrumentalworkshops in den Niederlanden, mit Musik, die sich natürlich von ruhig und atmosphärisch zu lebendig, festlich und energiegeladen bewegt.',
    heroQuote: 'Traditionelle Instrumente, zeitgenössische Wärme und eine Live-Atmosphäre, die in Erinnerung bleibt.',
    featuredAria: 'Ausgewählte Inhalte',
    archiveAria: 'Ensembleinformationen',
    channelsAria: 'Kontaktinformationen',
    legalAria: 'Seiteninformationen',
    footerAria: 'Footer',
    footerQuickLinksAria: 'Schnelllinks im Footer',
    footerCopyright: '(C) 2026 Fenghua Arts Ensemble. All Rights Reserved.',
    openSearchLabel: 'Suche öffnen',
    openNavigationLabel: 'Navigation öffnen',
    instrumentQuickLinksAria: 'Schnelllinks',
    homeAria: 'Fenghua Startseite',
    closeOverlayLabel: 'Overlay schließen',
    closeMenuLabel: 'Menü schließen',
    menuLabel: 'Menü',
    mobileNavigationAria: 'Mobile Navigation',
    closeSearchLabel: 'Suche schließen',
    searchLabel: 'Im Ensemble suchen',
    searchPlaceholder: 'Auftritte, Instrumente, Workshops suchen...',
    searchHint: 'Zum Schließen Enter drücken oder ESC verwenden',
  },
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.25 16.25L20 20" />
    </svg>
  )
}

function QuickBadge({
  label,
  href,
  badge,
  onClick,
}: QuickLink & { onClick?: () => void }) {
  return (
    <a
      className="social-badge"
      href={href}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {badge}
    </a>
  )
}

function LanguageSwitcher({
  locale,
  onChange,
  label,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
}) {
  return (
    <div className="language-switcher" aria-label={label}>
      {languageOptions.map((option) => (
        <button
          key={option.code}
          className={`language-switcher__button ${locale === option.code ? 'is-active' : ''}`}
          type="button"
          onClick={() => onChange(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('en')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const galleryGridRef = useRef<HTMLDivElement>(null)

  const t = copy[locale]

  const relayoutGallery = () => {
    const grid = galleryGridRef.current
    if (!grid) return

    const styles = window.getComputedStyle(grid)
    const rowHeight = Number.parseFloat(styles.getPropertyValue('grid-auto-rows'))
    const gap = Number.parseFloat(styles.getPropertyValue('gap'))

    if (!rowHeight || Number.isNaN(rowHeight)) return

    grid.querySelectorAll<HTMLElement>('.gallery-card').forEach((card) => {
      const image = card.querySelector<HTMLImageElement>('.gallery-card__image')
      if (!image) return

      const height = image.getBoundingClientRect().height
      const span = Math.max(1, Math.ceil((height + gap) / (rowHeight + gap)))
      card.style.gridRowEnd = `span ${span}`
    })
  }

  useEffect(() => {
    const shouldLock = menuOpen || searchOpen
    document.body.classList.toggle('overlay-open', shouldLock)

    return () => {
      document.body.classList.remove('overlay-open')
    }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    const onResize = () => relayoutGallery()

    window.addEventListener('resize', onResize)
    requestAnimationFrame(() => relayoutGallery())

    return () => window.removeEventListener('resize', onResize)
  }, [locale])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closePanels = () => {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__bar">
          {t.quickLinks.length > 0 ? (
            <div className="site-header__social" aria-label={t.instrumentQuickLinksAria}>
              {t.quickLinks.map((link) => (
                <QuickBadge key={link.label} {...link} onClick={closePanels} />
              ))}
            </div>
          ) : (
            <div />
          )}

          <a className="site-brand" href="#home" aria-label={t.homeAria}>
            <span className="site-brand__seal">FH</span>
            <span className="site-brand__text">
              <strong>FENGHUA</strong>
              <span>{t.brandSubtitle}</span>
            </span>
          </a>

          <div className="site-header__actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} label={t.langLabel} />

            <button
              className="header-button"
              type="button"
              aria-label={t.openSearchLabel}
              onClick={() => {
                setMenuOpen(false)
                setSearchOpen(true)
              }}
            >
              <SearchIcon />
            </button>

            <button
              className={`menu-button ${menuOpen ? 'is-open' : ''}`}
              type="button"
              aria-label={t.openNavigationLabel}
              aria-expanded={menuOpen}
              onClick={() => {
                setSearchOpen(false)
                setMenuOpen((open) => !open)
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav className="site-nav" aria-label="Primary">
          {t.primaryNav.map((link) => (
            <a key={link.label} className="site-nav__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero-panel" id="home">
          <div className="hero-panel__backdrop" />
          <div className="hero-panel__grain" />

          <div className="hero-panel__content">
            <div className="hero-panel__brand">
              <div className="hero-side-logo" aria-hidden="true">
                <img src="/assets/fenghua-logo-white.png" alt="" />
              </div>
              <p className="hero-panel__eyebrow">{t.heroEyebrow}</p>
              <div className="hero-wordmark" aria-hidden="true">
                <span>FENG</span>
                <span>HUA</span>
              </div>
              <p className="hero-panel__caption">{t.heroCaption}</p>
            </div>

            <blockquote className="hero-quote">{t.heroQuote}</blockquote>
          </div>
        </section>

        <section className="feature-grid" aria-label={t.featuredAria}>
          {t.featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <a className="feature-card__link" href={card.href} onClick={closePanels}>
                <div
                  className="feature-card__image"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="feature-card__overlay" />
                <div className="feature-card__content">
                  <h2>{card.title}</h2>
                  <p>{card.subtitle}</p>
                </div>
              </a>
            </article>
          ))}
        </section>

        <section className="archive-grid" aria-label={t.archiveAria}>
          {t.archivePanels.slice(0, 4).map((panel) => (
            <article key={panel.id} className="archive-panel" id={panel.id}>
              <p className="archive-panel__eyebrow">{panel.eyebrow}</p>
              <h2>{panel.title}</h2>
              <p>{panel.description}</p>
            </article>
          ))}
        </section>

        <section className="gallery-showcase" aria-label={t.galleryLabel} id="gallery">
          <div className="gallery-showcase__heading">
            <p className="gallery-showcase__eyebrow">{t.galleryLabel}</p>
            <h2>{t.galleryTitle}</h2>
          </div>

          <div ref={galleryGridRef} className="gallery-showcase__grid">
            {t.galleryItems.map((item) => (
              <article
                key={item.image}
                className={`gallery-card ${item.layout ? `gallery-card--${item.layout}` : ''}`}
              >
                <img
                  className="gallery-card__image"
                  src={item.image}
                  alt={item.title ?? 'Performance photo'}
                  onLoad={relayoutGallery}
                />
                {item.title || item.description ? (
                  <div className="gallery-card__content">
                    {item.title ? <p className="gallery-card__title">{item.title}</p> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="channels-grid" aria-label={t.channelsAria}>
          {t.channelPanels.map((panel) => (
            <article key={panel.id} className="channel-panel" id={panel.id}>
              <p className="channel-panel__title">{panel.title}</p>
              {panel.id === 'contact' ? (
                <strong>
                  <a href={`mailto:${panel.handle}`}>{panel.handle}</a>
                </strong>
              ) : panel.id === 'phone' ? (
                <strong>
                  <button
                    className="channel-panel__copy"
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(panel.handle)}
                  >
                    {panel.handle}
                  </button>
                </strong>
              ) : (
                <strong>{panel.handle}</strong>
              )}
              <p>{panel.description}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__meta">
          <nav className="site-footer__links" aria-label={t.footerAria}>
            {t.footerLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <p>{t.footerCopyright}</p>
        </div>

        {t.quickLinks.length > 0 ? (
          <div className="site-footer__social" aria-label={t.footerQuickLinksAria}>
            {t.quickLinks.slice(0, 5).map((link) => (
              <QuickBadge key={link.label} {...link} onClick={closePanels} />
            ))}
          </div>
        ) : null}
      </footer>

      <button
        className={`site-scrim ${menuOpen || searchOpen ? 'is-visible' : ''}`}
        type="button"
        aria-label={t.closeOverlayLabel}
        onClick={closePanels}
      />

      <aside className={`drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer__inner">
          <button
            className="drawer__close"
            type="button"
            aria-label={t.closeMenuLabel}
            onClick={() => setMenuOpen(false)}
          >
            <span />
            <span />
          </button>

          <p className="drawer__label">{t.menuLabel}</p>

          <LanguageSwitcher locale={locale} onChange={setLocale} label={t.langLabel} />

          <nav className="drawer__nav" aria-label={t.mobileNavigationAria}>
            {t.primaryNav.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          {t.quickLinks.length > 0 ? (
            <div className="drawer__social">
              {t.quickLinks.map((link) => (
                <QuickBadge key={link.label} {...link} onClick={() => setMenuOpen(false)} />
              ))}
            </div>
          ) : null}
        </div>
      </aside>

      <section className={`search-overlay ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
        <button
          className="search-overlay__close"
          type="button"
          aria-label={t.closeSearchLabel}
          onClick={() => setSearchOpen(false)}
        >
          {t.closeSearchLabel}
        </button>

        <form
          className="search-overlay__panel"
          onSubmit={(event) => {
            event.preventDefault()
            setSearchOpen(false)
          }}
        >
          <label className="search-overlay__label" htmlFor="site-search">
            {t.searchLabel}
          </label>
          <div className="search-overlay__field">
            <SearchIcon />
            <input
              id="site-search"
              ref={searchInputRef}
              type="search"
              placeholder={t.searchPlaceholder}
            />
          </div>
          <p className="search-overlay__hint">{t.searchHint}</p>
        </form>
      </section>
    </div>
  )
}

export default App
