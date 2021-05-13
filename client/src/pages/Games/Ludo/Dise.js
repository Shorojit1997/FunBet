import React, { useEffect } from 'react';
import { adminLudoRatingActionHandeler } from '../../../Store/Actions/GameInfoAction'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import './Dise.css'
import Play from './Play';


const Dise = () => {

  const dispatch = useDispatch();
  const { ludoX,ludoY} =useSelector(state=>state.gameInfo,shallowEqual)


  useEffect(() => {
    dispatch(adminLudoRatingActionHandeler())
  }, [dispatch])



  return (
    <div className='d-flex justify-content-center'>
      <div className='card card-body' style={{ minHeight: '400px', margin: '50px', minWidth: '350px', maxWidth: '500px', background: 'none', border: '2px solid yellow' }}>
        <h1 style={{ background: 'black', color: 'white', marginBottom: '40px', borderRadius: '5px' }}>Six in One</h1>
        <section className="cont">
          <div  id="cube" style={{ WebkitTransform: `rotateX(${ludoX}deg) rotateY(${ludoY}deg)`, transform: `rotateX(${ludoX}deg) rotateY(${ludoY}deg)` }} >
            <div className="front">
              <span className="dot dot1"></span>
            </div>
            <div className="back">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
            </div>
            <div className="right">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
            </div>
            <div className="left">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
              <span className="dot dot4"></span>
            </div>
            <div className="top">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
              <span className="dot dot4"></span>
              <span className="dot dot5"></span>
            </div>
            <div className="bottom">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
              <span className="dot dot4"></span>
              <span className="dot dot5"></span>
              <span className="dot dot6"></span>
            </div>
          </div>
        </section>
        <Play />
      </div>



    </div>
  );
};

export default Dise;





// var min = 5;
// var max = 40;

// const [xRand, setXrand] = useState(90)
// const [yRand, setYrand] = useState(90);
// const clickHandeler = () => {
//   var xRand = getRandom(max, min);
//   var yRand = getRandom(max, min);
//   setXrand(180);
//   setYrand(1800);
// }
// function getRandom(max, min) {
//   return (Math.floor(Math.random() * (max - min)) + min) * 90;
// }