import { adminActions, photo, auth } from '../util/sidebar/data';

function SideMenu({ navValue, setter, updateAuth, user }) {
  let displayRelativeList = list =>
    list.map(listitem => (
      <li
        className="text-gray-700 text-xl cursor-pointer text-center hover:bg-gray-400 px-2 py-4 rounded-xl transition-all duration-300 hover:underline"
        key={listitem.tag}
        onClick={
          listitem.tag === 'logout'
            ? () => {
                if (user) alert('Πραγματοποιήθηκε έξοδος διαχειριστή');
                localStorage.clear();
                localStorage.setItem('userAuth', false);
                updateAuth(false);
              }
            : () => setter(listitem.tag)
        }
      >
        {listitem.title}
      </li>
    ));

  return (
    <div className="h-screen w-44 bg-gray-300 fixed top-0 left-0 shadow-2xl border-r-4 border-gray-500">
      <ul className="flex flex-col h-full w-full justify-evenly p-4">
        {(navValue === 'works' && user) ||
        (navValue === 'bio' && user) ||
        (navValue === 'ref' && user)
          ? displayRelativeList(adminActions)
          : navValue === 'photo'
          ? displayRelativeList(photo)
          : navValue === 'admin'
          ? displayRelativeList(auth)
          : null}
      </ul>
    </div>
  );
}

export default SideMenu;
