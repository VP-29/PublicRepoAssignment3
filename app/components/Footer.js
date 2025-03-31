// components/Footer.js
const Footer = () => {
    return (
      <footer style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '1.5rem 0',
        marginTop: 'auto', // This pushes footer to bottom
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>The Internet Movies Rental Company</h3>
            <p style={{ margin: 0, color: '#aaa' }}>Providing the best movies for rent online since 2025</p>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Contact Us:</h4>
              <p style={{ margin: '0.25rem 0' }}>Email: info@mrt.com</p>
              <p style={{ margin: '0.25rem 0' }}>Phone: +1 800 753 667</p>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Follow Us:</h4>
              <p style={{ margin: '0.25rem 0' }}>Facebook/Imfidrinslogram</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;