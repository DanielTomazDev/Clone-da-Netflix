import { useState } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

const TrailerButton = ({ movie, className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0);

  const handleTrailerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrailerIndex(0);
  };

  const getYouTubeSearchUrl = () => {
    const movieTitle = movie?.Title || movie?.title || movie?.name || 'filme';
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)} trailer oficial`;
  };

  // Verifica se há trailers disponíveis do TMDB
  const hasTrailers = movie?.Trailers && movie.Trailers.length > 0;
  const youtubeTrailers = hasTrailers ? movie.Trailers.filter(t => t.site === 'YouTube') : [];
  const currentTrailer = youtubeTrailers[selectedTrailerIndex];

  return (
    <>
      <button
        onClick={handleTrailerClick}
        className={`
          flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md
          hover:bg-gray-200 transition-colors font-medium
          ${className}
        `}
      >
        <FaPlay size={16} />
        Assistir Trailer{hasTrailers && youtubeTrailers.length > 1 ? 's' : ''}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                {movie?.Title || movie?.title || movie?.name} - Trailer{hasTrailers && youtubeTrailers.length > 1 ? 's' : ''}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {currentTrailer ? (
                <div>
                  {/* Player de vídeo */}
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentTrailer.key}`}
                      title={currentTrailer.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  {/* Informações do trailer */}
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-300 text-sm">
                      {currentTrailer.name}
                    </p>
                    {youtubeTrailers.length > 1 && (
                      <p className="text-gray-400 text-xs">
                        {selectedTrailerIndex + 1} de {youtubeTrailers.length}
                      </p>
                    )}
                  </div>

                  {/* Seletor de trailers */}
                  {youtubeTrailers.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {youtubeTrailers.map((trailer, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTrailerIndex(index)}
                          className={`p-2 rounded text-xs transition-colors ${
                            index === selectedTrailerIndex
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {trailer.name.length > 30 
                            ? trailer.name.substring(0, 30) + '...' 
                            : trailer.name
                          }
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg mb-4">
                    Trailer não disponível no momento
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Você pode buscar o trailer diretamente no YouTube
                  </p>
                  <a 
                    href={getYouTubeSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
                  >
                    Buscar no YouTube
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerButton;
