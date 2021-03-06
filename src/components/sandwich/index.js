import React, { Component } from 'react'
import './sandwich.css'


class Sandwich extends Component {
    render(){
        return(
            <div  className={this.props.show ? "cross_button cross move_btn" : "cross_button "} onClick={ this.props.handleClick} data-toggle="collapse"  data-target="#expanded">
                <svg viewBox="0 0 800 600">
                    <path d="M 300 220 C 300 220 500 220 540 220 C 740 220 640 540 520 420 C 440 340 300 200  300 200 "id="top" stroke="green" strokeWidth="3" fill="none"/>
                    <path d="M 300 320 C 300 320 500 320 540 320 C 740 320 740 530 540 520 L 540 520" stroke="green" id="middle" strokeWidth="3" fill="none" />
                    <path d="M 300 210 C 300 210 520 210 540 210 C 740 210 640 530 520 410 C 440 330 300 190 300 190"  stroke="green" strokeWidth="3" id="bottom" fill="none" transform="translate(480 ,320) scale(1,-1) translate(-480 ,-318)"/>
                </svg>
            </div>
        );
    }
}


export default Sandwich;