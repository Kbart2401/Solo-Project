import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './TradePage.css';
import Footer from '../Footer';
import * as stockSearchActions from '../../store/stockSearch';
import * as stockTradeActions from '../../store/stockTrade';


const TradePage = () => {
  const dispatch = useDispatch();
  const [stockSymbol, setStockSymbol] = useState('');
  const stockData = useSelector(state => state.stockSearch.stock);
  const userAccount = useSelector(state => state.session.account)


  const getStock = () => {
    dispatch(stockSearchActions.setStockData(stockSymbol));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(stockTradeActions.addNewStock({
      name: stockData.companyName, symbol: stockSymbol,
      costBasis: stockData.latestPrice, accountId: userAccount.id
    }))
    dispatch(sessionActions.decreaseCash(userAccount.id, stockData.latestPrice))
  }
  return (
    <>
      <div className='below-nav-container'>
        <h1>Trade Page</h1>
        <form onSubmit={handleSubmit}>
          <label>Buy Stock</label>
          <input placeholder='Enter Stock Symbol' value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}></input>
          <button type="button" onClick={getStock}>Get Stock</button>
          <button>Submit</button>
        </form>
        {stockData && <div>Success</div>}
      </div>
      <Footer />
    </>
  )
}

export default TradePage;