import React from 'react';
import idx from 'idx';
import './type.css';

function Playlist({ item, brokenImg }) {
  const img = idx(item, ($) => $.images[0].url) || brokenImg;
  const playlist = idx(item, ($) => $.external_urls.spotify);
  const owner = idx(item, ($) => $.owner.display_name);
  const name = idx(item, ($) => $.name);
  const total = idx(item, ($) => $.tracks.total);
  return (
    <>
      <img className="img" src={img} />
      <div className="list-item">
        {name && <h2>{name}</h2>}
        {owner && (
          <span>
            by <i>{owner}</i>
          </span>
        )}
        {playlist && (
          <a target="_blank" rel="noopener noreferrer" href={playlist}>
            Open Spotify playlist
          </a>
        )}
        {total && <span>total tracks: {total}</span>}
      </div>
    </>
  );
}

export default Playlist;
