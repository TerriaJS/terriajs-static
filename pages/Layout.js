import Header from '../components/Header';

const Layout = (props) => (
  <div>
    <Header />
    {props.children}
  </div>
)

export default Layout