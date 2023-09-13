import Form from '../form/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../hooks/use-auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

function SignUp() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { orders, favorites } = useAuth();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        saveInDataBase(email, user.uid);
        push('/');
      })
      .catch((data) => alert(data));
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
