import { useEffect, useState } from 'react';
import { useInput } from '../util/hooks/useInput';

const WorkForm = ({ work, reset }) => {
  const name = useInput(work.name);
  const pages = useInput(work.pages);
  const description = useInput(work.description);
  const genre = useInput(work.genre);

  const handleSubmit = async e => {
    e.preventDefault();
    const updateFormData = new FormData();
    updateFormData.append('name', name.value);
    updateFormData.append('pages', pages.value);
    updateFormData.append('description', description.value);
    updateFormData.append('genre', genre.value);
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    let response = await fetch(
      `http://localhost:3000/works/${work._id}/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
        body: JSON.stringify(Object.fromEntries(updateFormData)),
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      console.log(response);
      reset(true);
      alert('Επιτυχημένη αλλαγή έργου');
    } else alert(data.message);
  };

  return (
    <div className="w-full max-w-xs z-30">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-xl text-gray-600 font-extrabold">
          Αλλαγή Έργου {work.name}
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
            placeholder="Άρχοντας των δαχτυλιδιών"
            {...name}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pages"
          >
            Σελίδες
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pages"
            type="number"
            placeholder="653"
            {...pages}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Περιγραφή
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="A Wizard Is Never Late, Frodo"
            {...description}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="genre"
          >
            Είδος
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="genre"
            type="text"
            placeholder="Φαντασίας"
            {...genre}
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

function UpdateWorks({ auth = false }) {
  let [works, setWorks] = useState([]);
  let [reset, setReset] = useState(false);
  useEffect(() => {
    let fetchWorks = async () => {
      let request = await fetch('http://localhost:3000/works');
      let data = await request.json();
      console.log('resetting');
      setWorks(data);
      setReset(false);
    };
    fetchWorks();
  }, [reset]);

  return (
    <ul className="pl-32 md:pl-0 z-30  max-w-6xl gap-3 flex flex-wrap ">
      {works.length ? (
        works.map(work => (
          <WorkForm key={work._id} work={work} reset={setReset} />
        ))
      ) : (
        <p className="text-2xl text-blue-800">
          {works.message ? works.message : 'Loading...'}
        </p>
      )}
    </ul>
  );
}

export default UpdateWorks;
