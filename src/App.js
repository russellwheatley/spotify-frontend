import React from 'react';
import a2a from 'a2a';
import { toast } from 'react-toastify';
import api from './api';
import './app.css';
import Track from './type/Track';
import Album from './type/Album';
import Artist from './type/Artist';
import Playlist from './type/Playlist';

class App extends React.Component {
  constructor() {
    super();
    this.state = { type: App.types[0], query: '', items: [] };
    this.brokenImg =
      'https://images.unsplash.com/photo-1441804238730-210ce1c2cc00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
  }

  static types = ['track', 'album', 'artist', 'playlist'];

  changeQuery = ({ target }) => {
    this.setState({ query: target.value });
  };

  changeType = async ({ target }) => {
    const { query, items } = this.state;
    if (query.length) {
      const [err, { data = [] }] = await a2a(api.search(query, target.value));
      this.setState({ type: target.value, items: data });
      return;
    } else if (items.length) {
      this.setState({ type: target.value });
      return;
    }
    this.setState({ type: target.value });
  };

  onClick = async () => {
    const { type, query } = this.state;
    if (!query.length) {
      toast.info('Please search for an artist, album, playlist, etc..');
      return;
    }
    const [err, { data = [] }] = await a2a(api.search(query, type));

    if (err) {
      console.error(err);
      toast.warn(
        "Ladies and gentleman, we're experiencing technical difficulties..."
      );
      return;
    }
    this.setState({ items: data });
  };

  render() {
    const { type } = this.state;
    return (
      <div className="app">
        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" />
        <div className="container">
          <div>
            <input onChange={this.changeQuery} />
            <select onChange={this.changeType}>
              {App.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button onClick={this.onClick}>SEARCH</button>
          </div>
        </div>
        <div className="list">
          {this.state.items.map((item) => {
            return (
              <div key={item.id} className="item">
                {type === 'track' && (
                  <Track item={item} brokenImg={this.brokenImg} />
                )}
                {type === 'album' && (
                  <Album item={item} brokenImg={this.brokenImg} />
                )}
                {type === 'playlist' && (
                  <Playlist item={item} brokenImg={this.brokenImg} />
                )}
                {type === 'artist' && (
                  <Artist item={item} brokenImg={this.brokenImg} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
