import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  Settings,
  Trash2,
  Users,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

interface SiteSettings {
  logoUrl: string;
  faviconUrl: string;
  bannerImages: string[];
}

interface ToolLink {
  name: string;
  description: string;
  url: string;
}

const adminPasswordValue = 'primpex123';
const paradiseLogoUrl = 'https://paradiseimpex.in/PI_logo.png';

const defaultBannerImages = [
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
];

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Rich Rolls',
    description: 'Reliable export support for grains, pulses, spices, and other origin-sensitive cargo categories.',
  image: '/src/assets/RichRolls.png?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Rocket Wafer biscuits',
    description: 'Structured sourcing and shipment planning for bulk industrial products moving across global lanes.',
  image: '/src/assets/Rocket.png?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'FruPop',
    description: 'Flexible export coordination for mixed consignments, packaging supplies, and repeat-volume orders.',
  image: '/src/assets/FruPop.png?auto=format&fit=crop&w=900&q=80',
  },

  {
    id: 4,
    name: 'HappyGums',
    description: 'Flexible export coordination for mixed consignments, packaging supplies, and repeat-volume orders.',
  image: '/src/assets/HappyGum.png?auto=format&fit=crop&w=900&q=80',
  },

  {
    id: 5,
    name: 'BigHeart',
    description: 'Flexible export coordination for mixed consignments, packaging supplies, and repeat-volume orders.',
  image: '/src/assets/BigHeart.png?auto=format&fit=crop&w=900&q=80',
  },

 {
    id: 6,
    name: 'ChocoLolipop',
    description: 'Flexible export coordination for mixed consignments, packaging supplies, and repeat-volume orders.',
  image: '/src/assets/ChocoLolipop.png?auto=format&fit=crop&w=900&q=80',
  },

  {
    id: 7,
    name: 'KingCandySticks',
    description: 'Flexible export coordination for mixed consignments, packaging supplies, and repeat-volume orders.',
  image: '/src/assets/KingCandySticks.png?auto=format&fit=crop&w=900&q=80',
  },

  {
    id: 8,
    name: 'ParadiseChocolate',
    description: 'Flexible export coordination for mixed consignments, packaging supplies, and repeat-volume orders.',
  image: '/src/assets/ParadiseChocolate.png?auto=format&fit=crop&w=900&q=80',
  },

];

const defaultTeam: TeamMember[] = [
  {
    id: 1,
    name: 'Mayur Sorathiya',
    role: 'Partner',
  image: '/src/assets/MayurSorathiya.jpg?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Reshma Kalyani',
    role: 'Partner',
  image: '/src/assets/ReshmaKalyani.jpg?auto=format&fit=crop&w=500&q=60',
  },
{ 
  id: 3,
  name: 'Deepa Rathod',
  role: 'Partner',
  image: '/src/assets/DeepaRathod.png?auto=format&fit=crop&w=500&q=60',
},
];

const defaultSiteSettings: SiteSettings = {
  logoUrl: paradiseLogoUrl,
  faviconUrl: paradiseLogoUrl,
  bannerImages: defaultBannerImages,
};

const globalPresence = [
  { country: 'India', role: 'India HQ', flag: 'https://flagcdn.com/in.svg' },
  { country: 'China', role: 'China Branch', flag: 'https://flagcdn.com/cn.svg' },
  { country: 'Mozambique', role: 'Mozambique', flag: 'https://flagcdn.com/mz.svg' },
  { country: 'Dubai', role: 'Dubai', flag: 'https://flagcdn.com/ae.svg' },
  { country: 'Zambia', role: 'Zambia', flag: 'https://flagcdn.com/zm.svg' },
  { country: 'Ghana', role: 'Ghana', flag: 'https://flagcdn.com/gh.svg' },
];

const shippingTools: ToolLink[] = [
  {
    name: 'CBM Calculator',
    description: 'Calculate cubic meters for your shipments instantly',
    url: 'https://www.cbmcalculator.com/',
  },
  {
    name: 'Hazardous Classification',
    description: 'Complete guide to dangerous goods classification',
    url: 'https://paradiseimpex.in/Hazardious%20Classification.pdf',
  },
  {
    name: 'Incoterms',
    description: 'International Commercial Terms reference guide',
    url: 'https://paradiseimpex.in/incoterms.pdf',
  },
  {
    name: 'Container Dimensions',
    description: 'Standard container sizes and specifications',
    url: 'https://paradiseimpex.in/Shipping_Container_Dimensions.pdf',
  },
];

const trackingLinks: ToolLink[] = [
  {
    name: 'One Line',
    description: 'Cargo tracking',
    url: 'https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking',
  },
  {
    name: 'Unifeeder',
    description: 'Container tracking',
    url: 'https://www.unifeeder.com/track-and-trace',
  },
  {
    name: 'MSC',
    description: 'Track shipment',
    url: 'https://www.msc.com/en/track-a-shipment',
  },
  {
    name: 'CMA CGM',
    description: 'Shipment tracking',
    url: 'https://www.cma-cgm.com/ebusiness/tracking',
  },
  {
    name: 'Interasia',
    description: 'Service tracking',
    url: 'https://www.interasia.cc/Service/Form?servicetype=0',
  },
  {
    name: 'Hapag-Lloyd',
    description: 'Booking tracking',
    url: 'https://www.hapag-lloyd.com/en/online-business/track/track-by-booking-solution.html',
  },
  {
    name: 'COSCO',
    description: 'Cargo tracking',
    url: 'https://elines.coscoshipping.com/ebusiness/cargoTracking',
  },
  {
    name: 'Evergreen',
    description: 'Cargo tracking',
    url: 'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do',
  },
  {
    name: 'OOCL',
    description: 'Cargo tracking',
    url: 'https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx',
  },
];

function safeParse<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function mergeSiteSettings(saved: SiteSettings | null): SiteSettings {
  if (!saved) {
    return defaultSiteSettings;
  }

  return {
    logoUrl: saved.logoUrl || paradiseLogoUrl,
    faviconUrl: saved.faviconUrl || paradiseLogoUrl,
    bannerImages: saved.bannerImages?.length ? saved.bannerImages : defaultBannerImages,
  };
}

export function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', image: '' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', image: '' });
  const [newBannerImage, setNewBannerImage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [usdRate, setUsdRate] = useState('92.20');
  const [usdAmount, setUsdAmount] = useState('1');

  const bannerImages = useMemo(
    () => (siteSettings.bannerImages.length ? siteSettings.bannerImages : defaultBannerImages),
    [siteSettings.bannerImages],
  );

  const convertedInr = useMemo(() => {
    const amount = Number(usdAmount);
    const rate = Number(usdRate);

    if (!Number.isFinite(amount) || !Number.isFinite(rate)) {
      return '0.00';
    }

    return (amount * rate).toFixed(2);
  }, [usdAmount, usdRate]);

  useEffect(() => {
    const savedProducts = safeParse<Product[]>(localStorage.getItem('paradise_products'));
    const savedTeam = safeParse<TeamMember[]>(localStorage.getItem('paradise_team'));
    const savedSettings = safeParse<SiteSettings>(localStorage.getItem('paradise_settings'));

    if (savedProducts?.length) {
      setProducts(savedProducts);
    }

    if (savedTeam?.length) {
      setTeam(savedTeam);
    }

    setSiteSettings(mergeSiteSettings(savedSettings));
  }, []);

  useEffect(() => {
    if (!bannerImages.length) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    if (currentSlide >= bannerImages.length) {
      setCurrentSlide(0);
    }
  }, [bannerImages.length, currentSlide]);

  useEffect(() => {
    localStorage.setItem('paradise_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('paradise_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('paradise_settings', JSON.stringify(siteSettings));

    const iconHref = siteSettings.faviconUrl || paradiseLogoUrl;
    let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    favicon.href = iconHref;
  }, [siteSettings]);

  useEffect(() => {
    let cancelled = false;

    async function loadRate() {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        const rate = data?.rates?.INR;

        if (!cancelled && typeof rate === 'number') {
          setUsdRate(rate.toFixed(2));
        }
      } catch {
        // Keep fallback rate if live API is unavailable.
      }
    }

    loadRate();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === adminPasswordValue) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setAdminError('');
      return;
    }

    setAdminError('Incorrect password.');
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) {
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newProduct.name.trim(),
        description: '',
        image:
          newProduct.image.trim() ||
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
      },
    ]);
    setNewProduct({ name: '', description: '', image: '' });
  };

  const handleAddTeam = () => {
    if (!newTeam.name.trim() || !newTeam.role.trim()) {
      return;
    }

    setTeam((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTeam.name.trim(),
        role: newTeam.role.trim(),
        image:
          newTeam.image.trim() ||
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
      },
    ]);
    setNewTeam({ name: '', role: '', image: '' });
  };

  const handleAddBannerImage = () => {
    if (!newBannerImage.trim()) {
      return;
    }

    setSiteSettings((prev) => ({
      ...prev,
      bannerImages: [...prev.bannerImages, newBannerImage.trim()],
    }));
    setNewBannerImage('');
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');

    window.setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

      window.setTimeout(() => {
        setFormStatus('idle');
      }, 1800);
    }, 900);
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <img src={siteSettings.logoUrl || paradiseLogoUrl} alt="Paradise Impex logo" className="h-12 w-auto object-contain" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Admin Panel</p>
                <h1 className="text-2xl font-semibold">Paradise Impex Content Control</h1>
              </div>
            </div>
            <button
              onClick={() => setIsAdmin(false)}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold hover:border-stone-900"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Settings className="text-emerald-700" size={22} />
                <h2 className="text-xl font-semibold">Brand Settings</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl bg-stone-50 p-5">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Header and Footer Logo</p>
                  <div className="mb-4 flex h-24 items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white p-3">
                    <img src={siteSettings.logoUrl || paradiseLogoUrl} alt="Current logo" className="h-full w-auto object-contain" />
                  </div>
                  <input
                    type="text"
                    value={siteSettings.logoUrl}
                    onChange={(event) => setSiteSettings((prev) => ({ ...prev, logoUrl: event.target.value }))}
                    placeholder="Paste logo URL"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                </div>

                <div className="rounded-3xl bg-stone-50 p-5">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Favicon</p>
                  <div className="mb-4 flex h-24 items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white p-3">
                    <img src={siteSettings.faviconUrl || paradiseLogoUrl} alt="Current favicon" className="h-12 w-12 object-contain" />
                  </div>
                  <input
                    type="text"
                    value={siteSettings.faviconUrl}
                    onChange={(event) => setSiteSettings((prev) => ({ ...prev, faviconUrl: event.target.value }))}
                    placeholder="Paste favicon URL"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-[#13231f] p-6 text-white shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Site Snapshot</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-4xl font-semibold">{products.length}</p>
                  <p className="text-sm text-white/70">Products managed</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold">{team.length}</p>
                  <p className="text-sm text-white/70">Team members listed</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold">{bannerImages.length}</p>
                  <p className="text-sm text-white/70">Hero images available</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Package className="text-emerald-700" size={22} />
              <h2 className="text-xl font-semibold">Hero Image Manager</h2>
            </div>

            <div className="mb-6 flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={newBannerImage}
                onChange={(event) => setNewBannerImage(event.target.value)}
                placeholder="Paste hero image URL"
                className="flex-1 rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-600"
              />
              <button
                onClick={handleAddBannerImage}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
              >
                <Plus size={18} />
                Add Image
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {bannerImages.map((image, index) => (
                <div key={`${image}-${index}`} className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50">
                  <img src={image} alt={`Hero slide ${index + 1}`} className="h-44 w-full object-cover" />
                  <div className="flex items-center justify-between p-4">
                    <p className="text-sm font-medium text-stone-700">Slide {index + 1}</p>
                    <button
                      onClick={() =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          bannerImages: prev.bannerImages.filter((_, bannerIndex) => bannerIndex !== index),
                        }))
                      }
                      className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Package className="text-emerald-700" size={22} />
                <h2 className="text-xl font-semibold">Products</h2>
              </div>

              <div className="rounded-3xl bg-stone-50 p-5">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(event) => setNewProduct((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Product name"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(event) => setNewProduct((prev) => ({ ...prev, image: event.target.value }))}
                    placeholder="Image URL"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                  <button
                    onClick={handleAddProduct}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                  >
                    <Plus size={18} />
                    Add Product
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-4 rounded-3xl border border-stone-200 p-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="min-w-0">
                        <p className="font-semibold text-stone-900">{product.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setProducts((prev) => prev.filter((item) => item.id !== product.id))}
                      className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Users className="text-emerald-700" size={22} />
                <h2 className="text-xl font-semibold">Team</h2>
              </div>

              <div className="rounded-3xl bg-stone-50 p-5">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newTeam.name}
                    onChange={(event) => setNewTeam((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Team member name"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                  <input
                    type="text"
                    value={newTeam.role}
                    onChange={(event) => setNewTeam((prev) => ({ ...prev, role: event.target.value }))}
                    placeholder="Role"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                  <input
                    type="text"
                    value={newTeam.image}
                    onChange={(event) => setNewTeam((prev) => ({ ...prev, image: event.target.value }))}
                    placeholder="Image URL"
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600"
                  />
                  <button
                    onClick={handleAddTeam}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                  >
                    <Plus size={18} />
                    Add Member
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between gap-4 rounded-3xl border border-stone-200 p-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <img src={member.image} alt={member.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="min-w-0">
                        <p className="font-semibold text-stone-900">{member.name}</p>
                        <p className="truncate text-sm text-stone-600">{member.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTeam((prev) => prev.filter((item) => item.id !== member.id))}
                      className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2ea] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#f5f2ea]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img src={siteSettings.logoUrl || paradiseLogoUrl} alt="Paradise Impex logo" className="h-12 w-auto object-contain" />
            <div>
              <p className="text-lg font-semibold text-[#17211d]">Paradise Impex</p>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Export and Logistics</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-700 lg:flex">
            <a href="#about" className="hover:text-stone-950">About</a>
            <a href="#products" className="hover:text-stone-950">Products</a>
            <a href="#tools" className="hover:text-stone-950">Shipping Tools</a>
            <a href="#tracking" className="hover:text-stone-950">Track & Trace</a>
            <a href="#team" className="hover:text-stone-950">Team</a>
            <a href="#contact" className="hover:text-stone-950">Contact</a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#13231f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d1815]"
          >
            Get a Quote
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="overflow-hidden bg-white py-14 lg:py-20 border-b border-stone-100">
          <div className="mx-auto flex flex-col lg:flex-row max-w-7xl gap-12 px-4 sm:px-6 lg:items-center lg:px-8">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 lg:w-[52%]">
              <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">Paradise Impex</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-[#17211d] md:text-6xl">
                Your gateway to global markets.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
                With 15+ years in global trade, we connect businesses across 150+ countries with reliable,
                transparent logistics solutions. From single containers to full charter shipments, our expert team
                ensures every cargo reaches destination safely and on time.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#13231f] px-6 py-3.5 font-semibold text-white transition hover:bg-[#0d1815]"
                >
                  Explore Products
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3.5 font-semibold text-stone-900 transition hover:border-stone-900"
                >
                  Contact Us
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[22px] border border-stone-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-3xl font-semibold text-[#17211d]">150+</p>
                  <p className="mt-2 text-sm text-stone-600">Countries served</p>
                </div>
                <div className="rounded-[22px] border border-stone-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-3xl font-semibold text-[#17211d]">10K+</p>
                  <p className="mt-2 text-sm text-stone-600">Shipments coordinated</p>
                </div>
                <div className="rounded-[22px] border border-stone-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-3xl font-semibold text-[#17211d]">500+</p>
                  <p className="mt-2 text-sm text-stone-600">Business clients</p>
                </div>
                <div className="rounded-[22px] border border-stone-200 bg-white/85 p-5 shadow-sm">
                  <p className="text-3xl font-semibold text-[#17211d]">15+</p>
                  <p className="mt-2 text-sm text-stone-600">Years in trade</p>
                </div>
              </div>
            </div>

            {/* Right Side - Carousel */}
            <div className="relative order-1 lg:order-2 lg:w-[48%]">
              <div className="relative overflow-hidden rounded-[34px] border border-white/60 bg-white p-3 shadow-[0_24px_70px_rgba(19,35,31,0.16)]">
                <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-stone-200 sm:h-[500px]">
                  {bannerImages.map((image, index) => (
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`Paradise Impex slide ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                        currentSlide === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13231f]/50 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <div className="rounded-full bg-black/25 px-0.1 py-0.1 text-sm font-medium text-white backdrop-blur">
                      {/* Auto-changing hero gallery */}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
                        className="rounded-full bg-white/90 p-3 text-stone-900 transition hover:bg-white"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)}
                        className="rounded-full bg-white/90 p-3 text-stone-900 transition hover:bg-white"
                        aria-label="Next slide"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-center gap-2">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${currentSlide === index ? 'w-10 bg-[#13231f]' : 'w-2.5 bg-stone-300'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#f8f4ec] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="max-w-3xl mx-auto text-center">              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">About Us</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#17211d]">Trade is Shaped by experience and clarity.</h2>
              <p className="mt-6 text-lg leading-8 text-stone-600">
                With 15+ years in global trade, we connect businesses across 150+ countries with reliable,
                transparent logistics solutions. From single containers to full charter shipments, our expert team
                ensures every cargo reaches destination safely and on time.
              </p>
            </div>

<div className="mt-16 text-center">              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-bold mb-8">Our Global Presence</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {globalPresence.map((item) => (
                  <div key={item.country} className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col items-center text-center">
                    <img src={item.flag} alt={item.country} className="w-12 h-8 object-cover rounded shadow-sm mb-3 border border-gray-100" />
                    <p className="font-bold text-stone-900">{item.country}</p>
                    <p className="text-xs text-emerald-700 mt-1 uppercase tracking-wider">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Our Products</p>
                <h2 className="mt-3 text-4xl font-semibold text-[#17211d]">Our Products</h2>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  <div className="flex h-[240px] items-center justify-center bg-white overflow-hidden p-4">
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col items-center justify-center text-center bg-white border-t border-stone-50 gap-4">
                    <h3 className="text-lg font-bold text-[#17211d]">{product.name}</h3>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700/10 px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-700 hover:text-white w-full"
                    >
                      Inquire Now
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Shipping Tools</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#17211d]">Essential tools for efficient cargo planning and logistics</h2>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[30px] bg-[#13231f] p-8 text-white shadow-[0_24px_60px_rgba(19,35,31,0.18)]">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-emerald-200">
                  <Calculator size={24} />
                </div>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-emerald-200">Currency Reference</p>
                <p className="mt-3 text-4xl font-semibold">1 USD = ₹{usdRate}</p>

                <div className="mt-6 rounded-[26px] bg-white/8 p-5 ring-1 ring-white/10">
                  <label htmlFor="usd-converter" className="text-sm font-semibold text-white/80">
                    Convert USD to INR instantly
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      id="usd-converter"
                      type="number"
                      min="0"
                      step="0.01"
                      value={usdAmount}
                      onChange={(event) => setUsdAmount(event.target.value)}
                      className="w-full rounded-2xl border border-white/15 bg-white px-4 py-3 text-[#13231f] outline-none transition focus:border-emerald-300"
                      placeholder="Enter USD amount"
                    />
                    <div className="rounded-2xl bg-emerald-400/15 px-4 py-3 text-sm font-semibold text-emerald-100 sm:min-w-[190px]">
                      ₹{convertedInr}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/75">
                    {usdAmount || '0'} USD x ₹{usdRate} = ₹{convertedInr}
                  </p>
                </div>

                <a
                  href="https://www.exchangerate-api.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
                >
                  live Rates by ExchangeRate-API
                  <ExternalLink size={15} />
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {shippingTools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xl font-semibold text-[#17211d]">{tool.name}</p>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{tool.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      Open resource
                      <ExternalLink size={15} className="transition group-hover:translate-x-1" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tracking" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Track &amp; Trace</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#17211d]">Real-time shipment tracking across major shipping lines</h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {trackingLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[28px] border border-stone-200 bg-[#fbfaf7] p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#17211d]">{item.name}</p>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                    </div>
                    <ExternalLink className="mt-1 text-emerald-700 transition group-hover:translate-x-1" size={18} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-bold">Our Team</p>
              <h2 className="mt-3 text-4xl font-bold text-[#17211d]">Leadership & Coordination</h2>
              <p className="mt-4 text-stone-600">A small team built for sharp coordination and dependable follow-through.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {team.map((member) => (
                <article key={member.id} className="text-center group">
                  <div className="relative mx-auto mb-4 w-16 h-16 md:w-35 md:h-45 overflow-hidden rounded-2xl border border-white shadow-md transition-transform duration-500 group-hover:scale-105">
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-2">
                    <p className="text-base font-bold text-[#17211d]">{member.name}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-emerald-700 font-bold">{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] border border-stone-200 bg-white shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Contact Info Side */}
                <div className="p-10 md:p-16 lg:border-r border-stone-100 bg-stone-50/50">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-bold mb-4">Contact Us</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-stone-900">Start your next export conversation.</h2>
                  <p className="text-stone-600 text-lg mb-12 max-w-md">
                    Share your product requirements, shipment plans, or sourcing needs. Our team is ready to provide the right logistics support.
                  </p>

                  <div className="space-y-10">
                    <div className="flex items-start gap-6">
                      <div className="bg-emerald-700/5 p-4 rounded-2xl border border-emerald-700/10">
                        <MapPin className="text-emerald-700" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-stone-900">Our Office</h4>
                        <p className="text-stone-600 leading-relaxed">
                          2nd Floor, Pantheon Bhuj, B209,<br />
                          Mirzapar Highway, Sanskar Nagar,<br />
                          Bhuj, Mirjapar Part, Gujarat 370001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="bg-emerald-700/5 p-4 rounded-2xl border border-emerald-700/10">
                        <Phone className="text-emerald-700" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-stone-900">Call Support</h4>
                        <a href="tel:+918511178212" className="text-stone-600 hover:text-emerald-700 transition-colors">
                          +91 85111 78212
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="bg-emerald-700/5 p-4 rounded-2xl border border-emerald-700/10">
                        <Mail className="text-emerald-700" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-stone-900">Email Inquiry</h4>
                        <a href="mailto:paradiseimpexbhuj@gmail.com" className="text-stone-600 hover:text-emerald-700 transition-colors">
                          paradiseimpexbhuj@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Side */}
                <div className="p-10 md:p-16 bg-white">
                  <h3 className="text-3xl font-bold text-stone-900 mb-2">Send an Inquiry</h3>
                  <p className="text-stone-500 mb-10">Fill out the form and we'll get back to you within 24 hours.</p>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name</label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                          required
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Company Name</label>
                        <input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                        required
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                        required
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all resize-none"
                        placeholder="How can we help you with your export needs?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-5 rounded-2xl shadow-xl shadow-emerald-900/10 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? 'Sending Message...' : formStatus === 'success' ? 'Inquiry Sent Successfully!' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c1512] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <img src={siteSettings.logoUrl || paradiseLogoUrl} alt="Paradise Impex logo" className="h-14 w-auto object-contain" />
                <div>
                  <p className="text-lg font-semibold">Paradise Impex</p>
                  <p className="text-sm text-white/60">Reliable export and logistics solutions</p>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/64">
                Built for businesses that need clear communication, dependable shipment planning, and an export
                partner that understands operational detail.
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Quick Links</p>
              <div className="mt-5 space-y-3 text-sm text-white/64">
                <a href="#about" className="block hover:text-white">About Us</a>
                <a href="#products" className="block hover:text-white">Products</a>
                <a href="#tools" className="block hover:text-white">Shipping Tools</a>
                <a href="#tracking" className="block hover:text-white">Track &amp; Trace</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Contact</p>
              <div className="mt-5 space-y-4 text-sm text-white/64">
                <p>
                  2nd Floor, Pantheon Bhuj, B209, Mirzapar Highway, Sanskar Nagar,
                  <br />
                  Bhuj, Mirjapar Part, Gujarat 370001
                </p>
                <a href="tel:+918511178212" className="block hover:text-white">+91 8511178212</a>
                <a href="mailto:paradiseimpexbhuj@gmail.com" className="block hover:text-white">
                  paradiseimpexbhuj@gmail.com
                </a>
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="rounded-full border border-white/5 px-1 py-0.5 text-[2px] text-white/10 transition hover:border-white/10"
                >
                  admin
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">
            <p>© 2026 Paradise Impex. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Protected Access</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-900">Admin Login</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">This area is for Paradise Impex content management only.</p>

            <div className="mt-6 space-y-4">
              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-600"
              />
              {adminError && <p className="text-sm text-red-600">{adminError}</p>}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                  setAdminError('');
                }}
                className="flex-1 rounded-full border border-stone-300 px-5 py-3 font-semibold text-stone-700 hover:border-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}