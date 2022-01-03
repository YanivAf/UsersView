# Users View from API
- A server pagination feature is enabled to only fetch more users when required.
- Clicking the info button navigates to a "Users Details" page that shows the user card with a collapsible view of a Google Map.
  - The map location is based on the user's latitude and longitude data, rather than on the address (as this is mock data, the coordinates and string address do not match).
- The admin has the option to navigate back to the main table with the same data, saved on the browser local storage.
  - Clicking "Reset Data" will force the table's population with a new data set.
- I used:
  1. Front-End: [**ReactJS**](https://reactjs.org/)
  2. Design: [**Material UI**](https://mui.com/)
  3. API requests: [**axios**](https://www.npmjs.com/package/axios)
  4. Mock Data: [**Random User Generator API**](https://randomuser.me/)
  5. Embedded Map:  [**Maps JavaScript API**](https://developers.google.com/maps/documentation/javascript/overview) (managed by [*Google Cloud Platform*](https://cloud.google.com/))
  6. Deployment Service: [**Netlify**](https://www.netlify.com/)

## Deployed version
[click here!](https://users-view.netlify.app/users/)

## Run Locally from terminal
- Install dependincies using `npm install`
- Run app by `npm start`
- *Note: You will not have access to view the maps when running locally, as the API key is not provided*
