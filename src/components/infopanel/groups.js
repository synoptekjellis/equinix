import _ from 'lodash';

import {
  AWS_ICON,
  AWS_LOGO,
  AZURE_ICON,
  AZURE_LOGO,
  CLIENT_ICON,
  CLIENT_LOGO_MENU,
  GOOGLE_ICON,
  GOOGLE_LOGO,
  ORACLE_ICON,
  ORACLE_LOGO
} from '../assets';

const TEST_BLACKLIST = ['Oracle Cloud Locations'];

const groups = [
  {
    id: 'svc_location',
    name: 'SVC Location',
    logo: CLIENT_LOGO_MENU,
    icon: CLIENT_ICON
  },
  {
    id: 'google_cloud_locations',
    name: 'Google Cloud Locations',
    logo: GOOGLE_LOGO,
    icon: GOOGLE_ICON
  },
  {
    id: 'aws_locations',
    name: 'AWS Locations',
    logo: AWS_LOGO,
    icon: AWS_ICON
  },
  {
    id: 'azure_locations',
    name: 'Azure Locations',
    logo: AZURE_LOGO,
    icon: AZURE_ICON
  },
  {
    id: 'oracle_cloud_locations',
    name: 'Oracle Cloud Locations',
    logo: ORACLE_LOGO,
    icon: ORACLE_ICON
  }
];

function whitelistGroups() {
  return _.filter(groups, g => {
    return TEST_BLACKLIST.indexOf(g.name) === -1;
  });
}

export default whitelistGroups();
