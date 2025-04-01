// components/Navbar.js
const Navbar = () => {
  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="navbar-container" style={styles.navbarContainer}>
        <h1 style={styles.title}>
          The Internet Movies Rental Company by Group 9
        </h1>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: "1rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navbarContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "600",
  },
};

export default Navbar;
