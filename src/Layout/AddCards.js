import { createCard, readDeck } from "../utils/api";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import FormCard from "./FormCard";

function AddCards({ deck, setDeck}) {
  const history = useHistory();
  const { deckId } = useParams();
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
  }, [deckId, setDeck]);

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

  function breadCrumb() {
    return (
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
    );
  }

  return (
    <>
      {breadCrumb()}
      <h1>{`${deck.name}: Add Card`}</h1>
      <FormCard
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deckId={deckId}
        cardInput={newCard}
      />
    </>
  );
}

export default AddCards;
