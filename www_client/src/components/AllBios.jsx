import { useEffect, useState } from 'react';

function AllBios({ auth = false }) {
  let [bios, setBios] = useState([]);
  let [reset, setReset] = useState(false);

  useEffect(() => {
    let fetchBios = async () => {
      let request = await fetch('http://localhost:3000/bio');
      let data = await request.json();
      console.log(data);
      setBios(data);
      setReset(false);
    };
    fetchBios();
  }, [reset]);
  const deleteBio = async bioid => {
    const token = localStorage.getItem('token');
    const bearer = `Bearer ${token}`;

    let response = await fetch(`http://localhost:3000/bio/${bioid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setReset(true);
      alert(`H βιογραφία διαγράφηκε επιτυγχώς`);
    } else alert(data.message);
  };

  return (
    <ul className="pl-32 md:pl-0 z-30  max-w-6xl gap-3 flex flex-wrap ">
      {bios.length ? (
        bios.map(bio => (
          <div
            key={bio._id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{bio.title}</div>
              <p className="text-gray-700 text-base">{bio.content}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {auth ? (
                <button
                  className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                  onClick={() => deleteBio(bio._id)}
                >
                  διαγραφή
                </button>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <p className="text-2xl text-red-700">
          {bios.message ? bios.message : 'Loading...'}
        </p>
      )}
    </ul>
  );
}

export default AllBios;
