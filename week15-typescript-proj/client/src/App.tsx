import { useState } from 'react'
import {Button} from './components/ui/buttons'
import { LinkCard } from './components/ui/LinkCard'
// import { IoMdAdd } from "react-icons/io";
import './App.css'
import {PlusIcon} from './components/icons/PlusIcon'

function App() {

  return (
    <>
      <section className='mt-10 ml-10 '>
        <Button text="Add Contents" variant="primary" size="sm" startIcon={<PlusIcon/>} onClick={() => {console.log("hello is pressed")}}/>
        {/* <LinkCard data=" dfdasfd af  dsaf dfadsafl;j lsjsa lkjsa lkj l;kj lkj klj kl;j kl;ajl jlakdkj klfdjsasflj lkdsj jdsalfkjdsal fjakdjsa ;lfjas;lfjdsafjsafjadsfsdafdasfdsafdasfdsafdasfdafdafdafdafds fdssa  adsfasfdsaf" icon="&" heading='how to create your own brain' tags={["productivity","ideas"]} date="13/12/2005"/> */}
      </section>

      {/* <div className="ticks"></div>
      <section id="spacer"></section> */}
    </>
  )
}

export default App
