import { useEffect, useState } from 'react';
import { useInput } from '../util/hooks/useInput';

const UpdateRef = ({ ref, reset }) => {
  const name = useInput(ref.title);
  const url = useInput(ref.content);

  const handleSubmit = async e => {
    e.preventDefault();
    const updateFormData = new FormData();
    updateFormData.append('name', name.value);
    updateFormData.append('url', url.value);

    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    let response = await fetch(`http://localhost:3000/ref/${ref._id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(Object.fromEntries(updateFormData)),
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log(response);
      reset(true);
      alert('Επιτυχημένη αλλαγή παραπομπής');
    } else alert(data.message);
  };

  return (
    <div className="w-full max-w-xs z-30">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-xl text-gray-600 font-extrabold">
          Αλλαγή Παραπομπής {ref.name}
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Όνομα
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Νέο όνομα παραπομπής"
            {...name}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="url"
          >
            Σύνδεσμος
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            placeholder="https://en.wikipedia.org/wiki/J._R._R._Tolkien"
            {...content}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Αλλαγή
          </button>
        </div>
      </form>
    </div>
  );
};

function UpdateBios({ auth = false }) {
  let [bios, setBios] = useState([]);
  let [reset, setReset] = useState(false);
  useEffect(() => {
    let fetchBios = async () => {
      let request = await fetch('http://localhost:3000/bio');
      let data = await request.json();
      console.log('resetting');
      setBios(data);
      setReset(false);
    };
    fetchBios();
  }, [reset]);

  return (
    <ul className="pl-32 md:pl-0 z-30  max-w-6xl gap-3 flex flex-wrap ">
      {bios.length ? (
        bios.map(bio => <UpdateRef key={bio._id} bio={bio} reset={setReset} />)
      ) : (
        <p className="text-2xl text-blue-800">
          {bios.message ? bios.message : 'Loading...'}
        </p>
      )}
    </ul>
  );
}

export default UpdateBios;
