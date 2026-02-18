import { 
  Utensils, 
  Brain, 
  Stethoscope, 
  Home, 
  ShieldCheck,
  Star,
  Users,
  BookOpen
} from 'lucide-react';
import { Testimonial, FAQItem, Feature, Problem, CurriculumItem } from './types';

export const PROBLEMS: Problem[] = [
  { id: 1, text: "Vaš pas hrče toliko glasno da ne možete da spavate?" },
  { id: 2, text: "Imate problem sa alergijama i osetljivom kožom?" },
  { id: 3, text: "Tvrdoglav je i teško ga je naučiti osnovnim komandama?" },
  { id: 4, text: "Brinete se zbog problema sa disanjem i toplotom?" },
];

export const GALLERY_IMAGES = [
  "https://iili.io/flqIyMu.jpg",
  "https://iili.io/flqIbt9.jpg",
  "https://iili.io/flqTJFj.jpg",
  "https://iili.io/flqItuS.jpg",
  "https://iili.io/flqTIcv.jpg",
  "https://iili.io/flqTdcx.jpg",
  "https://iili.io/flqTKAB.jpg",
  "https://iili.io/flqToPa.jpg",
  "https://iili.io/flqTRAN.jpg",
  "https://iili.io/flqTcVn.jpg",
  "https://iili.io/flqT1KG.jpg",
  "https://iili.io/flqTVHl.jpg"
];

export const FEATURES: Feature[] = [
  { 
    id: 1, 
    title: "Ishrana i Zdravlje", 
    description: "Lista zabranjenih namirnica za vašeg psa.", 
    icon: Utensils 
  },
  { 
    id: 2, 
    title: "Trening i Poslušnost", 
    description: "Tehnike za tvrdoglave karaktere bez kazni i stresa.", 
    icon: Brain 
  },
  { 
    id: 3, 
    title: "Nega i Higijena", 
    description: "Kako čistiti nabore, uši i šape da izbegnete infekcije.", 
    icon: Stethoscope 
  },
  { 
    id: 4, 
    title: "Život u Stanu", 
    description: "Saveti za srećan život u urbanom okruženju.", 
    icon: Home 
  },
];

export const CURRICULUM: CurriculumItem[] = [
  {
    id: 1,
    title: "UVOD U RASU I PRIPREMA ZA NOVOG LJUBIMCA",
    items: [
      "Razumevanje rase: Istorija, poreklo i kako je nastao francuski buldog.",
      "Karakteristike: Izgled, građa, temperament i specifične osobine.",
      "Odabir šteneta: Razlika između odgovornih i nesavesnih uzgajivača.",
      "Priprema doma: Prvi dani, osnovna oprema i sigurnost u kući."
    ]
  },
  {
    id: 2,
    title: "ISHRANA I ZDRAVLJE",
    items: [
      "Pravilna ishrana: Najbolja vrsta hrane (granule, kuvana ili BARF).",
      "Zdravstveni problemi: Disanje, kičma, zglobovi i alergije.",
      "Higijena i nega: Održavanje dlake, čišćenje ušiju i nabora lica.",
      "Prevencija: Prepoznavanje simptoma i sprečavanje gojaznosti."
    ]
  },
  {
    id: 3,
    title: "VASPITANJE I DRUŠTVENI ODNOSI",
    items: [
      "Osnovna pravila: Postavljanje granica i sprečavanje loših navika.",
      "Dresura: Nagrade i pohvale uz učenje osnovnih komandi.",
      "Socijalizacija: Prilagođavanje okolini, susreti sa ljudima i psima."
    ]
  },
  {
    id: 4,
    title: "REŠAVANJE PROBLEMA U PONAŠANJU",
    items: [
      "Najčešći problemi: Rešavanje lajanja, cviljenja i agresije na povocu.",
      "Separaciona anksioznost: Kako naučiti psa da ostane sam kod kuće.",
      "Kućna higijena: Obuka za vršenje nužde i sprečavanje nezgoda."
    ]
  },
  {
    id: 5,
    title: "AKTIVNOST I ZABAVA",
    items: [
      "Fizička aktivnost: Potrebna količina vežbanja i najbolje igre.",
      "Mentalna stimulacija: Inteligentne igre i trikovi za razvoj mozga.",
      "Zabava kod kuće: Kako ih animirati kada su sami."
    ]
  },
  {
    id: 6,
    title: "ZAKLJUČAK I DODATNI SAVETI",
    items: [
      "Život sa francuskim buldogom: Balans između discipline i ljubavi.",
      "Dugovečnost: Saveti za srećan i dug život vašeg psa."
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Jelena Petrović",
    location: "Beograd",
    text: "Mislila sam da je nemoguće naučiti mog Baksija da ne grize nameštaj. Ovaj vodič mi je spasio garnituru! Sve preporuke.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Marko Nikolić",
    location: "Novi Sad",
    text: "Najkorisniji deo mi je bio o ishrani. Napokon smo rešili problem sa alergijama i svrabom. Hvala Bulldog World!",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Stefan i Ana",
    location: "Niš",
    text: "Kao prvi vlasnici psa, bili smo u panici. Knjiga je napisana tako jednostavno i smirujuće. Vredi svaki dinar.",
    image: "https://picsum.photos/100/100?random=3"
  },
  {
    id: 4,
    name: "Marija Đorđević",
    location: "Kragujevac",
    text: "Odličan priručnik. Posebno mi se dopao deo o nezi nabora, jer smo se sa tim baš mučili. Sada je sve pod kontrolom.",
    image: "https://picsum.photos/100/100?random=4"
  },
  {
    id: 5,
    name: "Nikola Vasić",
    location: "Subotica",
    text: "Kratko, jasno i primenljivo. Nema suvoparne teorije, samo konkretni saveti koje možete odmah primeniti.",
    image: "https://picsum.photos/100/100?random=5"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "Da li je ova knjiga za štene ili odraslog psa?",
    answer: "Oboje! Knjiga ima savete i za početnike i za vlasnike koji već imaju iskustva, ali žele bolju rutinu i zdraviji odnos."
  },
  {
    id: 2,
    question: "Da li mogu da koristim knjigu ako živim u stanu?",
    answer: "Naravno! Knjiga sadrži savete posebno prilagođene za život u stanu, uključujući vežbanje i navikavanje na higijenu."
  },
  {
    id: 3,
    question: "Šta ako moj pas ima zdravstvenih problema?",
    answer: "Knjiga ti daje smernice šta je tipično za buldoge i kada treba da se obratiš veterinaru – plus, detaljan deo o prevenciji."
  },
  {
    id: 4,
    question: "Da li je knjiga pogodna za potpuno nove vlasnike?",
    answer: "Da! Namenjena je svima koji žele jasan vodič bez stručnog žargona – lako se prati i odmah primenjuje."
  },
  {
    id: 5,
    question: "U kom formatu dolazi knjiga?",
    answer: "Knjiga je u digitalnom PDF formatu. Možete je čitati na telefonu, tabletu ili računaru odmah nakon kupovine. Link za preuzimanje stiže na vaš email."
  },
  {
    id: 6,
    question: "Šta ako nisam zadovoljan vodičem?",
    answer: "Nudimo 100% garanciju povrata novca u roku od 30 dana. Dovoljno je da nam pošaljete email i vraćamo novac bez pitanja."
  },
  {
    id: 7,
    question: "Da li je plaćanje sigurno?",
    answer: "Koristimo enkriptovanu SSL konekciju i procesore plaćanja po najvišim svetskim standardima. Vaši podaci su 100% bezbedni."
  }
];