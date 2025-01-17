import { useEffect, useState } from "react";
import "../styles/Favorites.css";

interface FavoritesTypes {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export default function Favorites() {
  const [favorites, setFavorites] = useState([] as FavoritesTypes[]);

  useEffect(() => {
    // charge les fav depuis le localStorage
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(storedFavorites);
  }, []);

  // supp un favori et met à jour les fav
  const removeFavorite = (name: string) => {
    const updateFavorites = favorites.filter((fav) => fav.name !== name);
    setFavorites(updateFavorites);
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    alert(`${name} a été supprimée des favoris !`);
  };

  return (
    <>
      <h1>Mes favoris</h1>
      <section className="favorites-section">
        {favorites.length === 0 ? (
          <p>Vous n'avez pas encore de favoris.</p>
        ) : (
          <div className="favorites-container">
            {favorites.map((fav) => (
              <div key={fav.name} className="favorite-card">
                <h2>{fav.name}</h2>
                <p>Température : {Math.round(fav.main.temp)}°C</p>
                <p>Vent : {Math.round(fav.wind.speed)} km/h</p>
                <p>Humidité : {Math.round(fav.main.humidity)}%</p>
                <button
                  type="button"
                  className="remove-favorite-button"
                  onClick={() => removeFavorite(fav.name)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
