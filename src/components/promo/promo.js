import React, { Component } from 'react';
import s from './promo.module.css';

import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import learnEasy from './assets/english-learn-easy.jpg'

class GameCard extends Component {

  constructor(props) {
    super(props)
  }

// componentWillMount() {
//   this.setState({className: 'currentSlide'})
// }

// componentWillUnmount() {
//   this.setState({className: 'previuoseSlide'});
// }

render() {
  // console.log(slidesData, currentGallerySlide)
  const {slidesData, currentGallerySlide , callback, variant} = this.props;

  const clName = variant ? s.currentSlide : s.previouseSlide;
  
  const slides = slidesData.map((slide) => {
    return (
      <div className={`${s.gameCard} ${clName}`}>
        <div className={s.game}>                    
          <h4>{slide.name}</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
        </div>

        <div className={s.gameGallery}>
          <div className={s.cssSlider}>

            <ul className={s.slides}>
              <li className={`${s[currentGallerySlide]} ${s.slide}`} id="audiochallenge1"></li>
            </ul>

            <ul className={s.thumbnails}>
              <li className={`${s.audiochallenge1} ${s.thumbnail}`} onClick={callback} data-id="audiochallenge1" />
              <li className={`${s.audiochallenge2} ${s.thumbnail}`} onClick={callback} data-id="audiochallenge2"></li>
              <li className={`${s.audiochallenge3} ${s.thumbnail}`} onClick={callback} data-id="audiochallenge3"></li>
              <li className={`${s.audiochallenge4} ${s.thumbnail}`} onClick={callback} data-id="audiochallenge4"></li>
              <li className={`${s.audiochallenge5} ${s.thumbnail}`} onClick={callback} data-id="audiochallenge5"></li>
            </ul>

          </div>
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
}


export default class Promo extends Component {
  constructor(props) {
    super(props);
    // this.previouseCard = '';
    this.games = ['audiochallenge', 'sprint']
    this.state = {
      currentGallerySlide: 'audiochallenge1',
      currentGamesSlide: 'audiochallenge',
      previouseGamesSlide: 'sprint',
      variat: true,
    }
  }

  changeImage = (event) => {
    console.log(event.target)
    const id = event.target.dataset.id;
    this.setState({currentGallerySlide: id});
  }

  showNextSlide = () => {
    console.log('showNextSlide')
    const { currentGamesSlide, variat } = this.state;
    let index = this.games.findIndex((item) => item === currentGamesSlide);
    index += 1;

    if (index === this.games.length) {
      index = 0;
    }
    console.log(index, this.games[index])

    this.setState({
      // previouseGamesSlide: currentGamesSlide, 
      // currentGamesSlide: this.games[index], 
      variat: !variat,
    });
  }

  showPrevSlide = () => {
    console.log('showPrevSlide')
    const { currentGamesSlide, variat } = this.state;
    let index = this.games.findIndex((item) => item === currentGamesSlide);
    index -= 1;

    if (index < 0) {
      index = this.games.length - 1;
    }

    

    this.setState({previouseGamesSlide: currentGamesSlide, currentGamesSlide: this.games[index], variat: !this.state.variat});
  }

  render() {
    console.log(this.state.currentGallerySlide);
    const {currentGamesSlide, currentGallerySlide, previouseGamesSlide, variat} = this.state;

    const slidesData = [
      {type: 'currentSlide', name: currentGamesSlide}, 
      // {type: 'previouseSlide', name: previouseGamesSlide}
    ];
    const slidesData2 = [
      // {type: 'currentSlide', name: currentGamesSlide}, 
      {type: 'previouseSlide', name: previouseGamesSlide}
    ];
    console.log(slidesData, 'sD')
    
      
    console.log(this.state.currentGamesSlide, 'qwert')

    return (

          
      <div>
        <Header/>
        <div className={'flex'}>
            <Sidebar/>
            {/* <div className={s.form_inner}> */}
              <div className={s.page}>
                <div className={s.promo}>                  
                    <div className={s.promoHeader}>
                      <h2 className={s.promoHeaderTitle}>Header</h2>
                      <p className={s.mainDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! </p>
                    </div>

                    <div className={s.promoOpportunities}>
                      <div className={s.promoAboutWrapper}>                        
                        <h2 className={s.aboutHeader}>About application</h2>
                        <p className={s.aboutDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?</p>
                      </div>

                      {/* <div className></div> */}
                      
                      <div></div>
                      <div></div>

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

                            {/* <div className={s.gameCard}>
                              <div className={s.game}>                    
                                <h4 >Audiochallenge</h4>
                                <p>Improves your listening skills in English.</p>
                              </div>
                              <div className={s.gameGallery}>
                                <div className={s.cssSlider}>
                                  <ul className={s.slides}>
                                    <li className={`${s[this.state.currentGallerySlide]} ${s.slide}`} id="audiochallenge1"></li>
                                  </ul>
                                  <ul className={s.thumbnails}>
                                    <li className={`${s.audiochallenge1} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge1" />
                                    <li className={`${s.audiochallenge2} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge2"><a href="#audiochallenge2" ></a></li>
                                    <li className={`${s.audiochallenge3} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge3"><a href="#audiochallenge3"></a></li>
                                    <li className={`${s.audiochallenge4} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge4"><a href="#audiochallenge4"></a></li>
                                    <li className={`${s.audiochallenge5} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge5"><a href="#audiochallenge5"></a></li>
                                  </ul>
                                </div>
                              </div>
                            </div> */}

{/* 
                            <div className={`${s.gameCard} ${s.previouseSlide}`}>
                              <div className={s.game}>                    
                                <h4>{previouseGamesSlide}</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                              </div>

                              <div className={s.gameGallery}>
                                  <div className={s.cssSlider}>
                                    <ul className={s.slides}>
                                      <li className={`${s[currentGallerySlide]} ${s.slide}`} id="audiochallenge1"></li>
                                    </ul>
                                    <ul className={s.thumbnails}>
                                      <li className={`${s.audiochallenge1} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge1" />
                                      <li className={`${s.audiochallenge2} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge2"><a href="#audiochallenge2" ></a></li>
                                      <li className={`${s.audiochallenge3} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge3"><a href="#audiochallenge3"></a></li>
                                      <li className={`${s.audiochallenge4} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge4"><a href="#audiochallenge4"></a></li>
                                      <li className={`${s.audiochallenge5} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge5"><a href="#audiochallenge5"></a></li>
                                  </ul>
                                  </div>
                                </div>
                            </div> */}

                         
                            {/* <div className={`${s.gameCard} ${s.currentSlide}`}>
                              <div className={s.game}>                    
                                <h4>{currentGamesSlide}</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                              </div>

                              <div className={s.gameGallery}>
                                  <div className={s.cssSlider}>
                                    <ul className={s.slides}>
                                      <li className={`${s[currentGallerySlide]} ${s.slide}`} id="audiochallenge1"></li>
                                    </ul>
                                    <ul className={s.thumbnails}>
                                      <li className={`${s.audiochallenge1} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge1" />
                                      <li className={`${s.audiochallenge2} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge2"><a href="#audiochallenge2" ></a></li>
                                      <li className={`${s.audiochallenge3} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge3"><a href="#audiochallenge3"></a></li>
                                      <li className={`${s.audiochallenge4} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge4"><a href="#audiochallenge4"></a></li>
                                      <li className={`${s.audiochallenge5} ${s.thumbnail}`} onClick={this.changeImage} data-id="audiochallenge5"><a href="#audiochallenge5"></a></li>
                                  </ul>
                                  </div>
                                </div>
                            </div> */}

                          <GameCard slidesData={/*this.state.variat ?*/ slidesData /*: slidesData2*/} currentGallerySlide={currentGallerySlide} callback={this.changeImage} variant={variat}/>
                            {/* <GameCard slidesData={this.state.variat ? slidesData2 : slidesData} currentGallerySlide={currentGallerySlide} callback={this.changeImage} /> */}

                          </div>

                          <button className={s.btnPrev} onClick={this.showNextSlide}/>
                          <button className={s.btnNext} onClick={this.showPrevSlide}/>
                        </div>
                        



                        {/* <ul>
                          <li>Savanna - Lorem ipsum dolor sit amet consectetur adipisicing</li>
                          <li>Sprint - Lorem ipsum dolor sit amet consectetur adipisicing</li>
                          <li>Speak It - Lorem ipsum dolor sit amet consectetur adipisicing</li>
                          <li>English Puzzle - Lorem ipsum dolor sit amet consectetur adipisicing</li>
                          <li>Audiochallenge - Improves your listening skills in English.</li>
                          <li>Our GAme - Lorem ipsum dolor sit amet consectetur adipisicing</li>
                        </ul> */}
                      </div>

                      <div  className={s.statistics}>
                          <h3 className={s.statisticsHeader}>Statistics</h3>
                        
                          <div className={s.statisticsDescriptionBlock}>
                            <p className={s.mainApplicationDescription}>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima recusandae sed consequuntur ut qui voluptatibus beatae dicta soluta dolore! Reprehenderit, maxime dignissimos. Et fuga atque reprehenderit exercitationem cumque! Excepturi?
                            </p>
                            <div className={s.mainAppImgBlock}>
                              <img className={s.statisticsImg} src={learnEasy} />
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
      </div>


      
    ) 
  }
}