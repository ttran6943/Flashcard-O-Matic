import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const readDeckResponse = await readDeck(deckId, abortController.signal);
      setDeck(readDeckResponse);
    }
    loadDeck();
  }, []);

  function breadCrumb() {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">
                <span class="oi oi-home mr-1"></span>
                Home
              </a>
            </li>
            <li class="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  function formInputs() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Front</label>
            <textarea
              id="name"
              name="name"
              className="form-control"
              onChange={handleChange}
              type="text"
              value={deck.name}
            />
          </div>
          <div className="form-group">
            <label>Back</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              onChange={handleChange}
              type="text"
              value={deck.description}
            />
          </div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary mr-2">Cancel</button>
          </Link>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>{breadCrumb()}</div>
      <h2>Edit Deck</h2>
      <div>{formInputs()}</div>
    </>
  );
}

export default EditDeck;
