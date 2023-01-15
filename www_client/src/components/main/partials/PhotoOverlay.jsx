function PhotoOverlay({ data }) {
  return (
    <div className="fixed ml-48 h-screen  z-40 flex items-center justify-center text-3xl">
      <div className="flex gap-12 flex-wrap justify-evenly p-44">
        {data.map(item => (
          <img
            key={item}
            className="w-3/12 h-56 border-black border-4"
            src={item}
          ></img>
        ))}
      </div>
    </div>
  );
}

export default PhotoOverlay;
