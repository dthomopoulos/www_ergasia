import { useState } from 'react';
import { navData } from '../util/navdata.jsx';

function Navigation({ setter }) {
  const [active, setActive] = useState(false);
  let baseNavClass =
    'fixed right-10 top-5 w-12 h-12 bg-white z-50 rounded transition-all duration-500 delay-200 overflow-hidden';
  let baseToggleClass = `rounded relative top-0 left-0 w-full h-12 flex justify-end items-center  transition-all duration-500 before:content-['+'] before:text-4xl before:flex before:justify-center before:items-center before:w-12 before:h-12 before:text-white before:transition-all before:duration-500 before:cursor-pointer `;
  const toggleActive = () => setActive(!active);

  return (
    <div
      className={
        active ? (baseNavClass += ' active') : (baseNavClass += ' w-64 h-80')
      }
      onClick={toggleActive}
    >
      <div
        className={
          active
            ? (baseToggleClass += ' active bg-rose-500')
            : (baseToggleClass += 'bg-blue-500 before:rotate-[315deg]')
        }
      ></div>
      <ul className="flex flex-col justify-evenly h-5/6">
        {navData.map(item => (
          <li
            className="flex-1 flex cursor-pointer items-center hover:bg-blue-300"
            key={item.title}
            onClick={() => setter(item.tag)}
          >
            <span className="pr-4">{item.svg}</span>
            <span className="font-bold font-xl">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
