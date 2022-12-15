import React from 'react';
import {connect} from 'react-redux';
import {decrementCounter, incrementCounter} from '../redux/actions/counterActions';



export default function FamilyTree ({store} ) {
    console.log('family tree component!')
    console.log({store})
    return (
        <div>
            <h1> guessing game test render </h1>
            
        </div>
    )
}

export async function getServerSideProps(context) {              
        console.log(context)
  return {
  props: {
    ''   
  }
  };
  }
