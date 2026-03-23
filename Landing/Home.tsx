const Home = () => {
  return (
    <main className="min-h-screen bg-[#131313]">
      <nav className="flex justify-between items-center px-10 py-4 border-b border-[#171919] bg-[#131313B2]">
        <div className="logo">
          <h2 className="font-manrope text-[#008F5A] font-bold text-xl">
            BusierDesk
          </h2>
        </div>

        <ul className="flex items-center gap-10 text-[#E5E2E1]">
          <li className="text-[#6BDC9F] font-semibold">Product</li>
          <li>Pricing</li>
          <li>Login</li>
          <button className="bg-[#008F5A] px-7 py-2 font-semibold rounded-sm text-[#00311C] nav-btn-gradient">
            Get Started
          </button>
        </ul>
      </nav>
    </main>
  );
};
export default Home;
