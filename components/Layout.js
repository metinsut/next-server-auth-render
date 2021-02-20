import Header from "./header/Header"

const Layout = ({ children }) => (
    <>
        <Header />
        {children}
    </>
)

export default Layout;