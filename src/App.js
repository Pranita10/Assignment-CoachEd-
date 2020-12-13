import React from 'react';

function App() {
  const [timer, setTimer] = React.useState(0);
  const [src, setSrc] = React.useState([]);
  const [imgNo, setImgNo] = React.useState(1);
  var interval;
  var timeout;

  async function fetchImage() {
    setSrc([]);
    const response = await fetch("https://api.pexels.com/v1/curated?page=" + imgNo + "&per_page=6", {
      headers: {
        "Authorization": "563492ad6f9170000100000132c97cd0f2d74cdca34c62ebae51a399"
      }
    });
    const data = await response.json();
    setSrc(data.photos);
    setImgNo(imgNo + 1);
    clearTimeout(timeout);
  }

  function handleClick(e) {
    e.preventDefault();
    var time = 10;
    interval = setInterval(() => {
      if (time >= 0) {
        setTimer(time);
        time--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    timeout = setTimeout(fetchImage, 10000);
  }

  React.useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {src.length ?
          src.map((image, i) => (<div key={i} className="col-4 text-center"><img src={image.src.original} className="img-fluid" style={{ maxHeight: "450px", padding: "16px" }} /></div>))
          :
          <center style={{ padding: "16px" }}>Loading...</center>}
      </div>
      <button onClick={handleClick} disabled={timer !== 0} style={{ display: "block", margin: "auto", padding: "12px 32px", fontSize: "18px", marginBottom: "16px" }} >
        {timer ? timer : "Next"}
      </button>
    </div>);
}

export default App;