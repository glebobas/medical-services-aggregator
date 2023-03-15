
export function MainImage() {
  const image = {
    src: 'https://source.unsplash.com/random/?medicine',
    alt: 'Random Image',
  };

  return (
    <div className="flex width-screen ml-4 my-4">
      <section className="mx-auto px-50 py-50 flex right" >
        <div className="w-half h-70 relative" >
          <img
            className="object-cover rounded-lg shadow-lg"
            src={image.src}
            alt={image.alt}
          />
        </div>
      </section>
    </div>
  );
}


