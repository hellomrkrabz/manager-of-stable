import horsie from './../media/horsie.jpg'


function Logo() {
    return(
        <div className="mt-5 p-3 d-flex align-items-center text-white fs-3 fst-italic" style={{borderTopLeftRadius: 10,borderEndEndRadius: 10}}>
            <img src={horsie} alt="Logo" width="50" className="d-inline-block align-text-top me-2" />
        </div>
    );
}

export default Logo;