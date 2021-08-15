import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { api } from './services/api';
import { GenreResponseProps } from './interface/genreResponseProps';
import { MovieProps } from './interface/moviePropos';
import { Content } from './components/Content';
import { Header } from './components/Header';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <SideBar 
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId} 
      />
      <div className="container">
        <Header 
          selectedGenre={selectedGenre}
        />
        <Content 
          movies={movies}
        />
      </div>
    </div>
  )
}