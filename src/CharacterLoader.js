import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles.css";

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);

  // Función para cargar personajes desde la API
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      setCharacters(response.data.results);
      setLoading(false);
      setShowCharacters(true); // Mostrar personajes después de cargarlos
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el clic en el campo de búsqueda
  const handleSearchClick = () => {
    setIsEditing(true);
  };

  // Función para manejar el clic en el botón de cargar personajes
  const handleLoadCharactersClick = () => {
    if (!loading) {
      setShowCharacters(false);
      setCharacters([]); // Limpiar personajes al hacer clic en cargar
      // Lógica adicional si es necesario antes de cargar los personajes nuevamente
      fetchCharacters();
    }
  };

  return (
    <div className="contenedor">
      <Container>
        <h1>Personajes de Star Wars</h1>
        {/* Formulario de búsqueda en tiempo real */}
        <form className="search-form">
          <label
            htmlFor="search"
            className={`search-label ${isEditing || searchTerm !== "" ? "editing" : ""}`}
          >
            {isEditing || searchTerm !== "" ? "Ingrese el término de búsqueda" : "Buscar personaje"}
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
          />
        </form>
        <button
          className="btn btn-primary"
          onClick={handleLoadCharactersClick}
          disabled={loading}
        >
          {loading ? "Cargando Personajes..." : "Cargar Personajes"}
        </button>
        {showCharacters && (
          <Row>
            {characters.map((character, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="tarjeta">
                  <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text>
                      <strong>Género:</strong> {character.gender}
                      <br />
                      <strong>Año de nacimiento:</strong> {character.birth_year}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default CharacterLoader;
