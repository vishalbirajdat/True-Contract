import React from 'react'
import style from "../../styles/Hero.module.css"

import { Button, Stack, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const Hero = () => {
  const { screen } = useSelector((state) => state.utils);
  const { totalReward, myReward } = useSelector((state) => state.tickets);

  return (

      <Stack direction={screen == 'sm' ? "vertical" : "horizontal"} style={{
           marginTop: screen == "sm"?"30px":"100px",
            marginBottom: screen == "sm"?"30px":"100px",
            justifyContent:"space-between",
            gap:"30px",
            alignItems:"start"
    }}>

          <div className={style.sunTitle}>
            True Tokens
          <div className={style.sunValue}> 1B</div> 
                  <img src="/tickets.png" alt="poly" style={{paddingTop:"3px"}} className={style.sunValue} height={"24px"} />
          </div>

          <div className={style.sunTitle}>
              Total Reward
        <div className={style.sunValue}>{totalReward}</div>
                  <img src="/diamond.png" alt="poly" className={style.sunValue} style={{ paddingTop: "2px" }}  height={"24px"} />
          </div>


          <div className={style.sunTitle}>
              Your Reward
        <div className={style.sunValue}>{myReward}</div>
                  <img src="/diamond.png" alt="poly" className={style.sunValue} style={{ paddingTop: "2px" }}  height={"24px"} />
          </div>

        
      </Stack>

  )
}

export default Hero