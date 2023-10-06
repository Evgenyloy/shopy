import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ height: '100vh' }}>
      <p
        style={{
          color: '#34404b',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '26px',
          paddingTop: '300px',
          marginBottom: '20px',
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          color: '#ff5912',
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
