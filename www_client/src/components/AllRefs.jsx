import { useEffect, useState } from 'react';

function AllRefs({ auth = false }) {
  let [refs, setRefs] = useState([]);
  let [reset, setReset] = useState(false);

  useEffect(() => {
    let fetchRefs = async () => {
      let request = await fetch('http://localhost:3000/ref');
      let data = await request.json();
      console.log(data);
      setRefs(data);
      setReset(false);
    };
    fetchRefs();
  }, [reset]);
  const deleteRef = async refid => {
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    let response = await fetch(`http://localhost:3000/ref/${refid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setReset(true);
      alert(`H Αναφορά διαγράφηκε επιτυγχώς`);
    } else alert(data.message);
  };

  return (
    <ul className="pl-32 md:pl-0 z-30  max-w-6xl gap-3 flex flex-wrap ">
      {refs.length ? (
        refs.map(ref => (
          <div
            key={ref._id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{ref.name}</div>
              <a
                href={ref.url}
                className="text-blue-400 text-base"
                target="_blank"
              >
                Εξωτερικός σύνδεσμος
              </a>
            </div>
            <div className="px-6 pt-4 pb-2">
              {auth ? (
                <button
                  className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                  onClick={() => deleteRef(ref._id)}
                >
                  διαγραφή
                </button>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <p className="text-2xl text-red-700">
          {refs.message ? refs.message : 'Loading...'}
        </p>
      )}
    </ul>
  );
}

export default AllRefs;
