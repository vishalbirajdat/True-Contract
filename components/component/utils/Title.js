import React from 'react'
import style from "../../../styles/Title.module.css"

const Title = ({ subTitle, title1, title2 }) => {
    return (
        <div style={{
            marginBottom:"100px"
        }}>
            <p className={style.sectionSubtitle}>{subTitle}</p>

            <h2 className={`${style.h2} ${style.sectionTitle}`}>
                {title1} <span>{title2}</span>
            </h2>
        </div>
    )
}

export default Title