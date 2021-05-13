
import React, { useState, useEffect, useCallback} from 'react';
import {
    Button,
    Card, CardHeader
} from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { matchHandeler } from '../../Store/Actions/MatchAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Livequestion from './Livequestion';
const style1 = { background: 'none', cursor: 'pointer', border: 'none', color: 'black', }
const style2 = { background: 'none', cursor: 'pointer', border: '1px solid gray', color: 'black', }

const HomeBodyMain = () => {

    const [toogle, setToogle] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const { bets } = useSelector(state => state.bets, shallowEqual);
    const { gameType } = useSelector(state => state.question, shallowEqual);

    const getPosts = useCallback(() => {
        dispatch(matchHandeler(history))
    }, [dispatch, history])

    useEffect(() => {
        getPosts();
        const interval = setInterval(() => {
            getPosts()
        }, 20000)
        return () => clearInterval(interval)

    }, [getPosts])

    const countStatus=(status)=>{
        let i=0;
        bets.map((item)=>item.playStatus===status && i++)
        return i;
    }

    const upcommingHandeler = (status) => {
        let arrayelemnt = [];
        if (bets) {
            arrayelemnt = bets.map((item, index) => {
                if (item.playStatus === status) {
                    if (gameType === 'All')
                        return (<Livequestion key={Math.random() * 99999} item={item} />)
                    else if (gameType === item.gameType) {
                        return (<Livequestion key={Math.random() * 99999} item={item} />)
                    }
                }
                return null;

            })
        }
        return arrayelemnt
    }
    return (
        <div>
            <Card style={{ backgroundColor: '#fff' }}>
                <CardHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'row' }} >
                    <Button onClick={() => { setToogle(true) }} style={toogle ? style2 : style1}>Live({countStatus('Live')})</Button>
                    <Button onClick={() => { setToogle(false) }} style={!toogle ? style2 : style1}>Upcoming({countStatus('Upcomming')})</Button>
                </CardHeader>
                    {
                        toogle ?
                            (
                                <>
                                    {
                                        upcommingHandeler('Live')
                                    }
                                </>
                            ) :
                            (
                                <>
                                    {
                                        upcommingHandeler('Upcomming')
                                    }
                                </>
                            )
                    }
            </Card>

        </div>
    );
};

export default React.memo(HomeBodyMain);