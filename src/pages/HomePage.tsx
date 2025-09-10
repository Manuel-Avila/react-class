import Header from "../components/ui/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="mx-auto flex flex-1 items-center w-8/12 gap-10">
        <div className="space-y-5 w-5/12">
          <h1 className="text-primary-red font-bold text-4xl">
            La mejor tienda de libros
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            deleniti nesciunt illum pariatur ullam harum, esse sit at blanditiis
            omnis commodi eveniet natus? Delectus aliquam tempore sed fuga
            placeat voluptas.
          </p>
          <button className="red-button mr-5">Explorar libros</button>
          <button className="red-button-outline">Cursos</button>
        </div>
        <div className="min-w-100 w-7/12 h-[70dvh]">
          <img
            alt="Imagen de libros"
            src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
            className="size-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
