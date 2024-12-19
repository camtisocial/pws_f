const Quote = ({ children }) => (
    <blockquote
      style={{
        // background: '#7a7792',
        // background: 'rgba(122, 119, 146, 0.8)', // Set background color with opacity
        background: 'rgb(146, 102, 171, 0.7)',
        // borderLeft: '10px solid #6b5b95',
        borderRadius: '8px',
        padding: '10px 20px',
        width: '80%',
        // textAlign: 'center',
        color: '#e9ff36',
        borderLeft: '10px solid #6d3b93',
        margin: '20px 0',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.4)',
        whiteSpace: 'pre-line',
        display: 'flex',
        // justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {children}
    </blockquote>
  );

  export default Quote;