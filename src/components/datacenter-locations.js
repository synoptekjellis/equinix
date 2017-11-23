import _ from 'lodash';

const data = [
  {
    address: '180 Peachtree Street NW Atlanta, GA 30303',
    latitude: 33.758567,
    longitude: -84.387874,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'AT1',
    isAgent: true
  },
  {
    address: '1905 Lunt Avenue Elk Grove, IL 60007',
    latitude: 42.001171,
    longitude: -87.954882,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'CH3',
    isAgent: true
  },
  {
    address: '1950 North Stemmons Freeway Dallas, TX 75207',
    latitude: 32.800703,
    longitude: -96.81919,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'DA6',
    isAgent: true
  },
  {
    address: '21721 Filigree Court Ashburn, VA 20147',
    latitude: 39.015023,
    longitude: -77.45861,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'DC6',
    isAgent: true
  },
  {
    address: '1920 East Maple Avenue El Segundo, CA 90245',
    latitude: 33.926046,
    longitude: -118.394061,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'LA3',
    isAgent: true
  },
  {
    address: '800 Secaucus Road Secaucus, NJ 07094',
    latitude: 40.778738,
    longitude: -74.071541,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'NY5',
    isAgent: true
  },
  {
    address: '2020 Fifth Avenue Seattle, WA 98121',
    latitude: 47.614429,
    longitude: -122.339749,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'SE3',
    isAgent: true
  },
  {
    address: '9 Great Oaks Boulevard San Jose, CA 95119',
    latitude: 37.242004,
    longitude: -121.781706,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'SV5',
    isAgent: true
  },
  {
    address: 'Science Park 610 1098 XH Amsterdam Netherlands',
    latitude: 52.354925,
    longitude: 4.96096,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'AM3',
    isAgent: true
  },
  {
    address: 'Lärchenstrasse 110 Frankfurt 65933 Germany',
    latitude: 50.097939,
    longitude: 8.587964,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'FR4',
    isAgent: true
  },
  {
    address:
      '8 Buckingham Avenue, Slough Trading Estate Slough Berkshire SL1 4AX United Kingdom',
    latitude: 51.522124,
    longitude: -0.62975,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'LD5',
    isAgent: true
  },
  {
    address:
      'Unit 1703 - 04, 17/F Kerry Warehouse (Tsuen Wan), 3 Shing Yiu Street, Kwai Chung, N.T., Hong Kong',
    latitude: 22.362497,
    longitude: 114.119078,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'HK2',
    isAgent: true
  },
  {
    address:
      'Nishi Shinsaibashi Building 1-26-1 Shinmachi Nishi-ku, Osaka City, Osaka, Japan 550-0013',
    latitude: 34.675774,
    longitude: 135.495551,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'OS1',
    isAgent: true
  },
  {
    address: '15 Pioneer Walk, Singapore 627753',
    latitude: 1.321502,
    longitude: 103.695359,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'SG2',
    isAgent: true
  },
  {
    address: '200 Bourke Road, Alexandria, Sydney NSW 2015 Australia',
    latitude: -33.918205,
    longitude: 151.189364,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'SY4',
    isAgent: true
  },
  {
    address:
      'North Tower, Otematchi Financial City, Otemachi, 1-9-5, Chiyoda-ku, Tokyo, Japan 100-0004',
    latitude: 35.687654,
    longitude: 139.76577,
    type: 'SVC Location',
    city_state: null,
    country: null,
    region: null,
    notes: '',
    name: 'TY4',
    isAgent: true
  },
  {
    latitude: 46.813405,
    longitude: -71.207652,
    type: 'Azure Locations',
    city_state: 'Quebec City',
    country: 'Canada',
    region: 'Canada East',
    notes: 'Probably lease of whole space?',
    name: 'Canada East',
    isAgent: false
  },
  {
    latitude: 43.651921,
    longitude: -79.382271,
    type: 'Azure Locations',
    city_state: 'Toronto',
    country: 'Canada',
    region: 'Canada Central',
    notes: 'Probably lease of whole space?',
    name: 'Canada Central',
    isAgent: false
  },
  {
    latitude: 39.021103,
    longitude: -77.455418,
    type: 'Azure Locations',
    city_state: 'Northern Virginia',
    country: 'USA',
    region: 'East US',
    notes: 'Probably various wholesale leases in Ashburn/Sterling/Reston area?',
    name: 'East US',
    isAgent: false
  },
  {
    latitude: 36.677055,
    longitude: -78.376831,
    type: 'Azure Locations',
    city_state: 'Boydton, Virginia',
    country: 'USA',
    region: 'East US 2',
    notes: 'Exact Location',
    name: 'East US 2',
    isAgent: false
  },
  {
    latitude: 41.539845,
    longitude: -93.824348,
    type: 'Azure Locations',
    city_state: 'West Des Moines, Iowa',
    country: 'USA',
    region: 'Central US',
    notes: 'Exact Location',
    name: 'Central US',
    isAgent: false
  },
  {
    latitude: 41.922297,
    longitude: -87.918375,
    type: 'Azure Locations',
    city_state: 'Northlake, Illinois',
    country: 'USA',
    region: 'North Central US',
    notes: 'Exact Location',
    name: 'North Central US',
    isAgent: false
  },
  {
    latitude: 29.479869,
    longitude: -98.692523,
    type: 'Azure Locations',
    city_state: 'San Antonio, Texas',
    country: 'USA',
    region: 'South Central US',
    notes: 'Exact Location',
    name: 'South Central US',
    isAgent: false
  },
  {
    latitude: 41.124647,
    longitude: -104.898599,
    type: 'Azure Locations',
    city_state: 'Cheyenne, Wyoming',
    country: 'USA',
    region: 'West Central US',
    notes:
      'Exact Location, Per http://cheyenneleads.org/doing-business-here/available-sites/',
    name: 'West Central US',
    isAgent: false
  },
  {
    latitude: 37.35345,
    longitude: -121.955477,
    type: 'Azure Locations',
    city_state: 'Bay Area, California',
    country: 'USA',
    region: 'West US',
    notes: 'Probably various wholesale leases in Santa Clara area?',
    name: 'West US',
    isAgent: false
  },
  {
    latitude: 47.237593,
    longitude: -119.879444,
    type: 'Azure Locations',
    city_state: 'Quincy, Washington',
    country: 'USA',
    region: 'West US 2',
    notes:
      'This is a guess, but Microsoft has a large data center here. More info: http://www.zdnet.com/article/photos-a-tour-inside-one-of-microsofts-cloud-data-centers/',
    name: 'West US 2',
    isAgent: false
  },
  {
    latitude: 53.324171,
    longitude: -6.452279,
    type: 'Azure Locations',
    city_state: 'Dublin',
    country: 'Ireland',
    region: 'North Europe',
    notes: 'Exact Location',
    name: 'North Europe',
    isAgent: false
  },
  {
    latitude: 52.762827,
    longitude: 5.038841,
    type: 'Azure Locations',
    city_state: 'Middenmeer',
    country: 'Netherlands',
    region: 'West Europe',
    notes:
      'Exact Location, Per http://www.datacenterdynamics.com/content-tracks/design-build/microsofts-2bn-netherlands-data-center-revealed/96753.fullarticle',
    name: 'West Europe',
    isAgent: false
  },
  {
    latitude: 51.481498,
    longitude: -3.179051,
    type: 'Azure Locations',
    city_state: 'Cardiff',
    country: 'UK',
    region: 'UK West',
    notes:
      'Wholesale leased, per https://www.theregister.co.uk/2017/05/04/microsoft_azure_capacity_woes_hit_uk_customers/',
    name: 'UK West',
    isAgent: false
  },
  {
    latitude: 51.506914,
    longitude: -0.127831,
    type: 'Azure Locations',
    city_state: 'London',
    country: 'UK',
    region: 'UK South',
    notes:
      'Wholesale leased, per https://www.theregister.co.uk/2017/05/04/microsoft_azure_capacity_woes_hit_uk_customers/',
    name: 'UK South',
    isAgent: false
  },
  {
    latitude: 50.109829,
    longitude: 8.681783,
    type: 'Azure Locations',
    city_state: 'Frankfurt',
    country: 'Germany',
    region: 'Germany Central',
    notes:
      'Most likely run/operated by Deutsche Telekom for data privacy reasons',
    name: 'Germany Central',
    isAgent: false
  },
  {
    latitude: 51.985065,
    longitude: 11.653726,
    type: 'Azure Locations',
    city_state: 'Magdeburg',
    country: 'Germany',
    region: 'Germany Northeast',
    notes:
      'Operated by Deutsche Telekom, Exact Location, Per https://www.welt.de/wirtschaft/webwelt/article148712634/Microsoft-fluechtet-in-den-deutschen-Datenbunker.html',
    name: 'Germany Northeast',
    isAgent: false
  },
  {
    latitude: 1.353449,
    longitude: 103.868099,
    type: 'Azure Locations',
    city_state: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    notes: 'Probably lease of whole space?',
    name: 'Southeast Asia',
    isAgent: false
  },
  {
    latitude: 22.284351,
    longitude: 114.272536,
    type: 'Azure Locations',
    city_state: 'Hong Kong',
    country: 'SAR',
    region: 'East Asia',
    notes: 'Probably lease of whole space?',
    name: 'East Asia',
    isAgent: false
  },
  {
    latitude: -33.785169,
    longitude: 151.131515,
    type: 'Azure Locations',
    city_state: 'NSW',
    country: 'Australia',
    region: 'Australia East',
    notes:
      'Older ones possibly NextDC per http://www.datacenterdynamics.com/content-tracks/colo-cloud/microsoft-to-open-australian-facilities-next-week/90724.article, New ones possibly Airtrunk per http://www.datacenterdynamics.com/content-tracks/design-build/airtrunk-gets-400m-investment-report/97800.fullarticle',
    name: 'Australia East',
    isAgent: false
  },
  {
    latitude: -37.822634,
    longitude: 144.932106,
    type: 'Azure Locations',
    city_state: 'Victoria',
    country: 'Australia',
    region: 'Australia Southeast',
    notes:
      'Older ones possibly NextDC per http://www.datacenterdynamics.com/content-tracks/colo-cloud/microsoft-to-open-australian-facilities-next-week/90724.article, New ones possibly Airtrunk per http://www.datacenterdynamics.com/content-tracks/design-build/airtrunk-gets-400m-investment-report/97800.fullarticle',
    name: 'Australia Southeast',
    isAgent: false
  },
  {
    latitude: 18.578739,
    longitude: 73.737385,
    type: 'Azure Locations',
    city_state: 'Pune',
    country: 'India',
    region: 'Central India',
    notes: 'Using Web Werks Pune Datacenter (Future home of an IX) as anchor',
    name: 'Central India',
    isAgent: false
  },
  {
    latitude: 19.141041,
    longitude: 73.008891,
    type: 'Azure Locations',
    city_state: 'Mumbai',
    country: 'India',
    region: 'West India',
    notes: 'Using Web Werks MUM DC2 (Home of Mumbai IX) as anchor',
    name: 'West India',
    isAgent: false
  },
  {
    latitude: 13.005699,
    longitude: 80.247829,
    type: 'Azure Locations',
    city_state: 'Chennai',
    country: 'India',
    region: 'South India',
    notes: 'Approximate location of NIXI - Chennai',
    name: 'South India',
    isAgent: false
  },
  {
    latitude: 35.915578,
    longitude: 139.5787165,
    type: 'Azure Locations',
    city_state: 'Saitama Prefecture (near Tokyo)',
    country: 'Japan',
    region: 'Japan East',
    notes:
      'Lease of wholesale space per https://data-economy.com/microsoft-azure-customers-hit-data-centre-outage/',
    name: 'Japan East',
    isAgent: false
  },
  {
    latitude: 34.741493,
    longitude: 135.547334,
    type: 'Azure Locations',
    city_state: 'Osaka Prefecture',
    country: 'Japan',
    region: 'Japan West',
    notes: 'Probably lease of whole space?',
    name: 'Japan West',
    isAgent: false
  },
  {
    latitude: 37.397839,
    longitude: 126.965267,
    type: 'Azure Locations',
    city_state: 'Pyeongchon (near Seoul)',
    country: 'South Korea',
    region: 'Korea Central',
    notes:
      'LG U+ Datacenter Per http://www.koreatimes.co.kr/www/news/tech/2016/05/133_204505.html, Exact Location, per https://www.youtube.com/watch?v=bUwZiMmzgrs',
    name: 'Korea Central',
    isAgent: false
  },
  {
    latitude: 35.138037,
    longitude: 128.86007,
    type: 'Azure Locations',
    city_state: 'Busan',
    country: 'South Korea',
    region: 'Korea South',
    notes:
      'LG CNS Datacenter Per http://www.koreatimes.co.kr/www/news/tech/2016/05/133_204505.html, Exact Location per https://www.youtube.com/watch?v=pjrBvqZsjXs',
    name: 'Korea South',
    isAgent: false
  },
  {
    latitude: 39.022032,
    longitude: -77.432903,
    type: 'AWS Locations',
    city_state: 'Ashburn, Virgnia',
    country: 'USA',
    region: 'us-east-1',
    notes:
      'Buildings are scattered around Ashburn and Sterling and new construction per http://www.datacenterknowledge.com/amazon/half-million-square-feet-amazon-data-center-space-under-construction-virginia',
    name: 'us-east-1',
    isAgent: false
  },
  {
    latitude: 40.070249,
    longitude: -83.030308,
    type: 'AWS Locations',
    city_state: 'Ohio',
    country: 'USA',
    region: 'us-east-2',
    notes:
      'Buildings are scattered around New Albany, Hilliard and Dublin per http://www.dispatch.com/article/20150518/NEWS/305189694',
    name: 'us-east-2',
    isAgent: false
  },
  {
    latitude: 37.35345,
    longitude: -121.955477,
    type: 'AWS Locations',
    city_state: 'California',
    country: 'USA',
    region: 'us-west-1',
    notes:
      'Santa Clara per https://datacenterfrontier.com/regional-data-center-clusters-power-amazons-cloud/',
    name: 'us-west-1',
    isAgent: false
  },
  {
    latitude: 45.852293,
    longitude: -119.629819,
    type: 'AWS Locations',
    city_state: 'Oregon',
    country: 'USA',
    region: 'us-west-2',
    notes:
      'Near Boardman, OR per http://www.oregonlive.com/silicon-forest/index.ssf/2011/11/amazon_confirms_its_data_cente.html',
    name: 'us-west-2',
    isAgent: false
  },
  {
    latitude: 45.498241,
    longitude: -73.563423,
    type: 'AWS Locations',
    city_state: 'Montreal',
    country: 'Canada',
    region: 'ca-central-1',
    notes:
      'Near Montreal per https://venturebeat.com/2016/12/08/amazons-first-canadian-aws-data-centers-go-live/',
    name: 'ca-central-1',
    isAgent: false
  },
  {
    latitude: 53.405155,
    longitude: -6.361584,
    type: 'AWS Locations',
    city_state: 'Dublin',
    country: 'Ireland',
    region: 'eu-west-1',
    notes:
      'Various sites around Dublin per http://www.datacenterknowledge.com/archives/2011/02/09/amazon-buys-dublin-site-for-data-center',
    name: 'eu-west-1',
    isAgent: false
  },
  {
    latitude: 51.506914,
    longitude: -0.127831,
    type: 'AWS Locations',
    city_state: 'London',
    country: 'UK',
    region: 'eu-west-2',
    notes: '',
    name: 'eu-west-2',
    isAgent: false
  },
  {
    latitude: 50.109829,
    longitude: 8.681783,
    type: 'AWS Locations',
    city_state: 'Frankfurt',
    country: 'Germany',
    region: 'eu-central-1',
    notes: '',
    name: 'eu-central-1',
    isAgent: false
  },
  {
    latitude: 35.707499,
    longitude: 139.7250018,
    type: 'AWS Locations',
    city_state: 'Tokyo',
    country: 'Japan',
    region: 'ap-northeast-1',
    notes: '',
    name: 'ap-northeast-1',
    isAgent: false
  },
  {
    latitude: 37.565379,
    longitude: 126.97806,
    type: 'AWS Locations',
    city_state: 'Seoul',
    country: 'South Korea',
    region: 'ap-northeast-2',
    notes: '',
    name: 'ap-northeast-2',
    isAgent: false
  },
  {
    latitude: 1.353449,
    longitude: 103.868099,
    type: 'AWS Locations',
    city_state: 'Singapore',
    country: 'Singapore',
    region: 'ap-southeast-1',
    notes: '',
    name: 'ap-southeast-1',
    isAgent: false
  },
  {
    latitude: -33.875727,
    longitude: 151.197568,
    type: 'AWS Locations',
    city_state: 'Sydney',
    country: 'Australia',
    region: 'ap-southeast-2',
    notes: '',
    name: 'ap-southeast-2',
    isAgent: false
  },
  {
    latitude: 19.078107,
    longitude: 72.878401,
    type: 'AWS Locations',
    city_state: 'Mumbai',
    country: 'India',
    region: 'ap-south-1',
    notes: '',
    name: 'ap-south-1',
    isAgent: false
  },
  {
    latitude: 33.063464,
    longitude: -80.04246,
    type: 'Google Cloud Locations',
    city_state: 'Moncks Corner, South Carolina',
    country: 'USA',
    region: 'us-east1',
    notes: 'Exact Location',
    name: 'us-east1',
    isAgent: false
  },
  {
    latitude: 39.021103,
    longitude: -77.455418,
    type: 'Google Cloud Locations',
    city_state: 'Ashburn, Virginia',
    country: 'USA',
    region: 'us-east4',
    notes: 'Probably various wholesale leases in Ashburn/Sterling/Reston area?',
    name: 'us-east4',
    isAgent: false
  },
  {
    latitude: 41.220828,
    longitude: -95.863947,
    type: 'Google Cloud Locations',
    city_state: 'Council Bluffs, Iowa',
    country: 'USA',
    region: 'us-central1',
    notes: 'Exact Location',
    name: 'us-central1',
    isAgent: false
  },
  {
    latitude: 45.632556,
    longitude: -121.204755,
    type: 'Google Cloud Locations',
    city_state: 'The Dalles, Oregon',
    country: 'USA',
    region: 'us-west1',
    notes: 'Exact Location',
    name: 'us-west1',
    isAgent: false
  },
  {
    latitude: 50.472489,
    longitude: 3.867715,
    type: 'Google Cloud Locations',
    city_state: 'Saint-Ghislain',
    country: 'Belgium',
    region: 'europe-west1',
    notes: 'Exact Location',
    name: 'europe-west1',
    isAgent: false
  },
  {
    latitude: 51.506914,
    longitude: -0.127831,
    type: 'Google Cloud Locations',
    city_state: 'London',
    country: 'UK',
    region: 'europe-west2',
    notes: 'Probably lease of wholesale space?',
    name: 'europe-west2',
    isAgent: false
  },
  {
    latitude: 50.109829,
    longitude: 8.681783,
    type: 'Google Cloud Locations',
    city_state: 'Frankfurt',
    country: 'Germany',
    region: 'europe-west3',
    notes: 'Probably lease of wholesale space?',
    name: 'europe-west3',
    isAgent: false
  },
  {
    latitude: 24.139686,
    longitude: 120.425681,
    type: 'Google Cloud Locations',
    city_state: 'Changhua County',
    country: 'Taiwan',
    region: 'asia-east1',
    notes: 'Exact Location',
    name: 'asia-east1',
    isAgent: false
  },
  {
    latitude: 35.707499,
    longitude: 139.7250018,
    type: 'Google Cloud Locations',
    city_state: 'Tokyo',
    country: 'Japan',
    region: 'asia-northeast1',
    notes: 'Probably lease of wholesale space?',
    name: 'asia-northeast1',
    isAgent: false
  },
  {
    latitude: 1.3507973,
    longitude: 103.7087852,
    type: 'Google Cloud Locations',
    city_state: 'Singapore',
    country: 'Singapore',
    region: 'asia-southeast1',
    notes: 'Exact Location',
    name: 'asia-southeast1',
    isAgent: false
  },
  {
    latitude: 19.078107,
    longitude: 72.878401,
    type: 'Google Cloud Locations',
    city_state: 'Mumbai',
    country: 'India',
    region: 'asia-south1',
    notes: 'Probably lease of wholesale space?',
    name: 'asia-south1',
    isAgent: false
  },
  {
    latitude: -33.875727,
    longitude: 151.197568,
    type: 'Google Cloud Locations',
    city_state: 'Sydney',
    country: 'Australia',
    region: 'australia-southeast1',
    notes: 'Probably lease of wholesale space?',
    name: 'australia-southeast1',
    isAgent: false
  },
  {
    latitude: 39.021103,
    longitude: -77.455418,
    type: 'Oracle Cloud Locations',
    city_state: 'Ashburn',
    country: 'USA',
    region: 'us-ashburn-1',
    notes: '',
    name: 'us-ashburn-1',
    isAgent: false
  },
  {
    latitude: 33.272494,
    longitude: -111.884779,
    type: 'Oracle Cloud Locations',
    city_state: 'Phoenix',
    country: 'USA',
    region: 'us-phoenix-1',
    notes: 'Digital Reality and Cyrus One are at this location',
    name: 'us-phoenix-1',
    isAgent: false
  },
  {
    latitude: 50.109829,
    longitude: 8.681783,
    type: 'Oracle Cloud Locations',
    city_state: 'Frankfurt',
    country: 'Germany',
    region: 'eu-frankfurt-1',
    notes: '',
    name: 'eu-frankfurt-1',
    isAgent: false
  }
];

export default data;
