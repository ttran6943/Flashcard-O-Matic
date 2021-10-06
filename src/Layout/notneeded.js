// import { React } from "react";
// import { Link } from "react-router-dom";
// import { deleteDeck } from "../utils/api";
// import { useHistory } from "react-router";

// function DeckList({ decks }) {
//   const history = useHistory();
//   async function handleDelete(id) {
//     if (
//       window.confirm("Delete this deck? You will not be able to recover it.")
//     ) {
//       history.go(0);
//       return await deleteDeck(id);
//     }
//   }

//   return (
//     <div className="card-deck">
//       {decks.map((deck) => (
//         <div class="col-sm-12 col-md-12 col-lg-6">
//           <div class="card col my-2">
//             <div class="card-body">
//               <div class="row">
//                 <div class="col-9">
//                   <h5 class="card-title">{`${deck.name}`}</h5>
//                 </div>
//                 <div class="col-3">
//                   <p>{`${deck.cards.length} cards`}</p>
//                 </div>
//               </div>
//               <p class="card-text">{`${deck.description}`}</p>
//               <Link to={`/decks/${deck.id}`}>
//                 <button class="btn btn-secondary">
//                   <span class="oi oi-eye mr-2"></span>View
//                 </button>
//               </Link>
//               <Link to={`decks/${deck.id}/study`}>
//                 <button class="btn btn-primary mx-1">
//                   <span class="oi oi-book mr-2"></span>Study
//                 </button>
//               </Link>
//               {/* TO BE FIXED  <Link to="/"> */}
//               <button
//                 onClick={() => handleDelete(deck.id)}
//                 class="btn btn-danger float-right"
//               >
//                 <span class="oi oi-trash"></span>
//               </button>
//               {/* </Link> */}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DeckList;
