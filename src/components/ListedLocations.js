
function ListedLocations (props) {
    // const arrLocations = locations.map(location => { 
    //     return <h2>{location.name}</h2>})
    const location = props.location
    const {name} = location
    
    const clearedName = (text) => {
        const textArr = text.split('-')
        for (let i=0; i<textArr.length; i++) {
            textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1)
        }
        return textArr.join(' ')
    }

    const onClick = props.onClick

    return (
        <h2 className={name} onClick={onClick}> {clearedName(name)} </h2>
    )
}

export default ListedLocations