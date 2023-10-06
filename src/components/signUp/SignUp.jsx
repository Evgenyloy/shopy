import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import {
  setPersistence,
  browserLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/use-auth';
import { setEmailError, setPasswordError } from '../../store/slices/errorSlice';
import Form from '../form/Form';

function SignUp() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { orders, favorites } = useAuth();

  const errorCheck = (error) => {
    if (error.message == 'Firebase: Error (auth/invalid-email).') {
      dispatch(setEmailError('invalid-email'));
      dispatch(setPasswordError(''));
    }
    if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
      dispatch(setEmailError('email-already-in-use'));
      dispatch(setPasswordError(''));
    }
    if (error.message == 'Firebase: Error (auth/missing-password).') {
      dispatch(setPasswordError('missing-password'));
      dispatch(setEmailError(''));
    }
    if (
      error.message ==
      'Firebase: Password should be at least 6 characters (auth/weak-password).'
    ) {
      dispatch(setPasswordError('Password should be at least 6 characters'));
      dispatch(setEmailError(''));
    }
    if (!error) {
      dispatch(setEmailError(''));
      dispatch(setPasswordError(''));
    }
  };

  const handleRegister = (email, password) => {
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(setUser({ uid: user.uid, email: user.email }));
            saveInDataBase(user.email, user.uid);
            dispatch(setEmailError(''));
            dispatch(setPasswordError(''));
            push('/');
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
  const saveInDataBase = async (email, id) => {
    try {
      const docRef = await setDoc(doc(db, 'users', `${email}`), {
        id,
        email,
        orders,
        favorites,
      });
      console.log(`Document written with ID: ${email}`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return <Form title="register" handleClick={handleRegister} />;
}

export default SignUp;
