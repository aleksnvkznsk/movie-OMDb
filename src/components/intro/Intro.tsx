import './Intro.scss';

function Intro() {
    return (
        <div className="intro">
            <div className="intro__content">
                <h1 className="intro__content__title">MOVIE OBDb</h1>
                <a className="intro__content__button" href='/movie'>Movie</a>
            </div>
        </div>
    );
}

export default Intro;