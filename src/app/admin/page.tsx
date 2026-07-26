'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Drink {
  _id?: string;
  id: string;
  name: string;
  category: 'signature' | 'juices' | 'smoothies';
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  ingredients: string[];
}

interface GalleryItem {
  _id?: string;
  src: string;
  title: string;
  desc: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'settings'>('menu');
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Drink Form State
  const [drinkName, setDrinkName] = useState('');
  const [drinkCategory, setDrinkCategory] = useState<'signature' | 'juices' | 'smoothies'>('signature');
  const [drinkDesc, setDrinkDesc] = useState('');
  const [drinkPrice, setDrinkPrice] = useState('');
  const [drinkImage, setDrinkImage] = useState('');
  const [drinkPopular, setDrinkPopular] = useState(false);
  const [drinkIngredients, setDrinkIngredients] = useState('');
  const [drinkRimOptions, setDrinkRimOptions] = useState('');
  const [drinkFormStatus, setDrinkFormStatus] = useState('');
  const [isUploadingDrinkImage, setIsUploadingDrinkImage] = useState(false);

  // Gallery Form State
  const [gallerySrc, setGallerySrc] = useState('');
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');
  const [galleryFormStatus, setGalleryFormStatus] = useState('');
  const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);

  // Upload Handler Helper
  const handleFileUpload = async (file: File, type: 'drink' | 'gallery') => {
    if (type === 'drink') setIsUploadingDrinkImage(true);
    if (type === 'gallery') setIsUploadingGalleryImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        if (type === 'drink') {
          setDrinkImage(data.url);
          setDrinkFormStatus('✅ Image téléchargée !');
        } else {
          setGallerySrc(data.url);
          setGalleryFormStatus('✅ Image téléchargée !');
        }
      } else {
        alert(data.error || 'Erreur lors du téléchargement');
      }
    } catch {
      alert('Échec de la connexion lors du téléchargement');
    } finally {
      if (type === 'drink') setIsUploadingDrinkImage(false);
      if (type === 'gallery') setIsUploadingGalleryImage(false);
    }
  };

  // Profile Settings Form State
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [currentAdminPassword, setCurrentAdminPassword] = useState('');
  const [profileStatus, setProfileStatus] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        setIsLoggedIn(true);
        fetchData();
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resMenu, resGallery] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/gallery')
      ]);

      if (resMenu.ok) {
        const dataMenu = await resMenu.json();
        setDrinks(dataMenu);
      }
      if (resGallery.ok) {
        const dataGallery = await resGallery.json();
        setGallery(dataGallery);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        fetchData();
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Connection error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setIsLoggedIn(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatus('Mise à jour en cours...');
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newUsername: newAdminUsername,
          newPassword: newAdminPassword,
          currentPassword: currentAdminPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfileStatus('✅ Identifiants mis à jour avec succès! Veuillez vous reconnecter avec vos nouveaux accès.');
        setNewAdminUsername('');
        setNewAdminPassword('');
        setCurrentAdminPassword('');
        setTimeout(() => {
          handleLogout();
        }, 2000);
      } else {
        setProfileStatus(`❌ Erreur: ${data.error || 'Mise à jour échouée'}`);
      }
    } catch {
      setProfileStatus('❌ Erreur de réseau');
    }
  };

  const handleAddDrink = async (e: React.FormEvent) => {
    e.preventDefault();
    setDrinkFormStatus('Ajout en cours...');
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: drinkName,
          category: drinkCategory,
          description: drinkDesc,
          price: parseFloat(drinkPrice) || 0,
          image: drinkImage || '/assets/cart-1.jpg',
          popular: drinkPopular,
          ingredients: drinkIngredients,
          rimOptions: drinkRimOptions,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDrinkFormStatus('✅ Boisson ajoutée avec succès!');
        setDrinkName('');
        setDrinkDesc('');
        setDrinkPrice('');
        setDrinkImage('');
        setDrinkIngredients('');
        setDrinkRimOptions('');
        fetchData();
      } else {
        setDrinkFormStatus(`❌ Erreur: ${data.error || 'Échec'}`);
      }
    } catch {
      setDrinkFormStatus('❌ Erreur de réseau');
    }
  };

  const handleDeleteDrink = async (id?: string) => {
    if (!id || !confirm('Voulez-vous vraiment supprimer cette boisson ?')) return;
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setGalleryFormStatus('Ajout en cours...');
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          src: gallerySrc || '/assets/cart-1.jpg',
          title: galleryTitle,
          desc: galleryDesc,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGalleryFormStatus('✅ Image ajoutée à la galerie avec succès!');
        setGallerySrc('');
        setGalleryTitle('');
        setGalleryDesc('');
        fetchData();
      } else {
        setGalleryFormStatus(`❌ Erreur: ${data.error || 'Échec'}`);
      }
    } catch {
      setGalleryFormStatus('❌ Erreur de réseau');
    }
  };

  const handleDeleteGallery = async (id?: string) => {
    if (!id || !confirm('Voulez-vous vraiment supprimer cette photo ?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Render Login Form if Not Authenticated
  if (isLoggedIn === false) {
    return (
      <div className="min-h-screen bg-[#3a0f1d] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 border-2 border-amber-400">
          <div className="text-center space-y-2">
            <span className="font-script text-2xl text-[#f59e0b] block">Alou Juice Bar</span>
            <h1 className="font-serif-heading text-2xl font-bold text-[#3a0f1d]">Connexion Administration</h1>
            <p className="text-xs text-gray-500">Accédez au panneau de gestion MongoDB du site.</p>
          </div>

          {loginError && (
            <div className="bg-pink-100 border border-pink-400 text-pink-700 text-xs p-3 rounded-xl text-center font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e63963]"
                placeholder="Ex: admin"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e63963]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e63963] hover:bg-[#c42850] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm"
            >
              Se Connecter
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-pink-600 hover:underline font-bold">
              ← Retour au site client
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50/20 pb-20">
      {/* Header Navbar */}
      <header className="bg-gradient-to-r from-[#3a0f1d] via-[#2a0b15] to-[#4a1426] text-white py-4 shadow-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-white p-0.5 shadow-md">
              <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <span className="font-script text-sm text-[#f59e0b] block leading-none">Administration System</span>
              <h1 className="font-serif-heading text-lg sm:text-xl font-bold tracking-wide text-white">
                ALOU <span className="text-[#e63963]">Juice Bar</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-pink-100 border border-white/20 text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Voir le Site</span>
              <span className="text-amber-400">↗</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#e63963] to-[#f472b6] hover:opacity-90 text-white text-xs font-extrabold px-4 py-2 rounded-full transition-all shadow-md"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* Navigation Tabs */}
        <div className="flex border-b border-pink-200/80 gap-3">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3.5 px-6 font-bold text-sm rounded-t-2xl transition-all flex items-center gap-2 ${activeTab === 'menu'
                ? 'bg-white text-[#e63963] border-t-2 border-x border-[#e63963] shadow-sm -mb-px'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
          >
            <span>🍹 Carte & Menu</span>
            <span className="bg-pink-100 text-[#e63963] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {drinks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3.5 px-6 font-bold text-sm rounded-t-2xl transition-all flex items-center gap-2 ${activeTab === 'gallery'
                ? 'bg-white text-[#e63963] border-t-2 border-x border-[#e63963] shadow-sm -mb-px'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
          >
            <span>📸 Galerie Photos</span>
            <span className="bg-pink-100 text-[#e63963] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {gallery.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-6 font-bold text-sm rounded-t-2xl transition-all flex items-center gap-2 ${activeTab === 'settings'
                ? 'bg-white text-[#e63963] border-t-2 border-x border-[#e63963] shadow-sm -mb-px'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
          >
            <span>⚙️ Sécurité & Compte</span>
          </button>
        </div>

        {/* Tab 1: Menu Management */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Add Drink Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-lg border border-pink-100 space-y-4">
              <h2 className="font-serif-heading text-xl font-bold text-[#3a0f1d]">Ajouter une Boisson au Menu</h2>

              {drinkFormStatus && (
                <div className="p-3 bg-pink-50 border border-pink-200 text-xs font-bold rounded-xl text-[#e63963]">
                  {drinkFormStatus}
                </div>
              )}

              <form onSubmit={handleAddDrink} className="space-y-4 text-xs font-semibold text-gray-700">
                <div>
                  <label className="block mb-1">Nom du Jus / Mocktail *</label>
                  <input
                    type="text"
                    value={drinkName}
                    onChange={(e) => setDrinkName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                    placeholder="Ex: Hibiscus Breeze"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Description *</label>

                  <textarea
                    value={drinkDesc}
                    onChange={(e) => setDrinkDesc(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                    rows={2}
                    placeholder="Délicieux mélange rafraîchissant..."
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Image de la boisson *</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], 'drink');
                        }
                      }}
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-pink-50 file:text-[#e63963] hover:file:bg-pink-100 cursor-pointer"
                      required={!drinkImage}
                    />
                    {isUploadingDrinkImage && (
                      <p className="text-xs text-amber-600 font-bold animate-pulse">Téléchargement de l'image en cours...</p>
                    )}
                    {drinkImage && (
                      <div className="flex items-center gap-3 p-2 bg-pink-50/50 rounded-xl border border-pink-100">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-pink-200">
                          <Image src={drinkImage} alt="Preview" fill className="object-cover" />
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold truncate">Image sélectionnée: {drinkImage}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Ingrédients (séparés par virgule)</label>
                  <input
                    type="text"
                    value={drinkIngredients}
                    onChange={(e) => setDrinkIngredients(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                    placeholder="Mangue, Ananas, Menthe"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={drinkPopular}
                    onChange={(e) => setDrinkPopular(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded"
                  />
                  <label htmlFor="popular" className="cursor-pointer">Marquer comme Incontournable (Popular)</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e63963] hover:bg-[#c42850] text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
                >
                  + Enregistrer dans MongoDB
                </button>
              </form>
            </div>

            {/* Drink List */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif-heading text-xl font-bold text-[#3a0f1d]">Boissons Enregistrées ({drinks.length})</h2>

              {loading && <p className="text-xs text-gray-500">Chargement...</p>}

              <div className="space-y-3">
                {drinks.map((drink) => (
                  <div
                    key={drink._id || drink.id}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <Image src={drink.image} alt={drink.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif-heading font-bold text-base text-[#3a0f1d]">{drink.name}</h4>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteDrink(drink._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-3 py-2 rounded-xl transition-colors shrink-0"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Add Gallery Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-lg border border-pink-100 space-y-4">
              <h2 className="font-serif-heading text-xl font-bold text-[#3a0f1d]">Ajouter une Photo à la Galerie</h2>

              {galleryFormStatus && (
                <div className="p-3 bg-pink-50 border border-pink-200 text-xs font-bold rounded-xl text-[#e63963]">
                  {galleryFormStatus}
                </div>
              )}

              <form onSubmit={handleAddGallery} className="space-y-4 text-xs font-semibold text-gray-700">
                <div>
                  <label className="block mb-1">Titre de la photo *</label>
                  <input
                    type="text"
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                    placeholder="Ex: Bar à Bonbons Événementiel"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Description *</label>
                  <input
                    type="text"
                    value={galleryDesc}
                    onChange={(e) => setGalleryDesc(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                    placeholder="Ex: Présentation de notre charette au mariage"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Fichier Photo *</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], 'gallery');
                        }
                      }}
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-pink-50 file:text-[#e63963] hover:file:bg-pink-100 cursor-pointer"
                      required={!gallerySrc}
                    />
                    {isUploadingGalleryImage && (
                      <p className="text-xs text-amber-600 font-bold animate-pulse">Téléchargement de la photo en cours...</p>
                    )}
                    {gallerySrc && (
                      <div className="flex items-center gap-3 p-2 bg-pink-50/50 rounded-xl border border-pink-100">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-pink-200">
                          <Image src={gallerySrc} alt="Preview" fill className="object-cover" />
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold truncate">Photo sélectionnée: {gallerySrc}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e63963] hover:bg-[#c42850] text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
                >
                  + Ajouter à la Galerie MongoDB
                </button>
              </form>
            </div>

            {/* Gallery List */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif-heading text-xl font-bold text-[#3a0f1d]">Photos Enregistrées ({gallery.length})</h2>

              {loading && <p className="text-xs text-gray-500">Chargement...</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item._id || item.src}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gray-100">
                      <Image src={item.src} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif-heading font-bold text-sm text-[#3a0f1d]">{item.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-2 rounded-xl transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Account & Security Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-pink-100 space-y-6">
            <div>
              <span className="font-script text-xl text-[#f59e0b] block">Compte Administrateur</span>
              <h2 className="font-serif-heading text-2xl font-bold text-[#3a0f1d]">Changer les Identifiants</h2>
              <p className="text-xs text-gray-500 mt-1">
                Modifiez votre nom d'utilisateur ou votre mot de passe pour sécuriser votre panneau MongoDB.
              </p>
            </div>

            {profileStatus && (
              <div className="p-4 bg-pink-50 border border-pink-200 text-xs font-bold rounded-2xl text-[#e63963]">
                {profileStatus}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="block mb-1">Nouveau nom d'utilisateur (optionnel)</label>
                <input
                  type="text"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="Laissez vide pour conserver l'actuel"
                />
              </div>

              <div>
                <label className="block mb-1">Nouveau mot de passe (optionnel)</label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="Minimum 6 caractères"
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="block mb-1 text-gray-900 font-bold">Mot de passe actuel (requis pour valider) *</label>
                <input
                  type="password"
                  value={currentAdminPassword}
                  onChange={(e) => setCurrentAdminPassword(e.target.value)}
                  className="w-full border border-pink-300 rounded-xl p-3 text-sm bg-pink-50/30 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="Entrez votre mot de passe actuel"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#e63963] to-[#f472b6] hover:opacity-95 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all text-sm mt-4"
              >
                Mettre à Jour mes Identifiants
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
