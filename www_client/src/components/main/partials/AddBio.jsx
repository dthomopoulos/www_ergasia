import { useState } from 'react';
import { useInput } from '../../../util/hooks/useInput';

function AddBio() {
  const title = useInput('');
  const content = useInput('');

  const [success, setSuccess] = useState(false);

  const onFormSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;
    const formData = new FormData();

    formData.append('title', title.value);
    formData.append('content', content.value);

    let request = await fetch('http://localhost:3000/bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = await request.json();
    console.log(data);
    if (request.status === 200) {
      setSuccess(true);
    } else console.log(data.errors);
  };

  return (
    <div className="w-full max-w-xs z-30">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onFormSubmit}
      >
        <h2 className="mb-5 text-xl text-gray-600 font-extrabold">
          Εισαγωγή Βιογραφίας
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Tίτλος
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Αυτοβιογραφία"
            {...title}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Περιεχόμενο
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            type="text"
            placeholder="John Ronald Reuel Tolkien (1892–1973) was..."
            {...content}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Δημιουργία
          </button>
        </div>
        {success ? (
          <p className="mt-3 text-green-500 text-sm">
            Επιτυχία πρόσθεσης βιογραφίας
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default AddBio;
