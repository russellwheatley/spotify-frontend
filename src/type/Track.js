import React from 'react';
import idx from 'idx';
import './type.css';

function Track({ item, brokenImg }) {
  const img = idx(item, ($) => $.album.images[0].url) || brokenImg;
  const link = idx(item, ($) => $.external_urls.spotify);
  return (
    <>
      <img className="img" src={img} />
      <div className="list-item">
        {item.name && <h2>{item.name}</h2>}
        {link && (
          <a target="_blank" rel="noopener noreferrer" href={link}>
            Open Spotify track
          </a>
        )}
        {Array.isArray(item.artists) && (
          <div>
            by &nbsp;
            {item.artists.map((artist) => (
              <span key={artist.name}>
                {' '}
                <i>{artist.name}&nbsp;&nbsp;&nbsp;</i>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Track;
