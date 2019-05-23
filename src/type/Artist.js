import React from 'react';
import idx from 'idx';

function Artist({ item, brokenImg }) {
  const img = idx(item, ($) => $.images[0].url) || brokenImg;
  const link = idx(item, ($) => $.external_urls.spotify);
  const followers = idx(item, ($) => $.followers.total);
  return (
    <>
      <img className="img" src={img} />
      <div className="list-item">
        {item.name && <h2>{item.name}</h2>}
        {link && (
          <a target="_blank" rel="noopener noreferrer" href={link}>
            Open Spotify artist profile
          </a>
        )}
        {Array.isArray(item.genres) && (
          <div className="genres">
            {item.genres.map((genre) => (
              <span key={genre}>
                {' '}
                <i>{genre}&nbsp;&nbsp;&nbsp;</i>
              </span>
            ))}
          </div>
        )}
        {followers && <span>followed by {followers} people</span>}
      </div>
    </>
  );
}

export default Artist;
