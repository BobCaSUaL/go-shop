/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import ShoppingList from 'containers/ShoppingList/Loadable';
import ShoppingCart from 'containers/ShoppingCart/Loadable';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Go Shop" defaultTitle="Go Shop">
        <meta name="description" content="Go Shop" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={ShoppingList} />
        <Route exact path="/cart" component={ShoppingCart} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
