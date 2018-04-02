import React from 'react';
import {
  NavLink,
  Route,
  HashRouter
} from 'react-router-dom';

import Pages from './Pages';

const Main = (props) => {
  const _renderPage = (filename, pagename) => {
    return (<Pages jsonFile = {filename} pageName = {pagename} ></Pages>);
  }

  const _toggleHamburgerMenu = (e) => {
    e.preventDefault();
    const $body = document.querySelector('body');
    if ($body.className === '') {
      $body.className = 'active-hamburger-menu';
      window.scrollTo()
    } else {
      $body.className = ''
    }
  }

  return (
    <main>
      <div id='main-bg'></div>
      <HashRouter>
        <div>
          <header id = 'main-header'>
            <div id = 'brand-container'>
              <NavLink exact to = '/'  id = 'brand-logo'>Katomonster logo</NavLink>
              <div id = 'brand-id'>
                <NavLink exact to = '/'>
                  <span id = 'kato'>Kato</span>
                  <span id = 'monster'>Monster</span>
                </NavLink>
                <div id = "brand-tag"></div>
              </div>
            </div>
            <a href = '#to' className = 'hamburger-menu' onClick = {(e) => _toggleHamburgerMenu(e)} >
              <i></i>
              <i></i>
              <i></i>
            </a>
            <nav>
              <div id="topNavigation">
                <header>Development:</header>
                <NavLink exact to = '/recent-work'>Recent Work</NavLink>
                <NavLink exact to = '/html5'>HTML5</NavLink>
                <NavLink exact to = '/actionScript3'>ActionScript 3</NavLink>
                <NavLink exact to = '/animation'>Animation</NavLink>
                <NavLink exact to = '/kids-games'>Kids Games</NavLink>
                <NavLink exact to = '/banner'>Rich Media</NavLink>
              </div>
              <div id="bottomNavigation">
                <header>Design:</header>
                <NavLink exact to = '/web-design'>Web Design</NavLink>
                <NavLink exact to = '/logo-design'>Logo Design</NavLink>
                <NavLink exact to = '/artwork'>Artwork</NavLink>
                <NavLink exact to = '/print'>Print</NavLink>
              </div>
            </nav>
          </header>

          <Route exact path = '/' render = {() => _renderPage('./json/recentWork.json' ,'Home Page')}/>
          <Route exact path = '/actionScript3' render = {() => _renderPage('./json/flash.json', 'ActionScript3 pages')} />
          <Route exact path = '/animation' render = {() => _renderPage('./json/animation.json', 'Animations • Film Opening • Splash Pages')} />
          <Route exact path = '/artwork' render = {() => _renderPage('./json/artwork.json', 'Artwork')} />
          <Route exact path = '/banner' render = {() => _renderPage('./json/banner.json', 'Rich Media • Banner Ads')} />
          <Route exact path = '/html5' render = {() => _renderPage('./json/html.json', 'HTML5 • CSS • JavaScript • jQuery')} />
          <Route exact path = '/kids-games' render = {() => _renderPage('./json/kidsGames.json', 'Kids Games')} />
          <Route exact path = '/logo-design' render = {() => _renderPage('./json/logoDesign.json', 'Logo Design')} />
          <Route exact path = '/print' render = {() => _renderPage('./json/print.json', 'Print Design')} />
          <Route exact path = '/recent-work' render = {() => _renderPage('./json/recentWork.json', 'My Recent Work')} />
          <Route exact path = '/web-design' render = {() => _renderPage('./json/webDesign.json', 'Web Site Design')} />
        </div>
      </HashRouter>
    </main>
  );  
}

export default Main;
