import * as Types from '../Types'
import axios from 'axios'

const SUITS = ["♠️", "♣", "♥", "♦️"]
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "Q", "K"]

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const userCardRatingActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/user/games/card')
        .then(info => {
            if (info.data) {
                dispatch({
                    type: Types.CARD_RATE_GET, payload: {
                        cardRating: info.data.cardRating
                    }
                })
            }
        })
        .catch(error => {

            if (error.response)
                dispatch({ type: Types.CARD_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.CARD_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })
}

export const userCardPlayActionHandeler = (info1, setModal, setInfo,setisDisable) => async (dispatch) => {
    setisDisable(true);
    let cards = freshDeck(info1);
    axios.post('/api/user/games/card', info1)
        .then(async (info) => {
            if (info.data) {
                const playStatus = info.data.playStatus;
                let pos;
                playStatus === 'Congratulations' ? pos = parseInt(odd()) : pos = parseInt(even());
           
                let oldPoss = cards[pos];
                cards[pos] =  createCard(info1.cardCol, info1.cardValue, 14);
                cards.push(oldPoss)

                let i = cards.length, j = 0;
                while (j < i) {
                    dispatch({
                        type: Types.CARD_ADD, payload: {
                            computer: cards[j++],
                            yourCard: cards[j],
                        }
                    })
                    if (pos === j - 1 || pos === j) {
                        dispatch({
                            type: Types.CARD_PLAY, payload: {
                                playStatus: info.data.playStatus
                            }
                        })
                        setModal(true);
                        
                        break;
                    }
                    j++;
                    await sleep(1000)
                }
                setTimeout(() => {
                    dispatch({
                        type: Types.CARD_CLEAN, payload: {
                        }
                    })
                    setInfo({
                        cardCol: '',
                        cardValue: '',
                        catchAmount: ''
                    })

                    setModal(false);
                    setisDisable(false);
                }, 5000)
            }
        })
        .catch(error => {
          
            if (error.response)
                dispatch({ type: Types.CARD_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.CARD_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
            setisDisable(false);
        })


}



export const freshDeck = (info) => {
    const { cardCol, cardValue } = info
    let j = 0;
    let cards = [];
    for (let i = 0; i < SUITS.length; i++) {
        for (let k = 0; k < VALUES.length; k++) {
            if (cardCol === SUITS[i] && VALUES[k] === cardValue)
                continue;
            cards.push(createCard(SUITS[i], VALUES[k], j += 1))
        }
    }
    return suffle(cards)
}

const createCard = (suit, value, j) => {
    let col = colorFun(suit)
    let ob = (
        <div key={Math.random() * 99999999999} className='_card' style={{ color: `${col}` }}>
            <div className='deck' style={{ zIndex: '1', marginTop: `${j}px`, marginLeft: `${j}px` }}>
                <div className='deck_before'>{value} {suit}</div>
                <div className='deck_middle'>{suit}</div>
                <div className='deck_after'>{value} {suit}</div>
            </div>
        </div>
    );
    return ob;

}

const colorFun = (col) => {
    return col === "♠️" || col === "♣" ? "black" : "red"
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const suffle = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = cards[newIndex]
        cards[newIndex] = cards[i]
        cards[i] = oldValue
    }
    for (let i = cards.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = cards[newIndex]
        cards[newIndex] = cards[i]
        cards[i] = oldValue
    }
    return cards;
}


const even = () => {
    let r = parseInt(Math.random() * 40);
    return r % 2 === 1 ? r + 1 : r;
}
const odd = () => {
    let r = parseInt(Math.random() * 40);
    return r % 2 === 0 ? r + 1 : r;
}