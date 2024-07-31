import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import defaultImage from '../Assets/default_image.svg'

export const ImageGenerator = () => {
  /**
   * UseState and UseRef
   */
  const inputRef = useRef(null);
  const [imageURL, setImageURL] = useState("/");
  const [loading, setLoading] = useState(false);

  /**
   * Functions
   */
  const imageGenerator = async () => {
    if(inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_SECRET_KEY}`,
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n:1,
        size: "512x512",
      }),
    });
    let data = await resp.json();
    let dataArr = data.data;
    setImageURL(dataArr[0].url);
    setLoading(false);
  }

  /**
   * Return Component
   */
  return (
    <div className='ai-image-generator'>
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imageURL === "/" ? defaultImage : imageURL} alt="default-image" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
        </div>
      </div>
      <div className="search-box">
        <input type='text' ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
        <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}
