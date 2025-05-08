import JobNestLogo from "../assets/JobNestLogo.png";
const Footer = () => {
  return (
    <footer className="footer w-full  bg-base-200 text-base-content mt-10 px-4 my-5">
      <div className="flex w-full justify-between ">
        <aside className="w-1/2">
          <img src={JobNestLogo} className="w-10 md:w-16" alt="" />
          <p>
            <span className="text-lg md:text-xl font-bold">JobNest Job Portal Ltd.</span>
          </p>
        </aside>
        <div className="flex flex-1 flex-row justify-evenly gap-4 ">
          <nav className="flex flex-col ">
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex flex-col">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex flex-col ">
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">Providing reliable jobs since 2025</div>
    </footer>
  );
};

export default Footer;
