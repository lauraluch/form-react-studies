function Button({text, address, action, alt, active}){
    return (
        <div>
            {active == false ?
                    <input type="button" value={text} className="disable"/>:
                <a href={address}>
                    <input type="button" value={text} className="button" onClick={action}/> 
                </a>
                    }
        </div>
    );
}

export default Button