import React from 'react'
import "./../nsns.css";
import jsonGlossary from "./../../glosarryContent/part-miner";


const Glossary = () => {


    return (
        <>
            <br />
            <div className='selectLetters'>
                {
                    jsonGlossary.map((el, index) => {
                        return (
                            <div key={index} className="ContentLeter">
                                <label className="labelLetters" htmlFor={"chck" + index}>
                                    {el.letter}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            <br />
            <div className='acordeonNsNs'>
                <div className="row">
                    <div className="col">
                        <div className="tabs">
                            {
                                jsonGlossary.map((el, index) => {
                                    let Parraf = el.parag.split('\n').map(str => <p>{str}</p>);
                                    return (
                                        <div className="tab">
                                            <input type="checkbox" id={"chck" + index} />
                                            <label className="tab-label" htmlFor={"chck" + index}>
                                                <div className='divContentLetter'>
                                                    <span className='LetterAcordeon'>{el.letter}</span>
                                                    <h1>{el.title}</h1>
                                                </div>
                                            </label>
                                            <div className="tab-content">
                                                {Parraf}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <br /> <br /> <br /> <br /> <br />
            </div>

        </>
    )
}
export default Glossary