import { deleteCard, readDeck, deleteDeck } from "../utils/api";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

function DeckPage() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);

  useEffect(() => {
    async function getDeck() {
      const abortController = new AbortController();

      const decksResponse = await readDeck(deckId, abortController.signal);
      setDeck(decksResponse);
      setCard(decksResponse.cards);
    }
    getDeck();
  }, []);

  async function handleDeleteCard(cardId) {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      history.go(0);
      return await deleteCard(cardId);
    }
  }

  async function handleDelete() {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.replace("/");
      return await deleteDeck(deck.id);
    }
  }

  function breadCrumb() {
    return (
      <div className="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">
                <span class="oi oi-home mr-1"></span>
                Home
              </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
    );
  }

  function displayCards() {
    if (card.length == 0) {
      return null;
    } else {
      return (
        <div>
          {card.map((card) => (
            <div className="col-12 float-right">
              <div className="card-body col">
                <div className="row">
                  <div className="col-6">
                    <div className="row-3">{card.front}</div>
                  </div>
                  <div className="col-6">
                    <div className="row-3">{card.back}</div>
                    <div className="row float-right my-2">
                      <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                        <button className="btn btn-secondary">
                          <span class="oi oi-pencil"></span>
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger ml-3"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <span class="oi oi-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <>
      <div className="row">{breadCrumb()}</div>
      <div className="row">
        <div className="col">
          <h5>{deck.name}</h5>
          <p>{deck.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          <Link to={`/decks/${deckId}/edit`}>
            <button className="btn btn-secondary mr-2">
              <span class="oi oi-pencil mr-1"></span>
              Edit
            </button>
          </Link>
          <Link to={`/decks/${deckId}/study`}>
            <button className="btn btn-primary mr-2">
              <span class="oi oi-book mr-1"></span>
              Study
            </button>
          </Link>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">
              <span class="oi oi-plus mr-1"></span>
              Add Cards
            </button>
          </Link>
        </div>
        <div className="col-3">
          <button
            onClick={() => handleDelete(deck.id)}
            class="btn btn-danger float-right"
          >
            <span class="oi oi-trash"></span>
          </button>
        </div>
      </div>
      <h1 className="mt-3">Cards</h1>
      <div className="row">{displayCards()}</div>
    </>
  );
}

export default DeckPage;
