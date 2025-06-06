import React from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) { 
        onSearch(searchQuery);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Buscar restaurante por nombre..."
          value={searchQuery}
          onChange={handleInputChange}
          aria-label="Buscar restaurante"
        />
        <Button variant="outline-primary" type="submit">
          Buscar
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;