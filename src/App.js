import React, { useState, useEffect } from 'react';
import LogoHeader from './components/LogoHeader';
import AuthButton from './components/AuthButton';
import WelcomeBanner from './components/WelcomeBanner';
import NavButton from './components/NavButton';
import StoryCard from './components/StoryCard';
import storiesData, { updateStoryLikes, addStory, addStoryComment } from './mock/stories';
import LoginScreen from './components/LoginScreen';
import RegisterAdopterScreen from './components/RegisterAdopterScreen';
import RegisterRescuerScreen from './components/RegisterRescuerScreen';
import MyPetsScreen from './components/MyPetsScreen';
import CommunityScreen from './components/CommunityScreen';
import MoreScreen from './components/MoreScreen';
import VaccinesScreen from './components/VaccinesScreen';
import VetsScreen from './components/VetsScreen';
import SettingsScreen from './components/SettingsScreen';
import AdoptScreen from './components/AdoptScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import ToastNotification from './components/ToastNotification';
import ConfirmDeleteScreen from './components/ConfirmDeleteScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import ChatListScreen from './components/ChatListScreen';
import ShopScreen from './components/ShopScreen';
import PremiumScreen from './components/PremiumScreen';
import HomeCalendar from './components/HomeCalendar';
import SupportChatScreen from './components/SupportChatScreen';
import AppointmentsScreen from './components/AppointmentsScreen';
import { deleteUser, getUserById, updateUser } from './mock/users';
import { getUnreadMessagesCount } from './mock/messages';

const App = () => {
  const [activeView, setActiveView] = useState('welcome'); // welcome, login, registerAdopter, registerRescuer, dashboard, profile, chat, confirmDelete, changePassword, chatList, shop, premium, supportChat, appointments
  const [activeTab, setActiveTab] = useState('home'); // home, pets, adopt, health, vaccines, community, vets, more, settings, chatList, shop, premium, appointments
  const [currentUser, setCurrentUser] = useState(null);
  const [stories, setStories] = useState(storiesData);
  const [toast, setToast] = useState(null); // { message, type }
  const [profileToView, setProfileToView] = useState(null); // userId for profile screen
  const [chatRecipientInfo, setChatRecipientInfo] = useState(null); // { id: userId, initialMessage: string }
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const count = getUnreadMessagesCount(currentUser.id);
      setUnreadMessages(count);
    }
  }, [currentUser, activeView]); // Update unread count when user changes or view changes (e.g., after reading messages)

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActiveView('dashboard');
    setActiveTab('home');
    showToast('¡Inicio de sesión exitoso!', 'success');
  };

  const handleRegisterSuccess = () => {
    showToast('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
    setActiveView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('welcome');
    setActiveTab('home');
    showToast('Sesión cerrada.', 'info');
  };

  const handleLikeToggle = (storyId, userId, liked) => {
    updateStoryLikes(storyId, userId, liked);
    setStories([...storiesData]); // Forzar re-renderizado
  };

  const handleCommentSubmit = (storyId, comment) => {
    addStoryComment(storyId, { ...comment, user: currentUser.name, userId: currentUser.id });
    setStories([...storiesData]); // Forzar re-renderizado
  };

  const handleProfileClick = (userId) => {
    setProfileToView(getUserById(userId));
    setActiveView('profile');
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    updateUser(updatedUser); // Update in mock data
    showToast('Perfil actualizado.', 'success');
  };

  const handleDeleteAccount = () => {
    setActiveView('confirmDelete');
  };

  const handleConfirmDelete = () => {
    deleteUser(currentUser.id);
    handleLogout();
    showToast('Cuenta eliminada permanentemente.', 'success');
  };

  const handleChangePassword = () => {
    setActiveView('changePassword');
  };

  const handleChangePasswordSuccess = () => {
    showToast('Contraseña cambiada con éxito.', 'success');
    setActiveView('login'); // Go back to login after password change
  };

  const handleStartChat = (recipientId, initialMessage = null) => {
    setChatRecipientInfo({ id: recipientId, initialMessage: initialMessage });
    setActiveView('chat');
  };

  const handleUpgradeSuccess = (updatedUser) => {
    setCurrentUser(updatedUser);
    showToast('¡Felicidades! Ahora eres usuario Premium.', 'success');
    setActiveView('dashboard');
    setActiveTab('home');
  };

  const handleSupportChat = () => {
    setActiveView('supportChat');
  };

  const renderDashboardContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="p-4">
            <HomeCalendar />
            <h2 className="text-xl font-bold mb-4">Historias Más Recientes</h2>
            {stories.map(story => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onLikeToggle={handleLikeToggle} 
                onCommentSubmit={handleCommentSubmit} 
                onProfileClick={handleProfileClick}
                currentUserId={currentUser.id}
              />
            ))}
          </div>
        );
      case 'pets':
        return <MyPetsScreen currentUser={currentUser} onBack={() => setActiveTab('home')} />;
      case 'adopt':
        return <AdoptScreen currentUser={currentUser} onBack={() => setActiveTab('home')} onStartChat={handleStartChat} />;
      case 'health':
        return <div className="p-4">Contenido de Seguimiento de Salud</div>;
      case 'vaccines':
        return <VaccinesScreen currentUser={currentUser} onBack={() => setActiveTab('home')} />;
      case 'community':
        return <CommunityScreen currentUser={currentUser} onBack={() => setActiveTab('more')} onProfileClick={handleProfileClick} />;
      case 'vets':
        return <VetsScreen currentUser={currentUser} onBack={() => setActiveTab('more')} onStartChat={handleStartChat} />;
      case 'settings':
        return <SettingsScreen onBack={() => setActiveTab('more')} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} onChangePassword={handleChangePassword} />;
      case 'chatList':
        return <ChatListScreen currentUser={currentUser} onBack={() => setActiveTab('more')} onSelectChat={handleStartChat} />;
      case 'shop':
        return <ShopScreen currentUser={currentUser} onBack={() => setActiveTab('more')} />;
      case 'premium':
        return <PremiumScreen currentUser={currentUser} onBack={() => setActiveTab('more')} onUpgradeSuccess={handleUpgradeSuccess} />;
      case 'appointments':
        return <AppointmentsScreen currentUser={currentUser} onBack={() => setActiveTab('more')} />;
      case 'more':
        return <MoreScreen onBack={() => setActiveTab('home')} onNavigate={setActiveTab} onSupportChat={handleSupportChat} />;
      default:
        return null;
    }
  };

  if (activeView === 'welcome') {
    return (
      <div 
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4" 
        style={{ backgroundImage: `url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc06upbIoVFtni9pklCcebwvoumN4D1UEQ3aHWZ')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay oscuro */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 relative z-10">
          <LogoHeader />
          
          <div className="space-y-4">
            <AuthButton 
              text="Iniciar sesión" 
              onClick={() => setActiveView('login')}
              variant="primary"
            />
            
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-500">o</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">
              Regístrate como
            </h2>
            
            <AuthButton 
              text="Adoptante" 
              onClick={() => setActiveView('registerAdopter')}
              variant="secondary"
            />
            
            <AuthButton 
              text="Rescatista" 
              onClick={() => setActiveView('registerRescuer')}
              variant="secondary"
            />
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-8">
            Al continuar, aceptas nuestros Términos y Política de Privacidad
          </p>
        </div>
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  if (activeView === 'login') {
    return (
      <>
        <LoginScreen onLoginSuccess={handleLoginSuccess} onBackToWelcome={() => setActiveView('welcome')} />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'registerAdopter') {
    return (
      <>
        <RegisterAdopterScreen onRegisterSuccess={handleRegisterSuccess} onBackToWelcome={() => setActiveView('welcome')} />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'registerRescuer') {
    return (
      <>
        <RegisterRescuerScreen onRegisterSuccess={handleRegisterSuccess} onBackToWelcome={() => setActiveView('welcome')} />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'dashboard') {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold text-orange-500">Life Mascot</h1>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <WelcomeBanner 
              userName={currentUser.name} 
              userType={currentUser.type} 
              vetName={currentUser.vetName} 
              onProfileClick={() => handleProfileClick(currentUser.id)}
              profilePhoto={currentUser.profilePhoto}
              isPremium={currentUser.isPremium}
            />
            {renderDashboardContent()}
          </div>
        </main>

        {/* Menú inferior */}
        <nav className="bg-white border-t border-gray-200 p-2">
          <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
            <NavButton 
              icon="🏠" 
              label="Inicio" 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')} 
            />
            <NavButton 
              icon="🐾" 
              label="Mis Mascotas" 
              active={activeTab === 'pets'} 
              onClick={() => setActiveTab('pets')} 
            />
            <NavButton 
              icon="❤️" 
              label="Adoptar" 
              active={activeTab === 'adopt'} 
              onClick={() => setActiveTab('adopt')} 
            />
            <NavButton 
              icon="💉" 
              label="Vacunas" 
              active={activeTab === 'vaccines'} 
              onClick={() => setActiveTab('vaccines')} 
            />
            <NavButton 
              icon="➕" 
              label="Más" 
              active={activeTab === 'more'} 
              onClick={() => setActiveTab('more')} 
              notificationCount={unreadMessages}
            />
          </div>
        </nav>
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  if (activeView === 'profile') {
    return (
      <>
        <ProfileScreen 
          currentUser={profileToView} 
          onBack={() => setActiveView('dashboard')} 
          isMyProfile={profileToView.id === currentUser.id}
          onUpdateProfile={handleUpdateProfile}
        />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'chat') {
    return (
      <>
        <ChatScreen 
          currentUser={currentUser} 
          recipientId={chatRecipientInfo.id} 
          onBack={() => setActiveView('chatList')} 
          initialMessage={chatRecipientInfo.initialMessage}
        />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'confirmDelete') {
    return (
      <>
        <ConfirmDeleteScreen 
          onBack={() => setActiveView('settings')} 
          onConfirmDelete={handleConfirmDelete} 
        />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'changePassword') {
    return (
      <>
        <ChangePasswordScreen 
          currentUser={currentUser} 
          onBack={() => setActiveView('settings')} 
          onPasswordChangeSuccess={handleChangePasswordSuccess}
        />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  if (activeView === 'supportChat') {
    return (
      <>
        <SupportChatScreen 
          currentUser={currentUser} 
          onBack={() => setActiveView('more')} 
        />
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  return null;
};

export default App;