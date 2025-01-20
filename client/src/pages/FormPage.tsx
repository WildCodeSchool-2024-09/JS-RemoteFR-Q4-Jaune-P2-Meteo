import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";
import { useWeather } from "../components/WeatherContext";

export default function FormPage() {
  const navigate = useNavigate();
  const { name, setName } = useWeather();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/Weather");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSecondaryButton = () => {
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
