import { useEffect, useState } from "react";
import "../styles/Favorites.css";
import InputSearch from "../components/InputSearch";
import Navbar from "../components/NavBar";

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
  const currentUser = localStorage.getItem("currentUser") || "Anonymous";

  useEffect(() => {
    // Charger les favoris spécifiques à l'utilisateur
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );
    const userFavorites = allUserFavorites[currentUser] || [];
    setFavorites(userFavorites);
  }, [currentUser]);

  const removeFavorite = (name: string) => {
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );

    // Filtrer les favoris de l'utilisateur actuel
    allUserFavorites[currentUser] = allUserFavorites[currentUser].filter(
      (fav: FavoritesTypes) => fav.name !== name,
    );

    // Mettre à jour le localStorage
    localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));

    // Mettre à jour l'état local
    setFavorites(allUserFavorites[currentUser]);
    alert(`${name} a été supprimée des favoris !`);
  };

  return (
    <>
      <InputSearch />
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
      <Navbar />
    </>
  );
}
