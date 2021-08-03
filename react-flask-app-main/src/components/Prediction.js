import React  from 'react';

const Prediction = ({ winner, pct, tweet}) => {
    return (
        <div id='prediction'>
            <p>Looks like <a href={`https://twitter.com/${winner}`}>@{winner}</a> is more likely to tweet "{tweet}"</p>
        </div>
    )
}

export default Prediction