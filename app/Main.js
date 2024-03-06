import React from "react";
import ReactDOM from "react-dom/client";


const { useState, useEffect } = React


function OurApp() {
    const [pets, setPets] = useState([])


    //   only run once the first time the component is rendered
    useEffect(() => {
        if (localStorage.getItem("examplePetsData")) {
            setPets(JSON.parse(localStorage.getItem("examplePetsData")))
        }
    }, [])



    //   run everytime our pet state changes
    useEffect(() => {
        localStorage.setItem('examplePetsData', JSON.stringify(pets))
    }, [pets])



    return (
        <>
            <OurHeader />
            <LikeArea />
            <TimeArea />
            <AddPetForm setPets={setPets} />
            <ul>
                {pets.map(pet => <Pet id={pet.id} setPets={setPets} name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
            </ul>
            <Footer />
        </>
    )
}


function AddPetForm(props) {

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [species, setSpecies] = useState()


    function handleSubmit(e) {
        e.preventDefault()
        props.setPets(prev => prev.concat({ name, species, age, id: Date.now() }))
        setName('')
        setSpecies('')
        setAge('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Add New Pet</legend>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="species" />
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="age in years" />
                <button>Add Pet</button>
            </fieldset>
        </form>
    )
}



function Footer() {
    return <small>Copyright Footer Text</small>
}


function TimeArea() {
    const [theTime, setTheTime] = useState(new Date().toLocaleString())

    useEffect(() => {
        const interval = setInterval(() => setTheTime(new Date().toLocaleString()), 1000)

        return () => clearInterval(interval)
    }, [])

    return <p>The current time is {theTime}.</p>
}



function OurHeader() {
    return <h1 className="special">Our Amazing App Header</h1>
}


function LikeArea() {
    const [likeCount, setLikeCount] = useState(0)

    function increaseLikeHandler() {
        setLikeCount(previous => previous + 1)
    }

    function decreaseLikeHandler() {
        setLikeCount(previous => {
            if (previous > 0) {
                return previous - 1
            }
            return 0
        })
    }

    return (
        <>
            <button onClick={increaseLikeHandler}> Increase Likes </button>
            <button onClick={decreaseLikeHandler}> Decrease Likes </button>
            <h2> This page has been liked {likeCount} times.</h2>
        </>
    )
}


function Pet(props) {

    function handleDelete() {
        props.setPets(prev => prev.filter(pet => pet.id != props.id))

    }

    return (
        <li>{props.name} is a {props.species} and is {props.age} years old.
            <button onClick={handleDelete}> Delete </button>
        </li>
    )
}



const root = ReactDOM.createRoot(document.querySelector("#app"))

root.render(<OurApp />)



// Loading new changes on the fly
if (module.hot) {
    module.hot.accept()
}