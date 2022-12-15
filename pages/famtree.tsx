import React from 'react';
import {connect} from 'react-redux';
import {decrementCounter, incrementCounter} from '../redux/actions/counterActions';



export default function FamilyTree (props) {
    console.log('props')
    console.log(props)

    let restaurants = {
        burger: 'wendys',
        shakes: 'wendys',
        fries: 'wendys'
    }

    let newrestaurants = {
        ...restaurants,
        burger: restaurants.burger.concat(' burgerking'),
        shakes: restaurants.shakes = ['wendys', 'burgerking'],
        fries: restaurants.fries += 'burger king'
    }

    console.log(newrestaurants)

    // console.log({store})

    console.log('family tree component!')
    return (
        <div>
            <h1> guessing game test render </h1>
            
        </div>
    )
}

export async function getServerSideProps(context) {              
        // console.log(context)
  return {
  props: {
       
  }
  };
  }
