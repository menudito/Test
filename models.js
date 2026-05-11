/**
 * SmartBroker – Models Layer
 * Centraliza todos los datos de la aplicación.
 * Para actualizar contenido, edita únicamente este archivo.
 */

const AppModel = {

  /* ───────── BRAND ───────── */
  brand: {
    name: "SmartBroker",
    tagline: "Tu mejor aliado",
    description: "Corredora de seguros",
    logo: {
      text: "Smart<span class='logo-accent'>Broker</span>",
      image: "assets/logo-transparent.png",      // Logo sin fondo
    },
    colors: {
      primary:   "#2D2D2D",   // Gris carbón (texto "smart" del logo)
      accent:    "#E8571A",   // Naranja SmartBroker (ícono + "broker")
      accentAlt: "#C44510",   // Naranja oscuro (hover / profundidad)
      accentLight:"#FFF0E8",  // Naranja muy claro (fondos tenues)
      light:     "#F7F7F7",   // Gris claro neutro
      white:     "#FFFFFF",
      text:      "#2D2D2D",   // Mismo que primary para consistencia
      muted:     "#7A7A7A",   // Gris medio para textos secundarios
    },
  },

  /* ───────── NAV ───────── */
  nav: [
    { label: "Inicio",    href: "#inicio" },
    {
      label: "Servicios", href: "#servicios",
      dropdown: [
        { label: "Seguro de Vida",     href: "#vida",        icon: `<svg viewBox="0 0 20 20" fill="none"><path d="M10 17s-7-4.35-7-9a5 5 0 0110 0 5 5 0 0110 0c0 4.65-7 9-7 9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 10h2l1.5-2.5 2 5 1.5-2.5H16" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { label: "Seguro de Salud",    href: "#salud",       icon: `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 7v6M7 10h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` },
        { label: "Seguro Vehicular",   href: "#vehicular",   icon: `<svg viewBox="0 0 20 20" fill="none"><path d="M3 12l2-5h10l2 5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="2" y="12" width="16" height="4" rx="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="16" r="1.5" stroke="currentColor" stroke-width="1.3"/><circle cx="14" cy="16" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>` },
        { label: "Seguro Empresarial", href: "#empresarial", icon: `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="7" width="14" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M7 7V5a2 2 0 014 0v2" stroke="currentColor" stroke-width="1.5"/><path d="M3 11h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>` },
      ]
    },
    { label: "Nosotros",  href: "#nosotros" },
    { label: "Contacto",  href: "#contacto" },
  ],

  /* ───────── HERO ───────── */
  hero: {
    eyebrow: "Corredora de Seguros Certificada",
    headline: "Protege lo que más importa,<br>con quien más confías.",
    subtext:
      "Más de 9 años asesorando a familias y empresas con soluciones de seguros inteligentes, transparentes y a tu medida.",
    cta:    { label: "Solicitar asesoría gratuita", href: "#contacto" },
    ctaAlt: { label: "Ver nuestros servicios",      href: "#servicios" },
    stats: [
      { value: "9+",    label: "Años de experiencia" },
      { value: "5.000+", label: "Clientes protegidos" },
      { value: "98%",    label: "Satisfacción" },
    ],
  },

  /* ───────── SPIDER MENU DATA ───────── */
  spiderMenu: [
    {
      id: "personas",
      label: "Personas",
      icon: "👤",
      angle: -90,
      childStep: 14,
      children: [
        { label: "Vehículos",              icon: "🚗", serviceId: "personas-vehiculos" },
        { label: "Hogar",                  icon: "🏠", serviceId: "personas-hogar" },
        { label: "Vida y\nAs. Médica",     icon: "❤️", serviceId: "personas-vida-medica" },
        { label: "Seguro\nde Viaje",       icon: "✈️", serviceId: "personas-viaje" },
        { label: "Vida y\nAhorro",         icon: "💰", serviceId: "personas-vida-ahorro" },
      ],
    },
    {
      id: "empresas",
      label: "Empresas",
      icon: "🏢",
      angle: 30,
      childStep: 10,
      children: [
        { label: "Multi-\nrriesgo",        icon: "🔐", serviceId: "empresas-multirriesgo" },
        { label: "Programas\nSeguros",     icon: "📋", serviceId: "empresas-programas" },
        { label: "Transporte",             icon: "🚢", serviceId: "empresas-transporte" },
        { label: "Resp.\nCivil",           icon: "⚖️", serviceId: "empresas-rc" },
        { label: "Accidentes\nPersonales", icon: "⛑️", serviceId: "empresas-accidentes" },
        { label: "Casco\nAéreo/Mar.",      icon: "⚓", serviceId: "empresas-casco" },
        { label: "Asistencia\nMédica",     icon: "🏥", serviceId: "empresas-medica" },
      ],
    },
    {
      id: "fianzas",
      label: "Fianzas",
      icon: "📜",
      angle: 150,
      childStep: 10,
      children: [
        { label: "BUA",   icon: "📄", serviceId: "fianzas-bua"   },
        { label: "CC",    icon: "📄", serviceId: "fianzas-cc"    },
        { label: "EOBCM", icon: "📄", serviceId: "fianzas-eobcm" },
        { label: "SO",    icon: "📄", serviceId: "fianzas-so"    },
        { label: "PGB",   icon: "📄", serviceId: "fianzas-pgb"   },
        { label: "FL",    icon: "📄", serviceId: "fianzas-fl"    },
        { label: "GA",    icon: "📄", serviceId: "fianzas-ga"    },
        { label: "GJ",    icon: "📄", serviceId: "fianzas-gj"    },
        { label: "GAR",   icon: "📄", serviceId: "fianzas-gar"   },
        { label: "GA",    icon: "📄", serviceId: "fianzas-ga"    },
      ],
    },
  ],

  /* ───────── WHATSAPP ───────── */
  whatsapp: "593998661249",   /* número sin + ni espacios */

  /* ───────── SERVICE DETAILS (22 servicios del menú) ───────── */
  serviceDetails: {
    /* ── PERSONAS ── */
    "personas-vehiculos": {
      branch: "Personas",
      title: "Seguro de Vehículos",
      desc: "Protege tu auto, moto o camioneta ante accidentes, robo, daños a terceros y eventos de la naturaleza. Contamos con planes desde cobertura básica de responsabilidad civil hasta todo riesgo con asistencia 24/7 en carretera, vehículo de reemplazo y defensa legal.",
      features: ["Pérdida total y pérdida parcial", "Responsabilidad civil obligatoria y ampliada", "Asistencia en carretera 24/7", "Vehículo de reemplazo", "Daños por fenómenos naturales", "Defensa legal y penal"],
    },
    "personas-hogar": {
      branch: "Personas",
      title: "Seguro de Hogar",
      desc: "Tu vivienda y todo lo que hay dentro protegidos frente a incendio, robo, inundaciones y daños eléctricos. Cubrimos tanto el inmueble como el contenido, con asistencia del hogar para plomería, electricidad y cerrajería sin costo adicional.",
      features: ["Incendio y explosión", "Robo y hurto de contenidos", "Daños por agua e inundación", "Daños eléctricos y cortocircuito", "Responsabilidad civil familiar", "Asistencia hogar 24/7"],
    },
    "personas-vida-medica": {
      branch: "Personas",
      title: "Vida y Asistencia Médica",
      desc: "Un plan que combina la tranquilidad del seguro de vida con acceso a atención médica de calidad. En caso de fallecimiento o invalidez, garantizas el bienestar de tu familia; con la cobertura médica, tienes acceso a consultas, hospitalización y medicamentos.",
      features: ["Cobertura por fallecimiento", "Invalidez total y parcial", "Enfermedades graves (cáncer, ACV, infarto)", "Hospitalización y cirugías", "Consultas médicas ambulatorias", "Medicamentos recetados"],
    },
    "personas-viaje": {
      branch: "Personas",
      title: "Seguro de Viaje",
      desc: "Viaja tranquilo a cualquier destino del mundo. Cubrimos emergencias médicas en el exterior, cancelaciones de vuelo, pérdida de equipaje y repatriación sanitaria. Disponible para viajes individuales, familiares y anuales para viajeros frecuentes.",
      features: ["Emergencias médicas en el exterior", "Evacuación y repatriación sanitaria", "Cancelación y demora de vuelos", "Pérdida y daño de equipaje", "Responsabilidad civil en viaje", "Asistencia legal en el extranjero"],
    },
    "personas-vida-ahorro": {
      branch: "Personas",
      title: "Vida y Ahorro",
      desc: "Un producto que te protege y al mismo tiempo hace crecer tu patrimonio. Combinas un seguro de vida con un componente de ahorro o inversión que genera rendimientos, garantizándote una suma asegurada al final del plazo o en caso de fallecimiento anticipado.",
      features: ["Seguro de vida base incluido", "Componente de ahorro con rendimiento garantizado", "Flexibilidad de aportaciones", "Préstamo sobre valor de rescate", "Beneficios fiscales aplicables", "Capital garantizado al vencimiento"],
    },

    /* ── EMPRESAS ── */
    "empresas-multirriesgo": {
      branch: "Empresas",
      title: "Seguro Multirriesgo Empresarial",
      desc: "Cobertura todo en uno para tu negocio: instalaciones, equipos, mercancías, responsabilidad civil y pérdida de beneficios en una sola póliza. Ideal para comercios, oficinas, bodegas e industrias que buscan protección integral con un único interlocutor.",
      features: ["Incendio, explosión y riesgos aliados", "Robo con fuerza en las cosas", "Daños por agua e inundación", "Pérdida de beneficios / lucro cesante", "Responsabilidad civil de explotación", "Equipo electrónico y maquinaria"],
    },
    "empresas-programas": {
      branch: "Empresas",
      title: "Programas de Seguros",
      desc: "Diseñamos programas de seguros corporativos a la medida de tu empresa: análisis de riesgos, estructuración de coberturas, negociación con aseguradoras y administración centralizada. Perfectos para grupos empresariales, holdings y empresas con múltiples sedes.",
      features: ["Auditoría y mapa de riesgos", "Estructura de coberturas personalizadas", "Negociación directa con aseguradoras", "Administración centralizada de pólizas", "Reportes de siniestralidad", "Renovaciones y ajustes anuales"],
    },
    "empresas-transporte": {
      branch: "Empresas",
      title: "Seguro de Transporte",
      desc: "Protege tus mercancías en tránsito por tierra, mar o aire, tanto en el mercado local como en operaciones de comercio exterior. Cubrimos carga general, productos perecederos, valores y equipos frágiles desde el punto de origen hasta el destino final.",
      features: ["Carga terrestre nacional e internacional", "Transporte marítimo y aéreo", "Todo riesgo o cobertura básica", "Refrigerados y productos perecederos", "Mercancías peligrosas (con restricciones)", "Seguro de responsabilidad del transportista"],
    },
    "empresas-rc": {
      branch: "Empresas",
      title: "Responsabilidad Civil",
      desc: "Protege a tu empresa ante reclamaciones de terceros por daños corporales o materiales causados en el ejercicio de tu actividad. Incluye RC de explotación, RC patronal, RC de productos y RC profesional, según el tipo de negocio y sector.",
      features: ["RC de explotación general", "RC patronal (accidentes a empleados)", "RC de productos y trabajos", "RC profesional (errores y omisiones)", "Defensa jurídica incluida", "Cobertura de daños punitivos (opcional)"],
    },
    "empresas-accidentes": {
      branch: "Empresas",
      title: "Accidentes Personales",
      desc: "Garantiza una indemnización a tus empleados o socios ante accidentes que provoquen fallecimiento, invalidez permanente o incapacidad temporal. Complementa al IESS y puede configurarse como beneficio corporativo o como plan colectivo obligatorio.",
      features: ["Muerte accidental", "Invalidez permanente total y parcial", "Incapacidad temporal (subsidio diario)", "Gastos médicos por accidente", "Cobertura 24/7, dentro y fuera del trabajo", "Extensión a deportes y actividades de riesgo"],
    },
    "empresas-casco": {
      branch: "Empresas",
      title: "Casco Aéreo / Marítimo",
      desc: "Cobertura especializada para aeronaves, embarcaciones, yates y buques. Protegemos el casco (estructura), maquinaria, equipo de a bordo y responsabilidad civil frente a terceros, con alcance mundial y condiciones de mercado de Lloyd's of London y compañías especializadas.",
      features: ["Daños al casco y maquinaria", "Todo riesgo o condiciones de mercado", "Responsabilidad civil hacia terceros", "Cobertura de combustible y lubricantes", "Remoción de restos", "P&I (Protección e Indemnización) embarcaciones"],
    },
    "empresas-medica": {
      branch: "Empresas",
      title: "Asistencia Médica Empresarial",
      desc: "Plan colectivo de salud para tus empleados: hospitalización, cirugías, consultas ambulatorias, odontología y medicamentos. Mejora el bienestar de tu equipo, reduce el ausentismo y es un poderoso incentivo de retención de talento.",
      features: ["Hospitalización y cirugías mayores", "Consultas ambulatorias ilimitadas", "Maternidad y neonatal", "Odontología preventiva y restauradora", "Medicamentos con receta", "Red médica nacional y atención de emergencias"],
    },

    /* ── FIANZAS ── */
    "fianzas-bua": {
      branch: "Fianzas",
      title: "Fianza BUA — Buen Uso del Anticipo",
      desc: "Garantiza al beneficiario que los anticipos entregados al contratista serán empleados exclusivamente en la ejecución del contrato. Es exigida en contratos públicos y privados cuando se otorgan pagos anticipados, y se libera conforme avanza la obra.",
      features: ["Garantía del monto anticipado", "Amortización proporcional al avance", "Aplicable a contratos públicos (SERCOP)", "Liberación automática o parcial", "Endosable al beneficiario", "Plazos flexibles según contrato"],
    },
    "fianzas-cc": {
      branch: "Fianzas",
      title: "Fianza CC — Cumplimiento de Contrato",
      desc: "Asegura al contratante que el contratista cumplirá todas las obligaciones pactadas en el contrato (plazo, calidad y especificaciones técnicas). Es la fianza más solicitada en contratación pública y es obligatoria en contratos con el Estado ecuatoriano.",
      features: ["Cobertura del 5% al 10% del valor contractual", "Obligatoria en contratación pública", "Aplicable a obras, bienes y servicios", "Ejecución inmediata ante incumplimiento", "Renovable por prórroga del contrato", "Liberación al acta de recepción definitiva"],
    },
    "fianzas-eobcm": {
      branch: "Fianzas",
      title: "Fianza EOBCM — Estabilidad de Obra, Buen Funcionamiento y Calidad de los Materiales",
      desc: "Cubre el período post-entrega de la obra, garantizando su estabilidad estructural, el buen funcionamiento de instalaciones y la calidad de los materiales empleados. Es la garantía de postventa en construcción y obras de ingeniería.",
      features: ["Período de garantía post-recepción", "Estabilidad estructural de la obra", "Buen funcionamiento de equipos e instalaciones", "Calidad de materiales utilizados", "Obligatoria en contratos SERCOP", "Vigencia de 5 años en obras públicas"],
    },
    "fianzas-so": {
      branch: "Fianzas",
      title: "Fianza SO — Seriedad de la Oferta",
      desc: "Garantiza que el oferente mantendrá su oferta durante el proceso de licitación y, en caso de ser adjudicado, firmará el contrato en los términos presentados. Protege al contratante de postores que retiren su oferta o no suscriban el contrato.",
      features: ["Aplicable a licitaciones públicas y privadas", "Cobertura del 1% al 3% de la oferta", "Vigencia hasta la firma del contrato", "Ejecución si el oferente se retira", "Liberación automática a no adjudicados", "Proceso ágil para procesos de compra"],
    },
    "fianzas-pgb": {
      branch: "Fianzas",
      title: "Fianza PGB — Pago a la Garantía de Bienes",
      desc: "Garantiza el pago de los bienes adquiridos bajo modalidades de crédito, consignación o entrega a plazos. Protege al proveedor ante el incumplimiento de pago del comprador y facilita operaciones comerciales sin transferencia inmediata de dinero.",
      features: ["Garantía de pago al proveedor", "Aplicable a compras a crédito y consignación", "Cubre el valor total o parcial del bien", "Plazo coincidente con el crédito comercial", "Endosable y transferible", "Liberación al comprobante de pago"],
    },
    "fianzas-fl": {
      branch: "Fianzas",
      title: "Fianza FL — Fiel Labor",
      desc: "Protege al empleador ante actos deshonestos, fraudes o malversaciones cometidos por empleados en el ejercicio de sus funciones. Cubre pérdidas económicas directas causadas por conducta deshonesta de trabajadores de confianza.",
      features: ["Cobertura de malversación y fraude", "Protege activos, dinero y valores", "Aplicable a empleados de confianza", "Descubrimiento hasta 2 años post-siniestro", "Cobertura individual o colectiva", "Investigación forense incluida (con algunas aseguradoras)"],
    },
    "fianzas-ga": {
      branch: "Fianzas",
      title: "Fianza GA — Garantía Aduanera",
      desc: "Garantiza el pago de tributos, aranceles y obligaciones aduaneras ante el Servicio Nacional de Aduana del Ecuador (SENAE). Es exigida para importadores, agentes de aduana y operadores de comercio exterior como requisito para operar.",
      features: ["Garantía ante el SENAE", "Cobertura de tributos y aranceles", "Depósitos aduaneros y almaceneras", "Tránsito aduanero internacional", "Régimen de admisión temporal", "Renovación anual conforme a operaciones"],
    },
    "fianzas-gj": {
      branch: "Fianzas",
      title: "Fianza GJ — Garantía Judicial",
      desc: "Reemplaza el depósito en efectivo o la retención de bienes exigidos en procesos judiciales o administrativos. Permite que el afianzado mantenga la liquidez de sus recursos mientras se resuelve el litigio, presentando la fianza como garantía ante el juzgado.",
      features: ["Sustitución de depósito judicial en efectivo", "Aplicable en procesos civiles, laborales y contencioso-administrativos", "Liberación de medidas cautelares", "Agilidad frente al embargo de bienes", "Renovable mientras dure el proceso", "Aceptada en todas las instancias judiciales del Ecuador"],
    },
    "fianzas-gar": {
      branch: "Fianzas",
      title: "Fianza GAR — Garantía de Arrendamiento",
      desc: "Sustituye el depósito en efectivo exigido en contratos de arrendamiento comercial o residencial. Protege al arrendador ante incumplimiento de pago de cánones o daños al inmueble, mientras el arrendatario conserva su liquidez.",
      features: ["Reemplaza depósito en efectivo", "Cobertura de cánones impagos", "Daños al inmueble arrendado", "Costos legales de desahucio", "Aplicable a locales comerciales y vivienda", "Plazos coincidentes con el contrato de arriendo"],
    },
  },

  /* ───────── SERVICES ───────── */
  services: [
    {
      id: "vida",
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 42s-17-10.5-17-22a12 12 0 0124 0 12 12 0 0124 0C41 31.5 24 42 24 42z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M17 24h6l3-5 4 10 3-5h5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      title: "Seguro de Vida",
      desc:  "Garantiza el bienestar de tu familia ante cualquier eventualidad. Planes flexibles que se adaptan a tu ciclo de vida.",
      features: ["Cobertura por fallecimiento", "Invalidez total y parcial", "Enfermedades graves"],
    },
    {
      id: "salud",
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="6" stroke="currentColor" stroke-width="2.5"/>
        <path d="M24 16v16M16 24h16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
      title: "Seguro de Salud",
      desc:  "Acceso a la mejor atención médica sin preocuparte por los costos. Cobertura nacional e internacional.",
      features: ["Hospitalización y cirugías", "Medicamentos recetados", "Red médica premium"],
    },
    {
      id: "vehicular",
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 28l4-12h28l4 12" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="4" y="28" width="40" height="10" rx="3" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="14" cy="38" r="4" stroke="currentColor" stroke-width="2.5"/>
        <circle cx="34" cy="38" r="4" stroke="currentColor" stroke-width="2.5"/>
        <path d="M18 38h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      title: "Seguro Vehicular",
      desc:  "Tu vehículo protegido ante accidentes, robos y daños a terceros. Asistencia en carretera 24/7.",
      features: ["Pérdida total y parcial", "Responsabilidad civil", "Asistencia en ruta"],
    },
    {
      id: "empresarial",
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="32" height="26" rx="3" stroke="currentColor" stroke-width="2.5"/>
        <path d="M16 16V12a2 2 0 012-2h12a2 2 0 012 2v4" stroke="currentColor" stroke-width="2.5"/>
        <path d="M8 27h32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M20 27v4M28 27v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      title: "Seguro Empresarial",
      desc:  "Soluciones integrales para proteger tu negocio, activos, empleados y responsabilidad frente a terceros.",
      features: ["Todo riesgo empresarial", "Responsabilidad civil", "Cobertura para empleados"],
    },
    {
      id: "pymes",
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="36" height="24" rx="3" stroke="currentColor" stroke-width="2.5"/>
        <path d="M14 18V14a2 2 0 012-2h16a2 2 0 012 2v4" stroke="currentColor" stroke-width="2.5"/>
        <rect x="18" y="28" width="12" height="14" rx="1.5" stroke="currentColor" stroke-width="2"/>
        <path d="M6 30h36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      title: "Seguros PYMES",
      desc:  "Paquetes diseñados para pequeñas y medianas empresas que necesitan protección completa sin costos exorbitantes.",
      features: ["Multirriesgo empresarial", "RC patronal", "Equipos y maquinaria"],
    },
    {
      id: "individuales",
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="16" r="9" stroke="currentColor" stroke-width="2.5"/>
        <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M30 36l3 3 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      title: "Planes Individuales",
      desc:  "Protección personalizada para ti y tu familia: vida, salud y accidentes con coberturas flexibles a tu medida.",
      features: ["Accidentes personales", "Vida individual", "Enfermedad grave"],
    },
  ],

  /* ───────── ABOUT ───────── */
  about: {
    eyebrow: "Sobre SmartBroker",
    headline: "Más que un seguro,<br>una promesa de respaldo.",
    body: [
      "Somos una corredora de seguros independiente con más de 15 años en el mercado, comprometida con ofrecer asesoría honesta, soluciones personalizadas y acompañamiento real en los momentos que más importan.",
      "No trabajamos para las aseguradoras; trabajamos para ti. Nuestro modelo independiente nos permite acceder a las mejores pólizas del mercado y negociar en nombre de nuestros clientes.",
    ],
    values: [
      {
        icon: `<svg viewBox="0 0 32 32" fill="none"><path d="M16 3l3.5 7 7.5 1-5.5 5.5 1.3 7.5L16 20.5l-6.8 3.5 1.3-7.5L5 11l7.5-1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
        title: "Confianza",
        desc: "Transparencia total en cada cotización y póliza.",
      },
      {
        icon: `<svg viewBox="0 0 32 32" fill="none"><path d="M16 4l10 5v9c0 5.5-4.5 10-10 12C6 28 2 23.5 2 18V9l14-5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
        title: "Respaldo",
        desc: "Aliados con las aseguradoras más sólidas del país.",
      },
      {
        icon: `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="1.8"/><path d="M16 10v7l4 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
        title: "Experiencia",
        desc: "9+ años asesorando con criterio y conocimiento.",
      },
      {
        icon: `<svg viewBox="0 0 32 32" fill="none"><path d="M4 20l7-7 5 5 7-9 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        title: "Resultados",
        desc: "Más de 8.000 clientes protegidos y satisfechos.",
      },
    ],
  },

  /* ───────── TESTIMONIALS ───────── */
  testimonials: [
    {
      name: "Catalina Restrepo",
      role: "Empresaria · Santo Domingo",
      avatar: "CR",
      text: "SmartBroker cambió mi perspectiva sobre los seguros. Su asesoría fue clara, sin letra pequeña, y encontraron un plan que realmente se ajustaba a mi presupuesto.",
      rating: 5,
    },
    {
      name: "Andrés Molina",
      role: "Gerente de Transporte · Cuenca",
      avatar: "AM",
      text: "Llevamos 3 años trabajando con ellos para asegurar toda nuestra flota vehicular. Excelente servicio, respuesta rápida en siniestros y tarifas muy competitivas.",
      rating: 5,
    },
    {
      name: "Lucía Herrera",
      role: "Médica · Guayaquil",
      avatar: "LH",
      text: "El seguro de salud que consiguieron para mi familia superó todas nuestras expectativas. Acceso rápido, cobertura completa y un acompañamiento muy profesional.",
      rating: 5,
    },
    {
      name: "Jorge Quintero",
      role: "Constructor · Quito",
      avatar: "JQ",
      text: "Encontraron una póliza empresarial que protegía exactamente lo que necesitaba. El proceso fue sencillo y el equipo siempre estuvo disponible.",
      rating: 5,
    },
  ],

  /* ───────── CONTACT ───────── */
  contact: {
    headline: "¿Listo para proteger lo que más importa?",
    subtext:  "Completa el formulario y un asesor te contactará en menos de 24 horas. Sin compromisos, sin presión.",
    info: [
      { icon: "📍", label: "Dirección", value: "Av. Granda Centeno Oe5-50 y Vasco De Contreras Edificio Ikonus. PB. Oficina 3. Quito, Ecuador" },
      { icon: "📞", label: "Teléfono",  value: "099 866 1249" },
      { icon: "✉️", label: "Email",     value: "yordonez@smartbroker.com.ec" },
      { icon: "🕐", label: "Horario",   value: "Lun–Vie: 8am–6pm" },
    ],
    social: [
      { name: "LinkedIn",  href: "#", icon: "in", cls: "social-btn--linkedin"  },
      { name: "Instagram", href: "#", icon: "ig", cls: "social-btn--instagram" },
      { name: "Facebook",  href: "#", icon: "fb", cls: "social-btn--facebook"  },
      { name: "WhatsApp",  href: "#", icon: "wa", cls: "social-btn--whatsapp"  },
    ],
  },

  /* ───────── SITEMAP ───────── */
  sitemap: {
    primary: [
      { label: "Inicio",    href: "#inicio",    desc: "Página principal" },
      { label: "Servicios", href: "#servicios", desc: "Portafolio de seguros" },
      { label: "Nosotros",  href: "#nosotros",  desc: "Quiénes somos" },
      { label: "Contacto",  href: "#contacto",  desc: "Formulario y datos" },
    ],
    services: [
      { label: "Seguro de Vida",        href: "#vida" },
      { label: "Seguro de Salud",       href: "#salud" },
      { label: "Seguro Vehicular",      href: "#vehicular" },
      { label: "Seguro Empresarial",    href: "#empresarial" },
    ],
    legal: [
      { label: "Política de privacidad", href: "#" },
      { label: "Términos y condiciones", href: "#" },
      { label: "Tratamiento de datos",   href: "#" },
    ],
  },

};

export default AppModel;
