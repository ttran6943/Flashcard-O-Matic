import { createCard, readDeck } from "../utils/api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";

function AddCards() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [newCard, setNewCard] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      const responseReadDeck = await readDeck(deckId, abortController.signal);
      setDeck(responseReadDeck);
    }
    loadDeck();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(
      deckId,
      { ...newCard },
      abortController.signal
    );
    history.go(0);
    return response;
  }

  function handleChange({ target }) {
    setNewCard({ ...newCard, [target.name]: target.value });
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">
              <span class="oi oi-home mr-1"></span>
              Home
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <a href={`/decks/${deckId}/cards`}>{`${deck.name} `}</a>
          </li>
          <li class="breadcrumb-item active" areia-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{`${deck.name}: Add Card`}</h1>
      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="form-group">
            <label for="Deck Name">Front</label>
            <textarea
              class="form-control"
              id="front"
              name="front"
              rows="3"
              placeholder="Front side of the card"
              type="text"
              onChange={handleChange}
              value={newCard.front}
            />
          </div>
          <div className="form-group">
            <label for="Deck Name">Back</label>
            <textarea
              class="form-control"
              id="back"
              name="back"
              rows="3"
              placeholder="Back side of the card"
              type="text"
              onChange={handleChange}
              value={newCard.back}
            />
          </div>
          <div>
            <Link to={`decks/${deckId}`}>
              <button className="btn btn-secondary mr-2">Done</button>
            </Link>
            <button className="btn btn-primary mr-2">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCards;
