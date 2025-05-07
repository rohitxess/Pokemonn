

export default function Header(props) {
    const { handleToggleMenu } = props

    return (
       <header>
           <button onClick={handleToggleMenu} className="open-nav-button">
                <i className="fa-solid fa-bars"></i> 
           </button>
           <h1 className="text-gradient">Pokedex</h1>
       </header>
    )
}

// to make the fonts work we need to import the CDN package from cdnjs into our .html file 


