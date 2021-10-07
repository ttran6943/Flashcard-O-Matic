import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import FormCard from "./FormCard";

function EditCard({ deck, setDeck }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [card, setCard] = useState({
    id: "",
    name: "",
    description: "",
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
  }, [deckId, cardId, setDeck]);

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

  function breadCrumb() {
    return (
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
    );
  }

  return (
    <div>
      {breadCrumb()}
      <h2>Edit Card</h2>
      <FormCard
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deckId={deckId}
        cardInput={card}
      />
    </div>
  );
}

export default EditCard;
