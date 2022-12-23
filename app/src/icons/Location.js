import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `<svg width="25" height="25" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.4 0C1.9716 0 0 1.9716 0 4.4C0 5.5808 0.6576 7.038 1.4672 8.3536C2.6392 10.258 4.104 11.8692 4.104 11.8692C4.18 11.9524 4.2872 12 4.4 12C4.5128 12 4.62 11.9524 4.696 11.8692C4.696 11.8692 6.1608 10.258 7.3328 8.3536C8.1424 7.038 8.8 5.5808 8.8 4.4C8.8 1.9716 6.8284 0 4.4 0ZM4.4 2.4C3.296 2.4 2.4 3.296 2.4 4.4C2.4 5.504 3.296 6.4 4.4 6.4C5.504 6.4 6.4 5.504 6.4 4.4C6.4 3.296 5.504 2.4 4.4 2.4Z" fill="#043E90"/>
</svg>
`;

const LocationIcon = () => {
  return <SvgXml xml={xml} />;
};

export default LocationIcon;
