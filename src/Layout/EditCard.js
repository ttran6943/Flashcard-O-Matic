import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [card, setCard] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [deck, setDeck] = useState({
    id: "",
    front: "",
    back: "",
    deckId: "",
  });

  useEffect(() => {
    async function getCardDeck() {
      const abortController = new AbortController();
      const cardResponse = await readCard(cardId, abortController.signal);
      const deckResponse = await readDeck(deckId, abortController.signal);
      setCard(cardResponse);
      setDeck(deckResponse);
    }
    getCardDeck();
  }, []);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  async function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span class="oi oi-home mr-1"></span>
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId}</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h2>Edit Card</h2>
        <div className="form-group">
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={card.front}
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={card.back}
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

export default EditCard;
