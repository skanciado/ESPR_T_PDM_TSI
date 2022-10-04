/* CacheValidate component */
import React from 'react';

// global.appVersion = process.env.REACT_APP_VERSION;
import {version} from '../package.json';
global.appVersion = version;


const semverGreaterThan = (versionA, versionB) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());

        const b = Number(versionsB.shift());
        
        console.log( "[CacheValidate: semverGreaterThan] a = " + a );
        console.log( "[CacheValidate: semverGreaterThan] b = " + b );

        // eslint-disable-next-line no-continue
        if (a === b) continue;
        // eslint-disable-next-line no-restricted-globals
        return a > b || isNaN(b);
    }
    return false;
}

export default class CacheValidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isLatestVersion: false,
      refreshCacheAndReload: async () => {
        if (caches) {
            const names = await caches.keys();
            await Promise.all(names.map(name => caches.delete(name)));
          }
          window.location.reload();
        },
    };
  }

  componentDidMount() {
    fetch(`/meta.json?${new Date().getTime()}`, { cache: 'no-cache' })
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;

        console.log( "[CacheValidate: componentDidMount] latestVersion  (a) = " + latestVersion );
        console.log( "[CacheValidate: componentDidMount] currentVersion (b) = " + currentVersion );

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          this.setState({ loading: false, isLatestVersion: false });
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          this.setState({ loading: false, isLatestVersion: true });
        }
      })
      .catch( error => console.error( "[CacheValidate: componentDidMount]: Fetch Error " + error ) );
  }


  render() {
    const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
    return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
  }
}
