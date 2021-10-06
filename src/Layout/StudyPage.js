import React, { useState, useEffect } from "react";
import { readCard, readDeck } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function StudyPage() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState([]);
  const [cardNum, setCardNum] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const history = useHistory();

  const { deckId } = useParams();
  useEffect(() => {
    async function getDeck() {
      const abortController = new AbortController();

      const decksResponse = await readDeck(deckId, abortController.signal);
      setDeck(decksResponse);
      setCard(decksResponse.cards);
    }
    getDeck();
  }, []);

  function isEnoughCards() {
    if (card.length < 3) {
      return (
        <>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {`${card.length}`}{" "}
            cards in the deck.
          </p>
          <div class="row">
            {/* TODO: LINK TO ADD CARD */}
            <Link to={`decks/${deckId}/cards/new`}>
              <button class="btn btn-primary my-2 ml-3">
                <span class="oi oi-plus mr-2"></span>
                Add Cards
              </button>
            </Link>
          </div>
        </>
      );
    } else if (card.length >= 3) {
      return (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{`Card ${cardNum + 1} of ${
              card.length
            }`}</h5>
            {displayCardFrontBack(isFront, cardNum)}
            <button onClick={handleFlip} class="btn btn-secondary mr-2">
              Flip
            </button>
            {nextButton(isFront)}
          </div>
        </div>
      );
    }
  }

  function nextButton(isFront) {
    if (isFront == true) {
      return null;
    } else if (isFront == false) {
      return (
        <button onClick={handleNext} className="btn btn-primary">
          Next
        </button>
      );
    }
  }

  function handleFlip() {
    if (isFront == true) {
      setIsFront(false);
    } else if (isFront == false) {
      setIsFront(true);
    }
  }

  function handleNext() {
    if (cardNum + 2 <= card.length) {
      setIsFront(true);
      setCardNum(cardNum + 1);
    } else if (
      cardNum + 2 > card.length &&
      window.confirm(
        "Would you like to restart from the beginning? Click 'cancel' to return to the home page."
      )
    ) {
      setCardNum(0);
      setIsFront(true);
    } else {
      history.push("/");
    }
  }

  function displayCardFrontBack(isFront, cardNum) {
    if (card.length > 1) {
      if (isFront == true) {
        return <p class="card-text">{card[cardNum].front}</p>;
      } else if (isFront == false) {
        return <p class="card-text">{card[cardNum].back}</p>;
      }
    }
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
          <li class="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <div class="col" id="card-display">
        <h1>{`${deck.name}: Study`}</h1>
        {isEnoughCards()}
      </div>
    </>
  );
}

export default StudyPage;
