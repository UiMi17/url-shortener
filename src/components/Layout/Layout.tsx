import Header from './Header';

interface ILayout {
  children: any;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <div className="pt-3">{children}</div>
    </>
  );
};

export default Layout;
