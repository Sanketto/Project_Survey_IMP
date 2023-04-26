import React,{useState,useEffect} from 'react'
// import '../styles/create-survey.css'
import '../styles/theme.css'
import { useNavigate } from 'react-router-dom'
import AddQuiz from './AddQuiz';
import backEndUrl from '../config/config'

export default function Theme({showTheme,update}) 
{
    // const navigate=useNavigate();

    // let [tmp,changeTmp]=useState(false)
    let [style,updateStyle]=useState([])
    // let [theme,changeTheme]=useState('None')
    // let [styleName,changeStyle]=useState('none')
    let [themeName,changeThemeName]=useState('')


    useEffect(()=>{
        fetch(`https://survey-backend-cp5k.onrender.com/theme`)
        .then((data)=>data.json())
        .then((fonts)=>{
            // console.log(fonts)
            updateStyle(fonts)
        })
        .catch(()=>console.log("fetching error"))
    },[]) 

    function themeChange(e,prop)
    {
    //    console.log(e.target.value);
    //    if(e.target.value==="None")
    //    {
    //       changeTheme("None")
    //    }
    //    else if(e.target.value==="Dark")
    //    {
    //       changeTheme("Dark Theme")
    //    }
    //    else if(e.target.value==="Light")
    //    {
    //       changeTheme("Light Theme")
    //    }
         
         update((data)=>({
            ...data,
            [prop]:e.target.value
         }))

         changeThemeName(`${e.target.value} Theme`)

                   
    }
    
    return <>
        <div className='transparent-back'>
            <div className='theme-container'>
                <header className='list-header border-bot'>
                    <h3>Theme Settings</h3>
                    <div onClick={()=>{showTheme()}} id='close-icon'></div>
                </header>
                <form className='theme-form'>
                    <div>
                        <label>Theme</label>
                        <select onClick={(e)=>themeChange(e,"themeName")} style={{fontSize:"12px"}}>
                            <option defaultChecked disabled>Select</option>
                            <option>Dark</option>
                            <option>Light</option>
                        </select>
                    </div>
                    <div className='grid-form'>
                        <div>
                            <div>
                                <label>Theme name</label>
                                <input id='themename' type='text' value={themeName} style={{fontSize:"12px"}}/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>All Questions Mandatory</label>
                                <select style={{fontSize:"12px"}}>
                                    <option defaultChecked disabled>Select</option>

                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Enable Skip</label>
                                <select style={{fontSize:"12px"}}>
                                    <option defaultChecked disabled>Select</option>

                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Select Font</label>
                            <select onChange={(e)=>themeChange(e,"styleName")}>
                                <option defaultChecked disabled>Select</option>
                                {style.map((a,index)=><option key={index}>{a}</option>)}
                                {/* <option>Yes</option>
                                <option>No</option> */}
                            </select>
                        </div>
                        <div>
                            <label>Color</label>
                            <input id='color' type='color' onChange={(e)=>themeChange(e,"colorName")}/>
                        </div>
                    </div>
                </form>
                <div className="util theme-btn">
                    <div id="cancel-btn">
                        <button onClick={()=>{showTheme()}}>Cancel</button>
                    </div>
                    <div id="next-btn">
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
}