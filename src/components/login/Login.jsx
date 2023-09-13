import Form from '../form/Form';
import { useDispatch } from 'react-redux';
import {
  setUser,
  setOrders,
  setFavoriteItems,
} from '../../store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import { setPersistence, browserSessionPersistence } from 'firebase/auth';

function Login() {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );

        push('/');
      })
      .catch(() => alert('Invalid user!'));

    const data = getOrders(email);
    data.then((data) => {
      dispatch(setOrders(data.orders));
      dispatch(setFavoriteItems(data.favorites));
    });
    //------------------

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  //-------------------------------------------------------------

  const db = getFirestore();

  const getOrders = async (email) => {
    const docRef = doc(db, 'users', `${email}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  return <Form title="sign in" handleClick={handleLogin} />;
}

export default Login;
