import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";
import { useWeather } from "../components/WeatherContext";
import { useEffect, useState } from "react";

export default function FormPage() {
  const navigate = useNavigate();
  const { name, setName } = useWeather();
  const [existingUsers, setExistingUsers] = useState<string[]>([]);

  useEffect(() => {
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );
    const users = Object.keys(allUserFavorites).filter(
      (user) => user !== "Anonymous",
    );
    setExistingUsers(users);
  }, []);

  const deleteUser = (userToDelete: string) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur ${userToDelete} et tous ses favoris ?`,
      )
    ) {
      const allUserFavorites = JSON.parse(
        localStorage.getItem("userFavorites") || "{}",
      );

      delete allUserFavorites[userToDelete];

      localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));

      setExistingUsers((prev) => prev.filter((user) => user !== userToDelete));

      alert(`L'utilisateur ${userToDelete} a été supprimé avec succès.`);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("currentUser", name);
    navigate("/Weather");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSecondaryButton = () => {
    localStorage.setItem("currentUser", "Anonymous");
    setName("Anonymous");
    navigate("/Weather");
  };

  const selectExistingUser = (selectedUser: string) => {
    localStorage.setItem("currentUser", selectedUser);
    setName(selectedUser);
    navigate("/Weather");
  };

  return (
    <section className="form-container">
      <h1>Bienvenue sur Weather App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        <label htmlFor="name">Votre nom</label>
        <input
          type="text"
          id="name"
          className="search-input"
          value={name}
          onChange={onChange}
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>

        {existingUsers.length > 0 && (
          <div className="existing-users">
            <p>Ou sélectionnez un utilisateur existant :</p>
            <div className="users-list">
              {existingUsers.map((user) => (
                <div key={user} className="user-card">
                  <button
                    type="button"
                    className="user-button"
                    onClick={() => selectExistingUser(user)}
                  >
                    {user}
                  </button>
                  <button
                    type="button"
                    className="delete-user-button"
                    onClick={() => deleteUser(user)}
                    aria-label={`Supprimer l'utilisateur ${user}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          className="secondary-button"
          onClick={handleSecondaryButton}
        >
          Je ne veux pas donner un nom
        </button>
      </form>
    </section>
  );
}
