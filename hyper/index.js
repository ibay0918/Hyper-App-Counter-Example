import {h, app} from "hyperapp"
import update from 'immutability-helper';

//remindder the {} is used to interpret something
//example
// const ContentArea = () => {
//  return (<div className={'ContentArea'}>
//  <h1>(2+2)</h1>
//  </div>)}
//
//<Header state={state} />

// The result will be 4 because you re interpreting 2+2
app({
  state: {
    title: 'Counter',
    total: 0
    cities:[{
      title: 'NY',
      population: 8000000
    },
      title: 'PH',
      population: 1500000
    }
  ]
  },
  view: (state, actions) => <div className={'CounterRoot'}>
  //state is equal to state object in the app method above app({})
    <Header state={state} actions={actions} />
    <ContentArea state={state} actions={actions} />
    <ButtonsArea state={state} actions={actions} />
    <h1>{state.cities[1].title}</h1>
  </div>,
  root: document.getElementById('app'),
  actions: {
    //So the return update is creating a new state each time the button is pressed where only the total is changed; we want to make sure we are only changing what we want to change and not influencing any other part of the object
    plus:(state, actions)=> {
      console.log('plus'),
      return update(state, {total: {$set: state.total + 1}}) // we are taking the whole object state; finding the property total insdide the object and changes only the total and doesn't influence the other parts of the object
    },
    minus:(state, actions)=> {
      return update(state, {total: {$set: state.total - 1}})
    },
    reset:(state, actions)=> {
      return update(state, {cities: {
        $splice: [
          [1, 1, {
            title: 'NJ',
            population: 3000000
          } ]]

        }})
    }
    // reset:(state, actions)=> {
    //   return {total: 0}
    // }
  }
})


const Header = ({state, actions}) => {
  return (<div className={'header'}>
    <h3>{state.title}</h3>
    </div>
  )
}

const ContentArea = ({state, actions}) => {
  return (<div className={'ContentArea'}>
<h1>{state.total}</h1>
</div>
)
}
// The same as
// var ButtonsArea = function(){}
const ButtonsArea = ({state, actions}) => {
  return (<div className={'ButtonsArea'}>
    <div className={'minus'} onclick={actions.minus}>
      -
    </div>

    <div className={'plus'} onclick={actions.plus}>
      +
    </div>
    <div className={'reset'} onclick={actions.reset}
    style={{
      background: "red",
      paddingBottom: "50px",
      borderRadius: (state.total * 2) + 'px',
      transition: "all .5s ease-in-out"
    }}>
      reset
    </div>
  </div>
)
}
