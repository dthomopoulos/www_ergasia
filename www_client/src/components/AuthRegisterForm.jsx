import axios from 'axios';
import { useState } from 'react';
import { useInput } from '../util/hooks/useInput';

function AuthRegisterForm() {
  const username = useInput('');
  const password = useInput('');
  const rePassword = useInput('');
  const [registerData, setRegisterData] = useState({});

  const onFormSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: username.value,
        password: password.value,
        confirmPassword: rePassword.value,
      });
      setRegisterData(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="z-30 w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onFormSubmit}
      >
        <h2 className="mb-5 text-xl text-gray-600 font-extrabold">
          Εγγραφή διαχειριστή
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Όνομα
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...username}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Κωδικός
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            {...password}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmpass"
          >
            Επιβεβαίωση
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmpass"
            type="password"
            placeholder="******************"
            {...rePassword}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Eγγραφή
          </button>
        </div>
        {registerData.status === 200 ? (
          <p className="mt-3 text-green-500 text-lg">
            {registerData.data.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default AuthRegisterForm;
