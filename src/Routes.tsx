import { Route, BrowserRouter } from 'react-router-dom';

import Landing from './pages/Landing';

export default function Routes() {
  return(
    <BrowserRouter>
      <Route path="/" component={Landing} />
    </BrowserRouter>
  )
}