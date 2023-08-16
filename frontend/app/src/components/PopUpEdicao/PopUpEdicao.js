import ReactModal from 'react-modal';
import React, { useState } from 'react';
import Button from "../Button/Button.js";

function PopUpEdico({user}) {
    const [isOpen, setIsOpen] = useState(false);
    console.log("email:", user.email)
    console.log("nome:", user.name)

    return (
        <div className='popUp'>
            <Button text='Editar' action={() => setIsOpen(true)}/>
            <ReactModal className="popUp" overlayClassName="popUpOverlay"
                isOpen={isOpen}
                contentLabel="Edition Modal">
                <div className='popUpDescription'>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <Button text='Fechar' action={() => setIsOpen(false)}/>
                    
                </div>
            </ReactModal>
        </div>
    );
}
 
export default PopUpEdico;