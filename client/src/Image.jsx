export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://airbnbserver-5832.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }