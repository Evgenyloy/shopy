import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  setUser,
  setOrders,
  setFavoriteItems,
} from '../../store/slices/userSlice';
import { setEmailError, setPasswordError } from '../../store/slices/errorSlice';
import Form from '../form/Form';

function Login() {
  const dispatch = useDispatch();
  const { goBack } = useHistory();

  const errorCheck = (error) => {
    if (error.message === 'Firebase: Error (auth/invalid-email).') {
      dispatch(setEmailError('wrong-email'));
      dispatch(setPasswordError(''));
    }
    if (error.message === 'Firebase: Error (auth/user-not-found).') {
      dispatch(setEmailError('user-not-found'));
      dispatch(setPasswordError(''));
    }
    if (error.message === 'Firebase: Error (auth/wrong-password).') {
      dispatch(setPasswordError('wrong-password'));
      dispatch(setEmailError(''));
    }
    if (error.message === 'Firebase: Error (auth/missing-password).') {
      dispatch(setPasswordError('missing-password'));
      dispatch(setEmailError(''));
    }
    if (error.message.includes('(auth/too-many-requests)')) {
      dispatch(setPasswordError('account disabled due to many failed login'));
      dispatch(setEmailError(''));
    }
  };

  const handleLogin = (email, password) => {
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(setUser({ uid: user.uid, email: user.email }));

            const data = getOrders(email);
            data.then((data) => {
              dispatch(setOrders(data.orders));
              dispatch(setFavoriteItems(data.favorites));
              dispatch(setEmailError(''));
              dispatch(setPasswordError(''));
            });
            goBack();
          })
          .catch((error) => {
            errorCheck(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const db = getFirestore();

  const getOrders = async (email) => {
    const docRef = doc(db, 'users', `${email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //  console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      alert('No such document!');
    }
  };

  return <Form title="sign in" handleClick={handleLogin} />;
}

export default Login;
