
import ReactDom from 'react-dom';

// to display the decription of the skill 

export default function Modal(props) {
    const { children, handleCloseModal } = props
    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={handleCloseModal} className='modal-underlay'/>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}

// add the code for the modal 
// create the state for the modal and call the modal function in pokecard.tsx

