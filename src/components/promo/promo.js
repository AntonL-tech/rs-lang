import React, { Component } from 'react';
import s from './promo.module.css';
import graph from './assets/stat2.png';
import owl from './assets/learn/owl3.png';
import settingsImg from './assets/learn/settings.png';
import books from './assets/books/book.png';
import videoImg from './assets/vid.jpg';

class GallerySlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGallerySlide: `${this.props.slide}1`
    }
  }

  changeImage = (event) => {
    console.log(event.target)
    const id = event.target.dataset.id;
    this.setState({currentGallerySlide: id});
  }

  render() {
    const { slide } = this.props;
    const { currentGallerySlide } = this.state;

    return (
      <div className={s.gameGallery}>
        <div className={s.cssSlider}>

          <ul className={s.slides}>
            <li className={`${s[currentGallerySlide]} ${s.slide}`} id={currentGallerySlide}></li>
          </ul>

          <ul className={s.thumbnails}>
            <li className={`${s[`${slide}1`]} ${s.thumbnail}`} onClick={this.changeImage} data-id={`${slide}1`} />
            <li className={`${s[`${slide}2`]} ${s.thumbnail}`} onClick={this.changeImage} data-id={`${slide}2`}></li>
            <li className={`${s[`${slide}3`]} ${s.thumbnail}`} onClick={this.changeImage} data-id={`${slide}3`}></li>
            <li className={`${s[`${slide}4`]} ${s.thumbnail}`} onClick={this.changeImage} data-id={`${slide}4`}></li>
            <li className={`${s[`${slide}5`]} ${s.thumbnail}`} onClick={this.changeImage} data-id={`${slide}5`}></li>
          </ul>

        </div>
      </div>
    )
  }
}

const GameCard = ({ slidesData, currentGamesSlide, previouseGamesSlide, direction }) => {
  
  const slides = slidesData.map(({key, name, description}) => {

    let animation = ' ';

    if (key === currentGamesSlide) {
      animation = direction ? s.showRight : s.showLeft;
    }

    if (key === previouseGamesSlide) {
      animation = direction ? s.hideRight : s.hideLeft;
    }


    console.log(animation, key,  currentGamesSlide,  'clNAme')

    return (
      <div className={`${s.gameCardWrapper} ${animation}`} key={key}>
        <div className={`${s.gameCard} `}>
          <div className={s.game}>                    
            <h4 className={s.gameTitle}>{name}</h4>
            <p className={s.gameDescription}>{description}</p>
          </div>
          <GallerySlider slide={key} />
        </div>        
      </div>
    )
  })

  return (
    <>
      {slides }
    </>

  );

}


export default class Promo extends Component {
  constructor(props) {
    super(props);
    this.games = [
      { 
        key: 'audiochallenge', 
        name: 'audiochallenge', 
        description: 'Improves listening skills'
      }, 
      { 
        key: 'sprint',
        name: 'sprint',
        description: 'In 60 seconds you need to specify as many correct translation options as possible. Then larger the series of correct answers, then more points are given for each answer.' 
      }, 
      { 
        key: 'speakit',
        name: 'speak it',
        description: 'This mini-game will help you check your pronunciation.'
      }, 
      { 
        key: 'savannah', 
        name: 'savannah', 
        description: 'The Savannah training will help you build your vocabulary. The more words you know, the more experience points you\'ll get.'
      }, 
      { 
        key: 'englishPuzzle',
        name: 'english puzzle',
        description: 'This game will let you learn new English phrases. Collect sentences from words as if they were puzzles and remember their order.'
      }, 
      { 
        key: 'wordConstructor',
        name: 'word constructor',
        description: 'Let\'s find out if you can correctly assemble a word from letters. You have seven lives and 60 seconds.'
      },
    ];
    this.state = {
      currentGallerySlide: 'audiochallenge1',
      currentGamesSlide: 'audiochallenge',
      previouseGamesSlide: 'Let\'s check how many words you can guess in 1 minute. Choose correct tranclation to get best score.',
      sliderDirection: true,
    }
  }

  showNextSlide = () => {
    console.log('showNextSlide')
    const { currentGamesSlide } = this.state;
    let index = this.games.findIndex((item) => item.key === currentGamesSlide);
    index += 1;

    if (index === this.games.length) {
      index = 0;
    }

    this.setState({
      previouseGamesSlide: currentGamesSlide, 
      currentGamesSlide: this.games[index].key, 
      sliderDirection: true,
    });
  }

  showPrevSlide = () => {
    const { currentGamesSlide } = this.state;
    let index = this.games.findIndex((item) => item.key === currentGamesSlide);
    index -= 1;

    if (index < 0) {
      index = this.games.length - 1;
    }    

    this.setState({
      previouseGamesSlide: currentGamesSlide, 
      currentGamesSlide: this.games[index].key, 
      sliderDirection: false,
    });
  }


  render() {
    const { currentGamesSlide,  previouseGamesSlide, sliderDirection } = this.state;

    return (
      <>
        <div className={s.page}>
          <div className={s.promoWrapper}>
            <div className={s.promo}>                  
              <div className={s.promoHeader}>
                <h2 className={s.promoHeaderTitle}>Welcome to RSLang</h2>
                <p className={s.mainDescription}>
                  This is an application for learning English words with interval repetition techniques, tracking individual progress and mini-games.
                </p>
              </div>        
              <div className={s.promoOpportunities}>
                <div className={s.promoAboutWrapper}>                        
                  <h2 className={s.aboutHeader}>About application</h2>
                  <p className={s.aboutDescription}>
                    This application contains training for learning 3600 commonly used English words, and is based on the collection of "4000 essential english words". The first 400 most frequently used words were not included in the collection, because it is believed that this is the basic stock of an adult left over from a school / university or previous attempts to learn a language.
                  </p>
                </div>        
                <div>
                  <div  className={s.mainApplication}>
                    <h3 className={s.mainApplicationHeader}>Main application</h3>
                    <div className={s.mainAppDescriptionBlock}>
                      <p className={s.mainApplicationDescription}>
                        The main functionality of the application is to learn and repeat words. It is presented in the form of cards with words to be guessed. Word cards contain both new words and words that need to be repeated. During the game, both knowledge of English words and their spelling is checked.  
                      </p>
                      <div className={s.mainAppImgBlock}>
                        <img className={s.mainAppImg} src={owl} />
                      </div>
                    </div>
                    <div className={s.mainAppDescriptionBlock}>
                      <p className={s.mainApplicationDescription}>
                        In the application settings, you can specify the number of new words that you plan to learn per day, and the maximum number of cards with words per day. You can also indicate what information is displayed on cards with words: translation of a word, sentence with an explanation of the meaning of the word, sentence with an example of the use of the word being studied.
                      </p>
                      <div className={s.mainAppImgBlock}>
                        <img className={s.mainAppImg} src={settingsImg} />
                      </div>
                    </div>
                    <div className={s.mainAppDescriptionBlock}>
                      <p className={s.mainApplicationDescription}>
                        The application has a dictionary that contains information on which words were learned, which were removed from the study, and which were marked as difficult words. The user can manage the words in his dictionary: delete from the study, return difficult words to the general list of words to be studied.
                      </p>
                      <div className={s.mainAppImgBlock}>
                          <img className={s.mainAppImg} src={books} />
                      </div>
                    </div>
                  </div>
                </div>        
                <div className={s.games}>
                  <h3 className={s.gamesHeader}>Games</h3>
                  <p className={s.gamesDescription}>
                    There are 6 mini games in the priory that will help you consolidate the previously acquired knowledge. You can play mini-games with previously learned words or by choosing one of six presented difficulty levels.
                  </p>        
                  <div className={s.gameSlider}>
                    <div className={s.gameSlides}>        
                      <GameCard 
                        slidesData={this.games} 
                        direction={sliderDirection} 
                        previouseGamesSlide={previouseGamesSlide} 
                        currentGamesSlide={currentGamesSlide} />        
                    </div>        
                    <button className={s.btnNext} onClick={this.showPrevSlide}/>
                    <button className={s.btnPrev} onClick={this.showNextSlide}/>        
                  </div>
                          
                </div>        
                <div  className={s.statistics}>
                  <h3 className={s.statisticsHeader}>Statistics</h3>
                          
                  <div className={s.statisticsDescriptionBlock}>
                    <p className={s.statisticsDescription}>
                      In the application there is a statistics page where, in the form of a graph, information on the learning outcomes for each day is presented. Also, the statistics page provides long-term statistics of mini-games, you can see when and how many times they played a mini-game and with what result.
                    </p>
                    <div className={s.statsImgBlock}>
                      <img className={s.statisticsImg} src={graph} />
                    </div>
                  </div>
                </div>
                          
              </div>
              <div>                           
                <div className={s.promoVideo}>
                  <img src={videoImg} />
                </div>
              </div>        
            </div>
          </div>
        </div>
      </>      
    ) 
  }
}