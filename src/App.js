import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  // 1 here we will put our state values
  const [people , setPeople] = useState(data)
  // 2 this state for css style
  // 3 the idea of css that with index all items will be at the right and the active item will at tha center and the that just displayed will be at the left 
  const [index , setIndex] = useState(0)
  // 9 هنا بعد ما عملنا كل حاجه بتظهر مشكله وهي ان احنا عاملين زرار انه كل مره يزود 1 عشان يجيب السلايد الجديده وبعد لما السلايدس كلها بتخلص بنلاقيه مي بيرجه للقيمه الابتدائيه لل اندكس اللي هي 0 واللي بيظهر انه بيظهر مكان فاضي
//كمان الزرار التاني بينقص في الاندكي عشان نوصل لل سلايدس السابقه بيفضل ينقص ينقص لحد مايوصل لل -1 ومفيش سلايد رقمخا -1 فبرضو بيسي مكانها فاضسي 
// فاحنا هنحل المشكله ديه باننا نستخدم useEffect
// useEffect will show the slides dependes on the state value so that if the index is very big then the useEffect will set the slides to the initial value to the index which will be index = 0
//and when the index is a negative value then the useEffect wil fix that
  useEffect(()=>{
    const lastIndex = people.length - 1
    if (index < 0) { // here index is a negative value
      setIndex(lastIndex)
    }
    
    if (index > lastIndex) { // index is too big
      setIndex(0)
      
    }
  },[index , people]) // here useEffect dependes on the insex and the people
  // we can set many useEffect
  // here we will use a claen up function for the transition of the slides ???
  useEffect(()=>{
    let slider = setInterval(()=>{
      setIndex(index + 1)
    } , 3000);
    // here we will cleanup so that we won't get a crash
    return ()=>clearInterval(slider)
  },[index]) 


  return (
    <section className='section'>
      <div className='title'>
        <h2>
          / Review
        </h2>
        <div className='section-center'>
          {/*4  here we will show all people in the data array */}
          {people.map((person , personIndex)=>{
            const {id , image , name ,title , quote } = person;
            //more stuff coming up
            //6  كدا احنا خلينا كل السلايدس هي اللي نكست سلايد ووبعد كدا هتنحط شروط
           // here we put all slides on the right hand side
            let position = 'nextSlide'
            // 7 if personIndex is matching with the index then we will make this slide in the center with activeSlide class
            if (personIndex === index) {
              position ='activeSlide'     
            }
            // 8 here we want to put a condition to move the slides on the left side
            // or is written by Shift + backslash 
            if (personIndex === index - 1 ||(index === 0 && personIndex === people.length - 1)) {
              position = 'lastSlide'
              
            }
            return(
                  // 5 
 
              <article className={position} key={id}>
                <img src ={image} alt={name} className='person-img'/>
                <h4>{name}</h4>
                <p className='title'>{title}</p>
                <p className='text'>{quote}</p>
                <FaQuoteRight className='icon' />
              </article>
            )

          })} {/* 5 too */}
          <button className='prev' onClick={()=> setIndex(index - 1)}>
            <FiChevronLeft/>
          </button>
          <button className='next' onClick={()=> setIndex(index + 1)}>
            <FiChevronRight/>
          </button>


        </div>

      </div>
    </section>
  )
}

export default App;
