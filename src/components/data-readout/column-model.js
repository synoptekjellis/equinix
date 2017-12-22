export default () => {
  return [
    // {
    //   id: 'id',
    //   label: 'ID',
    //   templ: 'id'
    // },
    {
      id: 'name',
      label: 'Name',
      templ: 'name',
      minWidth: 70
    },
    {
      id: 'tests',
      label: '# of Tests',
      templ: (row, col) => {
        return row.tests.length;
      },
      minWidth: 100
    },
    {
      id: 'address',
      label: 'Address',
      templ: 'address'
    },
    {
      id: 'country',
      label: 'Country',
      templ: 'country',
      minWidth: 100
    }
    // {
    //   id: 'region',
    //   label: 'Region',
    //   templ: 'region',
    //   minWidth: 100
    // }
    // {
    //   id: 'latitude',
    //   label: 'Latitude',
    //   templ: 'latitude',
    //   minWidth: 105
    // },
    // {
    //   id: 'longitude',
    //   label: 'Longitude',
    //   templ: 'longitude',
    //   minWidth: 105
    // }

    // {
    //   id: 'notes',
    //   label: 'Notes',
    //   templ: 'notes'
    // }
  ];
};
