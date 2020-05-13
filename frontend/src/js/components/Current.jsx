import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "../util/config";
import hash from "../util/hash";
import Player from "./Player";
import '../../css/Current.css';

class Current extends Component {
    constructor() {
        super();
        this.state = {
            token: null,
            item: {
                album: {
                    images: [{url: ""}]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms: 0
            },
            is_playing: "Paused",
            progress_ms: 0
        };
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }
    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token
            });
            this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
        }
    }

    getCurrentlyPlaying(token) {
        // Make a call using the token
        $.ajax({
          url: "https://api.spotify.com/v1/me/player",
          type: "GET",
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: data => {
            this.setState({
              item: data.item,
              is_playing: data.is_playing,
              progress_ms: data.progress_ms
            });
          }
        });
      }

      render() {
        return (
          <div className="App">
            <header className="App-header">
              {!this.state.token && (
                <a
                  className="btn btn--loginApp-link"
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                  )}&response_type=token&show_dialog=true`}
                >
                  Login to Spotify
                </a>
              )}
              {this.state.token && (
                <Player
                  item={this.state.item}
                  is_playing={this.state.is_playing}
                  progress_ms={this.progress_ms}
                />
              )}
            </header>
          </div>
        );
      }

}
export default Current;