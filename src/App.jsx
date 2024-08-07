import { Outlet } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query'
// import messagesEn from '/locales/en.json';
import messagesRu from '/locales/ru.json';

// In order to avoid making fetch in use effect + error catching + loading state + refetch from scratch, I'm using react-query 
// It allows to quickly and easily add loading state, error state, cache, stale and has a retry mechanism
const queryClient = new QueryClient();

function App() {
  return (
    // For easy translation and text control, react-intl is used
    // It allows to add new languages easily and controls all text in one place which can later be changed with JSON config on the backend, in dashboards, or with ab tests

    // Language is set to be english by default
    // In a production app, a language selector can be added to easily add new languages
    // All translations are located in ~/locales/*.json files

    // In order to fill .json files with all text keys a simple script/lib can be used to parse through the project

    <IntlProvider locale={"ru"} messages={messagesRu} defaultLocale="en">
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
    </IntlProvider>
  );
}

export default App;

// Improvements that can be done to UX with more time:
// 1. A more complex validation for phone number, email
// 2. Error displayed for the particular faulty field
// 3. Better address selection UI component with suggestions

// Potential business logic improvements:
// Sending form data as soon as possible after getting critical information - email, phone number, etc to later use it for cold calling.
// Form can be submitted after each slide or right after the field was filled and was not touched for several seconds