import React, { useState } from 'react';
import Prediction from './Prediction.js'

const Main = () => {

    // const text = "water sun kim khloe beach waves swim suit tan makeup lash eye fit friends hgtv"
    // fetch(`/resp?text=${text}`).then(res => res.json()).then(data => {
    //   console.log(data);
    // });

    const [tweet, setTweet] = useState('');
    const [submittedTweet, setSubmittedTweet] = useState('');
    const [winner, setWinner] = useState('');
    const [pct, setPct] = useState(0);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIsPending(true);

        const res = await fetch(`/resp?text=${encodeURIComponent(tweet)}`)
        const data = await res.json()
        // 1 - Obama    0 - Khloe
        if (data.one > data.zero) {
            setWinner('BarackObama')
            setPct(data.one)
        } else {
            setWinner('khloekardashian')
            setPct(data.zero)
        }
        setSubmittedTweet(tweet)
        
        setIsPending(false);
    }
    
    return (
        <div id="main">
            <form onSubmit={handleSubmit}>
                <h3>Enter Tweet</h3>
                <textarea
                    required
                    maxLength="280"
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                ></textarea>
                <p id="charcount">Characters Left: {280 - tweet.length}</p>
                <br/>
                {!isPending && <button>Get Prediction</button>}
                {isPending && <button disabled>Getting Prediction...</button>}
            </form>
            {pct!==0 && <Prediction winner={winner} pct={pct} tweet={submittedTweet}/>}
        </div>
      )
}

export default Main