import './Intro.scss';

function Intro() {
    return (
        <div className="intro">
            <div className="intro__content">
                <h1 className="intro__content__title">MOVIE OBDb</h1>
                <p className="intro__content__description">Ваша база данных фильмов.  Ищите, оценивайте и делитесь своими любимыми кинолентами!</p>
                <a className="intro__content__button" href='/movie'>Movie</a>
            </div>
        </div>
    );
}

export default Intro;