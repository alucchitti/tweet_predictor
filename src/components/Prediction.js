import React  from 'react';

const Prediction = ({ winner, pct, tweet}) => {
    return (
        <div id='prediction'>
            <p>Looks like <a href={`https://twitter.com/${winner}`} target="_blank" rel="noopener noreferrer">@{winner}</a> is {Math.trunc(pct*100)}% times more likely to tweet "<span id='enteredTweet'>{tweet}</span>"</p>
        </div>
    )
}

export default Prediction