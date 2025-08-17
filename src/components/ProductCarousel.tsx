import { useProdutos } from '@/hooks/useProdutos';
import { useEffect, useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
export const ProductCarousel = () => {
  const {
    data: produtos,
    isLoading
  } = useProdutos();
  const { setCurrentFunction } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledProdutos, setShuffledProdutos] = useState([]);

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Embaralhar produtos quando carregados
  useEffect(() => {
    if (produtos && produtos.length > 0) {
      setShuffledProdutos(shuffleArray(produtos));
    }
  }, [produtos]);

  // Função para navegar para Biblioteca de Clássicos
  const handleBookClick = () => {
    setCurrentFunction('Biblioteca de Clássicos');
  };

  // Auto-scroll mais lento e suave
  useEffect(() => {
    if (!shuffledProdutos || shuffledProdutos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        // Quando chegar no final, volta para o início
        return prevIndex >= shuffledProdutos.length - 1 ? 0 : prevIndex + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [shuffledProdutos]);
  if (isLoading) {
    return <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-r from-store-primary/10 to-premium-primary/10 rounded-2xl flex items-center justify-center animate-pulse shadow-lg">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-store-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Carregando produtos incríveis...</p>
        </div>
      </div>;
  }
  if (!shuffledProdutos || shuffledProdutos.length === 0) {
    return <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-r from-store-primary/10 to-premium-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
        <p className="text-sm text-muted-foreground">Produtos em breve...</p>
      </div>;
  }
  return <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-store-primary/5 to-premium-primary/5 shadow-lg sm:shadow-2xl border">
      {/* Título do Carrossel */}
      <div className="text-center py-3 sm:py-4 md:py-6 bg-gradient-to-r from-store-primary/10 to-premium-primary/10">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-legal mb-1 sm:mb-2">📚 Nossos Livros em Destaque</h2>
        <p className="text-xs sm:text-sm text-muted-foreground px-2 sm:px-4">Livros selecionados especialmente para seus estudos</p>
      </div>
      
      {/* Carrossel de Imagens - Agora tocável */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-72 xl:h-80 overflow-hidden group">
        {/* Botões de navegação */}
        <button onClick={() => setCurrentIndex(prev => prev === 0 ? shuffledProdutos.length - 1 : prev - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button onClick={() => setCurrentIndex(prev => prev === shuffledProdutos.length - 1 ? 0 : prev + 1)} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex h-full px-4 sm:px-6 gap-4 sm:gap-6">
          {shuffledProdutos.map((produto, index) => <div key={produto.id} className={`flex-shrink-0 transition-all duration-1000 ease-in-out cursor-pointer ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`} style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${100 / shuffledProdutos.length}%`,
          minWidth: '140px',
          maxWidth: '180px'
        }} onClick={handleBookClick}>
              <div className="relative group h-full w-full max-w-[160px] mx-auto">
                <img src={produto.produtos} alt={`Produto ${produto.id}`} className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 aspect-[3/4]" style={{
              aspectRatio: '3/4'
            }} onError={e => {
              console.log('Erro ao carregar imagem:', produto.produtos);
              e.currentTarget.src = '/placeholder.svg';
            }} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2">
                      <span className="text-xs sm:text-sm font-bold">Produto #{produto.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Indicadores - Mostram apenas produtos disponíveis */}
      <div className="flex justify-center py-3 sm:py-4 space-x-1 sm:space-x-2">
        {shuffledProdutos.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-store-primary shadow-lg scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />)}
      </div>
    </div>;
};