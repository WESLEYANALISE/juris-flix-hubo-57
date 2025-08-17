import tiktokIcon from '@/assets/tiktok-icon.png';

export const SocialMediaFooter = () => {
  return (
    <div className="bg-card border-t border-border py-6 mt-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Siga-nos nas redes sociais
          </h3>
          <div className="flex justify-center items-center">
            <a
              href="https://www.tiktok.com/@direitopremium?_t=ZM-8yrWbOlcTu1&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-black hover:bg-black/90 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <img 
                src={tiktokIcon} 
                alt="TikTok" 
                className="w-6 h-6"
              />
              <span className="font-medium">@direitopremium</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};