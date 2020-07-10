import React, { Component } from 'react';
import s from './promo.module.css';

// import Header from '../app-header/app-header';
// import Sidebar from '../app-sidebar/app-sidebar';
import learnEasy from './assets/english-learn-easy.jpg';
import grafik from './assets/grafik.png';




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
            <h4>{name}</h4>
            <p>{description}</p>
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
    // this.previouseCard = '';
    this.games = [
      { 
        key: 'audiochallenge', 
        name: 'audiochallenge', 
        description: 'Improves listening skills'
      }, 
      { 
        key: 'sprint',
        name: 'sprint',
        description: 'Improves listening skills' 
      }, 
      { 
        key: 'speakit',
        name: 'speak it',
        description: 'Improves listening skills'
      }, 
      { 
        key: 'savannah', 
        name: 'savannah', 
        description: 'The Savannah training helps you build your vocabulary. The more words you know, the more experience points you\'ll get.'
      }, 
      { 
        key: 'englishPuzzle',
        name: 'english puzzle',
        description: 'Improves listening skills'
      }, 
      { 
        key: 'wordConstructor',
        name: 'word constructor',
        description: 'Improves listening skills'
      },
    ];
    this.state = {
      currentGallerySlide: 'audiochallenge1',
      currentGamesSlide: 'audiochallenge',
      previouseGamesSlide: 'sprint',
      sliderDirection: true,
    }
  }

  // changeImage = (event) => {
  //   console.log(event.target)
  //   const id = event.target.dataset.id;
  //   this.setState({currentGallerySlide: id});
  // }

  showNextSlide = () => {
    console.log('showNextSlide')
    const { currentGamesSlide } = this.state;
    let index = this.games.findIndex((item) => item.key === currentGamesSlide);
    index += 1;

    if (index === this.games.length) {
      index = 0;
    }
    // console.log(index, this.games[index])

    this.setState({
      previouseGamesSlide: currentGamesSlide, 
      currentGamesSlide: this.games[index].key, 
      sliderDirection: true,
    });
  }

  showPrevSlide = () => {
    console.log('showPrevSlide')
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
        {/* <Header/>
        <div className={'flex'}>
            <Sidebar/>              */}
              <div className={s.page}>
                <div className={s.promoWrapper}>
                  <div className={s.promo}>                  
                      <div className={s.promoHeader}>
                        <h2 className={s.promoHeaderTitle}>Welcome to RSLang</h2>
                        <p className={s.mainDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! </p>
                      </div>

                      <div className={s.promoOpportunities}>
                        <div className={s.promoAboutWrapper}>                        
                          <h2 className={s.aboutHeader}>About application</h2>
                          <p className={s.aboutDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?</p>
                        </div>

                        <div>
                          <div  className={s.mainApplication}>
                            <h3 className={s.mainApplicationHeader}>Main application</h3>
                            
                            <div className={s.mainAppDescriptionBlock}>
                              <p className={s.mainApplicationDescription}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?
                              </p>
                              <div className={s.mainAppImgBlock}>
                                <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} />
                              </div>
                            </div>
                            <div className={s.mainAppDescriptionBlock}>
                              <p className={s.mainApplicationDescription}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?
                              </p>
                              <div className={s.mainAppImgBlock}>
                                <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} />
                              </div>
                            </div>
                            <div className={s.mainAppDescriptionBlock}>
                              <p className={s.mainApplicationDescription}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?
                              </p>
                              <div className={s.mainAppImgBlock}>
                                <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={s.games}>
                          <h3 className={s.gamesHeader}>Games</h3>
                          <p className={s.gamesDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed</p>

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
                              <p className={s.mainApplicationDescription}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?
                              </p>
                              <div className={s.mainAppImgBlock}>
                                <img className={s.statisticsImg} src={grafik} />
                                {/* <img className={s.mainAppImg} src={learnEasy} />
                                <img className={s.mainAppImg} src={learnEasy} /> */}
                              </div>
                            </div>
                          </div>
                      
                          </div>
                          <div> 
                  

                      <div className={s.promoVideo}>
                        Video
                      </div>
                  </div>

                </div>
              </div>
            </div>
        {/* </div> */}
      </>


      
    ) 
  }
}