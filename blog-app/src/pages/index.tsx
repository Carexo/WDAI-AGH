import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full gap-10">
        <h2 className="font-bold text-2xl">
          Zapraszam do przeczytania artykułów na moim blogu!
        </h2>
        <Link to="/blog" className="underline">
          Ciekawe artykuły
        </Link>
      </div>
    </>
  );
};

export default Home;
