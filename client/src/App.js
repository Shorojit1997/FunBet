
//css link
import 'bootstrap/dist/css/bootstrap.min.css';
import './CssFile/App.css'
import './CssFile/BankDeposit.css'
import './CssFile/HomeBodyMain.css'
import React, { useEffect } from 'react'
// import { useSelector, shallowEqual } from 'react-redux';

import GlobalRoute from './Router/GlobalRoute';

function App() {
  // const { generalSettings } = useSelector(state => state.settings, shallowEqual);
  useEffect(() => {
    document.title = '5WICKETS';
  }, [])

  return (
    <div className="App"  >
      {<GlobalRoute />}

    </div>
  );
}

export default React.memo(App);
