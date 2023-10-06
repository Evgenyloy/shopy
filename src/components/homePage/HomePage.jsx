import Intro from './Intro';
import Arrivals from './Arrivals';
import BestSales from './BestSales';
import NewsLetter from '../newsLetter/NewsLetter';
import './homePage.scss';

const HomePage = ({ products, isLoading, isError, isSuccess }) => {
  return (
    <div className="home-page">
      <Intro />
      <div className="container">
        <Arrivals
          products={products}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
        <BestSales
          products={products}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
        <NewsLetter />
      </div>
    </div>
  );
};

export default HomePage;
