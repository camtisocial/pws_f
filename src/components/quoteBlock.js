const Quote = ({ children }) => (
    <blockquote
      style={{
        background: '#7a7792',
        borderLeft: '10px solid #6b5b95',
        borderRadius: '5px',
        padding: '10px 20px',
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#e9ff36',
        margin: '20px 0',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.4)',
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </blockquote>
  );

  export default Quote;