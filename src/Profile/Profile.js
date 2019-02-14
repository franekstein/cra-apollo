import React from "react";
import { withApollo } from "react-apollo";

import { Me } from "../Me";
import { LikedShow } from "./LikedShow";
import { removeToken } from "../utils";

import "./style.css";
const showIds = new Array(8).fill(0).map((_, i) => i + 1);

class ProfileComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  handleLogout = async () => {
    const { client } = this.props;
    this.setState({ isLoading: true });

    try {
      removeToken();
      await client.resetStore();
    } catch (err) {
      //
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Me>
        {({ loading, error, data }) => {
          if (error || (data && data.me === null)) return "Error";
          if (data && data.me) {
            const { me } = data;
            return (
              <div>
                <h1>Profile</h1>
                <div className="profile-info">
                  <div>
                    <b>Name:</b> {me.name}
                  </div>
                  <button
                    type="button"
                    disabled={isLoading}
                    className="btn btn-primary"
                    onClick={this.handleLogout}
                  >
                    Log out
                  </button>
                </div>

                <h3>Liked shows</h3>
                <ul className="profile-shows">
                  {showIds.map(id => (
                    <li key={id}>
                      <LikedShow id={id} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        }}
      </Me>
    );
  }
}

export const Profile = withApollo(ProfileComp);
