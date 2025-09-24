import { useState, useEffect, useRef } from 'react';

function App() {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRegalosModalOpen, setIsRegalosModalOpen] = useState(false);
  const [isUbicacionVisible, setIsUbicacionVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Estados para el formulario
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCelular, setFormCelular] = useState('');

  // Reemplazamos la variable de entorno por la URL de la API directamente
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Obtener el nombre del parámetro de la URL al cargar la página
    const urlParams = new URLSearchParams(window.location.search);
    const nombreParam = urlParams.get('nombre');
    if (nombreParam) {
      setUserName(nombreParam);
    }

    const eventDate = new Date("October 10, 2025 17:00:00").getTime();
    
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(d < 10 ? '0' + d : d);
      setHours(h < 10 ? '0' + h : h);
      setMinutes(m < 10 ? '0' + m : m);
      setSeconds(s < 10 ? '0' + s : s);

      if (distance < 0) {
        clearInterval(countdownInterval);
        setDays('00');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleConfirmClick = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const celular = urlParams.get('celular');
    
    // Si no hay parámetros en la URL, abre el formulario.
    if (!nombre || !celular) {
      setIsFormModalOpen(true);
      return;
    }
    
    // Si hay parámetros, procede con el envío a la API
    fetch(`${API_URL}?nombre=${nombre}&celular=${celular}`)
      .then(response => response.text())
      .then(text => console.log(text)) // O maneja la respuesta del script
      .catch(error => console.error('Error:', error));
    setIsConfirmModalOpen(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Envía los datos del formulario a la API
    fetch(`${API_URL}?nombre=${formName}&celular=${formCelular}`)
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(error => console.error('Error:', error));
      
    // Cierra el formulario y abre el modal de confirmación
    setIsFormModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleOpenRegalosModal = () => {
    setIsRegalosModalOpen(true);
  };

  const handleCloseModal = (modalType) => {
    if (modalType === 'confirm') {
      setIsConfirmModalOpen(false);
    } else if (modalType === 'regalos') {
      setIsRegalosModalOpen(false);
    }
  };
  
  const handleToggleUbicacion = () => {
    setIsUbicacionVisible(!isUbicacionVisible);
  };

  const toggleMusicPlayback = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
      <style>
        {`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-delay-300 {
          animation-delay: 0.3s;
        }
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        `}
      </style>
      <div 
        className="font-serif text-gray-800 antialiased relative z-0 min-h-screen w-full"
        style={{ 
          // Se ha actualizado la URL de la imagen para que sea visible
          backgroundImage: `url('./Fondo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        <div className="relative z-10 p-4 sm:p-8">
          <div className="container mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Sección de la imagen principal con el título superpuesto */}
              <div className="relative w-full h-96 sm:h-[420px] overflow-hidden rounded-t-3xl">
                <img 
                  src="/bodas.jpg" 
                  alt="Conferencia de parejas" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <h2 className="text-2xl md:text-4xl font-bold text-white font-display text-shadow text-center">Conferencia de parejas</h2>
                </div>
              </div>
              
              <div className="p-6 md:p-8 lg:p-10">
                {/* Título de la invitación con animación */}
                <div className="section text-center animate-fade-in">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#795548] mb-2 font-display">
                    {userName ? `${userName} y pareja` : 'Amada pareja'}
                  </h1>
                  <p className="text-lg md:text-xl italic text-gray-600 mb-6 animate-delay-300">
                    Les invitamos cordialmente a un tiempo de edificación y crecimiento, un evento diseñado para fortalecer la unidad y el amor en pareja, bajo la bendición de Dios.
                  </p>
                </div>
                
                {/* Botón para reproducir música */}
                <div className="section text-center mb-8 flex flex-col items-center">
                  <button
                    onClick={toggleMusicPlayback}
                    className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#5D7B6F] text-white hover:bg-[#4C645A] transition-colors shadow-md transform hover:scale-105 transition-transform duration-300"
                    aria-label={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
                  >
                    {isMusicPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.083 1.125-1.749 2.074-1.239l9.58 4.79a1.5 1.5 0 0 1 0 2.678l-9.58 4.79c-.949.51-2.074-.156-2.074-1.24V5.653Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">Reproducir música</p>
                </div>

                {/* Conteo Regresivo */}
                <div className="section mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-center text-gray-700">Faltan:</h2>
                  <div id="countdown" className="flex justify-center gap-2 text-center font-semibold">
                    <div className="p-3 sm:p-4 bg-gray-100 rounded-xl w-16 sm:w-20 bg-opacity-60 backdrop-filter backdrop-blur-sm">
                      <span className="block text-2xl md:text-3xl text-gray-800">{days}</span>
                      <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-normal mt-1">Días</span>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-100 rounded-xl w-16 sm:w-20 bg-opacity-60 backdrop-filter backdrop-blur-sm">
                      <span className="block text-2xl md:text-3xl text-gray-800">{hours}</span>
                      <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-normal mt-1">Horas</span>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-100 rounded-xl w-16 sm:w-20 bg-opacity-60 backdrop-filter backdrop-blur-sm">
                      <span className="block text-2xl md:text-3xl text-gray-800">{minutes}</span>
                      <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-normal mt-1">Min.</span>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-100 rounded-xl w-16 sm:w-20 bg-opacity-60 backdrop-filter backdrop-blur-sm">
                      <span className="block text-2xl md:text-3xl text-gray-800">{seconds}</span>
                      <span className="text-[10px] sm:text-xs uppercase text-gray-500 font-normal mt-1">Seg.</span>
                    </div>
                  </div>
                </div>

                {/* Detalles del Evento */}
                <div className="section text-center mb-8">
                  <p className="text-md text-gray-600 mb-1">Viernes, 10 de octubre de 2025</p>
                  <p className="font-bold text-gray-800 text-lg md:text-xl">5:00 PM</p>
                </div>

                {/* Botones Interactivos */}
                <div className="section flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="w-full sm:w-1/2 text-center">
                    <p className="text-sm text-gray-600 mb-2">Tu confirmación nos ayuda a prepararlo todo para ti.</p>
                    <a 
                      href="#"
                      onClick={handleConfirmClick}
                      className="block bg-[#A89885] text-white px-8 py-3 rounded-lg font-medium text-center hover:bg-[#8D7B6A] transition-colors shadow-md transform hover:scale-105 transition-transform duration-300"
                    >
                      Confirmar Asistencia
                    </a>
                  </div>
                  <div className="w-full sm:w-1/2 text-center">
                    <p className="text-sm text-gray-600 mb-2">Descubre lo que te espera en este evento especial.</p>
                    <button 
                      onClick={handleOpenRegalosModal} 
                      className="block w-full bg-[#A89885] text-white px-8 py-3 rounded-lg font-medium text-center hover:bg-[#8D7B6A] transition-colors shadow-md transform hover:scale-105 transition-transform duration-300"
                    >
                      Que encontrarás
                    </button>
                  </div>
                </div>

                {/* Botón para mostrar la Ubicación */}
                <div className="section text-center mb-8">
                  <p className="text-sm text-gray-600 mb-2">Encuentra el camino fácilmente para llegar a tiempo.</p>
                  <button 
                    onClick={handleToggleUbicacion}
                    className="inline-block px-8 py-3 rounded-lg font-medium text-white bg-[#5D7B6F] hover:bg-[#4C645A] transition-colors shadow-md transform hover:scale-105 transition-transform duration-300"
                  >
                    {isUbicacionVisible ? 'Ocultar Ubicación' : 'Ver Ubicación'}
                  </button>
                </div>

                {/* Contenido dinámico (Ubicación) */}
                {isUbicacionVisible && (
                  <div className="section mb-8 animate-fade-in-up">
                    <h2 className="text-xl font-bold mb-3 text-center text-gray-700">Ubicación</h2>
                    <div className="w-full h-64 overflow-hidden rounded-xl shadow-md border border-gray-200 mb-4">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63456.8174899857!2d-75.590114!3d6.257!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428f5f5b39d8d%3A0x392ebd2694c7916f!2sIglesia%20Cristiana%20Movimiento%20Misionero%20Mundial!5e0!3m2!1ses!2sco!4v1758582428996!5m2!1ses!2sco" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy"
                        aria-label="Mapa de la ubicación del evento"
                      ></iframe>
                    </div>
                    <p className="text-center mt-3 text-gray-600">cll 56 #36a 32 Medellin Colombia</p>
                  </div>
                )}
              </div>
              
              {/* Imagen de boda movida fuera del contenedor de padding para que se extienda */}
              <div className="w-full mt-12 overflow-hidden shadow-md">
                <img 
                  src="/boda2.jpg" 
                  alt="Imagen de boda" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Enlace a WhatsApp para más información movido fuera del contenedor de padding */}
              <div className="section text-center my-12">
                <a 
                  href="https://wa.me/573135834597" 
                  target="_blank" 
                  className="inline-block px-8 py-3 rounded-lg font-medium text-white bg-[#5D7B6F] hover:bg-[#4C645A] transition-colors shadow-md transform hover:scale-105 transition-transform duration-300"
                  rel="noopener noreferrer"
                >
                  Más información
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Modal de confirmación */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center animate-fade-in-up">
              <p id="modalMessage" className="mb-6 text-lg font-bold text-[#795548]">
                ¡Tu asistencia ha sido confirmada!
              </p>
              <button 
                onClick={() => handleCloseModal('confirm')} 
                className="bg-[#A89885] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#8D7B6A] transition-colors"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {/* Nuevo Modal de formulario */}
        {isFormModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center animate-fade-in-up">
              <h3 className="text-xl font-bold mb-4 text-[#795548]">Confirma tu asistencia</h3>
              <p className="mb-4 text-gray-700">Por favor, completa tus datos para confirmar tu asistencia.</p>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Tu nombre y el de tu pareja"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A89885]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Número de celular"
                  value={formCelular}
                  onChange={(e) => setFormCelular(e.target.value)}
                  className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A89885]"
                  required
                />
                <div className="flex gap-4 justify-center">
                  <button
                    type="submit"
                    className="bg-[#A89885] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#8D7B6A] transition-colors"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-500 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Lista de Regalos */}
        {isRegalosModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4 text-[#795548]">Que tendrás si confirmas:</h3>
              <p className="text-gray-700 mb-4">
                La bendición de compartir cin tu pareja y encontrar ese mensaje que Dios rtiene para ambos es algo que no tiene valor, encuentra nuestro programa aquí:
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-600">
                <li>1: Conferencia para parejas.</li>
                <li>2: Conferencia familiar.</li>
                <li>3: Cena en pareja.</li>
                <li>4: Recordatorio de conferencia.</li>
                <li>5: Acceso al video de la conferencia de parejas.</li>
              </ul>
              <div className="flex justify-end">
                <button 
                  onClick={() => handleCloseModal('regalos')} 
                  className="bg-[#A89885] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#8D7B6A] transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <audio ref={audioRef} src="/Como_Zaqueo.mp3" loop />
    </>
  );
}

export default App;
