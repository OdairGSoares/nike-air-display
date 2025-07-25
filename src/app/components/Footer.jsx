'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Footer({ isMobile, isTablet }) {
  const [modalOpen, setModalOpen] = useState(null); // 'privacy', 'terms', ou null

  const openModal = (type) => {
    setModalOpen(type);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  // Conteúdo do modal Privacy
  const privacyContent = {
    title: "Política de Privacidade",
    content: [
      {
        section: "Coleta de Informações",
        text: "Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, faz uma compra ou entra em contato conosco."
      },
      {
        section: "Uso das Informações", 
        text: "Utilizamos suas informações para processar pedidos, melhorar nossos serviços, enviar comunicações relevantes e personalizar sua experiência."
      },
      {
        section: "Proteção de Dados",
        text: "Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado."
      },
      {
        section: "Seus Direitos",
        text: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Entre em contato conosco para exercer esses direitos."
      }
    ]
  };

  // Conteúdo do modal Terms
  const termsContent = {
    title: "Termos de Uso",
    content: [
      {
        section: "Aceitação dos Termos",
        text: "Ao usar nosso site, você concorda em cumprir estes termos de uso e todas as leis e regulamentações aplicáveis."
      },
      {
        section: "Uso Permitido",
        text: "Você pode usar nosso site apenas para fins legais e de acordo com estes termos. É proibido usar o site de maneira que possa danificar ou prejudicar outros usuários."
      },
      {
        section: "Propriedade Intelectual",
        text: "Todo o conteúdo deste site, incluindo textos, gráficos, logos e imagens, é propriedade da Nike e está protegido por direitos autorais."
      },
      {
        section: "Limitação de Responsabilidade",
        text: "Não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso deste site."
      }
    ]
  };

  const currentContent = modalOpen === 'privacy' ? privacyContent : termsContent;

  return (
    <>
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 backdrop-blur-md 
                   border-t border-white/50 z-50 bg-slate-50/60">

          <div className={`flex justify-between items-center ${isTablet ? 'h-16' : 'h-14'} 
                        px-4 ${isTablet ? 'px-8' : isMobile ? 'px-4' : 'md:px-8 xl:px-60'} text-slate-700`}>

            <p className="text-xs md:text-sm">© 2024 Glass UI. Todos os direitos reservados.</p>

            <div className="flex gap-2 md:gap-4">
              <button 
                onClick={() => openModal('privacy')}
                className={`${isTablet ? 'text-sm' : 'text-xs md:text-sm'} hover:text-slate-900 transition-colors cursor-pointer`}>
                Privacidade
              </button>
              <button 
                onClick={() => openModal('terms')}
                className={`${isTablet ? 'text-sm' : 'text-xs md:text-sm'} hover:text-slate-900 transition-colors cursor-pointer`}>
                Termos
              </button>
            </div>

          </div>

      </motion.footer>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 
                         ${isMobile ? 'w-full max-w-sm max-h-[80vh]' : isTablet ? 'w-full max-w-md max-h-[85vh]' : 'w-full max-w-lg max-h-[90vh]'} 
                         overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200/50">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  {currentContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-300/50 
                           flex items-center justify-center transition-colors"
                >
                  <span className="text-slate-600 text-lg font-medium">×</span>
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                {currentContent.content.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {item.section}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer do Modal */}
              <div className="p-6 border-t border-slate-200/50 bg-slate-50/30">
                <button
                  onClick={closeModal}
                  className="w-full bg-slate-700 text-white py-3 px-6 rounded-full 
                           hover:bg-slate-800 transition-all duration-300 
                           transform hover:scale-105 font-medium"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
