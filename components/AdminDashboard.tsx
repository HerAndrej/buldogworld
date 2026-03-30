import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Mail, KeyRound, Loader2, LayoutDashboard, Database, ShoppingCart, Users, LogOut, Upload, Trash2, File, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from './Button';

type Tab = 'dashboard' | 'orders' | 'leads' | 'buckets';

export const AdminDashboard: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // App State
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // Data State
  const [orders, setOrders] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      if (activeTab === 'orders') fetchOrders();
      if (activeTab === 'leads') fetchLeads();
      if (activeTab === 'buckets') fetchFiles();
    }
  }, [session, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- Fetchers ---
  const fetchOrders = async () => {
    setDataLoading(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error && data) setOrders(data);
    setDataLoading(false);
  };

  const fetchLeads = async () => {
    setDataLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error && data) setLeads(data);
    setDataLoading(false);
  };

  const fetchFiles = async () => {
    setDataLoading(true);
    const { data, error } = await supabase.storage.from('ebooks').list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (!error && data) setFiles(data);
    setDataLoading(false);
  };

  // --- Bucket Actions ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    const { error } = await supabase.storage.from('ebooks').upload(file.name, file, {
      upsert: true,
    });
    
    if (error) {
      alert("Error uploading file: " + error.message);
    } else {
      fetchFiles(); // Refresh
    }
    setUploading(false);
    // reset input
    e.target.value = '';
  };

  const handleDeleteFile = async (name: string) => {
    if (!window.confirm(`Da li ste sigurni da želite da obrišete fajl: ${name}?`)) return;
    
    const { error } = await supabase.storage.from('ebooks').remove([name]);
    if (error) {
      alert("Error deleting file: " + error.message);
    } else {
      fetchFiles();
    }
  };

  // --- Render Login ---
  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-brand-orange w-12 h-12" /></div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-brand-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-brand-orange" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 mt-2">Unesite vaše kredencijale za pristup</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange sm:text-sm outline-none transition-shadow"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lozinka</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-brand-orange focus:border-brand-orange sm:text-sm outline-none transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                {loginError}
              </div>
            )}

            <Button type="submit" fullWidth disabled={loginLoading} className="py-3">
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Prijavi se'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- Render Dashboard UI ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-brand-orange text-white p-2 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-brand-dark">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />}>Dashboard</NavItem>
          <NavItem active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<ShoppingCart size={18} />}>Narudžbine</NavItem>
          <NavItem active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={<Users size={18} />}>Leads</NavItem>
          <NavItem active={activeTab === 'buckets'} onClick={() => setActiveTab('buckets')} icon={<Database size={18} />}>Buckets / Fajlovi</NavItem>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Odjavi se
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {/* --- Dashboard Tab --- */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold font-display mb-6 text-gray-900">Pregled</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Ulogovan kao" value={session.user.email} icon={<KeyRound size={24} className="text-blue-600" />} color="bg-blue-50" />
            </div>
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Dobrodošli u Admin Panel</h3>
              <p className="text-gray-600">
                Ovaj panel vam omogućava upravljanje vašim proizvodima (PDF fajlovima), 
                pregledanje narudžbina iz Paddle sistema kao i analizu sakupljenih email lead-ova.
              </p>
            </div>
          </div>
        )}

        {/* --- Orders Tab --- */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold font-display text-gray-900">Narudžbine</h2>
              <Button onClick={fetchOrders} variant="outline" className="text-sm">Osveži</Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 grid grid-cols-5 font-semibold text-gray-600">
                <div className="col-span-2">Kupac / Detalji</div>
                <div>Status</div>
                <div>Iznos</div>
                <div>Datum</div>
              </div>
              {dataLoading ? (
                <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Nema narudžbina za prikaz.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <div key={o.id} className="p-4 grid grid-cols-5 items-center hover:bg-gray-50 transition-colors">
                      <div className="col-span-2">
                        <div className="font-medium text-gray-900">{o.email || 'Nepoznat Email'}</div>
                        <div className="text-xs text-gray-500 mt-1">ID: {o.paddle_order_id || 'Nema Paddle ID'}</div>
                      </div>
                      <div>
                        <OrderStatus status={o.status || 'pending'} />
                      </div>
                      <div className="font-medium text-gray-900">
                        {o.amount_total ? `${o.amount_total} ${o.currency}` : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(o.created_at).toLocaleDateString('sr-RS', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Leads Tab --- */}
        {activeTab === 'leads' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold font-display text-gray-900">Lead Magnet Kontakti</h2>
              <Button onClick={fetchLeads} variant="outline" className="text-sm">Osveži</Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 grid grid-cols-4 font-semibold text-gray-600">
                <div className="col-span-2">Email adresa</div>
                <div>Jezik (Locale)</div>
                <div>Datum unosa</div>
              </div>
              {dataLoading ? (
                 <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
              ) : leads.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Trenutno nemate lead-ova.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {leads.map((l) => (
                    <div key={l.id} className="p-4 grid grid-cols-4 items-center hover:bg-gray-50 transition-colors">
                      <div className="col-span-2 font-medium text-gray-900 flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {l.email}
                      </div>
                      <div className="text-sm text-gray-600 uppercase">
                        {l.language || 'EN'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(l.created_at).toLocaleDateString('sr-RS', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- Buckets Tab --- */}
        {activeTab === 'buckets' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold font-display text-gray-900">Upravljanje Fajlovima (Ebooks)</h2>
                <p className="text-gray-500 mt-1">Ovde možete dodati nove verzije uputstava, PDF-ove ili druge proizvode koje klijenti skidaju.</p>
              </div>
              <div className="relative overflow-hidden group">
                 <Button disabled={uploading} className="gap-2">
                   {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload size={18} />}
                   {uploading ? 'Otpremanje...' : 'Dodaj Novi Fajl'}
                 </Button>
                 <input 
                   type="file" 
                   onChange={handleFileUpload} 
                   className="absolute inset-0 opacity-0 cursor-pointer"
                   title="Upload File"
                   disabled={uploading}
                 />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-4 bg-gray-50 border-b border-gray-200 grid grid-cols-12 font-semibold text-gray-600">
                <div className="col-span-8">Ime fajla / Buket: ebooks</div>
                <div className="col-span-3">Veličina</div>
                <div className="col-span-1 text-right">Akcija</div>
              </div>
              
              {dataLoading ? (
                 <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
              ) : files.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Trenutno nema fajlova u bucketu "ebooks".</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {files.filter(f => f.name !== '.emptyFolderPlaceholder').map((f) => (
                    <div key={f.id || f.name} className="p-4 grid grid-cols-12 items-center hover:bg-gray-50 transition-colors">
                      <div className="col-span-8 font-medium text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                           <File size={20} className="text-brand-orange" />
                        </div>
                        {f.name}
                      </div>
                      <div className="col-span-3 text-sm text-gray-500">
                        {f.metadata ? formatBytes(f.metadata.size) : 'N/A'}
                      </div>
                      <div className="col-span-1 text-right">
                        <button 
                          onClick={() => handleDeleteFile(f.name)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Obriši fajl"
                        >
                          <Trash2 size={18} className="ml-auto" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

// --- Helper Components ---
const NavItem = ({ active, icon, children, onClick }: { active: boolean, icon: React.ReactNode, children: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
      active 
        ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
    }`}
  >
    {icon}
    {children}
  </button>
);

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 truncate">{value}</h3>
    </div>
  </div>
);

const OrderStatus = ({ status }: { status: string }) => {
  const norm = status.toLowerCase();
  
  if (norm === 'completed' || norm === 'paid') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <CheckCircle size={14} /> Uspešno
      </span>
    );
  }
  
  if (norm === 'failed' || norm === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
         <XCircle size={14} /> Neuspešno
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
      <Clock size={14} /> Abandoned Cart (Pending)
    </span>
  );
}

// Utils
function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
