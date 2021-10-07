import React, { useState } from "react";
import { Switch, Route } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import DeckPage from "./DeckPage";
import AddCards from "./AddCards";
import EditCard from "./EditCard";
import StudyPage from "./StudyPage";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";

function Layout() {
  const [deck, setDeck] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard deck={deck} setDeck={setDeck} />
          </Route>
          <Route path={`/decks/:deckId/cards/new`}>
            <AddCards deck={deck} setDeck={setDeck} />
          </Route>
          <Route path={`/decks/:deckId/edit`}>
            <EditDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route path={`/decks/:deckId/study`}>
            <StudyPage deck={deck} setDeck={setDeck} />
          </Route>
          <Route path={`/decks/new`}>
            <CreateDeck />
          </Route>
          <Route path={`/decks/:deckId`}>
            <DeckPage deck={deck} setDeck={setDeck} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
