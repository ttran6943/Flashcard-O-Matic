import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router";

function CreateDeck() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({
    name: "",
    description: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  }

  function handleChange({ target }) {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  }

  function breadCrumb() {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">
              <span class="oi oi-home mr-1" />
              Home
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <>
      {breadCrumb()}
      <h1>Create Deck</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label for="Deck Name">Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
            id="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={newDeck.name}
          />
        </div>
        <div className="form-group">
          <label for="Deck Name">Description</label>
          <textarea
            class="form-control"
            id="desciption"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            type="text"
            onChange={handleChange}
            value={newDeck.description}
          />
        </div>
        <Link to="/">
          <button className="btn btn-secondary mr-2">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
export default CreateDeck;
