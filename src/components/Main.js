import React, { useState } from 'react';
import GaugeChart from 'react-gauge-chart'
import Prediction from './Prediction.js'
import khloe from './images/khloe.jpg'
import obama from './images/obama.jpg'

const Main = () => {

    const [tweet, setTweet] = useState('');
    const [submittedTweet, setSubmittedTweet] = useState('');
    const [winner, setWinner] = useState('');
    const [pct, setPct] = useState(0.5);
    const [gaugePct, setGaugePct] = useState(0.5)
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIsPending(true);

        const res = await fetch(`/resp?text=${encodeURIComponent(tweet)}`)
        const data = await res.json()
        // 1 - Obama    0 - Khloe
        if (data.one > data.zero) {
            setWinner('BarackObama')
            setGaugePct(data.one)
        } else {
            setWinner('khloekardashian')
            setGaugePct(data.zero)
        }
        setPct(data.one)
        setSubmittedTweet(tweet)
        setTweet('');
        setIsPending(false);

    }

    const gaugeStyle = {
        width: '50%',
    }
    
    return (
        <div id="main">
            <form onSubmit={handleSubmit}>
                <h3>Enter Tweet</h3>
                <a href='https://twitter.com/khloekardashian' target="_blank" rel="noopener noreferrer"><img id='khloepic' alt='Khloe Kardashian' style={{float: 'left', marginLeft: '75px', marginTop: '15px', borderRadius: '4px'}} src={khloe} width="120"/></a>
                <a href='https://twitter.com/barackobama' target="_blank" rel="noopener noreferrer"><img id='obamapic' alt='Barack Obama' style={{float: 'right', marginRight: '75px', marginTop: '15px', borderRadius: '4px'}} src={obama} width="120"/></a>
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
            <table>
                <tbody>
                <tr>
                    <th className='gauge' colSpan='2'>
                        <GaugeChart id="gauge-chart" 
                                                nrOfLevels={35}
                                                colors={['#FF8921', '#097969']}
                                                percent={pct}
                                                arcPadding={0.02}
                                                animate={true}
                                                formatTextValue={value => Math.trunc(gaugePct*100)+'%'}
                                                textColor={'black'}
                                                needleColor={'#949494'}
                                                needleBaseColor={'#949494'}
                                                style={gaugeStyle}
                                                />
                    </th>
                </tr>
                <tr id='names'>
                    <th className='name khloe'><p>Khloe Kardashian</p></th>
                    <th className='name obama'><p>Barack Obama</p></th>
                </tr>
                </tbody>
            </table>
            {pct!==.5 && <Prediction winner={winner} pct={gaugePct} tweet={submittedTweet}/>}
        </div>
      )
}

export default Main