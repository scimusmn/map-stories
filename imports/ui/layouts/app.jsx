import React from 'react';
import { Navigation } from '../components/navigation.jsx';

// export const App = ({ children }) => (
//   <div>
//     <Navigation />
//     { children }
//   </div>
// );
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <h3>App component</h3>
      </div>
    );

  }

}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  place: React.PropTypes.object,      // all places visible to the current user
};
